import { placeholderFragments } from "@/lib/fragments-placeholder";
import type { Language } from "@/types/quote";

/**
 * GET /api/daily — fragment du matin + du soir.
 * Lecture SEULE Supabase (server-side). Sélection déterministe par date.
 * Fallback placeholders si Supabase indisponible / vide / env absente.
 * Clé serveur uniquement (SUPABASE_SERVICE_ROLE_KEY) — JAMAIS exposée au client.
 * Durcissement futur : clé anon + RLS exposant uniquement les lignes `ready`.
 */
export const dynamic = "force-dynamic";

type Loc = { title: Record<Language, string>; text: Record<Language, string> };

function placeholderPayload(reason: string) {
  return {
    source: "placeholder" as const,
    reason,
    morning: placeholderFragments.morning,
    evening: placeholderFragments.evening,
  };
}

// Hash déterministe → même jour = même choix, lendemain = rotation
function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

type Row = {
  fr_title: string; fr_text: string;
  en_title: string | null; en_text: string | null;
  es_title: string | null; es_text: string | null;
  moment: "morning" | "evening" | "none" | null;
};

function mapRow(r: Row): Loc {
  return {
    title: { fr: r.fr_title, en: r.en_title || r.fr_title, es: r.es_title || r.fr_title },
    text:  { fr: r.fr_text,  en: r.en_text  || r.fr_text,  es: r.es_text  || r.fr_text  },
  };
}

// ⛔ Correction de sécurité éditoriale (2026-05-29) :
// L'accueil lit désormais un SET CURÉ STATIQUE (lib/curated-home-fragments.ts).
// Supabase = réserve éditoriale, PAS source de publication directe.
// Endpoint inerte tant que `final_editor_approved` n'existe pas + passe "éditeur de clarté".
// Passer DAILY_FROM_SUPABASE à true UNIQUEMENT après ce gate.
const DAILY_FROM_SUPABASE = false;

export async function GET() {
  if (!DAILY_FROM_SUPABASE) {
    return Response.json(placeholderPayload("disabled_pending_final_editor_approved"), { status: 200 });
  }

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    return Response.json(placeholderPayload("env_absente"), { status: 200 });
  }

  try {
    // Anti-mélange de langues : on n'expose QUE les fragments complets fr+en+es.
    const q =
      `${url}/rest/v1/wisdom_fragments` +
      `?select=fr_title,fr_text,en_title,en_text,es_title,es_text,moment` +
      `&publication_status=eq.ready&human_validated=eq.true&clear_enough=eq.true` +
      `&moment=in.(morning,evening)&use_case=ov.{site,email}` +
      `&fragment_type=in.(aphorism,law,short_fragment,dialogue)` + // wisdom_story exclu (doctrine clarté)
      `&en_text=not.is.null&es_text=not.is.null&en_title=not.is.null&es_title=not.is.null`;

    const res = await fetch(q, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
      cache: "no-store",
    });
    if (!res.ok) return Response.json(placeholderPayload(`supabase_${res.status}`), { status: 200 });

    const rows: Row[] = await res.json();
    const ok = (r: Row) => r.en_text && r.es_text && r.en_title && r.es_title;
    const morningPool = rows.filter((r) => r.moment === "morning" && ok(r));
    const eveningPool = rows.filter((r) => r.moment === "evening" && ok(r));

    // Date locale (Europe/Paris), stable sur la journée
    const day = new Date().toLocaleDateString("en-CA", { timeZone: "Europe/Paris" }); // YYYY-MM-DD

    // Par créneau : fragment traduit du jour, sinon placeholder (lui aussi multilingue)
    const morning = morningPool.length
      ? mapRow(morningPool[hash(day + ":m") % morningPool.length])
      : placeholderFragments.morning;
    const evening = eveningPool.length
      ? mapRow(eveningPool[hash(day + ":e") % eveningPool.length])
      : placeholderFragments.evening;

    const source =
      morningPool.length && eveningPool.length ? "supabase"
      : (morningPool.length || eveningPool.length) ? "partial"
      : "placeholder";

    return Response.json(
      { source, date: day, counts: { morning: morningPool.length, evening: eveningPool.length }, morning, evening },
      { status: 200 }
    );
  } catch (e) {
    return Response.json(placeholderPayload("exception"), { status: 200 });
  }
}
