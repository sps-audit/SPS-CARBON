/*
 * Real photographs to commission (never stock, never generated). Each entry is
 * a slot already placed in the page: while `src` is empty the slot takes no
 * room on the live site, and `next dev` shows a marked placeholder with the
 * brief, so the layout can be judged before the shoot.
 *
 * To add a photo: export it as AVIF and WebP into public/images/photos/
 * (e.g. terrain.avif and terrain.webp, at least 2400 px wide for a band),
 * set `src` to the path without extension, and fill in width and height
 * with the file's real pixel size. Images are self-hosted (CSP img-src 'self').
 */
export type Photo = {
  /** Path under /public without extension, e.g. "/images/photos/terrain". */
  src?: string;
  width: number;
  height: number;
  alt: string;
  /** What to shoot, for the photographer. */
  brief: string;
};

export const photos = {
  terrain: {
    width: 2400,
    height: 1350,
    alt: "Une consultante de SAFEPERFORM relève un compteur électrique avec le responsable maintenance d’un site industriel, près d’El Jadida",
    brief:
      "Un consultant ou une consultante SafePerform sur un site industriel marocain (atelier, local électrique), qui relève un compteur ou rapproche une facture d’un relevé avec le responsable du site. Lumière naturelle, plan large, format 16:9, personnes réelles et consentantes, gilet et EPI du site.",
  },
  revue: {
    width: 1600,
    height: 2000,
    alt: "Revue de données en salle de réunion : factures annotées et écran de la plateforme SPS-CARBON",
    brief:
      "Plan rapproché d’une revue de données : factures papier annotées, classeur ISO, écran affichant SPS-CARBON, mains de la consultante et du responsable QHSE du client. Format vertical 4:5, sans logo de client visible.",
  },
} satisfies Record<string, Photo>;

export type PhotoId = keyof typeof photos;
