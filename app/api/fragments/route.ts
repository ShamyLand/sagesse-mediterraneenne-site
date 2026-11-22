import { NextResponse } from "next/server";
import { getSiteFragments } from "@/lib/site-fragments";

/**
 * GET /api/fragments — corpus site (fragments validés + sourcés, lus dans le dépôt).
 * Logique dans lib/site-fragments.ts (partagée avec l'accueil SSR et le registre admin).
 */
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getSiteFragments(), { status: 200 });
}
