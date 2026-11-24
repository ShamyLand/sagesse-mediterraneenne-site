import type { MetadataRoute } from "next";

/** Moteurs de recherche : tout le site public, jamais l'administration ni l'API. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/admin", "/api", "/apercu"] }],
    sitemap: "https://jhgram.vercel.app/sitemap.xml",
  };
}
