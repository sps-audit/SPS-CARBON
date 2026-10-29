"use client";

import { useEffect, useRef, useState } from "react";

/*
 * The landscape behind the sign-in and account pages. It arrives softly
 * once decoded, then breathes: a very slow drift of the hills, a band of
 * light travelling across the valley, and, with a mouse, a slight depth that
 * follows the pointer. A fine grain keeps the large gradients free of banding
 * on every screen. Portrait screens get a portrait crop; AVIF, WebP and JPEG
 * are offered in that order. Still under reduced motion.
 */
export function AuthBackdrop() {
  const scene = useRef<HTMLDivElement>(null);
  const photo = useRef<HTMLImageElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Already decoded from the cache before the page became interactive.
    if (photo.current?.complete && photo.current.naturalWidth) setReady(true);

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || still.matches) return;
    let frame = 0;
    let x = 0;
    let y = 0;
    const apply = () => {
      frame = 0;
      scene.current?.style.setProperty("--px", x.toFixed(3));
      scene.current?.style.setProperty("--py", y.toFixed(3));
    };
    const onMove = (event: PointerEvent) => {
      x = (event.clientX / window.innerWidth - 0.5) * 2;
      y = (event.clientY / window.innerHeight - 0.5) * 2;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className={`auth-backdrop ${ready ? "is-ready" : ""}`} aria-hidden="true">
      <div className="auth-scene" ref={scene}>
        <picture className="auth-photo">
          <source media="(orientation: portrait)" type="image/avif" srcSet="/images/auth/paysage-portrait-1290.avif" />
          <source media="(orientation: portrait)" type="image/webp" srcSet="/images/auth/paysage-portrait-1290.webp" />
          <source media="(orientation: portrait)" srcSet="/images/auth/paysage-portrait-1290.jpg" />
          <source type="image/avif" srcSet="/images/auth/paysage-1920.avif 1920w, /images/auth/paysage-3200.avif 3200w" sizes="100vw" />
          <source type="image/webp" srcSet="/images/auth/paysage-1920.webp 1920w" sizes="100vw" />
          <img
            ref={photo}
            src="/images/auth/paysage-1920.jpg"
            alt=""
            width={1920}
            height={1081}
            decoding="async"
            fetchPriority="high"
            onLoad={() => setReady(true)}
          />
        </picture>
      </div>
      <div className="auth-light" />
      <div className="auth-veil" />
      <div className="auth-grain" />
    </div>
  );
}
