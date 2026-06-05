import type { Metadata } from "next";
import { IntentionView } from "@/components/intention-view";

const DESCRIPTION =
  "L'intention derrière Les Lois Invisibles : l'origine personnelle du projet, le lien avec la sagesse ancienne et la transmission, et pourquoi les fragments quotidiens restent gratuits.";

export const metadata: Metadata = {
  title: "L'intention",
  description: DESCRIPTION,
  alternates: { canonical: "/intention" },
  openGraph: {
    title: "L'intention — Les Lois Invisibles",
    description: DESCRIPTION,
    url: "/intention",
    type: "article",
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
    title: "L'intention — Les Lois Invisibles",
    description: DESCRIPTION,
    images: ["/og-livre.png"],
  },
};

export default function IntentionPage() {
  return <IntentionView />;
}
