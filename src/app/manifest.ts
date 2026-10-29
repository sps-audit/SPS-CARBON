import type { MetadataRoute } from "next";

export const dynamic = "force-static";

// Installed on a phone home screen: the brand-kit app icon on petrol.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SPS-CARBON",
    short_name: "SPS-CARBON",
    description: "Comptabilité carbone pour les entreprises au Maroc, par SAFEPERFORM SOLUTIONS.",
    start_url: "/",
    display: "standalone",
    background_color: "#062129",
    theme_color: "#062129",
    lang: "fr",
    icons: [
      { src: "/brand/app-icon-192x192.png", sizes: "192x192", type: "image/png" },
      { src: "/brand/app-icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
