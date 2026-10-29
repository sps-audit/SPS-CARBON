"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

/*
 * "Jauge": the page's table of contents drawn as a graduated reading gauge.
 * One tick per section; a needle slides to the section being read, and the
 * filled part of the scale shows how far the reading has gone.
 */
const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export function EditorialIndex({
  sections,
  numbered,
}: {
  sections: { id: string; title: string }[];
  numbered: boolean;
}) {
  const [active, setActive] = useState(sections[0]?.id);
  const [needle, setNeedle] = useState({ y: 0, h: 0, total: 1 });
  const items = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const elements = sections.map((section) => document.getElementById(section.id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px" },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [sections]);

  const index = Math.max(0, sections.findIndex((section) => section.id === active));

  useIsoLayoutEffect(() => {
    const measure = () => {
      const item = items.current[index];
      const last = items.current[items.current.length - 1];
      if (item) setNeedle({ y: item.offsetTop, h: item.offsetHeight, total: last ? last.offsetTop + last.offsetHeight : 1 });
    };
    measure();
    let alive = true;
    document.fonts?.ready.then(() => alive && measure());
    window.addEventListener("resize", measure);
    return () => {
      alive = false;
      window.removeEventListener("resize", measure);
    };
  }, [index]);

  return (
    <nav className="page-index" aria-label="Sommaire de la page">
      <p className="page-index-title">Dans cette page</p>
      <div className="page-index-scale">
        <span className="page-index-fill" aria-hidden="true" style={{ transform: `scaleY(${(needle.y + needle.h / 2) / Math.max(1, needle.total)})` }} />
        <span className="page-index-needle" aria-hidden="true" style={{ transform: `translateY(${needle.y + needle.h / 2}px)` }} />
        <ol>
          {sections.map((section, i) => (
            <li
              key={section.id}
              ref={(element) => {
                items.current[i] = element;
              }}
              className={i < index ? "is-read" : i === index ? "is-on" : ""}
            >
              <a href={`#${section.id}`} aria-current={active === section.id ? "location" : undefined}>
                {numbered && <span className="page-index-n">{i + 1}</span>}
                {section.title}
              </a>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
