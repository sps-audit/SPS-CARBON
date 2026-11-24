import Link from "next/link";
import { Plate, Bezel } from "./plate";
import { firstExchange as fx } from "@/lib/plates";

/*
 * The close of every page (24 Nov 2026), in the "planches" method: the call is
 * written beside the plate, and the plate (the jade blur, the calmest image of
 * the set) holds one real fragment under the bezel: what to prepare for the
 * first exchange. Nothing moves: no reveal, no drawn line, no travelling light.
 * It adapts to its own width (container query), so the same piece closes the
 * footer and the page ends that bring their own call.
 */
export function Closing({
  title,
  lead,
  action,
  mail,
  headingId,
  className = "",
}: {
  title: string;
  lead: string;
  action: { href: string; label: string };
  /** Shown beside the button in the footer. */
  mail?: string;
  headingId?: string;
  className?: string;
}) {
  return (
    <div className={`closing ${className}`}>
      <div className="closing-grid">
        <div className="closing-copy">
          <h2 className="t-h2" id={headingId}>
            {title}
          </h2>
          <p className="t-lead">{lead}</p>
          <div className="closing-actions">
            <Link className="btn btn-signal" href={action.href}>
              {action.label}
            </Link>
            {mail && (
              <a className="link closing-mail" href={`mailto:${mail}`}>
                {mail}
              </a>
            )}
          </div>
        </div>
        <Plate ambiance="jade" sizes="(max-width: 1000px) 100vw, 640px" className="closing-plate">
          <Bezel className="closing-card">
            <p className="pf-kicker">
              {fx.kicker} <span>{fx.aside}</span>
            </p>
            <ol className="closing-list">
              {fx.items.map((item, n) => (
                <li key={item}>
                  <span aria-hidden="true">{String(n + 1).padStart(2, "0")}</span>
                  {item}
                </li>
              ))}
            </ol>
            <p className="closing-note">{fx.note}</p>
          </Bezel>
        </Plate>
      </div>
    </div>
  );
}
