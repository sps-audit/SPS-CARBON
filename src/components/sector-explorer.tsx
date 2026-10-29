"use client";

import { useState, type KeyboardEvent } from "react";
import Link from "next/link";

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

const lanes = [
  { scope: 1 as const, name: "Scope 1", note: "Vos opérations : ce que vous brûlez, fuyez ou transformez" },
  { scope: 2 as const, name: "Scope 2", note: "Votre énergie : ce que vous achetez pour fonctionner" },
  { scope: 3 as const, name: "Scope 3", note: "Votre chaîne de valeur : fournisseurs, transport, produits" },
];

/*
 * Sectors: choose an activity, read where its emissions usually come from.
 * The sources are laid out on three scope lanes (operations, energy, value
 * chain) so the picture is also the list. Tabs follow the ARIA tabs pattern.
 */
export function SectorExplorer() {
  const [active, setActive] = useState(0);
  const sector = sectors[active];

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
      <div className="seg sector-tabs" role="tablist" aria-label="Secteurs d’activité">
        {sectors.map((item, index) => (
          <button
            key={item.name}
            id={`sector-tab-${index}`}
            type="button"
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
      <div className="sector-panel" id="sector-panel" role="tabpanel" aria-labelledby={`sector-tab-${active}`}>
        <div className="sector-copy" key={`copy-${active}`}>
          <h3 className="t-h3">{sector.heading}</h3>
          <p>{sector.text}</p>
          <p className="sector-question">
            <span>Première question à se poser</span>
            {sector.question}
          </p>
          <Link href="/contact" className="link">
            Définir mon périmètre avec vous
          </Link>
        </div>
        <div className="sector-lanes spot" key={`lanes-${active}`}>
          {lanes.map((lane) => {
            const items = sector.sources.filter((source) => source.scope === lane.scope);
            return (
              <div className={`sector-lane is-s${lane.scope}`} key={lane.scope}>
                <p className="sector-lane-head">
                  <strong>{lane.name}</strong>
                  <span>{lane.note}</span>
                </p>
                <ul>
                  {items.map((source, index) => (
                    <li key={source.label} style={{ ["--i" as string]: index }}>
                      {source.label}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
