"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/*
 * Phones only (see CSS): once the visitor is past the first screen, the two
 * next steps stay within thumb reach. Hidden on the contact page, while the
 * menu is open and as soon as the footer, with its own call to action, is in view.
 */
export function StickyCta({ pathname, hidden }: { pathname: string; hidden: boolean }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let frame = 0;
    const check = () => {
      frame = 0;
      const footer = document.querySelector(".site-footer");
      const footerIn = footer ? footer.getBoundingClientRect().top < window.innerHeight : false;
      setShow(window.scrollY > window.innerHeight * 0.8 && !footerIn);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    check();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [pathname]);

  if (pathname === "/contact") return null;
  const visible = show && !hidden;

  return (
    <div className={`sticky-cta ${visible ? "is-visible" : ""}`} aria-hidden={!visible} inert={!visible}>
      <Link href="/#diagnostic" className="sticky-cta-alt">
        Diagnostic express
      </Link>
      <Link href="/contact" className="btn btn-mint btn-small">
        Parlons de votre projet
      </Link>
    </div>
  );
}
