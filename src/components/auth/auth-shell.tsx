import type { ReactNode } from "react";
import Link from "next/link";
import { ThemeToggle } from "../theme-toggle";
import { AuthBackdrop } from "./auth-backdrop";

/*
 * A focused frame for the sign-in and account pages: no site navigation and
 * no footer call. The landscape fills the window, light travels slowly over
 * it, and the form sits in the middle on frosted glass.
 */
export function AuthShell({ children, wide = false }: { children: ReactNode; wide?: boolean }) {
  return (
    <div className={`auth ${wide ? "is-wide" : ""}`}>
      <AuthBackdrop />

      <header className="auth-top">
        <Link href="/" aria-label="SPS CARBON, accueil" className="site-brand auth-brand">
          <img className="logo-on-dark" src="/brand/logo-light.svg" width="200" height="25" alt="SPS CARBON" />
          <img className="logo-on-light" src="/brand/logo-dark.svg" width="200" height="25" alt="" aria-hidden="true" />
        </Link>
        <div className="auth-top-actions">
          <Link href="/" className="auth-back">
            Retour au site
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <main id="main" className="auth-body">
        <div className="auth-card">{children}</div>
      </main>

      <footer className="auth-foot">
        <span>© 2026 SAFEPERFORM SOLUTIONS</span>
        <nav aria-label="Informations légales">
          <Link href="/conditions-utilisation">Conditions d’utilisation</Link>
          <Link href="/confidentialite">Confidentialité</Link>
          <Link href="/mentions-legales">Mentions légales</Link>
        </nav>
      </footer>
    </div>
  );
}
