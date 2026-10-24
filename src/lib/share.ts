import type { Metadata } from "next";

/* The card shown when a page is shared on LinkedIn, WhatsApp, X or by e-mail. */

// Canonical origin, when one is configured. Without it the share image is left
// out rather than pointing at localhost (see README).
export const publicOrigin =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : undefined);

const shareImage = [
  {
    url: "/images/sps-carbon-partage.png",
    width: 1200,
    height: 630,
    alt: "SPS-CARBON : mesurez, pilotez et réduisez vos émissions. Plateforme de comptabilité carbone pour les entreprises au Maroc.",
  },
];

export function shareMetadata(title: string, description: string): Pick<Metadata, "openGraph" | "twitter"> {
  const images = publicOrigin ? shareImage : undefined;
  return {
    openGraph: { title, description, locale: "fr_MA", type: "website", siteName: "SPS-CARBON", images },
    twitter: { card: "summary_large_image", title, description, images },
  };
}
