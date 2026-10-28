import Link from "next/link";

/*
 * Home: the platform in four linked steps, drawn as one panel crossed by a
 * single data thread (one pulse travels along it; static under reduced motion).
 * Screens are illustrative and use fictional data.
 */

const pillars = [
  {
    name: "Collecter et contrôler",
    text: "Chaque contributeur sait quoi fournir, pour quel site et quelle période. Les anomalies remontent avant le calcul.",
    links: [
      { label: "Collecte guidée", href: "/plateforme#collecte" },
      { label: "Contrôle qualité", href: "/plateforme#revue" },
    ],
  },
  {
    name: "Calculer les Scopes 1, 2 et 3",
    text: "GHG Protocol et ISO 14064-1. Quantité, facteur, source et hypothèse : chaque tonne remonte à sa facture.",
    links: [
      { label: "Calcul traçable", href: "/plateforme#tracabilite" },
      { label: "Méthodologie", href: "/methodologie" },
    ],
  },
  {
    name: "Réduire et piloter",
    text: "Les postes les plus lourds deviennent des actions, avec un responsable, une échéance et un effet attendu.",
    links: [
      { label: "Plan d’action", href: "/plateforme#pilotage" },
      { label: "Bilan complet", href: "/solutions#chaine-de-valeur" },
    ],
  },
  {
    name: "Rendre compte",
    text: "Rapport de bilan, réponses aux questionnaires de vos clients et, pour l’export, les données du MACF.",
    links: [
      { label: "Accompagnement MACF", href: "/solutions#cbam" },
      { label: "Normes carbone", href: "/normes" },
    ],
  },
];

function Screen({ index }: { index: number }) {
  if (index === 0)
    return (
      <div className="pui">
        {[
          ["Factures d’électricité", "Reçu", "ok"],
          ["Gasoil des véhicules", "Reçu", "ok"],
          ["Fluides frigorigènes", "Manquant", "miss"],
        ].map(([label, status, tone]) => (
          <div className="pui-row" key={label}>
            <span>{label}</span>
            <em className={`tag ${tone}`}>{status}</em>
          </div>
        ))}
        <div className="pui-alert">
          <strong>Période en double</strong>
          <span>Facture de mars saisie deux fois</span>
        </div>
      </div>
    );
  if (index === 1)
    return (
      <div className="pui">
        <div className="pui-eq">
          <span>10 000 kWh</span>
          <b>×</b>
          <span>facteur</span>
          <b>=</b>
          <strong>5,5 t</strong>
        </div>
        {[
          ["Scope 1", 14],
          ["Scope 2", 19],
          ["Scope 3", 67],
        ].map(([name, share], n) => (
          <div className="pui-bar" key={name}>
            <span>{name}</span>
            <i style={{ ["--w" as string]: `${share}%`, ["--n" as string]: n }} />
          </div>
        ))}
      </div>
    );
  if (index === 2)
    return (
      <div className="pui">
        <svg className="pui-traj" viewBox="0 0 220 64" preserveAspectRatio="none">
          <path className="base" d="M0 14 H220" />
          <path className="goal" d="M0 14 C 70 18, 130 34, 220 52" />
          <circle cx="220" cy="52" r="4" />
        </svg>
        {[
          ["Variateurs sur les compresseurs", "En cours", "wait"],
          ["Optimisation des tournées", "Planifié", "info"],
        ].map(([label, status, tone]) => (
          <div className="pui-row" key={label}>
            <span>{label}</span>
            <em className={`tag ${tone}`}>{status}</em>
          </div>
        ))}
      </div>
    );
  return (
    <div className="pui">
      <div className="pui-doc">
        <strong>Rapport de bilan carbone 2025</strong>
        <i />
        <i />
        <i />
      </div>
      <div className="pui-exports">
        <em>PDF</em>
        <em>Excel</em>
        <em>Fiche MACF</em>
      </div>
    </div>
  );
}

export function PlatformPillars() {
  return (
    <div className="pillars" data-reveal="rise">
      <div className="pillars-thread" aria-hidden="true">
        <span className="pillars-pulse" />
      </div>
      <ol className="pillars-list">
        {pillars.map((pillar, index) => (
          <li className="pillar" key={pillar.name}>
            <span className="pillar-node" aria-hidden="true">
              {index + 1}
            </span>
            <h3>{pillar.name}</h3>
            <p>{pillar.text}</p>
            <div className="pillar-screen" aria-hidden="true">
              <Screen index={index} />
            </div>
            <ul className="pillar-links">
              {pillar.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
      <p className="pillars-foot">Écrans illustratifs, données fictives.</p>
    </div>
  );
}
