import { ambiances, type AmbianceName, type AmbianceShape } from "@/lib/ambiance";

/*
 * One ambiance image (src/lib/ambiance.ts): AVIF first, then WebP, two widths
 * so a phone downloads the small one. Decorative: hidden from assistive
 * technologies, never carries information on its own. Lazy unless it is in
 * the first screen. The picture fills its positioned parent (`.amb`).
 */
export function Ambiance({
  name,
  shape = "large",
  sizes = "100vw",
  eager = false,
  className = "",
}: {
  name: AmbianceName;
  shape?: AmbianceShape;
  /** Displayed width, for the browser's choice between the two files. */
  sizes?: string;
  eager?: boolean;
  className?: string;
}) {
  const { widths, width, height } = ambiances[name][shape];
  const base = `/images/ambiance/${name}-${shape}`;
  const set = (ext: string) => widths.map((w) => `${base}-${w}.${ext} ${w}w`).join(", ");
  return (
    <picture className={`amb amb-${name} ${className}`} aria-hidden="true">
      <source type="image/avif" srcSet={set("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={set("webp")} sizes={sizes} />
      <img
        src={`${base}-${widths[1]}.webp`}
        width={width}
        height={height}
        alt=""
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={eager ? "high" : "auto"}
      />
    </picture>
  );
}
