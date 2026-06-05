import type { Language } from "@/types/quote";

/**
 * Vitrine du Livre (/livre) — fragments GOLDÉS + sourcés (doctrine actuelle), pas les anciens V1/V2.
 * 5 fragments courts + 1 méditation. Aucune citation directe ; "format" = tradition d'inspiration.
 * "text" : paragraphes séparés par \n\n. Textes conformes au canon du Livre I.
 */

export interface BookFragment {
  title: Record<Language, string>;
  format: Record<Language, string>;
  text: Record<Language, string>;
}

export const bookExtract: BookFragment[] = [
  {
    // Domaine I — l'orgueil
    title: { fr: "L'orgueil sourd", en: "Deaf Pride", es: "El orgullo sordo" },
    format: { fr: "Proverbes", en: "Proverbs", es: "Proverbios" },
    text: {
      fr: "L'orgueil ne se voit pas dans ce qu'on dit de soi, mais dans tout ce qu'on refuse d'entendre.",
      en: "Pride shows not in what we say about ourselves, but in all we refuse to hear.",
      es: "El orgullo no se ve en lo que decimos de nosotros mismos, sino en todo lo que nos negamos a escuchar.",
    },
  },
  {
    // Domaine II — la parole
    title: { fr: "La parole qui transperce", en: "The Word That Pierces", es: "La palabra que hiere" },
    format: { fr: "Proverbes", en: "Proverbs", es: "Proverbios" },
    text: {
      fr: "Une parole lancée pour blesser fait plus de mal qu'un coup : le corps guérit, le mot reste.",
      en: "A word thrown to wound does more harm than a blow: the body heals, the word stays.",
      es: "Una palabra lanzada para herir hace más daño que un golpe: el cuerpo sana, la palabra queda.",
    },
  },
  {
    // Domaine III — le pouvoir
    title: { fr: "Le flatteur", en: "The Flatterer", es: "El adulador" },
    format: { fr: "Proverbes", en: "Proverbs", es: "Proverbios" },
    text: {
      fr: "Le flatteur ne t'admire pas : il étudie l'endroit où tu baisses la garde.",
      en: "The flatterer does not admire you: they study where you lower your guard.",
      es: "El adulador no te admira: estudia dónde bajas la guardia.",
    },
  },
  {
    // Domaine V — l'argent
    title: { fr: "Le don qui oblige", en: "The Gift That Binds", es: "El don que obliga" },
    format: { fr: "Sagesse", en: "Wisdom", es: "Sabiduría" },
    text: {
      fr: "Un cadeau qui attend de la reconnaissance n'en est plus un : c'est un prêt qui n'ose pas dire son nom.",
      en: "A gift that expects gratitude is no longer one: it is a loan that dares not say its name.",
      es: "Un regalo que espera gratitud ya no lo es: es un préstamo que no se atreve a decir su nombre.",
    },
  },
  {
    // Domaine VIII — le temps et la mort
    title: { fr: "La mort égalise", en: "Death Levels All", es: "La muerte iguala" },
    format: { fr: "Qohélet", en: "Qoheleth", es: "Qohélet" },
    text: {
      fr: "La mort ne respecte ni les titres ni les fortunes : c'est la seule loi que personne n'a jamais contournée.",
      en: "Death respects neither titles nor fortunes: it is the only law no one has ever evaded.",
      es: "La muerte no respeta ni títulos ni fortunas: es la única ley que nadie ha eludido jamás.",
    },
  },
  {
    // Méditation (extrait)
    title: { fr: "Ce qu'on transmet", en: "What We Pass On", es: "Lo que transmitimos" },
    format: { fr: "Méditation", en: "Meditation", es: "Meditación" },
    text: {
      fr: "On croit transmettre à ses enfants une maison, un nom, un métier. Mais ce qui passe vraiment, sans qu'on le décide, ce sont les peurs qu'on n'a pas regardées et les colères qu'on n'a pas réglées.\n\nL'héritage le plus lourd n'est pas écrit sur le testament : c'est tout ce qu'on n'a pas eu le courage de finir.",
      en: "We believe we pass on to our children a house, a name, a trade. But what truly passes, without our deciding it, are the fears we never faced and the angers we never settled.\n\nThe heaviest inheritance is not written in the will: it is everything we lacked the courage to finish.",
      es: "Creemos transmitir a nuestros hijos una casa, un nombre, un oficio. Pero lo que de verdad pasa, sin que lo decidamos, son los miedos que no miramos y las cóleras que no resolvimos.\n\nLa herencia más pesada no está escrita en el testamento: es todo lo que no tuvimos el valor de terminar.",
    },
  },
];
