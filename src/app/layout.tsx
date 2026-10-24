import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import "./sps.css";
import { SiteFrame } from "@/components/site-frame";
import { publicOrigin, shareMetadata } from "@/lib/share";

// Archivo: an industrial grotesque with a width axis. Wide cuts for headlines,
// normal width for reading. Downloaded at build time and self-hosted by Next.js.
const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: publicOrigin ? new URL(publicOrigin) : undefined,
  title: "SPS-CARBON | Comptabilité carbone pour les entreprises au Maroc",
  description:
    "Mesurez, pilotez et réduisez vos émissions. SPS-CARBON réunit vos données d’énergie, de carburant, d’achats et de transport et calcule vos Scopes 1, 2 et 3 avec une méthode traçable, accompagné par un cabinet QHSE et RSE marocain.",
  // Icons come from favicon.ico (browser tabs) and apple-icon.png (home screens)
  // in this folder: light symbol on petrol, readable in light and dark tab bars.
  ...shareMetadata(
    "SPS-CARBON | Mesurez, pilotez et réduisez vos émissions",
    "Plateforme de comptabilité carbone pour les entreprises au Maroc : collecte guidée, calcul traçable des Scopes 1, 2 et 3, plan de réduction et préparation au MACF.",
  ),
};

export const viewport: Viewport = {
  themeColor: "#04151A",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={archivo.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <SiteFrame>{children}</SiteFrame>
      </body>
    </html>
  );
}
