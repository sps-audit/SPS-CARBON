/*
 * The one demonstration case of the site (24 Nov 2026): Conserverie Atlas, the
 * fictional company of the platform's own demonstration. Every figure below was
 * read from the platform (its seed data and the FM6E v17 engine), so the site
 * and the demonstration tell the same story: a visitor who opens the
 * demonstration finds the same company, the same tonnes, the same checks.
 *
 * Before 24 Nov the site invented its own "Atelier Atlas" (2 910 t, factor
 * 0,551) that the platform never showed. When the platform's demo data changes,
 * update this file and nothing else.
 */

/** The platform's demonstration: the real application, with fictional data kept in the browser. */
export const platformDemo = {
  /* "?demo": the platform greets a visitor as a demonstration, not as an invited client. */
  url: "https://sps-carbon-app.vercel.app/#/connexion?demo",
  cta: "Ouvrir la démonstration",
  note: "Sans inscription. Les données restent dans votre navigateur.",
};

export const demoCase = {
  name: "Conserverie Atlas",
  initials: "CA",
  activity: "Conserves de poisson",
  city: "El Jadida",
  /** Said once wherever the case appears. */
  label: "Conserverie Atlas, entreprise fictive de la démonstration",
  chip: "Entreprise fictive de la démonstration",
  base: { year: 2024, total: 9104 },
  current: { year: 2025, total: 9146, scopes: [1288, 2008, 5850] as const },
  /** −30 % in 2030 against 2024: 6 373 t. */
  target: { year: 2030, reduction: 0.3, total: 6373 },
  /** Reductions already decided in the platform's plan: 1 184 t a year. */
  planned: 1184,
};

/** The platform's own quality checks on the 2025 bilan (Contrôle qualité). */
export const demoChecks = [
  { title: "Mois manquant", text: "Camions frigorifiques : décembre" },
  { title: "Qualité à préciser", text: "Chariots élévateurs diesel" },
  { title: "Écart avec 2024", text: "Eaux usées +32 %, à expliquer" },
];

/** One line of the bilan, the heaviest: tinplate for the cans (FM6E v17, steel imported new). */
export const demoLine = {
  name: "Fer blanc pour boîtes, 2025",
  quantity: "1 450 t",
  factor: "3,19",
  factorUnit: "tCO₂e par tonne",
  factorSource: "FM6E v17, acier neuf importé",
  result: "4 626 t",
  piece: "Export comptable des achats 2025",
};

/** Actions of the demonstration's reduction plan, in the order their effect adds up (% of 2024). Short names: one line each in the hero. */
export const demoActions = [
  { name: "Variateurs sur les compresseurs", from: 2 },
  { name: "Froid : fluide à faible PRG", from: 5 },
  { name: "Chaudière au gaz naturel", from: 8 },
  { name: "Centrale solaire de 1,2 MWc", from: 13 },
];

/** Real captures of the platform (public/images/plateforme), light and dark. */
export const captures = [
  { id: "tableau-de-bord", label: "Tableau de bord", alt: "Tableau de bord du bilan 2025 de Conserverie Atlas dans SPS-CARBON : 9 146 tCO₂e, la répartition par scope, la fiabilité et la trajectoire vers l’objectif 2030." },
  { id: "saisir", label: "Saisir mes données", alt: "Page Saisir mes données de SPS-CARBON : les sources du bilan 2025 de Conserverie Atlas, rangées par scope, avec leurs tonnes." },
  { id: "plan", label: "Plan de réduction", alt: "Plan de réduction de Conserverie Atlas dans SPS-CARBON : 1 589 tCO₂e restent à trouver pour atteindre l’objectif 2030." },
] as const;
export type CaptureId = (typeof captures)[number]["id"];
