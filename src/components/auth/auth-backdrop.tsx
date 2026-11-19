"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

// When the backdrop was first shown in this visit: moving between the sign-in
// and account pages keeps it in place instead of fading it in again.
let shownAt = 0;

/*
 * The backdrop behind the sign-in and account pages: the "voile" ambiance
 * image (src/lib/ambiance.ts), a soft green blur. It arrives softly once
 * decoded, then breathes: a very slow drift, a band of light travelling
 * across, and, with a mouse, a slight depth that follows the pointer. A fine
 * grain keeps the large gradients free of banding on every screen. Portrait
 * screens get the portrait version; AVIF then WebP. Still under reduced motion.
 */
export function AuthBackdrop() {
  const scene = useRef<HTMLDivElement>(null);
  const photo = useRef<HTMLImageElement>(null);
  const [ready, setReady] = useState(() => shownAt > 0);
  const [instant] = useState(() => shownAt > 0);
  const [since] = useState(() => (shownAt ? (performance.now() - shownAt) / 1000 : 0));
  const show = () => {
    if (!shownAt) shownAt = performance.now();
    setReady(true);
  };

  useEffect(() => {
    // Already decoded from the cache before the page became interactive.
    if (photo.current?.complete && photo.current.naturalWidth) show();

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
    <div
      className={`auth-backdrop ${ready ? "is-ready" : ""} ${instant ? "is-instant" : ""}`}
      style={{ ["--since" as string]: `${-since.toFixed(2)}s` } as CSSProperties}
      aria-hidden="true"
    >
      <div className="auth-scene" ref={scene}>
        <picture className="auth-photo">
          <source
            media="(orientation: portrait)"
            type="image/avif"
            srcSet="/images/ambiance/voile-haut-480.avif 480w, /images/ambiance/voile-haut-768.avif 768w"
            sizes="100vw"
          />
          <source
            media="(orientation: portrait)"
            type="image/webp"
            srcSet="/images/ambiance/voile-haut-480.webp 480w, /images/ambiance/voile-haut-768.webp 768w"
            sizes="100vw"
          />
          <source type="image/avif" srcSet="/images/ambiance/voile-large-1000.avif 1000w, /images/ambiance/voile-large-1920.avif 1920w" sizes="100vw" />
          <img
            ref={photo}
            src="/images/ambiance/voile-large-1920.webp"
            srcSet="/images/ambiance/voile-large-1000.webp 1000w, /images/ambiance/voile-large-1920.webp 1920w"
            sizes="100vw"
            alt=""
            width={1920}
            height={1072}
            decoding="async"
            fetchPriority="high"
            onLoad={show}
          />
        </picture>
      </div>
      <div className="auth-light" />
      <div className="auth-veil" />
      <div className="auth-grain" />
    </div>
  );
}
