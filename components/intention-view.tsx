"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { typo } from "@/lib/typography";
import type { Language } from "@/types/quote";

type Block = { h?: string; p: string[] };
type Item = { label: string; text: string };

interface IntentionContent {
  eyebrow: string;
  title: string;
  lede: string;
  sections: Block[];
  livreTitle: string;
  livreIntro: string;
  livreItems: Item[];
  livreClose: string;
  transTitle: string;
  trans: string[];
  closeLines: string[];
  ctaLivre: string;
  ctaFragments: string;
}

const C: Record<Language, IntentionContent> = {
  fr: {
    eyebrow: "L'intention",
    title: "Pourquoi Les Lois Invisibles existe",
    lede: "Quelques mots, à la première personne, sur l'origine de ce projet — et sur ce que j'espère en transmettre.",
    sections: [
      {
        h: "Un livre lu à seize ans",
        p: [
          "Je me souviens encore de la première fois où j'ai posé les yeux sur Hagakure. J'avais seize ans. Je ne comprenais sans doute pas tout, mais j'avais été saisi par cette forme rare : quelques phrases seulement, et pourtant l'impression d'entrer dans un monde entier.",
          "Ce qui m'avait marqué, ce n'était pas le Japon, les samouraïs ou l'exotisme d'un texte ancien. C'était la densité — cette capacité à dire en peu de mots quelque chose qui dépasse une époque, un pays, une fonction, une croyance. Une sagesse brève, mais qui reste longtemps en soi.",
        ],
      },
      {
        h: "Élève et passeur",
        p: [
          "Avec les années, j'ai compris qu'une véritable sagesse n'est pas une posture de maître. Elle est peut-être même l'inverse.",
          "C'est la capacité de rester à la fois élève et maître, enfant et parent, héritier et passeur : recevoir ce qui nous précède, l'éprouver dans sa propre vie, puis essayer d'en transmettre quelque chose — sans prétendre posséder la vérité.",
        ],
      },
      {
        h: "Chercher ces fragments",
        p: [
          "Toute ma vie, j'ai cherché ces fragments-là. Dans les livres, dans les traditions, dans la politique, dans le travail, dans les conflits humains — et dans mes erreurs aussi.",
          "J'ai toujours eu le sentiment que les grandes sagesses anciennes ne parlaient pas seulement d'un monde disparu. Elles parlaient encore de nous : de notre orgueil, de notre peur, de notre argent, de notre rapport au pouvoir, à la justice, à la famille, à la mort, au temps.",
          "C'est de cette intuition qu'est né Les Lois Invisibles.",
        ],
      },
      {
        h: "Rendre lisible, aujourd'hui",
        p: [
          "Ce projet est une tentative de recueillir une part de ce que nos anciens nous ont légué — non pour le répéter à l'identique, mais pour le rendre à nouveau lisible dans notre monde.",
          "Un monde qui avance si vite que nous avons parfois du mal à suivre son propre rythme. Un monde saturé de bruit, d'images, d'opinions, de colères immédiates, où il devient presque nécessaire de retrouver des phrases lentes, simples et profondes.",
        ],
      },
      {
        h: "Ce que ce livre n'est pas",
        p: [
          "Ce livre ne prêche pas. Il ne prétend pas fonder une doctrine. Il n'est ni un texte religieux, ni un manuel de développement personnel.",
          "Il puise dans les grandes sagesses méditerranéennes, bibliques, évangéliques, coraniques, juridiques et philosophiques, pour en proposer des transpositions modernes : des fragments courts, graves, parfois durs, parfois consolants — mais toujours tournés vers une question simple : qu'est-ce que l'être humain continue de répéter, malgré les siècles ?",
        ],
      },
      {
        h: "À offrir à un ami comme à un adversaire",
        p: [
          "Je voudrais que ce livre puisse être offert à un ami, mais aussi à un adversaire. Parce que rien ne vaut l'éveil de l'autre.",
          "Parce qu'un monde où chacun comprend un peu mieux ses propres failles est déjà un monde moins brutal. Parce qu'une phrase juste, au bon moment, peut parfois faire plus qu'un long discours.",
        ],
      },
    ],
    livreTitle: "Le livre et le rituel",
    livreIntro:
      "Les Lois Invisibles n'est pas seulement un livre. C'est aussi un rituel quotidien — une manière de recevoir chaque jour un fragment de sagesse, comme une petite pierre posée sur le chemin.",
    livreItems: [
      { label: "Le livre", text: "l'objet durable, qui se garde et qui s'offre." },
      { label: "Le site", text: "un fragment chaque jour, gratuitement : un texte court le matin, une pensée le soir." },
      { label: "La newsletter", text: "la même transmission, gratuite, déposée dans votre boîte." },
    ],
    livreClose:
      "Si les fragments restent gratuits, c'est par cohérence : on ne vend pas l'accès à la sagesse, seulement l'objet qui la rassemble, pour qui veut la garder près de soi.",
    transTitle: "Transmettre sans posséder",
    trans: [
      "Transmettre n'est pas posséder. Je ne cherche pas à fonder une école, ni à imposer une doctrine.",
      "Les fragments sont librement inspirés des traditions anciennes — jamais des citations. Aucune référence n'est donnée comme preuve, et aucune fausse référence n'est avancée : transposer demande de la prudence, pas de l'autorité.",
      "L'objectif n'est pas de ralentir le monde — nous ne le pourrons pas. Il est d'apprendre à ne pas être entièrement emportés par lui.",
    ],
    closeLines: [
      "Transmettre un peu de ce que nos aïeux nous ont laissé, pour mieux porter le poids de notre avenir : voilà, au fond, l'ambition de ce projet.",
      "Non pas revenir en arrière. Mais avancer avec davantage de mémoire.",
    ],
    ctaLivre: "Découvrir le livre",
    ctaFragments: "Recevoir gratuitement les fragments",
  },
  en: {
    eyebrow: "The intention",
    title: "Why The Invisible Laws exists",
    lede: "A few words, in the first person, on where this project comes from — and on what I hope to pass on.",
    sections: [
      {
        h: "A book read at sixteen",
        p: [
          "I still remember the first time I set eyes on Hagakure. I was sixteen. I surely did not understand everything, but I was seized by that rare form: a few sentences only, and yet the feeling of stepping into a whole world.",
          "What had marked me was not Japan, the samurai, or the exoticism of an old text. It was the density — that capacity to say, in few words, something that outlasts an era, a country, a role, a belief. A brief wisdom, but one that stays in you for a long time.",
        ],
      },
      {
        h: "Pupil and bearer",
        p: [
          "Over the years, I understood that true wisdom is not the posture of a master. It may even be the opposite.",
          "It is the ability to remain at once pupil and master, child and parent, heir and bearer: to receive what precedes us, to test it in one's own life, then to try to pass something on — without claiming to possess the truth.",
        ],
      },
      {
        h: "Searching for those fragments",
        p: [
          "All my life, I have searched for those fragments. In books, in traditions, in politics, in work, in human conflicts — and in my mistakes too.",
          "I have always felt that the great ancient wisdoms did not speak only of a vanished world. They still spoke of us: of our pride, our fear, our money, our relation to power, to justice, to family, to death, to time.",
          "It is from this intuition that The Invisible Laws was born.",
        ],
      },
      {
        h: "To make legible, today",
        p: [
          "This project is an attempt to gather part of what our elders left us — not to repeat it identically, but to make it legible again in our world.",
          "A world that moves so fast that we sometimes struggle to keep up with its own rhythm. A world saturated with noise, images, opinions, immediate angers, where it becomes almost necessary to find slow, simple, deep sentences.",
        ],
      },
      {
        h: "What this book is not",
        p: [
          "This book does not preach. It does not claim to found a doctrine. It is neither a religious text nor a self-help manual.",
          "It draws on the great Mediterranean, biblical, evangelical, Qur'anic, juridical and philosophical wisdoms, to offer modern transpositions: short, grave fragments, sometimes hard, sometimes consoling — but always turned toward one simple question: what does the human being keep repeating, despite the centuries?",
        ],
      },
      {
        h: "To give to a friend as much as to an adversary",
        p: [
          "I would like this book to be given to a friend, but also to an adversary. Because nothing is worth more than the awakening of the other.",
          "Because a world where each understands their own flaws a little better is already a less brutal world. Because a right sentence, at the right moment, can sometimes do more than a long speech.",
        ],
      },
    ],
    livreTitle: "The book and the ritual",
    livreIntro:
      "The Invisible Laws is not only a book. It is also a daily ritual — a way to receive, each day, a fragment of wisdom, like a small stone laid on the path.",
    livreItems: [
      { label: "The book", text: "the lasting object, one you keep and one you give." },
      { label: "The site", text: "a fragment every day, for free: a short text in the morning, a thought in the evening." },
      { label: "The newsletter", text: "the same transmission, free, brought to your inbox." },
    ],
    livreClose:
      "If the fragments remain free, it is out of consistency: we do not sell access to wisdom, only the object that gathers it, for those who wish to keep it close.",
    transTitle: "To pass on without possessing",
    trans: [
      "To pass on is not to possess. I am not trying to found a school, nor to impose a doctrine.",
      "The fragments are freely inspired by ancient traditions — never quotations. No precise reference is given as proof, and no false reference is made: transposing calls for prudence, not authority.",
      "The goal is not to slow the world down — we will not be able to. It is to learn not to be entirely swept away by it.",
    ],
    closeLines: [
      "To pass on a little of what our forebears left us, the better to carry the weight of our future: that, at heart, is the ambition of this project.",
      "Not to go backward. But to move forward with more memory.",
    ],
    ctaLivre: "Discover the book",
    ctaFragments: "Get the fragments for free",
  },
  es: {
    eyebrow: "La intención",
    title: "Por qué existe Las Leyes Invisibles",
    lede: "Unas palabras, en primera persona, sobre el origen de este proyecto — y sobre lo que espero transmitir.",
    sections: [
      {
        h: "Un libro leído a los dieciséis",
        p: [
          "Aún recuerdo la primera vez que posé los ojos en Hagakure. Tenía dieciséis años. Seguramente no lo entendía todo, pero me había sobrecogido esa forma tan rara: apenas unas frases y, sin embargo, la impresión de entrar en un mundo entero.",
          "Lo que me marcó no fue Japón, los samuráis ni el exotismo de un texto antiguo. Fue la densidad — esa capacidad de decir, en pocas palabras, algo que supera una época, un país, una función, una creencia. Una sabiduría breve, pero que permanece mucho tiempo dentro de uno.",
        ],
      },
      {
        h: "Alumno y transmisor",
        p: [
          "Con los años, comprendí que una verdadera sabiduría no es una postura de maestro. Quizá sea incluso lo contrario.",
          "Es la capacidad de seguir siendo a la vez alumno y maestro, hijo y padre, heredero y transmisor: recibir lo que nos precede, ponerlo a prueba en la propia vida, y luego intentar transmitir algo — sin pretender poseer la verdad.",
        ],
      },
      {
        h: "Buscar esos fragmentos",
        p: [
          "Toda mi vida he buscado esos fragmentos. En los libros, en las tradiciones, en la política, en el trabajo, en los conflictos humanos — y también en mis errores.",
          "Siempre tuve la sensación de que las grandes sabidurías antiguas no hablaban solo de un mundo desaparecido. Seguían hablando de nosotros: de nuestro orgullo, de nuestro miedo, de nuestro dinero, de nuestra relación con el poder, con la justicia, con la familia, con la muerte, con el tiempo.",
          "De esa intuición nació Las Leyes Invisibles.",
        ],
      },
      {
        h: "Hacer legible, hoy",
        p: [
          "Este proyecto es un intento de recoger una parte de lo que nuestros antiguos nos legaron — no para repetirlo idéntico, sino para volverlo legible de nuevo en nuestro mundo.",
          "Un mundo que avanza tan rápido que a veces nos cuesta seguir su propio ritmo. Un mundo saturado de ruido, de imágenes, de opiniones, de cóleras inmediatas, donde se vuelve casi necesario reencontrar frases lentas, simples y profundas.",
        ],
      },
      {
        h: "Lo que este libro no es",
        p: [
          "Este libro no predica. No pretende fundar una doctrina. No es ni un texto religioso ni un manual de desarrollo personal.",
          "Bebe de las grandes sabidurías mediterráneas, bíblicas, evangélicas, coránicas, jurídicas y filosóficas, para proponer transposiciones modernas: fragmentos breves, graves, a veces duros, a veces consoladores — pero siempre vueltos hacia una pregunta simple: ¿qué sigue repitiendo el ser humano, pese a los siglos?",
        ],
      },
      {
        h: "Para regalar a un amigo tanto como a un adversario",
        p: [
          "Quisiera que este libro pudiera regalarse a un amigo, pero también a un adversario. Porque nada vale tanto como el despertar del otro.",
          "Porque un mundo donde cada uno comprende un poco mejor sus propias grietas ya es un mundo menos brutal. Porque una frase justa, en el momento justo, puede a veces más que un largo discurso.",
        ],
      },
    ],
    livreTitle: "El libro y el ritual",
    livreIntro:
      "Las Leyes Invisibles no es solo un libro. Es también un ritual diario — una manera de recibir, cada día, un fragmento de sabiduría, como una pequeña piedra puesta en el camino.",
    livreItems: [
      { label: "El libro", text: "el objeto duradero, que se conserva y que se regala." },
      { label: "El sitio", text: "un fragmento cada día, gratis: un texto breve por la mañana, un pensamiento por la noche." },
      { label: "La newsletter", text: "la misma transmisión, gratuita, en tu bandeja de entrada." },
    ],
    livreClose:
      "Si los fragmentos siguen siendo gratuitos, es por coherencia: no vendemos el acceso a la sabiduría, solo el objeto que la reúne, para quien quiera conservarla cerca.",
    transTitle: "Transmitir sin poseer",
    trans: [
      "Transmitir no es poseer. No busco fundar una escuela, ni imponer una doctrina.",
      "Los fragmentos están libremente inspirados en las tradiciones antiguas — nunca son citas. No se da ninguna referencia precisa como prueba, ni se inventa ninguna falsa: transponer exige prudencia, no autoridad.",
      "El objetivo no es frenar el mundo — no podremos. Es aprender a no ser arrastrados del todo por él.",
    ],
    closeLines: [
      "Transmitir un poco de lo que nuestros mayores nos dejaron, para llevar mejor el peso de nuestro porvenir: esa es, en el fondo, la ambición de este proyecto.",
      "No volver atrás. Sino avanzar con más memoria.",
    ],
    ctaLivre: "Descubrir el libro",
    ctaFragments: "Recibir los fragmentos gratis",
  },
};

export function IntentionView() {
  const { lang, t } = useLanguage();
  const c = C[lang];
  const tp = (s: string) => typo(s, lang);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1 flex flex-col items-center px-4 md:px-6 lg:px-8 py-12 md:py-20">
        <article className="w-full max-w-2xl mx-auto">

          {/* Retour */}
          <div className="mb-12 md:mb-16">
            <Link href="/" className="text-base text-muted-foreground hover:text-foreground transition-colors tracking-wide">
              {t("nav.back.home")}
            </Link>
          </div>

          {/* 1 — Hero */}
          <header className="mb-12 md:mb-16 text-center">
            <p className="text-sm tracking-[0.2em] uppercase text-accent mb-4">{tp(c.eyebrow)}</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground tracking-tight text-balance mb-6">{tp(c.title)}</h1>
            <p className="text-lg md:text-xl text-muted-foreground italic leading-relaxed max-w-xl mx-auto text-pretty">{tp(c.lede)}</p>
          </header>

          <hr className="border-border mb-12 md:mb-16" />

          {/* 2 — Texte personnel */}
          <div className="space-y-12 md:space-y-16">
            {c.sections.map((sec, i) => (
              <section key={i}>
                {sec.h && (
                  <h2 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight mb-5">{tp(sec.h)}</h2>
                )}
                <div className="space-y-5">
                  {sec.p.map((par, j) => (
                    <p key={j} className="text-lg md:text-xl text-foreground/90 font-normal leading-relaxed text-pretty">{tp(par)}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* 3 — Le livre et le rituel */}
          <section className="mt-14 md:mt-20 rounded-lg bg-primary/5 border border-primary/10 p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4">{tp(c.livreTitle)}</h2>
            <p className="text-lg text-foreground/90 leading-relaxed mb-6">{tp(c.livreIntro)}</p>
            <ul className="space-y-3 mb-6">
              {c.livreItems.map((it, i) => (
                <li key={i} className="text-lg text-foreground/90 leading-relaxed">
                  <span className="text-accent font-medium">{tp(it.label)}</span>
                  <span className="text-muted-foreground"> — {tp(it.text)}</span>
                </li>
              ))}
            </ul>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed text-pretty">{tp(c.livreClose)}</p>
          </section>

          {/* 4 — Transmettre sans posséder */}
          <section className="mt-14 md:mt-20">
            <h2 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight mb-5">{tp(c.transTitle)}</h2>
            <div className="space-y-5">
              {c.trans.map((par, i) => (
                <p key={i} className="text-lg md:text-xl text-foreground/90 font-normal leading-relaxed text-pretty">{tp(par)}</p>
              ))}
            </div>
          </section>

          {/* Clausule */}
          <div className="mt-14 md:mt-20 pt-10 border-t border-border text-center space-y-3">
            {c.closeLines.map((line, i) => (
              <p key={i} className="text-xl md:text-2xl text-foreground italic font-normal leading-relaxed text-balance">{tp(line)}</p>
            ))}
          </div>

          {/* 5 — CTA final */}
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link
              href="/livre"
              className="px-6 py-3 rounded-lg bg-foreground text-background text-base font-medium tracking-wide hover:opacity-90 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {tp(c.ctaLivre)}
            </Link>
            <Link
              href="/recevoir"
              className="px-6 py-3 rounded-lg border border-primary/40 bg-card text-foreground text-base font-medium tracking-wide hover:bg-secondary hover:border-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {tp(c.ctaFragments)}
            </Link>
          </div>

        </article>
      </main>
    </div>
  );
}
