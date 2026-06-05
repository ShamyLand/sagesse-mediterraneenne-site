import type { Metadata } from "next";
import { BookView } from "@/components/book-view";

// SEO sobre, non trompeur. Pas de promesse commerciale : le livre n'est pas encore en vente.
// Métadonnées en français (langue de rendu par défaut côté serveur) ; les versions EN/ES
// sont rendues côté client. Une vraie localisation des métadonnées exigerait des routes /en /es
// (non en place) — documenté dans LIVRE_PAGE_PREVIEW_QA_REPORT.md.
const DESCRIPTION =
  "Les Lois Invisibles — un livre de fragments : une sagesse ancienne, méditerranéenne et philosophique, relue pour les failles du monde moderne. Extraits, les huit Domaines, et le rituel quotidien gratuit.";

export const metadata: Metadata = {
  title: "Le livre",
  description: DESCRIPTION,
  alternates: { canonical: "/livre" },
  openGraph: {
    title: "Les Lois Invisibles — Le livre",
    description: DESCRIPTION,
    url: "/livre",
    type: "website",
    locale: "fr_FR",
    images: [
      {
        url: "/og-livre.png",
        width: 1200,
        height: 630,
        alt: "Les Lois Invisibles — fragments de sagesse pour le monde moderne",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Les Lois Invisibles — Le livre",
    description: DESCRIPTION,
    images: ["/og-livre.png"],
  },
};

export default function LivrePage() {
  return <BookView />;
}
