"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function Header() {
  const { t } = useLanguage();

  return (
    <header className="w-full py-8 md:py-12 text-center">
      {/* Écosystème — signature au-dessus du titre */}
      <p className="text-sm tracking-[0.2em] uppercase text-muted-foreground font-normal mb-4">
        {t("eco.name")}
      </p>

      {/* Œuvre — titre principal (traduit selon la langue) */}
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground tracking-tight text-balance">
        {t("work.title")}
      </h1>

      {/* Intention éditoriale — taille et contraste renforcés (lisible en mode sombre) */}
      <p className="mt-5 md:mt-6 text-xl md:text-2xl text-foreground font-normal leading-relaxed max-w-2xl mx-auto text-pretty">
        {t("site.tagline")}
      </p>
      <p className="mt-3 text-base md:text-lg text-muted-foreground font-normal leading-relaxed max-w-xl mx-auto text-pretty">
        {t("site.intro")}
      </p>

      {/* Signature écosystème */}
      <p className="mt-4 text-sm tracking-wide text-muted-foreground font-normal">
        {t("signature.prefix")} {t("eco.name")}
      </p>
    </header>
  );
}
