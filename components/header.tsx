export function Header() {
  return (
    <header className="w-full py-8 md:py-12 text-center">
      {/* Écosystème — signature au-dessus du titre */}
      <p className="text-sm tracking-[0.2em] uppercase text-muted-foreground font-normal mb-4">
        Sagesse Méditerranéenne
      </p>

      {/* Œuvre — titre principal */}
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground tracking-tight text-balance">
        Les Lois Invisibles
      </h1>

      {/* Intention éditoriale */}
      <p className="mt-5 md:mt-6 text-lg md:text-xl text-foreground/90 font-normal leading-relaxed max-w-xl mx-auto text-pretty">
        Une sagesse ancienne relue pour les failles du monde moderne.
      </p>
      <p className="mt-3 text-base text-muted-foreground font-normal leading-relaxed max-w-lg mx-auto text-pretty">
        Des fragments pour comprendre ce que les anciens textes savaient déjà de l&rsquo;homme.
      </p>
    </header>
  );
}
