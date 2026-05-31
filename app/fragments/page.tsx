import type { Metadata } from "next";
import { headers } from "next/headers";
import { curatedFallback, type Payload } from "@/lib/site-fragments";
import { FragmentsView } from "./fragments-client";

export const metadata: Metadata = {
  title: "Les Lois Invisibles — fragments",
  description: "Fragments de sagesse adaptés au monde moderne, chacun adossé à une source ancienne.",
};
export const dynamic = "force-dynamic";

// SSR : la page appelle l'API DÉJÀ NETTOYÉE (/api/fragments). Le fetch Supabase brut reste confiné
// dans le route handler (aucun flight payload) → aucune donnée brute "à confirmer" sérialisée ici.
export default async function FragmentsPage() {
  const h = await headers();
  const host = h.get("host") || "localhost:3000";
  const proto = h.get("x-forwarded-proto") || (host.startsWith("localhost") || host.startsWith("127.") ? "http" : "https");

  let data: Payload;
  try {
    const res = await fetch(`${proto}://${host}/api/fragments`, { cache: "no-store" });
    data = (await res.json()) as Payload;
  } catch {
    data = curatedFallback("self_fetch_failed");
  }

  return <FragmentsView data={data} />;
}
