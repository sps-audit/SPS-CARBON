"use client";

import { useEffect, useState, type RefObject } from "react";
import { onScrollFrame, requestScrollFrame } from "./scroll-store";

/** matchMedia change listener with a fallback for older Safari (addListener). */
export function onMediaChange(media: MediaQueryList, handler: () => void) {
  if (typeof media.addEventListener === "function") {
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }
  media.addListener(handler);
  return () => media.removeListener(handler);
}

/** True when the visitor asked the system to reduce motion. */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    return onMediaChange(media, update);
  }, []);
  return reduced;
}

/** Flips to true once the element has entered the viewport (never resets). */
export function useInView<T extends Element>(
  ref: RefObject<T | null>,
  rootMargin = "0px 0px -15% 0px",
) {
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element || seen) return;
    if (!("IntersectionObserver" in window)) {
      setSeen(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setSeen(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, rootMargin, seen]);
  return seen;
}

/**
 * Writes a 0–1 scroll progress to the CSS custom property `--p` of the element.
 * 0 = element top reaches `start` of the viewport height, 1 = it reaches `end`.
 * Native scrolling only: nothing is pinned or hijacked. Reduced motion → 1.
 */
export function useScrollProgress<T extends HTMLElement>(
  ref: RefObject<T | null>,
  start = 0.92,
  end = 0.35,
) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let top = 0;
    let last = "";
    // Cached document position: scrolling compares it with scrollY, no layout read.
    const geometry = () => {
      top = element.getBoundingClientRect().top + window.scrollY;
      requestScrollFrame();
    };
    const stop = onScrollFrame((y, vh) => {
      const raw = media.matches ? 1 : (vh * start - (top - y)) / (vh * (start - end));
      const value = Math.min(1, Math.max(0, raw)).toFixed(4);
      if (value === last) return;
      last = value;
      element.style.setProperty("--p", value);
    });
    geometry();
    const sizes = new ResizeObserver(geometry);
    sizes.observe(document.body);
    const stopMedia = onMediaChange(media, requestScrollFrame);
    return () => {
      stop();
      sizes.disconnect();
      stopMedia();
    };
  }, [ref, start, end]);
}
