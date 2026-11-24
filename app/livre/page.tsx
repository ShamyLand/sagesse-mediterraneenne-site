import type { Metadata } from "next";
import { BookView } from "@/components/book-view";

// SEO sobre, non trompeur. Le livre est en vente sur Amazon (broché et Kindle) depuis le 23/11/2026.
// Métadonnées en français (langue de rendu par défaut côté serveur) ; les versions EN/ES
// sont rendues côté client. Une vraie localisation des métadonnées exigerait des routes /en /es
// (non en place) — documenté dans LIVRE_PAGE_PREVIEW_QA_REPORT.md.
const DESCRIPTION =
  "Les Lois Invisibles — 203 fragments de sagesse pour mieux lire notre époque. Broché et Kindle sur Amazon, extraits, les huit Domaines, et le rituel quotidien gratuit.";


/** Données structurées « Book » (Google) : éditions papier et Kindle, liens d'achat Amazon. */
const BOOK_LD = {
  "@context": "https://schema.org",
  "@type": "Book",
  name: "Les Lois Invisibles",
  alternateName: "Fragments de sagesse pour le monde moderne",
  author: { "@type": "Person", name: "J.H. Gram", url: "https://jhgram.vercel.app" },
  inLanguage: "fr",
  url: "https://jhgram.vercel.app/livre",
  image: "https://jhgram.vercel.app/og-livre.png",
  description: DESCRIPTION,
  workExample: [
    {
      "@type": "Book",
      bookFormat: "https://schema.org/Paperback",
      isbn: "9798144993425",
      numberOfPages: 136,
      inLanguage: "fr",
      offers: { "@type": "Offer", price: "11.90", priceCurrency: "EUR", availability: "https://schema.org/InStock", url: "https://www.amazon.fr/dp/B0HSNV9MST" },
    },
    {
      "@type": "Book",
      bookFormat: "https://schema.org/EBook",
      inLanguage: "fr",
      offers: { "@type": "Offer", price: "3.99", priceCurrency: "EUR", availability: "https://schema.org/InStock", url: "https://www.amazon.fr/dp/B0HSM8K3GL" },
    },
  ],
};

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
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BOOK_LD) }} />
      <BookView />
    </>
  );
}
