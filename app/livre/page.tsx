import type { Metadata } from "next";
import { BookView } from "@/components/book-view";

export const metadata: Metadata = {
  title: "Le Livre",
  description:
    "Les Lois Invisibles, en constitution. Aperçu d'un extrait en cours de sélection : fragments courts, sobres et denses sur la mort, la parole.",
};

export default function LivrePage() {
  return <BookView />;
}
