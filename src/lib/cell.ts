/*
 * The brand cell: the hexagon of the SPS-CARBON symbol (point at the top),
 * with softened corners like the 2026 logo. Page changes and the theme switch
 * are drawn with it, so every large movement on the site has the logo's shape
 * and none of them has a sharp corner.
 */

const f = (n: number) => n.toFixed(2);

/** Path of a rounded hexagon centred on (cx, cy), circumradius r. */
export function cellPath(cx: number, cy: number, r: number, softness = 0.1) {
  const points = Array.from({ length: 6 }, (_, i) => {
    const angle = ((-90 + i * 60) * Math.PI) / 180;
    return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)];
  });
  let d = "";
  points.forEach((c, i) => {
    const p = points[(i + 5) % 6];
    const n = points[(i + 1) % 6];
    const a = [c[0] + (p[0] - c[0]) * softness, c[1] + (p[1] - c[1]) * softness];
    const b = [c[0] + (n[0] - c[0]) * softness, c[1] + (n[1] - c[1]) * softness];
    d += `${i === 0 ? "M" : "L"}${f(a[0])} ${f(a[1])}Q${f(c[0])} ${f(c[1])} ${f(b[0])} ${f(b[1])}`;
  });
  return `${d}Z`;
}

/** Circumradius a cell centred on (x, y) needs to cover the whole viewport. */
export function coverRadius(x: number, y: number, width: number, height: number) {
  const far = Math.max(Math.hypot(x, y), Math.hypot(width - x, y), Math.hypot(x, height - y), Math.hypot(width - x, height - y));
  // The inscribed circle of a hexagon is cos 30° of its circumradius.
  return (far / Math.cos(Math.PI / 6)) * 1.03;
}

/** The symbol of the logo currently shown in the header (light or dark version). */
export function headerSymbol() {
  const logos = Array.from(document.querySelectorAll<HTMLImageElement>(".site-brand img"));
  const logo = logos.find((img) => img.getBoundingClientRect().width > 0);
  if (!logo) return null;
  const box = logo.getBoundingClientRect();
  // In the cropped logo the symbol is the first 104 of 916 units, full height.
  return { x: box.left + box.width * (52 / 916), y: box.top + box.height / 2, r: box.height / 2 };
}
