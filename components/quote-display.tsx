"use client";

import { useState } from "react";
import useSWR from "swr";
import { Language, QuoteResponse } from "@/types/quote";
import { LanguageSelector } from "@/components/language-selector";
import { QuoteCard } from "@/components/quote-card";
import { QuoteCardSkeleton } from "@/components/quote-card-skeleton";
import { EmptyState } from "@/components/empty-state";
import { ErrorState } from "@/components/error-state";

const API_URL = "https://shamy.app.n8n.cloud/webhook/phrase-du-jour";

const fetcher = async (url: string): Promise<QuoteResponse> => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch quote");
  }
  return res.json();
};

export function QuoteDisplay() {
  const [language, setLanguage] = useState<Language>("fr");

  const { data, error, isLoading, mutate } = useSWR<QuoteResponse>(
    API_URL,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );

  const handleRetry = () => {
    mutate();
  };

  return (
    <div className="flex flex-col items-center gap-8 md:gap-10 w-full">
      {/* Language Selector */}
      <LanguageSelector
        selectedLanguage={language}
        onLanguageChange={setLanguage}
      />

      {/* Fragment Content */}
      <div className="w-full min-h-[280px] md:min-h-[320px] flex items-center justify-center">
        {isLoading && <QuoteCardSkeleton />}

        {error && (
          <ErrorState
            message="Une erreur est survenue lors du chargement du fragment."
            onRetry={handleRetry}
          />
        )}

        {data && data.status === "empty" && <EmptyState />}

        {data && data.status === "ready" && data.quote && data.quote[language] && (
          <QuoteCard
            title={data.quote[language].title}
            text={data.quote[language].text}
            language={language}
          />
        )}
      </div>
    </div>
  );
}
