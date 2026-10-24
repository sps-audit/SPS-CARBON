/** Pointy-top hexagon points, matching the orientation of the SPS-CARBON symbol. */
export function hexPoints(cx: number, cy: number, r: number) {
  return Array.from({ length: 6 }, (_, i) => {
    const angle = ((-90 + i * 60) * Math.PI) / 180;
    return `${(cx + r * Math.cos(angle)).toFixed(2)},${(cy + r * Math.sin(angle)).toFixed(2)}`;
  }).join(" ");
}

/** The SPS-CARBON symbol on its 64 × 64 grid (see docs/brand/brand-guidelines.md). */
export const SYMBOL_PATH =
  "M58 32V18L32 3L6 18V46L32 61L58 46V40L46 33V39L32 47L18 39V25L32 17L46 25Z";
