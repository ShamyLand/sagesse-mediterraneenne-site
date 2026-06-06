import { NextResponse } from "next/server";

/**
 * Inscription newsletter GRATUITE — intégration Brevo en MODE TEST.
 *
 * Sécurité / garde-fous :
 * - La clé API et les IDs de liste sont lus UNIQUEMENT côté serveur (jamais exposés au client).
 * - FALLBACK : si les variables d'environnement ne sont pas configurées, AUCUN appel externe
 *   n'est fait et la route répond { ok:true, mode:"preview" } — le formulaire reste un mock honnête.
 * - Par défaut NEWSLETTER_MODE="test" → cible NEWSLETTER_TEST_LIST_ID (jamais la liste publique).
 * - Aucun paiement, aucune base Supabase, aucune campagne publique.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Body = { email?: string; prenom?: string; consent?: boolean };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const WELCOME_SUBJECT = "Bienvenue — quelques mots avant les fragments";
const WELCOME_TEXT = `Bonjour,

Merci d'avoir ouvert cette porte.

Les Lois Invisibles, ce sont des fragments de sagesse — des textes très brefs, transposés pour notre époque. Ni sermon, ni développement personnel : des phrases lentes pour retrouver un peu de recul.

Ce qui vous attend : deux fragments par semaine, pas plus ; parfois une note d'intention ; les nouvelles du livre. C'est gratuit, et cela le restera. Vous pouvez vous désinscrire à tout moment.

À très vite, pour le premier fragment.

— Les Lois Invisibles`;
const WELCOME_HTML = `<div style="max-width:560px;margin:0 auto;font-family:Georgia,serif;color:#1a1a1a;line-height:1.6">
<p>Bonjour,</p>
<p>Merci d'avoir ouvert cette porte.</p>
<p><strong>Les Lois Invisibles</strong>, ce sont des fragments de sagesse — des textes très brefs, transposés pour notre époque. Ni sermon, ni développement personnel&nbsp;: des phrases lentes pour retrouver un peu de recul.</p>
<p>Ce qui vous attend&nbsp;: deux fragments par semaine, pas plus&nbsp;; parfois une note d'intention&nbsp;; les nouvelles du livre. C'est gratuit, et cela le restera. Vous pouvez vous désinscrire à tout moment.</p>
<p>À très vite, pour le premier fragment.</p>
<p style="color:#8a6d3b">— Les Lois Invisibles</p>
</div>`;

export async function POST(req: Request) {
  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  const email = (body.email || "").trim().toLowerCase();
  const prenom = (body.prenom || "").trim().slice(0, 80);
  const consent = body.consent === true;

  if (!EMAIL_RE.test(email)) return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  if (!consent) return NextResponse.json({ ok: false, error: "consent_required" }, { status: 400 });

  const apiKey = process.env.BREVO_API_KEY;
  const mode = (process.env.NEWSLETTER_MODE || "test").toLowerCase();
  const listId = mode === "live" ? process.env.NEWSLETTER_LIST_ID : (process.env.NEWSLETTER_TEST_LIST_ID || process.env.NEWSLETTER_LIST_ID);

  // FALLBACK : pas de clés -> aucune inscription réelle, aucune donnée transmise.
  if (!apiKey || !listId) {
    return NextResponse.json({ ok: true, mode: "preview" });
  }

  try {
    const res = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: { "api-key": apiKey, "content-type": "application/json", accept: "application/json" },
      body: JSON.stringify({
        email,
        attributes: prenom ? { PRENOM: prenom } : undefined,
        listIds: [Number(listId)],
        updateEnabled: true,
      }),
    });

    // 201 créé · 204 mis à jour · 400 = souvent "contact déjà dans la liste" → on considère OK.
    if (!res.ok && res.status !== 204 && res.status !== 400) {
      return NextResponse.json({ ok: false, error: "provider_error" }, { status: 502 });
    }

    // Email de bienvenue (optionnel) — seulement si un expéditeur vérifié est configuré.
    const senderEmail = process.env.BREVO_SENDER_EMAIL;
    const senderName = process.env.BREVO_SENDER_NAME || "Les Lois Invisibles";
    if (senderEmail) {
      await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: { "api-key": apiKey, "content-type": "application/json", accept: "application/json" },
        body: JSON.stringify({
          sender: { name: senderName, email: senderEmail },
          to: [{ email, name: prenom || undefined }],
          subject: WELCOME_SUBJECT,
          textContent: WELCOME_TEXT,
          htmlContent: WELCOME_HTML,
        }),
      }).catch(() => { /* l'échec du mail de bienvenue ne doit pas faire échouer l'inscription */ });
    }

    return NextResponse.json({ ok: true, mode: mode === "live" ? "live" : "test" });
  } catch {
    return NextResponse.json({ ok: false, error: "network" }, { status: 502 });
  }
}
