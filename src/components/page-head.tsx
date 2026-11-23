import Link from "next/link";
import type { ReactNode } from "react";
import { Focus } from "./focus";
import { PageInstrument, fictional, type InstrumentName } from "./page-instruments";
import { SafeperformLogo } from "./safeperform-logo";
import { Plate } from "./plate";
import { pageAmbiance } from "@/lib/ambiance";

/*
 * One header for every inner page: breadcrumb, a title that comes into focus,
 * the lead, optional actions or a status line, and the page's instrument on
 * its plate (the "planches" method of the home page, docs/design/website-v9-planches.md).
 * The firm's own page opens with its logo.
 * Legal pages pass no instrument and get a quieter, text-only header.
 */
export function PageHead({
  crumb,
  title,
  lead,
  instrument,
  children,
}: {
  crumb: string;
  title: string;
  lead: string;
  instrument?: InstrumentName;
  children?: ReactNode;
}) {
  return (
    <header className={`page-head ${instrument ? "" : "is-plain"}`}>
      <div className="wrap page-head-grid">
        <div className="page-head-copy">
          <nav className="crumbs" aria-label="Fil d’Ariane">
            <Link href="/">Accueil</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{crumb}</span>
          </nav>
          {crumb === "Le cabinet" && (
            <div className="page-head-logo" data-reveal="rise" style={{ ["--i" as string]: 1 }}>
              <SafeperformLogo full loading="eager" />
            </div>
          )}
          <Focus as="h1" className="t-h1 page-title" delay={80}>
            {title}
          </Focus>
          <p className="t-lead" data-reveal="rise" style={{ ["--i" as string]: 3 }}>
            {lead}
          </p>
          {children && (
            <div className="page-head-extra" data-reveal="rise" style={{ ["--i" as string]: 4 }}>
              {children}
            </div>
          )}
        </div>
        {instrument && (
          <div className="page-head-visual" data-reveal="rise" style={{ ["--i" as string]: 2 }}>
            {/* The page's plate: its image, the fragment under the bezel, the line written under it. */}
            <Plate
              ambiance={pageAmbiance[instrument].name}
              shape="haut"
              sizes="(max-width: 1000px) 90vw, 560px"
              demo={fictional.has(instrument)}
              className="head-plate"
            >
              <PageInstrument name={instrument} />
            </Plate>
            <p className="plate-caption">{pageAmbiance[instrument].note}</p>
          </div>
        )}
      </div>
    </header>
  );
}
