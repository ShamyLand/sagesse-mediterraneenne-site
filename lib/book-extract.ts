import type { Language } from "@/types/quote";

/**
 * Vitrine du Livre (/livre) — fragments GOLDÉS + sourcés (doctrine actuelle), pas les anciens V1/V2.
 * 4 sentences courtes + 1 méditation longue. Aucune citation directe ; "format" = tradition d'inspiration.
 * "text" : paragraphes séparés par \n\n.
 */

export interface BookFragment {
  title: Record<Language, string>;
  format: Record<Language, string>;
  text: Record<Language, string>;
}

export const bookExtract: BookFragment[] = [
  {
    title: { fr: "L'orgueil sourd", en: "Deaf Pride", es: "El orgullo sordo" },
    format: { fr: "Proverbes", en: "Proverbs", es: "Proverbios" },
    text: {
      fr: "L'orgueil ne se voit pas dans ce qu'on dit de soi, mais dans tout ce qu'on refuse d'entendre.",
      en: "Pride is not seen in what one says about oneself, but in everything one refuses to hear.",
      es: "El orgullo no se muestra en lo que uno dice de sí mismo, sino en todo lo que se niega a escuchar.",
    },
  },
  {
    title: { fr: "Le don qui oblige", en: "The Gift That Binds", es: "El don que obliga" },
    format: { fr: "Stoïcisme", en: "Stoicism", es: "Estoicismo" },
    text: {
      fr: "Un cadeau qui attend de la reconnaissance n'en est plus un : c'est un prêt qui n'ose pas dire son nom.",
      en: "A gift that expects recognition is no longer a gift: it is a loan that does not dare speak its name.",
      es: "Un regalo que espera reconocimiento ya no es un regalo: es un préstamo que no se atreve a decir su nombre.",
    },
  },
  {
    title: { fr: "Le flatteur", en: "The Flatterer", es: "El adulador" },
    format: { fr: "Proverbes", en: "Proverbs", es: "Proverbios" },
    text: {
      fr: "Le flatteur ne t'admire pas : il étudie l'endroit où tu baisses la garde.",
      en: "The flatterer does not admire you: he studies where you let your guard down.",
      es: "El adulador no te admira: estudia el lugar donde bajas la guardia.",
    },
  },
  {
    title: { fr: "Jamais rassasié", en: "Never Satisfied", es: "Nunca saciado" },
    format: { fr: "Sagesse biblique", en: "Biblical wisdom", es: "Sabiduría bíblica" },
    text: {
      fr: "Celui qui aime l'argent n'en a jamais assez : ce n'est pas la richesse qu'il poursuit, c'est l'angoisse de manquer.",
      en: "He who loves money is never satisfied: it is not wealth he seeks, but the anxiety of lacking.",
      es: "Quien ama el dinero nunca tiene suficiente: no busca la riqueza, sino la angustia de carecer.",
    },
  },
  {
    title: { fr: "Ce qu'on transmet", en: "What We Pass On", es: "Lo que transmitimos" },
    format: { fr: "Méditation", en: "Meditation", es: "Meditación" },
    text: {
      fr: "On croit transmettre à ses enfants une maison, un nom, un métier. Mais ce qui passe vraiment, sans qu'on le décide, ce sont les peurs qu'on n'a pas regardées et les colères qu'on n'a pas réglées.\n\nL'héritage le plus lourd n'est pas écrit sur le testament : c'est tout ce qu'on n'a pas eu le courage de finir.",
      en: "We believe we pass on to our children a house, a name, a trade. But what truly passes, without our deciding it, are the fears we never faced and the angers we never settled.\n\nThe heaviest inheritance is not written in the will: it is everything we lacked the courage to finish.",
      es: "Creemos transmitir a nuestros hijos una casa, un nombre, un oficio. Pero lo que de verdad pasa, sin que lo decidamos, son los miedos que no miramos y las cóleras que no resolvimos.\n\nLa herencia más pesada no está escrita en el testamento: es todo lo que no tuvimos el valor de terminar.",
    },
  },
];
