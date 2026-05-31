import { getSiteFragments } from "@/lib/site-fragments";
import { curatedHome, pickByDate } from "@/lib/curated-home-fragments";
import { HomeView } from "./home-view";
import type { HomeFragment } from "@/components/daily-fragment";

// Accueil = rituel quotidien. Composant SERVEUR : lit les fragments validés+sourcés (getSiteFragments),
// choisit 1 fragment matin + 1 soir du jour (rotation déterministe), fallback set curé si Supabase échoue.
// Chaque carte porte une puce « Voir la source ». /api/daily n'est pas utilisé ; aucun vieux corpus.
export const dynamic = "force-dynamic";

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export default async function Home() {
  const data = await getSiteFragments();
  const day = new Date().toLocaleDateString("en-CA", { timeZone: "Europe/Paris" });

  let morning: HomeFragment;
  let evening: HomeFragment;

  if (data.source === "supabase" && data.items.length >= 2) {
    const n = data.items.length;
    const mi = hash(day + ":m") % n;
    let ei = hash(day + ":e") % n;
    if (ei === mi) ei = (ei + 1) % n;
    const toFrag = (it: (typeof data.items)[number]): HomeFragment => ({
      title: it.title.fr,
      text: it.text, // Loc {fr,en,es}
      source: it.inspiration,
    });
    morning = toFrag(data.items[mi]);
    evening = toFrag(data.items[ei]);
  } else {
    // Fallback set curé statique (pas de source associée) — curatedHome a déjà fr/en/es.
    const m = pickByDate(curatedHome.morning, day, "morning");
    const e = pickByDate(curatedHome.evening, day, "evening");
    morning = { title: m.title.fr, text: m.text, source: null };
    evening = { title: e.title.fr, text: e.text, source: null };
  }

  return <HomeView morning={morning} evening={evening} />;
}
