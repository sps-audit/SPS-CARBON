"use client";

import { useEffect, useRef } from "react";

/*
 * "Aiguille": a figure that settles on its value like the needle of a meter,
 * with a damped spring (a small overshoot, then rest) instead of a linear
 * count-up. It starts when it enters the viewport, and glides to any new
 * value afterwards. The real value is always in the DOM for assistive
 * technologies and search engines; under reduced motion it is shown at once.
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
}: {
  value: number;
  decimals?: number;
  /** Starting point of the first reading (defaults to 0). */
  from?: number;
  className?: string;
  prefix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  // The visible face is written directly (no re-render per frame); React only
  // renders its first text. The real value stays in the screen-reader copy.
  const face = useRef(prefix + format(value, decimals)).current;
  const state = useRef({ x: from ?? 0, v: 0, target: value, started: false, frame: 0, last: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const s = state.current;
    s.target = value;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const write = (x: number) => {
      element.textContent = prefix + format(x, decimals);
    };
    if (reduce) {
      s.x = value;
      write(value);
      return;
    }
    // Critically under-damped spring: stiffness k, damping c (per second).
    const k = 140;
    const c = 17;
    const step = (time: number) => {
      const dt = Math.min(0.032, (time - (s.last || time)) / 1000);
      s.last = time;
      const a = -k * (s.x - s.target) - c * s.v;
      s.v += a * dt;
      s.x += s.v * dt;
      const settled = Math.abs(s.x - s.target) < Math.pow(10, -decimals) / 4 && Math.abs(s.v) < 0.5;
      if (settled) {
        s.x = s.target;
        s.v = 0;
        s.frame = 0;
        s.last = 0;
        write(s.x);
        return;
      }
      write(s.x);
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
    write(s.x);
    if (!("IntersectionObserver" in window)) {
      s.started = true;
      run();
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        s.started = true;
        observer.disconnect();
        run();
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [value, decimals, prefix]);

  useEffect(() => () => cancelAnimationFrame(state.current.frame), []);

  return (
    <span className={`reading ${className}`}>
      <span className="sr-only">{prefix + format(value, decimals)}</span>
      <span ref={ref} aria-hidden="true">
        {face}
      </span>
    </span>
  );
}
