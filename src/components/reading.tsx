"use client";

import { useEffect, useRef } from "react";

/*
 * "Aiguille": a figure that settles on its value like the needle of a meter,
 * with a damped spring (a small overshoot, then rest) instead of a linear
 * count-up. It starts when it enters the viewport, and glides to any new
 * value afterwards.
 *
 * The page holds one text only, the real value: screen readers, copy-paste,
 * search engines and translation tools all read "2 037", never "2 037 2 236".
 * While the figure moves, that text is made transparent and the moving digits
 * are drawn on top by CSS generated content (`.reading-face::before`), on an
 * element hidden from assistive technologies. At rest the face is removed.
 * Under reduced motion, or without JavaScript, the value is simply shown.
 */
const formats = new Map<number, Intl.NumberFormat>();
function format(value: number, decimals: number) {
  let f = formats.get(decimals);
  if (!f) {
    f = new Intl.NumberFormat("fr-FR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
    formats.set(decimals, f);
  }
  return f.format(value);
}

export function Reading({
  value,
  decimals = 0,
  from,
  className = "",
  prefix = "",
  delay = 0,
}: {
  value: number;
  decimals?: number;
  /** Starting point of the first reading (defaults to 0). */
  from?: number;
  className?: string;
  prefix?: string;
  /** Wait before the first reading, in ms (to land on a beat of a sequence). */
  delay?: number;
}) {
  const root = useRef<HTMLSpanElement>(null);
  const face = useRef<HTMLSpanElement>(null);
  const state = useRef({ x: from ?? 0, v: 0, target: value, started: false, frame: 0, last: 0 });

  useEffect(() => {
    const element = root.current;
    const dial = face.current;
    if (!element || !dial) return;
    const s = state.current;
    s.target = value;
    // The moving digits; `null` puts the figure back at rest (real text only).
    const draw = (x: number | null) => {
      if (x === null) {
        element.classList.remove("is-rolling");
        dial.removeAttribute("data-face");
        return;
      }
      dial.setAttribute("data-face", prefix + format(x, decimals));
      element.classList.add("is-rolling");
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      s.x = value;
      draw(null);
      return;
    }
    // Under-damped spring: stiffness k, damping c (per second).
    const k = 140;
    const c = 17;
    const step = (time: number) => {
      const dt = Math.min(0.032, (time - (s.last || time)) / 1000);
      s.last = time;
      const a = -k * (s.x - s.target) - c * s.v;
      s.v += a * dt;
      s.x += s.v * dt;
      if (Math.abs(s.x - s.target) < Math.pow(10, -decimals) / 4 && Math.abs(s.v) < 0.5) {
        s.x = s.target;
        s.v = 0;
        s.frame = 0;
        s.last = 0;
        draw(null);
        return;
      }
      draw(s.x);
      s.frame = requestAnimationFrame(step);
    };
    const run = () => {
      if (!s.frame) {
        s.last = 0;
        s.frame = requestAnimationFrame(step);
      }
    };
    if (s.started) {
      run();
      return;
    }
    // First reading: wait until the figure is on screen.
    let wait = 0;
    const start = () => {
      s.started = true;
      if (delay > 0) wait = window.setTimeout(run, delay);
      else run();
    };
    draw(s.x);
    if (!("IntersectionObserver" in window)) {
      start();
      return () => window.clearTimeout(wait);
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        start();
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
      window.clearTimeout(wait);
    };
  }, [value, decimals, prefix, delay]);

  useEffect(() => () => cancelAnimationFrame(state.current.frame), []);

  return (
    <span ref={root} className={`reading ${className}`}>
      <span className="reading-value">{prefix + format(value, decimals)}</span>
      <span ref={face} className="reading-face" aria-hidden="true" />
    </span>
  );
}
