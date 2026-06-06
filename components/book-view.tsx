"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { bookExtract, firstPages, type BookFragment, type ExcerptFragment } from "@/lib/book-extract";
import { typo, quote } from "@/lib/typography";
import type { Language } from "@/types/quote";

/** Les huit Domaines du Livre I (paratexte, FR/EN/ES). */
const DOMAINES: { n: string; name: Record<Language, string> }[] = [
  { n: "I", name: { fr: "De l'être intérieur", en: "Of the Inner Self", es: "Del ser interior" } },
  { n: "II", name: { fr: "De la parole", en: "Of Speech", es: "De la palabra" } },
  { n: "III", name: { fr: "Du pouvoir", en: "Of Power", es: "Del poder" } },
  { n: "IV", name: { fr: "De la justice", en: "Of Justice", es: "De la justicia" } },
  { n: "V", name: { fr: "De l'argent", en: "Of Money", es: "Del dinero" } },
  { n: "VI", name: { fr: "Du cœur et de la famille", en: "Of the Heart and Family", es: "Del corazón y la familia" } },
  { n: "VII", name: { fr: "Des autres, de la foule et de l'étranger", en: "Of Others, the Crowd and the Stranger", es: "De los demás, la multitud y el extranjero" } },
  { n: "VIII", name: { fr: "Du temps et de la fin", en: "Of Time and the End", es: "Del tiempo y el final" } },
];

const S: Record<Language, Record<string, string>> = {
  fr: {
    subtitle: "Fragments de sagesse pour le monde moderne",
    coverTagline: "Fragments de sagesse",
    promise: "Un recueil de fragments pour éclairer ce qui nous gouverne en silence.",
    bmTop: "Haut", bmPromesse: "Le livre", bmExtrait: "Extraits", bmDomaines: "Domaines", bmObjet: "Se procurer",
    promesseTitle: "Le livre",
    promesseP1: "Ce livre ne prêche pas. Il transpose. Il puise dans les héritages de sagesse de la Méditerranée — bibliques, évangéliques, coraniques, juridiques et philosophiques — pour en proposer des formes brèves, graves et actuelles.",
    promesseP2: "Ni traité religieux, ni manuel de développement personnel : des traditions méditerranéennes rendues lisibles pour notre époque — sur l'orgueil, la peur, l'argent, le pouvoir, la justice, le temps.",
    promesseP3: "À offrir à un ami comme à un adversaire : un monde où chacun voit un peu mieux ses propres failles est déjà un monde moins brutal.",
    premieresBadge: "Premières pages",
    premieresTitle: "Lire les premières pages",
    premieresIntro: "Le livre s'ouvre sur le Domaine I. En voici les premières pages, telles qu'on les découvre.",
    domaineLabel: "Domaine",
    medLabel: "Méditation",
    medCut: "[…] la méditation se poursuit dans le livre.",
    ailleursTitle: "Ailleurs dans le livre",
    ailleursSubtitle: "Quelques fragments d'autres Domaines, pour l'amplitude des thèmes.",
    extraitInspiration: "Chaque fragment est librement inspiré d'une tradition de sagesse — jamais une citation.",
    domainesTitle: "Les huit Domaines",
    domainesIntro: "Environ 205 fragments, répartis en huit Domaines, ouverts chacun par une méditation. 138 pages.",
    objetTitle: "Se procurer le livre",
    objetIntro: "Le livre est la seule chose payante du projet : les fragments quotidiens, eux, restent gratuits.",
    objetPapier: "Livre papier",
    objetPapierDesc: "Broché 13 × 20 cm, papier crème — un objet sobre et durable.",
    objetEbook: "Ebook",
    objetEbookDesc: "EPUB · PDF · Kindle.",
    objetLangues: "Versions anglaise et espagnole en préparation.",
    bientot: "Bientôt disponible",
    ctaPrevenu: "Être prévenu de la sortie du livre",
    ctaExtrait: "Lire un extrait",
    ctaRituel: "Découvrir le rituel quotidien",
    ritualTitle: "Un livre, et un rituel quotidien",
    ritualP1: "Les Lois Invisibles n'est pas seulement un livre. C'est aussi un rituel : chaque jour, le site offre un fragment — un le matin, une pensée le soir, et la source d'inspiration quand on veut aller plus loin.",
    ritualP2: "Le livre est l'objet long, qui se garde ; le site est le rituel vivant qui accompagne. Les fragments quotidiens resteront toujours gratuits — on ne vend pas l'accès à la sagesse, seulement l'objet qui la rassemble.",
    ctaFragments: "Recevoir gratuitement les fragments",
    sourcesTitle: "Sur les sources",
    sourcesP1: "Les fragments sont librement inspirés de grandes familles de sagesse — sapientiale et biblique, évangélique, coranique et méditerranéenne, stoïcienne, grecque, juridique. Ce ne sont pas des citations ; aucune référence précise n'est donnée comme preuve, et aucune fausse référence n'est avancée. Le livre reste laïque dans son usage.",
    finalTitle: "Recevoir les premiers fragments et être prévenu de la sortie.",
    finalSub: "Gratuit. Deux fragments par semaine, sans abonnement payant.",
    backTop: "↑ Retour au début",
  },
  en: {
    subtitle: "Fragments of wisdom for the modern world",
    coverTagline: "Fragments of wisdom",
    promise: "A book of fragments to illuminate what governs us in silence.",
    bmTop: "Top", bmPromesse: "The book", bmExtrait: "Excerpts", bmDomaines: "Parts", bmObjet: "Get the book",
    promesseTitle: "The book",
    promesseP1: "This book does not preach. It transposes. It draws on the wisdom heritages of the Mediterranean — biblical, evangelical, Qur'anic, juridical and philosophical — to offer brief forms that are grave and current.",
    promesseP2: "Neither a religious treatise nor a self-help manual: Mediterranean traditions made legible for our times — on pride, fear, money, power, justice, time.",
    promesseP3: "To give to a friend as much as to an adversary: a world where each sees their own flaws a little better is already a less brutal world.",
    premieresBadge: "First pages",
    premieresTitle: "Read the first pages",
    premieresIntro: "The book opens on Part I. Here are its first pages, just as you would find them.",
    domaineLabel: "Part",
    medLabel: "Meditation",
    medCut: "[…] the meditation continues in the book.",
    ailleursTitle: "Elsewhere in the book",
    ailleursSubtitle: "A few fragments from other Parts, to show the range of themes.",
    extraitInspiration: "Each fragment is freely inspired by a tradition of wisdom — never a quotation.",
    domainesTitle: "The eight Parts",
    domainesIntro: "About 205 fragments, across eight Parts, each opened by a meditation. 138 pages.",
    objetTitle: "Get the book",
    objetIntro: "The book is the only paid part of the project: the daily fragments stay free.",
    objetPapier: "Paperback",
    objetPapierDesc: "13 × 20 cm, cream paper — a sober, lasting object.",
    objetEbook: "Ebook",
    objetEbookDesc: "EPUB · PDF · Kindle.",
    objetLangues: "English and Spanish editions in preparation.",
    bientot: "Coming soon",
    ctaPrevenu: "Be notified when the book is out",
    ctaExtrait: "Read an excerpt",
    ctaRituel: "Discover the daily ritual",
    ritualTitle: "A book, and a daily ritual",
    ritualP1: "The Invisible Laws is not only a book. It is also a ritual: each day the site offers a fragment — one in the morning, a thought in the evening, and the source of inspiration when you wish to go further.",
    ritualP2: "The book is the lasting object you keep; the site is the living, free ritual that accompanies it. The daily fragments will always remain free — we do not sell access to wisdom, only the object that gathers it.",
    ctaFragments: "Get the fragments for free",
    sourcesTitle: "On the sources",
    sourcesP1: "The fragments are freely inspired by great families of wisdom — sapiential and biblical, evangelical, Qur'anic and Mediterranean, Stoic, Greek, juridical. They are not quotations; no precise reference is given as proof, and no false reference is made. The book remains secular in use.",
    finalTitle: "Receive the first fragments and be notified of the release.",
    finalSub: "Free. Two fragments a week, no paid subscription.",
    backTop: "↑ Back to top",
  },
  es: {
    subtitle: "Fragmentos de sabiduría para el mundo moderno",
    coverTagline: "Fragmentos de sabiduría",
    promise: "Un libro de fragmentos para alumbrar lo que nos gobierna en silencio.",
    bmTop: "Arriba", bmPromesse: "El libro", bmExtrait: "Extractos", bmDomaines: "Partes", bmObjet: "Conseguir",
    promesseTitle: "El libro",
    promesseP1: "Este libro no predica. Transpone. Bebe de los legados de sabiduría del Mediterráneo — bíblicos, evangélicos, coránicos, jurídicos y filosóficos — para proponer formas breves, graves y actuales.",
    promesseP2: "Ni tratado religioso, ni manual de desarrollo personal: tradiciones mediterráneas hechas legibles para nuestra época — sobre el orgullo, el miedo, el dinero, el poder, la justicia, el tiempo.",
    promesseP3: "Para regalar a un amigo tanto como a un adversario: un mundo donde cada uno ve un poco mejor sus propias grietas ya es un mundo menos brutal.",
    premieresBadge: "Primeras páginas",
    premieresTitle: "Leer las primeras páginas",
    premieresIntro: "El libro se abre con la Parte I. Estas son sus primeras páginas, tal como se descubren.",
    domaineLabel: "Parte",
    medLabel: "Meditación",
    medCut: "[…] la meditación continúa en el libro.",
    ailleursTitle: "En otras partes del libro",
    ailleursSubtitle: "Algunos fragmentos de otras Partes, para mostrar la amplitud de los temas.",
    extraitInspiration: "Cada fragmento está libremente inspirado en una tradición de sabiduría — nunca una cita.",
    domainesTitle: "Las ocho Partes",
    domainesIntro: "Unos 205 fragmentos, en ocho Partes, abiertas cada una por una meditación. 138 páginas.",
    objetTitle: "Conseguir el libro",
    objetIntro: "El libro es lo único de pago del proyecto: los fragmentos diarios siguen siendo gratuitos.",
    objetPapier: "Libro impreso",
    objetPapierDesc: "13 × 20 cm, papel crema — un objeto sobrio y duradero.",
    objetEbook: "Ebook",
    objetEbookDesc: "EPUB · PDF · Kindle.",
    objetLangues: "Ediciones en inglés y español en preparación.",
    bientot: "Próximamente",
    ctaPrevenu: "Avisarme de la salida del libro",
    ctaExtrait: "Leer un extracto",
    ctaRituel: "Descubrir el ritual diario",
    ritualTitle: "Un libro, y un ritual diario",
    ritualP1: "Las Leyes Invisibles no es solo un libro. Es también un ritual: cada día el sitio ofrece un fragmento — uno por la mañana, un pensamiento por la noche, y la fuente de inspiración cuando se quiere ir más lejos.",
    ritualP2: "El libro es el objeto duradero que se conserva; el sitio es el ritual vivo, gratuito, que acompaña. Los fragmentos diarios siempre serán gratuitos — no vendemos el acceso a la sabiduría, solo el objeto que la reúne.",
    ctaFragments: "Recibir los fragmentos gratis",
    sourcesTitle: "Sobre las fuentes",
    sourcesP1: "Los fragmentos están libremente inspirados en grandes familias de sabiduría — sapiencial y bíblica, evangélica, coránica y mediterránea, estoica, griega, jurídica. No son citas; ninguna referencia precisa se da como prueba, y no se inventa ninguna referencia falsa. El libro es laico en su uso.",
    finalTitle: "Recibe los primeros fragmentos y entérate de la salida.",
    finalSub: "Gratis. Dos fragmentos por semana, sin suscripción de pago.",
    backTop: "↑ Volver arriba",
  },
};

function FragmentBlock({ fragment, lang }: { fragment: BookFragment; lang: Language }) {
  const blocks = fragment.text[lang].split(/\n\n+/);
  return (
    <article className="border-l-2 border-primary/20 pl-6 md:pl-8">
      <div className="flex items-baseline gap-3 mb-4 flex-wrap">
        <h3 className="text-sm tracking-[0.18em] uppercase text-accent font-medium">{typo(fragment.title[lang], lang)}</h3>
        <span className="text-xs tracking-[0.14em] uppercase text-muted-foreground font-normal">{fragment.format[lang]}</span>
      </div>
      <div className="space-y-4">
        {blocks.map((b, i) => (
          <p key={i} className="text-xl md:text-2xl text-foreground leading-relaxed font-normal whitespace-pre-line text-balance">{typo(b, lang)}</p>
        ))}
      </div>
    </article>
  );
}

export function BookView() {
  const { lang, t } = useLanguage();
  // Typographie d'affichage appliquée à toutes les chaînes de page (non destructif).
  const s = Object.fromEntries(
    Object.entries(S[lang]).map(([k, v]) => [k, typo(v, lang)]),
  ) as Record<string, string>;

  const bookmark = [
    { id: "haut", label: s.bmTop },
    { id: "promesse", label: s.bmPromesse },
    { id: "extrait", label: s.bmExtrait },
    { id: "domaines", label: s.bmDomaines },
    { id: "objet", label: s.bmObjet },
  ];

  return (
    <div id="haut" className="min-h-screen flex flex-col bg-background scroll-mt-12">
      <nav aria-label={s.bmDomaines} className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-10 flex-col gap-3 pl-4 border-l border-accent/30">
        {bookmark.map((it) => (
          <a key={it.id} href={"#" + it.id} className="group flex items-center gap-2 text-xs tracking-[0.14em] uppercase text-accent/70 hover:text-accent transition-colors">
            <span className="h-px w-4 bg-accent/40 group-hover:w-6 group-hover:bg-accent transition-all" aria-hidden="true" />
            {it.label}
          </a>
        ))}
      </nav>

      <main className="flex-1 flex flex-col items-center px-4 md:px-6 lg:px-8 py-12 md:py-20">
        <div className="w-full max-w-3xl mx-auto">

          <div className="mb-10 md:mb-14">
            <Link href="/" className="text-base text-muted-foreground hover:text-foreground transition-colors tracking-wide">
              {t("nav.back.home")}
            </Link>
          </div>

          {/* 1 — Hero */}
          <header className="mb-16 md:mb-24 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground tracking-tight mb-6">{t("work.title")}</h1>
            <div className="mx-auto mb-8 flex justify-center">
              <div className="w-44 md:w-52 aspect-[13/20] rounded-sm shadow-md flex flex-col items-center justify-center px-5 text-center"
                   style={{ background: "#F3EEE3", border: "1px solid rgba(176,137,79,0.45)" }}>
                <span className="font-semibold tracking-tight" style={{ color: "#1a1a1a", fontSize: "1.2rem", lineHeight: 1.2 }}>{t("work.title")}</span>
                <span className="block my-3" style={{ height: 1, width: 56, background: "#B0894F" }} aria-hidden="true" />
                <span style={{ color: "#8a8a8a", fontStyle: "italic", fontSize: "0.7rem" }}>{s.coverTagline}</span>
              </div>
            </div>
            <p className="text-lg md:text-xl text-foreground/90 italic max-w-xl mx-auto text-balance">{quote(s.promise, lang)}</p>
          </header>

          {/* 2 — Promesse */}
          <section id="promesse" className="mb-16 md:mb-24 scroll-mt-20">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">{s.promesseTitle}</h2>
            <div className="space-y-5 text-lg leading-relaxed text-foreground/90">
              <p>{s.promesseP1}</p>
              <p>{s.promesseP2}</p>
              <p>{s.promesseP3}</p>
            </div>
          </section>

          {/* 3 — Lire les premières pages (extrait continu, Domaine I) */}
          <section id="extrait" className="mb-16 md:mb-24 scroll-mt-20">
            <p className="text-xs tracking-[0.18em] uppercase text-accent mb-2">{s.premieresBadge}</p>
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-3">{s.premieresTitle}</h2>
            <p className="text-muted-foreground mb-10">{s.premieresIntro}</p>

            {/* « page » du livre — ouverture du Domaine I */}
            <div className="rounded-lg border border-primary/15 bg-primary/[0.03] p-6 md:p-10">
              {/* Titre de Domaine */}
              <div className="text-center mb-8">
                <p className="text-xs tracking-[0.2em] uppercase text-accent mb-2">{s.domaineLabel} {DOMAINES[0].n}</p>
                <h3 className="text-xl md:text-2xl font-semibold text-foreground">{DOMAINES[0].name[lang]}</h3>
              </div>

              {/* Épigraphe */}
              <figure className="text-center my-8">
                <span className="block mx-auto mb-4" style={{ height: 1, width: 48, background: "#B0894F" }} aria-hidden="true" />
                <blockquote className="text-lg md:text-xl text-foreground/90 italic max-w-lg mx-auto text-balance">{typo(firstPages.epigraph[lang], lang)}</blockquote>
              </figure>

              {/* Méditation (extrait court, coupure élégante) */}
              <div className="mt-10 mb-10 max-w-xl mx-auto">
                <p className="text-xs tracking-[0.18em] uppercase text-accent mb-1 text-center">{s.medLabel}</p>
                <h4 className="text-lg md:text-xl font-semibold text-foreground italic text-center mb-5">{typo(firstPages.meditationTitle[lang], lang)}</h4>
                <p className="text-lg md:text-xl text-foreground/90 leading-relaxed text-pretty">{typo(firstPages.meditationExcerpt[lang], lang)}</p>
                <p className="mt-3 text-sm text-muted-foreground italic">{s.medCut}</p>
              </div>

              {/* Premiers fragments (titre + texte, comme dans le livre) */}
              <div className="mt-10 space-y-8 max-w-xl mx-auto">
                {firstPages.fragments.map((f: ExcerptFragment, i) => (
                  <article key={i}>
                    <h4 className="text-sm tracking-[0.16em] uppercase text-accent mb-2">{typo(f.title[lang], lang)}</h4>
                    <p className="text-lg md:text-xl text-foreground leading-relaxed text-pretty">{typo(f.text[lang], lang)}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* 3b — Ailleurs dans le livre (sélection représentative) */}
          <section className="mb-16 md:mb-24">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-3">{s.ailleursTitle}</h2>
            <p className="text-muted-foreground mb-10">{s.ailleursSubtitle}</p>
            <div className="space-y-12">
              {bookExtract.map((f, i) => (<FragmentBlock key={i} fragment={f} lang={lang} />))}
            </div>
            <p className="mt-10 text-sm text-muted-foreground italic">{s.extraitInspiration}</p>
          </section>

          {/* 4 — Les huit Domaines */}
          <section id="domaines" className="mb-16 md:mb-24 scroll-mt-20">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-3">{s.domainesTitle}</h2>
            <p className="text-muted-foreground mb-8">{s.domainesIntro}</p>
            <ol className="divide-y divide-primary/10 border-y border-primary/10">
              {DOMAINES.map((d) => (
                <li key={d.n} className="flex items-baseline gap-4 py-4">
                  <span className="text-sm tracking-[0.18em] uppercase text-accent w-16 shrink-0">{d.n}</span>
                  <span className="text-lg text-foreground">{d.name[lang]}</span>
                </li>
              ))}
            </ol>
          </section>

          {/* 5 — Se procurer (livre payant ; pas de paiement réel) */}
          <section id="objet" className="mb-16 md:mb-24 scroll-mt-20">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-3">{s.objetTitle}</h2>
            <p className="text-muted-foreground mb-8">{s.objetIntro}</p>
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {[
                { tt: s.objetPapier, d: s.objetPapierDesc },
                { tt: s.objetEbook, d: s.objetEbookDesc },
              ].map((c) => (
                <div key={c.tt} className="rounded-lg border border-primary/15 p-5">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-lg font-medium text-foreground">{c.tt}</span>
                    <span className="text-xs tracking-wide uppercase text-accent/80 border border-accent/30 rounded px-2 py-0.5">{s.bientot}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{c.d}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mb-8">{s.objetLangues}</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/recevoir" className="rounded-md bg-foreground text-background px-5 py-2.5 text-sm font-medium hover:opacity-90 transition">{s.ctaPrevenu}</Link>
              <a href="#extrait" className="rounded-md border border-primary/30 px-5 py-2.5 text-sm font-medium text-foreground hover:bg-primary/5 transition">{s.ctaExtrait}</a>
            </div>
          </section>

          {/* 6 — Le rituel quotidien (gratuit) */}
          <section className="mb-16 md:mb-24 rounded-lg bg-primary/5 border border-primary/10 p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">{s.ritualTitle}</h2>
            <div className="space-y-4 text-lg leading-relaxed text-foreground/90">
              <p>{s.ritualP1}</p>
              <p>{s.ritualP2}</p>
            </div>
          </section>

          {/* 7 — Sources / crédibilité */}
          <section className="mb-16 md:mb-24">
            <h2 className="text-xl font-semibold text-foreground mb-4">{s.sourcesTitle}</h2>
            <p className="text-base leading-relaxed text-muted-foreground">{s.sourcesP1}</p>
          </section>

          {/* 8 — CTA final */}
          <section className="mb-12 text-center border-t border-primary/10 pt-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-3 text-balance">{s.finalTitle}</h2>
            <p className="text-muted-foreground mb-6">{s.finalSub}</p>
            <Link href="/recevoir" className="inline-block rounded-md bg-foreground text-background px-6 py-3 text-base font-medium hover:opacity-90 transition">{s.ctaFragments}</Link>
          </section>

          <div className="text-center">
            <a href="#haut" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{s.backTop}</a>
          </div>
        </div>
      </main>
    </div>
  );
}
