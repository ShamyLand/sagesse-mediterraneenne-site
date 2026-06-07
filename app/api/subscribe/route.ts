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

const SITE_URL = (process.env.SITE_URL || "https://project-7coik.vercel.app").replace(/\/$/, "");

/** E-mail de bienvenue (J0) — sobre et premium, cohérent avec le site (en-tête, filet or, fond crème). */
function buildWelcome(senderEmail: string, prenom: string) {
  const name = prenom ? prenom.charAt(0).toUpperCase() + prenom.slice(1) : "";
  const escHtml = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const helloText = name ? `Bonjour ${name},` : "Bonjour,";
  const helloHtml = name ? `Bonjour ${escHtml(name)},` : "Bonjour,";
  const subject = "Bienvenue dans Les Lois Invisibles";
  const text = `LES LOIS INVISIBLES

${helloText}

Merci d'avoir choisi de recevoir ces fragments.

Des textes brefs, hérités de traditions de sagesse et écrits pour aujourd'hui. Deux par semaine, pas plus. À recevoir sans bruit.

Découvrir l'intention du projet : ${SITE_URL}/intention

— Les Lois Invisibles

Vous recevez ce message à la suite de votre inscription sur Les Lois Invisibles. Vous pouvez vous désinscrire à tout moment (répondez à cet e-mail).`;
  const html = `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3eee3;margin:0;padding:0">
  <tr><td align="center" style="padding:32px 16px">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border:1px solid #e7ded0;border-radius:8px">
      <tr><td style="padding:34px 36px;font-family:Georgia,'Times New Roman',serif;color:#1a1a1a">
        <div style="text-align:center;font-size:13px;letter-spacing:3px;text-transform:uppercase;color:#8a6d3b">Les Lois Invisibles</div>
        <div style="height:1px;width:48px;background:#b0894f;margin:14px auto 26px;font-size:0;line-height:1px">&nbsp;</div>
        <p style="font-size:17px;line-height:1.65;margin:0 0 16px">${helloHtml}</p>
        <p style="font-size:17px;line-height:1.65;margin:0 0 16px">Merci d'avoir choisi de recevoir ces fragments.</p>
        <p style="font-size:17px;line-height:1.65;margin:0 0 22px">Des textes brefs, hérités de traditions de sagesse et écrits pour aujourd'hui. Deux par semaine, pas plus. À recevoir sans bruit.</p>
        <div style="text-align:center;margin:26px 0">
          <a href="${SITE_URL}/intention" style="display:inline-block;background:#1a1a1a;color:#ffffff;text-decoration:none;font-family:Georgia,'Times New Roman',serif;font-size:15px;padding:12px 28px;border-radius:6px">Découvrir l'intention</a>
        </div>
        <p style="font-size:17px;line-height:1.65;margin:0;color:#8a6d3b">— Les Lois Invisibles</p>
        <div style="border-top:1px solid #e7ded0;margin-top:26px;padding-top:16px;font-size:12px;line-height:1.55;color:#9a9a9a;text-align:center">
          Vous recevez ce message à la suite de votre inscription sur Les Lois Invisibles.<br>Vous pouvez vous désinscrire à tout moment — <a href="mailto:${senderEmail}?subject=Desinscription" style="color:#9a9a9a">se désinscrire</a>.
        </div>
      </td></tr>
    </table>
  </td></tr>
</table>`;
  return { subject, text, html };
}

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
      const w = buildWelcome(senderEmail, prenom);
      await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: { "api-key": apiKey, "content-type": "application/json", accept: "application/json" },
        body: JSON.stringify({
          sender: { name: senderName, email: senderEmail },
          to: [{ email, name: prenom || undefined }],
          subject: w.subject,
          textContent: w.text,
          htmlContent: w.html,
          headers: { "List-Unsubscribe": `<mailto:${senderEmail}?subject=Desinscription>` },
        }),
      }).catch(() => { /* l'échec du mail de bienvenue ne doit pas faire échouer l'inscription */ });
    }

    return NextResponse.json({ ok: true, mode: mode === "live" ? "live" : "test" });
  } catch {
    return NextResponse.json({ ok: false, error: "network" }, { status: 502 });
  }
}
