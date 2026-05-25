interface EmptyStateProps {
  message?: string;
}

export function EmptyState({ message = "Aucune phrase disponible pour le moment." }: EmptyStateProps) {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-card rounded-2xl shadow-lg border border-border/50 p-6 md:p-10 lg:p-12 text-center">
        {/* Decorative icon */}
        <div className="text-muted-foreground/40 mb-4 md:mb-6">
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
            <path d="M12 19V5" />
            <path d="m5 12 7-7 7 7" />
          </svg>
        </div>

        <p className="text-lg md:text-xl text-muted-foreground font-light italic">
          {message}
        </p>
      </div>
    </div>
  );
}
