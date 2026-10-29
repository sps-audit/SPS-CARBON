"use client";

import { useEffect, useRef, useState } from "react";
import { Focus } from "./focus";
import { onScrollFrame, requestScrollFrame } from "./scroll-store";

/*
 * "Le relevé": how one electricity invoice becomes a decision, in five steps.
 * On large screens the section is pinned while the page scrolls, and one
 * instrument changes state: invoice, check, calculation, scopes, trajectory
 * and report. Steps can also be chosen directly. On phones, and under reduced
 * motion, the five steps are simply laid out one after the other, each with
 * its own picture. Fictional company and illustrative figures.
 */

const STEPS = [
  {
    id: "collecter",
    name: "Collecter",
    title: "La pièce arrive avec son contexte.",
    text: "Chaque contributeur dépose sa facture dans la bonne case : site, période, unité. La donnée garde sa preuve jusqu’au rapport.",
  },
  {
    id: "controler",
    name: "Contrôler",
    title: "Les anomalies remontent avant le calcul.",
    text: "Doublons, unités incompatibles, mois manquants : chaque point est signalé, vérifié, puis corrigé avec sa justification.",
  },
  {
    id: "calculer",
    name: "Calculer",
    title: "Chaque tonne garde son chemin.",
    text: "Quantité, facteur d’émission, source et version : le calcul reste ouvert, pour vos équipes comme pour un vérificateur.",
  },
  {
    id: "consolider",
    name: "Consolider",
    title: "Les trois scopes, d’un coup d’œil.",
    text: "Le résultat rejoint le Scope 2 du site, puis le bilan de l’entreprise, avec la part estimée toujours visible.",
  },
  {
    id: "piloter",
    name: "Piloter et transmettre",
    title: "Des priorités, une trajectoire, un dossier.",
    text: "Les actions se chiffrent, la trajectoire 2030 se suit, et le rapport comme la fiche MACF se préparent depuis les mêmes données.",
  },
];

function ReleveVisual({ stage }: { stage: number }) {
  return (
    <div className="rv" data-stage={stage} aria-hidden="true">
      <div className="rv-glass">
        <div className="rv-bar">
          <span className="rv-dots">
            <i />
            <i />
            <i />
          </span>
          <span className="rv-path">Atelier Atlas / Site de production / Mars 2025</span>
          <span className="demo-chip">Données d’exemple</span>
        </div>

        {/* 1-2: the invoice, then its check */}
        <div className="rv-layer rv-invoice">
          <div className="rv-paper">
            <div className="rv-paper-head">
              <strong>Facture d’électricité</strong>
              <span>N° 2025-03-0417</span>
            </div>
            <dl className="rv-lines">
              <div>
                <dt>Client</dt>
                <dd>Atelier Atlas, site de production</dd>
              </div>
              <div>
                <dt>Période</dt>
                <dd>01/03/2025 au 31/03/2025</dd>
              </div>
              <div className="rv-key">
                <dt>Consommation</dt>
                <dd>10 000 kWh</dd>
              </div>
              <div>
                <dt>Puissance souscrite</dt>
                <dd>120 kVA</dd>
              </div>
              <div>
                <dt>Montant TTC</dt>
                <dd>12 340,00 MAD</dd>
              </div>
            </dl>
            <span className="rv-scanline" />
          </div>
          <ul className="rv-meta">
            <li>
              <small>Déposée par</small>Services généraux
            </li>
            <li>
              <small>Rangée dans</small>Site de production, électricité
            </li>
            <li>
              <small>Pièce</small>PDF, 1 page
            </li>
          </ul>
          <div className="rv-checks">
            <p className="rv-row">
              <span>Électricité, mars 2025</span>
              <strong>10 000 kWh</strong>
              <em className="tag ok">Vérifié</em>
            </p>
            <p className="rv-row rv-flag">
              <span>Facture de mars saisie deux fois</span>
              <span className="rv-swap">
                <em className="tag wait">À vérifier</em>
                <em className="tag ok">Doublon retiré</em>
              </span>
            </p>
          </div>
        </div>

        {/* 3: the calculation */}
        <div className="rv-layer rv-calc">
          <p className="rv-calc-k">Scope 2, électricité achetée</p>
          <div className="rv-eq">
            <span className="rv-term">
              <small>Quantité</small>
              <strong>10 000</strong>
              <em>kWh</em>
            </span>
            <b>×</b>
            <span className="rv-term">
              <small>Facteur</small>
              <strong>0,551</strong>
              <em>kgCO₂e/kWh</em>
            </span>
            <b>=</b>
            <span className="rv-term is-result">
              <small>Résultat</small>
              <strong>5,51</strong>
              <em>tCO₂e</em>
            </span>
          </div>
          <ul className="rv-trace">
            <li>
              <small>Pièce</small>Facture N° 2025-03-0417
            </li>
            <li>
              <small>Source du facteur</small>Réseau électrique, Maroc 2024
            </li>
            <li>
              <small>Version</small>1, revue le 14/04/2025
            </li>
          </ul>
        </div>

        {/* 4: the scopes */}
        <div className="rv-layer rv-scopes">
          <p className="rv-total readout">
            2 910<small>tCO₂e en 2025</small>
          </p>
          <ul className="rv-bars">
            <li style={{ ["--w" as string]: "14%" }}>
              <span>Scope 1, opérations</span>
              <strong>412 t</strong>
              <i />
            </li>
            <li className="is-hot" style={{ ["--w" as string]: "19%" }}>
              <span>Scope 2, électricité</span>
              <strong>538 t</strong>
              <i />
              <b className="rv-token">+5,51 t</b>
            </li>
            <li style={{ ["--w" as string]: "67%" }}>
              <span>Scope 3, chaîne de valeur</span>
              <strong>1 960 t</strong>
              <i />
            </li>
          </ul>
          <p className="rv-note">Dont 14 % estimés, méthodes indiquées</p>
        </div>

        {/* 5: trajectory and report */}
        <div className="rv-layer rv-plan">
          <svg className="rv-traj" viewBox="0 0 520 170">
            <path className="rv-traj-grid" d="M0 20 H520 M0 85 H520 M0 150 H520" />
            <path className="rv-traj-trend" d="M10 40 L 510 28" />
            <path className="rv-traj-plan" d="M10 40 C 160 46, 300 80, 510 118" pathLength={1} />
            <circle cx="510" cy="118" r="6" />
          </svg>
          <p className="rv-plan-k">
            <strong className="readout">−30 %</strong>
            <span>trajectoire 2030, plan d’exemple</span>
          </p>
          <ul className="rv-docs">
            <li>
              <i />
              Rapport de bilan
            </li>
            <li>
              <i />
              Annexe méthodologique
            </li>
            <li>
              <i />
              Fiche produit MACF
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export function Releve() {
  const section = useRef<HTMLElement>(null);
  const [stage, setStage] = useState(0);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const element = section.current;
    if (!element) return;
    const wide = window.matchMedia("(min-width: 1000px) and (min-height: 620px)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    let last = -1;
    let top = 0;
    const gauge = element.querySelector<HTMLElement>(".releve-gauge");
    let travel = 1;
    const geometry = () => {
      const rect = element.getBoundingClientRect();
      top = rect.top + window.scrollY;
      travel = Math.max(1, rect.height - window.innerHeight);
    };
    const measure = (y: number) => {
      if (!wide.matches || calm.matches) return;
      const p = Math.min(1, Math.max(0, (y - top) / travel));
      // Only the gauge reads the progress: write it there, not on the whole section.
      if (gauge) gauge.style.setProperty("--rp", p.toFixed(4));
      const next = Math.min(STEPS.length - 1, Math.floor(p * STEPS.length * 0.999));
      if (next !== last) {
        last = next;
        setStage(next);
      }
    };
    const refresh = () => {
      requestAnimationFrame(() => {
        geometry();
        requestScrollFrame();
      });
    };
    const mode = () => {
      setPinned(wide.matches && !calm.matches);
      refresh();
    };
    mode();
    const sizes = new ResizeObserver(refresh);
    sizes.observe(document.body);
    const stop = onScrollFrame(measure);
    window.addEventListener("resize", refresh);
    wide.addEventListener?.("change", mode);
    calm.addEventListener?.("change", mode);
    return () => {
      stop();
      sizes.disconnect();
      window.removeEventListener("resize", refresh);
      wide.removeEventListener?.("change", mode);
      calm.removeEventListener?.("change", mode);
    };
  }, []);

  // Choosing a step scrolls the pinned story to it.
  function go(index: number) {
    const element = section.current;
    if (!element || !pinned) return;
    const vh = window.innerHeight;
    const travel = element.offsetHeight - vh;
    const top = element.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + travel * ((index + 0.5) / STEPS.length), behavior: "smooth" });
  }

  return (
    <section
      ref={section}
      className={`chapter s-night releve ${pinned ? "is-pinned" : ""}`}
      id="releve"
      aria-labelledby="releve-title"
      style={{ ["--steps" as string]: STEPS.length }}
    >
      <div className="releve-pin">
        <div className="wrap releve-grid">
          <div className="releve-copy">
            <Focus className="t-h2" id="releve-title">
              De la facture à la décision.
            </Focus>
            <p className="t-lead" data-reveal="rise">
              Suivez une facture d’électricité dans SPS-CARBON, de son dépôt au rapport.
            </p>
            <ol className="releve-steps">
              {STEPS.map((step, index) => (
                <li key={step.id} className={index === stage ? "is-on" : index < stage ? "is-past" : ""}>
                  <button type="button" onClick={() => go(index)} aria-current={pinned && index === stage ? "step" : undefined} tabIndex={pinned ? 0 : -1}>
                    <span className="releve-step-name">{step.name}</span>
                    <span className="releve-step-title">{step.title}</span>
                  </button>
                  <p className="releve-step-text">{step.text}</p>
                  <div className="releve-step-visual">
                    <ReleveVisual stage={index} />
                  </div>
                </li>
              ))}
            </ol>
            {pinned && (
              <p className="releve-now" key={stage} aria-hidden="true">
                {STEPS[stage].text}
              </p>
            )}
          </div>
          <div className="releve-stage">
            <div className="releve-gauge" aria-hidden="true">
              <i />
            </div>
            <ReleveVisual stage={stage} />
          </div>
        </div>
      </div>
    </section>
  );
}
