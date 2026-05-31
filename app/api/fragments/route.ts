import { NextResponse } from "next/server";
import { curatedHome } from "@/lib/curated-home-fragments";

/**
 * GET /api/fragments — corpus site (lecture SEULE Supabase, clé service_role server-side).
 * N'expose QUE des fragments publiables ET sourcés :
 *   final_editor_approved=true · publication_status=ready · final_fr_text non vide
 *   · fragment_type ∈ formats courts (wisdom_story exclu) · use_case contient 'site'
 *   · source primaire présente (jointure !inner) · source_confidence ≠ low
 * Fallback : set curé statique (jamais d'écran vide, jamais de corpus brut).
 */
export const dynamic = "force-dynamic";

type Loc = { fr: string; en: string; es: string };
type Item = {
  id: string;
  title: Loc;
  text: Loc;
  theme: string | null;
  inspiration: {
    type: string;
    tradition: string | null;
    author: string | null;
    reference: string | null;
    summary: string | null;
    reading: string | null;
    disclaimer: string | null;
    confidence: string | null;
  } | null;
};

function fallback(reason: string) {
  const items: Item[] = [...curatedHome.morning, ...curatedHome.evening].map((f, i) => ({
    id: `curated-${i}`,
    title: f.title,
    text: f.text,
    theme: null,
    inspiration: null,
  }));
  return { source: "placeholder" as const, reason, count: items.length, items };
}

export async function GET() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return NextResponse.json(fallback("env_absente"), { status: 200 });

  try {
    const q =
      `${url}/rest/v1/wisdom_fragments` +
      `?select=id,fr_title,final_fr_text,final_en_text,final_es_text,theme,` +
      `fragment_sources!inner(source_type,source_tradition,source_author,source_reference,source_summary,contemporary_reading,display_disclaimer,source_confidence,is_primary)` +
      `&final_editor_approved=eq.true&publication_status=eq.ready&final_fr_text=not.is.null` +
      `&fragment_type=in.(aphorism,law,short_fragment,dialogue)` +
      `&use_case=cs.{site}` +
      `&fragment_sources.is_primary=is.true&fragment_sources.source_confidence=in.(high,medium)` +
      `&order=created_at.asc`;

    const res = await fetch(q, { headers: { apikey: key, Authorization: `Bearer ${key}` }, cache: "no-store" });
    if (!res.ok) return NextResponse.json(fallback(`supabase_${res.status}`), { status: 200 });

    const rows = await res.json();
    // CRÉDIBILITÉ : jamais "à confirmer" en public.
    //  - on retire toute mention "(à confirmer)" des champs affichés ;
    //  - une référence PRÉCISE n'est montrée QUE si verified_by est renseigné ;
    //  - sinon : référence supprimée, on ne garde que la tradition générale.
    const clean = (v: unknown): string | null => {
      const s = (v == null ? "" : String(v)).replace(/\s*\(?\s*à\s+confirmer\s*\)?/gi, "").replace(/\s{2,}/g, " ").replace(/\s+([;,.])/g, "$1").trim();
      return s ? s : null;
    };
    const items: Item[] = (Array.isArray(rows) ? rows : [])
      .map((r: Record<string, unknown>): Item | null => {
        const srcs = (r.fragment_sources as Record<string, unknown>[]) || [];
        const s = srcs.find((x) => x.is_primary) || srcs[0];
        if (!s) return null; // jamais de fragment sans source
        const fr = String(r.final_fr_text || "");
        const title = String(r.fr_title || "");
        const verified = !!s.verified_by;
        return {
          id: String(r.id),
          title: { fr: title, en: title, es: title },
          text: {
            fr,
            en: String(r.final_en_text || fr),
            es: String(r.final_es_text || fr),
          },
          theme: (r.theme as string) || null,
          inspiration: {
            type: String(s.source_type || ""),
            tradition: clean(s.source_tradition),               // formulation générale honnête
            author: clean(s.source_author),
            reference: verified ? clean(s.source_reference) : null, // précis seulement si vérifié
            summary: clean(s.source_summary),
            reading: clean(s.contemporary_reading),
            disclaimer: clean(s.display_disclaimer),
            confidence: (s.source_confidence as string) || null,
          },
        };
      })
      .filter((x): x is Item => x !== null && x.inspiration !== null);

    if (items.length === 0) return NextResponse.json(fallback("vide"), { status: 200 });
    return NextResponse.json({ source: "supabase", count: items.length, items }, { status: 200 });
  } catch {
    return NextResponse.json(fallback("exception"), { status: 200 });
  }
}
