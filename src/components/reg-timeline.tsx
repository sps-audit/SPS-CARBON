"use client";

import { useRef } from "react";
import { useScrollProgress } from "./motion";

/* Key dates for Moroccan companies. Sources listed under the timeline. */
const events = [
  { date: "2019", title: "Rapport ESG des sociétés cotées", text: "Circulaire AMMC n° 03/19 : les émetteurs publient un rapport ESG. 94 émetteurs concernés en 2023.", tag: "Maroc" },
  { date: "2021", title: "CDN actualisée du Maroc", text: "Objectif de réduction des émissions de GES de 45,5 % d’ici 2030, dont 18,3 % sans appui international.", tag: "Maroc" },
  { date: "Oct. 2023", title: "MACF : période transitoire", text: "Les importateurs de l’UE déclarent les émissions des marchandises concernées, sans paiement.", tag: "UE" },
  { date: "Janv. 2026", title: "MACF : période définitive", text: "Le mécanisme s’applique pleinement, avec un seuil de 50 tonnes par importateur et par an (hors électricité et hydrogène).", tag: "UE" },
  { date: "Fév. 2027", title: "Vente des certificats MACF", text: "Les certificats couvrant les importations de 2026 peuvent être achetés et restitués.", tag: "UE" },
  { date: "30 sept. 2027", title: "Première déclaration annuelle", text: "Les importateurs déclarent les émissions intrinsèques de 2026 : ils auront besoin des données de leurs fournisseurs.", tag: "UE" },
  { date: "2030", title: "Horizon de la CDN", text: "L’échéance de l’engagement climatique national du Maroc.", tag: "Maroc" },
];

// "Today" sits between the 4th and 5th events (October 2026).
const todayAfter = 3;

export function RegTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  useScrollProgress(ref, 0.85, 0.15);
  return (
    <div className="timeline" ref={ref}>
      <div className="timeline-rail" aria-hidden="true">
        <span />
      </div>
      <ol>
        {events.map((event, index) => (
          <li key={event.title} className={`tl-${event.tag === "UE" ? "eu" : "ma"}`} style={{ ["--n" as string]: index / (events.length - 1) }}>
            <span className="tl-dot" aria-hidden="true" />
            <time>{event.date}</time>
            <span className="tl-tag">{event.tag}</span>
            <h3>{event.title}</h3>
            <p>{event.text}</p>
            {index === todayAfter && (
              <span className="tl-today" aria-label="Nous sommes ici : octobre 2026">
                <i aria-hidden="true" />
                Aujourd’hui
              </span>
            )}
          </li>
        ))}
      </ol>
      <p className="timeline-sources">
        Sources : AMMC, circulaire n° 03/19 ; CDN du Maroc, 2021 ; règlement (UE) 2023/956 modifié en 2025. Dates à vérifier selon
        votre situation et l’évolution des textes.
      </p>
    </div>
  );
}
