"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";

/*
 * Home hero, "Instrument": the product is the hero. A glass dashboard lies in
 * perspective under the headline; three glass cards float above it and drift
 * with the pointer (fine pointers only, never under reduced motion). The
 * reduction goal is a real control: the 2030 projection and the example plan
 * recalculate as it moves. Fictional company and figures, labelled as such.
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

export function HeroInstrument() {
  const [goal, setGoal] = useState(30);
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
    const onMove = (event: PointerEvent) => {
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

  const xs = [12, 167, 322, 477, 632, 788];
  const trend = xs.map((x, i) => [x, y(BASE * Math.pow(1.012, i))]);
  const plan = xs.map((x, i) => [x, y(BASE * (1 - (goal / 100) * Math.pow(i / 5, 1.25)))]);
  const planD = line(plan);
  const t2030 = Math.round(BASE * (1 - goal / 100));
  const progress = { ["--p" as string]: `${((goal / 45) * 100).toFixed(1)}%` } as CSSProperties;

  return (
    <section className="hero hero-i t-deep" aria-labelledby="hero-title">
      <div className="hero-i-light" aria-hidden="true" />
      <div className="wrap hero-i-head">
        <Link href="/outils" className="hero-i-news">
          <span>Nouveau</span>
          Calculateur express et vérificateur MACF, gratuits
        </Link>
        <h1 id="hero-title" className="hero-i-title">
          <span className="line">
            <span>Votre bilan carbone,</span>
          </span>
          <span className="line">
            <span>enfin pilotable.</span>
          </span>
        </h1>
        <p className="hero-i-lead">
          Collecte, contrôle, calcul des Scopes 1, 2 et 3 et plan d’action dans un seul espace, pour les entreprises au
          Maroc, avec l’appui d’un cabinet QHSE et RSE.
        </p>
        <div className="hero-i-actions">
          <Link className="btn btn-dark" href="/contact">
            Parlons de votre projet
          </Link>
          <Link className="btn btn-glass" href="/plateforme#demonstration">
            Essayer la démonstration
          </Link>
        </div>
        <ul className="hero-trust" aria-label="Cadres de référence de la méthode">
          {["GHG Protocol", "ISO 14064-1", "MACF / CBAM", "Loi 09-08"].map((name) => (
            <li key={name}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m5 12 4 4L19 6" />
              </svg>
              {name}
            </li>
          ))}
        </ul>
        <p className="hero-i-status">
          <span className="status-dot" aria-hidden="true" />
          Plateforme en développement. Les écrans présentés utilisent des données fictives.
        </p>
      </div>

      <div className="hero-i-stage" ref={stage}>
        <div className="hero-i-deck glass" aria-hidden="true">
          <div className="hid-side">
            <p className="hid-org">
              <span>AA</span>
              Atelier Atlas
            </p>
            <span className="is-on">Vue d’ensemble</span>
            <span>Collecte</span>
            <span>Contrôles</span>
            <span>Plan d’action</span>
            <span>Rapports</span>
          </div>
          <div className="hid-main">
            <div className="hid-top">
              <div>
                <p className="hid-k">Projection 2030, objectif −{goal} %</p>
                <p className="hid-total">
                  <strong>{nf.format(t2030)}</strong>
                  <span>tCO₂e</span>
                </p>
              </div>
              <p className="hid-note">Bilan 2025 : 2 910 tCO₂e, entreprise fictive</p>
            </div>
            <svg className="hid-chart" viewBox="0 0 800 220" preserveAspectRatio="none">
              <defs>
                <linearGradient id="hidArea" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor="#29C792" stopOpacity="0.32" />
                  <stop offset="1" stopColor="#29C792" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path className="hid-grid" d="M0 44 H800 M0 110 H800 M0 176 H800" />
              <path className="hid-trend" d={line(trend)} />
              <path d={`${planD} L 788 220 L 12 220 Z`} fill="url(#hidArea)" />
              <path className="hid-plan" d={planD} />
              <circle className="hid-end" cx="788" cy={plan[5][1].toFixed(1)} r="7" />
            </svg>
            <div className="hid-years">
              {YEARS.map((year) => (
                <span key={year}>{year}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="hero-i-float hif-quality glass" aria-hidden="true">
          <p className="hif-title">
            <i className="hif-hex is-amber" />
            Contrôle qualité
          </p>
          <p className="hif-sub">2 points à vérifier avant le calcul</p>
          <span className="hif-alert">Facture de mars saisie deux fois</span>
          <span className="hif-alert">Gaz déclaré en m³ au lieu de kg</span>
        </div>

        <div className="hero-i-float hif-goal glass">
          <label htmlFor="hero-goal" className="hif-title">
            Objectif de réduction 2030
          </label>
          <p className="hif-value" aria-live="polite">
            <strong>−{goal} %</strong>
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
          <ul className="hif-actions">
            {ACTIONS.map((action) => (
              <li key={action.name} className={goal >= action.from ? "is-in" : ""}>
                <span>{action.name}</span>
                <strong>{goal >= action.from ? "Dans le plan" : "Non retenue"}</strong>
              </li>
            ))}
          </ul>
          <p className="hif-foot">Plan d’exemple : les effets se chiffrent avec vous.</p>
        </div>

        <div className="hero-i-float hif-proof glass" aria-hidden="true">
          <p className="hif-title">Électricité, mars 2025</p>
          <p className="hif-eq">
            <span>10 000 kWh</span>
            <b>×</b>
            <span>0,551</span>
            <b>=</b>
            <strong>5,51 t</strong>
          </p>
          <p className="hif-sub">Facture jointe, facteur sourcé, version 1</p>
        </div>
      </div>

    </section>
  );
}
