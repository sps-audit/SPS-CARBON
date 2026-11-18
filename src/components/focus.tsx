import { createElement, type ReactNode } from "react";

/*
 * "Mise au point": a heading comes into focus word by word when it is
 * revealed (see [data-reveal="focus"] in motion.css). The words stay plain
 * text for assistive technologies; only the visual timing is per word.
 * Works in server and client components (no hooks).
 */
type FocusProps = {
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  id?: string;
  children: string;
  /** Delay before the first word, in ms. */
  delay?: number;
};

export function Focus({ as = "h2", className = "", id, children, delay = 0 }: FocusProps) {
  const words = children.split(/(\s+)/);
  let n = 0;
  const content: ReactNode[] = words.map((part, index) => {
    if (/^\s+$/.test(part)) return part;
    const style = { ["--w" as string]: n++ };
    return (
      <span className="fw" key={index} style={style}>
        {part}
      </span>
    );
  });
  return createElement(
    as,
    { className, id, "data-reveal": "focus", style: delay ? { ["--fd" as string]: `${delay}ms` } : undefined },
    content,
  );
}
