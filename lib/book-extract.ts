import type { Language } from "@/types/quote";

/**
 * Extrait du livre affiché sur /livre — multilingue (fr/en/es), provisoire.
 * Traductions EN/ES de travail, à affiner par le pipeline éditorial plus tard.
 * "text" : paragraphes séparés par \n\n ; sauts de ligne internes (dialogue) par \n.
 */

export interface BookFragment {
  title: Record<Language, string>;
  format: Record<Language, string>;
  text: Record<Language, string>;
}

export const bookExtract: BookFragment[] = [
  {
    title: {
      fr: "Mémoire sous abonnement",
      en: "Memory on Subscription",
      es: "Memoria por suscripción",
    },
    format: { fr: "aphorisme · la mort", en: "aphorism · death", es: "aforismo · la muerte" },
    text: {
      fr: "Le marchand met la mémoire des morts sous abonnement; les vivants paient pour pleurer.",
      en: "The merchant puts the memory of the dead on subscription; the living pay to mourn.",
      es: "El mercader pone la memoria de los muertos en suscripción; los vivos pagan por llorar.",
    },
  },
  {
    title: {
      fr: "Le Nom Gravé",
      en: "The Engraved Name",
      es: "El nombre grabado",
    },
    format: { fr: "loi · la mort", en: "law · death", es: "ley · la muerte" },
    text: {
      fr: "La tombe reçoit le nom du mort; les vivants y déposent les paroles que la honte ou l’orgueil ont retenues. La mort n’absout pas le retard.",
      en: "The grave receives the name of the dead; the living lay there the words that shame or pride held back. Death does not absolve delay.",
      es: "La tumba recibe el nombre del muerto; los vivos depositan allí las palabras que la vergüenza o el orgullo retuvieron. La muerte no absuelve la tardanza.",
    },
  },
  {
    title: {
      fr: "La rumeur vendue",
      en: "The Sold Rumor",
      es: "El rumor vendido",
    },
    format: { fr: "dialogue · la parole", en: "dialogue · speech", es: "diálogo · la palabra" },
    text: {
      fr: "— Marchand, tu as vendu le nom d’un homme sans l’avoir vu fauter.\n— Je n’ai rien inventé; la parole était déjà dans la foule.\n— Le témoin souleva le drap de l’étal : sous les pièces, le sceau du marchand collait encore à la tablette.",
      en: "— Merchant, you sold a man’s name without ever seeing him sin.\n— I invented nothing; the word was already in the crowd.\n— The witness lifted the cloth of the stall: beneath the coins, the merchant’s seal still clung to the slab.",
      es: "— Mercader, vendiste el nombre de un hombre sin haberlo visto faltar.\n— No inventé nada; la palabra ya estaba en la multitud.\n— El testigo levantó el paño del puesto: bajo las monedas, el sello del mercader aún se pegaba a la tabla.",
    },
  },
  {
    title: {
      fr: "Les trois colonnes",
      en: "The Three Columns",
      es: "Las tres columnas",
    },
    format: { fr: "récit · la mort", en: "tale · death", es: "relato · la muerte" },
    text: {
      fr: "À sa mort, il ne laissa presque rien. Seulement un cahier avec trois colonnes : ce qu’il avait reçu, ce qu’il avait rendu, et ce qu’il avait gardé pour lui.\n\nL’héritier comprit alors qu’une vie ne se juge pas à ce qu’elle possède, mais à ce qu’elle restitue.",
      en: "At his death, he left almost nothing. Only a notebook with three columns: what he had received, what he had given back, and what he had kept for himself.\n\nThe heir understood then that a life is judged not by what it owns, but by what it gives back.",
      es: "A su muerte, no dejó casi nada. Solo un cuaderno con tres columnas: lo que había recibido, lo que había devuelto, y lo que había guardado para sí.\n\nEl heredero comprendió entonces que una vida no se juzga por lo que posee, sino por lo que restituye.",
    },
  },
];
