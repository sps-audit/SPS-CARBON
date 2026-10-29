"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { onScrollFrame, requestScrollFrame } from "./scroll-store";

/*
 * Site-wide motion engine (v7). One passive scroll loop, one pointer loop.
 *
 * - Reveals: [data-reveal] gets .is-in once its top passes 88 % of the viewport.
 *   Variants are styled in motion.css: focus (headings are traced in word by
 *   word), scan (an instrument panel is read by a scan line), rise (a quiet
 *   focus-in for text and groups), stagger (children one after the other).
 * - Page progress: the graduated line of the header (.site-progress i).
 * - Hero settle: --hp on .hero-deck (0 at rest, 1 when the hero has scrolled away).
 * - Pointer: the page-head instrument tilts a little (--px, --py), mouse
 *   only, never under reduced motion.
 *
 * Geometry is measured once (and again when the page changes size), then each
 * scroll frame only compares cached positions with scrollY and writes: no
 * layout is forced while scrolling.
 */
export function MotionLayer() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    let lastProgress = "";
    let lastHero = "";
    let pending: HTMLElement[] = [];
    let tops: number[] = [];
    let heroTop = 0;
    let heroHeight = 1;
    let max = 1;
    let bar: HTMLElement | null = null;
    let hero: HTMLElement | null = null;
    let deck: HTMLElement | null = null;
    // Until the visitor scrolls, the page is "arriving": everything already on
    // screen comes in, even after fonts or images move it a little.
    const startY = window.scrollY;

    const measure = () => {
      const y = window.scrollY;
      bar = document.querySelector<HTMLElement>(".site-progress i");
      hero = document.querySelector<HTMLElement>(".hero");
      deck = document.querySelector<HTMLElement>(".hero-deck");
      max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      if (hero) {
        const rect = hero.getBoundingClientRect();
        heroTop = rect.top + y;
        heroHeight = Math.max(1, rect.height);
      }
      pending = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)"));
      tops = pending.map((element) => element.getBoundingClientRect().top + y);
    };

    const update = (y: number, vh: number) => {
      const progress = Math.min(1, Math.max(0, y / max)).toFixed(4);
      if (bar && progress !== lastProgress) {
        lastProgress = progress;
        bar.style.transform = `scaleX(${progress})`;
      }
      if (hero) {
        const p = reduce.matches ? 0 : Math.min(1, Math.max(0, (y - heroTop) / (heroHeight * 0.85)));
        const value = p.toFixed(3);
        // Written on the one element that uses it, so nothing else is restyled.
        if (value !== lastHero && deck) {
          lastHero = value;
          deck.style.setProperty("--hp", value);
        }
      }
      if (pending.length) {
        // On arrival everything already on screen comes in (no blank band at
        // the fold); while scrolling, a little before the bottom edge.
        const line = y + vh * (y === startY ? 1 : 0.92);
        const keepEls: HTMLElement[] = [];
        const keepTops: number[] = [];
        pending.forEach((element, i) => {
          if (tops[i] < line) element.classList.add("is-in");
          else {
            keepEls.push(element);
            keepTops.push(tops[i]);
          }
        });
        pending = keepEls;
        tops = keepTops;
      }
    };

    let remeasure = 0;
    const refresh = () => {
      cancelAnimationFrame(remeasure);
      remeasure = requestAnimationFrame(() => {
        measure();
        requestScrollFrame();
      });
    };

    refresh();
    const stopScroll = onScrollFrame(update);
    window.addEventListener("resize", refresh);
    document.fonts?.ready.then(refresh);
    // The page grew or shrank (fonts, an accordion, a tab): positions are measured again.
    const sizes = new ResizeObserver(refresh);
    sizes.observe(document.body);
    // Elements added later (a step, a panel) are picked up as they appear.
    const added = new MutationObserver((mutations) => {
      if (mutations.some((m) => Array.from(m.addedNodes).some((node) => node.nodeType === 1))) refresh();
    });
    added.observe(document.body, { childList: true, subtree: true });

    let drift = 0;
    let px = 0;
    let py = 0;
    const applyDrift = () => {
      drift = 0;
      const head = document.querySelector<HTMLElement>(".page-head");
      if (!head) return;
      head.style.setProperty("--px", px.toFixed(3));
      head.style.setProperty("--py", py.toFixed(3));
    };
    const onPointer = (event: PointerEvent) => {
      if (!fine.matches || reduce.matches) return;
      px = (event.clientX / window.innerWidth - 0.5) * 2;
      py = (event.clientY / window.innerHeight - 0.5) * 2;
      if (!drift) drift = requestAnimationFrame(applyDrift);
    };
    document.addEventListener("pointermove", onPointer, { passive: true });

    return () => {
      stopScroll();
      cancelAnimationFrame(drift);
      cancelAnimationFrame(remeasure);
      sizes.disconnect();
      added.disconnect();
      window.removeEventListener("resize", refresh);
      document.removeEventListener("pointermove", onPointer);
    };
  }, [pathname]);

  return null;
}
