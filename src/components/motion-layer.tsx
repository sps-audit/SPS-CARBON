"use client";

import { useEffect } from "react";
import { onScrollFrame } from "./scroll-store";

/*
 * Site-wide motion engine. Since Nov 2026 the site keeps motion for what
 * carries meaning: nothing fades in on scroll and nothing follows the pointer.
 * What is left here is the page progress, the graduated line of the header
 * (.site-progress i), written from the shared scroll reader without forcing
 * layout: the page height is measured once, and again when it changes.
 */
export function MotionLayer() {
  useEffect(() => {
    let max = 1;
    let last = "";
    let bar: HTMLElement | null = null;
    const measure = () => {
      bar = document.querySelector<HTMLElement>(".site-progress i");
      max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    };
    measure();
    const stop = onScrollFrame((y) => {
      const progress = Math.min(1, Math.max(0, y / max)).toFixed(4);
      if (!bar || progress === last) return;
      last = progress;
      bar.style.transform = `scaleX(${progress})`;
    });
    const sizes = new ResizeObserver(measure);
    sizes.observe(document.body);
    return () => {
      stop();
      sizes.disconnect();
    };
  }, []);

  return null;
}
