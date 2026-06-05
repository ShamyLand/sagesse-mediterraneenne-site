import type { Language } from "@/types/quote";

/**
 * Typographie d'affichage (couche site, non destructive).
 * - apostrophe courbe ’ partout ;
 * - en français, espace insécable (U+00A0) avant ; : ! ? et à l'intérieur des guillemets « ».
 * Conversion purement visuelle au rendu — ne modifie aucun contenu source.
 */
export function typo(text: string, lang: Language): string {
  let out = text.replace(/'/g, "’");
  if (lang === "fr") {
    out = out.replace(/ ([;:!?])/g, " $1");
    out = out.replace(/«\s+/g, "« ").replace(/\s+»/g, " »");
  }
  return out;
}

/** Guillemets localisés autour d'un texte (« » pour FR/ES, “ ” pour EN). */
export function quote(text: string, lang: Language): string {
  return lang === "en" ? `“${text}”` : `« ${text} »`;
}
