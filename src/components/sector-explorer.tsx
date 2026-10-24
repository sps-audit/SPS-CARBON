"use client";

import { useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { hexPoints } from "@/lib/geometry";

type Source = { label: string; scope: 1 | 2 | 3 };

const sectors: {
  name: string;
  heading: string;
  text: string;
  sources: Source[];
  question: string;
}[] = [
  {
    name: "Industrie",
    heading: "De la ligne de production à l’empreinte.",
    text: "Fours, chaudières, procédés, matières premières et transport : l’inventaire relie les flux de l’usine aux sources d’émission. Pour certaines marchandises exportées vers l’Union européenne, le MACF ajoute des exigences propres au produit.",
    sources: [
      { label: "Combustibles des fours et chaudières", scope: 1 },
      { label: "Émissions de procédé", scope: 1 },
      { label: "Fluides frigorigènes", scope: 1 },
      { label: "Électricité achetée", scope: 2 },
      { label: "Matières premières", scope: 3 },
      { label: "Transport amont et aval", scope: 3 },
    ],
    question: "Quels sites, quelles lignes et quelle période retenir pour une première mesure ?",
  },
  {
    name: "Agroalimentaire",
    heading: "Du champ au produit emballé.",
    text: "Chaîne du froid, énergie de transformation, matières agricoles et emballages : les postes importants se trouvent souvent en amont, chez les fournisseurs. Les données de froid méritent une attention particulière.",
    sources: [
      { label: "Chaudières et vapeur produite sur site", scope: 1 },
      { label: "Fuites des installations de froid", scope: 1 },
      { label: "Électricité de transformation", scope: 2 },
      { label: "Matières agricoles achetées", scope: 3 },
      { label: "Emballages", scope: 3 },
      { label: "Transport frigorifique", scope: 3 },
    ],
    question: "Quelles matières et quels fournisseurs pèsent le plus dans vos achats ?",
  },
  {
    name: "Transport & logistique",
    heading: "Chaque kilomètre a une source.",
    text: "Carburant de la flotte, entrepôts, sous-traitance : la frontière entre vos véhicules et ceux de vos partenaires détermine le scope. Les litres consommés valent mieux qu’un montant de dépense.",
    sources: [
      { label: "Carburant de la flotte détenue", scope: 1 },
      { label: "Groupes froids des véhicules", scope: 1 },
      { label: "Électricité des entrepôts", scope: 2 },
      { label: "Transport sous-traité", scope: 3 },
      { label: "Véhicules et équipements achetés", scope: 3 },
    ],
    question: "Quels véhicules contrôlez-vous, et lesquels relèvent de vos sous-traitants ?",
  },
  {
    name: "Commerce & distribution",
    heading: "Une lecture de toute l’activité.",
    text: "Magasins, entrepôts, produits vendus et livraisons : poser un périmètre cohérent avec votre organisation et vos partenaires. Le froid commercial et les produits achetés sont souvent déterminants.",
    sources: [
      { label: "Froid commercial", scope: 1 },
      { label: "Véhicules de livraison détenus", scope: 1 },
      { label: "Électricité des magasins", scope: 2 },
      { label: "Produits achetés", scope: 3 },
      { label: "Emballages et déchets", scope: 3 },
      { label: "Livraisons sous-traitées", scope: 3 },
    ],
    question: "Quels magasins et entrepôts entrent dans le périmètre de départ ?",
  },
  {
    name: "Services & hôtellerie",
    heading: "L’impact ne s’arrête pas au bureau.",
    text: "Électricité, climatisation, achats, numérique et déplacements : des informations réparties entre plusieurs équipes, qu’il faut réunir sans perdre leur origine.",
    sources: [
      { label: "Gaz et fioul pour l’eau chaude", scope: 1 },
      { label: "Climatisation et fluides", scope: 1 },
      { label: "Électricité des bâtiments", scope: 2 },
      { label: "Achats et équipements", scope: 3 },
      { label: "Déplacements professionnels", scope: 3 },
      { label: "Déchets", scope: 3 },
    ],
    question: "Qui détient les factures, les contrats de maintenance et les notes de frais ?",
  },
];

const radii = { 1: 58, 2: 116, 3: 176 } as const;
const slots: Record<1 | 2 | 3, number[]> = {
  1: [-150, 30, 150],
  2: [-30, 150],
  3: [-90, 30, 90, -150, 150, -30],
};

function position(scope: 1 | 2 | 3, index: number) {
  const angle = (slots[scope][index % slots[scope].length] * Math.PI) / 180;
  const r = radii[scope];
  return { x: 200 + r * Math.cos(angle), y: 200 + r * Math.sin(angle) };
}

export function SectorExplorer() {
  const [active, setActive] = useState(0);
  const [hover, setHover] = useState<string | null>(null);
  const sector = sectors[active];
  const count = { 1: 0, 2: 0, 3: 0 };
  const placed = sector.sources.map((source) => ({ ...source, ...position(source.scope, count[source.scope]++) }));

  function onKey(event: KeyboardEvent<HTMLButtonElement>) {
    if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const total = sectors.length;
    const next =
      event.key === "Home" ? 0 : event.key === "End" ? total - 1 : (active + (event.key === "ArrowRight" ? 1 : total - 1)) % total;
    setActive(next);
    document.getElementById(`sector-tab-${next}`)?.focus();
  }

  return (
    <div className="sectors">
      <div className="sector-tabs" role="tablist" aria-label="Secteurs d’activité">
        {sectors.map((item, index) => (
          <button
            key={item.name}
            id={`sector-tab-${index}`}
            role="tab"
            aria-selected={active === index}
            aria-controls="sector-panel"
            tabIndex={active === index ? 0 : -1}
            onClick={() => setActive(index)}
            onKeyDown={onKey}
          >
            {item.name}
          </button>
        ))}
      </div>
      <div className="sector-panel grid" id="sector-panel" role="tabpanel" aria-labelledby={`sector-tab-${active}`}>
        <div className="sector-map" aria-hidden="true">
          <svg viewBox="0 0 400 400">
            {[3, 2, 1].map((scope) => (
              <polygon key={scope} className="sector-ring" points={hexPoints(200, 200, radii[scope as 1 | 2 | 3])} />
            ))}
            <circle cx="200" cy="200" r="7" className="sector-core" />
            <g key={active}>
              {placed.map((source, index) => (
                <g
                  key={source.label}
                  className={`sector-node scope-${source.scope} ${hover === source.label ? "is-hover" : ""}`}
                  style={{ animationDelay: `${index * 70}ms` }}
                >
                  <circle cx={source.x} cy={source.y} r="19" className="node-halo" />
                  <circle cx={source.x} cy={source.y} r="12" />
                  <text x={source.x} y={source.y + 4.5} className="node-n">
                    {index + 1}
                  </text>
                </g>
              ))}
            </g>
          </svg>
          <span className="map-key k1">Scope 1</span>
          <span className="map-key k2">Scope 2</span>
          <span className="map-key k3">Scope 3</span>
        </div>
        <div className="sector-copy" key={active}>
          <h3>{sector.heading}</h3>
          <p>{sector.text}</p>
          <div className="sector-groups">
            {([1, 2, 3] as const).map((scope) => (
              <div key={scope}>
                <h4>Scope {scope}</h4>
                <ul>
                  {sector.sources
                    .map((source, index) => ({ ...source, n: index + 1 }))
                    .filter((source) => source.scope === scope)
                    .map((source) => (
                      <li
                        key={source.label}
                        onMouseEnter={() => setHover(source.label)}
                        onMouseLeave={() => setHover(null)}
                      >
                        <span className="node-badge" aria-hidden="true">
                          {source.n}
                        </span>
                        {source.label}
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="sector-question">
            <span>Première question à se poser</span>
            {sector.question}
          </p>
          <Link href="/contact" className="link">
            Définir mon périmètre avec vous
          </Link>
        </div>
      </div>
    </div>
  );
}
