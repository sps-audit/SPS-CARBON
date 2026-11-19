/*
 * Ambiance images: five green textures chosen by SAFEPERFORM (Nov 2026). They
 * are never wallpaper alone: each one is a stage that carries something, the
 * product under glass, a caption, an explanation or an analysis. Each image
 * has one role across the site:
 * - voile, lumiere: soft blurs, the stages under glass (hero, demonstration,
 *   page headers, page ends, sign-in);
 * - feuille: leaf veins, traceability (the invoice story, method, norms);
 * - champ: a field in motion, the terrain (one site and its three scopes, the
 *   firm, the 404);
 * - vagues: lime waves, the explanation of a tonne and the closings.
 *
 * Files: public/images/ambiance/{name}-{large|haut}-{width}.{avif,webp},
 * encoded from the originals (abstract blurs turned a quarter for the wide
 * versions, so they keep their full resolution). Self-hosted (CSP img-src 'self').
 */
import type { InstrumentName } from "@/components/page-instruments";

export type AmbianceName = "feuille" | "vagues" | "champ" | "voile" | "lumiere";
export type AmbianceShape = "large" | "haut";

type Shape = { widths: readonly [number, number]; width: number; height: number };

export const ambiances: Record<AmbianceName, Record<AmbianceShape, Shape>> = {
  feuille: {
    large: { widths: [1600, 900], width: 1600, height: 1000 },
    haut: { widths: [896, 600], width: 896, height: 1194 },
  },
  vagues: {
    large: { widths: [1376, 800], width: 1376, height: 768 },
    haut: { widths: [768, 480], width: 768, height: 1376 },
  },
  champ: {
    large: { widths: [1600, 900], width: 1600, height: 1000 },
    haut: { widths: [896, 600], width: 896, height: 1200 },
  },
  voile: {
    large: { widths: [1920, 1000], width: 1920, height: 1072 },
    haut: { widths: [768, 480], width: 768, height: 1376 },
  },
  lumiere: {
    large: { widths: [1920, 1000], width: 1920, height: 1081 },
    haut: { widths: [768, 480], width: 768, height: 1364 },
  },
};

/* Inner page headers: the image behind each page's instrument, and the line written on it. */
export const pageAmbiance: Record<InstrumentName, { name: AmbianceName; note: string }> = {
  plateforme: { name: "voile", note: "Collecte, contrôle et calcul dans un seul espace" },
  solutions: { name: "lumiere", note: "Trois parcours, toujours précédés d’un cadrage" },
  methodologie: { name: "feuille", note: "Chaque tonne remonte à sa source" },
  cabinet: { name: "champ", note: "El Jadida, au plus près de vos sites" },
  ressources: { name: "lumiere", note: "Vos données prêtes avant le premier bilan" },
  contact: { name: "vagues", note: "Un premier échange, sans engagement" },
  normes: { name: "feuille", note: "GHG Protocol, ISO 14064-1, MACF" },
  offres: { name: "vagues", note: "Une proposition chiffrée après le cadrage" },
  outils: { name: "voile", note: "Calculé dans votre navigateur, rien n’est envoyé" },
};

/*
 * Home, "Un site, trois sources": the field read like an analyst's map. Same
 * fictional company and figures as "Le relevé" (Atelier Atlas, 2 910 t).
 */
export const siteReading = {
  title: "Un site, trois sources d’émissions.",
  lead: "Sur le terrain, le bilan se lit poste par poste. Voici comment SPS-CARBON annote un site industriel : ce qui brûle sur place, l’énergie achetée et ce qui vient de la chaîne de valeur.",
  demo: "Atelier Atlas, entreprise fictive, données d’exemple",
  marks: [
    { scope: "Scope 1", source: "Chaudière gaz et flotte de livraison", value: "412 t", share: "14 %", tone: "s1" },
    { scope: "Scope 2", source: "Électricité du site, 12 factures", value: "538 t", share: "19 %", tone: "s2" },
    { scope: "Scope 3", source: "Achats, transport sous-traité, déchets", value: "1 960 t", share: "67 %", tone: "s3", note: "dont une part estimée, méthode indiquée" },
  ],
  total: { label: "Bilan 2025", value: 2910, unit: "tCO₂e" },
};

/*
 * Home, "Ce que pèse une tonne": the unit made concrete with the site's own
 * example factors (the hero invoice and the express calculator). Illustrative
 * factors, labelled as such; the calculator shows their sources.
 */
export const tonneExplained = {
  kicker: "Ordre de grandeur",
  title: "Ce que pèse une tonne de CO₂e.",
  lead: "Une tonne, c’est l’unité de votre bilan. Rapportée à vos factures, elle devient concrète.",
  rows: [
    { value: "1 815", unit: "kWh", text: "d’électricité, au facteur d’exemple de 0,551 kgCO₂e/kWh" },
    { value: "373", unit: "litres", text: "de gazole, au facteur d’exemple de 2,68 kgCO₂e/L" },
    { value: "2 910", unit: "tonnes", text: "pour Atelier Atlas en 2025, soit 2 910 fois ce calcul, ligne par ligne" },
  ],
  note: "Facteurs d’exemple. Le calculateur express affiche les sources de chaque facteur.",
  link: { href: "/outils#calculateur", label: "Essayer le calculateur express" },
};
