import { createElement } from "react";

/*
 * A section heading. It used to come into focus word by word as it scrolled
 * in; since Nov 2026 the site keeps motion for what carries meaning, so the
 * heading is simply there at first paint. The component stays so every page
 * keeps one way of writing its headings.
 */
type FocusProps = {
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  id?: string;
  children: string;
  /** Kept for compatibility; no longer used. */
  delay?: number;
};

export function Focus({ as = "h2", className = "", id, children }: FocusProps) {
  return createElement(as, { className, id }, children);
}
