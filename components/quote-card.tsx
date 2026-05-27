import { Language } from "@/types/quote";

interface QuoteCardProps {
  title: string | null;
  text: string;
  language: Language;
}

export function QuoteCard({ title, text, language }: QuoteCardProps) {
  const langAttribute = {
    fr: "fr",
    en: "en",
    es: "es",
  };

  return (
    <article
      className="w-full max-w-3xl mx-auto"
      lang={langAttribute[language]}
    >
      <div className="bg-card rounded-2xl shadow-lg border border-border/50 p-6 md:p-10 lg:p-12 transition-all duration-500 ease-out">
        {/* Decorative quote mark */}
        <div className="text-primary/20 text-6xl md:text-7xl leading-none font-serif mb-2 md:mb-4 select-none" aria-hidden="true">
          &ldquo;
        </div>

        {/* Quote title — hidden if null */}
        {title && (
          <h2 className="text-lg md:text-xl text-accent font-medium mb-4 md:mb-6 tracking-wide uppercase">
            {title}
          </h2>
        )}

        {/* Quote text */}
        <blockquote className="text-xl md:text-2xl lg:text-3xl text-foreground leading-relaxed font-light text-balance">
          {text}
        </blockquote>

        {/* Decorative closing quote mark */}
        <div className="text-primary/20 text-6xl md:text-7xl leading-none font-serif text-right mt-2 md:mt-4 select-none" aria-hidden="true">
          &rdquo;
        </div>
      </div>
    </article>
  );
}
