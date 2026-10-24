"use client";

import { useEffect, useRef } from "react";
import { onMediaChange, useScrollProgress } from "./motion";

/* Key dates for Moroccan companies. Sources listed under the timeline. */
const events = [
  { date: "2019", title: "Rapport ESG des sociétés cotées", text: "Circulaire AMMC n° 03/19 : les émetteurs publient un rapport ESG. 94 émetteurs concernés en 2023.", tag: "Maroc" },
  { date: "2021", title: "CDN actualisée du Maroc", text: "Objectif de réduction des émissions de GES de 45,5 % d’ici 2030, dont 18,3 % sans appui international.", tag: "Maroc" },
  { date: "Oct. 2023", title: "MACF : période transitoire", text: "Les importateurs de l’UE déclarent les émissions des marchandises concernées, sans paiement.", tag: "UE" },
  { date: "Janv. 2026", title: "MACF : période définitive", text: "Le mécanisme s’applique pleinement, avec un seuil de 50 tonnes par importateur et par an (hors électricité et hydrogène).", tag: "UE" },
  { date: "Fév. 2027", title: "Vente des certificats MACF", text: "Les certificats couvrant les importations de 2026 peuvent être achetés et restitués.", tag: "UE" },
  { date: "30 sept. 2027", title: "Première déclaration annuelle", text: "Les importateurs déclarent les émissions intrinsèques de 2026 : ils auront besoin des données de leurs fournisseurs.", tag: "UE" },
  { date: "2030", title: "Horizon de la CDN", text: "L’échéance de l’engagement climatique national du Maroc.", tag: "Maroc" },
];

// "Today" sits between the 4th and 5th events (October 2026).
const todayAfter = 3;

/*
 * Wide screens: a horizontal rail filled by scroll progress (--p).
 * Tablets and phones: a vertical rail that fills up to the reading line; each
 * event lights up as it crosses that line and dims again when scrolled back.
 */
export function RegTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  useScrollProgress(ref, 0.85, 0.15);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const vertical = window.matchMedia("(max-width: 1080px)");
    const motion = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const list = root.querySelector("ol");
    const items = Array.from(root.querySelectorAll<HTMLLIElement>("ol > li"));
    let frame = 0;

    const reset = () => {
      root.classList.remove("is-scrubbed");
      for (const name of ["--rail-top", "--track", "--fill", "--head"]) root.style.removeProperty(name);
      for (const item of items) item.classList.remove("is-lit");
    };

    const centre = (item: Element | undefined) => {
      const box = item?.querySelector(".tl-dot")?.getBoundingClientRect();
      return box ? box.top + box.height / 2 : 0;
    };

    const update = () => {
      frame = 0;
      if (!list || !vertical.matches) {
        reset();
        return;
      }
      // The rail runs from the first event to the last one.
      const top = list.getBoundingClientRect().top;
      const start = centre(items[0]) - top;
      const track = centre(items[items.length - 1]) - top - start;
      root.style.setProperty("--rail-top", `${start}px`);
      root.style.setProperty("--track", `${track}px`);
      if (!motion.matches || !document.documentElement.classList.contains("js")) {
        root.classList.remove("is-scrubbed");
        root.style.removeProperty("--fill");
        root.style.removeProperty("--head");
        return;
      }
      // It fills up to the reading line; events above that line are lit.
      const line = window.innerHeight * 0.62;
      const fill = Math.max(0, Math.min(track, line - top - start));
      root.classList.add("is-scrubbed");
      root.style.setProperty("--fill", `${fill}px`);
      root.style.setProperty("--head", `${list.offsetTop + start + fill}px`);
      for (const item of items) item.classList.toggle("is-lit", centre(item) <= line);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const stopVertical = onMediaChange(vertical, schedule);
    const stopMotion = onMediaChange(motion, schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      stopVertical();
      stopMotion();
    };
  }, []);

  return (
    <div className="timeline" ref={ref}>
      <p className="tl-legend" aria-hidden="true">
        <span className="tl-ma">Maroc</span>
        <span className="tl-eu">Union européenne</span>
      </p>
      <span className="tl-head" aria-hidden="true" />
      <ol>
        {events.map((event, index) => (
          <li
            key={event.title}
            className={`tl-${event.tag === "UE" ? "eu" : "ma"} ${index > todayAfter ? "is-future" : ""}`}
            style={{ ["--n" as string]: index / (events.length - 1) }}
          >
            <span className="tl-dot" aria-hidden="true" />
            <time>{event.date}</time>
            <div className="tl-card">
              <span className="tl-tag">{event.tag}</span>
              {index > todayAfter && <span className="tl-soon">À venir</span>}
              <h3>{event.title}</h3>
              <p>{event.text}</p>
            </div>
            {index === todayAfter && (
              <span className="tl-today" aria-label="Nous sommes ici : octobre 2026">
                <i aria-hidden="true" />
                Aujourd’hui
              </span>
            )}
          </li>
        ))}
      </ol>
      <p className="timeline-sources">
        Sources : AMMC, circulaire n° 03/19 ; CDN du Maroc, 2021 ; règlement (UE) 2023/956 modifié en 2025. Dates à vérifier selon
        votre situation et l’évolution des textes.
      </p>
    </div>
  );
}
