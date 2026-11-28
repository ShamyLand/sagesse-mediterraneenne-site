import type { MetadataRoute } from "next";

const BASE = "https://jhgram.vercel.app";

/** Plan du site pour les moteurs de recherche (pages publiques uniquement). */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${BASE}/livre`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/recevoir`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/intention`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/manifeste`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/confidentialite`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE}/presse`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
  ];
}
