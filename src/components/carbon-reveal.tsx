"use client";

import { useEffect, useRef } from "react";
import { createCarbonReveal } from "@/lib/carbon-reveal";

/*
 * Closing moment of the homepage: the platform's work in one movement
 * (collect, calculate by scope, consolidate, reduce), drawn by
 * lib/carbon-reveal.ts. It plays once, when the band is well in view.
 */

const SENTENCE = "Mesurer, c’est déjà commencer à réduire.";
const STEPS: [string, string, string] = [
  "Collecter les données d’activité",
  "Calculer les émissions par scope",
  "Consolider le bilan",
];

export function CarbonReveal({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = ref.current;
    if (!host) return;
    const reveal = createCarbonReveal(host, {
      sentence: SENTENCE,
      steps: STEPS,
      prefix: "carbon-reveal",
      stepClass: "t-meta",
      sentenceClass: "t-lead",
    });
    return () => reveal.dispose();
  }, []);

  return <div ref={ref} className={`carbon-reveal ${className}`.trim()} role="img" aria-label={`SPS-CARBON. ${SENTENCE}`} />;
}
