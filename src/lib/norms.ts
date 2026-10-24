/*
 * Carbon standards and frameworks, written for decision makers.
 * "withUs" states honestly how SPS-CARBON relates to each one: the platform
 * calculates with the GHG Protocol and ISO 14064-1; it prepares data for the
 * others and never certifies. Texts checked in October 2026.
 */

export type StageId = "mesurer" | "produit" | "verifier" | "declarer" | "objectifs";
export type SituationId = "premier" | "client" | "export" | "produit" | "verification" | "objectifs" | "transport";

export const stages: { id: StageId; label: string; text: string }[] = [
  { id: "mesurer", label: "Mesurer l’organisation", text: "Compter les émissions de l’entreprise, site par site." },
  { id: "produit", label: "Mesurer un produit", text: "L’empreinte d’un produit ou d’une expédition." },
  { id: "verifier", label: "Faire vérifier", text: "Un tiers indépendant contrôle la déclaration." },
  { id: "declarer", label: "Déclarer et répondre", text: "Clients, marchés financiers, frontière européenne." },
  { id: "objectifs", label: "Fixer des objectifs", text: "Réduire, puis communiquer avec rigueur." },
];

export const situations: { id: SituationId; label: string; lead: string }[] = [
  { id: "premier", label: "Premier inventaire", lead: "ghg" },
  { id: "client", label: "Un client européen me questionne", lead: "esrs-e1" },
  { id: "export", label: "J’exporte vers l’UE (MACF)", lead: "macf" },
  { id: "produit", label: "On me demande l’empreinte d’un produit", lead: "iso14067" },
  { id: "transport", label: "Transport et logistique", lead: "iso14083" },
  { id: "verification", label: "Mon bilan doit être vérifié", lead: "iso14064-3" },
  { id: "objectifs", label: "Objectifs et neutralité", lead: "sbti" },
];

export type Relation = "Cadre de calcul" | "Données préparées" | "Accompagnement" | "Base nécessaire" | "Selon votre activité" | "Repère";

export type Norm = {
  id: string;
  code: string;
  name: string;
  issuer: string;
  year: string;
  stage: StageId;
  situations: SituationId[];
  what: string;
  forYou: string;
  withUs: string;
  relation: Relation;
  details?: string[];
};

export const norms: Norm[] = [
  {
    id: "ghg",
    code: "GHG Protocol",
    name: "Corporate Accounting and Reporting Standard",
    issuer: "WRI et WBCSD",
    year: "Édition révisée 2004",
    stage: "mesurer",
    situations: ["premier", "client", "verification"],
    what: "La référence mondiale pour comptabiliser les émissions d’une organisation. Elle fixe les règles de périmètre et classe les émissions en Scopes 1, 2 et 3.",
    forYou: "Toute entreprise qui réalise son premier inventaire ou remplit le questionnaire carbone d’un client.",
    withUs: "Cadre de calcul de SPS-CARBON : chaque résultat est présenté par scope, avec ses sources.",
    relation: "Cadre de calcul",
    details: [
      "Scope 2 Guidance (2015) : deux méthodes pour l’électricité, selon le réseau ou selon les contrats.",
      "Scope 3 Standard (2011) : quinze catégories, huit en amont et sept en aval.",
    ],
  },
  {
    id: "iso14064-1",
    code: "ISO 14064-1:2018",
    name: "Quantification et déclaration des GES au niveau des organismes",
    issuer: "ISO",
    year: "2018",
    stage: "mesurer",
    situations: ["premier", "client", "verification"],
    what: "La norme internationale pour quantifier et déclarer les émissions et suppressions de gaz à effet de serre d’un organisme, en six catégories : émissions directes, énergie importée, transport, produits achetés, utilisation des produits vendus, autres.",
    forYou: "Les organisations qui veulent un inventaire structuré, prêt à être présenté puis vérifié.",
    withUs: "Cadre de calcul de SPS-CARBON, avec la correspondance entre ses catégories et les scopes du GHG Protocol.",
    relation: "Cadre de calcul",
  },
  {
    id: "bilan-carbone",
    code: "Bilan Carbone®",
    name: "Méthode française d’inventaire des émissions",
    issuer: "Association pour la transition Bas Carbone (ABC), méthode créée par l’ADEME",
    year: "Depuis 2004",
    stage: "mesurer",
    situations: ["premier", "client"],
    what: "Une méthode d’inventaire très utilisée par les organisations francophones, compatible avec l’ISO 14064-1 et le GHG Protocol.",
    forYou: "Si un partenaire français vous demande explicitement un Bilan Carbone® selon cette méthode.",
    withUs: "Sur ce site, « bilan carbone » désigne un inventaire de GES. Bilan Carbone® est une marque de l’ABC ; une mission sous ce nom suit ses propres règles, à préciser au cadrage.",
    relation: "Repère",
  },
  {
    id: "iso14083",
    code: "ISO 14083:2023",
    name: "Émissions des opérations de chaînes de transport",
    issuer: "ISO",
    year: "2023",
    stage: "produit",
    situations: ["transport"],
    what: "Quantifier et déclarer les émissions d’un transport de marchandises ou de passagers, par mode et par maillon de la chaîne logistique.",
    forYou: "Transporteurs, logisticiens et chargeurs à qui l’on demande les émissions d’une expédition.",
    withUs: "Utile pour le carburant des flottes (Scope 1) et le fret sous-traité (Scope 3) ; l’application dépend de vos données de trajets.",
    relation: "Selon votre activité",
  },
  {
    id: "iso14067",
    code: "ISO 14067:2018",
    name: "Empreinte carbone des produits",
    issuer: "ISO",
    year: "2018",
    stage: "produit",
    situations: ["produit", "export"],
    what: "Quantifier l’empreinte carbone d’un produit sur tout ou partie de son cycle de vie, selon une approche d’analyse de cycle de vie.",
    forYou: "Exportateurs et fournisseurs à qui un client demande l’empreinte d’un produit précis.",
    withUs: "Les données d’énergie et de production de l’inventaire en sont la base ; une étude produit complète est une mission spécifique.",
    relation: "Selon votre activité",
  },
  {
    id: "ghg-product",
    code: "GHG Protocol Product",
    name: "Product Life Cycle Accounting and Reporting Standard",
    issuer: "WRI et WBCSD",
    year: "2011",
    stage: "produit",
    situations: ["produit"],
    what: "L’équivalent, côté GHG Protocol, pour l’inventaire du cycle de vie d’un produit.",
    forYou: "Si votre client raisonne en GHG Protocol pour ses achats.",
    withUs: "Même logique que l’ISO 14067 : vos données d’inventaire sont le point de départ.",
    relation: "Repère",
  },
  {
    id: "iso14064-3",
    code: "ISO 14064-3:2019",
    name: "Vérification et validation des déclarations de GES",
    issuer: "ISO",
    year: "2019",
    stage: "verifier",
    situations: ["verification", "export", "client"],
    what: "Les principes et exigences pour vérifier ou valider une déclaration de GES, qu’elle porte sur une organisation, un projet ou un produit.",
    forYou: "Quand une banque, un client ou le MACF attend un chiffre vérifié par un tiers.",
    withUs: "Un dossier vérifiable : sources, facteurs, versions et hypothèses tracés. La vérification reste une mission indépendante, menée par un organisme accrédité.",
    relation: "Données préparées",
  },
  {
    id: "macf",
    code: "MACF / CBAM",
    name: "Règlement (UE) 2023/956, modifié par le règlement (UE) 2025/2083",
    issuer: "Union européenne",
    year: "Période définitive depuis janvier 2026",
    stage: "declarer",
    situations: ["export"],
    what: "Les importateurs de l’UE déclarent les émissions intrinsèques, directes et indirectes, du ciment, du fer et de l’acier, de l’aluminium, des engrais, de l’hydrogène et de l’électricité qu’ils importent.",
    forYou: "Les exportateurs marocains de ces produits : leur client européen a besoin de leurs données de production.",
    withUs: "Accompagnement MACF : données de production et calcul des émissions intrinsèques à transmettre à votre client.",
    relation: "Accompagnement",
    details: [
      "Seuil de 50 tonnes importées par importateur et par an, hors électricité et hydrogène.",
      "Première déclaration annuelle avant le 30 septembre 2027, pour les importations de 2026.",
      "Les données réelles d’une installation doivent être vérifiées.",
    ],
  },
  {
    id: "esrs-e1",
    code: "ESRS E1 (CSRD)",
    name: "Norme climat de la directive européenne CSRD",
    issuer: "Union européenne (EFRAG)",
    year: "2023, champ revu par la directive Omnibus de 2026",
    stage: "declarer",
    situations: ["client"],
    what: "Les grandes entreprises européennes concernées publient leurs émissions des Scopes 1, 2 et 3 et leur plan de transition. Depuis la directive Omnibus, la CSRD vise les entreprises de plus de 1 000 salariés et 450 M€ de chiffre d’affaires.",
    forYou: "Les fournisseurs de grands groupes européens : vos émissions entrent dans leur Scope 3. Pour les fournisseurs de moins de 1 000 salariés, leurs demandes sont limitées au standard volontaire des PME (VSME).",
    withUs: "Des émissions claires par scope et par site, prêtes à transmettre à votre client.",
    relation: "Données préparées",
  },
  {
    id: "ammc",
    code: "Circulaire AMMC 03/19",
    name: "Rapport ESG des émetteurs",
    issuer: "Autorité marocaine du marché des capitaux",
    year: "2019",
    stage: "declarer",
    situations: [],
    what: "Les émetteurs marocains publient un rapport ESG, qui comprend des informations environnementales.",
    forYou: "Les sociétés cotées et les groupes qui consolident leurs filiales.",
    withUs: "Des indicateurs carbone documentés, à reprendre dans le rapport ESG.",
    relation: "Données préparées",
  },
  {
    id: "sbti",
    code: "SBTi",
    name: "Objectifs fondés sur la science, dont le Corporate Net-Zero Standard",
    issuer: "Science Based Targets initiative",
    year: "Net-Zero Standard publié en 2021",
    stage: "objectifs",
    situations: ["objectifs", "client"],
    what: "Un cadre pour fixer des objectifs de réduction alignés sur la science climatique, ensuite validés par la SBTi.",
    forYou: "Les entreprises qui veulent annoncer un objectif crédible, ou dont un client l’exige.",
    withUs: "L’inventaire et la trajectoire en sont la base ; la validation des objectifs relève de la SBTi.",
    relation: "Base nécessaire",
  },
  {
    id: "iso14068-1",
    code: "ISO 14068-1:2023",
    name: "Transition vers le zéro net, partie 1 : neutralité carbone",
    issuer: "ISO",
    year: "2023",
    stage: "objectifs",
    situations: ["objectifs"],
    what: "Les exigences pour revendiquer la neutralité carbone : réduire d’abord, compenser le résiduel de façon encadrée, rendre compte avec transparence.",
    forYou: "Avant toute communication « neutre en carbone », pour éviter une allégation contestable.",
    withUs: "SPS-CARBON ne délivre pas de revendication de neutralité ; l’inventaire et le plan de réduction en sont le point de départ.",
    relation: "Base nécessaire",
  },
  {
    id: "cdn",
    code: "CDN du Maroc",
    name: "Contribution déterminée au niveau national, actualisée en 2021",
    issuer: "Royaume du Maroc",
    year: "2021, horizon 2030",
    stage: "objectifs",
    situations: ["objectifs", "premier"],
    what: "L’engagement climatique du pays : réduire de 45,5 % les émissions de GES en 2030 par rapport au scénario tendanciel, dont 18,3 % sans appui international.",
    forYou: "Toute entreprise marocaine : c’est le cap qui oriente les politiques publiques et les financements.",
    withUs: "Un repère pour situer votre trajectoire de réduction.",
    relation: "Repère",
  },
];
