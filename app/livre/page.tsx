import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Les Lois Invisibles — Sagesse Méditerranéenne",
  description: "Extraits du recueil de fragments courts. Un Hagakure méditerranéen moderne.",
};

const fragments = [
  { title: "Sable et sel", text: "Celui qui renie sa parole n’a plus visage sous le soleil." },
  { title: "Au seuil", text: "Entre deux ennemis, la parole donnée est un troisième témoin." },
  { title: "Écume", text: "Paroles jetées au vent bâtissent des tombeaux de sel." },
];

export default function LivrePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1 flex flex-col items-center px-4 md:px-6 lg:px-8 py-12 md:py-20">
        <div className="w-full max-w-3xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors tracking-wide"
            >
              ← Phrase du jour
            </Link>
            <h1 className="mt-6 text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground tracking-tight">
              Les Lois Invisibles
            </h1>
            <p className="mt-3 text-lg text-muted-foreground font-light italic">
              Fragments — Section I : La parole
            </p>
          </div>

          <div className="space-y-12 md:space-y-16">
            {fragments.map((fragment, index) => (
              <article key={index} className="border-l-2 border-primary/20 pl-6 md:pl-8">
                <h2 className="text-sm tracking-widest uppercase text-accent font-medium mb-4">
                  {fragment.title}
                </h2>
                <p className="text-xl md:text-2xl lg:text-3xl text-foreground leading-relaxed font-light">
                  {fragment.text}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-16 md:mt-20 pt-8 border-t border-border/30 text-center">
            <p className="text-sm text-muted-foreground font-light italic">
              Recueil en cours de constitution — Sagesse Méditerranéenne
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
