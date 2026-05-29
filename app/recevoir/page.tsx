"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import type { Language } from "@/types/quote";

/** Page "Recevoir une sagesse" — inscription préparée, NON fonctionnelle.
 *  Aucun email/SMS/paiement branché. Aucune donnée collectée. */
const S: Record<Language, Record<string, string>> = {
  fr: {
    title: "Recevoir une sagesse",
    intro1: "Chaque matin, une sagesse pour entrer dans la journée.",
    intro2: "Chaque soir, une sagesse pour en sortir avec plus de paix.",
    desc: "Bientôt, vous pourrez recevoir deux fragments par jour :",
    morning: "Matin — courage, responsabilité, action juste.",
    evening: "Soir — recul, silence, réparation, apaisement.",
    emailLabel: "Votre adresse e-mail",
    emailPlaceholder: "vous@exemple.com",
    freqLabel: "Fréquence",
    freqMorning: "Matin",
    freqEvening: "Soir",
    freqBoth: "Matin et soir",
    button: "Bientôt disponible",
    note: "Aucune inscription n’est encore active. Aucune donnée n’est collectée.",
  },
  en: {
    title: "Receive a wisdom",
    intro1: "Each morning, a wisdom to enter the day.",
    intro2: "Each evening, a wisdom to leave it with more peace.",
    desc: "Soon, you will be able to receive two fragments a day:",
    morning: "Morning — courage, responsibility, just action.",
    evening: "Evening — distance, silence, repair, calm.",
    emailLabel: "Your email address",
    emailPlaceholder: "you@example.com",
    freqLabel: "Frequency",
    freqMorning: "Morning",
    freqEvening: "Evening",
    freqBoth: "Morning and evening",
    button: "Coming soon",
    note: "No sign-up is active yet. No data is collected.",
  },
  es: {
    title: "Recibir una sabiduría",
    intro1: "Cada mañana, una sabiduría para entrar en el día.",
    intro2: "Cada noche, una sabiduría para salir de él con más paz.",
    desc: "Pronto podrás recibir dos fragmentos al día:",
    morning: "Mañana — coraje, responsabilidad, acción justa.",
    evening: "Noche — distancia, silencio, reparación, sosiego.",
    emailLabel: "Tu dirección de correo",
    emailPlaceholder: "tu@ejemplo.com",
    freqLabel: "Frecuencia",
    freqMorning: "Mañana",
    freqEvening: "Noche",
    freqBoth: "Mañana y noche",
    button: "Próximamente",
    note: "Aún no hay inscripción activa. No se recopila ningún dato.",
  },
};

export default function RecevoirPage() {
  const { lang, t } = useLanguage();
  const s = S[lang];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1 flex flex-col items-center px-4 md:px-6 lg:px-8 py-12 md:py-20">
        <div className="w-full max-w-xl mx-auto">

          {/* Retour */}
          <div className="mb-12 md:mb-16">
            <Link href="/" className="text-base text-muted-foreground hover:text-foreground transition-colors tracking-wide">
              {t("nav.back.home")}
            </Link>
          </div>

          {/* En-tête */}
          <div className="mb-10 md:mb-12 text-center">
            <p className="text-sm tracking-[0.2em] uppercase text-muted-foreground font-normal mb-4">
              {t("eco.name")}
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground tracking-tight">
              {s.title}
            </h1>
          </div>

          {/* Intention rituelle */}
          <div className="space-y-2 text-lg md:text-xl text-foreground font-normal leading-relaxed text-center mb-10 md:mb-12">
            <p>{s.intro1}</p>
            <p>{s.intro2}</p>
          </div>

          {/* Description matin / soir */}
          <div className="mb-10 md:mb-12 pl-6 md:pl-8 border-l-2 border-primary/20">
            <p className="text-base md:text-lg text-muted-foreground font-normal mb-4">{s.desc}</p>
            <ul className="space-y-3">
              <li className="text-base md:text-lg text-foreground font-normal">
                <span className="text-accent font-medium">●</span> {s.morning}
              </li>
              <li className="text-base md:text-lg text-foreground font-normal">
                <span className="text-accent font-medium">○</span> {s.evening}
              </li>
            </ul>
          </div>

          {/* Formulaire visuel — NON fonctionnel (aucun service branché) */}
          <form
            onSubmit={(e) => e.preventDefault()}
            aria-describedby="recevoir-note"
            className="rounded-2xl border border-border bg-card p-6 md:p-8 space-y-6"
          >
            <div>
              <label htmlFor="email" className="block text-sm tracking-[0.12em] uppercase text-muted-foreground font-medium mb-2">
                {s.emailLabel}
              </label>
              <input
                id="email"
                type="email"
                inputMode="email"
                autoComplete="off"
                disabled
                placeholder={s.emailPlaceholder}
                className="w-full max-w-full rounded-lg border border-border bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/70 disabled:opacity-70 disabled:cursor-not-allowed"
              />
            </div>

            <fieldset disabled className="disabled:opacity-80">
              <legend className="text-sm tracking-[0.12em] uppercase text-muted-foreground font-medium mb-3">
                {s.freqLabel}
              </legend>
              <div className="flex flex-wrap gap-3">
                {[s.freqMorning, s.freqEvening, s.freqBoth].map((label, i) => (
                  <label
                    key={i}
                    className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-base text-foreground cursor-not-allowed"
                  >
                    <input type="radio" name="frequency" disabled defaultChecked={i === 2} className="accent-primary" />
                    {label}
                  </label>
                ))}
              </div>
            </fieldset>

            <button
              type="submit"
              disabled
              aria-disabled="true"
              className="w-full rounded-lg border border-border bg-secondary px-6 py-3 text-base text-muted-foreground font-medium tracking-wide cursor-not-allowed select-none"
            >
              {s.button}
            </button>

            <p id="recevoir-note" className="text-sm text-muted-foreground font-normal text-center">
              {s.note}
            </p>
          </form>

        </div>
      </main>
    </div>
  );
}
