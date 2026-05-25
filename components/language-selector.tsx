"use client";

import { Language, languageLabels } from "@/types/quote";
import { cn } from "@/lib/utils";

interface LanguageSelectorProps {
  selectedLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

export function LanguageSelector({
  selectedLanguage,
  onLanguageChange,
}: LanguageSelectorProps) {
  const languages: Language[] = ["fr", "en", "es"];

  return (
    <div className="flex flex-wrap justify-center gap-2 md:gap-3">
      {languages.map((lang) => (
        <button
          key={lang}
          onClick={() => onLanguageChange(lang)}
          className={cn(
            "px-4 md:px-6 py-2 md:py-2.5 rounded-full text-sm md:text-base font-medium transition-all duration-300 ease-out",
            "border focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            selectedLanguage === lang
              ? "bg-primary text-primary-foreground border-primary shadow-md"
              : "bg-card text-foreground border-border hover:bg-secondary hover:border-primary/30"
          )}
          aria-pressed={selectedLanguage === lang}
        >
          {languageLabels[lang]}
        </button>
      ))}
    </div>
  );
}
