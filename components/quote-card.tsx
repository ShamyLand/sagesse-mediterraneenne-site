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
      <div className="bg-card rounded-2xl shadow-lg border border-border/60 p-6 md:p-10 lg:p-12 transition-all duration-500 ease-out">
        {/* Guillemet ouvrant */}
        <div
          className="text-primary/30 text-6xl md:text-7xl leading-none font-serif mb-2 md:mb-4 select-none"
          aria-hidden="true"
        >
          &ldquo;
        </div>

        {/* Titre du fragment — masqué si null */}
        {title && (
          <h2 className="text-xs md:text-sm tracking-[0.15em] text-accent font-medium mb-4 md:mb-6 uppercase">
            {title}
          </h2>
        )}

        {/* Texte du fragment */}
        <blockquote className="text-xl md:text-2xl lg:text-3xl text-foreground leading-relaxed font-light text-balance">
          {text}
        </blockquote>

        {/* Guillemet fermant */}
        <div
          className="text-primary/30 text-6xl md:text-7xl leading-none font-serif text-right mt-2 md:mt-4 select-none"
          aria-hidden="true"
        >
          &rdquo;
        </div>

        {/* Attribution éditoriale */}
        <footer className="mt-4 md:mt-6 text-center" aria-hidden="true">
          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground/60 font-light">
            Les Lois Invisibles
          </p>
        </footer>
      </div>
    </article>
  );
}
