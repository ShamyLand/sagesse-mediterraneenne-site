export interface Quote {
  fr: {
    title: string;
    text: string;
  };
  en: {
    title: string;
    text: string;
  };
  es: {
    title: string;
    text: string;
  };
}

export interface QuoteResponse {
  id: string;
  selected_item_id: string;
  status: "ready" | "empty";
  quote_date: string | null;
  quote: Quote;
}

export type Language = "fr" | "en" | "es";

export const languageLabels: Record<Language, string> = {
  fr: "Français",
  en: "English",
  es: "Español",
};
