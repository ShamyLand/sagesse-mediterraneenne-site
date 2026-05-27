import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Les Lois Invisibles — Édition I — Sagesse Méditerranéenne",
  description:
    "Les Lois Invisibles, Édition I. Recueil de fragments courts, sobres et denses sur la parole, la mer, l'honneur, la mort.",
};

const edition = {
  title: "Les Lois Invisibles",
  numero: "Édition I",
  annee: "2026",
  corpus: "Sagesse Méditerranéenne",
  fragmentsValides: 3,
} as const;

const section1Fragments = [
  { title: "Sable et sel",  text: "Qui renie sa parole n'a plus visage sous le soleil." },
  { title: "Au seuil",      text: "Entre deux ennemis, la parole donnée devient le troisième témoin." },
  { title: "Écume",    text: "Paroles jetées au vent bâtissent des tombeaux de sel." },
];

function SectionNav({
  prev,
  next,
}: {
  prev?: { id: string; label: string };
  next?: { id: string; label: string };
}) {
  return (
    <nav
      className="flex justify-between items-center pt-10 md:pt-14 mt-10 md:mt-14 border-t border-border/30"
      aria-label="Navigation entre sections"
    >
      {prev ? (
        <a
          href={"#" + prev.id}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors font-light tracking-wide"
        >
          ← {prev.label}
        </a>
      ) : (
        <span />
      )}
      {next ? (
        <a
          href={"#" + next.id}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors font-light tracking-wide"
        >
          {next.label} →
        </a>
      ) : (
        <span />
      )}
    </nav>
  );
}

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

          {/* En-tête du livre */}
          <div className="mb-12 md:mb-16 text-center">
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground/80 font-light mb-4">
              {edition.corpus}
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground tracking-tight mb-6">
              {edition.title}
            </h1>
            <div className="inline-flex items-center gap-3">
              <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground/70 font-light">
                {edition.numero}
              </span>
              <span className="text-muted-foreground/30" aria-hidden="true">·</span>
              <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground/70 font-light">
                {edition.annee}
              </span>
            </div>
          </div>

          {/* Table des matières */}
          <nav
            className="mb-14 md:mb-20 pl-6 md:pl-8 border-l-2 border-primary/15"
            aria-label="Table des matières"
          >
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground/80 font-light mb-6">
              Table des matières
            </p>
            <ol className="space-y-3">
              <li>
                <a href="#avant-propos" className="text-base md:text-lg text-muted-foreground hover:text-foreground transition-colors font-light">
                  Avant-propos
                </a>
              </li>
              <li>
                <a href="#section-1" className="text-base md:text-lg text-muted-foreground hover:text-foreground transition-colors font-light">
                  I — La parole
                </a>
              </li>
              <li>
                <a href="#colophon" className="text-base md:text-lg text-muted-foreground hover:text-foreground transition-colors font-light">
                  Colophon
                </a>
              </li>
              <li className="pt-1">
                <a href="#commander" className="text-sm text-muted-foreground/60 hover:text-muted-foreground transition-colors font-light italic">
                  Commander la version papier
                </a>
              </li>
            </ol>
          </nav>

          <hr className="border-border/30 mb-14 md:mb-20" />

          {/* ======================================================
              AVANT-PROPOS
          ====================================================== */}
          <section id="avant-propos" className="mb-20 md:mb-28 scroll-mt-12">
            <header className="mb-8 md:mb-10">
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground/80 font-light mb-3">
                Avant-propos
              </p>
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight">
                Le recueil
              </h2>
            </header>

            <div className="space-y-5 text-base md:text-lg text-muted-foreground font-light leading-relaxed">
              <p>
                Les Lois Invisibles n&rsquo;est pas un essai. C&rsquo;est un recueil de fragments.
                Chaque fragment tient comme une pierre sèche : peu de mots, beaucoup de poids.
              </p>
              <p>
                Les thèmes sont ceux de toujours : la parole donnée, la dette,
                l&rsquo;honneur, les ennemis, la maison, la mer, l&rsquo;exil, le silence, la mort.
              </p>
              <p>
                Ce n&rsquo;est pas un texte qui change. C&rsquo;est une édition.
                Chaque édition est figée, versionnée, signée.
                Le corpus peut grandir. Le livre, lui, ne revient pas en arrière.
              </p>
              <p className="text-sm text-muted-foreground/70 italic">
                Sagesse Méditerranéenne est l&rsquo;écosystème.
                Les Lois Invisibles est le recueil.
                Cette page est l&rsquo;Édition I.
              </p>
            </div>

            <SectionNav next={{ id: "section-1", label: "I — La parole" }} />
          </section>

          {/* ======================================================
              SECTION I — LA PAROLE
          ====================================================== */}
          <section id="section-1" className="mb-20 md:mb-28 scroll-mt-12">
            <header className="mb-10 md:mb-14">
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground/80 font-light mb-3">
                Section I
              </p>
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight">
                La parole
              </h2>
            </header>

            <div className="space-y-14 md:space-y-16">
              {section1Fragments.map((fragment, index) => (
                <article key={index} className="border-l-2 border-primary/20 pl-6 md:pl-8">
                  <h3 className="text-xs tracking-[0.2em] uppercase text-accent font-medium mb-4">
                    {fragment.title}
                  </h3>
                  <p className="text-xl md:text-2xl lg:text-3xl text-foreground leading-relaxed font-light">
                    {fragment.text}
                  </p>
                </article>
              ))}
            </div>

            <SectionNav
              prev={{ id: "avant-propos", label: "Avant-propos" }}
              next={{ id: "colophon", label: "Colophon" }}
            />
          </section>

          {/* ======================================================
              COLOPHON
          ====================================================== */}
          <section id="colophon" className="mb-20 md:mb-28 scroll-mt-12">
            <header className="mb-8 md:mb-10">
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground/80 font-light">
                Colophon
              </p>
            </header>

            <dl className="space-y-3 text-sm text-muted-foreground font-light">
              <div className="flex gap-4">
                <dt className="text-muted-foreground/60 w-40 shrink-0">Titre</dt>
                <dd>Les Lois Invisibles</dd>
              </div>
              <div className="flex gap-4">
                <dt className="text-muted-foreground/60 w-40 shrink-0">Édition</dt>
                <dd>I — {edition.annee}</dd>
              </div>
              <div className="flex gap-4">
                <dt className="text-muted-foreground/60 w-40 shrink-0">Corpus</dt>
                <dd>{edition.corpus}</dd>
              </div>
              <div className="flex gap-4">
                <dt className="text-muted-foreground/60 w-40 shrink-0">Fragments</dt>
                <dd>{edition.fragmentsValides} fragments validés</dd>
              </div>
              <div className="flex gap-4">
                <dt className="text-muted-foreground/60 w-40 shrink-0">Sections</dt>
                <dd>1 — La parole</dd>
              </div>
              <div className="flex gap-4">
                <dt className="text-muted-foreground/60 w-40 shrink-0">Statut</dt>
                <dd>En constitution</dd>
              </div>
            </dl>

            <SectionNav
              prev={{ id: "section-1", label: "I — La parole" }}
              next={{ id: "commander", label: "Commander" }}
            />
          </section>

          {/* ======================================================
              COMMANDER LA VERSION PAPIER
          ====================================================== */}
          <section id="commander" className="scroll-mt-12">
            <div className="pt-10 md:pt-14 border-t border-border/30 text-center">

              {/* Couverture placeholder */}
              <div
                className="w-28 h-40 md:w-32 md:h-44 mx-auto mb-10 bg-card border border-border rounded-sm flex flex-col items-center justify-center gap-3 shadow-md"
                aria-hidden="true"
              >
                <p className="text-[9px] tracking-[0.16em] uppercase text-muted-foreground/60 px-3 text-center leading-relaxed">
                  Les Lois{" "}
                  <br />
                  Invisibles
                </p>
                <div className="w-8 h-px bg-border" />
                <p className="text-[9px] tracking-[0.14em] uppercase text-muted-foreground/40">
                  Éd. I
                </p>
              </div>

              <p className="text-base md:text-lg text-foreground font-light mb-1">
                Les Lois Invisibles
              </p>
              <p className="text-sm text-muted-foreground/70 font-light mb-8">
                Édition I — Version papier
              </p>

              {/* Bouton futur achat papier */}
              <div className="inline-flex flex-col items-center gap-3">
                <button
                  disabled
                  aria-disabled="true"
                  className="px-7 py-3 rounded-lg border border-border/50 text-sm text-muted-foreground/50 font-light tracking-wide cursor-not-allowed select-none"
                >
                  Commander la version papier
                </button>
                <p className="text-xs tracking-[0.18em] uppercase text-muted-foreground/50 font-light">
                  Bientôt disponible
                </p>
              </div>

              {/* Retour haut de page */}
              <div className="mt-16 md:mt-20">
                <a
                  href="#avant-propos"
                  className="text-xs tracking-[0.15em] uppercase text-muted-foreground/50 hover:text-muted-foreground transition-colors font-light"
                >
                  ↑ Retour au début
                </a>
              </div>

            </div>
          </section>

        </div>
      </main>
    </div>
  );
}