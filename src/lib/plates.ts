/*
 * "Planches": the way the home page presents the platform since 23 Nov 2026.
 * One plate = one atmosphere image (src/lib/ambiance.ts) holding one real
 * fragment of SPS-CARBON under a double-rim glass bezel; the explanation is
 * written under or beside the plate, never on the picture. Same fictional
 * company and figures as the rest of the home page (Atelier Atlas, 2 910 t).
 * Every fragment wears its "données d'exemple" chip.
 */
import type { AmbianceName } from "./ambiance";

export type ModuleId = "collecter" | "controler" | "calculer" | "piloter" | "transmettre";

export type PlateModule = {
  id: ModuleId;
  /** The verb on the keycap tab. */
  verb: string;
  /** The question the module answers, as the caption title. */
  title: string;
  text: string;
  link: { href: string; label: string };
  /** The image under the fragment, chosen for its character (see the image map). */
  ambiance: AmbianceName;
  /** A drawn grid laid over the image (the dossier, measured and squared). */
  grid?: boolean;
  /** Dark image: the bezel rim and the plate label turn to night. */
  night?: boolean;
};

/* The keycap tablist's name for assistive technologies. */
export const showcaseLabel = "Modules de la plateforme";

export const plateModules: PlateModule[] = [
  {
    id: "collecter",
    verb: "Collecter",
    title: "Qui doit encore fournir quoi ?",
    text: "Chaque contributeur dépose ses pièces dans la bonne case. Ce qui manque se voit tout de suite, source par source.",
    link: { href: "/plateforme#collecte", label: "La collecte guidée" },
    ambiance: "voile",
  },
  {
    id: "controler",
    verb: "Contrôler",
    title: "Peut-on se fier aux chiffres ?",
    text: "Doublons, unités incompatibles, hausses inhabituelles : chaque point est signalé, vérifié, puis corrigé avec sa justification.",
    link: { href: "/plateforme#revue", label: "Le contrôle qualité" },
    ambiance: "lumiere",
  },
  {
    id: "calculer",
    verb: "Calculer",
    title: "Chaque tonne remonte à sa facture.",
    text: "Quantité, facteur, source et version : le calcul reste ouvert, pour vos équipes comme pour un vérificateur.",
    link: { href: "/plateforme#tracabilite", label: "Le calcul traçable" },
    ambiance: "nervure",
  },
  {
    id: "piloter",
    verb: "Piloter",
    title: "Où allons-nous d’ici 2030 ?",
    text: "La tendance, le plan actuel et un plan renforcé, face à l’objectif. Les effets de chaque action se chiffrent avec vous.",
    link: { href: "/plateforme#pilotage", label: "Le plan d’action" },
    ambiance: "elan",
    night: true,
  },
  {
    id: "transmettre",
    verb: "Transmettre",
    title: "Que transmettre au client européen ?",
    text: "La fiche produit MACF se prépare depuis les mêmes données que le bilan, prête à envoyer en PDF ou en Excel.",
    link: { href: "/solutions#cbam", label: "L’accompagnement MACF" },
    ambiance: "vagues",
    grid: true,
  },
];

/* The plate's top edge. The chip goes on fictional fragments only, never on the real offers or steps. */
export const plateEdge = {
  number: (n: number) => `Planche ${String(n).padStart(2, "0")}`,
  demo: "Données d’exemple",
};

/* Collecter: the pieces converging on the bilan, and who still owes what. */
export const collect = {
  kicker: "Bilan 2025",
  complete: (done: number, total: number) => `${done} sources sur ${total} complètes`,
  srLabel: "Sources du bilan",
  states: { ok: "reçu", wait: "en attente", miss: "manquant" },
};

export const collectSources = [
  { name: "Électricité", icon: "bolt", state: "ok" },
  { name: "Gaz propane", icon: "flame", state: "wait" },
  { name: "Flotte", icon: "truck", state: "ok" },
  { name: "Sites", icon: "building", state: "ok" },
  { name: "Fluides", icon: "file", state: "miss" },
] as const;

export const collectRows = [
  { name: "Factures d’électricité", state: "ok", label: "Reçu" },
  { name: "Gaz propane, T3 et T4", state: "wait", label: "En attente" },
  { name: "Registre des fluides", state: "miss", label: "Manquant" },
] as const;

/* Contrôler */
export const control = {
  kicker: "Contrôle qualité",
  allClear: "Tout est vérifié : le calcul peut partir",
  open: (n: number) => `${n} point${n > 1 ? "s" : ""} à vérifier avant le calcul`,
  check: "Vérifier",
  fixed: "Corrigé",
  markFixed: "marquer comme corrigé",
  markOpen: "marquer à vérifier",
};

export const controlAlerts = [
  { title: "Période en double", text: "Facture de mars saisie deux fois" },
  { title: "Unité incompatible", text: "Gaz déclaré en m³ au lieu de kg" },
  { title: "Hausse inhabituelle", text: "Électricité de juillet +38 %" },
];

/* Calculer */
export const trace = { kicker: "Électricité, mars 2025", note: "Calcul tracé" };

export const traceChain = [
  { k: "Pièce", v: "Facture d’électricité, mars 2025" },
  { k: "Quantité", v: "10 000 kWh" },
  { k: "Facteur", v: "0,551 kgCO₂e/kWh" },
  { k: "Source", v: "Maroc 2024, version 1" },
  { k: "Résultat", v: "5,51 tCO₂e" },
];

/* Piloter */
export const trajectoryBase = 2910;
export const scenarios = [
  { name: "Sans action", goal: 0, note: "La tendance si rien ne change" },
  { name: "Plan actuel", goal: 0.3, note: "Quatre actions engagées" },
  { name: "Plan renforcé", goal: 0.45, note: "Avec de l’électricité renouvelable" },
];
export const trajectory = {
  unit: "tCO₂e en 2030",
  /** The target, as a share of the base year: −30 % (2 037 t, as in the hero). */
  target: 0.7,
  targetLabel: "Objectif −30 %",
  group: "Scénario",
  years: ["2025", "2026", "2027", "2028", "2029", "2030"],
};

/* Transmettre */
export const macf = {
  kicker: "Fiche produit MACF",
  product: "Acier laminé, 2025",
  value: 1.62,
  unit: "tCO₂e par tonne produite",
  rows: [
    { k: "Émissions directes", v: "1,18 t" },
    { k: "Émissions indirectes", v: "0,44 t" },
    { k: "Méthode", v: "Règlement (UE) 2023/956" },
  ],
  files: ["PDF", "Excel"],
  ready: "Prêt à transmettre",
};

/* Offers on their plate: what is written on each specimen card. */
export const offerPlate = {
  title: "Trois façons de commencer.",
  lead: "Chaque mission démarre par un cadrage. Le prix dépend de vos sites, de vos données et des livrables attendus.",
  rows: { scope: "Périmètre", forWho: "Pour", items: "Comprend", price: "Prix" },
  price: "Chiffré après le cadrage",
  list: "Les trois formules",
  more: "En savoir plus",
};

/*
 * The closing plate of every page (footer, page ends): what to prepare for the
 * first exchange, the same list as the contact page. Real content: no chip.
 */
export const firstExchange = {
  kicker: "Pour préparer notre échange",
  aside: "Sans engagement",
  items: [
    "Votre secteur d’activité et les sites concernés.",
    "L’objectif de la démarche et son destinataire.",
    "La période étudiée et les éventuelles échéances.",
    "Les données déjà disponibles dans votre entreprise.",
  ],
  note: "Quelques lignes suffisent pour ce premier contact.",
};

/* The mission as stacked phase cards. */
export const phasePlate = {
  title: "Comment se déroule une mission.",
  lead: "Du premier échange au suivi annuel. À chaque étape, vous savez ce que nous attendons de vous et ce que vous recevez.",
  step: (n: number, total: number) => `Étape ${n} sur ${total}`,
  give: "Vous apportez",
  get: "Vous recevez",
  next: "Ensuite",
  last: "Le bilan suivant reprend la même méthode.",
};
