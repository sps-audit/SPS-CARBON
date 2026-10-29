"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { cellPath, coverRadius, headerSymbol } from "@/lib/cell";

/*
 * "La cellule": a page change passes through the brand. The soft hexagon of
 * the logo grows from the link that was clicked until it fills the screen,
 * the route changes behind it, then it shrinks back into the symbol of the
 * logo in the header, as if the new page came out of the mark. A viridian
 * ring follows the cell at both ends. About 0.45 s to close, 0.65 s to open.
 * Skipped under reduced motion, for modified clicks, downloads, other sites
 * and anchors on the same page.
 */

const UNIT = 100; // the cell is drawn once, circumradius 100, and scaled
const CELL = cellPath(0, 0, UNIT);
const EASE_IN_OUT = "cubic-bezier(0.7, 0, 0.2, 1)";
const EASE_OUT = "cubic-bezier(0.16, 1, 0.3, 1)";

type Point = { x: number; y: number };

const at = (p: Point, scale: number, turn = 0) =>
  `translate(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px) rotate(${turn}deg) scale(${Math.max(scale, 0.0001).toFixed(4)})`;

export function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const veil = useRef<HTMLDivElement>(null);
  const body = useRef<SVGPathElement>(null);
  const ring = useRef<SVGPathElement>(null);
  const pending = useRef<string | null>(null);
  const origin = useRef<Point>({ x: 0, y: 0 });
  const timer = useRef(0);
  const busy = useRef(false);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (busy.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const anchor = (event.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!anchor || anchor.target || anchor.hasAttribute("download")) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin || url.protocol.startsWith("mailto")) return;
      const bare = (path: string) => path.replace(/\/$/, "") || "/";
      if (bare(url.pathname) === bare(window.location.pathname)) return;
      if (/\.(zip|pdf|svg|png|jpg|txt|xlsx|csv)$/i.test(url.pathname)) return;
      const cell = body.current;
      const halo = ring.current;
      if (!cell || !halo || typeof cell.animate !== "function") return;
      event.preventDefault();

      busy.current = true;
      pending.current = url.pathname + url.search + url.hash;
      // From the pointer, or from the middle of the link when it was the keyboard.
      const box = anchor.getBoundingClientRect();
      const from = event.detail === 0 || (event.clientX === 0 && event.clientY === 0)
        ? { x: box.left + box.width / 2, y: box.top + box.height / 2 }
        : { x: event.clientX, y: event.clientY };
      origin.current = from;
      const full = coverRadius(from.x, from.y, window.innerWidth, window.innerHeight) / UNIT;

      veil.current?.classList.add("is-on");
      cell.getAnimations().forEach((a) => a.cancel());
      halo.getAnimations().forEach((a) => a.cancel());
      const close = cell.animate(
        [{ transform: at(from, 0.06, -30) }, { transform: at(from, full, 0) }],
        { duration: 460, easing: EASE_IN_OUT, fill: "forwards" },
      );
      halo.animate(
        [
          { transform: at(from, 0.06, -30), opacity: 1 },
          { transform: at(from, full * 0.55, -6), opacity: 0.9, offset: 0.7 },
          { transform: at(from, full * 0.8, 0), opacity: 0 },
        ],
        { duration: 460, easing: EASE_IN_OUT, fill: "forwards" },
      );
      close.finished
        .then(() => {
          if (pending.current) router.push(pending.current);
          // Safety: never leave the cell closed if the route takes too long.
          window.clearTimeout(timer.current);
          timer.current = window.setTimeout(() => {
            if (pending.current) {
              pending.current = null;
              open();
            }
          }, 2500);
        })
        .catch(() => {});
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
    // `open` only reads refs, so it does not need to be a dependency.
  }, [router]);

  function open() {
    const cell = body.current;
    const halo = ring.current;
    if (!cell || !halo) return;
    const from = origin.current;
    const full = coverRadius(from.x, from.y, window.innerWidth, window.innerHeight) / UNIT;
    const mark = headerSymbol();
    const to = mark ? { x: mark.x, y: mark.y } : { x: window.innerWidth / 2, y: 40 };
    const end = (mark ? mark.r : 12) / UNIT;
    cell.getAnimations().forEach((a) => a.cancel());
    const shrink = cell.animate(
      [
        { transform: at(from, full, 0), opacity: 1 },
        { transform: at(to, end, 0), opacity: 1, offset: 0.92 },
        { transform: at(to, end, 0), opacity: 0 },
      ],
      { duration: 680, easing: EASE_OUT, fill: "forwards" },
    );
    halo.getAnimations().forEach((a) => a.cancel());
    halo.animate(
      [
        { transform: at(to, end, 0), opacity: 0 },
        { transform: at(to, end, 0), opacity: 0.9, offset: 0.55 },
        { transform: at(to, end * 2.6, 0), opacity: 0 },
      ],
      { duration: 900, easing: EASE_OUT, fill: "forwards" },
    );
    shrink.finished
      .then(() => {
        veil.current?.classList.remove("is-on");
        busy.current = false;
      })
      .catch(() => {
        busy.current = false;
      });
  }

  useEffect(() => {
    if (!pending.current) return;
    pending.current = null;
    window.clearTimeout(timer.current);
    // Let the new page lay out its header before the cell aims at the logo.
    requestAnimationFrame(() => requestAnimationFrame(open));
  }, [pathname]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  return (
    <div className="cell-veil" ref={veil} aria-hidden="true">
      <svg focusable="false">
        <path className="cell-body" ref={body} d={CELL} />
        <path className="cell-ring" ref={ring} d={CELL} />
      </svg>
    </div>
  );
}
