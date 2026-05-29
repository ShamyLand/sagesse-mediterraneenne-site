import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageProvider } from "@/lib/i18n/LanguageProvider";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans-ui",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://project-7coik.vercel.app"),
  // Nom public = "Les Lois Invisibles" (l'œuvre). "Sagesse Méditerranéenne" = écosystème.
  title: {
    default: "Les Lois Invisibles — Sagesse Méditerranéenne",
    template: "%s · Les Lois Invisibles",
  },
  applicationName: "Les Lois Invisibles",
  description:
    "Les Lois Invisibles — une sagesse ancienne relue pour les failles du monde moderne. Un projet de Sagesse Méditerranéenne.",
  keywords: ["Les Lois Invisibles", "Sagesse Méditerranéenne", "sagesse", "méditerranée", "fragments", "aphorismes", "wisdom", "philosophy"],
  authors: [{ name: "Les Lois Invisibles" }],
  openGraph: {
    title: "Les Lois Invisibles",
    siteName: "Les Lois Invisibles",
    description:
      "Une sagesse ancienne relue pour les failles du monde moderne. Un projet de Sagesse Méditerranéenne.",
    type: "website",
    url: "/",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary",
    title: "Les Lois Invisibles",
    description:
      "Une sagesse ancienne relue pour les failles du monde moderne. Un projet de Sagesse Méditerranéenne.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f4ef" },
    { media: "(prefers-color-scheme: dark)", color: "#1c1a14" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="bg-background" suppressHydrationWarning>
      <head>
        {/* Anti-flash : applique .dark avant le premier rendu si nécessaire */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;if(t==='dark'||(t===null&&d)){document.documentElement.classList.add('dark')}}catch(e){}})();",
          }}
        />
      </head>
      <body className={`${cormorant.variable} ${inter.variable} font-serif antialiased`}>
        <LanguageProvider>
          <ThemeToggle />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
