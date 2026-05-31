"use client";

import { useState } from "react";
import type { Item, Payload } from "@/lib/site-fragments";

const TYPE_LABEL: Record<string, string> = {
  direct: "Source directe",
  thematic: "Inspiration thématique",
  echo: "Écho doctrinal",
  parallel: "Parallèle philosophique",
};

// Registre privé : liste COMPLÈTE des fragments + sources (preuve interne). FR.
export function RegistryClient({ data }: { data: Payload }) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-gray-100 text-gray-900">
      <div className="mx-auto max-w-3xl px-5 py-8 md:px-8">
        <header className="mb-8 border-b border-gray-300 pb-5">
          <p className="text-xs uppercase tracking-widest text-gray-500">Privé · noindex · preuve éditoriale</p>
          <h1 className="mt-1 text-2xl font-bold text-gray-900">Registre des sources</h1>
          <p className="mt-2 text-sm text-gray-600">
            {data.source === "supabase" ? `${data.count} fragments validés + sources` : "Affichage de secours (set curé)"}
          </p>
        </header>

        <div className="space-y-4">
          {data.items.map((it: Item, i) => {
            const isOpen = open === it.id;
            const insp = it.inspiration;
            return (
              <article key={it.id} className="rounded-lg border border-gray-300 bg-white p-5 shadow-sm">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-bold text-gray-400">#{i + 1}</span>
                  {it.theme && <span className="rounded bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-700">{it.theme}</span>}
                </div>
                <blockquote className="mt-2 text-lg leading-relaxed text-gray-900">{it.text.fr}</blockquote>

                {insp && (
                  <>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : it.id)}
                      className="mt-3 text-sm font-medium text-sky-700 underline-offset-4 hover:underline"
                    >
                      {isOpen ? "Masquer la source" : "Voir la source"}
                    </button>
                    {isOpen && (
                      <div className="mt-3 rounded-md border border-gray-200 bg-gray-50 p-4 text-sm">
                        <p><span className="font-semibold">Type :</span> {TYPE_LABEL[insp.type] || insp.type} · <span className="text-gray-600">{insp.confidence}</span></p>
                        {insp.tradition && <p className="mt-1 text-gray-700">{insp.tradition}{insp.author ? ` — ${insp.author}` : ""}{insp.reference ? ` (${insp.reference})` : ""}</p>}
                        {insp.summary && <p className="mt-2"><span className="font-semibold">Idée ancienne :</span> {insp.summary}</p>}
                        {insp.reading && <p className="mt-1"><span className="font-semibold">Lecture contemporaine :</span> {insp.reading}</p>}
                        {insp.disclaimer && <p className="mt-2 border-t border-gray-200 pt-2 text-xs italic text-gray-500">{insp.disclaimer}</p>}
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
