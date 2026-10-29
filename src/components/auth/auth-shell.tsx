"use client";

import { createContext, useContext, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "../theme-toggle";
import { AuthBackdrop } from "./auth-backdrop";
import { AuthTabs, type AuthRoute } from "./auth-tabs";

/*
 * A focused frame for the sign-in and account pages: no site navigation and
 * no footer call. The landscape fills the window, light travels slowly over
 * it, and the form sits in the middle on frosted glass.
 *
 * The frame is mounted once for both pages (see site-frame.tsx), so switching
 * between "Connexion" and "Créer un espace" keeps the landscape, the card and
 * the tabs in place: the card changes size smoothly, the tab mark slides, and
 * only the form itself is replaced, arriving from the side it was asked from.
 */

const TabsVisibility = createContext<(shown: boolean) => void>(() => {});

/** A form can fold the tabs away, for example on the later steps of a form. */
export function useAuthTabs(shown: boolean) {
  const setShown = useContext(TabsVisibility);
  useEffect(() => setShown(shown), [setShown, shown]);
}

export function AuthShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const route: AuthRoute = (pathname.replace(/\/$/, "") || "/") === "/inscription" ? "inscription" : "connexion";
  const [tabsShown, setTabsShown] = useState(true);
  // Which way the new form arrives: from the right going to "Créer un espace",
  // from the left coming back. 0 on the first page, which has its own entrance.
  const [view, setView] = useState<{ route: AuthRoute; dir: number }>({ route, dir: 0 });
  if (view.route !== route) {
    setView({ route, dir: route === "inscription" ? 1 : -1 });
    setTabsShown(true);
  }

  // The card follows the height of its content with a short transition
  // instead of jumping, whatever changes it: a new page, a step, a message.
  const clip = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const box = clip.current;
    const content = inner.current;
    if (!box || !content || typeof ResizeObserver === "undefined") return;
    const measure = () => box.style.setProperty("--auth-h", `${content.offsetHeight}px`);
    measure();
    const frame = requestAnimationFrame(() => box.classList.add("is-measured"));
    const observer = new ResizeObserver(measure);
    observer.observe(content);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  return (
    <TabsVisibility.Provider value={setTabsShown}>
      <div className={`auth ${route === "inscription" ? "is-wide" : ""}`}>
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
          <div className="auth-card">
            <div className="auth-clip" ref={clip}>
              <div className="auth-inner" ref={inner}>
                <AuthTabs route={route} shown={tabsShown} />
                <div
                  key={route}
                  className="auth-view"
                  data-dir={view.dir}
                  style={{ ["--dir" as string]: view.dir } as CSSProperties}
                >
                  {children}
                </div>
              </div>
            </div>
          </div>
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
    </TabsVisibility.Provider>
  );
}
