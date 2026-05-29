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
  | "home.also"
  | "cta.book"
  | "cta.manifesto"
  | "cta.receive"
  | "cta.receive.soon"
  | "nav.back.home"
  | "manifesto.heading"
  | "manifesto.intro"
  | "manifesto.socle";

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
    "home.also": "Aussi disponible maintenant",
    "cta.book": "Lire le Livre",
    "cta.manifesto": "Lire l’intention",
    "cta.receive": "Recevoir une sagesse",
    "cta.receive.soon": "Bientôt",
    "nav.back.home": "← Accueil",
    "manifesto.heading": "L’intention",
    "manifesto.intro":
      "Les Lois Invisibles ne sont pas un livre religieux, ni un recueil de citations, ni du développement personnel. C’est une relecture moderne des sagesses anciennes pour comprendre les failles humaines contemporaines.",
    "manifesto.socle":
      "La Sagesse Méditerranéenne est le socle civilisationnel du projet : l’héritage des textes religieux, philosophiques, juridiques et moraux nés autour de la Méditerranée — Bible, Torah, Coran, traditions abrahamiques, stoïcisme, sagesse populaire.",
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
    "home.also": "Also available now",
    "cta.book": "Read the Book",
    "cta.manifesto": "Read the intention",
    "cta.receive": "Receive a wisdom",
    "cta.receive.soon": "Soon",
    "nav.back.home": "← Home",
    "manifesto.heading": "The Intention",
    "manifesto.intro":
      "The Invisible Laws is not a religious book, nor a collection of quotations, nor self-help. It is a modern rereading of ancient wisdom to understand the contemporary fractures of human nature.",
    "manifesto.socle":
      "Mediterranean Wisdom is the civilizational foundation of the project: the heritage of the religious, philosophical, legal and moral texts born around the Mediterranean — Bible, Torah, Quran, Abrahamic traditions, Stoicism, popular wisdom.",
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
    "home.also": "También disponible ahora",
    "cta.book": "Leer el Libro",
    "cta.manifesto": "Leer la intención",
    "cta.receive": "Recibir una sabiduría",
    "cta.receive.soon": "Pronto",
    "nav.back.home": "← Inicio",
    "manifesto.heading": "La intención",
    "manifesto.intro":
      "Las Leyes Invisibles no son un libro religioso, ni una colección de citas, ni desarrollo personal. Es una relectura moderna de las sabidurías antiguas para comprender las grietas humanas contemporáneas.",
    "manifesto.socle":
      "La Sabiduría Mediterránea es el cimiento civilizatorio del proyecto: la herencia de los textos religiosos, filosóficos, jurídicos y morales nacidos en torno al Mediterráneo — Biblia, Torá, Corán, tradiciones abrahámicas, estoicismo, sabiduría popular.",
  },
};
