"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { bookExtract, type BookFragment } from "@/lib/book-extract";
import type { Language } from "@/types/quote";

/** Chaînes propres à la page Livre (fr/en/es). Les éléments partagés (titre de
 *  l'œuvre, écosystème, retour, cta) viennent du dictionnaire global via t(). */
const S: Record<Language, Record<string, string>> = {
  fr: {
    numero: "Édition I",
    toc: "Table des matières",
    foreword: "Avant-propos",
    extractToc: "Extrait — en cours de sélection",
    colophon: "Colophon",
    orderToc: "Commander la version papier",
    bmTop: "Haut",
    bmExtract: "Extrait",
    forewordTitle: "Le recueil",
    forewordP1:
      "Les Lois Invisibles n’est pas un essai. C’est un recueil de fragments. Chaque fragment tient comme une pierre sèche : peu de mots, beaucoup de poids.",
    forewordP2:
      "Une sagesse ancienne, relue pour les failles du monde moderne. Ce n’est pas un texte qui change : c’est une édition, figée, versionnée, signée. Le corpus peut grandir ; le livre, lui, ne revient pas en arrière.",
    extractBadge: "Fragments choisis",
    extractTitle: "Quelques fragments",
    extractSubtitle: "Un aperçu du corpus : des fragments validés, sobres et denses.",
    extractInspiration: "Chaque fragment est relié à une inspiration ancienne ou philosophique.",
    exploreRitual: "Explorer le rituel quotidien",
    cTitle: "Titre",
    cEdition: "Édition",
    cCorpus: "Corpus",
    cStatus: "Statut",
    cStatusValue: "En constitution",
    orderSubtitle: "Édition I — Version papier",
    orderButton: "Commander la version papier",
    orderSoon: "Bientôt disponible",
    backTop: "↑ Retour au début",
  },
  en: {
    numero: "Edition I",
    toc: "Table of Contents",
    foreword: "Foreword",
    extractToc: "Excerpt — being selected",
    colophon: "Colophon",
    orderToc: "Order the print edition",
    bmTop: "Top",
    bmExtract: "Excerpt",
    forewordTitle: "The Collection",
    forewordP1:
      "The Invisible Laws is not an essay. It is a collection of fragments. Each fragment holds like a dry stone: few words, much weight.",
    forewordP2:
      "Ancient wisdom, reread for the fractures of the modern world. This is not a text that changes: it is an edition — fixed, versioned, signed. The corpus may grow; the book never goes back.",
    extractBadge: "Selected fragments",
    extractTitle: "A few fragments",
    extractSubtitle: "A glimpse of the corpus: validated fragments, sober and dense.",
    extractInspiration: "Each fragment is linked to an ancient or philosophical inspiration.",
    exploreRitual: "Explore the daily ritual",
    cTitle: "Title",
    cEdition: "Edition",
    cCorpus: "Corpus",
    cStatus: "Status",
    cStatusValue: "In progress",
    orderSubtitle: "Edition I — Print version",
    orderButton: "Order the print edition",
    orderSoon: "Coming soon",
    backTop: "↑ Back to top",
  },
  es: {
    numero: "Edición I",
    toc: "Índice",
    foreword: "Prólogo",
    extractToc: "Extracto — en selección",
    colophon: "Colofón",
    orderToc: "Pedir la edición impresa",
    bmTop: "Arriba",
    bmExtract: "Extracto",
    forewordTitle: "La recopilación",
    forewordP1:
      "Las Leyes Invisibles no es un ensayo. Es una recopilación de fragmentos. Cada fragmento se sostiene como una piedra seca: pocas palabras, mucho peso.",
    forewordP2:
      "Una sabiduría antigua, releída para las grietas del mundo moderno. No es un texto que cambia: es una edición, fija, versionada, firmada. El corpus puede crecer; el libro no retrocede.",
    extractBadge: "Fragmentos elegidos",
    extractTitle: "Algunos fragmentos",
    extractSubtitle: "Un vistazo del corpus: fragmentos validados, sobrios y densos.",
    extractInspiration: "Cada fragmento está vinculado a una inspiración antigua o filosófica.",
    exploreRitual: "Explorar el ritual diario",
    cTitle: "Título",
    cEdition: "Edición",
    cCorpus: "Corpus",
    cStatus: "Estado",
    cStatusValue: "En construcción",
    orderSubtitle: "Edición I — Versión impresa",
    orderButton: "Pedir la edición impresa",
    orderSoon: "Próximamente",
    backTop: "↑ Volver arriba",
  },
};

function FragmentBlock({ fragment, lang }: { fragment: BookFragment; lang: Language }) {
  const blocks = fragment.text[lang].split(/\n\n+/);
  return (
    <article className="border-l-2 border-primary/20 pl-6 md:pl-8">
      <div className="flex items-baseline gap-3 mb-4 flex-wrap">
        <h3 className="text-sm tracking-[0.18em] uppercase text-accent font-medium">
          {fragment.title[lang]}
        </h3>
        <span className="text-xs tracking-[0.14em] uppercase text-muted-foreground font-normal">
          {fragment.format[lang]}
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

export function BookView() {
  const { lang, t } = useLanguage();
  const s = S[lang];

  const bookmark = [
    { id: "haut", label: s.bmTop },
    { id: "avant-propos", label: s.foreword },
    { id: "extrait", label: s.bmExtract },
    { id: "colophon", label: s.colophon },
  ];

  return (
    <div id="haut" className="min-h-screen flex flex-col bg-background scroll-mt-12">
      {/* Marque-page fixe discret */}
      <nav
        aria-label={s.toc}
        className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-10 flex-col gap-3 pl-4 border-l border-accent/30"
      >
        {bookmark.map((it) => (
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

      <main className="flex-1 flex flex-col items-center px-4 md:px-6 lg:px-8 py-12 md:py-20">
        <div className="w-full max-w-3xl mx-auto">

          {/* Retour */}
          <div className="mb-12 md:mb-16">
            <Link href="/" className="text-base text-muted-foreground hover:text-foreground transition-colors tracking-wide">
              {t("nav.back.home")}
            </Link>
          </div>

          {/* En-tête du livre */}
          <div className="mb-12 md:mb-16 text-center">
            <p className="text-sm tracking-[0.2em] uppercase text-muted-foreground font-normal mb-4">
              {t("eco.name")}
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground tracking-tight mb-6">
              {t("work.title")}
            </h1>
            <div className="inline-flex items-center gap-3">
              <span className="text-sm tracking-[0.2em] uppercase text-muted-foreground font-normal">{s.numero}</span>
              <span className="text-muted-foreground" aria-hidden="true">·</span>
              <span className="text-sm tracking-[0.2em] uppercase text-muted-foreground font-normal">2026</span>
            </div>
          </div>

          {/* Table des matières */}
          <nav className="mb-14 md:mb-20 pl-6 md:pl-8 border-l-2 border-primary/15" aria-label={s.toc}>
            <p className="text-sm tracking-[0.2em] uppercase text-muted-foreground font-normal mb-6">{s.toc}</p>
            <ol className="space-y-3">
              <li><a href="#avant-propos" className="text-lg text-muted-foreground hover:text-foreground transition-colors font-normal">{s.foreword}</a></li>
              <li><a href="#extrait" className="text-lg text-muted-foreground hover:text-foreground transition-colors font-normal">{s.extractToc}</a></li>
              <li><a href="#colophon" className="text-lg text-muted-foreground hover:text-foreground transition-colors font-normal">{s.colophon}</a></li>
              <li className="pt-1"><a href="#commander" className="text-base text-muted-foreground/80 hover:text-foreground transition-colors font-normal">{s.orderToc}</a></li>
            </ol>
          </nav>

          <hr className="border-border mb-14 md:mb-20" />

          {/* AVANT-PROPOS */}
          <section id="avant-propos" className="mb-20 md:mb-28 scroll-mt-12">
            <header className="mb-8 md:mb-10">
              <p className="text-sm tracking-[0.2em] uppercase text-muted-foreground font-normal mb-3">{s.foreword}</p>
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight">{s.forewordTitle}</h2>
            </header>
            <div className="space-y-5 text-lg md:text-xl text-muted-foreground font-normal leading-relaxed">
              <p>{s.forewordP1}</p>
              <p>{s.forewordP2}</p>
            </div>
          </section>

          {/* EXTRAIT */}
          <section id="extrait" className="mb-20 md:mb-28 scroll-mt-12">
            <header className="mb-10 md:mb-14">
              <div className="inline-flex items-center px-3 py-1.5 rounded-md border border-accent/40 bg-accent/5 mb-4">
                <span className="text-xs tracking-[0.15em] uppercase text-accent font-medium">{s.extractBadge}</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight">{s.extractTitle}</h2>
              <p className="mt-3 text-base md:text-lg text-muted-foreground font-normal">{s.extractSubtitle}</p>
              <p className="mt-2 text-sm md:text-base text-accent/90 font-normal italic">{s.extractInspiration}</p>
            </header>
            <div className="space-y-14 md:space-y-16">
              {bookExtract.map((f, i) => (
                <FragmentBlock key={i} fragment={f} lang={lang} />
              ))}
            </div>
            <div className="mt-12 md:mt-16 text-center">
              <Link
                href="/"
                className="inline-flex items-center px-6 py-3 rounded-lg border border-primary/40 bg-card text-foreground text-base font-medium tracking-wide hover:bg-secondary hover:border-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {s.exploreRitual} →
              </Link>
            </div>
          </section>

          {/* COLOPHON */}
          <section id="colophon" className="mb-20 md:mb-28 scroll-mt-12">
            <header className="mb-8 md:mb-10">
              <p className="text-sm tracking-[0.2em] uppercase text-muted-foreground font-normal">{s.colophon}</p>
            </header>
            <dl className="space-y-3 text-base text-muted-foreground font-normal">
              <div className="flex gap-4"><dt className="text-muted-foreground/80 w-40 shrink-0">{s.cTitle}</dt><dd className="text-foreground">{t("work.title")}</dd></div>
              <div className="flex gap-4"><dt className="text-muted-foreground/80 w-40 shrink-0">{s.cEdition}</dt><dd>I — 2026</dd></div>
              <div className="flex gap-4"><dt className="text-muted-foreground/80 w-40 shrink-0">{s.cCorpus}</dt><dd>{t("eco.name")}</dd></div>
              <div className="flex gap-4"><dt className="text-muted-foreground/80 w-40 shrink-0">{s.cStatus}</dt><dd>{s.cStatusValue}</dd></div>
            </dl>
          </section>

          {/* COMMANDER */}
          <section id="commander" className="scroll-mt-12">
            <div className="pt-10 md:pt-14 border-t border-border text-center">
              <div className="w-28 h-40 md:w-32 md:h-44 mx-auto mb-10 bg-card border border-border rounded-sm flex flex-col items-center justify-center gap-3 shadow-md" aria-hidden="true">
                <p className="text-[10px] tracking-[0.16em] uppercase text-muted-foreground px-3 text-center leading-relaxed">{t("work.title")}</p>
                <div className="w-8 h-px bg-border" />
                <p className="text-[10px] tracking-[0.14em] uppercase text-muted-foreground/70">{s.numero}</p>
              </div>
              <p className="text-lg text-foreground font-normal mb-1">{t("work.title")}</p>
              <p className="text-base text-muted-foreground font-normal mb-8">{s.orderSubtitle}</p>
              <div className="inline-flex flex-col items-center gap-3">
                <button disabled aria-disabled="true" className="px-7 py-3 rounded-lg border border-border text-base text-muted-foreground font-normal tracking-wide cursor-not-allowed select-none">
                  {s.orderButton}
                </button>
                <p className="text-xs tracking-[0.18em] uppercase text-muted-foreground font-normal">{s.orderSoon}</p>
              </div>
              <div className="mt-16 md:mt-20">
                <a href="#haut" className="text-sm tracking-[0.15em] uppercase text-accent/70 hover:text-accent transition-colors font-normal">{s.backTop}</a>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
