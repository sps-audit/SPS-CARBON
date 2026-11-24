"use client";

import { useState } from "react";
import { Plate, Bezel } from "./plate";
import { captures, type CaptureId } from "@/lib/demo-case";
import type { AmbianceName } from "@/lib/ambiance";

/*
 * The real platform on a plate (24 Nov 2026): captures of SPS-CARBON itself,
 * taken at twice the pixel density from the platform's demonstration, never
 * redrawn. The light and dark captures follow the site's theme; only the one
 * shown is downloaded (both are lazy, the hidden one never enters the screen).
 * With `tabs`, the visitor switches between three real screens.
 */
function Shot({ id, theme, alt, sizes }: { id: CaptureId; theme: "clair" | "sombre"; alt: string; sizes: string }) {
  const base = `/images/plateforme/${id}-${theme}`;
  const set = (ext: string) => `${base}-1200.${ext} 1200w, ${base}-2000.${ext} 2000w`;
  return (
    <picture className={`capture-img is-${theme}`}>
      <source type="image/avif" srcSet={set("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={set("webp")} sizes={sizes} />
      <img src={`${base}-1200.webp`} width={1440} height={900} alt={alt} loading="lazy" decoding="async" />
    </picture>
  );
}

export function PlatformCapture({
  tabs = false,
  ambiance = "lumiere",
  sizes = "(max-width: 1000px) 100vw, 1100px",
  className = "",
}: {
  tabs?: boolean;
  ambiance?: AmbianceName;
  sizes?: string;
  className?: string;
}) {
  const [shown, setShown] = useState<CaptureId>("tableau-de-bord");
  const list = tabs ? captures : captures.filter((c) => c.id === "tableau-de-bord");
  return (
    <div className={`capture ${className}`}>
      {tabs && (
        <div className="seg capture-tabs" role="group" aria-label="Écrans de la plateforme">
          {captures.map((c) => (
            <button key={c.id} type="button" aria-pressed={c.id === shown} onClick={() => setShown(c.id)}>
              {c.label}
            </button>
          ))}
        </div>
      )}
      <Plate ambiance={ambiance} sizes={sizes} demo className="capture-plate">
        <Bezel className="capture-bezel">
          {list.map((c) => (
            <div key={c.id} className="capture-frame" hidden={c.id !== shown}>
              <Shot id={c.id} theme="clair" alt={c.alt} sizes={sizes} />
              <Shot id={c.id} theme="sombre" alt={c.alt} sizes={sizes} />
            </div>
          ))}
        </Bezel>
      </Plate>
    </div>
  );
}
