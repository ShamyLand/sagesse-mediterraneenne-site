import { curatedHome } from "@/lib/curated-home-fragments";

/**
 * Logique partagée corpus site (server-only). Utilisée par /api/fragments ET la page SSR /fragments.
 * N'expose QUE des fragments publiables ET sourcés. Jamais "à confirmer".
 * Référence précise affichée UNIQUEMENT si verified_by ; sinon tradition générale. Fallback set curé.
 */

export type Loc = { fr: string; en: string; es: string };
export type Inspiration = {
  type: string;
  tradition: string | null;
  author: string | null;
  reference: string | null;
  summary: string | null;
  reading: string | null;
  disclaimer: string | null;
  confidence: string | null;
};
export type Item = { id: string; title: Loc; text: Loc; theme: string | null; inspiration: Inspiration | null };
export type Payload = { source: "supabase" | "placeholder"; reason?: string; count: number; items: Item[] };

const clean = (v: unknown): string | null => {
  const s = (v == null ? "" : String(v))
    .replace(/\s*\(?\s*à\s+confirmer\s*\)?/gi, "")
    .replace(/\s{2,}/g, " ")
    .replace(/\s+([;,.])/g, "$1")
    .trim();
  return s ? s : null;
};

export function curatedFallback(reason: string): Payload {
  const items: Item[] = [...curatedHome.morning, ...curatedHome.evening].map((f, i) => ({
    id: `curated-${i}`,
    title: f.title,
    text: f.text,
    theme: null,
    inspiration: null,
  }));
  return { source: "placeholder", reason, count: items.length, items };
}

export async function getSiteFragments(): Promise<Payload> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return curatedFallback("env_absente");

  try {
    const q =
      `${url}/rest/v1/wisdom_fragments` +
      `?select=id,fr_title,final_fr_text,final_en_text,final_es_text,theme,` +
      `fragment_sources!inner(source_type,source_tradition,source_author,source_reference,source_summary,contemporary_reading,display_disclaimer,source_confidence,is_primary,verified_by)` +
      `&final_editor_approved=eq.true&publication_status=eq.ready&final_fr_text=not.is.null` +
      `&fragment_type=in.(aphorism,law,short_fragment,dialogue)` +
      `&use_case=cs.{site}` +
      `&fragment_sources.is_primary=is.true&fragment_sources.source_confidence=in.(high,medium)` +
      `&order=created_at.asc`;

    const res = await fetch(q, { headers: { apikey: key, Authorization: `Bearer ${key}` }, cache: "no-store" });
    if (!res.ok) return curatedFallback(`supabase_${res.status}`);

    // ANTI-FUITE : on nettoie le TEXTE BRUT de la réponse (toute mention "à confirmer" retirée)
    // AVANT parsing, pour qu'aucune donnée brute sérialisable (props RSC, cache fetch) ne la contienne.
    const rawText = (await res.text())
      .replace(/\s*\(?\s*à\s+confirmer\s*\)?/gi, "")
      .replace(/\s{2,}/g, " ");
    const rows = JSON.parse(rawText);
    // De plus : on neutralise toute référence précise NON vérifiée dans les lignes brutes elles-mêmes.
    if (Array.isArray(rows)) {
      for (const r of rows as Record<string, unknown>[]) {
        for (const s of ((r.fragment_sources as Record<string, unknown>[]) || [])) {
          if (!s.verified_by) s.source_reference = null;
        }
      }
    }
    const items: Item[] = (Array.isArray(rows) ? rows : [])
      .map((r: Record<string, unknown>): Item | null => {
        const srcs = (r.fragment_sources as Record<string, unknown>[]) || [];
        const s = srcs.find((x) => x.is_primary) || srcs[0];
        if (!s) return null;
        const fr = String(r.final_fr_text || "");
        const title = String(r.fr_title || "");
        const verified = !!s.verified_by;
        return {
          id: String(r.id),
          title: { fr: title, en: title, es: title },
          text: { fr, en: String(r.final_en_text || fr), es: String(r.final_es_text || fr) },
          theme: (r.theme as string) || null,
          inspiration: {
            type: String(s.source_type || ""),
            tradition: clean(s.source_tradition),
            author: clean(s.source_author),
            reference: verified ? clean(s.source_reference) : null,
            summary: clean(s.source_summary),
            reading: clean(s.contemporary_reading),
            disclaimer: clean(s.display_disclaimer),
            confidence: (s.source_confidence as string) || null,
          },
        };
      })
      .filter((x): x is Item => x !== null && x.inspiration !== null);

    if (items.length === 0) return curatedFallback("vide");
    return { source: "supabase", count: items.length, items };
  } catch {
    return curatedFallback("exception");
  }
}
