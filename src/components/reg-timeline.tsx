"use client";

import { useEffect, useRef } from "react";
import { onMediaChange, useScrollProgress } from "./motion";
import { onScrollFrame, requestScrollFrame } from "./scroll-store";

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
    // Measured on layout changes only; each scroll frame compares the cached
    // positions with scrollY and never reads layout (no forced reflow on phones).
    let listTop = 0;
    let start = 0;
    let track = 0;
    let offset = 0;
    let centres: number[] = [];
    let scrub = false;
    let lastFill = "";
    let frame = 0;

    const reset = () => {
      root.classList.remove("is-scrubbed");
      for (const name of ["--rail-top", "--track", "--fill", "--head"]) root.style.removeProperty(name);
      for (const item of items) item.classList.remove("is-lit");
    };

    const centre = (item: Element | undefined, top: number) => {
      const box = item?.querySelector(".tl-dot")?.getBoundingClientRect();
      return box ? box.top + box.height / 2 - top : 0;
    };

    const geometry = () => {
      frame = 0;
      scrub = false;
      lastFill = "";
      if (!list || !vertical.matches) {
        reset();
        return;
      }
      // The rail runs from the first event to the last one.
      const top = list.getBoundingClientRect().top;
      listTop = top + window.scrollY;
      centres = items.map((item) => centre(item, top));
      start = centres[0] ?? 0;
      track = (centres[centres.length - 1] ?? 0) - start;
      offset = list.offsetTop;
      root.style.setProperty("--rail-top", `${start}px`);
      root.style.setProperty("--track", `${track}px`);
      if (!motion.matches || !document.documentElement.classList.contains("js")) {
        root.classList.remove("is-scrubbed");
        root.style.removeProperty("--fill");
        root.style.removeProperty("--head");
        return;
      }
      scrub = true;
      root.classList.add("is-scrubbed");
      requestScrollFrame();
    };

    // It fills up to the reading line; events above that line are lit.
    const update = (y: number, vh: number) => {
      if (!scrub) return;
      const top = listTop - y;
      const line = vh * 0.62;
      const fill = Math.max(0, Math.min(track, line - top - start));
      const value = fill.toFixed(1);
      if (value === lastFill) return;
      lastFill = value;
      root.style.setProperty("--fill", `${fill}px`);
      root.style.setProperty("--head", `${offset + start + fill}px`);
      items.forEach((item, i) => item.classList.toggle("is-lit", top + centres[i] <= line));
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(geometry);
    };

    geometry();
    const stopScroll = onScrollFrame(update);
    const sizes = new ResizeObserver(schedule);
    sizes.observe(document.body);
    window.addEventListener("resize", schedule);
    const stopVertical = onMediaChange(vertical, schedule);
    const stopMotion = onMediaChange(motion, schedule);
    return () => {
      cancelAnimationFrame(frame);
      stopScroll();
      sizes.disconnect();
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
