"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { useScrollProgress } from "./motion";
import { hexPoints } from "@/lib/geometry";

const scopes = [
  {
    id: 1,
    label: "Vos opérations",
    title: "Ce que vous émettez directement.",
    description:
      "Combustibles brûlés sur site, véhicules que vous contrôlez, procédés industriels, fuites de fluides frigorigènes. Ce sont les sources présentes dans vos murs et votre flotte.",
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

const radii = [74, 146, 222];

export function ScopeRings() {
  const [active, setActive] = useState(0);
  const stage = useRef<HTMLDivElement>(null);
  useScrollProgress(stage, 0.95, 0.4);
  const scope = scopes[active];

  function onKey(event: KeyboardEvent<HTMLButtonElement>) {
    const keys = ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Home", "End"];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    let next = active;
    if (event.key === "Home") next = 0;
    else if (event.key === "End") next = 2;
    else next = (active + (event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : 2)) % 3;
    setActive(next);
    document.getElementById(`scope-tab-${next}`)?.focus();
  }

  return (
    <div className="scopes grid">
      <div className="scopes-stage" ref={stage} data-active={active + 1} aria-hidden="true">
        <svg viewBox="0 0 560 560" className="scopes-svg">
          {[2, 1, 0].map((index) => (
            <polygon
              key={`band-${index}`}
              className={`scope-band ${active === index ? "is-active" : ""}`}
              points={hexPoints(280, 280, radii[index])}
            />
          ))}
          {radii.map((radius, index) => (
            <polygon
              key={radius}
              pathLength={1}
              className={`scope-ring ring-${index + 1} ${active === index ? "is-active" : ""}`}
              points={hexPoints(280, 280, radius)}
            />
          ))}
        </svg>
        <span className="scope-center">Votre entreprise</span>
        {radii.map((radius, index) => (
          <span
            key={`label-${radius}`}
            className={`scope-tag tag-${index + 1} ${active === index ? "is-active" : ""}`}
            style={{ top: `${((280 - radius) / 560) * 100}%` }}
          >
            Scope {index + 1}
          </span>
        ))}
      </div>

      <div className="scopes-copy">
        <div className="scope-tabs" role="tablist" aria-label="Les trois scopes">
          {scopes.map((item, index) => (
            <button
              key={item.id}
              id={`scope-tab-${index}`}
              role="tab"
              aria-selected={active === index}
              aria-controls="scope-panel"
              tabIndex={active === index ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={onKey}
            >
              <span className="scope-number">{item.id}</span>
              <span className="scope-name">
                Scope {item.id}
                <small>{item.label}</small>
              </span>
            </button>
          ))}
        </div>
        <div className="scope-panel" id="scope-panel" role="tabpanel" aria-labelledby={`scope-tab-${active}`} key={active}>
          <h3>{scope.title}</h3>
          <p>{scope.description}</p>
          <ul className="hex-list">
            {scope.examples.map((example) => (
              <li key={example}>{example}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
