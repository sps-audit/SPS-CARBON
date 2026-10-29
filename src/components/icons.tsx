import type { SVGProps } from "react";

export type IconName =
  | "arrow"
  | "arrowUp"
  | "plus"
  | "close"
  | "check"
  | "file"
  | "electric"
  | "fuel"
  | "layers"
  | "chart"
  | "download"
  | "globe"
  | "search"
  | "chevron"
  | "play"
  | "menu"
  | "shield"
  | "compass"
  | "signin"
  | "building";
const paths: Record<IconName, React.ReactNode> = {
  arrow: (
    <>
      <path d="M4 12h15M13 5l7 7-7 7" />
    </>
  ),
  arrowUp: (
    <>
      <path d="M6 18 18 6M6 6h12v12" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  check: <path d="m5 12 4 4L19 6" />,
  file: (
    <>
      <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9Z" />
      <path d="M14 3v6h6M8 13h8M8 17h5" />
    </>
  ),
  electric: <path d="m13 2-9 12h7l-1 8 10-13h-8z" />,
  fuel: (
    <>
      <path d="M3 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16M2 21h13M3 10h11M14 12h2a2 2 0 0 1 2 2v3a2 2 0 0 0 4 0V9l-4-4" />
      <path d="M20 7v4h2" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3 10 5-10 5L2 8Z" />
      <path d="m2 12 10 5 10-5M2 16l10 5 10-5" />
    </>
  ),
  chart: (
    <>
      <path d="M4 3v17h17M8 15v-4M13 15V6M18 15v-7" />
    </>
  ),
  download: (
    <>
      <path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <ellipse cx="12" cy="12" rx="4" ry="9" />
      <path d="M3 12h18" />
    </>
  ),
  search: (
    <>
      <circle cx="10" cy="10" r="6" />
      <path d="m15 15 5 5" />
    </>
  ),
  chevron: <path d="m8 5 7 7-7 7" />,
  play: <path d="m9 5 11 7-11 7Z" />,
  menu: <path d="M4 8h16M4 16h16" />,
  shield: (
    <>
      <path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6Z" />
      <path d="m8 12 3 3 5-6" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m16 8-3 5-5 3 3-5Z" />
    </>
  ),
  signin: (
    <>
      <path d="M14 4h3.5A2.5 2.5 0 0 1 20 6.5v11a2.5 2.5 0 0 1-2.5 2.5H14" />
      <path d="M4 12h11M11 8l4 4-4 4" />
    </>
  ),
  building: (
    <>
      <path d="M4 20V6.5A2.5 2.5 0 0 1 6.5 4h6A2.5 2.5 0 0 1 15 6.5V20M15 10h2.5A2.5 2.5 0 0 1 20 12.5V20M3 20h18" />
      <path d="M8 8h3M8 12h3M8 16h3" />
    </>
  ),
};
export function Icon({
  name,
  ...props
}: SVGProps<SVGSVGElement> & { name: IconName }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
