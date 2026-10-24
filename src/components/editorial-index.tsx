"use client";

import { useEffect, useState } from "react";

export function EditorialIndex({
  sections,
  numbered,
}: {
  sections: { id: string; title: string }[];
  numbered: boolean;
}) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const elements = sections
      .map((section) => document.getElementById(section.id))
      .filter(Boolean) as HTMLElement[];
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

  return (
    <nav className="page-index" aria-label="Sommaire de la page">
      <p className="page-index-title">Dans cette page</p>
      <div className="page-index-track" aria-hidden="true">
        <span style={{ transform: `scaleY(${(index + 1) / sections.length})` }} />
      </div>
      <ol>
        {sections.map((section, i) => (
          <li key={section.id}>
            <a href={`#${section.id}`} aria-current={active === section.id ? "location" : undefined}>
              {numbered && <span className="page-index-n">{i + 1}</span>}
              {section.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
