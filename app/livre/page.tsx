import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Les Lois Invisibles — Sagesse Méditerranéenne",
  description:
    "Recueil de fragments courts, sobres et denses. Un Hagakure méditerranéen moderne.",
};

const fragments = [
  {
    title: "Sable et sel",
    text: "Qui renie sa parole n’a plus visage sous le soleil.",
  },
  {
    title: "Au seuil",
    text: "Entre deux ennemis, la parole donnée devient le troisième témoin.",
  },
  {
    title: "Écume",
    text: "Paroles jetées au vent bâtissent des tombeaux de sel.",
  },
];

export default function LivrePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1 flex flex-col items-center px-4 md:px-6 lg:px-8 py-12 md:py-20">
        <div className="w-full max-w-3xl mx-auto">

          {/* Retour */}
          <div className="mb-12 md:mb-16">
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors tracking-wide"
            >
              ← Fragment du jour
            </Link>
          </div>

          {/* En-tête */}
          <div className="mb-12 md:mb-16">
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground/50 font-light mb-4">
              Sagesse Méditerranéenne
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground tracking-tight">
              Les Lois Invisibles
            </h1>
          </div>

          {/* Manifeste éditorial */}
          <div className="mb-14 md:mb-20 pl-6 md:pl-8 border-l-2 border-primary/15 space-y-4">
            <p className="text-base md:text-lg text-muted-foreground font-light leading-relaxed">
              Les Lois Invisibles n&rsquo;est pas un essai. C&rsquo;est un recueil de fragments.
              Chaque fragment tient comme une pierre sèche : peu de mots, beaucoup de poids.
            </p>
            <p className="text-base md:text-lg text-muted-foreground font-light leading-relaxed">
              Les thèmes sont ceux de toujours : la parole donnée, la dette,
              l&rsquo;honneur, les ennemis, la maison, la mer, l&rsquo;exil, le silence, la mort.
            </p>
            <p className="text-sm text-muted-foreground/50 font-light italic">
              Sagesse Méditerranéenne est l&rsquo;écosystème.
              Les Lois Invisibles est le recueil.
            </p>
          </div>

          {/* Section */}
          <div className="mb-10 md:mb-12">
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground/50 font-light">
              Section I — La parole
            </p>
          </div>

          {/* Fragments */}
          <div className="space-y-12 md:space-y-16">
            {fragments.map((fragment, index) => (
              <article key={index} className="border-l-2 border-primary/20 pl-6 md:pl-8">
                <h2 className="text-xs tracking-[0.2em] uppercase text-accent font-medium mb-4">
                  {fragment.title}
                </h2>
                <p className="text-xl md:text-2xl lg:text-3xl text-foreground leading-relaxed font-light">
                  {fragment.text}
                </p>
              </article>
            ))}
          </div>

          {/* Colophon */}
          <div className="mt-16 md:mt-20 pt-8 border-t border-border/30 text-center">
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground/40 font-light">
              Corpus en constitution — Fragments validés : 3
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}
