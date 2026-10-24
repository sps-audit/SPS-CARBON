"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "./motion";
import { norms, situations, stages, type SituationId } from "@/lib/norms";

/*
 * Carbon standards on one map, in the order a company meets them: measure,
 * measure a product, verify, declare, set targets. Choosing a situation brings
 * the relevant standards forward; choosing a standard opens the essentials.
 */
export function NormsExplorer() {
  const [situation, setSituation] = useState<SituationId | null>(null);
  const [selected, setSelected] = useState(norms[0].id);
  const map = useRef<HTMLOListElement>(null);
  const detail = useRef<HTMLElement>(null);
  const live = useInView(map);
  const norm = norms.find((item) => item.id === selected) ?? norms[0];

  // Each stage lights up once it reaches the reading area (or has been passed).
  useEffect(() => {
    const list = map.current;
    if (!list) return;
    const items = Array.from(list.querySelectorAll<HTMLElement>(".nx-stage"));
    let frame = 0;
    const check = () => {
      frame = 0;
      const line = window.innerHeight * 0.85;
      for (const item of items) if (item.getBoundingClientRect().top < line) item.classList.add("is-lit");
      if (items.every((item) => item.classList.contains("is-lit"))) stop();
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    const stop = () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      stop();
    };
  }, []);

  function pickSituation(id: SituationId) {
    const next = situation === id ? null : id;
    setSituation(next);
    // Open the standard that answers this situation first.
    const lead = situations.find((item) => item.id === next)?.lead;
    if (lead) setSelected(lead);
  }

  function pickNorm(id: string) {
    setSelected(id);
    // On narrow screens the panel sits under the map: bring it into view.
    const panel = detail.current;
    if (panel && window.matchMedia("(max-width: 960px)").matches) {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      requestAnimationFrame(() => panel.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" }));
    }
  }

  const count = situation ? norms.filter((item) => item.situations.includes(situation)).length : norms.length;

  return (
    <div className={`nx ${live ? "is-live" : ""} ${situation ? "is-filtered" : ""}`}>
      <div className="nx-situations" role="group" aria-label="Votre situation">
        <span className="nx-label">Votre situation</span>
        {situations.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={situation === item.id}
            onClick={() => pickSituation(item.id)}
          >
            {item.label}
          </button>
        ))}
        <p className="nx-count" aria-live="polite">
          {situation ? `${count} normes vous concernent en priorité` : `${count} normes et référentiels`}
        </p>
      </div>

      <ol className="nx-map" ref={map}>
        {stages.map((stage, index) => (
          <li className="nx-stage" key={stage.id} style={{ ["--i" as string]: index }}>
            <div className="nx-stage-head">
              <span className="nx-n" aria-hidden="true">
                {index + 1}
              </span>
              <strong>{stage.label}</strong>
              <small>{stage.text}</small>
            </div>
            <ul className="nx-list">
              {norms
                .filter((item) => item.stage === stage.id)
                .map((item, n) => {
                  const match = situation ? item.situations.includes(situation) : false;
                  return (
                    <li key={item.id} style={{ ["--j" as string]: n }}>
                      <button
                        type="button"
                        className={`nx-norm ${selected === item.id ? "is-selected" : ""} ${match ? "is-match" : ""} ${
                          situation && !match ? "is-dim" : ""
                        }`}
                        aria-pressed={selected === item.id}
                        aria-controls="nx-detail"
                        onClick={() => pickNorm(item.id)}
                      >
                        <span className="nx-code">{item.code}</span>
                        <span className="nx-rel">{item.relation}</span>
                      </button>
                    </li>
                  );
                })}
            </ul>
          </li>
        ))}
      </ol>

      <article className="nx-detail" id="nx-detail" ref={detail} aria-live="polite" aria-labelledby="nx-detail-title">
        <div className="nx-detail-inner" key={norm.id}>
          <header className="nx-detail-head">
            <span className="nx-badge">{norm.relation}</span>
            <h3 id="nx-detail-title">{norm.code}</h3>
            <p className="nx-name">{norm.name}</p>
            <p className="nx-meta">
              <span>{norm.issuer}</span>
              <span>{norm.year}</span>
            </p>
          </header>
          <div className="nx-cols">
            <section>
              <h4>Ce que c’est</h4>
              <p>{norm.what}</p>
              {norm.details && (
                <ul className="hex-list">
                  {norm.details.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              )}
            </section>
            <section>
              <h4>Pour vous si…</h4>
              <p>{norm.forYou}</p>
            </section>
            <section className="nx-us">
              <h4>Avec SPS-CARBON</h4>
              <p>{norm.withUs}</p>
            </section>
          </div>
        </div>
      </article>
    </div>
  );
}
