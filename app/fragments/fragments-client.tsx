"use client";

import { useState } from "react";
import type { Item, Payload } from "@/lib/site-fragments";

const TYPE_LABEL: Record<string, string> = {
  direct: "Source directe",
  thematic: "Inspiration thématique",
  echo: "Écho doctrinal",
  parallel: "Parallèle philosophique",
};

// Reçoit les données en props (SSR) → présentes dans le HTML initial. Gère seulement l'interaction.
// FR-ONLY assumé : on affiche toujours le français (les traductions EN/ES ne sont pas encore faites,
// on n'expose donc PAS de fallback trompeur). Une mention « traductions à venir » le précise.
export function FragmentsView({ data }: { data: Payload }) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-2xl px-5 py-12 md:py-16">
        <header className="mb-10">
          <p className="text-xs uppercase tracking-[0.18em] text-accent font-medium">Les Lois Invisibles</p>
          <h1 className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight">Fragments</h1>
          <p className="mt-3 text-base text-muted-foreground">
            Des vérités humaines simples, adaptées au monde moderne — chacune adossée à une sagesse ancienne.
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            {data.source === "supabase" ? `${data.count} fragments` : "Affichage de secours (set curé)"}
            <span className="mx-1">·</span>
            <span className="italic">Version française — traductions anglaise et espagnole à venir.</span>
          </p>
        </header>

        <div className="space-y-6">
          {data.items.map((it: Item) => {
            const isOpen = open === it.id;
            const insp = it.inspiration;
            return (
              <article key={it.id} className="bg-card rounded-2xl border border-border shadow-sm p-6 md:p-8">
                {it.theme && (
                  <p className="mb-3 text-xs uppercase tracking-[0.14em] text-muted-foreground">{it.theme}</p>
                )}
                <blockquote className="text-xl md:text-2xl leading-relaxed font-normal text-balance text-foreground">
                  {it.text.fr}
                </blockquote>

                {insp && (
                  <>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : it.id)}
                      aria-expanded={isOpen}
                      className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-accent underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 rounded"
                    >
                      <span aria-hidden>{isOpen ? "–" : "+"}</span>
                      {isOpen ? "Masquer l'inspiration" : "Voir l'inspiration"}
                    </button>

                    {isOpen && (
                      <div className="mt-4 rounded-xl border border-border bg-background/60 p-4 md:p-5">
                        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Source d'inspiration</p>
                        <p className="mt-2 text-sm leading-relaxed">
                          <span className="font-medium">Type :</span> {TYPE_LABEL[insp.type] || insp.type}
                        </p>
                        {insp.tradition && (
                          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                            {insp.tradition}
                            {insp.author ? ` — ${insp.author}` : ""}
                            {insp.reference ? ` (${insp.reference})` : ""}
                          </p>
                        )}
                        {insp.summary && (
                          <>
                            <p className="mt-3 text-sm font-medium">Idée ancienne</p>
                            <p className="mt-1 text-sm leading-relaxed">{insp.summary}</p>
                          </>
                        )}
                        {insp.reading && (
                          <>
                            <p className="mt-3 text-sm font-medium">Lecture contemporaine</p>
                            <p className="mt-1 text-sm leading-relaxed">{insp.reading}</p>
                          </>
                        )}
                        {insp.disclaimer && (
                          <p className="mt-4 border-t border-border pt-3 text-xs italic leading-relaxed text-muted-foreground">
                            {insp.disclaimer}
                          </p>
                        )}
                      </div>
                    )}
                  </>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
}
