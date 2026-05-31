"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import type { Moment } from "@/lib/fragments-placeholder";
import type { I18nKey } from "@/lib/i18n/dictionary";
import type { Inspiration, Loc, Lang } from "@/lib/site-fragments";
import { cn } from "@/lib/utils";

export type HomeFragment = { title: string; text: Loc; source: Inspiration | null };

interface DailyFragmentProps {
  moment: Moment;
  variant?: "primary" | "secondary";
  fragment: HomeFragment;
}

const LABEL_KEY: Record<Moment, I18nKey> = { morning: "home.morning.label", evening: "home.evening.label" };
const INTENT_KEY: Record<Moment, I18nKey> = { morning: "home.morning.intent", evening: "home.evening.intent" };

const TYPE_LABEL: Record<string, Loc> = {
  direct: { fr: "Source directe", en: "Direct source", es: "Fuente directa" },
  thematic: { fr: "Inspiration thématique", en: "Thematic inspiration", es: "Inspiración temática" },
  echo: { fr: "Écho doctrinal", en: "Doctrinal echo", es: "Eco doctrinal" },
  parallel: { fr: "Parallèle philosophique", en: "Philosophical parallel", es: "Paralelo filosófico" },
};
const UI: Record<string, Loc> = {
  see: { fr: "Voir la source", en: "View the source", es: "Ver la fuente" },
  hide: { fr: "Masquer la source", en: "Hide the source", es: "Ocultar la fuente" },
  source: { fr: "Source d'inspiration", en: "Source of inspiration", es: "Fuente de inspiración" },
  type: { fr: "Type :", en: "Type:", es: "Tipo:" },
  ancient: { fr: "Idée ancienne", en: "Ancient idea", es: "Idea antigua" },
  modern: { fr: "Lecture contemporaine", en: "Contemporary reading", es: "Lectura contemporánea" },
};

export function DailyFragment({ moment, variant = "primary", fragment }: DailyFragmentProps) {
  const { t, lang } = useLanguage();
  const L = lang as Lang;
  const isPrimary = variant === "primary";
  const [open, setOpen] = useState(false);
  const insp = fragment.source;
  const pick = (loc: Loc | null) => (loc ? loc[L] || loc.fr : null);

  return (
    <article
      className={cn(
        "bg-card rounded-2xl border transition-all duration-500 ease-out",
        isPrimary ? "border-primary/50 shadow-lg p-7 md:p-10 lg:p-12" : "border-border shadow-sm p-5 md:p-7"
      )}
      aria-label={t(LABEL_KEY[moment])}
    >
      <header className={cn("mb-5", isPrimary ? "md:mb-7" : "md:mb-5")}>
        <p className={cn("tracking-[0.18em] uppercase text-accent font-medium", isPrimary ? "text-sm md:text-base" : "text-sm")}>
          {t(LABEL_KEY[moment])}
        </p>
        <p className="mt-2 text-base text-muted-foreground font-normal">{t(INTENT_KEY[moment])}</p>
      </header>

      <h3 className={cn("tracking-[0.12em] uppercase text-foreground/70 font-medium mb-3", isPrimary ? "text-sm md:text-base" : "text-sm")}>
        {fragment.title}
      </h3>

      <blockquote className={cn("text-foreground leading-relaxed font-normal text-balance", isPrimary ? "text-2xl md:text-3xl" : "text-lg md:text-xl")}>
        {fragment.text[L] || fragment.text.fr}
      </blockquote>

      {insp && (
        <div className="mt-5">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="inline-flex items-center gap-1 text-sm font-medium text-accent underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
          >
            <span aria-hidden>{open ? "–" : "+"}</span>
            {open ? UI.hide[L] : UI.see[L]}
          </button>

          {open && (
            <div className="mt-3 rounded-xl border border-border bg-background/60 p-4 md:p-5 text-left">
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{UI.source[L]}</p>
              <p className="mt-2 text-sm leading-relaxed">
                <span className="font-medium">{UI.type[L]}</span> {(TYPE_LABEL[insp.type] && TYPE_LABEL[insp.type][L]) || insp.type}
              </p>
              {insp.tradition && (
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {pick(insp.tradition)}
                  {insp.author ? ` — ${insp.author}` : ""}
                  {insp.reference ? ` (${insp.reference})` : ""}
                </p>
              )}
              {insp.summary && (
                <>
                  <p className="mt-3 text-sm font-medium">{UI.ancient[L]}</p>
                  <p className="mt-1 text-sm leading-relaxed">{pick(insp.summary)}</p>
                </>
              )}
              {insp.reading && (
                <>
                  <p className="mt-3 text-sm font-medium">{UI.modern[L]}</p>
                  <p className="mt-1 text-sm leading-relaxed">{pick(insp.reading)}</p>
                </>
              )}
              {insp.disclaimer && (
                <p className="mt-4 border-t border-border pt-3 text-xs italic leading-relaxed text-muted-foreground">
                  {pick(insp.disclaimer)}
                </p>
              )}
            </div>
          )}
        </div>
      )}

      <footer className={cn("border-t border-border", isPrimary ? "mt-7 pt-5" : "mt-5 pt-4")}>
        <p className="text-sm tracking-[0.18em] uppercase text-muted-foreground font-normal">{t("home.attribution")}</p>
      </footer>
    </article>
  );
}
