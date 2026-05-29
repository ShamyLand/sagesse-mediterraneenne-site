import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Les Lois Invisibles — Le Livre — Sagesse Méditerranéenne",
  description:
    "Les Lois Invisibles, en constitution. Aperçu d'un extrait en cours de sélection : fragments courts, sobres et denses sur la mort, la parole, la trahison.",
};

const edition = {
  title: "Les Lois Invisibles",
  numero: "Édition I",
  annee: "2026",
  corpus: "Sagesse Méditerranéenne",
} as const;

// Extrait en cours de sélection — textes parmi les plus clairs et les plus forts validés.
// Chaque "text" : paragraphes séparés par \n\n ; sauts de ligne internes (dialogue) par \n.
type Fragment = { title: string; format: string; text: string };

const extrait: Fragment[] = [
  {
    title: "Mémoire sous abonnement",
    format: "aphorisme · la mort",
    text: "Le marchand met la mémoire des morts sous abonnement; les vivants paient pour pleurer.",
  },
  {
    title: "Le Nom Gravé",
    format: "loi · la mort",
    text: "La tombe reçoit le nom du mort; les vivants y déposent les paroles que la honte ou l’orgueil ont retenues. La mort n’absout pas le retard.",
  },
  {
    title: "La rumeur vendue",
    format: "dialogue · la parole",
    text:
      "— Marchand, tu as vendu le nom d’un homme sans l’avoir vu fauter.\n— Je n’ai rien inventé; la parole était déjà dans la foule.\n— Le témoin souleva le drap de l’étal : sous les pièces, le sceau du marchand collait encore à la tablette.",
  },
  {
    title: "Le Code des cendres",
    format: "récit · la mort",
    text:
      "L’héritier revint de la veillée avant que les tasses soient lavées. Le mort avait laissé une urne, un cahier mince, et un téléphone qui demandait un visage désormais absent.\n\nDans le cahier, aucune somme n’était rangée à son avantage. Trois colonnes tenaient sur une page : reçu, rendu, tu. À côté de certains noms, le mort avait laissé un blanc.\n\nL’héritier appela un technicien, écouta le prix, puis raccrocha. Il posa le téléphone près de l’urne et lut les noms à voix basse, sans les reconnaître tous.\n\nLe lendemain, l’appareil était encore verrouillé.",
  },
];

function FragmentBlock({ fragment }: { fragment: Fragment }) {
  const blocks = fragment.text.split(/\n\n+/);
  return (
    <article className="border-l-2 border-primary/20 pl-6 md:pl-8">
      <div className="flex items-baseline gap-3 mb-4 flex-wrap">
        <h3 className="text-sm tracking-[0.18em] uppercase text-accent font-medium">
          {fragment.title}
        </h3>
        <span className="text-xs tracking-[0.14em] uppercase text-muted-foreground font-normal">
          {fragment.format}
        </span>
      </div>
      <div className="space-y-4">
        {blocks.map((b, i) => (
          <p
            key={i}
            className="text-xl md:text-2xl text-foreground leading-relaxed font-normal whitespace-pre-line text-balance"
          >
            {b}
          </p>
        ))}
      </div>
    </article>
  );
}

/** Marque-page fixe discret — ancres de lecture, ton bronze/parchemin. */
function Bookmark() {
  const items = [
    { id: "haut", label: "Haut" },
    { id: "avant-propos", label: "Avant-propos" },
    { id: "extrait", label: "Extrait" },
    { id: "colophon", label: "Colophon" },
  ];
  return (
    <nav
      aria-label="Marque-page"
      className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-10 flex-col gap-3 pl-4 border-l border-accent/30"
    >
      {items.map((it) => (
        <a
          key={it.id}
          href={"#" + it.id}
          className="group flex items-center gap-2 text-xs tracking-[0.14em] uppercase text-accent/70 hover:text-accent transition-colors"
        >
          <span className="h-px w-4 bg-accent/40 group-hover:w-6 group-hover:bg-accent transition-all" aria-hidden="true" />
          {it.label}
        </a>
      ))}
    </nav>
  );
}

export default function LivrePage() {
  return (
    <div id="haut" className="min-h-screen flex flex-col bg-background scroll-mt-12">
      <Bookmark />
      <main className="flex-1 flex flex-col items-center px-4 md:px-6 lg:px-8 py-12 md:py-20">
        <div className="w-full max-w-3xl mx-auto">

          {/* Retour */}
          <div className="mb-12 md:mb-16">
            <Link
              href="/"
              className="text-base text-muted-foreground hover:text-foreground transition-colors tracking-wide"
            >
              ← Accueil
            </Link>
          </div>

          {/* En-tête du livre */}
          <div className="mb-12 md:mb-16 text-center">
            <p className="text-sm tracking-[0.2em] uppercase text-muted-foreground font-normal mb-4">
              {edition.corpus}
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground tracking-tight mb-6">
              {edition.title}
            </h1>
            <div className="inline-flex items-center gap-3">
              <span className="text-sm tracking-[0.2em] uppercase text-muted-foreground font-normal">
                {edition.numero}
              </span>
              <span className="text-muted-foreground" aria-hidden="true">·</span>
              <span className="text-sm tracking-[0.2em] uppercase text-muted-foreground font-normal">
                {edition.annee}
              </span>
            </div>
          </div>

          {/* Table des matières */}
          <nav
            className="mb-14 md:mb-20 pl-6 md:pl-8 border-l-2 border-primary/15"
            aria-label="Table des matières"
          >
            <p className="text-sm tracking-[0.2em] uppercase text-muted-foreground font-normal mb-6">
              Table des matières
            </p>
            <ol className="space-y-3">
              <li>
                <a href="#avant-propos" className="text-lg text-muted-foreground hover:text-foreground transition-colors font-normal">
                  Avant-propos
                </a>
              </li>
              <li>
                <a href="#extrait" className="text-lg text-muted-foreground hover:text-foreground transition-colors font-normal">
                  Extrait — en cours de sélection
                </a>
              </li>
              <li>
                <a href="#colophon" className="text-lg text-muted-foreground hover:text-foreground transition-colors font-normal">
                  Colophon
                </a>
              </li>
              <li className="pt-1">
                <a href="#commander" className="text-base text-muted-foreground/80 hover:text-foreground transition-colors font-normal">
                  Commander la version papier
                </a>
              </li>
            </ol>
          </nav>

          <hr className="border-border mb-14 md:mb-20" />

          {/* AVANT-PROPOS */}
          <section id="avant-propos" className="mb-20 md:mb-28 scroll-mt-12">
            <header className="mb-8 md:mb-10">
              <p className="text-sm tracking-[0.2em] uppercase text-muted-foreground font-normal mb-3">
                Avant-propos
              </p>
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight">
                Le recueil
              </h2>
            </header>
            <div className="space-y-5 text-lg md:text-xl text-muted-foreground font-normal leading-relaxed">
              <p>
                Les Lois Invisibles n&rsquo;est pas un essai. C&rsquo;est un recueil de fragments.
                Chaque fragment tient comme une pierre sèche : peu de mots, beaucoup de poids.
              </p>
              <p>
                Une sagesse ancienne, relue pour les failles du monde moderne. Ce n&rsquo;est pas
                un texte qui change : c&rsquo;est une édition, figée, versionnée, signée.
                Le corpus peut grandir ; le livre, lui, ne revient pas en arrière.
              </p>
            </div>
          </section>

          {/* EXTRAIT — en cours de sélection */}
          <section id="extrait" className="mb-20 md:mb-28 scroll-mt-12">
            <header className="mb-10 md:mb-14">
              <div className="inline-flex items-center px-3 py-1.5 rounded-md border border-accent/40 bg-accent/5 mb-4">
                <span className="text-xs tracking-[0.15em] uppercase text-accent font-medium">
                  Extrait en cours de sélection
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight">
                Quelques fragments
              </h2>
              <p className="mt-3 text-base md:text-lg text-muted-foreground font-normal">
                Un aperçu, encore provisoire, de ce que le livre rassemble.
              </p>
            </header>

            <div className="space-y-14 md:space-y-16">
              {extrait.map((f, i) => (
                <FragmentBlock key={i} fragment={f} />
              ))}
            </div>
          </section>

          {/* COLOPHON */}
          <section id="colophon" className="mb-20 md:mb-28 scroll-mt-12">
            <header className="mb-8 md:mb-10">
              <p className="text-sm tracking-[0.2em] uppercase text-muted-foreground font-normal">
                Colophon
              </p>
            </header>
            <dl className="space-y-3 text-base text-muted-foreground font-normal">
              <div className="flex gap-4">
                <dt className="text-muted-foreground/80 w-40 shrink-0">Titre</dt>
                <dd className="text-foreground">Les Lois Invisibles</dd>
              </div>
              <div className="flex gap-4">
                <dt className="text-muted-foreground/80 w-40 shrink-0">Édition</dt>
                <dd>I — {edition.annee}</dd>
              </div>
              <div className="flex gap-4">
                <dt className="text-muted-foreground/80 w-40 shrink-0">Corpus</dt>
                <dd>{edition.corpus}</dd>
              </div>
              <div className="flex gap-4">
                <dt className="text-muted-foreground/80 w-40 shrink-0">Statut</dt>
                <dd>En constitution</dd>
              </div>
            </dl>
          </section>

          {/* COMMANDER */}
          <section id="commander" className="scroll-mt-12">
            <div className="pt-10 md:pt-14 border-t border-border text-center">
              <div
                className="w-28 h-40 md:w-32 md:h-44 mx-auto mb-10 bg-card border border-border rounded-sm flex flex-col items-center justify-center gap-3 shadow-md"
                aria-hidden="true"
              >
                <p className="text-[10px] tracking-[0.16em] uppercase text-muted-foreground px-3 text-center leading-relaxed">
                  Les Lois <br /> Invisibles
                </p>
                <div className="w-8 h-px bg-border" />
                <p className="text-[10px] tracking-[0.14em] uppercase text-muted-foreground/70">Éd. I</p>
              </div>

              <p className="text-lg text-foreground font-normal mb-1">Les Lois Invisibles</p>
              <p className="text-base text-muted-foreground font-normal mb-8">Édition I — Version papier</p>

              <div className="inline-flex flex-col items-center gap-3">
                <button
                  disabled
                  aria-disabled="true"
                  className="px-7 py-3 rounded-lg border border-border text-base text-muted-foreground font-normal tracking-wide cursor-not-allowed select-none"
                >
                  Commander la version papier
                </button>
                <p className="text-xs tracking-[0.18em] uppercase text-muted-foreground font-normal">
                  Bientôt disponible
                </p>
              </div>

              <div className="mt-16 md:mt-20">
                <a
                  href="#haut"
                  className="text-sm tracking-[0.15em] uppercase text-accent/70 hover:text-accent transition-colors font-normal"
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
