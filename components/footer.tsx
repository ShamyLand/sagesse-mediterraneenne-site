"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="w-full py-6 md:py-8 text-center space-y-3">
      <nav className="flex justify-center gap-6">
        <Link
          href="/"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors font-normal tracking-wide"
        >
          {t("nav.fragmentOfDay")}
        </Link>
        <span className="text-muted-foreground" aria-hidden="true">·</span>
        <Link
          href="/livre"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors font-normal tracking-wide"
        >
          {t("nav.book")}
        </Link>
      </nav>
      <p className="text-sm text-muted-foreground font-normal tracking-wide">
        <span className="text-foreground">{t("work.title")}</span> — {t("signature.prefix")} {t("eco.name")}
      </p>
    </footer>
  );
}
