import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Presse",
  description:
    "Dossier de presse des Lois Invisibles de J.H. Gram : présentation, fiche technique, extraits, couvertures en haute définition et contact pour un service de presse.",
  alternates: { canonical: "/presse" },
};

const CONTACT = "jhgram.auteur@gmail.com";

const EXTRAITS = [
  "Le flatteur ne t'admire pas : il étudie l'endroit où tu baisses la garde.",
  "La mort ne respecte ni les titres ni les fortunes : c'est la seule loi que personne n'a jamais contournée.",
  "Une parole lancée pour blesser fait plus de mal qu'un coup : le corps guérit, le mot reste.",
];

/** Dossier de presse : page de référence jointe aux e-mails envoyés aux médias. */
export default function PressePage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl px-5 py-12 md:py-16">
        <Link href="/" className="text-base text-muted-foreground hover:text-foreground transition-colors tracking-wide">← Accueil</Link>
        <h1 className="mt-8 text-3xl md:text-4xl font-semibold text-foreground">Dossier de presse</h1>
        <p className="mt-3 text-base text-muted-foreground">
          <em>Les Lois Invisibles — Fragments de sagesse pour le monde moderne</em>, J.H. Gram
        </p>

        <div className="mt-10 space-y-10 text-base leading-relaxed text-foreground/90">
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">Le livre</h2>
            <p>
              Avant les lois visibles, il y a celles qui gouvernent en silence : l&apos;orgueil, la peur, l&apos;argent, le pouvoir,
              le besoin d&apos;être aimé. <em>Les Lois Invisibles</em> rassemble 203 fragments et 8 méditations nés des grandes sagesses
              de la Méditerranée — la Bible, les Évangiles, le Coran, les stoïciens, la philosophie grecque, la vieille tradition
              juridique de l&apos;équité — transposées dans les mots d&apos;aujourd&apos;hui. Rien n&apos;y est cité : chaque fragment se lit en
              dix secondes et met une journée à s&apos;oublier.
            </p>
            <p className="mt-2">
              Ni traité religieux ni manuel de développement personnel : une parole ancienne reprise pour mieux lire les autres,
              se lire soi-même et traverser son époque avec un peu plus de lucidité.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Trois extraits</h2>
            <ul className="space-y-3">
              {EXTRAITS.map((e) => (
                <li key={e} className="italic border-l-2 border-primary/40 pl-4">« {e} »</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">Fiche technique</h2>
            <ul className="space-y-1">
              <li>Parution : novembre 2026, en auto-édition (Amazon KDP)</li>
              <li>Broché 13 × 20 cm, 136 pages, 11,90 € — ISBN 9798144993425</li>
              <li>Kindle : 3,99 €</li>
              <li>Huit domaines : l&apos;être intérieur, la parole, le pouvoir, la justice, l&apos;argent, le cœur et la famille, les autres et la foule, le temps et la fin</li>
              <li>Éditions anglaise (<em>The Invisible Laws</em>) et espagnole (<em>Las leyes invisibles</em>)</li>
              <li>
                Acheter : <a className="underline hover:text-foreground" href="https://www.amazon.fr/dp/B0HSNV9MST">broché</a> ·{" "}
                <a className="underline hover:text-foreground" href="https://www.amazon.fr/dp/B0HSM8K3GL">Kindle</a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">L&apos;auteur</h2>
            <p>
              J.H. Gram écrit sous pseudonyme, depuis Paris. Un fragment du livre est publié gratuitement chaque jour sur ce site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">Couvertures (haute définition)</h2>
            <ul className="space-y-1">
              <li><a className="underline hover:text-foreground" href="/presse/couverture-les-lois-invisibles.jpg" download>Couverture française (JPG, 1600 × 2560)</a></li>
              <li><a className="underline hover:text-foreground" href="/presse/cover-the-invisible-laws.jpg" download>English cover (JPG, 1600 × 2560)</a></li>
              <li><a className="underline hover:text-foreground" href="/LES_LOIS_INVISIBLES_EXTRAIT_V2.pdf">Extrait du livre (PDF)</a></li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">Service de presse et contact</h2>
            <p>
              Un exemplaire numérique (PDF ou EPUB) est envoyé sur simple demande aux journalistes, blogueurs et chroniqueurs,
              sans aucune obligation d&apos;en parler. Entretien écrit possible.
            </p>
            <p className="mt-2">
              Contact : <a className="underline hover:text-foreground" href={`mailto:${CONTACT}`}>{CONTACT}</a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
