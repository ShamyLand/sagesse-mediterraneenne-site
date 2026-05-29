"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { Language } from "@/types/quote";
import { dict, type I18nKey } from "./dictionary";

const LANGS: Language[] = ["fr", "en", "es"];

interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: I18nKey) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Défaut FR côté serveur (évite tout mismatch d'hydratation) ;
  // la préférence stockée est appliquée après le montage.
  const [lang, setLangState] = useState<Language>("fr");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("lang") as Language | null;
      if (stored && LANGS.includes(stored)) setLangState(stored);
    } catch {
      /* localStorage indisponible — on garde le défaut */
    }
  }, []);

  useEffect(() => {
    try {
      document.documentElement.lang = lang;
    } catch {
      /* noop */
    }
  }, [lang]);

  const setLang = (next: Language) => {
    setLangState(next);
    try {
      localStorage.setItem("lang", next);
    } catch {
      /* noop */
    }
  };

  const t = (key: I18nKey): string => dict[lang][key] ?? dict.fr[key] ?? key;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

/** Lève une erreur si utilisé hors provider. */
export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage doit être utilisé dans <LanguageProvider>");
  return ctx;
}

/** Variante non bloquante : retourne null hors provider (rétro-compatibilité). */
export function useLanguageOptional(): LanguageContextValue | null {
  return useContext(LanguageContext);
}
