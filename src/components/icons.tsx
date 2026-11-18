import type { ReactNode, SVGProps } from "react";

/*
 * SPS-CARBON icon family, the one drawn for the platform (no third-party set):
 * 24 px grid, 1.7 strokes in currentColor, round caps and joins, corners
 * softened like the logo's hexagon (info, help and box use that hexagon as
 * their frame). A soft same-colour tint fills the parts marked `t`.
 * Parts `b` to `e` move on their own when the control is pointed at or reached
 * with the keyboard ("living icons", motion.css; started by SiteFrame).
 * Drawings ported from the platform (sps-carbon-app, src/app/ui/icons.js);
 * computed outlines (hexagon, sun rays) are written out, nothing runs here.
 */
const paths = {
  menu: <><path className="b" d="M4 7h16"/><path className="c" d="M4 12h16"/><path className="d" d="M4 17h10"/></>,
  close: <><path className="b" d="M6.5 6.5l11 11M17.5 6.5l-11 11"/></>,
  check: <><path className="b" d="M5 12.5l4.5 4.5L19 7.5"/></>,
  chevron: <><path className="b" d="M9.5 6l6 6-6 6"/></>,
  down: <><path className="b" d="M6 9.5l6 6 6-6"/></>,
  plus: <><path className="b" d="M12 5v14M5 12h14"/></>,
  search: <><g className="b"><circle className="t" cx="10.5" cy="10.5" r="6"/><path d="M15 15l4.5 4.5"/></g></>,
  file: <><path className="t" d="M14 3.5H7.5A2.5 2.5 0 0 0 5 6v12a2.5 2.5 0 0 0 2.5 2.5h9A2.5 2.5 0 0 0 19 18V8.5z"/><path d="M14 3.5V7a1.5 1.5 0 0 0 1.5 1.5H19"/><path className="b" d="M9 12.5h6"/><path className="c" d="M9 16h4"/></>,
  report: <><path className="t" d="M14 3.5H7.5A2.5 2.5 0 0 0 5 6v12a2.5 2.5 0 0 0 2.5 2.5h9A2.5 2.5 0 0 0 19 18V8.5z"/><path d="M14 3.5V7a1.5 1.5 0 0 0 1.5 1.5H19"/><path className="b" d="M9 17v-2.5"/><path className="c" d="M12 17v-5"/><path className="d" d="M15 17v-3.5"/></>,
  bolt: <><path className="b t" d="M13 3L5.5 13.5H11L10 21l8.5-11H13z"/></>,
  flame: <><path className="b t" d="M12 21a6.5 6.5 0 0 0 6.5-6.5c0-4-3.4-6.5-4.4-10.5-1.6 1.5-2.5 3.5-2.5 5.3C10.4 8 9.2 7 8.6 6 7 8 5.5 10.5 5.5 14.5A6.5 6.5 0 0 0 12 21z"/><path className="c" d="M12 21a2.6 2.6 0 0 0 2.6-2.6c0-1.8-1.5-2.6-2.6-4.4-1.1 1.8-2.6 2.6-2.6 4.4A2.6 2.6 0 0 0 12 21z"/></>,
  truck: <><g className="b"><path d="M3.5 16.5v-9A1.5 1.5 0 0 1 5 6h8.5v10.5M13.5 9.5h3.6l3.4 3.6v3.4"/><path d="M9.2 16.5h5.6"/></g><circle className="c" cx="7" cy="17" r="2"/><circle className="c" cx="17" cy="17" r="2"/></>,
  download: <><path d="M4.5 15v2.5A2.5 2.5 0 0 0 7 20h10a2.5 2.5 0 0 0 2.5-2.5V15"/><path className="b" d="M12 4v10.5M7.5 10l4.5 4.5 4.5-4.5"/></>,
  trash: <><path className="b" d="M4 7h16M9.5 7V5.5A1.5 1.5 0 0 1 11 4h2a1.5 1.5 0 0 1 1.5 1.5V7"/><path className="t" d="M6 7l.9 11.4A2.2 2.2 0 0 0 9.1 20.5h5.8a2.2 2.2 0 0 0 2.2-2.1L18 7"/><path d="M10 11v5.5M14 11v5.5"/></>,
  enter: <><path d="M14 4.5h3.5A2.5 2.5 0 0 1 20 7v10a2.5 2.5 0 0 1-2.5 2.5H14"/><path className="b" d="M10 8l4 4-4 4M3.5 12H14"/></>,
  building: <><path d="M4.5 20.5h15"/><path className="t" d="M6.5 20.5V5.5A1.5 1.5 0 0 1 8 4h8a1.5 1.5 0 0 1 1.5 1.5v15"/><path d="M11 20.5v-2.8h2v2.8"/><path className="b" d="M10 8h.01M14 8h.01"/><path className="c" d="M10 11.3h.01M14 11.3h.01"/><path className="d" d="M10 14.6h.01M14 14.6h.01"/></>,
  factory: <><path d="M3.5 20.5h17"/><path d="M4.5 20.5V11l5 3v-3l5 3V8.5h5v12"/><path d="M8 17.5h1.5M12.5 17.5H14"/><path className="b" d="M17 6c0-1.2 1-1.5 1-2.7"/></>,
  shield: <><path className="t" d="M12 3.5l7 2.6v5.4c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6.1z"/><path className="b" d="M9 12l2.2 2.2L15.5 10"/></>,
  info: <><path className="t" d="M10.41 3.72Q12.00 2.80 13.59 3.72L18.37 6.48Q19.97 7.40 19.97 9.24L19.97 14.76Q19.97 16.60 18.37 17.52L13.59 20.28Q12.00 21.20 10.41 20.28L5.63 17.52Q4.03 16.60 4.03 14.76L4.03 9.24Q4.03 7.40 5.63 6.48Z"/><path className="b" d="M12 11v4.6M12 7.9h.01"/></>,
  help: <><path className="t" d="M10.41 3.72Q12.00 2.80 13.59 3.72L18.37 6.48Q19.97 7.40 19.97 9.24L19.97 14.76Q19.97 16.60 18.37 17.52L13.59 20.28Q12.00 21.20 10.41 20.28L5.63 17.52Q4.03 16.60 4.03 14.76L4.03 9.24Q4.03 7.40 5.63 6.48Z"/><path className="b" d="M9.6 9.7a2.5 2.5 0 0 1 4.85.8c0 1.7-2.45 2.2-2.45 3.7M12 16.6h.01"/></>,
  alert: <><path className="t" d="M10.27 4.6a2 2 0 0 1 3.46 0l7 12.15a2 2 0 0 1-1.73 3H5a2 2 0 0 1-1.73-3z"/><path className="b" d="M12 9.5v4M12 16.6h.01"/></>,
  mail: <><rect className="t" x="3.5" y="5.5" width="17" height="13" rx="2.5"/><path className="b" d="M4.2 7.2L12 13l7.8-5.8"/></>,
  calendar: <><rect className="t" x="4" y="5.5" width="16" height="15" rx="2.5"/><path d="M4 10h16M8.5 3.5v4M15.5 3.5v4"/><rect className="b" x="7.6" y="13" width="3.2" height="3.2" rx="0.9"/></>,
  sun: <><circle className="t" cx="12" cy="12" r="4"/><g className="b"><path transform="rotate(0 12 12)" d="M12 2.8v2.2"/><path transform="rotate(45 12 12)" d="M12 2.8v2.2"/><path transform="rotate(90 12 12)" d="M12 2.8v2.2"/><path transform="rotate(135 12 12)" d="M12 2.8v2.2"/><path transform="rotate(180 12 12)" d="M12 2.8v2.2"/><path transform="rotate(225 12 12)" d="M12 2.8v2.2"/><path transform="rotate(270 12 12)" d="M12 2.8v2.2"/><path transform="rotate(315 12 12)" d="M12 2.8v2.2"/></g></>,
  moon: <><path className="b t" d="M19.5 14.5a8 8 0 0 1-10-10 8 8 0 1 0 10 10z"/></>,
  globe: <><circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17"/><path className="b" d="M12 3.5c2.4 2.4 3.5 5.3 3.5 8.5s-1.1 6.1-3.5 8.5c-2.4-2.4-3.5-5.3-3.5-8.5s1.1-6.1 3.5-8.5z"/></>,
  chart: <><path d="M4 20.5h16"/><rect className="b t" x="5.5" y="12" width="3" height="5" rx="1"/><rect className="c t" x="10.5" y="6.5" width="3" height="10.5" rx="1"/><rect className="d t" x="15.5" y="9.5" width="3" height="7.5" rx="1"/></>,
  layers: <><path className="t" d="M12 4l8.5 4.5L12 13 3.5 8.5z"/><path className="b" d="M3.5 12.5L12 17l8.5-4.5"/><path className="c" d="M3.5 16.5L12 21l8.5-4.5"/></>,
  box: <><path className="t" d="M10.93 3.82Q12.00 3.20 13.07 3.82L18.55 6.98Q19.62 7.60 19.62 8.83L19.62 15.17Q19.62 16.40 18.55 17.02L13.07 20.18Q12.00 20.80 10.93 20.18L5.45 17.02Q4.38 16.40 4.38 15.17L4.38 8.83Q4.38 7.60 5.45 6.98Z"/><path className="b" d="M4.6 7.75L12 12l7.4-4.25M12 12v8.6"/></>,
  trend: <><path className="b" d="M3.5 17l5-5 3.5 3.5 8-8"/><path className="c" d="M15 7.5h5v5"/></>,
  target: <><circle cx="12" cy="12" r="8.5"/><circle className="b" cx="12" cy="12" r="4.8"/><circle className="c t" cx="12" cy="12" r="1.3"/></>,
  users: <><circle className="t" cx="9" cy="8" r="3.2"/><path d="M3.5 19.5a5.5 5.5 0 0 1 11 0"/><g className="b"><path d="M15.5 4.9a3.2 3.2 0 0 1 0 6.2"/><path d="M17.5 14.2a5.5 5.5 0 0 1 3 5.3"/></g></>,
} satisfies Record<string, ReactNode>;

export type IconName = keyof typeof paths;

export function Icon({ name, className, ...props }: SVGProps<SVGSVGElement> & { name: IconName }) {
  return (
    <svg
      className={`i i-${name}${className ? ` ${className}` : ""}`}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
