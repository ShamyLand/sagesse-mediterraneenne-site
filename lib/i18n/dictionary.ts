import type { Language } from "@/types/quote";

/**
 * Dictionnaire i18n maison — toutes les chaînes d'interface en fr/en/es.
 * L'œuvre est présentée comme une œuvre éditoriale AUTONOME (pas « un projet de… »).
 * Intitulé officiel = le titre + le sous-titre, traduits selon la langue :
 *   FR : Les Lois Invisibles  — Fragments de sagesse pour le monde moderne
 *   EN : The Invisible Laws   — Fragments of wisdom for the modern world
 *   ES : Las Leyes Invisibles — Fragmentos de sabiduría para el mundo moderno
 */

export type I18nKey =
  | "work.title"
  | "work.subtitle"
  | "site.tagline"
  | "site.intro"
  | "nav.home"
  | "nav.book"
  | "nav.manifesto"
  | "nav.fragmentOfDay"
  | "home.morning.label"
  | "home.morning.intent"
  | "home.evening.label"
  | "home.evening.intent"
  | "home.attribution"
  | "home.also"
  | "cta.book"
  | "cta.manifesto"
  | "cta.receive"
  | "cta.receive.soon"
  | "nav.back.home";

export const dict: Record<Language, Record<I18nKey, string>> = {
  fr: {
    "work.title": "Les Lois Invisibles",
    "work.subtitle": "Fragments de sagesse pour le monde moderne",
    "site.tagline": "Des fragments de sagesse pour mieux lire notre époque.",
    "site.intro": "Des textes brefs pour éclairer nos failles, nos choix et nos contradictions.",
    "nav.home": "Accueil",
    "nav.book": "Le Livre",
    "nav.manifesto": "Manifeste",
    "nav.fragmentOfDay": "Fragment du jour",
    "home.morning.label": "Fragment du matin",
    "home.morning.intent": "Pour redresser, agir, tenir parole.",
    "home.evening.label": "Fragment du soir",
    "home.evening.intent": "Pour apaiser, prendre du recul, réparer.",
    "home.attribution": "Les Lois Invisibles",
    "home.also": "Aussi disponible maintenant",
    "cta.book": "Lire le Livre",
    "cta.manifesto": "Lire l’intention",
    "cta.receive": "Recevoir une sagesse",
    "cta.receive.soon": "Bientôt",
    "nav.back.home": "← Accueil",
  },
  en: {
    "work.title": "The Invisible Laws",
    "work.subtitle": "Fragments of wisdom for the modern world",
    "site.tagline": "Fragments of wisdom to better read our time.",
    "site.intro": "Short texts to shed light on our flaws, our choices and our contradictions.",
    "nav.home": "Home",
    "nav.book": "The Book",
    "nav.manifesto": "Manifesto",
    "nav.fragmentOfDay": "Fragment of the day",
    "home.morning.label": "Morning Fragment",
    "home.morning.intent": "To rise, to act, to keep one’s word.",
    "home.evening.label": "Evening Fragment",
    "home.evening.intent": "To soften, to step back, to repair.",
    "home.attribution": "The Invisible Laws",
    "home.also": "Also available now",
    "cta.book": "Read the Book",
    "cta.manifesto": "Read the intention",
    "cta.receive": "Receive a wisdom",
    "cta.receive.soon": "Soon",
    "nav.back.home": "← Home",
  },
  es: {
    "work.title": "Las Leyes Invisibles",
    "work.subtitle": "Fragmentos de sabiduría para el mundo moderno",
    "site.tagline": "Fragmentos de sabiduría para leer mejor nuestra época.",
    "site.intro": "Textos breves para alumbrar nuestras grietas, nuestras decisiones y nuestras contradicciones.",
    "nav.home": "Inicio",
    "nav.book": "El Libro",
    "nav.manifesto": "Manifiesto",
    "nav.fragmentOfDay": "Fragmento del día",
    "home.morning.label": "Fragmento de la mañana",
    "home.morning.intent": "Para erguirse, actuar, cumplir la palabra.",
    "home.evening.label": "Fragmento de la noche",
    "home.evening.intent": "Para serenar, tomar distancia, reparar.",
    "home.attribution": "Las Leyes Invisibles",
    "home.also": "También disponible ahora",
    "cta.book": "Leer el Libro",
    "cta.manifesto": "Leer la intención",
    "cta.receive": "Recibir una sabiduría",
    "cta.receive.soon": "Pronto",
    "nav.back.home": "← Inicio",
  },
};
