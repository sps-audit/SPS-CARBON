"use client";

import { useEffect } from "react";

/*
 * Living icons: motion.css draws the moves (.i.is-acting); this starts them
 * when a control is pointed at or reached with the keyboard. The class stays
 * for the whole move, so leaving early never cuts it short, and it replays on
 * the next visit. Two passive document listeners for the whole site; nothing
 * runs under reduced motion.
 */
const ACTOR = 'a, button, summary, label, [role="tab"], [role="option"]';
const ACT_MS = 520; // the longest move lasts 450 ms

export function useLivingIcons() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const timers = new Set<number>();
    const act = (event: Event) => {
      if (reduce.matches || !(event.target instanceof Element)) return;
      const host = event.target.closest(ACTOR);
      if (!host) return;
      // Moving between the parts of one control does not restart its move.
      const from = (event as PointerEvent | FocusEvent).relatedTarget;
      if (from instanceof Node && host.contains(from)) return;
      for (const icon of host.querySelectorAll(".i:not(.is-acting)")) {
        icon.classList.add("is-acting");
        const timer = window.setTimeout(() => {
          timers.delete(timer);
          icon.classList.remove("is-acting");
        }, ACT_MS);
        timers.add(timer);
      }
    };
    const onFocus = (event: FocusEvent) => {
      if (event.target instanceof Element && event.target.matches(":focus-visible")) act(event);
    };
    document.addEventListener("pointerover", act, { passive: true });
    document.addEventListener("focusin", onFocus, { passive: true });
    return () => {
      document.removeEventListener("pointerover", act);
      document.removeEventListener("focusin", onFocus);
      timers.forEach((timer) => window.clearTimeout(timer));
      timers.clear();
    };
  }, []);
}
