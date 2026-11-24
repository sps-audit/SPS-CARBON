/*
 * "Planches": the way the home page presents the platform since 23 Nov 2026.
 * One plate = one atmosphere image (src/lib/ambiance.ts) holding one real
 * fragment of SPS-CARBON under a double-rim glass bezel; the explanation is
 * written under or beside the plate, never on the picture. Since 24 Nov 2026
 * every fragment shows the platform's own demonstration case (Conserverie
 * Atlas, src/lib/demo-case.ts), with its real checks and figures, and wears
 * the chip that says the company is fictional.
 */
import type { AmbianceName } from "./ambiance";
import { demoCase, demoChecks, demoLine } from "./demo-case";

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
    title: "Que répondre au client européen ?",
    text: "L’empreinte de chaque produit se calcule depuis le bilan, avec sa méthode : la réponse au questionnaire carbone part en PDF ou en Excel.",
    link: { href: "/solutions#livrables", label: "Les livrables" },
    ambiance: "vagues",
    grid: true,
  },
];

/* The plate's top edge. The chip goes on fictional fragments only, never on the real offers or steps. */
export const plateEdge = {
  number: (n: number) => `Planche ${String(n).padStart(2, "0")}`,
  demo: "Données d’exemple",
  /** On the plates that show the demonstration's own company (showcase, captures). */
  demoCase: demoCase.chip,
};

/* Collecter: the pieces converging on the bilan, and who still owes what. */
export const collect = {
  kicker: `${demoCase.name}, bilan 2025`,
  complete: (done: number, total: number) => `${done} sources sur ${total} complètes`,
  srLabel: "Sources du bilan",
  states: { ok: "reçu", wait: "en attente", miss: "manquant" },
};

export const collectSources = [
  { name: "Électricité", icon: "bolt", state: "ok" },
  { name: "Fioul et propane", icon: "flame", state: "ok" },
  { name: "Flotte", icon: "truck", state: "wait" },
  { name: "Sites", icon: "building", state: "ok" },
  { name: "Justificatifs", icon: "file", state: "miss" },
] as const;

export const collectRows = [
  { name: "Chaudière vapeur, fioul lourd", state: "ok", label: "Reçu" },
  { name: "Camions frigorifiques, décembre", state: "wait", label: "Mois manquant" },
  { name: "Groupe électrogène, facture", state: "miss", label: "Justificatif attendu" },
] as const;

/* Contrôler */
export const control = {
  kicker: "Contrôle qualité",
  allClear: "Tout est vérifié : le bilan peut partir en revue",
  open: (n: number) => `${n} point${n > 1 ? "s" : ""} à vérifier avant la revue`,
  check: "Vérifier",
  fixed: "Corrigé",
  markFixed: "marquer comme corrigé",
  markOpen: "marquer à vérifier",
};

export const controlAlerts = demoChecks;

/* Calculer */
export const trace = { kicker: demoLine.name, note: "Calcul tracé" };

export const traceChain = [
  { k: "Pièce", v: demoLine.piece },
  { k: "Quantité", v: `${demoLine.quantity} de fer blanc` },
  { k: "Facteur", v: `${demoLine.factor} ${demoLine.factorUnit}` },
  { k: "Source", v: demoLine.factorSource },
  { k: "Résultat", v: `${demoLine.result}CO₂e, 51 % du bilan` },
];

/* Piloter */
/* The reference year (2024) and the 2025 bilan the curve starts from. */
export const trajectoryBase = demoCase.base.total;
export const trajectoryStart = demoCase.current.total;
/* goal: reduction in 2030 against 2024. "Plan actuel" = the 1 184 t a year of actions retained in the platform. */
export const scenarios = [
  { name: "Sans action", goal: 0, note: "La tendance si rien ne change" },
  { name: "Plan actuel", goal: 0.125, note: "Cinq actions retenues, 1 184 t par an" },
  { name: "Plan renforcé", goal: 0.29, note: "Avec le facteur du fournisseur de fer blanc" },
];
export const trajectory = {
  unit: "tCO₂e en 2030",
  /** The target, as a share of the base year: −30 % (6 373 t, as in the hero). */
  target: 0.7,
  targetLabel: "Objectif −30 %",
  group: "Scénario",
  years: ["2025", "2026", "2027", "2028", "2029", "2030"],
};

/* Transmettre */
/* Transmettre: the product footprint, as the platform's "Empreinte produit" computes it for 2025. */
export const macf = {
  kicker: "Empreinte produit, 2025",
  product: "Sardines à l’huile, boîte de 125 g",
  value: 97,
  decimals: 0,
  unit: "gCO₂e par boîte",
  rows: [
    { k: "Par kilo", v: "0,78 kgCO₂e" },
    { k: "Périmètre", v: "Du berceau à la sortie d’usine" },
    { k: "Méthode", v: "Bilan réparti par masse, vers ISO 14067" },
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
