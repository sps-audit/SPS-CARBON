/*
 * "Le cabinet": SAFEPERFORM SOLUTIONS as presented on safe-perform.com,
 * rewritten for SPS-CARBON (brief of 29 October 2026). The figures announced
 * on the cabinet's site (years of experience, clients, satisfaction) are left
 * out until they are confirmed.
 */

export const trades = [
  {
    id: "formation",
    name: "Formation",
    lead: "Développer les compétences des équipes",
    text: "Des formations adaptées aux responsabilités des participants et aux besoins de leur entreprise, avec des exercices, des mises en situation et des méthodes directement applicables. Les programmes peuvent être construits autour d’une problématique précise.",
    items: [
      "Management de la qualité, ISO 9001",
      "Sécurité des denrées alimentaires, ISO 22000 et FSSC 22000",
      "Santé et sécurité au travail",
      "Exigences Halal, NM 08.0.800",
      "Management anticorruption, ISO 37001",
      "Audit interne selon l’ISO 19011",
    ],
  },
  {
    id: "conseil",
    name: "Conseil et accompagnement",
    lead: "Faire avancer les démarches dans l’entreprise",
    text: "Le cabinet accompagne la mise en œuvre des systèmes qualité, sécurité et environnement au contact des équipes : compréhension du contexte, échanges pratiques et suivi adapté aux besoins.",
    items: [
      "Ateliers de travail avec les équipes",
      "Cas pratiques issus de votre secteur d’activité",
      "Accompagnement après la formation, pour appliquer les acquis",
    ],
  },
  {
    id: "audit",
    name: "Audit",
    lead: "Évaluer les pratiques et guider les améliorations",
    text: "Chaque audit se termine par une restitution : des constats et des recommandations hiérarchisées, pour aider l’entreprise à décider de ses actions.",
    items: [
      "Audits préparatoires à une certification : repérer les écarts, préparer les équipes",
      "Audits internes : pratiques, conformité et efficacité du système de management",
      "Audits des exigences réglementaires",
      "Audits de systèmes intégrés : ISO 9001, ISO 14001, ISO 45001 et ISO 22000",
      "Audits Halal et préparation aux exigences associées",
      "Audits fournisseurs : respect des spécifications et risques d’approvisionnement",
    ],
  },
];

export const sectors = [
  "Agroalimentaire",
  "Industrie et production",
  "Santé et secteur social",
  "Logistique et transport",
  "Restauration",
  "Services",
];

export const team = [
  {
    initials: "AE",
    name: "Aziz El Kasraoui",
    role: "Directeur général et consultant senior",
    text: "Un parcours dans la direction QHSE (qualité, hygiène, sécurité et environnement), le conseil, l’audit et la formation, dont une expérience auprès d’AFNOR Maroc. Qualifié Lead Auditor IRCA pour l’ISO 9001 et l’ISO 22000.",
  },
  {
    initials: "IC",
    name: "Imane Chekhar",
    role: "Consultante QSE",
    text: "Une formation spécialisée en ingénierie et management de la qualité. Elle intervient sur les référentiels ISO 9001, ISO 22000 et FSSC 22000, en audit, dans les démarches qualité et dans la documentation des missions.",
  },
];

export const values = [
  { name: "Intégrité", text: "Des recommandations honnêtes et adaptées à la situation réelle de l’entreprise." },
  { name: "Innovation", text: "Des réponses pertinentes aux difficultés rencontrées, plutôt que des modèles tout faits." },
  { name: "Résultats", text: "Des interventions orientées vers des améliorations observables." },
  { name: "Collaboration", text: "Un travail avec les équipes pour comprendre les besoins et construire les réponses." },
];

export const references = ["Bank Al-Maghrib", "Savola", "Dalia", "Fromital", "Souss Agriproducts"];

export const cabinetContact = {
  phone: "06 61 21 48 49",
  phoneHref: "tel:+212661214849",
  email: "contact@safe-perform.com",
  hours: "Du lundi au vendredi, de 9 h à 18 h",
};
