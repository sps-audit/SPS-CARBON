"use client";

import { useEffect, useSyncExternalStore, type MouseEvent } from "react";
import { DEFAULT_THEME, THEME_COLORS, THEME_KEY, type Theme } from "@/lib/theme";
import { cellPath, coverRadius } from "@/lib/cell";

/*
 * Switch between the light version (default) and the dark one. Where the
 * browser supports view transitions, the new version opens from the switch
 * inside the soft hexagon of the logo until it covers the page; otherwise,
 * or with reduced motion, it changes at once.
 */

function current(): Theme {
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

function apply(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  for (const meta of document.querySelectorAll('meta[name="theme-color"]')) meta.setAttribute("content", THEME_COLORS[theme]);
}

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  // Another tab changed the version: follow it.
  const onStorage = (event: StorageEvent) => {
    if (event.key === THEME_KEY && (event.newValue === "light" || event.newValue === "dark")) apply(event.newValue);
  };
  window.addEventListener("storage", onStorage);
  return () => {
    observer.disconnect();
    window.removeEventListener("storage", onStorage);
  };
}

type TransitionDocument = Document & { startViewTransition?: (update: () => void) => { ready: Promise<void> } };

export function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, current, () => DEFAULT_THEME);
  const light = theme === "light";

  // Keep the browser bar colour in step with a saved choice.
  useEffect(() => {
    for (const meta of document.querySelectorAll('meta[name="theme-color"]')) meta.setAttribute("content", THEME_COLORS[theme]);
  }, [theme]);

  function toggle(event: MouseEvent<HTMLButtonElement>) {
    const next: Theme = light ? "dark" : "light";
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      /* private mode: the choice lasts for this page only */
    }
    const doc = document as TransitionDocument;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!doc.startViewTransition || reduced) {
      apply(next);
      return;
    }
    const box = event.currentTarget.getBoundingClientRect();
    const x = box.left + box.width / 2;
    const y = box.top + box.height / 2;
    const full = coverRadius(x, y, window.innerWidth, window.innerHeight);
    const transition = doc.startViewTransition(() => apply(next));
    transition.ready
      .then(() => {
        document.documentElement.animate(
          { clipPath: [`path("${cellPath(x, y, 6)}")`, `path("${cellPath(x, y, full)}")`] },
          { duration: 760, easing: "cubic-bezier(0.7, 0, 0.2, 1)", pseudoElement: "::view-transition-new(root)" },
        );
      })
      .catch(() => {});
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={light}
      aria-label="Version claire"
      title={light ? "Passer à la version sombre" : "Passer à la version claire"}
      className={`theme-toggle ${className}`}
      onClick={toggle}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" className="theme-icon theme-icon-sun">
        <circle cx="12" cy="12" r="4.2" />
        <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6" />
      </svg>
      <svg viewBox="0 0 24 24" aria-hidden="true" className="theme-icon theme-icon-moon">
        <path d="M19.5 14.6A8 8 0 0 1 9.4 4.5a8 8 0 1 0 10.1 10.1Z" />
      </svg>
    </button>
  );
}
