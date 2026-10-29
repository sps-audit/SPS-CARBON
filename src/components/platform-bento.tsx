"use client";

import { useState } from "react";
import Link from "next/link";
import { Reading } from "./reading";

/*
 * Home: the platform as one screen of live modules. Each module answers a
 * question a management team asks and links to the page that explains it.
 * Illustrative screens, fictional data.
 */

const BASE = 2910;
const SCENARIOS = [
  { name: "Sans action", goal: 0, note: "La tendance si rien ne change" },
  { name: "Plan actuel", goal: 0.3, note: "Quatre actions engagées" },
  { name: "Plan renforcé", goal: 0.45, note: "Avec de l’électricité renouvelable" },
];
const ALERTS = [
  { title: "Période en double", text: "Facture de mars saisie deux fois" },
  { title: "Unité incompatible", text: "Gaz déclaré en m³ au lieu de kg" },
  { title: "Hausse inhabituelle", text: "Électricité de juillet +38 %" },
];

export function PlatformBento() {
  const [scenario, setScenario] = useState(1);
  const [fixed, setFixed] = useState([false, false, true]);

  const s = SCENARIOS[scenario];
  const xs = [10, 160, 310, 460, 610, 760];
  const value = (i: number) => (s.goal === 0 ? BASE * Math.pow(1.012, i) : BASE * (1 - s.goal * Math.pow(i / 5, 1.2)));
  const y = (t: number) => 20 + ((3200 - t) / 1700) * 150;
  const d = xs.map((x, i) => `${i ? "L" : "M"} ${x} ${y(value(i)).toFixed(1)}`).join(" ");
  const open = fixed.filter((f) => !f).length;

  return (
    <div className="bento" data-reveal="scan">
      <article className="bento-tile spot bt-trajectory">
        <div className="bt-head">
          <h3>Où allons-nous d’ici 2030 ?</h3>
          <div className="seg" role="group" aria-label="Scénario">
            {SCENARIOS.map((item, i) => (
              <button
                key={item.name}
                type="button"
                className={i === scenario ? "is-on" : ""}
                aria-pressed={i === scenario}
                onClick={() => setScenario(i)}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
        <svg className="bt-chart" viewBox="0 0 770 190" preserveAspectRatio="none" aria-hidden="true">
          <path className="bt-grid" d="M0 30 H770 M0 95 H770 M0 160 H770" />
          <path className="bt-trend" d="M 10 72 L 760 57" />
          <path className="bt-line" d={d} />
        </svg>
        <div className="bt-foot">
          <p className="bt-figure readout" aria-live="polite">
            <Reading value={Math.round(value(5))} from={BASE} />
            <small>tCO₂e en 2030</small>
          </p>
          <p className="bt-note">{s.note}</p>
        </div>
        <Link href="/plateforme#pilotage" className="bt-link">
          Le plan d’action
        </Link>
      </article>

      <article className="bento-tile spot bt-collect">
        <div className="bt-ring" aria-hidden="true">
          <svg viewBox="0 0 170 170">
            <circle cx="85" cy="85" r="70" className="ring-track" />
            <circle cx="85" cy="85" r="70" className="ring-fill" transform="rotate(-90 85 85)" />
          </svg>
          <p>
            <strong className="readout">
              <Reading value={62} />
              <small>%</small>
            </strong>
            <span>des données reçues</span>
          </p>
        </div>
        <div className="bt-list">
          <h3>Qui doit encore fournir quoi ?</h3>
          <p>
            <span>Factures d’électricité</span>
            <em className="tag ok">Reçu</em>
          </p>
          <p>
            <span>Gaz propane, T3 et T4</span>
            <em className="tag wait">En attente</em>
          </p>
          <p>
            <span>Registre des fluides</span>
            <em className="tag miss">Manquant</em>
          </p>
          <Link href="/plateforme#collecte" className="bt-link">
            La collecte guidée
          </Link>
        </div>
      </article>

      <article className="bento-tile spot bt-quality">
        <h3>Peut-on se fier aux chiffres ?</h3>
        <p className="bt-sub" aria-live="polite">
          {open === 0
            ? "Tout est vérifié : le calcul peut partir."
            : `${open} point${open > 1 ? "s" : ""} à vérifier avant le calcul`}
        </p>
        <ul className="bt-alerts">
          {ALERTS.map((alert, i) => (
            <li key={alert.title} className={fixed[i] ? "is-fixed" : ""}>
              <span>
                <strong>{alert.title}</strong>
                <small>{alert.text}</small>
              </span>
              <button
                type="button"
                aria-pressed={fixed[i]}
                aria-label={`${alert.title} : ${fixed[i] ? "marquer à vérifier" : "marquer comme corrigé"}`}
                onClick={() => setFixed(fixed.map((f, k) => (k === i ? !f : f)))}
              >
                {fixed[i] ? "Corrigé" : "Vérifier"}
              </button>
            </li>
          ))}
        </ul>
        <Link href="/plateforme#revue" className="bt-link">
          Le contrôle qualité
        </Link>
      </article>

      <article className="bento-tile spot bt-scopes">
        <h3>D’où viennent nos émissions ?</h3>
        <ul className="bt-bars">
          {[
            ["Scope 1, opérations", "412 t", 14],
            ["Scope 2, électricité", "538 t", 19],
            ["Scope 3, chaîne de valeur", "1 960 t", 67],
          ].map(([name, t, share], i) => (
            <li key={name as string} style={{ ["--w" as string]: `${share}%`, ["--n" as string]: i }}>
              <span>
                {name}
                <strong>{t}</strong>
              </span>
              <i aria-hidden="true" />
            </li>
          ))}
        </ul>
        <p className="bt-sub">Dont 14 % estimés, méthodes indiquées</p>
        <Link href="/methodologie" className="bt-link">
          La méthode
        </Link>
      </article>

      <article className="bento-tile spot bt-macf">
        <h3>Que transmettre au client européen ?</h3>
        <p className="bt-macf-name">Fiche produit MACF, acier laminé</p>
        <p className="bt-figure readout">
          <Reading value={1.62} decimals={2} />
          <small>tCO₂e par tonne, exemple</small>
        </p>
        <p className="bt-chips">
          <span>PDF</span>
          <span>Excel</span>
          <span className="is-ready">Prêt à transmettre</span>
        </p>
        <Link href="/solutions#cbam" className="bt-link">
          L’accompagnement MACF
        </Link>
      </article>

      <article className="bento-tile spot bt-trace">
        <h3>Chaque tonne remonte à sa facture.</h3>
        <ol className="bt-chain" aria-label="Exemple de calcul tracé">
          <li>
            <small>Pièce</small>
            <strong>Facture d’électricité, mars</strong>
          </li>
          <li>
            <small>Quantité</small>
            <strong>10 000 kWh</strong>
          </li>
          <li>
            <small>Facteur</small>
            <strong>0,551 kgCO₂e/kWh</strong>
          </li>
          <li>
            <small>Source</small>
            <strong>Maroc 2024</strong>
          </li>
          <li className="is-result">
            <small>Résultat</small>
            <strong>5,51 tCO₂e</strong>
          </li>
        </ol>
        <Link href="/plateforme#tracabilite" className="bt-link">
          Le calcul traçable
        </Link>
      </article>
    </div>
  );
}
