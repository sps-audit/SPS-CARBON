"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/*
 * Site-wide motion: scroll progress, on-scroll reveals ([data-reveal]),
 * count-up figures ([data-count]) and a cursor spotlight on cards (.spot).
 * Content is only hidden when JavaScript runs (html.js) and motion is allowed.
 */
export function MotionLayer() {
  const bar = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    let frame = 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      frame = 0;
      const vh = window.innerHeight || 1;
      const max = document.documentElement.scrollHeight - vh;
      bar.current?.style.setProperty("transform", `scaleX(${max > 0 ? window.scrollY / max : 0})`);
      // Scroll-linked depth: chapters straighten their diagonal edge as they arrive,
      // the hero dashboard settles as it leaves. Native scroll only. All positions
      // are read first, then written, and only when they change: no forced layout.
      const sections = Array.from(document.querySelectorAll<HTMLElement>(".chapter, .site-footer"));
      const tops = sections.map((section) => section.getBoundingClientRect().top);
      const hero = document.querySelector<HTMLElement>(".hero");
      const heroRect = hero?.getBoundingClientRect();
      sections.forEach((section, i) => {
        const e = reduce.matches ? 1 : Math.min(1, Math.max(0, (vh - tops[i]) / (vh * 0.75)));
        const value = e.toFixed(3);
        if (section.dataset.e !== value) {
          section.dataset.e = value;
          section.style.setProperty("--e", value);
        }
      });
      if (hero && heroRect) {
        const p = reduce.matches ? 0 : Math.min(1, Math.max(0, -heroRect.top / (heroRect.height * 0.85)));
        const value = p.toFixed(3);
        if (hero.dataset.hp !== value) {
          hero.dataset.hp = value;
          hero.style.setProperty("--hp", value);
        }
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    // Pointer: a light follows the cursor on cards (.spot), and the page
    // header instrument drifts a little (--px, --py, set on the page header
    // only so the rest of the page is not restyled), mouse only.
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    let drift = 0;
    let px = 0;
    let py = 0;
    const applyDrift = () => {
      drift = 0;
      const header = document.querySelector<HTMLElement>(".page-hero");
      if (!header) return;
      header.style.setProperty("--px", px.toFixed(3));
      header.style.setProperty("--py", py.toFixed(3));
    };
    const onPointer = (event: PointerEvent) => {
      if (fine.matches && !reduce.matches) {
        px = (event.clientX / window.innerWidth - 0.5) * 2;
        py = (event.clientY / window.innerHeight - 0.5) * 2;
        if (!drift) drift = requestAnimationFrame(applyDrift);
      }
      const card = (event.target as Element | null)?.closest?.(".spot") as HTMLElement | null;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      card.style.setProperty("--my", `${event.clientY - rect.top}px`);
    };
    document.addEventListener("pointermove", onPointer, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(drift);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      document.removeEventListener("pointermove", onPointer);
    };
  }, []);

  useEffect(() => {
    // Reveal by position, not IntersectionObserver: hidden states use clip-path,
    // and fully clipped targets are never reported as intersecting.
    let pending = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)"));
    let frame = 0;
    const check = () => {
      frame = 0;
      const vh = window.innerHeight || 1;
      pending = pending.filter((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.top < vh * 0.88) {
          element.classList.add("is-in");
          return false;
        }
        return true;
      });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    const start = requestAnimationFrame(() => {
      window.dispatchEvent(new Event("resize"));
      check();
    });
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(start);
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [pathname]);

  return <div className="scroll-progress" ref={bar} aria-hidden="true" />;
}
