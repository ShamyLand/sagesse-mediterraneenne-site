"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { typo } from "@/lib/typography";
import type { Language } from "@/types/quote";

type Block = { h?: string; p: string[] };

interface IntentionContent {
  eyebrow: string;
  title: string;
  lede: string;
  sections: Block[];
  livreTitle: string;
  livreParagraphs: string[];
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
          "Ce qui m'avait marqué, ce n'était pas seulement le Japon, les samouraïs ou l'exotisme d'un texte venu d'ailleurs. C'était la densité : cette capacité à dire en peu de mots quelque chose qui dépasse une époque, un pays, une fonction ou une croyance. Une sagesse brève, mais qui reste longtemps en soi.",
        ],
      },
      {
        h: "Élève et passeur",
        p: [
          "Avec les années, j'ai compris qu'une véritable sagesse n'est pas une posture de maître. Elle est peut-être même l'inverse.",
          "C'est la capacité de rester à la fois élève et passeur : recevoir ce qui nous précède, l'éprouver dans sa propre vie, puis essayer d'en transmettre quelque chose, sans prétendre posséder la vérité.",
        ],
      },
      {
        h: "Chercher ces fragments",
        p: [
          "Toute ma vie, j'ai cherché ces formes brèves. Dans les livres, dans les traditions, dans la politique, dans le travail, dans les conflits humains — et dans mes erreurs aussi.",
          "J'ai toujours eu le sentiment que les grandes traditions de sagesse ne parlaient pas seulement d'un monde disparu. Elles parlaient encore de nous : de notre orgueil, de notre peur, de notre argent, de notre rapport au pouvoir, à la justice, à la famille, à la mort, au temps.",
          "C'est de cette intuition qu'est né Les Lois Invisibles.",
        ],
      },
      {
        h: "Rendre lisible, aujourd'hui",
        p: [
          "Ce projet est une tentative de recueillir une part de ce qui nous a été transmis, non pour le répéter à l'identique, mais pour le rendre à nouveau lisible.",
          "Nous vivons dans un monde saturé de bruit, d'images, d'opinions et de colères immédiates. Dans ce mouvement permanent, il devient presque nécessaire de retrouver des phrases lentes, simples et profondes.",
        ],
      },
      {
        h: "Ce que ce livre n'est pas",
        p: [
          "Ce livre ne prêche pas. Il ne prétend pas fonder une doctrine. Il n'est ni un texte religieux, ni un manuel de développement personnel.",
          "Il puise dans les sagesses méditerranéennes, bibliques, évangéliques, coraniques, juridiques et philosophiques, pour en proposer des transpositions modernes : des fragments courts, graves, parfois durs, parfois consolants — toujours tournés vers une question simple : qu'est-ce que l'être humain continue de répéter, malgré les siècles ?",
        ],
      },
      {
        h: "À offrir à un ami comme à un adversaire",
        p: [
          "Je voudrais que ce livre puisse être offert à un ami, mais aussi à un adversaire. Parce que rien ne vaut l'éveil de l'autre.",
          "Un monde où chacun comprend un peu mieux ses propres failles est déjà un monde moins brutal. Et une phrase juste, au bon moment, peut parfois faire plus qu'un long discours.",
        ],
      },
    ],
    livreTitle: "Le livre et le rituel",
    livreParagraphs: [
      "Les Lois Invisibles n'est pas seulement un livre. C'est aussi un rituel quotidien : une manière de recevoir chaque jour un fragment de sagesse, comme une petite pierre posée sur le chemin.",
      "Le livre est l'objet durable, celui qui se garde et qui s'offre.",
      "Le site propose un fragment chaque jour, gratuitement : un texte court le matin, une pensée le soir.",
      "La newsletter prolonge cette transmission, gratuitement, dans la boîte de celles et ceux qui souhaitent la recevoir.",
      "Si les fragments restent gratuits, c'est par cohérence : on ne vend pas l'accès à la sagesse. On vend seulement l'objet qui la rassemble, pour qui veut la garder près de soi.",
    ],
    transTitle: "Transmettre sans posséder",
    trans: [
      "Transmettre n'est pas posséder. Je ne cherche pas à fonder une école, ni à imposer une doctrine.",
      "Les fragments sont librement inspirés de grandes traditions de sagesse. Ce ne sont pas des citations. Aucune référence n'est donnée comme preuve, et aucune fausse autorité n'est avancée. Transposer demande de la prudence, pas de la domination.",
      "L'objectif n'est pas de ralentir le monde — nous ne le pourrons pas. Il est d'apprendre à ne pas être entièrement emportés par lui.",
    ],
    closeLines: [
      "Transmettre un peu de ce que d'autres nous ont laissé, pour mieux porter le poids de notre avenir : voilà, au fond, l'ambition de ce projet.",
      "Non pas revenir en arrière.",
      "Mais avancer avec davantage de mémoire.",
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
          "What had marked me was not only Japan, the samurai, or the exoticism of a text from elsewhere. It was the density: that capacity to say, in few words, something that outlasts an era, a country, a role or a belief. A brief wisdom, but one that stays in you for a long time.",
        ],
      },
      {
        h: "Pupil and bearer",
        p: [
          "Over the years, I understood that true wisdom is not the posture of a master. It may even be the opposite.",
          "It is the ability to remain at once pupil and bearer: to receive what precedes us, to test it in one's own life, then to try to pass something on, without claiming to possess the truth.",
        ],
      },
      {
        h: "Searching for those fragments",
        p: [
          "All my life, I have searched for those brief forms. In books, in traditions, in politics, in work, in human conflicts — and in my mistakes too.",
          "I have always felt that the great traditions of wisdom did not speak only of a vanished world. They still spoke of us: of our pride, our fear, our money, our relation to power, to justice, to family, to death, to time.",
          "It is from this intuition that The Invisible Laws was born.",
        ],
      },
      {
        h: "To make legible, today",
        p: [
          "This project is an attempt to gather part of what has been handed down to us, not to repeat it identically, but to make it legible again.",
          "We live in a world saturated with noise, images, opinions and immediate angers. In this ceaseless movement, it becomes almost necessary to recover slow, simple, deep sentences.",
        ],
      },
      {
        h: "What this book is not",
        p: [
          "This book does not preach. It does not claim to found a doctrine. It is neither a religious text nor a self-help manual.",
          "It draws on the Mediterranean, biblical, evangelical, Qur'anic, juridical and philosophical wisdoms, to offer modern transpositions: short, grave fragments, sometimes hard, sometimes consoling — always turned toward one simple question: what does the human being keep repeating, despite the centuries?",
        ],
      },
      {
        h: "To give to a friend as much as to an adversary",
        p: [
          "I would like this book to be given to a friend, but also to an adversary. Because nothing is worth more than the awakening of the other.",
          "A world where each understands their own flaws a little better is already a less brutal world. And a right sentence, at the right moment, can sometimes do more than a long speech.",
        ],
      },
    ],
    livreTitle: "The book and the ritual",
    livreParagraphs: [
      "The Invisible Laws is not only a book. It is also a daily ritual: a way to receive, each day, a fragment of wisdom, like a small stone laid on the path.",
      "The book is the lasting object, the one you keep and the one you give.",
      "The site offers a fragment every day, for free: a short text in the morning, a thought in the evening.",
      "The newsletter carries this transmission further, for free, into the inbox of those who wish to receive it.",
      "If the fragments remain free, it is out of consistency: we do not sell access to wisdom. We sell only the object that gathers it, for those who wish to keep it close.",
    ],
    transTitle: "To pass on without possessing",
    trans: [
      "To pass on is not to possess. I am not trying to found a school, nor to impose a doctrine.",
      "The fragments are freely inspired by great traditions of wisdom. They are not quotations. No reference is given as proof, and no false authority is claimed. Transposing calls for prudence, not domination.",
      "The goal is not to slow the world down — we will not be able to. It is to learn not to be entirely swept away by it.",
    ],
    closeLines: [
      "To pass on a little of what others have left us, the better to carry the weight of our future: that, at heart, is the ambition of this project.",
      "Not to go backward.",
      "But to move forward with more memory.",
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
          "Lo que me marcó no fue solo Japón, los samuráis ni el exotismo de un texto venido de otra parte. Fue la densidad: esa capacidad de decir, en pocas palabras, algo que supera una época, un país, una función o una creencia. Una sabiduría breve, pero que permanece mucho tiempo dentro de uno.",
        ],
      },
      {
        h: "Alumno y transmisor",
        p: [
          "Con los años, comprendí que una verdadera sabiduría no es una postura de maestro. Quizá sea incluso lo contrario.",
          "Es la capacidad de seguir siendo a la vez alumno y transmisor: recibir lo que nos precede, ponerlo a prueba en la propia vida, y luego intentar transmitir algo, sin pretender poseer la verdad.",
        ],
      },
      {
        h: "Buscar esos fragmentos",
        p: [
          "Toda mi vida he buscado esas formas breves. En los libros, en las tradiciones, en la política, en el trabajo, en los conflictos humanos — y también en mis errores.",
          "Siempre tuve la sensación de que las grandes tradiciones de sabiduría no hablaban solo de un mundo desaparecido. Seguían hablando de nosotros: de nuestro orgullo, de nuestro miedo, de nuestro dinero, de nuestra relación con el poder, con la justicia, con la familia, con la muerte, con el tiempo.",
          "De esa intuición nació Las Leyes Invisibles.",
        ],
      },
      {
        h: "Hacer legible, hoy",
        p: [
          "Este proyecto es un intento de recoger una parte de lo que se nos ha transmitido, no para repetirlo idéntico, sino para volverlo legible de nuevo.",
          "Vivimos en un mundo saturado de ruido, de imágenes, de opiniones y de cóleras inmediatas. En ese movimiento permanente, se vuelve casi necesario reencontrar frases lentas, simples y profundas.",
        ],
      },
      {
        h: "Lo que este libro no es",
        p: [
          "Este libro no predica. No pretende fundar una doctrina. No es ni un texto religioso ni un manual de desarrollo personal.",
          "Bebe de las sabidurías mediterráneas, bíblicas, evangélicas, coránicas, jurídicas y filosóficas, para proponer transposiciones modernas: fragmentos breves, graves, a veces duros, a veces consoladores — siempre vueltos hacia una pregunta simple: ¿qué sigue repitiendo el ser humano, pese a los siglos?",
        ],
      },
      {
        h: "Para regalar a un amigo tanto como a un adversario",
        p: [
          "Quisiera que este libro pudiera regalarse a un amigo, pero también a un adversario. Porque nada vale tanto como el despertar del otro.",
          "Un mundo donde cada uno comprende un poco mejor sus propias grietas ya es un mundo menos brutal. Y una frase justa, en el momento justo, puede a veces más que un largo discurso.",
        ],
      },
    ],
    livreTitle: "El libro y el ritual",
    livreParagraphs: [
      "Las Leyes Invisibles no es solo un libro. Es también un ritual diario: una manera de recibir, cada día, un fragmento de sabiduría, como una pequeña piedra puesta en el camino.",
      "El libro es el objeto duradero, el que se conserva y se regala.",
      "El sitio ofrece un fragmento cada día, gratis: un texto breve por la mañana, un pensamiento por la noche.",
      "La newsletter prolonga esta transmisión, gratis, en la bandeja de quienes desean recibirla.",
      "Si los fragmentos siguen siendo gratuitos, es por coherencia: no vendemos el acceso a la sabiduría. Vendemos solo el objeto que la reúne, para quien quiera conservarla cerca.",
    ],
    transTitle: "Transmitir sin poseer",
    trans: [
      "Transmitir no es poseer. No busco fundar una escuela, ni imponer una doctrina.",
      "Los fragmentos están libremente inspirados en grandes tradiciones de sabiduría. No son citas. No se da ninguna referencia como prueba, ni se invoca ninguna falsa autoridad. Transponer exige prudencia, no dominación.",
      "El objetivo no es frenar el mundo — no podremos. Es aprender a no ser arrastrados del todo por él.",
    ],
    closeLines: [
      "Transmitir un poco de lo que otros nos dejaron, para llevar mejor el peso de nuestro porvenir: esa es, en el fondo, la ambición de este proyecto.",
      "No volver atrás.",
      "Pero avanzar con más memoria.",
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
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-5">{tp(c.livreTitle)}</h2>
            <div className="space-y-4 text-lg text-foreground/90 leading-relaxed text-pretty">
              {c.livreParagraphs.map((par, i) => (
                <p key={i}>{tp(par)}</p>
              ))}
            </div>
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
