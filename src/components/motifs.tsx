import type { CSSProperties } from "react";
import { hexPoints, SYMBOL_PATH } from "@/lib/geometry";
import { CoastMap } from "./coast-map";

/*
 * One signature animation per page, all drawn from the SPS-CARBON symbol:
 * the hexagonal carbon ring, the open C and its two parallel descending cuts.
 * Pure SVG + CSS keyframes: no JavaScript needed, final state under reduced motion.
 */

export type MotifName =
  | "collecte"
  | "perimetres"
  | "trajectoire"
  | "ancrage"
  | "reperes"
  | "clarte"
  | "conversation";

const v = (values: Record<string, string | number>) => values as CSSProperties;

function Collecte() {
  // Scattered data cells settle into an ordered register, then one thread reads them.
  const cols = 4;
  const units = ["kWh", "L", "m³", "kg", "t·km", "kWh", "L", "kWh"];
  const cells = Array.from({ length: 20 }, (_, i) => {
    const row = Math.floor(i / cols);
    const col = i % cols;
    const x = 70 + col * 46 + (row % 2 ? 23 : 0);
    const y = 150 + row * 40;
    const seed = Math.sin(i * 91.7) * 1000;
    const dx = ((seed - Math.floor(seed)) - 0.5) * 380;
    const dy = (((seed * 7) % 1) - 0.5) * 300 - 30;
    return { x, y, dx, dy, i };
  });
  const thread = cells.map((c, i) => `${i ? "L" : "M"}${c.x} ${c.y}`).join(" ") + " L392 230";
  return (
    <svg viewBox="0 0 480 480" className="motif motif-collecte">
      <path className="m-thread" d={thread} pathLength={1} />
      {cells.map((cell) => (
        <g key={cell.i} className="m-cell" style={v({ "--dx": `${cell.dx}px`, "--dy": `${cell.dy}px`, "--d": `${cell.i * 45}ms` })}>
          <polygon points={hexPoints(cell.x, cell.y, 17)} />
          {cell.i % 3 === 0 && (
            <text x={cell.x} y={cell.y + 4}>
              {units[(cell.i / 3) % units.length]}
            </text>
          )}
        </g>
      ))}
      <g className="m-result">
        <polygon points={hexPoints(392, 230, 58)} />
        <text x="392" y="230" className="m-result-value">tCO₂e</text>
        <text x="392" y="251" className="m-result-label">traçables</text>
      </g>
    </svg>
  );
}

function Perimetres() {
  return (
    <svg viewBox="0 0 480 480" className="motif motif-perimetres">
      <polygon className="m-ring r1" points={hexPoints(200, 250, 82)} pathLength={1} />
      <polygon className="m-ring r2" points={hexPoints(200, 250, 140)} pathLength={1} />
      <polygon className="m-ring r3" points={hexPoints(200, 250, 196)} pathLength={1} />
      <path className="m-spur" d="M200 250 L452 250" pathLength={1} />
      <rect className="m-product" x="414" y="232" width="36" height="36" />
      <g className="m-labels">
        <text x="200" y="244" className="l1">Scopes 1 et 2</text>
        <text x="200" y="264" className="l1 sub">Inventaire essentiel</text>
        <text x="200" y="140" className="l2">Scope 3</text>
        <text x="200" y="160" className="l2 sub">Chaîne de valeur</text>
        <text x="432" y="294" className="l3">MACF / CBAM</text>
        <text x="432" y="312" className="l3 sub">Produit exporté</text>
      </g>
    </svg>
  );
}

const methodSteps = ["Périmètre", "Sources", "Qualité", "Calcul", "Restitution", "Amélioration"];

function Trajectoire() {
  const slope = 7 / 12;
  const x0 = 30;
  const y0 = 110;
  return (
    <svg viewBox="0 0 480 480" className="motif motif-trajectoire">
      <path className="m-cut c1" d={`M${x0} ${y0} L460 ${y0 + 420 * slope}`} pathLength={1} />
      <path className="m-cut c2" d={`M${x0} ${y0 + 46} L460 ${y0 + 46 + 420 * slope}`} pathLength={1} />
      {methodSteps.map((label, i) => {
        const x = x0 + 30 + i * 74;
        const y = y0 + (x - x0) * slope;
        return (
          <g key={label} className="m-step" style={v({ "--d": `${700 + i * 220}ms` })}>
            <polygon points={hexPoints(x, y, 13)} />
            <text x={x} y={y + 4} className="m-step-n">
              {i + 1}
            </text>
            <text x={x - 2} y={y - 24} className="m-step-l">
              {label}
            </text>
          </g>
        );
      })}
      <g transform={`translate(${x0} ${y0}) rotate(${(Math.atan(slope) * 180) / Math.PI})`}>
        <circle className="m-runner" r="5" />
      </g>
    </svg>
  );
}

function Reperes() {
  const items = ["Période étudiée", "Sites et activités", "Factures d’électricité", "Carburants et combustibles", "Justificatifs conservés"];
  return (
    <svg viewBox="0 0 480 480" className="motif motif-reperes">
      <g className="m-sheet">
        <rect x="96" y="58" width="288" height="364" rx="6" />
        <path d={SYMBOL_PATH} transform="translate(124 84) scale(0.5)" className="m-sheet-mark" />
        <text x="166" y="104" className="m-sheet-title">Préparer mon inventaire</text>
        <line x1="124" x2="356" y1="132" y2="132" className="m-sheet-rule" />
      </g>
      {items.map((item, i) => {
        const y = 176 + i * 50;
        return (
          <g key={item} className="m-item" style={v({ "--d": `${500 + i * 320}ms` })}>
            <polygon points={hexPoints(140, y, 11)} className="m-box" />
            <path d={`M134 ${y} l4 4 l8 -9`} className="m-tick" pathLength={1} />
            <text x="164" y={y + 5}>{item}</text>
            <line x1="164" x2={330 - i * 12} y1={y + 18} y2={y + 18} className="m-line" />
          </g>
        );
      })}
    </svg>
  );
}

function Clarte({ count = 5 }: { count?: number }) {
  const cells: { x: number; y: number; d: number; hot: boolean }[] = [];
  const hotCol = 6;
  for (let row = 0; row < 11; row++) {
    for (let col = 0; col < 11; col++) {
      const x = 40 + col * 38 + (row % 2 ? 19 : 0);
      const y = 40 + row * 33;
      const hot = col === hotCol && row >= 1 && row <= count * 2 - 1 && row % 2 === 1 && row < 11;
      cells.push({ x, y, d: (row + col) * 40, hot });
    }
  }
  const hot = cells.filter((c) => c.hot);
  return (
    <svg viewBox="0 0 480 420" className="motif motif-clarte">
      {cells.map((cell, i) => (
        <polygon
          key={i}
          className={cell.hot ? "m-hot" : "m-dim"}
          points={hexPoints(cell.x, cell.y, cell.hot ? 13 : 12)}
          style={v({ "--d": `${cell.hot ? 900 + hot.indexOf(cell) * 160 : cell.d}ms` })}
        />
      ))}
      {hot.length > 1 && (
        <path
          className="m-spine"
          d={`M${hot[0].x} ${hot[0].y} L${hot[hot.length - 1].x} ${hot[hot.length - 1].y}`}
          pathLength={1}
        />
      )}
    </svg>
  );
}

function Conversation() {
  return (
    <div className="motif motif-conversation">
      <svg viewBox="0 0 480 300" aria-hidden="true">
        <polygon className="m-node a" points={hexPoints(70, 150, 46)} />
        <polygon className="m-node b" points={hexPoints(410, 150, 46)} />
        <path d={SYMBOL_PATH} transform="translate(394 134) scale(0.5)" className="m-node-mark" />
        <path className="m-link" d="M116 150 L364 150" pathLength={1} />
        <text x="70" y="226" className="m-node-l">Votre entreprise</text>
        <text x="410" y="226" className="m-node-l">SAFEPERFORM</text>
        <text x="410" y="244" className="m-node-s">El Jadida</text>
        <circle cx="70" cy="150" r="6" className="m-node-dot" />
      </svg>
      <span className="m-packet p1">Votre activité</span>
      <span className="m-packet p2">Vos données</span>
      <span className="m-packet p3">Votre objectif</span>
      <span className="m-packet p4 back">Un cadrage</span>
    </div>
  );
}

export function PageMotif({ name, count }: { name: MotifName; count?: number }) {
  switch (name) {
    case "collecte":
      return <Collecte />;
    case "perimetres":
      return <Perimetres />;
    case "trajectoire":
      return <Trajectoire />;
    case "ancrage":
      return <CoastMap mode="load" />;
    case "reperes":
      return <Reperes />;
    case "conversation":
      return <Conversation />;
    default:
      return <Clarte count={count} />;
  }
}
