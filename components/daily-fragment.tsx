"use client";

import useSWR from "swr";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { placeholderFragments, type Moment, type LocalizedFragment } from "@/lib/fragments-placeholder";
import type { I18nKey } from "@/lib/i18n/dictionary";
import { cn } from "@/lib/utils";

interface DailyFragmentProps {
  moment: Moment;
  /** "primary" = mis en avant selon l'heure ; "secondary" = second plan accessible. */
  variant?: "primary" | "secondary";
}

const LABEL_KEY: Record<Moment, I18nKey> = {
  morning: "home.morning.label",
  evening: "home.evening.label",
};
const INTENT_KEY: Record<Moment, I18nKey> = {
  morning: "home.morning.intent",
  evening: "home.evening.intent",
};

const fetcher = (u: string) => fetch(u).then((r) => r.json());

export function DailyFragment({ moment, variant = "primary" }: DailyFragmentProps) {
  const { lang, t } = useLanguage();
  const isPrimary = variant === "primary";

  // /api/daily fournit { morning, evening } ; placeholders en secours immédiat.
  const { data } = useSWR("/api/daily", fetcher, {
    fallbackData: { morning: placeholderFragments.morning, evening: placeholderFragments.evening },
    revalidateOnFocus: false,
  });
  const fragment: LocalizedFragment =
    (data && data[moment]) || placeholderFragments[moment];

  return (
    <article
      className={cn(
        "bg-card rounded-2xl border transition-all duration-500 ease-out",
        isPrimary
          ? "border-primary/50 shadow-lg p-7 md:p-10 lg:p-12"
          : "border-border shadow-sm p-5 md:p-7"
      )}
      aria-label={t(LABEL_KEY[moment])}
    >
      <header className={cn("mb-5", isPrimary ? "md:mb-7" : "md:mb-5")}>
        <p
          className={cn(
            "tracking-[0.18em] uppercase text-accent font-medium",
            isPrimary ? "text-sm md:text-base" : "text-sm"
          )}
        >
          {t(LABEL_KEY[moment])}
        </p>
        <p className="mt-2 text-base text-muted-foreground font-normal">
          {t(INTENT_KEY[moment])}
        </p>
      </header>

      <h3
        className={cn(
          "tracking-[0.12em] uppercase text-foreground/70 font-medium mb-3",
          isPrimary ? "text-sm md:text-base" : "text-sm"
        )}
      >
        {fragment.title[lang]}
      </h3>

      <blockquote
        className={cn(
          "text-foreground leading-relaxed font-normal text-balance",
          isPrimary ? "text-2xl md:text-3xl" : "text-lg md:text-xl"
        )}
      >
        {fragment.text[lang]}
      </blockquote>

      <footer className={cn("border-t border-border", isPrimary ? "mt-7 pt-5" : "mt-5 pt-4")}>
        <p className="text-sm tracking-[0.18em] uppercase text-muted-foreground font-normal">
          {t("home.attribution")}
        </p>
      </footer>
    </article>
  );
}
