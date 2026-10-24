"use client";

import { useRef } from "react";
import { coastViewBox, elJadida, iberiaCoast, moroccoCoast } from "@/lib/coast";
import { useScrollProgress } from "./motion";

// Graticule in the same projection as src/lib/coast.ts.
const lonX = (lon: number) => (lon + 17.6) * 35.714;
const latY = (lat: number) => (37.4 - lat) * 40.835;

export function CoastMap({ mode = "scroll" }: { mode?: "scroll" | "load" }) {
  const ref = useRef<HTMLDivElement>(null);
  useScrollProgress(ref, 0.9, 0.3);
  return (
    <div className={`coast coast-${mode}`} ref={ref} aria-hidden="true">
      <svg viewBox={coastViewBox} preserveAspectRatio="xMidYMid meet">
        <g className="coast-grid">
          {[-15, -10, -5].map((lon) => (
            <line key={lon} x1={lonX(lon)} x2={lonX(lon)} y1={-40} y2={720} />
          ))}
          {[25, 30, 35].map((lat) => (
            <line key={lat} y1={latY(lat)} y2={latY(lat)} x1={0} x2={630} />
          ))}
        </g>
        <path className="coast-line coast-ma" d={moroccoCoast} pathLength={1} />
        <path className="coast-line coast-es" d={iberiaCoast} pathLength={1} />
        <g className="coast-pin" transform={`translate(${elJadida.x} ${elJadida.y})`}>
          <circle r="26" className="pin-wave" />
          <circle r="11" className="pin-ring" />
          <circle r="4.5" className="pin-dot" />
        </g>
        <line className="coast-leader" x1={elJadida.x + 14} y1={elJadida.y + 6} x2={elJadida.x + 120} y2={elJadida.y + 64} />
      </svg>
      <div
        className="coast-label"
        style={{ left: `${((elJadida.x + 124) / 630) * 100}%`, top: `${((elJadida.y + 40 + 64) / 760) * 100}%` }}
      >
        <strong>El Jadida</strong>
        <span>33,23° N, 8,50° O</span>
      </div>
      <span className="coast-sea">Océan Atlantique</span>
    </div>
  );
}
