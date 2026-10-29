"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

/*
 * "Obturateur": a page change closes and reopens like a shutter whose two
 * blades meet on the diagonal of the SPS-CARBON symbol (its two parallel
 * cuts). A viridian hairline marks the seam while the route changes behind.
 * About 0.3 s to close, 0.5 s to open. Skipped under reduced motion, for
 * modified clicks, downloads, other sites and anchors on the same page.
 */
export function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<"idle" | "close" | "open">("idle");
  const pending = useRef<string | null>(null);
  const timer = useRef(0);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const anchor = (event.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!anchor || anchor.target || anchor.hasAttribute("download")) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin || url.protocol.startsWith("mailto")) return;
      const bare = (path: string) => path.replace(/\/$/, "") || "/";
      if (bare(url.pathname) === bare(window.location.pathname)) return;
      if (/\.(zip|pdf|svg|png|txt|xlsx|csv)$/i.test(url.pathname)) return;
      event.preventDefault();
      pending.current = url.pathname + url.search + url.hash;
      setPhase("close");
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => {
        if (pending.current) router.push(pending.current);
        // Safety: never leave the shutter closed if the route takes too long.
        timer.current = window.setTimeout(() => {
          pending.current = null;
          setPhase("open");
          timer.current = window.setTimeout(() => setPhase("idle"), 620);
        }, 2500);
      }, 320);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  useEffect(() => {
    if (!pending.current) return;
    pending.current = null;
    setPhase("open");
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setPhase("idle"), 620);
  }, [pathname]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  return (
    <div className={`shutter is-${phase}`} aria-hidden="true">
      <span className="shutter-blade shutter-a" />
      <span className="shutter-blade shutter-b" />
      <span className="shutter-seam" />
    </div>
  );
}
