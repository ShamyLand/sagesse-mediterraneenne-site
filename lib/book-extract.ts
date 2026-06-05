import type { Language } from "@/types/quote";

/**
 * Extraits de /livre. Deux usages distincts :
 *  1) `firstPages` — extrait CONTINU des premières pages du livre (Domaine I) :
 *     épigraphe → début de méditation (coupé « […] ») → 4 premiers fragments,
 *     dans l'ordre RÉEL du PDF V9. Donne la sensation d'ouvrir le livre.
 *  2) `bookExtract` — sélection REPRÉSENTATIVE plus courte (autres Domaines),
 *     pour montrer l'amplitude des thèmes.
 *
 * Textes FR repris FIDÈLEMENT du canon (BOOK_1_PDF_STRUCTURE.json, intérieur V9).
 * Traductions EN/ES issues des fichiers de traduction du livre.
 * Aucun fragment canonique n'est modifié ; aucune réécriture.
 */

export interface BookFragment {
  title: Record<Language, string>;
  format: Record<Language, string>;
  text: Record<Language, string>;
}

/** Fragment tel qu'il apparaît dans le livre : titre + texte (sans étiquette de tradition). */
export interface ExcerptFragment {
  title: Record<Language, string>;
  text: Record<Language, string>;
}

export interface FirstPages {
  epigraph: Record<Language, string>;
  meditationTitle: Record<Language, string>;
  /** Premier paragraphe de la méditation ; la coupure « […] » est ajoutée par la vue. */
  meditationExcerpt: Record<Language, string>;
  fragments: ExcerptFragment[];
}

/** Domaine I — De l'être intérieur. Extrait continu des premières pages (ordre PDF V9). */
export const firstPages: FirstPages = {
  epigraph: {
    fr: "Avant la cité, avant la maison, il y a celui qui se ment ou se regarde.",
    en: "Before the city, before the house, there is the one who lies to himself or looks at himself.",
    es: "Antes de la ciudad, antes de la casa, está quien se miente o se mira.",
  },
  meditationTitle: {
    fr: "Ce qu'on refuse de voir",
    en: "What We Refuse to See",
    es: "Lo que nos negamos a ver",
  },
  meditationExcerpt: {
    fr: "Nous passons nos journées à juger : un conducteur, un collègue, un inconnu. Le regard sort de nous sans effort, toujours dirigé vers l'extérieur, comme s'il avait peur de revenir. Car le seul endroit qu'il évite, c'est nous-mêmes.",
    en: "We spend our days judging: a driver, a colleague, a stranger. The gaze leaves us effortlessly, always turned outward, as if afraid to return. For the one place it avoids is ourselves.",
    es: "Pasamos los días juzgando: a un conductor, a un colega, a un desconocido. La mirada sale de nosotros sin esfuerzo, siempre hacia afuera, como si temiera volver. Porque el único lugar que evita somos nosotros mismos.",
  },
  fragments: [
    {
      title: { fr: "La générosité filmée", en: "Generosity on camera", es: "La generosidad filmada" },
      text: {
        fr: "Quand je filme mon acte généreux, je transforme l'autre en décor de ma vertu.",
        en: "When I film my generous act, I turn the other person into a backdrop for my virtue.",
        es: "Cuando filmo mi acto generoso, convierto al otro en el decorado de mi virtud.",
      },
    },
    {
      title: { fr: "L'orgueil sourd", en: "Deaf Pride", es: "El orgullo sordo" },
      text: {
        fr: "L'orgueil ne se voit pas dans ce qu'on dit de soi, mais dans tout ce qu'on refuse d'entendre.",
        en: "Pride shows not in what we say about ourselves, but in all we refuse to hear.",
        es: "El orgullo no se ve en lo que decimos de nosotros mismos, sino en todo lo que nos negamos a escuchar.",
      },
    },
    {
      title: { fr: "L'humilité affichée", en: "Displayed humility", es: "La humildad exhibida" },
      text: {
        fr: "Afficher son humilité, c'est encore une manière de parler de soi.",
        en: "To display one's humility is still a way of talking about oneself.",
        es: "Exhibir la propia humildad es todavía una manera de hablar de uno mismo.",
      },
    },
    {
      title: { fr: "La honte et le regard", en: "Shame and the gaze", es: "La vergüenza y la mirada" },
      text: {
        fr: "On craint moins de mal agir que d'être vu mal agir : la honte surveille le regard des autres, pas la conscience.",
        en: "We fear doing wrong less than being seen doing wrong: shame watches the eyes of others, not the conscience.",
        es: "Tememos menos obrar mal que ser vistos obrando mal: la vergüenza vigila la mirada ajena, no la conciencia.",
      },
    },
  ],
};

/**
 * Sélection représentative — fragments d'AUTRES Domaines (II, III, V, VIII),
 * pour l'amplitude des thèmes, sans recouper l'extrait continu du Domaine I.
 * « format » = tradition d'inspiration, jamais une citation.
 */
export const bookExtract: BookFragment[] = [
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
];
