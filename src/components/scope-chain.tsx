"use client";

import { useState, type KeyboardEvent } from "react";

/*
 * The three scopes placed on the value chain, as the GHG Protocol frames them:
 * Scope 3 upstream, the energy you buy (Scope 2), your own sites and vehicles
 * (Scope 1), Scope 3 downstream. Choosing a scope lights its part of the chain.
 * ARIA tabs; the chain itself is decorative, its content is in the panel.
 */
const scopes = [
  {
    id: 1,
    label: "Vos opérations",
    title: "Ce que vous émettez directement.",
    description:
      "Combustibles brûlés sur site, véhicules que vous contrôlez, procédés industriels, fuites de fluides frigorigènes : les sources présentes dans vos murs et votre flotte.",
    examples: ["Chaudières, fours et groupes électrogènes", "Flotte de véhicules", "Procédés et fluides frigorigènes"],
  },
  {
    id: 2,
    label: "Votre énergie",
    title: "L’énergie que vous achetez.",
    description:
      "Électricité, chaleur, vapeur ou froid achetés puis consommés. La quantité, la période et le facteur d’émission retenu donnent son sens au calcul.",
    examples: ["Électricité achetée", "Chaleur et vapeur", "Froid acheté"],
  },
  {
    id: 3,
    label: "Votre chaîne de valeur",
    title: "L’impact au-delà de vos murs.",
    description:
      "Achats, transport, déchets, déplacements, utilisation et fin de vie des produits. Le GHG Protocol définit quinze catégories ; on retient celles qui comptent pour votre activité.",
    examples: ["Achats de biens et services", "Transport amont et aval", "Déplacements, déchets, fin de vie"],
  },
] as const;

const links = [
  { scope: 3, name: "En amont", items: ["Matières et achats", "Transport entrant"] },
  { scope: 2, name: "Énergie achetée", items: ["Électricité", "Chaleur, vapeur, froid"] },
  { scope: 1, name: "Vos sites et véhicules", items: ["Combustion", "Procédés, fluides"], own: true },
  { scope: 3, name: "En aval", items: ["Transport sortant", "Usage et fin de vie"] },
];

export function ScopeChain() {
  const [active, setActive] = useState(0);
  const scope = scopes[active];

  function onKey(event: KeyboardEvent<HTMLButtonElement>) {
    const keys: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    let next: number | null = null;
    if (event.key in keys) next = (active + keys[event.key] + 3) % 3;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = 2;
    if (next === null) return;
    event.preventDefault();
    setActive(next);
    document.getElementById(`scope-tab-${next}`)?.focus();
  }

  return (
    <div className="scopes" data-active={active + 1}>
      <div className="scope-chain" aria-hidden="true" data-reveal="scan">
        {links.map((link, index) => (
          <div key={link.name} className={`scope-link is-s${link.scope} ${link.scope === active + 1 ? "is-on" : ""} ${link.own ? "is-own" : ""}`} style={{ ["--i" as string]: index }}>
            <span className="scope-link-tag">Scope {link.scope}</span>
            <strong>{link.name}</strong>
            <ul>
              {link.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
        <span className="scope-boundary">Votre organisation</span>
      </div>

      <div className="scopes-copy">
        <div className="seg scope-tabs" role="tablist" aria-label="Les trois scopes">
          {scopes.map((item, index) => (
            <button
              key={item.id}
              id={`scope-tab-${index}`}
              type="button"
              role="tab"
              aria-selected={active === index}
              aria-controls="scope-panel"
              tabIndex={active === index ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={onKey}
            >
              Scope {item.id}
            </button>
          ))}
        </div>
        <div className="scope-panel" id="scope-panel" role="tabpanel" aria-labelledby={`scope-tab-${active}`} key={active}>
          <div className="scope-panel-head">
            <p className="scope-panel-k">
              Scope {scope.id}, {scope.label.toLowerCase()}
            </p>
            <h3 className="scope-panel-title">{scope.title}</h3>
          </div>
          <div className="scope-panel-body">
            <p>{scope.description}</p>
            <ul className="check-list">
              {scope.examples.map((example) => (
                <li key={example}>{example}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
