interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({ 
  message = "Une erreur est survenue lors du chargement.", 
  onRetry 
}: ErrorStateProps) {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-card rounded-2xl shadow-lg border border-border/50 p-6 md:p-10 lg:p-12 text-center">
        {/* Error icon */}
        <div className="text-accent/60 mb-4 md:mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mx-auto"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>

        <p className="text-lg md:text-xl text-muted-foreground font-light mb-4 md:mb-6">
          {message}
        </p>

        {onRetry && (
          <button
            onClick={onRetry}
            className="px-6 py-2.5 bg-primary text-primary-foreground rounded-full text-sm font-medium transition-all duration-300 hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Réessayer
          </button>
        )}
      </div>
    </div>
  );
}
