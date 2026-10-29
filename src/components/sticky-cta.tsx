"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { onScrollFrame, requestScrollFrame } from "./scroll-store";

/*
 * Phones only (see CSS): once the visitor is past the first screen, the two
 * next steps stay within thumb reach. Hidden on the contact page, while the
 * menu is open and as soon as the footer, with its own call to action, is in view.
 */
export function StickyCta({ pathname, hidden }: { pathname: string; hidden: boolean }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let footerTop = Infinity;
    let last: boolean | null = null;
    const geometry = () => {
      const footer = document.querySelector(".site-footer");
      footerTop = footer ? footer.getBoundingClientRect().top + window.scrollY : Infinity;
      requestScrollFrame();
    };
    const stop = onScrollFrame((y, vh) => {
      const next = y > vh * 0.8 && y + vh < footerTop;
      if (next !== last) {
        last = next;
        setShow(next);
      }
    });
    geometry();
    const sizes = new ResizeObserver(geometry);
    sizes.observe(document.body);
    return () => {
      stop();
      sizes.disconnect();
    };
  }, [pathname]);

  if (pathname === "/contact") return null;
  const visible = show && !hidden;

  return (
    <div className={`sticky-cta ${visible ? "is-visible" : ""}`} aria-hidden={!visible} inert={!visible}>
      <Link href="/outils" className="sticky-cta-alt">
        Outils gratuits
      </Link>
      <Link href="/contact" className="btn btn-signal btn-small">
        Parlons de votre projet
      </Link>
    </div>
  );
}
