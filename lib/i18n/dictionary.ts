import type { Language } from "@/types/quote";

/**
 * Dictionnaire i18n maison — toutes les chaînes d'interface en fr/en/es.
 * Règle : le titre de l'œuvre ET le nom de l'écosystème sont TRADUITS selon la langue
 * (l'œuvre existe vraiment dans chaque langue, pas comme un site FR traduit).
 *   FR : Les Lois Invisibles      / Sagesse Méditerranéenne
 *   EN : The Invisible Laws       / Mediterranean Wisdom
 *   ES : Las Leyes Invisibles     / Sabiduría Mediterránea
 */

export type I18nKey =
  | "work.title"
  | "eco.name"
  | "site.tagline"
  | "site.intro"
  | "signature.prefix"
  | "nav.home"
  | "nav.book"
  | "nav.manifesto"
  | "nav.fragmentOfDay"
  | "home.morning.label"
  | "home.morning.intent"
  | "home.evening.label"
  | "home.evening.intent"
  | "home.attribution"
  | "cta.book"
  | "cta.manifesto"
  | "cta.receive"
  | "cta.receive.soon";

export const dict: Record<Language, Record<I18nKey, string>> = {
  fr: {
    "work.title": "Les Lois Invisibles",
    "eco.name": "Sagesse Méditerranéenne",
    "site.tagline": "Une sagesse ancienne relue pour les failles du monde moderne.",
    "site.intro": "Des fragments pour comprendre ce que les anciens textes savaient déjà de l’homme.",
    "signature.prefix": "un projet de",
    "nav.home": "Accueil",
    "nav.book": "Le Livre",
    "nav.manifesto": "Manifeste",
    "nav.fragmentOfDay": "Fragment du jour",
    "home.morning.label": "Fragment du matin",
    "home.morning.intent": "Pour redresser, agir, tenir parole.",
    "home.evening.label": "Fragment du soir",
    "home.evening.intent": "Pour apaiser, prendre du recul, réparer.",
    "home.attribution": "Les Lois Invisibles",
    "cta.book": "Lire le Livre",
    "cta.manifesto": "Lire le Manifeste",
    "cta.receive": "Recevoir une sagesse",
    "cta.receive.soon": "Bientôt",
  },
  en: {
    "work.title": "The Invisible Laws",
    "eco.name": "Mediterranean Wisdom",
    "site.tagline": "Ancient wisdom reread for the fractures of the modern world.",
    "site.intro": "Fragments to grasp what the old texts already knew about man.",
    "signature.prefix": "a project of",
    "nav.home": "Home",
    "nav.book": "The Book",
    "nav.manifesto": "Manifesto",
    "nav.fragmentOfDay": "Fragment of the day",
    "home.morning.label": "Morning Fragment",
    "home.morning.intent": "To rise, to act, to keep one’s word.",
    "home.evening.label": "Evening Fragment",
    "home.evening.intent": "To soften, to step back, to repair.",
    "home.attribution": "The Invisible Laws",
    "cta.book": "Read the Book",
    "cta.manifesto": "Read the Manifesto",
    "cta.receive": "Receive a wisdom",
    "cta.receive.soon": "Soon",
  },
  es: {
    "work.title": "Las Leyes Invisibles",
    "eco.name": "Sabiduría Mediterránea",
    "site.tagline": "Una sabiduría antigua releída para las grietas del mundo moderno.",
    "site.intro": "Fragmentos para comprender lo que los textos antiguos ya sabían del hombre.",
    "signature.prefix": "un proyecto de",
    "nav.home": "Inicio",
    "nav.book": "El Libro",
    "nav.manifesto": "Manifiesto",
    "nav.fragmentOfDay": "Fragmento del día",
    "home.morning.label": "Fragmento de la mañana",
    "home.morning.intent": "Para erguirse, actuar, cumplir la palabra.",
    "home.evening.label": "Fragmento de la noche",
    "home.evening.intent": "Para serenar, tomar distancia, reparar.",
    "home.attribution": "Las Leyes Invisibles",
    "cta.book": "Leer el Libro",
    "cta.manifesto": "Leer el Manifiesto",
    "cta.receive": "Recibir una sabiduría",
    "cta.receive.soon": "Pronto",
  },
};
