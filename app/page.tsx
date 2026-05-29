"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { LanguageSelector } from "@/components/language-selector";
import { DailyFragment } from "@/components/daily-fragment";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function Home() {
  const { t } = useLanguage();

  // Fragment mis en avant selon l'heure locale :
  //   06h–18h → matin en avant ; 18h–06h → soir en avant.
  // Défaut déterministe "morning" pour éviter tout mismatch d'hydratation ;
  // corrigé après le montage selon l'heure réelle du visiteur.
  const [primary, setPrimary] = useState<"morning" | "evening">("morning");
  useEffect(() => {
    const h = new Date().getHours();
    setPrimary(h >= 6 && h < 18 ? "morning" : "evening");
  }, []);
  const secondary: "morning" | "evening" = primary === "morning" ? "evening" : "morning";

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex flex-col items-center px-4 md:px-6 lg:px-8 py-8 md:py-12">
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
          <Header />

          {/* Sélecteur de langue — pilote toute l'interface */}
          <section className="w-full mt-2 mb-8 md:mb-10" aria-label="Langue">
            <LanguageSelector />
          </section>

          {/* Fragment de l'heure — mis en avant */}
          <section
            className="w-full"
            aria-label={t(primary === "morning" ? "home.morning.label" : "home.evening.label")}
          >
            <DailyFragment moment={primary} variant="primary" />
          </section>

          {/* Autre fragment — accessible en second plan */}
          <section className="w-full mt-10 md:mt-12 max-w-2xl mx-auto" aria-label={t("home.also")}>
            <p className="text-sm tracking-[0.18em] uppercase text-muted-foreground font-normal text-center mb-4">
              {t("home.also")}
            </p>
            <DailyFragment moment={secondary} variant="secondary" />
          </section>

          {/* Portes d'entrée */}
          <nav className="w-full mt-10 md:mt-14 flex flex-wrap justify-center gap-4">
            <Link
              href="/livre"
              className="px-6 py-3 rounded-lg border border-primary/40 bg-card text-foreground text-base font-medium tracking-wide hover:bg-secondary hover:border-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {t("cta.book")}
            </Link>
            <Link
              href="/manifeste"
              className="px-6 py-3 rounded-lg border border-border bg-card text-foreground text-base font-medium tracking-wide hover:bg-secondary hover:border-primary/40 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {t("cta.manifesto")}
            </Link>

            {/* Recevoir une sagesse — placeholder désactivé (structure préparée, non branchée) */}
            <span className="inline-flex flex-col items-center gap-1">
              <button
                type="button"
                disabled
                aria-disabled="true"
                className="px-6 py-3 rounded-lg border border-border/60 text-base text-muted-foreground font-medium tracking-wide cursor-not-allowed select-none"
              >
                {t("cta.receive")}
              </button>
              <span className="text-xs tracking-[0.15em] uppercase text-muted-foreground">
                {t("cta.receive.soon")}
              </span>
            </span>
          </nav>
        </div>
      </main>
      <Footer />
    </div>
  );
}
