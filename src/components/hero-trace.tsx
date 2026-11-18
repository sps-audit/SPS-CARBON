"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Icon } from "./icons";
import { Reading } from "./reading";
import { SafeperformLogo } from "./safeperform-logo";
import { homeHero, invoiceTrace as tr } from "@/lib/editorial";

/*
 * Home hero, "Le tracé": an editorial column on the left, and on the right the
 * one line of work the whole product is about. An electricity invoice, its
 * consumption picked out, a rail that carries it through the emission factor
 * to the tonnes of the Scope 2, and the consultant's review underneath.
 *
 * Everything is real text in the static page (a reader, a search engine or a
 * visitor without scripts gets the full calculation). When the ledger is in
 * view (at once on a large screen, on scrolling on a phone) the rail draws
 * itself once and the result rolls onto its value: the two signature motions
 * of the site, released together so they share one clock (.is-live in
 * motion.css, `armed` on the figure). Under reduced motion the finished state
 * is shown.
 */
export function HeroTrace() {
  const figure = useRef<HTMLElement>(null);
  const [live, setLive] = useState(false);
  useEffect(() => {
    const element = figure.current;
    if (!element || !("IntersectionObserver" in window)) {
      setLive(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        setLive(true);
      },
      { threshold: 0.45 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <h1 id="hero-title" className="hero-title">
            {homeHero.title}
          </h1>
          <p className="hero-lead">{homeHero.lead}</p>
          <div className="hero-actions">
            <Link className="btn" href={homeHero.action.href}>
              {homeHero.action.label}
            </Link>
            <a className="hero-follow" href={homeHero.follow.href}>
              {homeHero.follow.label}
              <Icon name="down" />
            </a>
          </div>
          <p className="hero-byline">
            <SafeperformLogo className="hero-byline-logo" />
            <span>{homeHero.byline}</span>
          </p>
        </div>

        <figure ref={figure} className={live ? "trace is-live" : "trace"} aria-labelledby="trace-caption">
          <figcaption id="trace-caption" className="trace-caption">
            <span>{tr.caption}</span>
            <span className="demo-chip">{tr.demo}</span>
          </figcaption>

          <div className="trace-paper">
            <p className="trace-doc">
              <strong>{tr.document}</strong>
              <span>{tr.number}</span>
            </p>
            <dl className="trace-lines">
              {tr.lines.map((line) => (
                <div key={line.label}>
                  <dt>{line.label}</dt>
                  <dd>{line.value}</dd>
                </div>
              ))}
              <div className="trace-key">
                <dt>{tr.quantity.label}</dt>
                <dd>
                  {tr.quantity.value}
                  <small> {tr.quantity.unit}</small>
                </dd>
              </div>
            </dl>
          </div>

          <dl className="trace-ledger">
            <div className="trace-step">
              <dt>
                <span className="trace-op" aria-hidden="true">
                  ×
                </span>
                {tr.factor.label}
                <small>{tr.factor.source}</small>
              </dt>
              <dd>
                {tr.factor.value}
                <small> {tr.factor.unit}</small>
              </dd>
            </div>
            <div className="trace-step trace-result">
              <dt>
                <span className="trace-op" aria-hidden="true">
                  =
                </span>
                {tr.result.label}
                <small>{tr.result.source}</small>
              </dt>
              <dd>
                <Reading value={tr.result.value} decimals={2} delay={1150} armed={live} className="readout" />
                <small> {tr.result.unit}</small>
              </dd>
            </div>
          </dl>

          <p className="trace-review">
            <Icon name="shield" />
            <span>{tr.review.text}</span>
            <em className="tag ok">{tr.review.status}</em>
          </p>
        </figure>
      </div>
    </section>
  );
}
