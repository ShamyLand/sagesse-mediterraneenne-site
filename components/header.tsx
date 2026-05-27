export function Header() {
  return (
    <header className="w-full py-8 md:py-12 text-center">
      <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground/80 font-light mb-4">
        Les Lois Invisibles
      </p>
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground tracking-tight text-balance">
        Sagesse Méditerranéenne
      </h1>
      <p className="mt-4 md:mt-5 text-base md:text-lg text-muted-foreground font-light leading-relaxed max-w-lg mx-auto text-pretty">
        Chaque jour, un fragment extrait des{" "}<em>Lois Invisibles</em>{" "}—{" "}
        parole, dette, honneur, ennemis, maison, mer, exil, silence.
      </p>
    </header>
  );
}
