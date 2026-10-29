"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Icon } from "./icons";
import { Reading } from "./reading";
import { useInView } from "./motion";
import { type DemoView, electricityKwh, fuelLitres, illustrativeFactors, months, formatNumber } from "@/lib/demo-data";

/*
 * Interactive product demo: the client's workspace as it is designed to look.
 * Fictional company, illustrative factors. Every figure is computed from demo-data.
 */

const views = [
  { id: "overview", label: "Vue d’ensemble", icon: "chart" },
  { id: "electricity", label: "Électricité", icon: "electric" },
  { id: "fuel", label: "Carburants", icon: "fuel" },
] as const;

const elec = electricityKwh.map((kwh) => (kwh * illustrativeFactors.electricity) / 1000);
const fuel = fuelLitres.map((litres) => (litres * illustrativeFactors.fuel) / 1000);
const sum = (values: number[]) => values.reduce((total, value) => total + value, 0);
const totals = { electricity: sum(elec), fuel: sum(fuel), overview: sum(elec) + sum(fuel) };
const max = Math.max(...elec.map((value, i) => value + fuel[i]));

const proofs = {
  overview: {
    title: "Total : deux sources, deux calculs",
    lines: [
      ["Électricité", "120 000 kWh", "0,5 kgCO₂e/kWh", "60 t"],
      ["Carburants", "16 000 L", "2,5 kgCO₂e/L", "40 t"],
    ],
  },
  electricity: { title: "Électricité : le calcul", lines: [["Électricité", "120 000 kWh", "0,5 kgCO₂e/kWh", "60 t"]] },
  fuel: { title: "Carburants : le calcul", lines: [["Gasoil", "16 000 L", "2,5 kgCO₂e/L", "40 t"]] },
} as const;

export function ProductPreview() {
  const [view, setView] = useState<DemoView>("overview");
  const [month, setMonth] = useState<number | null>(null);
  const [proof, setProof] = useState(false);
  const [live, setLive] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const showElec = view !== "fuel";
  const showFuel = view !== "electricity";
  const total = totals[view];
  const share = totals.electricity / totals.overview;
  const circumference = 2 * Math.PI * 52;

  const seen = useInView(root, "0px 0px -25% 0px");
  useEffect(() => {
    if (seen) setLive(true);
  }, [seen]);

  function choose(next: DemoView) {
    setView(next);
    setMonth(null);
    setProof(false);
  }

  function onTabKey(event: KeyboardEvent<HTMLButtonElement>) {
    if (!["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft"].includes(event.key)) return;
    event.preventDefault();
    const ids: DemoView[] = ["overview", "electricity", "fuel"];
    const forward = event.key === "ArrowDown" || event.key === "ArrowRight";
    const next = ids[(ids.indexOf(view) + (forward ? 1 : 2)) % 3];
    choose(next);
    document.getElementById(`demo-tab-${next}`)?.focus();
  }

  const hovered = month !== null ? { e: elec[month], f: fuel[month] } : null;
  const trend = (view === "fuel" ? fuel : view === "electricity" ? elec : elec.map((v, i) => v + fuel[i]));
  const trendMax = Math.max(...trend);
  const trendPath = trend
    .map((value, i) => `${i ? "L" : "M"}${(i / 11) * 100} ${36 - (value / trendMax) * 30}`)
    .join(" ");

  return (
    <div className={`app ${live ? "is-live" : ""}`} ref={root} data-view={view}>
      <div className="app-chrome" aria-hidden="true">
        <span className="app-lights">
          <i />
          <i />
          <i />
        </span>
        <span className="app-crumb">SPS-CARBON / Atelier Atlas / Bilan 2025</span>
        <span className="demo-chip app-fict">Démonstration, données d’exemple</span>
      </div>

      <div className="app-shell">
        <aside className="app-nav">
          <div className="app-org">
            <span aria-hidden="true">AA</span>
            <div>
              Atelier Atlas
              <small>Entreprise fictive</small>
            </div>
          </div>
          <p className="app-nav-label">Émissions</p>
          <div className="app-tabs" role="tablist" aria-label="Source d’émission" aria-orientation="vertical">
            {views.map((item) => (
              <button
                key={item.id}
                id={`demo-tab-${item.id}`}
                role="tab"
                aria-selected={view === item.id}
                aria-controls="demo-panel"
                tabIndex={view === item.id ? 0 : -1}
                onClick={() => choose(item.id)}
                onKeyDown={onTabKey}
              >
                <Icon name={item.icon} />
                {item.label}
              </button>
            ))}
          </div>
          <div className="app-nav-static" aria-hidden="true">
            <p className="app-nav-label">Démarche</p>
            <span>
              Collecte <em>12/12 mois</em>
            </span>
            <span>
              Contrôles <em className="warn">2</em>
            </span>
            <span>Plan d’action</span>
            <span>Rapports</span>
          </div>
        </aside>

        <div className="app-main" id="demo-panel" role="tabpanel" aria-labelledby={`demo-tab-${view}`}>
          <div className="app-head">
            <div>
              <p>Bilan 2025, périmètre illustré</p>
              <h3>{views.find((item) => item.id === view)?.label}</h3>
            </div>
            <button className="app-proof-btn" onClick={() => setProof(!proof)} aria-expanded={proof} aria-controls="demo-proof">
              <Icon name="search" />
              {proof ? "Fermer le calcul" : "D’où vient ce chiffre ?"}
            </button>
          </div>

          <div className="app-kpis">
            <div className="app-kpi app-kpi-main">
              <span>Émissions de la période</span>
              <strong className="readout">
                <Reading value={Math.round(total)} />
                <small>tCO₂e</small>
              </strong>
              <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="app-spark" aria-hidden="true">
                <path d={trendPath} pathLength={1} key={view} />
              </svg>
            </div>
            <div className="app-kpi">
              <span>Couverture des données</span>
              <strong className="app-kpi-mid">12/12</strong>
              <em>mois renseignés</em>
            </div>
            <div className="app-kpi app-kpi-warn">
              <span>À examiner</span>
              <strong className="app-kpi-mid">Achats, transport</strong>
              <em>Hors de cet exemple</em>
            </div>
          </div>

          <div className="app-panels">
            <div className="app-chart-card">
              <div className="app-card-head">
                <h4>Émissions mensuelles</h4>
                <span aria-live="polite">
                  {hovered
                    ? `${months[month!]} : ${formatNumber((showElec ? hovered.e : 0) + (showFuel ? hovered.f : 0), 2)} tCO₂e`
                    : "tCO₂e par mois"}
                </span>
              </div>
              <div className="app-bars" role="group" aria-label="Émissions mensuelles, exemple fictif">
                {months.map((label, i) => {
                  const e = showElec ? elec[i] : 0;
                  const f = showFuel ? fuel[i] : 0;
                  return (
                    <button
                      key={label}
                      className={`app-col ${month === i ? "is-active" : ""}`}
                      style={{ ["--i" as string]: i }}
                      onMouseEnter={() => setMonth(i)}
                      onMouseLeave={() => setMonth(null)}
                      onFocus={() => setMonth(i)}
                      onBlur={() => setMonth(null)}
                      onClick={() => setMonth(i)}
                      aria-label={`${label} : ${formatNumber(e + f, 2)} tonnes CO2e, exemple fictif`}
                    >
                      <span className="app-stack">
                        <span className="seg-f" style={{ height: `${(f / max) * 100}%` }} />
                        <span className="seg-e" style={{ height: `${(e / max) * 100}%` }} />
                      </span>
                      <span className="app-m">{label}</span>
                    </button>
                  );
                })}
              </div>
              <div className="app-legend" aria-hidden="true">
                <span className={showElec ? "" : "is-off"}>
                  <i className="k-e" /> Électricité
                </span>
                <span className={showFuel ? "" : "is-off"}>
                  <i className="k-f" /> Carburants
                </span>
              </div>
            </div>

            <div className="app-donut-card" aria-hidden="true">
              <div className="app-card-head">
                <h4>Répartition</h4>
              </div>
              <svg viewBox="0 0 140 140" className="app-donut">
                <circle cx="70" cy="70" r="52" className="d-track" />
                <circle
                  cx="70"
                  cy="70"
                  r="52"
                  className={`d-e ${view === "fuel" ? "is-dim" : ""}`}
                  strokeDasharray={`${share * circumference} ${circumference}`}
                />
                <circle
                  cx="70"
                  cy="70"
                  r="52"
                  className={`d-f ${view === "electricity" ? "is-dim" : ""}`}
                  strokeDasharray={`${(1 - share) * circumference} ${circumference}`}
                  strokeDashoffset={-share * circumference}
                />
                <text x="70" y="66" className="dn-v">
                  {view === "fuel" ? "40 %" : view === "electricity" ? "60 %" : "100 t"}
                </text>
                <text x="70" y="84" className="dn-l">
                  {view === "overview" ? "deux sources" : "du total"}
                </text>
              </svg>
              <ul className="app-shares">
                <li>
                  <i className="k-e" /> Électricité <strong>60 %</strong>
                </li>
                <li>
                  <i className="k-f" /> Carburants <strong>40 %</strong>
                </li>
              </ul>
            </div>
          </div>

          <div className={`app-proof ${proof ? "is-open" : ""}`} id="demo-proof" hidden={!proof}>
            <div className="app-proof-head">
              <strong>{proofs[view].title}</strong>
              <button onClick={() => setProof(false)} aria-label="Fermer le calcul">
                <Icon name="close" />
              </button>
            </div>
            {proofs[view].lines.map(([source, quantity, factor, result], i) => (
              <div className="app-eq" key={source} style={{ ["--i" as string]: i }}>
                <span className="eq-src">{source}</span>
                <span className="eq-q">{quantity}</span>
                <b>×</b>
                <span className="eq-f">{factor}</span>
                <b>=</b>
                <span className="eq-r">{result} CO₂e</span>
              </div>
            ))}
            <p>
              Conversion : 1 000 kgCO₂e = 1 tCO₂e. Facteurs illustratifs, sans valeur officielle : une mission réelle retient un
              facteur sourcé, daté et adapté au contexte marocain.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
