import type { Metadata } from "next";
import { FragmentsClient } from "./fragments-client";

export const metadata: Metadata = {
  title: "Les Lois Invisibles — fragments",
  description: "Fragments de sagesse adaptés au monde moderne, chacun adossé à une source ancienne.",
};
export const dynamic = "force-dynamic";

export default function FragmentsPage() {
  return <FragmentsClient />;
}
