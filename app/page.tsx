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

  // Mise en avant matin/soir selon l'heure locale (client uniquement, purement visuelle).
  // Défaut neutre côté serveur pour éviter tout mismatch d'hydratation.
  const [moment, setMoment] = useState<"morning" | "evening" | null>(null);
  useEffect(() => {
    const h = new Date().getHours();
    setMoment(h >= 5 && h < 17 ? "morning" : "evening");
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex flex-col items-center px-4 md:px-6 lg:px-8 py-8 md:py-12">
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
          <Header />

          {/* Sélecteur de langue — pilote toute l'interface */}
          <section className="w-full mt-2 mb-8 md:mb-10" aria-label="Langue">
            <LanguageSelector />
          </section>

          {/* Fragments du matin et du soir */}
          <section
            className="w-full flex flex-col md:flex-row gap-6 md:gap-8"
            aria-label={`${t("home.morning.label")} / ${t("home.evening.label")}`}
          >
            <DailyFragment moment="morning" emphasized={moment === "morning"} />
            <DailyFragment moment="evening" emphasized={moment === "evening"} />
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
