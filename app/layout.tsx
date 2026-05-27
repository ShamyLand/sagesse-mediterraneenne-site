import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

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
  title: "Sagesse Méditerranéenne",
  description: "Une phrase par jour pour penser plus lentement. Découvrez la sagesse méditerranéenne à travers des citations inspirantes en français, anglais et espagnol.",
  keywords: ["sagesse", "méditerranée", "citations", "wisdom", "quotes", "philosophy"],
  authors: [{ name: "Sagesse Méditerranéenne" }],
  openGraph: {
    title: "Sagesse Méditerranéenne",
    description: "Une phrase par jour pour penser plus lentement.",
    type: "website",
    url: "/",
  },
  twitter: {
    card: "summary",
    title: "Sagesse Méditerranéenne",
    description: "Une phrase par jour pour penser plus lentement.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f7f4ef",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="bg-background">
      <body className={`${cormorant.variable} ${inter.variable} font-serif antialiased`}>
        {children}
      </body>
    </html>
  );
}
