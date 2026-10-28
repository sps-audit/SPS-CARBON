/*
 * The three formulas, what each one includes, and the options that can be added.
 * Shared by the home page (summary cards) and /offres (comparison and builder).
 * No price is published: every mission is quoted after a scoping call.
 */

export type PlanId = "essentiel" | "complet" | "macf";

export type Plan = {
  id: PlanId;
  name: string;
  scope: string;
  forWho: string;
  text: string;
  items: string[];
  href: string;
  featured?: boolean;
  badge?: string;
  /** Index in the contact form's subject list (see contact-form.tsx). */
  subject: number;
};

export const plans: Plan[] = [
  {
    id: "essentiel",
    name: "Bilan essentiel",
    scope: "Scopes 1 et 2",
    forWho: "Un premier bilan, sans équipe environnement dédiée.",
    text: "Vos opérations et votre énergie : combustibles, véhicules, procédés, électricité. La base de toute démarche carbone.",
    items: ["Périmètre et collecte guidée", "Calculs et hypothèses documentés", "Restitution à la direction"],
    href: "/solutions#inventaire-essentiel",
    subject: 0,
  },
  {
    id: "complet",
    name: "Bilan complet",
    scope: "Scopes 1, 2 et 3",
    forWho: "Répondre à vos clients et agir sur toute la chaîne de valeur.",
    text: "Toute la chaîne de valeur : achats, transport, déchets, déplacements. Avec les catégories qui comptent vraiment pour vous.",
    items: ["Examen des quinze catégories", "Collecte auprès des contributeurs", "Plan de réduction priorisé"],
    href: "/solutions#chaine-de-valeur",
    featured: true,
    badge: "Le plus complet",
    subject: 1,
  },
  {
    id: "macf",
    name: "Accompagnement MACF",
    scope: "Export vers l’UE",
    forWho: "Transmettre des données fiables à votre client européen.",
    text: "Pour les marchandises concernées par le CBAM : les données de production à transmettre à votre client européen.",
    items: ["Analyse des produits concernés", "Données de production et intrants", "Dossier technique"],
    href: "/solutions#cbam",
    subject: 2,
  },
];

/* true = included, false = not included, string = included with a precision. */
export type Cell = boolean | string;

export const comparisonGroups: { title: string; rows: { label: string; cells: [Cell, Cell, Cell] }[] }[] = [
  {
    title: "Ce que nous mesurons",
    rows: [
      { label: "Scope 1 : combustibles, véhicules, procédés, fluides frigorigènes", cells: [true, true, "Installations concernées"] },
      { label: "Scope 2 : électricité achetée", cells: [true, true, "Électricité des procédés"] },
      { label: "Scope 3 : examen des quinze catégories", cells: [false, true, false] },
      { label: "Émissions intrinsèques par produit", cells: [false, false, true] },
    ],
  },
  {
    title: "La méthode",
    rows: [
      { label: "Cadrage du périmètre et de la période", cells: [true, true, true] },
      { label: "Collecte guidée, site par site", cells: [true, true, true] },
      { label: "Contrôle de la qualité des données avant calcul", cells: [true, true, true] },
      { label: "Calcul traçable : facteurs, sources, hypothèses", cells: [true, true, true] },
      { label: "Collecte auprès des fournisseurs et sous-traitants", cells: [false, true, "Fournisseurs d’intrants"] },
    ],
  },
  {
    title: "Ce que vous recevez",
    rows: [
      { label: "Rapport de bilan carbone", cells: [true, true, false] },
      { label: "Annexe méthodologique", cells: [true, true, true] },
      { label: "Plan de réduction", cells: ["Premières priorités", "Plan priorisé", false] },
      { label: "Dossier technique pour le client européen", cells: [false, false, true] },
    ],
  },
  {
    title: "L’accompagnement",
    rows: [
      { label: "Appui de nos consultants à chaque étape", cells: [true, true, true] },
      { label: "Restitution des résultats à la direction", cells: [true, true, true] },
      { label: "Réponse argumentée aux questionnaires de vos clients", cells: [false, true, "Volet produit"] },
    ],
  },
];

export type Option = { id: string; name: string; text: string };

export const options: Option[] = [
  { id: "sites", name: "Sites supplémentaires", text: "Chaque site ajouté au périmètre, avec ses compteurs, ses véhicules et ses équipements." },
  { id: "update", name: "Mise à jour annuelle", text: "Le bilan de l’année suivante, comparable au premier, avec l’explication des écarts." },
  { id: "workshop", name: "Atelier plan d’action", text: "Une séance de travail avec vos équipes pour choisir, chiffrer et attribuer les actions." },
  { id: "training", name: "Formation de vos équipes", text: "Les bases du bilan carbone et de l’ISO 14064-1 pour les personnes qui collectent et pilotent." },
  { id: "verification", name: "Préparation à la vérification", text: "Un dossier organisé pour l’organisme indépendant qui vérifiera votre déclaration." },
  { id: "iso", name: "Lien avec vos systèmes ISO", text: "Le carbone intégré à vos démarches ISO 14001, 9001 ou 45001 et à la revue de direction." },
];

export const priceDrivers = [
  { title: "Le nombre de sites", text: "Usines, entrepôts, agences : chaque site apporte ses compteurs, ses véhicules et ses équipements." },
  { title: "Les sources à examiner", text: "Scopes 1 et 2 seulement, ou toute la chaîne de valeur avec les catégories du Scope 3." },
  { title: "L’état de vos données", text: "Factures réunies et tableaux à jour, ou documents à rassembler auprès de plusieurs services." },
  { title: "Les livrables attendus", text: "Rapport, plan d’action, réponse à un client, dossier technique MACF ou préparation à une vérification." },
];
