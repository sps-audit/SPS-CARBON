"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

/*
 * Page change: a petrol curtain sweeps in on the brand diagonal, a measuring
 * line runs along its edge and the destination name is "scanned" in the centre.
 * The route changes behind it, then the curtain leaves. Skipped under reduced motion.
 */

const names: Record<string, string> = {
  "/": "Accueil",
  "/plateforme": "La plateforme",
  "/solutions": "Solutions",
  "/methodologie": "Méthodologie",
  "/cabinet": "Le cabinet",
  "/ressources": "Ressources",
  "/contact": "Contact",
  "/mentions-legales": "Mentions légales",
  "/confidentialite": "Confidentialité",
  "/cookies": "Cookies",
  "/conditions-utilisation": "Conditions d’utilisation",
};

export function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<"idle" | "in" | "out">("idle");
  const [label, setLabel] = useState("");
  const pending = useRef<string | null>(null);
  const timer = useRef(0);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const anchor = (event.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!anchor || anchor.target || anchor.hasAttribute("download")) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      const bare = (path: string) => path.replace(/\/$/, "") || "/";
      if (bare(url.pathname) === bare(window.location.pathname)) return;
      if (/\.(zip|pdf|svg|png|txt)$/i.test(url.pathname)) return;
      event.preventDefault();
      const path = url.pathname.replace(/\/$/, "") || "/";
      setLabel(names[path] ?? "SPS-CARBON");
      pending.current = url.pathname + url.search + url.hash;
      setPhase("in");
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => {
        if (pending.current) router.push(pending.current);
      }, 520);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  useEffect(() => {
    if (!pending.current) return;
    pending.current = null;
    setPhase("out");
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setPhase("idle"), 900);
  }, [pathname]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  return (
    <div className={`page-curtain is-${phase}`} aria-hidden="true">
      <div className="curtain-panel">
        <span className="curtain-edge" />
        <div className="curtain-label">
          <small>SPS-CARBON</small>
          <strong>{label}</strong>
        </div>
      </div>
    </div>
  );
}
