"use client";

import { useEffect, useRef, useState } from "react";
import { Reading } from "./reading";
import { useInView, useReducedMotion } from "./motion";

/*
 * Before / with SPS-CARBON. Drag (or use the arrow keys) to wipe from the
 * scattered spreadsheets most companies start with to the same data organised
 * in the platform. On first view the divider sweeps once to show it can move.
 * Illustration only: fictitious data.
 */

const rows = [
  { label: "Électricité, 12 mois", source: "factures_2025.pdf", status: "Validé", tone: "ok" },
  { label: "Gasoil de la flotte", source: "bons_carburant.xlsx", status: "Validé", tone: "ok" },
  { label: "Achats de matières", source: "export_achats.csv", status: "Reçu", tone: "in" },
  { label: "Transport sous-traité", source: "En attente du site 2", status: "À compléter", tone: "todo" },
] as const;

export function BeforeAfter() {
  const stage = useRef<HTMLDivElement>(null);
  const [x, setX] = useState(50);
  const [live, setLive] = useState(false);
  const touched = useRef(false);
  const dragging = useRef(false);
  const reduced = useReducedMotion();

  // Reveal once in view, then sweep the divider to show it can move.
  const seen = useInView(stage, "0px 0px -28% 0px");
  useEffect(() => {
    if (!seen) return;
    setLive(true);
    if (reduced || touched.current) return;
    let sweep = 0;
    const keys = [50, 80, 22, 50];
    const start = performance.now() + 500;
    const step = 900;
    // The sweep writes the divider position straight to the figure (no re-render
    // per frame); React takes over again when it ends or when the visitor drags.
    const figure = stage.current?.parentElement;
    const tick = (now: number) => {
      if (touched.current) return;
      const t = Math.max(0, now - start) / step;
      const i = Math.min(Math.floor(t), keys.length - 2);
      const f = Math.min(t - i, 1);
      const e = f < 0.5 ? 4 * f * f * f : 1 - Math.pow(-2 * f + 2, 3) / 2;
      const value = keys[i] + (keys[i + 1] - keys[i]) * e;
      figure?.style.setProperty("--x", `${value}%`);
      if (t < keys.length - 1) sweep = requestAnimationFrame(tick);
      else setX(value);
    };
    sweep = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(sweep);
  }, [seen, reduced]);

  function moveTo(clientX: number) {
    const rect = stage.current?.getBoundingClientRect();
    if (!rect) return;
    setX(Math.min(97, Math.max(3, ((clientX - rect.left) / rect.width) * 100)));
  }

  function onKey(event: React.KeyboardEvent) {
    const steps: Record<string, number> = { ArrowLeft: -5, ArrowDown: -5, ArrowRight: 5, ArrowUp: 5, PageDown: -20, PageUp: 20 };
    let next: number | null = null;
    if (event.key in steps) next = x + steps[event.key];
    if (event.key === "Home") next = 3;
    if (event.key === "End") next = 97;
    if (next === null) return;
    event.preventDefault();
    touched.current = true;
    stage.current?.parentElement?.style.removeProperty("--x");
    setX(Math.min(97, Math.max(3, next)));
  }

  const value = Math.round(x);

  return (
    <figure className={`ba ${live ? "is-live" : ""}`} style={{ ["--x" as string]: `${x}%`, ["--x-n" as string]: x }}>
      <div
        className="ba-stage"
        ref={stage}
        onPointerDown={(event) => {
          if (event.button !== 0) return;
          touched.current = true;
          event.currentTarget.parentElement?.style.removeProperty("--x");
          dragging.current = true;
          event.currentTarget.setPointerCapture(event.pointerId);
          moveTo(event.clientX);
        }}
        onPointerMove={(event) => {
          if (dragging.current) moveTo(event.clientX);
        }}
        onPointerUp={() => {
          dragging.current = false;
        }}
        onPointerCancel={() => {
          dragging.current = false;
        }}
      >
        {/* Before: what most companies start from */}
        <div className="ba-layer ba-before" aria-hidden="true">
          <div className="ba-sheet">
            <p className="ba-file">bilan_carbone_v3_FINAL(2).xlsx</p>
            <div className="ba-grid">
              <span>Site</span>
              <span>Mois</span>
              <span>kWh</span>
              <span>tCO₂e</span>
              <span>Usine</span>
              <span>janv.</span>
              <span>10 412</span>
              <span>5,2</span>
              <span>Usine</span>
              <span>févr.</span>
              <span className="is-bad">?</span>
              <span className="is-bad ba-ref">#REF!</span>
              <span>Dépôt</span>
              <span>mars</span>
              <span>3 870</span>
              <span className="is-empty" />
              <span>Usine</span>
              <span>avr.</span>
              <span>9 960</span>
              <span className="is-warn">4,9 ?</span>
            </div>
          </div>
          <div className="ba-mail">
            <p className="ba-mail-subject">RE: TR: RE: factures électricité ?</p>
            <p>Je n’ai que janvier à juin. La suite est chez le site 2, je crois.</p>
          </div>
          <ul className="ba-files">
            <li>carburant_flotte_OK?.xlsx</li>
            <li>facteurs_2019.pdf</li>
            <li>achats_export_brut.csv</li>
            <li>bilan_v2_relu_DG.docx</li>
          </ul>
          <p className="ba-note">Quel facteur pour le gasoil ?</p>
        </div>

        {/* With SPS-CARBON: the same data, organised */}
        <div className="ba-layer ba-after" aria-hidden="true">
          <div className="ba-app">
            <p className="ba-app-bar">
              <span className="ba-app-dot" />
              Atelier Atlas, bilan 2025
              <em className="demo-chip">Données d’exemple</em>
            </p>
            <div className="ba-app-body">
              <ul className="ba-rows">
                {rows.map((row, n) => (
                  <li key={row.label} style={{ ["--i" as string]: n }}>
                    <span>
                      <strong>{row.label}</strong>
                      <small>{row.source}</small>
                    </span>
                    <b className={`ba-chip is-${row.tone}`}>{row.status}</b>
                  </li>
                ))}
              </ul>
              <div className="ba-total">
                <small>Émissions totales</small>
                <p>
                  <Reading value={2910} className="readout" />
                  <span>tCO₂e</span>
                </p>
                <div className="ba-bar">
                  <i style={{ ["--w" as string]: "14%" }} />
                  <i style={{ ["--w" as string]: "19%" }} />
                  <i style={{ ["--w" as string]: "67%" }} />
                </div>
                <p className="ba-legend">
                  <span>Scope 1</span>
                  <span>Scope 2</span>
                  <span>Scope 3</span>
                </p>
                <p className="ba-proof">Chaque chiffre renvoie à sa pièce justificative.</p>
                <div className="ba-months">
                  <small>Émissions mensuelles</small>
                  <div>
                    {[62, 58, 66, 70, 64, 72, 80, 76, 68, 60, 56, 54].map((h, n) => (
                      <i key={n} style={{ height: `${h}%`, ["--i" as string]: n }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <span className="ba-tag ba-tag-before" aria-hidden="true">
          Sans plateforme
        </span>
        <span className="ba-tag ba-tag-after" aria-hidden="true">
          Avec SPS-CARBON
        </span>

        <span className="ba-line" aria-hidden="true" />
        <div
          className="ba-handle"
          role="slider"
          tabIndex={0}
          aria-label="Comparer : sans plateforme, avec SPS-CARBON"
          aria-valuemin={3}
          aria-valuemax={97}
          aria-valuenow={value}
          aria-valuetext={`${100 - value} % de l’image montre SPS-CARBON`}
          onKeyDown={onKey}
        >
          <span className="ba-knob">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M9 7 4 12l5 5 M15 7l5 5-5 5" />
            </svg>
          </span>
        </div>
      </div>
      <figcaption className="ba-caption">
        <span>Glissez pour comparer.</span> Les mêmes données : à gauche, dispersées dans des fichiers et des courriels ; à
        droite, collectées, contrôlées et reliées à leurs sources dans SPS-CARBON. Illustration avec des données d’exemple.
      </figcaption>
    </figure>
  );
}
