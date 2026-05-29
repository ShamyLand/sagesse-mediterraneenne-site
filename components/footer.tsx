import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full py-6 md:py-8 text-center space-y-3">
      <nav className="flex justify-center gap-6">
        <Link
          href="/"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors font-normal tracking-wide"
        >
          Fragment du jour
        </Link>
        <span className="text-muted-foreground" aria-hidden="true">·</span>
        <Link
          href="/livre"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors font-normal tracking-wide"
        >
          Le Livre
        </Link>
      </nav>
      <p className="text-sm text-muted-foreground font-normal tracking-wide">
        <span className="text-foreground">Les Lois Invisibles</span> — un projet de Sagesse Méditerranéenne
      </p>
    </footer>
  );
}
