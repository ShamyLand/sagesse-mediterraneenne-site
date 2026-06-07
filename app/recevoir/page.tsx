"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { typo } from "@/lib/typography";
import type { Language } from "@/types/quote";

/**
 * Page "Recevoir les fragments" — porte d'entrée GRATUITE.
 * Le formulaire POST vers /api/subscribe (Brevo, MODE TEST).
 * Sans clés configurées, l'API répond mode:"preview" → aucun enregistrement réel.
 * Aucun paiement. Aucune campagne publique.
 */
const S: Record<Language, Record<string, string>> = {
  fr: {
    title: "Recevoir les fragments",
    subtitle: "Deux fois par semaine, un texte bref pour retrouver du recul, du discernement et de la mémoire.",
    free1: "Les fragments sont gratuits.",
    free2: "Pas de publicité.",
    free3: "Pas d'abonnement payant.",
    free4: "Désinscription possible à tout moment.",
    prenomLabel: "Prénom (facultatif)",
    prenomPlaceholder: "Votre prénom",
    emailLabel: "Adresse e-mail",
    emailPlaceholder: "vous@exemple.com",
    consent: "J'accepte de recevoir les fragments par e-mail. Je peux me désinscrire à tout moment.",
    button: "Recevoir gratuitement les fragments",
    sending: "Envoi…",
    formNote: "Votre adresse ne sert qu'à l'envoi des fragments — jamais de spam, jamais de revente.",
    errorMsg: "Un souci est survenu. Merci de réessayer dans un instant.",
    okTitle: "C'est fait — bienvenue.",
    okBody: "Vous recevrez bientôt un premier message. Vous pouvez vous désinscrire à tout moment.",
    previewTitle: "Merci de votre intérêt.",
    previewBody: "La liste n'est pas encore ouverte : vous serez prévenu·e dès le lancement. Aucune donnée n'a été enregistrée.",
    recevrezTitle: "Ce que vous recevrez",
    recevrez1: "Un fragment bref.",
    recevrez2: "Parfois une note d'intention.",
    recevrez3: "Les nouvelles du livre.",
    recevrez4: "Jamais de spam.",
    rythmeTitle: "Le rythme",
    rythme1: "Deux fragments par semaine, pas plus.",
    rythme2: "Le site garde le rituel quotidien — l'e-mail reste plus rare, et plus précieux.",
    ctaIntro: "Pendant ce temps, le projet se découvre ici :",
    ctaLivre: "Découvrir le livre",
    ctaIntention: "Lire l'intention",
  },
  en: {
    title: "Receive the fragments",
    subtitle: "Twice a week, a short text to regain distance, discernment and memory.",
    free1: "The fragments are free.",
    free2: "No advertising.",
    free3: "No paid subscription.",
    free4: "Unsubscribe at any time.",
    prenomLabel: "First name (optional)",
    prenomPlaceholder: "Your first name",
    emailLabel: "Email address",
    emailPlaceholder: "you@example.com",
    consent: "I agree to receive the fragments by email. I can unsubscribe at any time.",
    button: "Get the fragments for free",
    sending: "Sending…",
    formNote: "Your address is used only to send the fragments — never spam, never resold.",
    errorMsg: "Something went wrong. Please try again in a moment.",
    okTitle: "Done — welcome.",
    okBody: "You will soon receive a first message. You can unsubscribe at any time.",
    previewTitle: "Thank you for your interest.",
    previewBody: "The list is not open yet: you will be notified at launch. No data has been stored.",
    recevrezTitle: "What you will receive",
    recevrez1: "A short fragment.",
    recevrez2: "Sometimes a note of intention.",
    recevrez3: "News about the book.",
    recevrez4: "Never spam.",
    rythmeTitle: "The rhythm",
    rythme1: "Two fragments a week, no more.",
    rythme2: "The site keeps the daily ritual — the email stays rarer, and more precious.",
    ctaIntro: "Meanwhile, the project unfolds here:",
    ctaLivre: "Discover the book",
    ctaIntention: "Read the intention",
  },
  es: {
    title: "Recibir los fragmentos",
    subtitle: "Dos veces por semana, un texto breve para recuperar distancia, discernimiento y memoria.",
    free1: "Los fragmentos son gratuitos.",
    free2: "Sin publicidad.",
    free3: "Sin suscripción de pago.",
    free4: "Puedes darte de baja en cualquier momento.",
    prenomLabel: "Nombre (opcional)",
    prenomPlaceholder: "Tu nombre",
    emailLabel: "Correo electrónico",
    emailPlaceholder: "tu@ejemplo.com",
    consent: "Acepto recibir los fragmentos por correo. Puedo darme de baja en cualquier momento.",
    button: "Recibir los fragmentos gratis",
    sending: "Enviando…",
    formNote: "Tu dirección solo se usa para enviar los fragmentos — nunca spam, nunca se revende.",
    errorMsg: "Algo salió mal. Inténtalo de nuevo en un momento.",
    okTitle: "Hecho — bienvenido·a.",
    okBody: "Pronto recibirás un primer mensaje. Puedes darte de baja en cualquier momento.",
    previewTitle: "Gracias por tu interés.",
    previewBody: "La lista aún no está abierta: te avisaremos en el lanzamiento. No se ha guardado ningún dato.",
    recevrezTitle: "Lo que recibirás",
    recevrez1: "Un fragmento breve.",
    recevrez2: "A veces una nota de intención.",
    recevrez3: "Noticias del libro.",
    recevrez4: "Nunca spam.",
    rythmeTitle: "El ritmo",
    rythme1: "Dos fragmentos por semana, no más.",
    rythme2: "El sitio conserva el ritual diario — el correo es más raro, y más valioso.",
    ctaIntro: "Mientras tanto, el proyecto se descubre aquí:",
    ctaLivre: "Descubrir el libro",
    ctaIntention: "Leer la intención",
  },
};

type Status = "idle" | "sending" | "ok" | "preview" | "error";

export default function RecevoirPage() {
  const { lang, t } = useLanguage();
  const s = S[lang];
  const tp = (x: string) => typo(x, lang);

  const [status, setStatus] = useState<Status>("idle");
  const [email, setEmail] = useState("");
  const [prenom, setPrenom] = useState("");
  const [consent, setConsent] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!consent || status === "sending") return;
    setStatus("sending");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, prenom, consent }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok && data.mode === "preview") setStatus("preview");
      else if (res.ok && data.ok) setStatus("ok");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

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

          {/* 1 — Hero */}
          <div className="mb-10 md:mb-12 text-center">
            <p className="text-sm tracking-[0.2em] uppercase text-muted-foreground font-normal mb-4">{t("work.title")}</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground tracking-tight mb-5">{s.title}</h1>
            <p className="text-lg md:text-xl text-foreground/90 leading-relaxed max-w-lg mx-auto text-pretty">{tp(s.subtitle)}</p>
          </div>

          {/* 2 — Gratuité */}
          <ul className="mb-10 md:mb-12 mx-auto max-w-md space-y-2 text-base text-muted-foreground">
            {[s.free1, s.free2, s.free3, s.free4].map((f, i) => (
              <li key={i} className="flex items-baseline gap-3">
                <span className="text-accent" aria-hidden="true">—</span>
                <span className="text-foreground/90">{tp(f)}</span>
              </li>
            ))}
          </ul>

          {/* 3 — Formulaire (Brevo, mode test ; fallback preview sans clés) */}
          {status === "ok" || status === "preview" ? (
            <div role="status" className="rounded-2xl border border-primary/20 bg-primary/5 p-6 md:p-8 text-center space-y-2">
              <p className="text-lg font-medium text-foreground">{tp(status === "ok" ? s.okTitle : s.previewTitle)}</p>
              <p className="text-base text-muted-foreground leading-relaxed">{tp(status === "ok" ? s.okBody : s.previewBody)}</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="rounded-2xl border border-border bg-card p-6 md:p-8 space-y-5">
              <div>
                <label htmlFor="prenom" className="block text-sm tracking-[0.12em] uppercase text-muted-foreground font-medium mb-2">{s.prenomLabel}</label>
                <input id="prenom" type="text" autoComplete="given-name" placeholder={s.prenomPlaceholder}
                  value={prenom} onChange={(e) => setPrenom(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm tracking-[0.12em] uppercase text-muted-foreground font-medium mb-2">{s.emailLabel}</label>
                <input id="email" type="email" inputMode="email" required autoComplete="email" placeholder={s.emailPlaceholder}
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
              </div>
              <label className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                <input type="checkbox" required checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1 accent-primary shrink-0" />
                <span>{tp(s.consent)}</span>
              </label>
              <button type="submit" disabled={status === "sending"}
                className="w-full rounded-lg bg-foreground text-background px-6 py-3 text-base font-medium tracking-wide hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">
                {status === "sending" ? s.sending : s.button}
              </button>
              {status === "error" && (
                <p role="alert" className="text-sm text-center text-red-600 dark:text-red-400">{tp(s.errorMsg)}</p>
              )}
              <p className="text-sm text-muted-foreground text-center leading-relaxed">{tp(s.formNote)}</p>
            </form>
          )}

          {/* 4 — Ce que vous recevrez */}
          <section className="mt-12 md:mt-16">
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4">{s.recevrezTitle}</h2>
            <ul className="space-y-2 text-base md:text-lg text-foreground/90">
              {[s.recevrez1, s.recevrez2, s.recevrez3, s.recevrez4].map((r, i) => (
                <li key={i} className="flex items-baseline gap-3">
                  <span className="text-accent" aria-hidden="true">·</span>{tp(r)}
                </li>
              ))}
            </ul>
          </section>

          {/* 5 — Rythme */}
          <section className="mt-10 md:mt-12 rounded-lg bg-primary/5 border border-primary/10 p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-3">{s.rythmeTitle}</h2>
            <div className="space-y-2 text-base md:text-lg text-foreground/90 leading-relaxed">
              <p>{tp(s.rythme1)}</p>
              <p>{tp(s.rythme2)}</p>
            </div>
          </section>

          {/* 6 — CTA final */}
          <div className="mt-12 md:mt-16 text-center">
            <p className="text-muted-foreground mb-5">{tp(s.ctaIntro)}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/livre" className="px-6 py-3 rounded-lg border border-primary/40 bg-card text-foreground text-base font-medium tracking-wide hover:bg-secondary hover:border-primary transition-colors">{s.ctaLivre}</Link>
              <Link href="/intention" className="px-6 py-3 rounded-lg border border-border bg-card text-foreground text-base font-medium tracking-wide hover:bg-secondary hover:border-primary/40 transition-colors">{s.ctaIntention}</Link>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
