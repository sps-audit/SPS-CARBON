"use client";

import { useEffect, useRef, useState } from "react";

/* Meter-style figures: each digit rolls like the wheels of an energy meter. */
export function Odometer({ value, delay = 0, suffix }: { value: number; delay?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [run, setRun] = useState(false);
  const text = new Intl.NumberFormat("fr-FR").format(value);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let frame = 0;
    const check = () => {
      frame = 0;
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.9) {
        setRun(true);
        window.removeEventListener("scroll", schedule);
        window.removeEventListener("resize", schedule);
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  let position = 0;
  return (
    <span ref={ref} className={`odo ${run ? "is-run" : ""}`} style={{ ["--delay" as string]: `${delay}ms` }}>
      <span className="sr-only">
        {text}
        {suffix ? ` ${suffix}` : ""}
      </span>
      <span className="odo-face" aria-hidden="true">
        {Array.from(text).map((character, index) => {
          if (!/\d/.test(character)) {
            return (
              <span key={index} className="odo-sep">
                {character}
              </span>
            );
          }
          const k = position++;
          return (
            <span key={index} className="odo-digit" style={{ ["--d" as string]: Number(character), ["--k" as string]: k }}>
              <span className="odo-strip">
                {Array.from({ length: 20 }, (_, n) => (
                  <span key={n}>{n % 10}</span>
                ))}
              </span>
            </span>
          );
        })}
      </span>
    </span>
  );
}
