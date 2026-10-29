"use client";

import { useRef } from "react";
import { useScrollProgress } from "./motion";

const docs = [
  {
    name: "Rapport de bilan carbone",
    text: "Synthèse pour la direction, résultats par scope, par site et par source, avec la part estimée clairement indiquée.",
    lines: ["Synthèse", "Résultats par scope", "Par site et par source"],
  },
  {
    name: "Annexe méthodologique",
    text: "Périmètre, facteurs d’émission, sources, versions, hypothèses et limites : tout ce qu’un vérificateur demandera.",
    lines: ["Périmètre", "Facteurs et sources", "Hypothèses et limites"],
  },
  {
    name: "Plan de réduction",
    text: "Les actions prioritaires, leurs responsables, leurs échéances et l’effet attendu, à suivre d’une année sur l’autre.",
    lines: ["Priorités", "Responsables", "Trajectoire"],
  },
  {
    name: "Fiche produit MACF",
    text: "Pour les exportateurs concernés : données de production et émissions intrinsèques à transmettre au client européen.",
    lines: ["Produit et code NC", "Émissions intrinsèques", "Données de production"],
  },
];

export function Deliverables() {
  const stack = useRef<HTMLDivElement>(null);
  useScrollProgress(stack, 0.95, 0.35);
  return (
    <div className="deliv">
      <div className="deliv-stack" ref={stack} aria-hidden="true">
        {docs.map((doc, index) => (
          <div className="deliv-doc" key={doc.name} style={{ ["--k" as string]: index }}>
            <div className="deliv-doc-head">
              <span className="deliv-mark" />
              <span>SPS-CARBON</span>
              <em>Exemple</em>
            </div>
            <strong>{doc.name}</strong>
            {doc.lines.map((line) => (
              <span className="deliv-line" key={line}>
                {line}
              </span>
            ))}
            <span className="deliv-bars">
              <i />
              <i />
              <i />
            </span>
          </div>
        ))}
      </div>
      <ul className="deliv-list">
        {docs.map((doc, index) => (
          <li key={doc.name} data-reveal="rise" style={{ ["--i" as string]: index }}>
            <h3>{doc.name}</h3>
            <p>{doc.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
