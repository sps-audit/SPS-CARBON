"use client";

import { useState, type KeyboardEvent } from "react";
import Link from "next/link";

/*
 * "Pour qui ?": the visitor picks the profile that describes them and reads
 * what they get and where to go next. ARIA tabs (vertical, arrow keys).
 */
const audiences = [
  {
    who: "PME et ETI",
    need: "Réaliser un premier bilan carbone, sans équipe environnement dédiée.",
    get: ["Une collecte guidée, site par site", "Un bilan des Scopes 1 et 2 expliqué", "Les premières priorités d’action"],
    next: { label: "Le bilan essentiel", href: "/solutions#inventaire-essentiel" },
  },
  {
    who: "Industriels",
    need: "Comprendre le poids de l’énergie, des combustibles et des procédés sur plusieurs sites.",
    get: ["Des émissions par site et par source", "Les consommations anormales repérées", "Un suivi d’une année sur l’autre"],
    next: { label: "Les parcours par secteur", href: "/solutions#entreprises" },
  },
  {
    who: "Exportateurs vers l’UE",
    need: "Préparer les données demandées par un client européen au titre du MACF / CBAM.",
    get: ["L’analyse des produits concernés", "Les données de production et d’intrants", "Un dossier technique à transmettre"],
    next: { label: "L’accompagnement MACF", href: "/solutions#cbam" },
  },
  {
    who: "Fournisseurs de grands comptes",
    need: "Répondre aux questionnaires carbone de vos clients, avec des chiffres que vous pouvez défendre.",
    get: ["Des réponses justifiées par vos données", "Une méthode présentable", "Des mises à jour sans tout refaire"],
    next: { label: "Répondre à un questionnaire", href: "/contact?sujet=5" },
  },
  {
    who: "Directions QHSE et RSE",
    need: "Intégrer le carbone au système de management et au reporting existant.",
    get: ["Un lien avec vos démarches ISO", "Des indicateurs pour la revue de direction", "Un rapport RSE mieux étayé"],
    next: { label: "Carbone, QHSE et RSE", href: "/cabinet#qhse-rse" },
  },
];

export function AudiencePicker() {
  const [active, setActive] = useState(0);
  const item = audiences[active];

  function onKey(event: KeyboardEvent<HTMLButtonElement>) {
    const keys: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    let next: number | null = null;
    if (event.key in keys) next = (active + keys[event.key] + audiences.length) % audiences.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = audiences.length - 1;
    if (next === null) return;
    event.preventDefault();
    setActive(next);
    document.getElementById(`audience-tab-${next}`)?.focus();
  }

  return (
    <div className="audience">
      <div className="audience-tabs" role="tablist" aria-orientation="vertical" aria-label="Votre profil">
        {audiences.map((audience, index) => (
          <button
            key={audience.who}
            id={`audience-tab-${index}`}
            type="button"
            role="tab"
            aria-selected={active === index}
            aria-controls="audience-panel"
            tabIndex={active === index ? 0 : -1}
            onClick={() => setActive(index)}
            onKeyDown={onKey}
          >
            {audience.who}
          </button>
        ))}
        <span className="audience-mark" style={{ ["--i" as string]: active }} aria-hidden="true" />
      </div>
      <div className="audience-panel spot" id="audience-panel" role="tabpanel" aria-labelledby={`audience-tab-${active}`}>
        <div className="audience-body" key={active}>
          <p className="audience-need">{item.need}</p>
          <p className="audience-label">Ce que vous obtenez</p>
          <ul className="check-list">
            {item.get.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <div className="audience-next">
            <Link href={item.next.href} className="btn btn-small">
              {item.next.label}
            </Link>
            <Link href="/contact" className="link link-quiet">
              Ma situation est différente
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
