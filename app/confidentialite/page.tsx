import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Confidentialité",
  description: "Données personnelles et newsletter des Lois Invisibles : ce qui est collecté, pourquoi, et vos droits.",
  alternates: { canonical: "/confidentialite" },
};

/** Politique de confidentialité (RGPD) — requise avant toute collecte d'adresses e-mail. */
export default function ConfidentialitePage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl px-5 py-12 md:py-16">
        <Link href="/" className="text-base text-muted-foreground hover:text-foreground transition-colors tracking-wide">← Accueil</Link>
        <h1 className="mt-8 text-3xl md:text-4xl font-semibold text-foreground">Confidentialité</h1>
        <p className="mt-3 text-sm text-muted-foreground">Dernière mise à jour : 24 novembre 2026</p>

        <div className="mt-10 space-y-8 text-base leading-relaxed text-foreground/90">
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">Qui est responsable de vos données</h2>
            <p>J.H. Gram, auteur-éditeur des <em>Lois Invisibles</em> (Paris). Pour toute question ou demande, répondez simplement à l&apos;un des e-mails reçus de la newsletter.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">Ce qui est collecté</h2>
            <p>Uniquement ce que vous saisissez dans le formulaire « Recevoir les fragments » : votre adresse e-mail et, si vous le souhaitez, votre prénom.</p>
            <p className="mt-2">Le site ne dépose aucun cookie publicitaire ni de mesure d&apos;audience. Il garde seulement, dans votre navigateur, votre choix de langue et de thème (clair ou sombre).</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">Pourquoi</h2>
            <p>Pour vous envoyer les fragments (deux par semaine au plus) et, parfois, des nouvelles du livre. Base légale : votre consentement, donné en cochant la case du formulaire. Vos données ne sont ni vendues, ni louées, ni cédées.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">Qui les traite</h2>
            <p>Les adresses sont conservées et les e-mails envoyés par Brevo (Sendinblue SAS, France), qui héberge les données dans l&apos;Union européenne. Le site est hébergé par Vercel Inc. (États-Unis), qui ne conserve pas les adresses de la newsletter.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">Combien de temps</h2>
            <p>Jusqu&apos;à votre désinscription. Chaque e-mail contient un lien pour vous désinscrire en un clic ; votre adresse est alors retirée de la liste d&apos;envoi.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">Vos droits</h2>
            <p>Vous pouvez à tout moment accéder à vos données, les faire corriger ou supprimer, et retirer votre consentement, en répondant à un e-mail de la newsletter. Si vous estimez que vos droits ne sont pas respectés, vous pouvez saisir la CNIL (cnil.fr).</p>
          </section>
        </div>
      </div>
    </main>
  );
}
