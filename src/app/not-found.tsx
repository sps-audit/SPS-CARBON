import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="page not-found t-deep">
      <div className="wrap not-found-inner">
        <svg viewBox="0 0 64 64" className="not-found-mark" aria-hidden="true">
          <path d="M58 32V18L32 3L6 18V46L32 61L58 46V40L46 33V39L32 47L18 39V25L32 17L46 25Z" />
        </svg>
        <h1 className="d-l">Cette page n’existe pas.</h1>
        <p className="lead">Le lien est peut-être incomplet ou la page a été déplacée.</p>
        <Link className="btn btn-mint" href="/">
          Revenir à l’accueil
        </Link>
      </div>
    </main>
  );
}
