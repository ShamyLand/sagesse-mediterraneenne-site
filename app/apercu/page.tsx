import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aperçu éditorial — Premiers fragments en cours de sélection",
  description:
    "Aperçu de travail. Premiers fragments en cours de sélection pour Les Lois Invisibles. Ceci n'est pas l'Édition I finale.",
  robots: { index: false, follow: false },
};

/* ------------------------------------------------------------------
   APERÇU ÉDITORIAL — page de travail (non indexée, non définitive)
   Contenu statique. Aucune lecture Supabase, aucune publication.
   3 blocs : Extraits du livre (12) · Fragments du site (4) · Posts en préparation (4)
------------------------------------------------------------------ */

type Fragment = {
  title: string;
  format: string;
  theme: string;
  text: string; // paragraphes séparés par \n\n
};

// ── Bloc 1 — Extraits du livre (noyau provisoire : 8 du Batch 1B + 4 du Batch 1C) ──
const extraitsLivre: Fragment[] = [
  {
    title: "Mémoire sous abonnement",
    format: "aphorisme",
    theme: "La mort",
    text: `Le marchand met la mémoire des morts sous abonnement; les vivants paient pour pleurer.`,
  },
  {
    title: "Le nom gravé",
    format: "fragment",
    theme: "La mort",
    text: `Le tailleur de pierre essuya la dalle avec son chiffon gris. La veuve tenait l'acte plié contre sa paume; le témoin regardait ailleurs. Sur la pierre, une lettre avait été ôtée au nom de la morte, assez peu pour nier sans accuser. Les fleurs restaient dans leur plastique. Quand le burin revint, personne ne demanda qui avait commandé le silence.`,
  },
  {
    title: "Les cendres reçues",
    format: "fragment",
    theme: "La mort",
    text: `L'employé des pompes funèbres déposa l'urne sur la table basse, entre deux tasses refroidies. La veuve signa le reçu sans relire, puis retira l'alliance du sachet et la glissa dans l'enveloppe marquée « héritage ». Dans le couloir, un voisin tint la porte ouverte, le visage tourné vers l'ascenseur. Personne ne toucha aux tasses.`,
  },
  {
    title: "Le Code des cendres",
    format: "récit",
    theme: "La mort",
    text: `L'héritier revint de la veillée avant que les tasses soient lavées. Le mort avait laissé une urne, un cahier mince, et un téléphone qui demandait un visage désormais absent.

Il essaya les dates de naissance, les adresses, les chiffres inscrits au dos des enveloppes. Il ne cherchait pas seulement l'argent. Il voulait savoir qui avait été aimé, qui avait été écarté, et quelles fautes pourraient encore servir.

Dans le cahier, aucune somme n'était rangée à son avantage. Trois colonnes tenaient sur une page : reçu, rendu, tu. À côté de certains noms, le mort avait laissé un blanc.

L'héritier appela un technicien, écouta le prix, puis raccrocha. Il posa le téléphone près de l'urne et lut les noms à voix basse, sans les reconnaître tous.

Le lendemain, l'appareil était encore verrouillé.`,
  },
  {
    title: "Le dossier vendu",
    format: "récit",
    theme: "La trahison",
    text: `Le conseiller du chef gardait la clef numérique des contrats. La communauté lui avait confié moins un coffre qu'un passage : par là entraient les bâtisseurs, les prix, les dettes futures.

Un marchand lui offrit une fonction au-dessus de sa fonction. Il ne demanda ni faux sceau ni fausse parole. Seulement l'heure, le nom des concurrents, le dossier avant l'ouverture.

Dans la nuit, le conseiller transmit le fichier, puis vida la corbeille. Au matin, il parla de délais, d'audit, de prudence. Les mots étaient exacts. Leur ordre ne l'était plus.

Le chef lut les traces sans élever la voix. Il ne fit pas de procès dans la salle. Il ôta seulement le siège du conseiller de la table des décisions.

La réunion commença avec une place vide.`,
  },
  {
    title: "L'horloge du couloir",
    format: "note",
    theme: "Le temps",
    text: `L'horloge du couloir avance sans consulter la file. Le greffier soulève des registres, une femme lisse un papier déjà lissé, le témoin garde dans sa poche une phrase préparée contre sa peur. Chacun porte une urgence que la porte ne reconnaît pas. Puis un homme prononce le nom du chef ; le battant cède, les dossiers s'écartent, la même attente devient plus légère pour un seul. Nul n'a déplacé l'horloge. Une main a seulement courbé l'ordre autour d'une faveur, et l'aiguille continue son cercle au-dessus des voix qui n'osent pas monter.`,
  },
  {
    title: "Le Nom Gravé",
    format: "loi",
    theme: "La mort",
    text: `La tombe reçoit le nom du mort; les vivants y déposent les paroles que la honte ou l'orgueil ont retenues. La mort n'absout pas le retard.`,
  },
  {
    title: "La rumeur vendue",
    format: "dialogue",
    theme: "La parole",
    text: `— Marchand, tu as vendu le nom d'un homme sans l'avoir vu fauter.
— Je n'ai rien inventé; la parole était déjà dans la foule.
— Le témoin souleva le drap de l'étal : sous les pièces, le sceau du marchand collait encore à la tablette.`,
  },
  {
    title: "Nom absent",
    format: "fragment",
    theme: "La mémoire des femmes",
    text: `Au guichet des archives, la veuve tend un livret sans photographie. Le greffier cherche le nom du propriétaire; la maison porte celui du marchand, les quittances aussi. Elle sort d'un torchon trois clés, deux reçus, la liste des dettes payées avec ses nuits de couture. Le registre garde la pierre et oublie la main qui la tient debout.`,
  },
  {
    title: "La Main Hésite",
    format: "dialogue",
    theme: "La frontière",
    text: `— Mes papiers sont entiers; il ne manque que votre tampon.
— Il manque ce que je décide de voir. La frontière n'est pas la ligne : c'est ma main quand elle hésite.
— Alors celui qui attend dehors porte votre hésitation comme une faute.
— Le garde baisse les yeux, tourne le tampon vers l'encre, puis le laisse suspendu au-dessus de la page.`,
  },
  {
    title: "La Main ouverte",
    format: "récit",
    theme: "Le don",
    text: `Le conseiller savait ouvrir les portes. Il avançait un loyer, appelait un directeur, trouvait une place à celui qui n'avait plus de nom dans les dossiers.

Il ne demandait rien sur le moment. Il notait seulement, dans un carnet noir, la date, la somme, le service rendu. Sa générosité avait la patience d'un créancier.

Un jeune disciple reçut de lui une recommandation. Trois mois plus tard, le conseiller lui demanda de soutenir un mensonge devant une commission. Il posa le carnet sur la table, sans l'ouvrir.

Un don qui garde le nom du receveur n'est pas sorti de la main; il attend son heure. Le jeune homme regarda l'enveloppe restée entre eux, puis se leva sans la prendre.`,
  },
  {
    title: "La prudence vendue",
    format: "récit",
    theme: "Le conseil",
    text: `Le conseiller d'une grande clinique recevait deux salaires. L'un venait de la maison qu'il servait. L'autre venait d'un marchand de logiciels qui voulait entrer par la porte des malades.

Un technicien lui remit une note courte : les dossiers pourraient se perdre, les alertes se taire, les erreurs se multiplier. Le conseiller plia la note et parla au directeur d'économie, de vitesse, de prestige.

Quand une infirmière demanda un délai, il sourit devant tous. Il appela cela de la peur ancienne. Il appela prudence ce qui protégeait son contrat.

Le système fut signé avant la fin du mois. Le premier matin, les écrans restèrent blancs plus longtemps que les visages. Dans la salle d'attente, les noms ne montèrent plus.`,
  },
];

// ── Bloc 2 — Fragments du site ──
const fragmentsSite: Fragment[] = [
  {
    title: "Au seuil refusé",
    format: "fragment",
    theme: "La frontière",
    text: `Avant l'ouverture, la file serre la barrière comme une plaie mal fermée. La veuve tend un acte jauni; le jeune garde baisse les yeux vers la case vide. Un témoin s'avance, nomme sa maison, ses morts, ses dettes honorées. Dans la main du garde, l'encre pèse plus qu'une parole vivante. La poignée reste froide sous les doigts de la veuve.`,
  },
  {
    title: "La main du garde",
    format: "récit",
    theme: "La frontière",
    text: `Le garde de nuit veillait derrière une vitre rayée, sous la lampe blanche du guichet. La file avançait par saccades; chacun tenait ses papiers comme une preuve d'existence.

Une femme présenta un dossier complet, sauf une signature laissée vide. Le registre la connaissait, l'adresse répondait, le numéro concordait. Derrière elle, des hommes froissaient leurs enveloppes et regardaient l'horloge.

Le garde posa l'index sur la case rouge. Un appel aurait suffi; il le savait. Il savait aussi qu'aucun supérieur ne demanderait pourquoi l'appel n'avait pas été fait. Le sceau ne décide pas; il garde seulement la trace d'une main.

Il tamponna le dossier suivant. La vitre descendit avec un bruit de petite porte.

Au matin, la file avait avancé sans elle.`,
  },
  {
    title: "Le cachet tombe",
    format: "fragment",
    theme: "La frontière",
    text: `Au guichet, l'étranger glisse ses papiers sous la vitre. Le garde lit le nom, puis la file qui se tasse sous les néons. Entre deux pages, une main devient frontière. Le tampon descend sur l'une; sur l'autre, il reste levé, plus lourd qu'un refus. Derrière la porte automatique, le sac attend encore près des chaussures de celui qu'on n'appelle pas.`,
  },
  {
    title: "Les mains absentes",
    format: "récit",
    theme: "La mémoire des femmes",
    text: `La greffière ouvrit, sur l'écran gris du bureau foncier, les actes d'une maison aux murs de chaux. Trois générations y passaient en lignes sèches : achats, partages, décès. Les hommes avaient des signatures. Les femmes entraient au dossier quand la mort leur donnait enfin un état.

Une héritière effacée demanda une preuve. Elle n'avait pas le titre que le guichet reconnaît vite. Elle posa des cahiers tachés, des reçus pliés, des attestations de voisins : elle ouvrait la boutique avant l'aube, payait le maçon, gardait la malade, retenait la dette quand le marchand frappait.

La greffière lut longtemps. Dans la cour, la lumière blanchissait les dalles. Elle comprit qu'un registre peut protéger la maison et perdre ceux qui l'ont tenue.

Elle ne réécrivit pas l'acte. Elle ajouta une annexe avec les dates, les soins, les paiements, les témoins. Le dossier resta mince; une autre main y était désormais visible.`,
  },
];

// ── Bloc 3 — Posts réseaux en préparation (draft, non publiés) ──
const postsReseaux: Fragment[] = [
  {
    title: "Rancune masquée",
    format: "aphorisme",
    theme: "La vengeance et la grâce",
    text: `Quand un juge règle sa rancune, le coupable trouve un complice sur le banc.`,
  },
  {
    title: "Le Don Serré",
    format: "aphorisme",
    theme: "Le don",
    text: `Le bienfait qui réclame loyauté n'est pas un don ; il enrôle la gratitude contre la conscience.`,
  },
  {
    title: "Le Don Filmé",
    format: "aphorisme",
    theme: "Le don",
    text: `La main qui donne sous caméra nourrit une bouche et confisque un visage.`,
  },
  {
    title: "Dette d'Autrui",
    format: "aphorisme",
    theme: "L'honneur",
    text: `Le puissant appelle honneur la dette qu'il signe sous les caméras; d'autres la paient en heures, en peur, en silence.`,
  },
];

function FragmentArticle({ fragment }: { fragment: Fragment }) {
  const paragraphs = fragment.text.split(/\n\n+/);
  return (
    <article className="border-l-2 border-primary/20 pl-6 md:pl-8">
      <div className="flex items-baseline gap-3 mb-4 flex-wrap">
        <h3 className="text-xs tracking-[0.2em] uppercase text-accent font-medium">
          {fragment.title}
        </h3>
        <span className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground/50 font-light">
          {fragment.format} · {fragment.theme}
        </span>
      </div>
      <div className="space-y-4">
        {paragraphs.map((p, i) => (
          <p
            key={i}
            className="text-lg md:text-xl lg:text-2xl text-foreground leading-relaxed font-light whitespace-pre-line"
          >
            {p}
          </p>
        ))}
      </div>
    </article>
  );
}

export default function ApercuPage() {
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

          {/* En-tête — bandeau "aperçu de travail" */}
          <div className="mb-12 md:mb-16 text-center">
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground/80 font-light mb-4">
              Sagesse Méditerranéenne
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground tracking-tight mb-6">
              Aperçu éditorial
            </h1>
            <div className="inline-flex items-center justify-center px-4 py-2 rounded-md border border-accent/30 bg-accent/5">
              <span className="text-xs tracking-[0.15em] uppercase text-accent/90 font-light">
                Premiers fragments en cours de sélection
              </span>
            </div>
            <p className="mt-6 text-sm text-muted-foreground/70 font-light italic max-w-xl mx-auto">
              Page de travail. Ceci n&rsquo;est pas l&rsquo;Édition I finale : les textes
              ci-dessous sont en cours de revue et peuvent être modifiés, déplacés ou retirés.
            </p>
          </div>

          <hr className="border-border/30 mb-14 md:mb-20" />

          {/* ===== Bloc 1 — Extraits du livre ===== */}
          <section className="mb-20 md:mb-28">
            <header className="mb-10 md:mb-14">
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground/80 font-light mb-3">
                Bloc 1 — {extraitsLivre.length} extraits
              </p>
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight">
                Extraits du livre
              </h2>
              <p className="mt-3 text-sm text-muted-foreground/70 font-light">
                Noyau provisoire, en attente de validation. Sélectionnés pour leur clarté en une lecture.
              </p>
            </header>
            <div className="space-y-14 md:space-y-16">
              {extraitsLivre.map((f, i) => (
                <FragmentArticle key={i} fragment={f} />
              ))}
            </div>
          </section>

          <hr className="border-border/30 mb-14 md:mb-20" />

          {/* ===== Bloc 2 — Fragments du site ===== */}
          <section className="mb-20 md:mb-28">
            <header className="mb-10 md:mb-14">
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground/80 font-light mb-3">
                Bloc 2 — {fragmentsSite.length} fragments
              </p>
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight">
                Fragments du site
              </h2>
              <p className="mt-3 text-sm text-muted-foreground/70 font-light">
                Textes solides, secondaires par rapport au noyau livre.
              </p>
            </header>
            <div className="space-y-14 md:space-y-16">
              {fragmentsSite.map((f, i) => (
                <FragmentArticle key={i} fragment={f} />
              ))}
            </div>
          </section>

          <hr className="border-border/30 mb-14 md:mb-20" />

          {/* ===== Bloc 3 — Posts réseaux en préparation ===== */}
          <section className="mb-12 md:mb-16">
            <header className="mb-10 md:mb-14">
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground/80 font-light mb-3">
                Bloc 3 — {postsReseaux.length} posts · brouillon
              </p>
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight">
                Posts réseaux en préparation
              </h2>
              <p className="mt-3 text-sm text-muted-foreground/70 font-light">
                Non publiés. Aphorismes courts, candidats à la diffusion après validation.
              </p>
            </header>
            <div className="space-y-14 md:space-y-16">
              {postsReseaux.map((f, i) => (
                <FragmentArticle key={i} fragment={f} />
              ))}
            </div>
          </section>

          {/* Pied de page de l'aperçu */}
          <div className="pt-10 md:pt-14 border-t border-border/30 text-center">
            <p className="text-xs tracking-[0.18em] uppercase text-muted-foreground/50 font-light">
              Aperçu de travail · non définitif · non indexé
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}
