"use client";

import { Language, languageLabels } from "@/types/quote";
import { useLanguageOptional } from "@/lib/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

interface LanguageSelectorProps {
  /** Optionnels : si absents, le sélecteur pilote le contexte i18n global. */
  selectedLanguage?: Language;
  onLanguageChange?: (language: Language) => void;
}

export function LanguageSelector({
  selectedLanguage,
  onLanguageChange,
}: LanguageSelectorProps = {}) {
  const ctx = useLanguageOptional();
  const selected: Language = selectedLanguage ?? ctx?.lang ?? "fr";
  const onChange = onLanguageChange ?? ctx?.setLang ?? (() => {});

  const languages: Language[] = ["fr", "en", "es"];

  return (
    <div
      className="flex flex-wrap justify-center gap-2 md:gap-3"
      role="group"
      aria-label="Langue / Language / Idioma"
    >
      {languages.map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => onChange(lang)}
          className={cn(
            "px-4 md:px-6 py-2 md:py-2.5 rounded-full text-sm md:text-base font-medium transition-all duration-300 ease-out",
            "border focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            selected === lang
              ? "bg-primary text-primary-foreground border-primary shadow-md"
              : "bg-card text-foreground border-border hover:bg-secondary hover:border-primary/40"
          )}
          aria-pressed={selected === lang}
          lang={lang}
        >
          {languageLabels[lang]}
        </button>
      ))}
    </div>
  );
}
