import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import orderRaw from "@/lib/newsletter-order.json";

/**
 * Envoi automatique de la newsletter « Les Lois Invisibles » — un fragment le mardi, un le vendredi.
 *
 * Déclenchement : crons Vercel (vercel.json) → GET /api/cron/newsletter avec « Authorization: Bearer CRON_SECRET ».
 *
 * Garde-fous :
 * - Sans CRON_SECRET configuré, ou sans le bon en-tête, la route refuse tout (401).
 * - Le fragment du jour est déterministe : (semaines écoulées depuis le mardi 01/12/2026) × 2 + (0 mardi | 1 vendredi),
 *   lu dans lib/newsletter-order.json (ordre figé, aucun fragment répété). Aucun état à stocker.
 * - Hors mardi/vendredi (heure de Paris), avant le 01/12/2026 ou une fois la liste épuisée : aucun envoi.
 * - Anti-doublon : si une campagne du même nom existe déjà chez Brevo, rien n'est recréé ni renvoyé.
 * - Campagne réelle uniquement si NEWSLETTER_MODE=live.
 * - ?test=1 : aucun appel « campagne » ; un simple e-mail transactionnel part vers l'adresse de l'auteur.
 *   (?test=1&n=12 pour prévisualiser le fragment n° 12.)
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type OrderItem = { n: number; livre: string; title: string; text: string };
const ORDER = (orderRaw as { start: string; items: OrderItem[] }).items;
const START = (orderRaw as { start: string }).start; // "2026-12-01" (un mardi)

const BOOK_URL = "https://www.amazon.fr/dp/B0HSNV9MST";
const SITE_URL = (process.env.SITE_URL || "https://jhgram.vercel.app").replace(/\/$/, "");
const BREVO = "https://api.brevo.com/v3";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function authorized(req: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  const got = Buffer.from(req.headers.get("authorization") || "");
  const want = Buffer.from(`Bearer ${secret}`);
  return got.length === want.length && timingSafeEqual(got, want);
}

/** Date du jour à Paris (AAAA-MM-JJ) puis position dans le calendrier d'envoi. */
function slotForToday(now = new Date()): { date: string; index: number | null; reason?: string } {
  const date = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Paris", year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
  const days = Math.round((Date.parse(`${date}T00:00:00Z`) - Date.parse(`${START}T00:00:00Z`)) / 86_400_000);
  if (days < 0) return { date, index: null, reason: "before_start" };
  const dow = days % 7; // 0 = mardi, 3 = vendredi
  if (dow !== 0 && dow !== 3) return { date, index: null, reason: "not_a_send_day" };
  const index = Math.floor(days / 7) * 2 + (dow === 3 ? 1 : 0);
  if (index >= ORDER.length) return { date, index: null, reason: "order_exhausted" };
  return { date, index };
}

/** E-mail du fragment — même habillage que le mail de bienvenue (fond crème, filet or, Georgia). */
function buildEmail(item: OrderItem, unsubscribeHref: string) {
  const subject = `${item.title} — Les Lois Invisibles`;
  const text = `LES LOIS INVISIBLES

${item.title}

${item.text}

Ce fragment est tiré du livre « Les Lois Invisibles », de J.H. Gram : ${BOOK_URL}

— J.H. Gram

Vous recevez ce message parce que vous êtes inscrit(e) aux fragments des Lois Invisibles (${SITE_URL}). Deux par semaine, pas plus.`;
  const html = `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3eee3;margin:0;padding:0">
  <tr><td align="center" style="padding:32px 16px">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border:1px solid #e7ded0;border-radius:8px">
      <tr><td style="padding:34px 36px;font-family:Georgia,'Times New Roman',serif;color:#1a1a1a">
        <div style="text-align:center;font-size:13px;letter-spacing:3px;text-transform:uppercase;color:#8a6d3b">Les Lois Invisibles</div>
        <div style="height:1px;width:48px;background:#b0894f;margin:14px auto 30px;font-size:0;line-height:1px">&nbsp;</div>
        <h1 style="font-family:Georgia,'Times New Roman',serif;font-size:21px;line-height:1.35;font-weight:normal;font-style:italic;text-align:center;margin:0 0 20px;color:#1a1a1a">${esc(item.title)}</h1>
        <p style="font-size:19px;line-height:1.7;text-align:center;margin:0 0 30px">${esc(item.text)}</p>
        <div style="height:1px;width:48px;background:#b0894f;margin:0 auto 24px;font-size:0;line-height:1px">&nbsp;</div>
        <p style="font-size:15px;line-height:1.65;text-align:center;margin:0 0 6px;color:#555555">Ce fragment est tiré du livre <a href="${BOOK_URL}" style="color:#8a6d3b">Les Lois Invisibles</a>, disponible sur Amazon.</p>
        <p style="font-size:15px;line-height:1.65;text-align:center;margin:18px 0 0;color:#8a6d3b">— J.H. Gram</p>
        <div style="border-top:1px solid #e7ded0;margin-top:26px;padding-top:16px;font-size:12px;line-height:1.55;color:#9a9a9a;text-align:center">
          Vous recevez ce message parce que vous êtes inscrit(e) aux fragments des Lois Invisibles. Deux par semaine, pas plus.<br><a href="${unsubscribeHref}" style="color:#9a9a9a">Se désinscrire</a>
        </div>
      </td></tr>
    </table>
  </td></tr>
</table>`;
  return { subject, text, html };
}

async function brevo(apiKey: string, path: string, init?: { method?: string; body?: unknown }) {
  const res = await fetch(`${BREVO}${path}`, {
    method: init?.method || "GET",
    headers: { "api-key": apiKey, "content-type": "application/json", accept: "application/json" },
    body: init?.body === undefined ? undefined : JSON.stringify(init.body),
    cache: "no-store",
  });
  let json: Record<string, unknown> = {};
  try { json = (await res.json()) as Record<string, unknown>; } catch { /* corps vide (204) */ }
  return { ok: res.ok, status: res.status, json };
}

function providerError(step: string, r: { status: number; json: Record<string, unknown> }) {
  // Diagnostic sans secret, dans les journaux Vercel.
  console.error("newsletter_cron_error", step, r.status, String(r.json.code || ""), String(r.json.message || "").slice(0, 200));
  return NextResponse.json({ ok: false, error: "provider_error", step, status: r.status, message: String(r.json.message || "").slice(0, 200) }, { status: 502 });
}

export async function GET(req: Request) {
  if (!authorized(req)) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });

  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL || "jhgram.auteur@gmail.com";
  const senderName = process.env.BREVO_SENDER_NAME || "J.H. Gram";
  if (!apiKey) return NextResponse.json({ ok: false, error: "brevo_not_configured" }, { status: 500 });

  const url = new URL(req.url);
  const slot = slotForToday();

  // ── Mode test : e-mail transactionnel à l'auteur uniquement, jamais de campagne. ──
  if (url.searchParams.get("test") === "1") {
    const asked = Number(url.searchParams.get("n"));
    const idx = Number.isInteger(asked) && asked >= 1 && asked <= ORDER.length ? asked - 1 : (slot.index ?? 0);
    const item = ORDER[idx];
    const mail = buildEmail(item, `mailto:${senderEmail}?subject=Desinscription`);
    const r = await brevo(apiKey, "/smtp/email", {
      method: "POST",
      body: {
        sender: { name: senderName, email: senderEmail },
        to: [{ email: senderEmail }],
        subject: `[TEST] ${mail.subject}`,
        textContent: mail.text,
        htmlContent: mail.html,
      },
    });
    if (!r.ok) return providerError("test_email", r);
    return NextResponse.json({ ok: true, mode: "test", to: senderEmail, fragment: item.n, title: item.title, today: slot });
  }

  // ── Envoi réel ──
  if (slot.index === null) return NextResponse.json({ ok: true, sent: false, reason: slot.reason, date: slot.date });
  if ((process.env.NEWSLETTER_MODE || "test").toLowerCase() !== "live") {
    return NextResponse.json({ ok: true, sent: false, reason: "newsletter_mode_not_live", date: slot.date });
  }
  const listId = Number(process.env.NEWSLETTER_LIST_ID || 4);
  const item = ORDER[slot.index];
  const name = `Lois Invisibles — fragment ${String(item.n).padStart(3, "0")} — ${slot.date}`;
  const prefix = `Lois Invisibles — fragment ${String(item.n).padStart(3, "0")} `;

  // Anti-doublon : si le cron se déclenche deux fois, la campagne existe déjà.
  const existing = await brevo(apiKey, "/emailCampaigns?limit=50&offset=0&sort=desc&excludeHtmlContent=true");
  if (!existing.ok) return providerError("list_campaigns", existing);
  const campaigns = (existing.json.campaigns as { name?: string }[] | undefined) || [];
  if (campaigns.some((c) => (c.name || "").startsWith(prefix))) {
    return NextResponse.json({ ok: true, sent: false, reason: "already_sent", fragment: item.n, date: slot.date });
  }

  const mail = buildEmail(item, "{{ unsubscribe }}");
  const created = await brevo(apiKey, "/emailCampaigns", {
    method: "POST",
    body: {
      name,
      subject: mail.subject,
      sender: { name: senderName, email: senderEmail },
      replyTo: senderEmail,
      htmlContent: mail.html,
      recipients: { listIds: [listId] },
    },
  });
  const id = Number(created.json.id);
  if (!created.ok || !id) return providerError("create_campaign", created);

  const sent = await brevo(apiKey, `/emailCampaigns/${id}/sendNow`, { method: "POST" });
  if (!sent.ok) return providerError("send_now", sent);

  console.log("newsletter_cron_sent", slot.date, item.n, item.title, id);
  return NextResponse.json({ ok: true, sent: true, campaignId: id, fragment: item.n, title: item.title, date: slot.date });
}
