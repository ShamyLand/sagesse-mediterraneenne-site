import type { Language } from "@/types/quote";

/**
 * Fragments placeholder pour l'aperçu matin/soir (lot S1).
 * Multilingues fr/en/es pour ne jamais mélanger les langues sur la page.
 * À remplacer plus tard par la source de données (webhook n8n matin/soir).
 * Textes issus du corpus validé (clairs en une lecture).
 */

export type Moment = "morning" | "evening";

export interface LocalizedFragment {
  title: Record<Language, string>;
  text: Record<Language, string>;
}

export const placeholderFragments: Record<Moment, LocalizedFragment> = {
  // Matin — élan, responsabilité, parole tenue
  morning: {
    title: {
      fr: "La parole tenue",
      en: "The Kept Word",
      es: "La palabra cumplida",
    },
    text: {
      fr: "On juge une vie moins à ce qu’un homme a promis qu’à ce qu’il a réellement rendu aux autres.",
      en: "A life is judged less by what a man promised than by what he truly gave back to others.",
      es: "Una vida se juzga menos por lo que un hombre prometió que por lo que realmente devolvió a los demás.",
    },
  },
  // Soir — recul, réparation, regard sur la journée
  evening: {
    title: {
      fr: "Le retard",
      en: "The Delay",
      es: "El retraso",
    },
    text: {
      fr: "La mort n’absout pas le retard ; ce qu’on tait trop longtemps revient frapper à la porte des vivants.",
      en: "Death does not absolve delay; what we leave unsaid too long comes knocking at the door of the living.",
      es: "La muerte no absuelve la tardanza; lo que se calla demasiado tiempo vuelve a llamar a la puerta de los vivos.",
    },
  },
};
