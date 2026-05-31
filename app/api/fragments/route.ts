import { NextResponse } from "next/server";
import { getSiteFragments } from "@/lib/site-fragments";

/**
 * GET /api/fragments — corpus site (lecture SEULE Supabase, server-side).
 * Logique dans lib/site-fragments.ts (partagée avec la page SSR /fragments).
 */
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getSiteFragments(), { status: 200 });
}
