import type { Metadata } from "next";

/* The card shown when a page is shared on LinkedIn, WhatsApp, X or by e-mail. */

// Canonical origin, when one is configured. Without it the share image is left
// out rather than pointing at localhost (see README).
export const publicOrigin =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : undefined);

// One card per page (public/images/partage), drawn in the site's own type and
// colours; pages without their own card use the home card.
export const shareCards = ["accueil", "plateforme", "solutions", "methodologie", "cabinet", "ressources", "offres", "outils", "normes", "contact"] as const;
export type ShareCard = (typeof shareCards)[number];

export function shareMetadata(
  title: string,
  description: string,
  card: ShareCard = "accueil",
): Pick<Metadata, "openGraph" | "twitter"> {
  const images = publicOrigin
    ? [{ url: `/images/partage/${card}.jpg`, width: 1200, height: 630, alt: `${title.replace(/ \| SPS-CARBON$/, "")}, SPS-CARBON par SAFEPERFORM SOLUTIONS` }]
    : undefined;
  return {
    openGraph: { title, description, locale: "fr_MA", type: "website", siteName: "SPS-CARBON", images },
    twitter: { card: "summary_large_image", title, description, images },
  };
}
