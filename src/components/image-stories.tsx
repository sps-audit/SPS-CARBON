"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { Ambiance } from "./ambiance";
import { Focus } from "./focus";
import { Reading } from "./reading";
import { siteReading as sr, tonneExplained as te } from "@/lib/ambiance";

const i = (n: number) => ({ ["--i" as string]: n }) as CSSProperties;

/*
 * "Un site, trois sources": the field photograph read like an analyst's map.
 * Three glass notes are pinned on the terrain, one per scope, with their
 * share of the bilan; the total and its split run along the foot. The notes
 * are real text (a list), the picture is only the ground they stand on.
 */
export function SiteReading() {
  return (
    <section className="chapter site-reading" aria-labelledby="site-reading-title">
      <div className="wrap">
        <div className="head is-split">
          <Focus className="t-h2" id="site-reading-title">
            {sr.title}
          </Focus>
          <p className="t-lead" data-reveal="rise">
            {sr.lead}
          </p>
        </div>
        <figure className="sr-stage" data-reveal="rise">
          <Ambiance name="champ" sizes="(max-width: 1360px) 100vw, 1320px" />
          <figcaption className="sr-demo">
            <span className="demo-chip">{sr.demo}</span>
          </figcaption>
          <ol className="sr-marks">
            {sr.marks.map((mark, n) => (
              <li key={mark.scope} className={`sr-mark is-${mark.tone}`} style={i(n)}>
                <span className="sr-pin" aria-hidden="true" />
                <div className="sr-card">
                  <p className="sr-scope">{mark.scope}</p>
                  <p className="sr-source">{mark.source}</p>
                  <p className="sr-value">
                    <strong className="readout">{mark.value}</strong>
                    <span>{mark.share} du bilan</span>
                  </p>
                  {mark.note && <p className="sr-note">{mark.note}</p>}
                </div>
              </li>
            ))}
          </ol>
          <div className="sr-total">
            <p>
              <span>{sr.total.label}</span>
              <strong className="readout">
                <Reading value={sr.total.value} />
                <small>{sr.total.unit}</small>
              </strong>
            </p>
            <span className="sr-split" aria-hidden="true">
              {sr.marks.map((mark) => (
                <i key={mark.scope} className={`is-${mark.tone}`} style={{ flexGrow: parseFloat(mark.share) }} />
              ))}
            </span>
          </div>
        </figure>
      </div>
    </section>
  );
}

/*
 * "Ce que pèse une tonne": the unit of the bilan made concrete with the site's
 * own example factors, written on the lime waves under a petrol veil.
 */
export function TonneExplained() {
  return (
    <section className="chapter tonne-chapter" aria-labelledby="tonne-title">
      <div className="wrap">
        <div className="tonne-stage s-night" data-reveal="rise">
          <Ambiance name="vagues" sizes="(max-width: 1360px) 100vw, 1320px" />
          <div className="tonne-copy">
            <p className="tonne-kicker">{te.kicker}</p>
            <h2 className="t-h2" id="tonne-title">
              {te.title}
            </h2>
            <p className="t-lead">{te.lead}</p>
            <Link href={te.link.href} className="link">
              {te.link.label}
            </Link>
          </div>
          <div className="tonne-card">
            <p className="tonne-unit">
              <strong className="readout">1</strong>
              <span>tCO₂e, c’est environ</span>
            </p>
            <ul className="tonne-rows">
              {te.rows.map((row, n) => (
                <li key={row.unit} style={i(n)}>
                  <strong className="readout">
                    {row.value}
                    <small>{row.unit}</small>
                  </strong>
                  <span>{row.text}</span>
                </li>
              ))}
            </ul>
            <p className="tonne-note">{te.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
