import { curatedHome } from "@/lib/curated-home-fragments";
import translationsRaw from "@/lib/fragment-translations.json";

/**
 * Logique partagée corpus site (server-only). Utilisée par l'accueil SSR et le registre admin.
 * N'expose QUE des fragments publiables ET sourcés. Jamais "à confirmer".
 * Multilingue : les traductions EN/ES vivent dans fragment-translations.json (contenu repo, PAS Supabase)
 * et sont fusionnées ici. Référence précise seulement si verified_by. Fallback set curé.
 */

export type Lang = "fr" | "en" | "es";
export type Loc = Record<Lang, string>;
export type Inspiration = {
  type: string;
  tradition: Loc | null;
  author: string | null;
  reference: string | null;
  summary: Loc | null;
  reading: Loc | null;
  disclaimer: Loc | null;
  confidence: string | null;
};
export type Item = { id: string; title: Loc; text: Loc; theme: string | null; inspiration: Inspiration | null };
export type Payload = { source: "supabase" | "placeholder"; reason?: string; count: number; items: Item[] };

type TrEntry = {
  text?: Partial<Record<"en" | "es", string>>;
  summary?: Partial<Record<"en" | "es", string>>;
  reading?: Partial<Record<"en" | "es", string>>;
  tradition?: Partial<Record<"en" | "es", string>>;
};
const TR = translationsRaw as Record<string, TrEntry>;

const DISCLAIMER: Loc = {
  fr: "Ce fragment n'est pas une citation directe ; il transpose un thème ancien dans une situation contemporaine.",
  en: "This fragment is not a direct quotation; it transposes an ancient theme into a contemporary situation.",
  es: "Este fragmento no es una cita directa; traslada un tema antiguo a una situación contemporánea.",
};

const clean = (v: unknown): string | null => {
  const s = (v == null ? "" : String(v))
    .replace(/\s*\(?\s*à\s+confirmer\s*\)?/gi, "")
    .replace(/\s{2,}/g, " ")
    .replace(/\s+([;,.])/g, "$1")
    .trim();
  return s ? s : null;
};
// Construit un Loc à partir du FR + traductions optionnelles (fallback FR si manquant).
const loc = (fr: string | null, t?: Partial<Record<"en" | "es", string>>): Loc | null =>
  fr == null ? null : { fr, en: (t?.en || fr), es: (t?.es || fr) };

export function curatedFallback(reason: string): Payload {
  const items: Item[] = [...curatedHome.morning, ...curatedHome.evening].map((f, i) => ({
    id: `curated-${i}`,
    title: f.title,
    text: f.text, // curatedHome a déjà fr/en/es réels
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
      `fragment_sources!inner(source_type,source_tradition,source_author,source_reference,source_summary,contemporary_reading,source_confidence,is_primary,verified_by)` +
      `&final_editor_approved=eq.true&publication_status=eq.ready&final_fr_text=not.is.null` +
      `&fragment_type=in.(aphorism,law,short_fragment,dialogue)` +
      `&use_case=cs.{site}` +
      `&fragment_sources.is_primary=is.true&fragment_sources.source_confidence=in.(high,medium)` +
      `&order=created_at.asc`;

    const res = await fetch(q, { headers: { apikey: key, Authorization: `Bearer ${key}` }, cache: "no-store" });
    if (!res.ok) return curatedFallback(`supabase_${res.status}`);

    const rawText = (await res.text()).replace(/\s*\(?\s*à\s+confirmer\s*\)?/gi, "").replace(/\s{2,}/g, " ");
    const rows = JSON.parse(rawText);
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
        const t = TR[title]; // traductions repo (par titre FR)
        const verified = !!s.verified_by;
        return {
          id: String(r.id),
          title: { fr: title, en: title, es: title }, // titres non traduits (libellés courts)
          text: {
            fr,
            en: String(r.final_en_text || t?.text?.en || fr),
            es: String(r.final_es_text || t?.text?.es || fr),
          },
          theme: (r.theme as string) || null,
          inspiration: {
            type: String(s.source_type || ""),
            tradition: loc(clean(s.source_tradition), t?.tradition),
            author: clean(s.source_author),
            reference: verified ? clean(s.source_reference) : null,
            summary: loc(clean(s.source_summary), t?.summary),
            reading: loc(clean(s.contemporary_reading), t?.reading),
            disclaimer: DISCLAIMER,
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
