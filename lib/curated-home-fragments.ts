import type { Language } from "@/types/quote";
import type { LocalizedFragment } from "@/lib/fragments-placeholder";

/**
 * SET CURÉ DE L'ACCUEIL — validé manuellement (final_editor_approved).
 * Source statique : l'accueil NE lit PLUS Supabase automatiquement.
 * Supabase = réserve éditoriale. Un texte n'arrive ici qu'après validation finale humaine.
 * Uniquement des textes PARFAITEMENT clairs (aphorismes/loi, compréhensibles en 1 lecture).
 */

export const curatedHome: Record<"morning" | "evening", LocalizedFragment[]> = {
  morning: [
    {
      title: { fr: "Le don serré", en: "The Conditional Gift", es: "El don con condición" },
      text: {
        fr: "Le bienfait qui réclame loyauté n’est pas un don ; il enrôle la gratitude contre la conscience.",
        en: "A benefit that demands loyalty is not a gift; it enlists gratitude against conscience.",
        es: "Un beneficio que exige lealtad no es un don; recluta la gratitud contra la conciencia.",
      },
    },
    {
      title: { fr: "Rancune masquée", en: "Masked Grudge", es: "Rencor enmascarado" },
      text: {
        fr: "Quand un juge règle sa rancune, le coupable trouve un complice sur le banc.",
        en: "When a judge settles his grudge, the guilty finds an accomplice on the bench.",
        es: "Cuando un juez resuelve su rencor, el culpable encuentra un cómplice en el banco.",
      },
    },
    {
      title: { fr: "Le don filmé", en: "The Filmed Gift", es: "El don filmado" },
      text: {
        fr: "La main qui donne sous caméra nourrit une bouche et confisque un visage.",
        en: "The hand that gives under the camera feeds a mouth and confiscates a face.",
        es: "La mano que da bajo la cámara alimenta una boca y confisca un rostro.",
      },
    },
  ],
  evening: [
    {
      title: { fr: "Mémoire sous abonnement", en: "Memory on Subscription", es: "Memoria por suscripción" },
      text: {
        fr: "Le marchand met la mémoire des morts sous abonnement ; les vivants paient pour pleurer.",
        en: "The merchant puts the memory of the dead on subscription; the living pay to mourn.",
        es: "El comerciante pone la memoria de los muertos por suscripción; los vivos pagan para llorar.",
      },
    },
    {
      title: { fr: "Le nom gravé", en: "The Engraved Name", es: "El nombre grabado" },
      text: {
        fr: "La mort n’absout pas le retard.",
        en: "Death does not absolve delay.",
        es: "La muerte no absuelve la tardanza.",
      },
    },
  ],
};

/** Index déterministe par date (même jour → même texte ; lendemain → rotation). */
export function pickByDate(list: LocalizedFragment[], dateStr: string, salt: string): LocalizedFragment {
  let h = 0;
  const s = dateStr + salt;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return list[Math.abs(h) % list.length];
}

export type { Language };
