import { Plate, Bezel } from "./plate";
import { steps } from "@/lib/steps";
import { phasePlate as pp } from "@/lib/plates";

/*
 * Home, "Comment se déroule une mission": the five steps as stacked phase
 * cards on the palest plate. Each card says where it sits ("Étape 2 sur 5"),
 * shows the same five-point track with its own point lit (viridian: where you
 * are), what the client brings and receives, and what comes next. No
 * durations: the calendar is fixed during the scoping call.
 */
export function PhasePlate() {
  const total = steps.length;
  return (
    <Plate ambiance="clairiere" shape="haut" sizes="(max-width: 1000px) 100vw, 640px" number={7} className="phase-plate">
      <ol className="phase-stack">
        {steps.map((step, n) => (
          <Bezel as="li" key={step.title} className="phase">
            <p className="phase-k">
              {pp.step(n + 1, total)}
            </p>
            <h3 className="phase-title">{step.title}</h3>
            <ol className="phase-track" aria-hidden="true">
              {steps.map((s, k) => (
                <li key={s.title} className={k < n ? "is-done" : k === n ? "is-here" : ""}>
                  <i />
                  <span>{s.title}</span>
                </li>
              ))}
            </ol>
            <dl className="phase-io">
              <div>
                <dt>{pp.give}</dt>
                <dd>{step.give}</dd>
              </div>
              <div>
                <dt>{pp.get}</dt>
                <dd>{step.get}</dd>
              </div>
            </dl>
            <p className="phase-foot">
              {n < total - 1 ? (
                <>
                  <span>{pp.next}</span> {steps[n + 1].title}
                </>
              ) : (
                pp.last
              )}
            </p>
          </Bezel>
        ))}
      </ol>
    </Plate>
  );
}
