import { getSiteFragments } from "@/lib/site-fragments";
import { curatedHome, pickByDate } from "@/lib/curated-home-fragments";
import { HomeView } from "./home-view";
import type { HomeFragment } from "@/components/daily-fragment";

// Accueil = rituel quotidien. Composant SERVEUR : lit les fragments validés+sourcés du dépôt (getSiteFragments),
// choisit 1 fragment matin + 1 soir du jour. Rotation par numéro de jour (heure de Paris) : chaque fragment
// passe une fois le matin et une fois le soir par cycle, jamais deux jours de suite, jamais matin = soir.
// Chaque carte porte une puce « Voir la source ». Aucune base externe ; /api/daily n'est pas utilisé.
export const dynamic = "force-dynamic";

// Numéro du jour (date civile à Paris) : stable toute la journée, +1 à minuit heure de Paris.
function dayNumber(day: string): number {
  const [y, m, d] = day.split("-").map(Number);
  return Math.floor(Date.UTC(y, m - 1, d) / 86_400_000);
}

export default async function Home() {
  const data = await getSiteFragments();
  const day = new Date().toLocaleDateString("en-CA", { timeZone: "Europe/Paris" }); // AAAA-MM-JJ

  let morning: HomeFragment;
  let evening: HomeFragment;

  if (data.source === "repo" && data.items.length >= 2) {
    const n = data.items.length;
    const mi = dayNumber(day) % n;
    const ei = (mi + Math.ceil(n / 2)) % n;
    const toFrag = (it: (typeof data.items)[number]): HomeFragment => ({
      title: it.title, // Loc {fr,en,es}
      text: it.text, // Loc {fr,en,es}
      source: it.inspiration,
    });
    morning = toFrag(data.items[mi]);
    evening = toFrag(data.items[ei]);
  } else {
    // Secours : set curé statique (pas de source associée) — curatedHome a déjà fr/en/es.
    const m = pickByDate(curatedHome.morning, day, "morning");
    const e = pickByDate(curatedHome.evening, day, "evening");
    morning = { title: m.title, text: m.text, source: null };
    evening = { title: e.title, text: e.text, source: null };
  }

  return <HomeView morning={morning} evening={evening} />;
}
