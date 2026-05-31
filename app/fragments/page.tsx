import type { Metadata } from "next";
import { getSiteFragments } from "@/lib/site-fragments";
import { FragmentsView } from "./fragments-client";

export const metadata: Metadata = {
  title: "Les Lois Invisibles — fragments",
  description: "Fragments de sagesse adaptés au monde moderne, chacun adossé à une source ancienne.",
};
export const dynamic = "force-dynamic";

// SSR : lecture Supabase DIRECTE côté serveur (pas de self-fetch HTTP → fonctionne derrière la
// protection 401 des previews Vercel). getSiteFragments renvoie des données déjà nettoyées
// (strip "à confirmer", référence précise seulement si verified_by). En build Vercel, le fetch
// no-store est server-only → aucune donnée brute embarquée dans le HTML.
export default async function FragmentsPage() {
  const data = await getSiteFragments();
  return <FragmentsView data={data} />;
}
