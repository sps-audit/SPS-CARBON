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
      // the hero dashboard opens into layers as it leaves. Native scroll only.
      document.querySelectorAll<HTMLElement>(".chapter, .site-footer").forEach((section) => {
        const top = section.getBoundingClientRect().top;
        const e = reduce.matches ? 1 : Math.min(1, Math.max(0, (vh - top) / (vh * 0.75)));
        section.style.setProperty("--e", e.toFixed(3));
      });
      const hero = document.querySelector<HTMLElement>(".hero");
      if (hero) {
        const rect = hero.getBoundingClientRect();
        const p = reduce.matches ? 0 : Math.min(1, Math.max(0, -rect.top / (rect.height * 0.85)));
        hero.style.setProperty("--hp", p.toFixed(3));
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    const onPointer = (event: PointerEvent) => {
      const card = (event.target as Element | null)?.closest?.(".spot") as HTMLElement | null;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      card.style.setProperty("--my", `${event.clientY - rect.top}px`);
    };
    document.addEventListener("pointermove", onPointer, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
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
