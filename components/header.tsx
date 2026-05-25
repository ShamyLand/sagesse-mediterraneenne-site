export function Header() {
  return (
    <header className="w-full py-8 md:py-12 text-center">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground tracking-tight text-balance">
        Sagesse Méditerranéenne
      </h1>
      <p className="mt-3 md:mt-4 text-lg md:text-xl text-muted-foreground font-light italic text-pretty">
        Une phrase par jour pour penser plus lentement.
      </p>
    </header>
  );
}
