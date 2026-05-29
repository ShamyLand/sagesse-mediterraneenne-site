"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { placeholderFragments, type Moment } from "@/lib/fragments-placeholder";
import type { I18nKey } from "@/lib/i18n/dictionary";
import { cn } from "@/lib/utils";

interface DailyFragmentProps {
  moment: Moment;
  /** Mis en avant selon l'heure (calcul client, purement visuel). */
  emphasized?: boolean;
}

const LABEL_KEY: Record<Moment, I18nKey> = {
  morning: "home.morning.label",
  evening: "home.evening.label",
};
const INTENT_KEY: Record<Moment, I18nKey> = {
  morning: "home.morning.intent",
  evening: "home.evening.intent",
};

export function DailyFragment({ moment, emphasized = false }: DailyFragmentProps) {
  const { lang, t } = useLanguage();
  const fragment = placeholderFragments[moment];

  return (
    <article
      className={cn(
        "flex-1 bg-card rounded-2xl border p-6 md:p-8 lg:p-10 transition-all duration-500 ease-out",
        emphasized
          ? "border-primary/50 shadow-lg"
          : "border-border shadow-sm opacity-95"
      )}
      aria-label={t(LABEL_KEY[moment])}
    >
      {/* Moment + intention */}
      <header className="mb-5 md:mb-6">
        <p className="text-sm tracking-[0.18em] uppercase text-accent font-medium">
          {t(LABEL_KEY[moment])}
        </p>
        <p className="mt-2 text-base text-muted-foreground font-normal">
          {t(INTENT_KEY[moment])}
        </p>
      </header>

      {/* Titre du fragment */}
      <h3 className="text-sm md:text-base tracking-[0.12em] uppercase text-foreground/70 font-medium mb-3">
        {fragment.title[lang]}
      </h3>

      {/* Texte du fragment */}
      <blockquote className="text-xl md:text-2xl text-foreground leading-relaxed font-normal text-balance">
        {fragment.text[lang]}
      </blockquote>

      {/* Attribution */}
      <footer className="mt-6 pt-5 border-t border-border">
        <p className="text-sm tracking-[0.18em] uppercase text-muted-foreground font-normal">
          {t("home.attribution")}
        </p>
      </footer>
    </article>
  );
}
