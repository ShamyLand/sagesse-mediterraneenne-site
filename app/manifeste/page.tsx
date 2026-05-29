"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function ManifestePage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1 flex flex-col items-center px-4 md:px-6 lg:px-8 py-12 md:py-20">
        <div className="w-full max-w-2xl mx-auto">
          {/* Retour */}
          <div className="mb-12 md:mb-16">
            <Link
              href="/"
              className="text-base text-muted-foreground hover:text-foreground transition-colors tracking-wide"
            >
              {t("nav.back.home")}
            </Link>
          </div>

          {/* En-tête */}
          <div className="mb-10 md:mb-14 text-center">
            <p className="text-sm tracking-[0.2em] uppercase text-muted-foreground font-normal mb-4">
              {t("work.title")}
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground tracking-tight">
              {t("manifesto.heading")}
            </h1>
          </div>

          <hr className="border-border mb-10 md:mb-14" />

          {/* Corps */}
          <div className="space-y-7 md:space-y-8">
            <p className="text-xl md:text-2xl text-foreground font-normal leading-relaxed text-pretty">
              {t("manifesto.intro")}
            </p>
            <p className="text-lg md:text-xl text-muted-foreground font-normal leading-relaxed text-pretty">
              {t("manifesto.socle")}
            </p>
          </div>

          {/* Signature écosystème */}
          <div className="mt-14 md:mt-20 pt-8 border-t border-border text-center">
            <p className="text-base text-muted-foreground font-normal tracking-wide">
              <span className="text-foreground">{t("work.title")}</span> — {t("signature.prefix")} {t("eco.name")}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/livre"
                className="px-6 py-3 rounded-lg border border-primary/40 bg-card text-foreground text-base font-medium tracking-wide hover:bg-secondary hover:border-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {t("cta.book")}
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
