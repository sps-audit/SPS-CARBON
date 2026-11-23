import type { ReactNode } from "react";
import { Ambiance } from "./ambiance";
import type { AmbianceName, AmbianceShape } from "@/lib/ambiance";
import { plateEdge } from "@/lib/plates";

/*
 * A plate ("planche"): one atmosphere image that holds one real fragment of
 * the product. Printer's registration marks sit outside its four corners, the
 * plate number sits on its top edge, with the "données d'exemple" chip when
 * the fragment is fictional. The explanation is never written on the picture:
 * it goes under or beside the plate. The image is decorative (aria-hidden);
 * everything readable is text.
 */
export function Plate({
  ambiance,
  shape = "large",
  sizes,
  number,
  demo = false,
  grid = false,
  night = false,
  className = "",
  children,
}: {
  ambiance: AmbianceName;
  shape?: AmbianceShape;
  sizes: string;
  /** Printed in the top-left corner, as on a print proof: "Planche 03". */
  number?: number;
  /** The fragment shows fictional data: say so on the plate. */
  demo?: boolean;
  /** A drawn squared grid over the image (the measured dossier). */
  grid?: boolean;
  /** Dark image: label, chip and bezel rims switch to their night finish. */
  night?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <figure className={`plate${grid ? " has-grid" : ""}${night ? " is-night" : ""} ${className}`}>
      <span className="plate-marks" aria-hidden="true" />
      <div className="plate-face">
        <Ambiance name={ambiance} shape={shape} sizes={sizes} />
        <span className="plate-grain" aria-hidden="true" />
        {(number !== undefined || demo) && (
          <p className="plate-edge">
            {number !== undefined && <span className="plate-n">{plateEdge.number(number)}</span>}
            {demo && <span className="demo-chip">{plateEdge.demo}</span>}
          </p>
        )}
        <div className="plate-body">{children}</div>
      </div>
    </figure>
  );
}

/*
 * The double-rim bezel: a frosted outer rim around an opaque card with a
 * hairline, the corners concentric. The one container for product fragments
 * placed on a plate.
 */
export function Bezel({ className = "", children, as: Tag = "div" }: { className?: string; children: ReactNode; as?: "div" | "li" | "article" }) {
  return (
    <Tag className={`bezel ${className}`}>
      <div className="bezel-card">{children}</div>
    </Tag>
  );
}
