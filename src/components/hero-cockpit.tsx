"use client";

import { useEffect, useRef } from "react";
import { Odometer } from "./odometer";

/*
 * Hero: the platform at work. Field data (bills, fuel, purchases, freight) flies
 * into the workspace, gets checked, becomes Scope 1/2/3 totals and a trajectory.
 * One orchestrated sequence, then still; pointer adds depth. Fictional figures.
 */

const sources = [
  { label: "Facture d’électricité", value: "10 000 kWh", scope: "Scope 2" },
  { label: "Gasoil de la flotte", value: "1 400 L", scope: "Scope 1" },
  { label: "Achats de matières", value: "86 t", scope: "Scope 3" },
  { label: "Transport sous-traité", value: "12 400 t·km", scope: "Scope 3" },
];

const scopes = [
  { name: "Scope 1", value: 412, share: 14 },
  { name: "Scope 2", value: 538, share: 19 },
  { name: "Scope 3", value: 1960, share: 67 },
];

const months = [62, 58, 70, 66, 74, 71, 80, 72, 69, 67, 64, 60];

export function HeroCockpit() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let tilt = 0;
    const onMove = (event: PointerEvent) => {
      if (reduce || event.pointerType === "touch") return;
      const rect = element.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      cancelAnimationFrame(tilt);
      tilt = requestAnimationFrame(() => {
        element.style.setProperty("--tx", x.toFixed(3));
        element.style.setProperty("--ty", y.toFixed(3));
      });
    };
    const host = element.closest(".hero") ?? element;
    host.addEventListener("pointermove", onMove as EventListener);
    return () => {
      cancelAnimationFrame(tilt);
      host.removeEventListener("pointermove", onMove as EventListener);
    };
  }, []);

  return (
    <div className="cockpit" ref={root} aria-hidden="true">
      <div className="cockpit-sources">
        {sources.map((source, index) => (
          <div className="source-chip" key={source.label} style={{ ["--i" as string]: index }}>
            <span>{source.label}</span>
            <strong>{source.value}</strong>
            <em>{source.scope}</em>
          </div>
        ))}
      </div>

      <div className="cockpit-window">
        <div className="cockpit-top">
          <span className="cockpit-dot" />
          <span>Bilan carbone 2025</span>
          <span className="cockpit-company">Entreprise fictive</span>
        </div>
        <div className="cockpit-body">
          <div className="cockpit-total">
            <span>Émissions totales</span>
            <div>
              <Odometer value={2910} delay={2000} />
              <small>tCO₂e</small>
            </div>
          </div>
          <div className="cockpit-scopes">
            {scopes.map((scope, index) => (
              <div key={scope.name} className={`cockpit-scope s${index + 1}`}>
                <div className="cockpit-scope-head">
                  <span>{scope.name}</span>
                  <strong>{new Intl.NumberFormat("fr-FR").format(scope.value)} t</strong>
                </div>
                <div className="cockpit-track">
                  <span style={{ width: `${scope.share}%`, ["--i" as string]: index }} />
                </div>
              </div>
            ))}
          </div>
          <div className="cockpit-chart">
            <div className="cockpit-bars">
              {months.map((value, index) => (
                <span key={index} style={{ height: `${value}%`, ["--i" as string]: index }} />
              ))}
            </div>
            <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="cockpit-trajectory">
              <path d="M0 14 C 30 14, 55 22, 100 34" />
            </svg>
            <div className="cockpit-chart-legend">
              <span>Émissions mensuelles</span>
              <span>Trajectoire de réduction</span>
            </div>
          </div>
        </div>
      </div>

      <div className="cockpit-float float-check">
        <span className="float-icon warn">!</span>
        <div>
          <strong>Contrôle qualité</strong>
          <span>2 périodes à vérifier avant calcul</span>
        </div>
      </div>
      <div className="cockpit-float float-report">
        <span className="float-icon ok">✓</span>
        <div>
          <strong>Rapport prêt</strong>
          <span>Sources et facteurs documentés</span>
        </div>
      </div>
    </div>
  );
}
