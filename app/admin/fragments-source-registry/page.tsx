import type { Metadata } from "next";
import { getSiteFragments } from "@/lib/site-fragments";
import { RegistryClient } from "./registry-client";

// Bibliothèque complète PRIVÉE : tous les fragments validés + leurs sources (preuve éditoriale interne).
// noindex, non liée publiquement. Lecture serveur directe (pas de self-fetch → OK derrière protection).
export const metadata: Metadata = {
  title: "Registre des sources (privé)",
  robots: { index: false, follow: false, nocache: true },
};
export const dynamic = "force-dynamic";

export default async function FragmentsSourceRegistryPage() {
  const data = await getSiteFragments();
  return <RegistryClient data={data} />;
}
