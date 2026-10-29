import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/controls.css";
import "./styles/chrome.css";
import "./styles/sections.css";
import "./styles/home.css";
import "./styles/pages.css";
import "./styles/product.css";
import "./styles/tools.css";
import "./styles/contact.css";
import "./styles/motion.css";
import { SiteFrame } from "@/components/site-frame";
import { publicOrigin, shareMetadata } from "@/lib/share";
import { THEME_BOOT, THEME_COLORS } from "@/lib/theme";

// Mona Sans (SIL Open Font License 1.1, github.com/github/mona-sans), one
// variable file with optical size, width and weight axes, subset to Latin and
// French. Self-hosted: no request to a third party, no build-time download.
const mona = localFont({
  src: [{ path: "./fonts/MonaSans-VF.woff2", weight: "200 900", style: "normal" }],
  variable: "--font-mona",
  display: "swap",
  preload: true,
  declarations: [{ prop: "font-stretch", value: "75% 125%" }],
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
  themeColor: THEME_COLORS.light,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={mona.variable} data-theme="light" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT }} />
      </head>
      <body>
        <SiteFrame>{children}</SiteFrame>
      </body>
    </html>
  );
}
