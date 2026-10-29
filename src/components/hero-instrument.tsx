"use client";

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import Link from "next/link";
import { Focus } from "./focus";
import { Reading } from "./reading";

/*
 * Home hero, "Instrument de précision": the product is the hero. A glass
 * dashboard is read by a scan line as the page opens, then settles flat as the
 * page scrolls (--hp). Three glass cards float above it and drift with the
 * pointer (fine pointers only, never under reduced motion). The reduction goal
 * is a real control: the 2030 projection, the curve and the example plan
 * follow it, and the figures settle like a meter needle. Hovering the chart
 * reads any year. Fictional company and figures, labelled as such.
 */

const BASE = 2910;
const YEARS = [2025, 2026, 2027, 2028, 2029, 2030];
const ACTIONS = [
  { name: "Variateurs sur les compresseurs", from: 5 },
  { name: "Récupération de chaleur des fours", from: 15 },
  { name: "Optimisation des tournées", from: 25 },
  { name: "Électricité renouvelable", from: 35 },
];

const nf = new Intl.NumberFormat("fr-FR");
const y = (t: number) => 22 + ((3200 - t) / 1700) * 176;
const line = (pts: number[][]) => pts.map((p, i) => `${i ? "L" : "M"} ${p[0]} ${p[1].toFixed(1)}`).join(" ");
const XS = [12, 167, 322, 477, 632, 788];

export function HeroInstrument() {
  const [goal, setGoal] = useState(30);
  const [read, setRead] = useState<number | null>(null);
  const stage = useRef<HTMLDivElement>(null);

  // Pointer drift, written to CSS variables (no re-render per frame).
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let nx = 0;
    let ny = 0;
    const apply = () => {
      frame = 0;
      el.style.setProperty("--mx", nx.toFixed(3));
      el.style.setProperty("--my", ny.toFixed(3));
    };
    const onMove = (event: globalThis.PointerEvent) => {
      if (!fine.matches || calm.matches) return;
      nx = (event.clientX / window.innerWidth - 0.5) * 2;
      ny = (event.clientY / window.innerHeight - 0.5) * 2;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  const value = (i: number) => BASE * (1 - (goal / 100) * Math.pow(i / 5, 1.25));
  const trendValue = (i: number) => BASE * Math.pow(1.012, i);
  const trend = XS.map((x, i) => [x, y(trendValue(i))]);
  const plan = XS.map((x, i) => [x, y(value(i))]);
  const planD = line(plan);
  const t2030 = Math.round(BASE * (1 - goal / 100));
  const progress = { ["--p" as string]: `${((goal / 45) * 100).toFixed(1)}%` } as CSSProperties;

  function onChart(event: PointerEvent<SVGSVGElement>) {
    const box = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - box.left) / box.width) * 800;
    let best = 0;
    XS.forEach((px, i) => {
      if (Math.abs(px - x) < Math.abs(XS[best] - x)) best = i;
    });
    setRead(best);
  }

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="wrap hero-head">
        <Focus as="h1" id="hero-title" className="t-display hero-title" delay={120}>
          Votre bilan carbone, enfin pilotable.
        </Focus>
        <p className="t-lead hero-lead" data-reveal="rise" style={{ ["--i" as string]: 4 }}>
          Collecte, contrôle, calcul des Scopes 1, 2 et 3 et plan d’action dans un seul espace, pour les entreprises au Maroc,
          avec l’appui d’un cabinet QHSE et RSE.
        </p>
        <div className="hero-actions" data-reveal="rise" style={{ ["--i" as string]: 5 }}>
          <Link className="btn" href="/contact">
            Parlons de votre projet
          </Link>
          <Link className="btn btn-quiet" href="/plateforme#demonstration">
            Essayer la démonstration
          </Link>
        </div>
        <Link
          href="/normes"
          className="hero-calib"
          data-reveal="rise"
          style={{ ["--i" as string]: 6 }}
          aria-label="Référentiels de la méthode : GHG Protocol, ISO 14064-1, MACF / CBAM et loi 09-08. Voir les normes expliquées."
        >
          <span className="hero-calib-label">Référentiels</span>
          {["GHG Protocol", "ISO 14064-1", "MACF / CBAM", "Loi 09-08"].map((name) => (
            <span key={name} className="hero-calib-item">
              {name}
            </span>
          ))}
        </Link>
      </div>

      <div className="hero-stage" ref={stage}>
        <div className="hero-deck" aria-hidden="true">
          <div className="hero-deck-glass" data-reveal="scan" style={{ ["--scan-delay" as string]: "380ms" }}>
            <div className="hd-side">
              <p className="hd-org">
                <span>AA</span>
                Atelier Atlas
              </p>
              <span className="is-on">Vue d’ensemble</span>
              <span>Collecte</span>
              <span>Contrôles</span>
              <span>Plan d’action</span>
              <span>Rapports</span>
            </div>
            <div className="hd-main">
              <div className="hd-top">
                <div>
                  <p className="hd-k">Projection 2030, objectif −{goal} %</p>
                  <p className="hd-total readout">
                    <Reading value={t2030} from={BASE} />
                    <small>tCO₂e</small>
                  </p>
                </div>
                <span className="demo-chip">Entreprise fictive, données d’exemple</span>
              </div>
              <div className="hd-chart-wrap">
                <svg
                  className="hd-chart"
                  viewBox="0 0 800 220"
                  preserveAspectRatio="none"
                  onPointerMove={onChart}
                  onPointerLeave={() => setRead(null)}
                >
                  <defs>
                    <linearGradient id="hdArea" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0" stopColor="#25c691" stopOpacity="0.3" />
                      <stop offset="1" stopColor="#25c691" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path className="hd-grid" d="M0 44 H800 M0 110 H800 M0 176 H800" />
                  <path className="hd-trend" d={line(trend)} />
                  <path className="hd-area" d={`${planD} L 788 220 L 12 220 Z`} fill="url(#hdArea)" />
                  <path className="hd-plan" d={planD} />
                  {/* Dots are zero-length round strokes: they stay round in a stretched chart. */}
                  <path className="hd-end" d={`M788 ${plan[5][1].toFixed(1)} l0.001 0`} />
                  <path className="hd-end-core" d={`M788 ${plan[5][1].toFixed(1)} l0.001 0`} />
                  {read !== null && (
                    <g className="hd-cross">
                      <line x1={XS[read]} x2={XS[read]} y1="0" y2="220" />
                      <path className="hd-cross-ring" d={`M${XS[read]} ${plan[read][1].toFixed(1)} l0.001 0`} />
                      <path className="hd-cross-dot" d={`M${XS[read]} ${plan[read][1].toFixed(1)} l0.001 0`} />
                    </g>
                  )}
                </svg>
                {read !== null && (
                  <p
                    className="hd-read"
                    style={{ left: `${(XS[read] / 800) * 100}%`, ["--side" as string]: read > 3 ? "-100%" : "0%" }}
                  >
                    <strong>{YEARS[read]}</strong>
                    <span>Plan : {nf.format(Math.round(value(read)))} t</span>
                    <span>Tendance : {nf.format(Math.round(trendValue(read)))} t</span>
                  </p>
                )}
              </div>
              <div className="hd-years">
                {YEARS.map((year) => (
                  <span key={year}>{year}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="hero-float hf-quality" aria-hidden="true">
          <p className="hf-title">
            <i className="hf-dot is-check" />
            Contrôle qualité
          </p>
          <p className="hf-sub">2 points à vérifier avant le calcul</p>
          <span className="hf-alert">Facture de mars saisie deux fois</span>
          <span className="hf-alert">Gaz déclaré en m³ au lieu de kg</span>
        </div>

        <div className="hero-float hf-goal">
          <label htmlFor="hero-goal" className="hf-title">
            Objectif de réduction 2030
          </label>
          <p className="hf-value" aria-live="polite">
            <strong className="readout">−{goal} %</strong>
            <span>{nf.format(t2030)} tCO₂e en 2030</span>
          </p>
          <input
            id="hero-goal"
            className="range"
            type="range"
            min={0}
            max={45}
            step={1}
            value={goal}
            style={progress}
            onChange={(event) => setGoal(Number(event.target.value))}
            aria-valuetext={`Réduction de ${goal} %, ${nf.format(t2030)} tonnes en 2030`}
          />
          <ul className="hf-actions">
            {ACTIONS.map((action) => (
              <li key={action.name} className={goal >= action.from ? "is-in" : ""}>
                <span>{action.name}</span>
                <strong>{goal >= action.from ? "Dans le plan" : "Non retenue"}</strong>
              </li>
            ))}
          </ul>
          <p className="hf-foot">Plan d’exemple : les effets se chiffrent avec vous.</p>
        </div>

        <div className="hero-float hf-proof" aria-hidden="true">
          <p className="hf-title">Électricité, mars 2025</p>
          <p className="hf-eq">
            <span>10 000 kWh</span>
            <b>×</b>
            <span>0,551</span>
            <b>=</b>
            <strong>5,51 t</strong>
          </p>
          <p className="hf-sub">Facture jointe, facteur sourcé, version 1</p>
        </div>
      </div>
    </section>
  );
}
