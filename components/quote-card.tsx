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
      <div className="bg-card rounded-2xl shadow-lg border border-border p-6 md:p-10 lg:p-12 transition-all duration-500 ease-out">
        {/* Libellé éditorial — l'extrait appartient à l'œuvre */}
        <p className="text-sm tracking-[0.18em] uppercase text-muted-foreground font-normal mb-5 md:mb-7 text-center">
          Un fragment de l&rsquo;œuvre
        </p>

        {/* Titre du fragment — masqué si null */}
        {title && (
          <h2 className="text-sm md:text-base tracking-[0.15em] text-accent font-medium mb-4 md:mb-6 uppercase">
            {title}
          </h2>
        )}

        {/* Texte du fragment */}
        <blockquote className="text-xl md:text-2xl lg:text-3xl text-foreground leading-relaxed font-normal text-balance">
          {text}
        </blockquote>

        {/* Attribution éditoriale */}
        <footer className="mt-6 md:mt-8 pt-5 md:pt-6 border-t border-border text-center">
          <p className="text-sm tracking-[0.18em] uppercase text-muted-foreground font-normal">
            Les Lois Invisibles
          </p>
        </footer>
      </div>
    </article>
  );
}
