"use client";

import { useRef, useState, type CSSProperties, type JSX, type KeyboardEvent } from "react";
import Link from "next/link";
import { Plate, Bezel } from "./plate";
import { Reading } from "./reading";
import { Icon } from "./icons";
import {
  plateModules,
  showcaseLabel,
  collect,
  collectSources,
  collectRows,
  control,
  controlAlerts,
  trace,
  traceChain,
  trajectory,
  trajectoryBase,
  trajectoryStart,
  scenarios,
  macf,
  plateEdge,
  type ModuleId,
} from "@/lib/plates";

/*
 * Home, "Tout votre carbone, sur un seul écran": the platform module by
 * module, the way a desktop application is shown. On the left, a squared
 * sheet with one keycap per module (1 to 5); under it, the specimen label:
 * the question the module answers. On the right, the module's plate: its
 * image, chosen for its character, and the live fragment under a glass bezel.
 *
 * A real tablist: arrows, Home and End move between the keycaps, and the
 * digits 1 to 5 select a module while the focus is on the keycaps. No key is
 * listened to anywhere else on the page.
 */

const SYMBOL =
  "M61.098,7.674 Q64,6 66.902,7.674 L113.098,34.326 Q116,36 116,39.35 L116,61.65 Q116,65 113.118,63.292 L91.882,50.708 Q89,49 86.077,47.363 L66.923,36.637 Q64,35 61.077,36.637 L41.923,47.363 Q39,49 39,52.35 L39,75.65 Q39,79 41.923,80.637 L61.077,91.363 Q64,93 66.902,91.326 L88.354,78.949 Q90,78 90,76.1 L90,69.9 Q90,68 91.646,68.949 L113.696,81.671 Q116,83 116,85.66 L116,94.34 Q116,97 113.603,98.153 L67.019,120.548 Q64,122 61.098,120.326 L14.902,93.674 Q12,92 12,88.65 L12,39.35 Q12,36 14.902,34.326 L61.098,7.674 Z";

/* Where the five sources sit around the bilan, in % of the hub. */
const SPOTS = [
  [14, 30],
  [33, 8],
  [67, 8],
  [86, 30],
  [80, 70],
] as const;
const HUB = [50, 46] as const;

const pos = (x: number, y: number, n?: number) =>
  ({ ["--x" as string]: `${x}%`, ["--y" as string]: `${y}%`, ...(n === undefined ? {} : { ["--n" as string]: n }) }) as CSSProperties;

function Collect() {
  const received = collectSources.filter((s) => s.state === "ok").length;
  return (
    <div className="pf pf-collect">
      <div className="pf-hub" aria-hidden="true">
        {/* Same 30:13 proportions as the hub on a desktop, so the dashes keep an even rhythm. */}
        <svg className="pf-hub-lines" viewBox="0 0 300 130" preserveAspectRatio="none" focusable="false">
          {SPOTS.map(([x, y], n) => (
            <line key={n} x1={x * 3} y1={y * 1.3} x2={HUB[0] * 3} y2={HUB[1] * 1.3} className={`is-${collectSources[n].state}`} />
          ))}
        </svg>
        {collectSources.map((source, n) => (
          <span key={source.name} className={`pf-src is-${source.state}`} style={pos(SPOTS[n][0], SPOTS[n][1], n)}>
            <span className="pf-src-tile">
              <Icon name={source.icon} />
            </span>
            <span className="pf-src-name">{source.name}</span>
          </span>
        ))}
        <span className="pf-core" style={pos(HUB[0], HUB[1])}>
          <svg viewBox="0 0 128 128" focusable="false">
            <path d={SYMBOL} />
          </svg>
        </span>
      </div>
      <Bezel className="pf-card">
        <p className="pf-kicker">
          {collect.kicker} <span>{collect.complete(received, collectSources.length)}</span>
        </p>
        <ul className="pf-rows">
          {collectRows.map((row) => (
            <li key={row.name}>
              <span>{row.name}</span>
              <em className={`tag ${row.state}`}>{row.label}</em>
            </li>
          ))}
        </ul>
      </Bezel>
      <p className="sr-only">
        {collect.srLabel} : {collectSources.map((s) => `${s.name}, ${collect.states[s.state]}`).join(" ; ")}.
      </p>
    </div>
  );
}

function Control() {
  const [fixed, setFixed] = useState([false, false, true]);
  const open = fixed.filter((f) => !f).length;
  return (
    <div className="pf pf-control">
      <Bezel className="pf-card">
        <p className="pf-kicker">
          {control.kicker} <span aria-live="polite">{open === 0 ? control.allClear : control.open(open)}</span>
        </p>
        <ul className="pf-alerts">
          {controlAlerts.map((alert, i) => (
            <li key={alert.title} className={fixed[i] ? "is-fixed" : ""}>
              <span className="pf-alert-mark" aria-hidden="true" />
              <span>
                <strong>{alert.title}</strong>
                <small>{alert.text}</small>
              </span>
              <button
                type="button"
                className="pf-chip"
                aria-pressed={fixed[i]}
                aria-label={`${alert.title} : ${fixed[i] ? control.markOpen : control.markFixed}`}
                onClick={() => setFixed(fixed.map((f, k) => (k === i ? !f : f)))}
              >
                {fixed[i] ? control.fixed : control.check}
              </button>
            </li>
          ))}
        </ul>
      </Bezel>
    </div>
  );
}

function Trace() {
  return (
    <div className="pf pf-trace">
      <Bezel className="pf-card">
        <p className="pf-kicker">
          {trace.kicker} <span>{trace.note}</span>
        </p>
        <ol className="pf-chain">
          {traceChain.map((step, n) => (
            <li key={step.k} className={n === traceChain.length - 1 ? "is-result" : ""}>
              <small>{step.k}</small>
              <strong>{step.v}</strong>
            </li>
          ))}
        </ol>
      </Bezel>
    </div>
  );
}

function Trajectory() {
  const [scenario, setScenario] = useState(1);
  const s = scenarios[scenario];
  const xs = [10, 160, 310, 460, 610, 760];
  const end = trajectoryBase * (1 - s.goal);
  const value = (i: number) => (s.goal === 0 ? trajectoryStart * Math.pow(1.005, i) : trajectoryStart + (end - trajectoryStart) * Math.pow(i / 5, 1.2));
  const y = (t: number) => 20 + ((9800 - t) / 4000) * 150;
  const d = xs.map((x, i) => `${i ? "L" : "M"} ${x} ${y(value(i)).toFixed(1)}`).join(" ");
  return (
    <div className="pf pf-trajectory">
      <Bezel className="pf-card">
        <div className="pf-traj-head">
          <p className="pf-figure readout" aria-live="polite">
            <Reading value={Math.round(value(5))} from={trajectoryStart} />
            <small>{trajectory.unit}</small>
          </p>
          <div className="seg" role="group" aria-label={trajectory.group}>
            {scenarios.map((item, i) => (
              <button key={item.name} type="button" aria-pressed={i === scenario} onClick={() => setScenario(i)}>
                {item.name}
              </button>
            ))}
          </div>
        </div>
        <svg className="pf-chart" viewBox="0 0 770 190" preserveAspectRatio="none" aria-hidden="true" focusable="false">
          <path className="pf-chart-grid" d="M0 30 H770 M0 95 H770 M0 160 H770" />
          <path className="pf-chart-goal" d={`M 10 ${y(trajectoryBase * trajectory.target).toFixed(1)} H 760`} />
          <path className="pf-chart-line" d={d} />
        </svg>
        <p className="pf-axis" aria-hidden="true">
          {trajectory.years.map((year) => (
            <span key={year}>{year}</span>
          ))}
        </p>
        <p className="pf-note">
          <span className="pf-goal-key" aria-hidden="true" />
          {trajectory.targetLabel} · {s.note}
        </p>
      </Bezel>
    </div>
  );
}

function Macf() {
  return (
    <div className="pf pf-macf">
      <Bezel className="pf-card">
        <p className="pf-kicker">
          {macf.kicker} <span>{macf.product}</span>
        </p>
        <p className="pf-figure readout">
          <Reading value={macf.value} decimals={macf.decimals} />
          <small>{macf.unit}</small>
        </p>
        <dl className="pf-sheet">
          {macf.rows.map((row) => (
            <div key={row.k}>
              <dt>{row.k}</dt>
              <dd>{row.v}</dd>
            </div>
          ))}
        </dl>
        <p className="pf-files">
          {macf.files.map((file) => (
            <span key={file}>{file}</span>
          ))}
          <em className="tag ok">{macf.ready}</em>
        </p>
      </Bezel>
    </div>
  );
}

const FRAGMENTS: Record<ModuleId, () => JSX.Element> = {
  collecter: Collect,
  controler: Control,
  calculer: Trace,
  piloter: Trajectory,
  transmettre: Macf,
};

export function PlateShowcase() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const m = plateModules[active];
  const Fragment = FRAGMENTS[m.id];
  const count = plateModules.length;

  const go = (n: number) => {
    const next = (n + count) % count;
    setActive(next);
    tabs.current[next]?.focus();
  };

  const onKey = (event: KeyboardEvent<HTMLDivElement>) => {
    const digit = Number.parseInt(event.key, 10);
    if (digit >= 1 && digit <= count) {
      event.preventDefault();
      go(digit - 1);
      return;
    }
    const moves: Record<string, number> = { ArrowRight: active + 1, ArrowDown: active + 1, ArrowLeft: active - 1, ArrowUp: active - 1, Home: 0, End: count - 1 };
    if (event.key in moves) {
      event.preventDefault();
      go(moves[event.key]);
    }
  };

  return (
    <div className="showcase" data-reveal="rise">
      <div className="showcase-sheet">
        <div className="showcase-keys" role="tablist" aria-label={showcaseLabel} aria-orientation="horizontal" onKeyDown={onKey}>
          {plateModules.map((mod, n) => (
            <button
              key={mod.id}
              ref={(el) => {
                tabs.current[n] = el;
              }}
              type="button"
              role="tab"
              id={`module-tab-${mod.id}`}
              aria-selected={n === active}
              aria-controls="module-panel"
              tabIndex={n === active ? 0 : -1}
              className="key"
              onClick={() => setActive(n)}
            >
              <kbd>{n + 1}</kbd>
              <span>{mod.verb}</span>
            </button>
          ))}
        </div>
        <div className="showcase-caption" key={m.id}>
          <p className="showcase-count" aria-hidden="true">
            {String(active + 1).padStart(2, "0")} <span>/ {String(count).padStart(2, "0")}</span>
          </p>
          <h3 className="t-h3">{m.title}</h3>
          <p>{m.text}</p>
          <Link href={m.link.href} className="link">
            {m.link.label}
          </Link>
        </div>
      </div>
      <div className="showcase-stage" role="tabpanel" id="module-panel" aria-labelledby={`module-tab-${m.id}`}>
        <Plate
          key={m.id}
          ambiance={m.ambiance}
          sizes="(max-width: 1000px) 100vw, 820px"
          number={active + 1}
          demo
          demoLabel={plateEdge.demoCase}
          grid={m.grid}
          night={m.night}
          className={`showcase-plate is-${m.id}`}
        >
          <Fragment />
        </Plate>
      </div>
    </div>
  );
}
