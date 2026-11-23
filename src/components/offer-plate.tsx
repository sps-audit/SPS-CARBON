import Link from "next/link";
import { Plate, Bezel } from "./plate";
import { plans } from "@/lib/offers";
import { offerPlate as op } from "@/lib/plates";

/*
 * Home, "Trois façons de commencer": the three formulas as specimen cards
 * laid on one plate. Each card reads like a record (numbered, label and value
 * on hairlines); the featured formula stands in the plate's light, raised and
 * held by the glass bezel. On a phone the row scrolls sideways and the next
 * card shows at the edge.
 */
export function OfferPlate() {
  return (
    <Plate ambiance="eclaircie" sizes="(max-width: 1360px) 100vw, 1320px" number={6} className="offer-plate">
      <ol className="specimen-row" aria-label={op.list}>
        {plans.map((plan, n) => {
          const card = (
            <article className="specimen" aria-labelledby={`specimen-${plan.id}`}>
              <header className="specimen-head">
                <span className="specimen-n" aria-hidden="true">
                  {String(n + 1).padStart(2, "0")}
                </span>
                <h3 id={`specimen-${plan.id}`}>{plan.name}</h3>
                {plan.badge && <em className="tag">{plan.badge}</em>}
              </header>
              <dl className="specimen-rows">
                <div>
                  <dt>{op.rows.scope}</dt>
                  <dd>{plan.scope}</dd>
                </div>
                <div>
                  <dt>{op.rows.forWho}</dt>
                  <dd>{plan.forWho}</dd>
                </div>
                <div>
                  <dt>{op.rows.items}</dt>
                  <dd>
                    <ul>
                      {plan.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
                <div>
                  <dt>{op.rows.price}</dt>
                  <dd>{op.price}</dd>
                </div>
              </dl>
              <Link href={plan.href} className={plan.featured ? "btn btn-small" : "link"} aria-label={`${op.more} : ${plan.name}`}>
                {op.more}
              </Link>
            </article>
          );
          return plan.featured ? (
            <Bezel as="li" key={plan.id} className="specimen-slot is-featured">
              {card}
            </Bezel>
          ) : (
            <li key={plan.id} className="specimen-slot">
              {card}
            </li>
          );
        })}
      </ol>
    </Plate>
  );
}
