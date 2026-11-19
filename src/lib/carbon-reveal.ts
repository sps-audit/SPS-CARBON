/*
 * The work of SPS-CARBON in one movement, drawn in SVG from a single clock.
 * Activity data appears; each point travels into its scope and draws that
 * scope's ring as it lands; the three rings close into the logo; then the
 * emissions curve passes through the logo and turns down into the plan, and
 * the gap with the old trend fills as avoided emissions.
 *
 * Colours come from the page: --reveal-ink (raw data, the past), --reveal-live
 * (lines and measured data), --reveal-fill (glow, avoided emissions),
 * --reveal-logo and --reveal-bg (behind the scope numbers).
 *
 * Every frame is a function of time and of the box size: a resize redraws the
 * same moment, and reduced motion simply shows the last frame. Used at the end
 * of the homepage, and as plain JavaScript when the platform opens after an
 * account is chosen.
 */
import { cellPath } from "./cell";

export interface CarbonRevealOptions {
  /** The closing sentence, shown at the end. */
  sentence: string;
  /** The words of the three steps: collect, calculate by scope, consolidate. */
  steps: [string, string, string];
  /** Prefix of the classes the page styles: `${prefix}-text`, `-step`, `-sentence`. */
  prefix: string;
  /** Shared type classes of the page, added to the two lines of text. */
  stepClass?: string;
  sentenceClass?: string;
  /** "visible" waits until 40% of the box is on screen; "now" plays at once. */
  start?: "visible" | "now";
  speed?: number;
  /** Called once the last frame is drawn (not under reduced motion). */
  onEnd?: () => void;
}

export interface CarbonReveal {
  dispose(): void;
  /** Jumps to the last frame, without calling onEnd. */
  skip(): void;
  /** Where the logo is on screen, so a page can carry it on. */
  logoBox(): DOMRect | null;
}

/* ------------------------------------------------------------------ *
 * Timeline, in seconds
 * ------------------------------------------------------------------ */
const RING_START = [1.9, 2.2, 2.5]; // Scope 1, 2, 3 start drawing
const RING_DRAW = 1.2;
const CLOSE_START = [4.1, 4.0, 3.9]; // the rings close into the logo, outer ring first
const CLOSE = 1.0;
const LOGO = [4.55, 5.25];
const CURVE = [5.0, 6.5];
const SENTENCE = [5.8, 6.5];
const STEPS: [number, number][] = [
  [0.15, 1.85],
  [2.0, 3.75],
  [3.9, 4.95],
];
export const CARBON_REVEAL_END = 6.8;

// The SPS-CARBON symbol, centred on (64, 64), 114.4 units tall.
const MARK =
  "M61.098,7.674 Q64,6 66.902,7.674 L113.098,34.326 Q116,36 116,39.35 L116,61.65 Q116,65 113.118,63.292 L91.882,50.708 Q89,49 86.077,47.363 L66.923,36.637 Q64,35 61.077,36.637 L41.923,47.363 Q39,49 39,52.35 L39,75.65 Q39,79 41.923,80.637 L61.077,91.363 Q64,93 66.902,91.326 L88.354,78.949 Q90,78 90,76.1 L90,69.9 Q90,68 91.646,68.949 L113.696,81.671 Q116,83 116,85.66 L116,94.34 Q116,97 113.603,98.153 L67.019,120.548 Q64,122 61.098,120.326 L14.902,93.674 Q12,92 12,88.65 L12,39.35 Q12,36 14.902,34.326 L61.098,7.674 Z";
const MARK_HALF = 57.2;

/* ------------------------------------------------------------------ *
 * Small maths
 * ------------------------------------------------------------------ */
const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);
const span = (t: number, a: number, b: number) => clamp01((t - a) / (b - a));
const mix = (a: number, b: number, t: number) => a + (b - a) * t;
const easeOut = (x: number) => 1 - (1 - x) ** 4;
const easeInOut = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - (-2 * x + 2) ** 3 / 2);
const smooth = (x: number) => x * x * (3 - 2 * x);
const f = (n: number) => n.toFixed(1);

function random(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Inverse of smooth(), so a point lands exactly when the drawing of its ring passes it.
function unsmooth(y: number) {
  let lo = 0;
  let hi = 1;
  for (let i = 0; i < 24; i++) {
    const m = (lo + hi) / 2;
    if (smooth(m) < y) lo = m;
    else hi = m;
  }
  return (lo + hi) / 2;
}

// The point at u on the ring that cellPath() draws: u is the share of its length, from the start
// of the path just before the top vertex, clockwise, so a point lands where the drawing passes.
const SOFT = 0.1;
const quad = (a: number, c: number, b: number, t: number) => (1 - t) ** 2 * a + 2 * (1 - t) * t * c + t * t * b;
const CORNER = (() => {
  // Length of one softened corner for a circumradius of 1 (the side is then 1 too).
  const a = [Math.cos(Math.PI / 6) * SOFT, -1 + Math.sin(Math.PI / 6) * SOFT];
  let len = 0;
  let prev = [-a[0], a[1]];
  for (let i = 1; i <= 32; i++) {
    const t = i / 32;
    const q = [quad(-a[0], 0, a[0], t), quad(a[1], -1, a[1], t)];
    len += Math.hypot(q[0] - prev[0], q[1] - prev[1]);
    prev = q;
  }
  return len;
})();
const STRAIGHT = 1 - 2 * SOFT;

function onCell(cx: number, cy: number, r: number, u: number): [number, number] {
  const v = (i: number) => {
    const angle = ((-90 + (((i % 6) + 6) % 6) * 60) * Math.PI) / 180;
    return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)];
  };
  const seg = CORNER + STRAIGHT;
  const pos = (((u % 1) + 1) % 1) * 6 * seg;
  const i = Math.min(5, Math.floor(pos / seg));
  const rest = pos - i * seg;
  const c = v(i);
  const before = v(i - 1);
  const after = v(i + 1);
  const b = [mix(c[0], after[0], SOFT), mix(c[1], after[1], SOFT)];
  if (rest < CORNER) {
    const t = rest / CORNER;
    const a = [mix(c[0], before[0], SOFT), mix(c[1], before[1], SOFT)];
    return [quad(a[0], c[0], b[0], t), quad(a[1], c[1], b[1], t)];
  }
  const next = v(i + 1);
  const nextA = [mix(next[0], c[0], SOFT), mix(next[1], c[1], SOFT)];
  const t = (rest - CORNER) / STRAIGHT;
  return [mix(b[0], nextA[0], t), mix(b[1], nextA[1], t)];
}

// The top of the drawn ring, where each scope's number sits.
const TOP = CORNER / 2 / (6 * (CORNER + STRAIGHT));

/* ------------------------------------------------------------------ *
 * Layout: everything in pixels of the box
 * ------------------------------------------------------------------ */
interface Point {
  x: number;
  y: number;
  scope: number;
  u: number;
  size: number;
  appear: number;
  leave: number;
  land: number;
  phase: number;
}

interface Layout {
  w: number;
  h: number;
  cx: number;
  cy: number;
  rings: number[];
  logo: number;
  gap: number;
  amp: number;
  line: number;
  points: Point[];
}

function layoutFor(w: number, h: number, textTop: number): Layout {
  const room = Math.max(120, textTop - 16);
  const outer = Math.max(40, Math.min(w * 0.3, room * 0.42, 230));
  const cx = w / 2;
  const cy = room / 2 + 6;
  const rings = [outer * 0.6, outer * 0.8, outer];
  const logo = outer * 0.3;
  const gap = logo * 1.45;
  const amp = Math.max(36, Math.min(h * 0.3, textTop - 28 - cy, 210));
  const line = Math.min(1.6, Math.max(1, outer / 150));

  // Activity data: scattered across the box, clear of the rings and of the text.
  const rand = random(2026);
  const count = Math.round(Math.min(72, Math.max(36, (w * h) / 9000)));
  const free: { x: number; y: number }[] = [];
  for (let i = 0; i < 2000 && free.length < count; i++) {
    const x = 14 + rand() * (w - 28);
    const y = 14 + rand() * (textTop - 34);
    const d = Math.hypot((x - cx) / 1.1, y - cy);
    if (d > outer * 1.14) free.push({ x, y });
  }
  // Near points feed Scope 1, the farthest feed Scope 3, the value chain.
  free.sort((a, b) => Math.hypot(a.x - cx, a.y - cy) - Math.hypot(b.x - cx, b.y - cy));
  const cuts = [Math.round(free.length * 0.3), Math.round(free.length * 0.6), free.length];
  const points: Point[] = [];
  let from = 0;
  cuts.forEach((to, scope) => {
    // Around each ring in the order the points sit round the centre, so their paths never cross.
    const group = free.slice(from, to).sort((a, b) => angle(a) - angle(b));
    group.forEach((p, j) => {
      const u = TOP + 0.045 + ((j + 0.5 + (rand() - 0.5) * 0.4) / group.length) * 0.91;
      const land = RING_START[scope] + RING_DRAW * unsmooth(u);
      const leave = land - (0.95 + rand() * 0.45);
      points.push({
        x: p.x,
        y: p.y,
        scope,
        u,
        size: 1.5 + rand() * 1.7,
        appear: Math.max(0, Math.min(0.1 + rand() * 1.0, leave - 0.4)),
        leave,
        land,
        phase: rand() * 6.283,
      });
    });
    from = to;
  });
  return { w, h, cx, cy, rings, logo, gap, amp, line, points };

  function angle(p: { x: number; y: number }) {
    const a = Math.atan2(p.x - cx, cy - p.y);
    return a < 0 ? a + Math.PI * 2 : a;
  }
}

// The emissions curve: the past rises to the logo, then the old trend and the plan part.
function curves(L: Layout) {
  const { w, cx, cy, gap, amp } = L;
  const x0 = cx - gap;
  const x1 = cx + gap;
  const past = `M0 ${f(cy + amp * 0.82)}C${f(x0 * 0.42)} ${f(cy + amp * 0.82)} ${f(x0 * 0.62)} ${f(cy + amp * 0.06)} ${f(x0)} ${f(cy)}`;
  const trendEnd = cy - amp * 0.5;
  const trend = `M${f(x1)} ${f(cy)}L${f(w)} ${f(trendEnd)}`;
  const run = w - x1;
  const c1 = [x1 + run * 0.32, cy + amp * 0.02];
  const c2 = [x1 + run * 0.56, cy + amp * 0.72];
  const end = [w, cy + amp * 0.8];
  const plan = `M${f(x1)} ${f(cy)}C${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(end[0])} ${f(end[1])}`;
  const wedge = `M${f(x1)} ${f(cy)}L${f(w)} ${f(trendEnd)}L${f(end[0])} ${f(end[1])}C${f(c2[0])} ${f(c2[1])} ${f(c1[0])} ${f(c1[1])} ${f(x1)} ${f(cy)}Z`;
  // Height of the drawn line at x, for the point of light that leads it.
  const bez = (a: number, b: number, c: number, d: number, t: number) => (1 - t) ** 3 * a + 3 * (1 - t) ** 2 * t * b + 3 * (1 - t) * t * t * c + t ** 3 * d;
  const along = (x: number, p0: number[], p1: number[], p2: number[], p3: number[]) => {
    let lo = 0;
    let hi = 1;
    for (let i = 0; i < 20; i++) {
      const m = (lo + hi) / 2;
      if (bez(p0[0], p1[0], p2[0], p3[0], m) < x) lo = m;
      else hi = m;
    }
    return bez(p0[1], p1[1], p2[1], p3[1], lo);
  };
  const heightAt = (x: number) => {
    if (x <= x0) return along(x, [0, cy + amp * 0.82], [x0 * 0.42, cy + amp * 0.82], [x0 * 0.62, cy + amp * 0.06], [x0, cy]);
    if (x < x1) return null;
    return along(x, [x1, cy], c1, c2, end);
  };
  return { past, trend, plan, wedge, heightAt };
}

/* ------------------------------------------------------------------ *
 * The drawing
 * ------------------------------------------------------------------ */
const SVG_NS = "http://www.w3.org/2000/svg";
let instances = 0;

function el<K extends keyof SVGElementTagNameMap>(name: K, attrs: Record<string, string> = {}, parent?: Element) {
  const node = document.createElementNS(SVG_NS, name);
  for (const k in attrs) node.setAttribute(k, attrs[k]);
  parent?.appendChild(node);
  return node;
}

export function createCarbonReveal(host: HTMLElement, options: CarbonRevealOptions): CarbonReveal {
  const { prefix, speed = 1, start = "visible" } = options;
  const id = `${prefix}-${++instances}`;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches || document.documentElement.classList.contains("reduce-motion");

  const svg = el("svg", { "aria-hidden": "true", focusable: "false" });
  const defs = el("defs", {}, svg);
  const bloomGrad = el("radialGradient", { id: `${id}-bloom` }, defs);
  el("stop", { offset: "0", style: "stop-color:var(--reveal-fill);stop-opacity:1" }, bloomGrad);
  el("stop", { offset: "1", style: "stop-color:var(--reveal-fill);stop-opacity:0" }, bloomGrad);
  const wedgeGrad = el("linearGradient", { id: `${id}-wedge`, gradientUnits: "userSpaceOnUse" }, defs);
  el("stop", { offset: "0", style: "stop-color:var(--reveal-fill);stop-opacity:0.22" }, wedgeGrad);
  el("stop", { offset: "1", style: "stop-color:var(--reveal-fill);stop-opacity:0.03" }, wedgeGrad);
  const clip = el("clipPath", { id: `${id}-clip` }, defs);
  const clipRect = el("rect", { x: "0", y: "0", height: "0", width: "0" }, clip);

  const bloom = el("circle", { fill: `url(#${id}-bloom)` }, svg);
  const curveGroup = el("g", { "clip-path": `url(#${id}-clip)` }, svg);
  const wedge = el("path", { fill: `url(#${id}-wedge)` }, curveGroup);
  const trend = el("path", { fill: "none", "stroke-dasharray": "5 7", "stroke-linecap": "round" }, curveGroup);
  const past = el("path", { fill: "none", "stroke-linecap": "round" }, curveGroup);
  const plan = el("path", { fill: "none", "stroke-linecap": "round" }, curveGroup);
  const head = el("circle", { r: "3.5" }, svg);
  const halo = el("circle", { fill: `url(#${id}-bloom)` }, svg);
  head.style.fill = "var(--reveal-live)";
  trend.style.stroke = "var(--reveal-ink)";
  past.style.stroke = "var(--reveal-ink)";
  plan.style.stroke = "var(--reveal-live)";

  const rings = [0, 1, 2].map(() => {
    const path = el("path", { fill: "none", pathLength: "1", "stroke-dasharray": "1 1", "stroke-linejoin": "round" }, svg);
    path.style.stroke = "var(--reveal-live)";
    return path;
  });
  const nodes = [0, 1, 2].map((i) => {
    const g = el("g", {}, svg);
    const c = el("circle", { r: "10" }, g);
    c.style.fill = "var(--reveal-bg)";
    c.style.stroke = "var(--reveal-live)";
    const t = el("text", { "text-anchor": "middle", "dominant-baseline": "central", class: `${prefix}-node ${options.stepClass ?? ""}`.trim() }, g);
    t.style.fill = "var(--reveal-ink)";
    t.textContent = String(i + 1);
    return g;
  });
  const dotGroup = el("g", {}, svg);
  const logo = el("g", {}, svg);
  const logoPath = el("path", { d: MARK, pathLength: "1", "stroke-dasharray": "1 1", "stroke-linejoin": "round" }, logo);
  logoPath.style.fill = "var(--reveal-logo)";
  logoPath.style.stroke = "var(--reveal-logo)";
  host.appendChild(svg);

  const text = document.createElement("div");
  text.className = `${prefix}-text`;
  text.setAttribute("aria-hidden", "true");
  const stepEls = options.steps.map((words) => {
    const s = document.createElement("span");
    s.className = `${prefix}-step ${options.stepClass ?? ""}`.trim();
    s.textContent = words;
    text.appendChild(s);
    return s;
  });
  const sentence = document.createElement("span");
  sentence.className = `${prefix}-sentence ${options.sentenceClass ?? ""}`.trim();
  sentence.textContent = options.sentence;
  text.appendChild(sentence);
  host.appendChild(text);

  let L: Layout | null = null;
  let heightAt: (x: number) => number | null = () => null;
  let dots: SVGCircleElement[] = [];

  function relayout() {
    const w = host.clientWidth;
    const h = host.clientHeight;
    if (!w || !h) return false;
    const textTop = text.offsetTop || h - 64;
    if (L && L.w === w && L.h === h) return true;
    L = layoutFor(w, h, textTop);
    svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
    svg.setAttribute("width", String(w));
    svg.setAttribute("height", String(h));
    const c = curves(L);
    heightAt = c.heightAt;
    wedge.setAttribute("d", c.wedge);
    trend.setAttribute("d", c.trend);
    past.setAttribute("d", c.past);
    plan.setAttribute("d", c.plan);
    for (const p of [trend, past]) p.setAttribute("stroke-width", f(L.line * 1.1));
    plan.setAttribute("stroke-width", f(L.line * 1.6));
    wedgeGrad.setAttribute("x1", f(L.cx + L.gap));
    wedgeGrad.setAttribute("x2", f(w));
    clipRect.setAttribute("height", String(h));
    rings.forEach((r) => r.setAttribute("stroke-width", f(L!.line * 1.25)));
    while (dots.length < L.points.length) dots.push(el("circle", {}, dotGroup));
    dots.forEach((d, i) => (d.style.display = i < L!.points.length ? "" : "none"));
    return true;
  }

  function draw(t: number) {
    if (!L && !relayout()) return;
    const { cx, cy, rings: R, logo: RL, w } = L!;

    // Rings: drawn by the data, then closing into the logo.
    const radius = R.map((r, k) => mix(r, RL * 1.04, easeInOut(span(t, CLOSE_START[k], CLOSE_START[k] + CLOSE))));
    rings.forEach((path, k) => {
      const drawn = smooth(span(t, RING_START[k], RING_START[k] + RING_DRAW));
      const closing = span(t, CLOSE_START[k], CLOSE_START[k] + CLOSE);
      path.setAttribute("d", cellPath(cx, cy, radius[k], SOFT));
      path.style.strokeDashoffset = String(1 - drawn);
      path.style.opacity = String((k === 0 ? 0.95 : k === 1 ? 0.7 : 0.5) * (1 - smooth(span(closing, 0.55, 1))));
      const node = nodes[k];
      const shown = easeOut(span(t, RING_START[k] - 0.05, RING_START[k] + 0.3)) * (1 - smooth(span(closing, 0, 0.3)));
      node.style.opacity = String(shown);
      const [nx, ny] = onCell(cx, cy, radius[k], TOP);
      node.setAttribute("transform", `translate(${f(nx)} ${f(ny)}) scale(${f(mix(0.6, 1, shown))})`);
    });

    // Activity data.
    L!.points.forEach((p, i) => {
      const dot = dots[i];
      const shown = easeOut(span(t, p.appear, p.appear + 0.45));
      const go = easeInOut(span(t, p.leave, p.land));
      const closing = span(t, CLOSE_START[p.scope], CLOSE_START[p.scope] + CLOSE);
      const [tx, ty] = onCell(cx, cy, radius[p.scope], p.u);
      // A gentle drift while waiting, then a curved path, all turning the same way, into the scope.
      const drift = 1 - go;
      const sx = p.x + Math.sin(t * 0.7 + p.phase) * 3 * drift;
      const sy = p.y + Math.cos(t * 0.55 + p.phase) * 3 * drift;
      const mx = (sx + tx) / 2 - (ty - sy) * 0.28;
      const my = (sy + ty) / 2 + (tx - sx) * 0.28;
      const x = (1 - go) ** 2 * sx + 2 * (1 - go) * go * mx + go * go * tx;
      const y = (1 - go) ** 2 * sy + 2 * (1 - go) * go * my + go * go * ty;
      const tick = t > p.land ? Math.sin(Math.PI * span(t, p.land, p.land + 0.35)) : 0;
      dot.setAttribute("cx", f(x));
      dot.setAttribute("cy", f(y));
      dot.setAttribute("r", f(p.size * mix(0.6, 1, shown) * (1 + 0.6 * tick) * mix(1, 0.8, go)));
      dot.style.fill = `color-mix(in srgb, var(--reveal-live) ${Math.round(smooth(span(go, 0.55, 1)) * 100)}%, var(--reveal-ink))`;
      dot.style.opacity = String(shown * mix(0.45, 0.95, go) * (1 - smooth(span(closing, 0.25, 0.85))));
    });

    // The logo condenses where the rings meet.
    const formed = easeOut(span(t, LOGO[0], LOGO[1]));
    const scale = (RL / MARK_HALF) * mix(0.94, 1, formed);
    logo.setAttribute("transform", `translate(${f(cx)} ${f(cy)}) scale(${scale.toFixed(4)}) translate(-64 -64)`);
    // The outline is drawn in the logo's own units, so its width is divided by the scale.
    const outline = easeInOut(span(t, LOGO[0] - 0.35, LOGO[0] + 0.4));
    logoPath.setAttribute("stroke-width", ((L!.line * 1.25) / scale).toFixed(2));
    logoPath.style.strokeDashoffset = String(1 - outline);
    logoPath.style.strokeOpacity = String(outline > 0 ? 1 - span(t, LOGO[1] - 0.2, LOGO[1] + 0.2) : 0);
    logoPath.style.fillOpacity = String(formed);
    const settle = easeOut(span(t, LOGO[0], LOGO[1] + 0.6));
    const pulse = Math.sin(Math.PI * span(t, LOGO[0], LOGO[1] + 0.5));
    bloom.setAttribute("cx", f(cx));
    bloom.setAttribute("cy", f(cy));
    bloom.setAttribute("r", f(RL * 3.4));
    bloom.style.opacity = String(0.08 * settle + 0.14 * pulse);

    // The curve sweeps from the past, through the logo, into the plan.
    const reach = w * easeInOut(span(t, CURVE[0], CURVE[1]));
    clipRect.setAttribute("width", f(reach));
    const lead = heightAt(reach);
    const leading = lead === null ? 0 : Math.sin(Math.PI * span(t, CURVE[0], CURVE[1] + 0.15));
    for (const c of [head, halo]) {
      c.setAttribute("cx", f(reach));
      c.setAttribute("cy", f(lead ?? cy));
    }
    halo.setAttribute("r", f(L!.line * 14));
    head.style.opacity = String(leading);
    halo.style.opacity = String(leading * 0.6);
    wedge.style.opacity = String(easeOut(span(t, CURVE[0] + 0.5, CURVE[1] + 0.3)));
    past.style.opacity = "0.55";
    trend.style.opacity = "0.4";

    // The words: one step at a time, then the sentence.
    stepEls.forEach((s, i) => {
      const [a, b] = STEPS[i];
      const v = easeOut(span(t, a, a + 0.35)) * (1 - span(t, b - 0.3, b));
      s.style.opacity = String(v);
      s.style.transform = `translateY(${f((1 - v) * 4)}px)`;
    });
    const said = easeOut(span(t, SENTENCE[0], SENTENCE[1]));
    sentence.style.opacity = String(said);
    sentence.style.transform = `translateY(${f((1 - said) * 6)}px)`;
  }

  // Playback: one run, only while on screen.
  let time = reduce ? CARBON_REVEAL_END : 0;
  let playing = false;
  // A full-screen layer started with "now" is on screen from its first frame.
  let visible = start === "now";
  let raf = 0;
  let last = 0;

  function tick(now: number) {
    raf = 0;
    const dt = Math.min(0.1, (now - last) / 1000);
    last = now;
    time = Math.min(CARBON_REVEAL_END, time + dt * speed);
    draw(time);
    if (time >= CARBON_REVEAL_END) {
      playing = false;
      options.onEnd?.();
      return;
    }
    if (visible) raf = requestAnimationFrame(tick);
  }
  function kick() {
    if (raf || !playing || !visible) return;
    last = performance.now();
    raf = requestAnimationFrame(tick);
  }
  function play() {
    if (reduce || playing || time >= CARBON_REVEAL_END) return;
    playing = true;
    kick();
  }

  const seen = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) kick();
    else if (raf) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
  });
  seen.observe(host);
  const arm = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return;
      arm.disconnect();
      play();
    },
    { threshold: 0.4 },
  );
  if (start === "now") {
    arm.disconnect();
    play();
  } else arm.observe(host);
  const resize = new ResizeObserver(() => {
    L = null;
    if (relayout()) draw(time);
  });
  resize.observe(host);

  draw(time);

  return {
    skip() {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      playing = false;
      time = CARBON_REVEAL_END;
      draw(time);
    },
    logoBox() {
      const box = logoPath.getBoundingClientRect();
      return box.width ? box : null;
    },
    dispose() {
      if (raf) cancelAnimationFrame(raf);
      seen.disconnect();
      arm.disconnect();
      resize.disconnect();
      svg.remove();
      text.remove();
    },
  };
}
