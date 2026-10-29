import Link from "next/link";
import { Trajectory } from "@/components/trajectory";

export default function NotFound() {
  return (
    <main id="main" className="page not-found s-night">
      <div className="wrap not-found-inner" data-reveal="rise">
        <Trajectory className="not-found-line" />
        <p className="not-found-code readout" aria-hidden="true">
          404
        </p>
        <h1 className="t-h1">Cette page n’existe pas.</h1>
        <p className="t-lead">Le lien est peut-être incomplet, ou la page a été déplacée.</p>
        <div className="not-found-actions">
          <Link className="btn btn-signal" href="/">
            Revenir à l’accueil
          </Link>
          <Link className="link" href="/contact">
            Nous écrire
          </Link>
        </div>
      </div>
    </main>
  );
}
