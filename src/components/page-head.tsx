import Link from "next/link";
import type { ReactNode } from "react";
import { Focus } from "./focus";
import { PageInstrument, type InstrumentName } from "./page-instruments";

/*
 * One header for every inner page: breadcrumb, a title that comes into focus,
 * the lead, optional actions or a status line, and the page's instrument.
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
        {instrument && <PageInstrument name={instrument} />}
      </div>
    </header>
  );
}
