import { curatedHome } from "@/lib/curated-home-fragments";
import translationsRaw from "@/lib/fragment-translations.json";
import fragmentsRaw from "@/lib/site-fragments-data.json";

/**
 * Corpus du site (server-only). Utilisé par l'accueil SSR, /api/fragments et le registre admin.
 * Les fragments validés + sourcés vivent DANS LE DÉPÔT (site-fragments-data.json) : aucune base externe,
 * donc aucune panne possible côté accueil. Les traductions EN/ES vivent dans fragment-translations.json.
 * N'expose QUE des fragments validés ET sourcés. Jamais « à confirmer ». Référence précise seulement si vérifiée.
 * Pour changer la sélection : scripts/build_site_fragments_data.py (dossier parent), puis commit.
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
export type Payload = { source: "repo" | "placeholder"; reason?: string; count: number; items: Item[] };

type TrEntry = {
  title?: Partial<Record<"en" | "es", string>>;
  text?: Partial<Record<"en" | "es", string>>;
  summary?: Partial<Record<"en" | "es", string>>;
  reading?: Partial<Record<"en" | "es", string>>;
  tradition?: Partial<Record<"en" | "es", string>>;
};
const TR = translationsRaw as Record<string, TrEntry>;

type RawFragment = {
  id: string;
  title: string;
  text: string;
  theme: string | null;
  source: {
    type: string | null;
    tradition: string | null;
    author: string | null;
    reference: string | null;
    summary: string | null;
    reading: string | null;
    confidence: string | null;
    verified: boolean;
  };
};
const RAW = fragmentsRaw as RawFragment[];

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

function toItem(r: RawFragment): Item {
  const t = TR[r.title]; // traductions repo (par titre FR)
  const s = r.source;
  return {
    id: r.id,
    title: { fr: r.title, en: t?.title?.en || r.title, es: t?.title?.es || r.title },
    text: { fr: r.text, en: t?.text?.en || r.text, es: t?.text?.es || r.text },
    theme: r.theme || null,
    inspiration: {
      type: String(s.type || ""),
      tradition: loc(clean(s.tradition), t?.tradition),
      author: clean(s.author),
      reference: s.verified ? clean(s.reference) : null,
      summary: loc(clean(s.summary), t?.summary),
      reading: loc(clean(s.reading), t?.reading),
      disclaimer: DISCLAIMER,
      confidence: s.confidence || null,
    },
  };
}

// Reste async : les appelants (accueil, API, registre) n'ont pas à changer.
export async function getSiteFragments(): Promise<Payload> {
  const items = RAW.filter((r) => r && r.title && r.text && r.source).map(toItem);
  if (items.length === 0) return curatedFallback("vide");
  return { source: "repo", count: items.length, items };
}
