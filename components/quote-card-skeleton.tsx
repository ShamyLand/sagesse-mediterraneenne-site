export function QuoteCardSkeleton() {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-card rounded-2xl shadow-lg border border-border/50 p-6 md:p-10 lg:p-12 animate-pulse">
        {/* Decorative quote mark placeholder */}
        <div className="h-14 md:h-16 w-12 bg-secondary rounded mb-2 md:mb-4" />

        {/* Title skeleton */}
        <div className="h-5 md:h-6 w-32 bg-secondary rounded mb-4 md:mb-6" />

        {/* Quote text skeleton - multiple lines */}
        <div className="space-y-3">
          <div className="h-6 md:h-8 w-full bg-secondary rounded" />
          <div className="h-6 md:h-8 w-11/12 bg-secondary rounded" />
          <div className="h-6 md:h-8 w-4/5 bg-secondary rounded" />
        </div>

        {/* Closing quote placeholder */}
        <div className="flex justify-end mt-2 md:mt-4">
          <div className="h-14 md:h-16 w-12 bg-secondary rounded" />
        </div>
      </div>
    </div>
  );
}
