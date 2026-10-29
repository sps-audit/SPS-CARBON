"use client";

import { useState, type ReactNode } from "react";

/*
 * On a phone a four-column comparison never fits: the visitor picks one
 * formula and the table shows that column next to the criteria (CSS hides
 * the others below 700 px). On larger screens the switch is hidden and the
 * whole table is shown.
 */
export function PlanCompare({ names, featured, children }: { names: string[]; featured: number; children: ReactNode }) {
  const [plan, setPlan] = useState(featured);
  return (
    <div className="plan-compare" data-plan={plan + 1}>
      <div className="seg plan-pick" role="group" aria-label="Formule affichée">
        {names.map((name, n) => (
          <button key={name} type="button" className={n === plan ? "is-on" : ""} aria-pressed={n === plan} onClick={() => setPlan(n)}>
            {name}
          </button>
        ))}
      </div>
      {children}
    </div>
  );
}
