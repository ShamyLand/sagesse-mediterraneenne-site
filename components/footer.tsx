import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full py-6 md:py-8 text-center space-y-3">
      <nav className="flex justify-center gap-6">
        <Link
          href="/"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors font-light tracking-wide"
        >
          Phrase du jour
        </Link>
        <span className="text-muted-foreground/30" aria-hidden="true">·</span>
        <Link
          href="/livre"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors font-light tracking-wide"
        >
          Le Livre
        </Link>
      </nav>
      <p className="text-sm text-muted-foreground font-light tracking-wide">
        Sagesse Méditerranéenne — projet éditorial automatisé
      </p>
    </footer>
  );
}
