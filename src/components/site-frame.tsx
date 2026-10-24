"use client";

import { createContext, useContext, useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "./icons";
import { ProjectDialog } from "./project-dialog";
import { MotionLayer } from "./motion-layer";
import { SiteNav, navSections } from "./site-nav";
import { PageTransition } from "./page-transition";
import { StickyCta } from "./sticky-cta";
import { ThemeToggle } from "./theme-toggle";
import { hexPoints } from "@/lib/geometry";
import { company } from "@/lib/company";

const SiteActions = createContext({ openChecklist: () => {} });
export const useSiteActions = () => useContext(SiteActions);

const nav = [
  { href: "/plateforme", label: "La plateforme" },
  { href: "/solutions", label: "Solutions" },
  { href: "/methodologie", label: "Méthodologie" },
  { href: "/cabinet", label: "Le cabinet" },
  { href: "/ressources", label: "Ressources" },
  { href: "/normes", label: "Normes carbone" },
];

export function SiteFrame({ children }: { children: ReactNode }) {
  const [menu, setMenu] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [dialog, setDialog] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const returnFocus = useRef<HTMLElement | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    setMenu(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("menu-lock", menu);
    if (!menu) setExpanded(null);
    for (const element of document.querySelectorAll("main, .site-footer")) element.toggleAttribute("inert", menu);
    if (!menu) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenu(false);
        document.getElementById("menu-toggle")?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menu]);

  function openChecklist() {
    returnFocus.current = document.activeElement as HTMLElement;
    setDialog(true);
  }
  function closeChecklist() {
    setDialog(false);
    requestAnimationFrame(() => returnFocus.current?.focus({ preventScroll: true }));
  }

  const current = (href: string) => (pathname === href ? "page" : undefined);

  // Any link in the phone menu closes it. For an anchor on the current page the
  // page is still scroll-locked at click time, so scroll once the menu has let go.
  function closeMenu(event: MouseEvent<HTMLAnchorElement>) {
    setMenu(false);
    const url = new URL(event.currentTarget.href, window.location.href);
    const here = (path: string) => path.replace(/\/$/, "") || "/";
    if (!url.hash || here(url.pathname) !== here(window.location.pathname)) return;
    const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
    if (!target) return;
    event.preventDefault();
    window.history.pushState(null, "", url.hash);
    window.setTimeout(() => target.scrollIntoView({ block: "start" }), 80);
  }

  return (
    <SiteActions.Provider value={{ openChecklist }}>
      <MotionLayer />
      <PageTransition />
      <a className="skip-link" href="#main">
        Aller au contenu
      </a>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""} ${menu ? "is-open" : ""}`}>
        <div className="site-header-inner">
          <Link href="/" aria-label="SPS CARBON, accueil" className="site-brand">
            <img className="logo-on-dark" src="/brand/logo-light.svg" width="204" height="32" alt="SPS CARBON" />
            <img className="logo-on-light" src="/brand/logo-dark.svg" width="204" height="32" alt="" aria-hidden="true" />
          </Link>
          <SiteNav pathname={pathname} />
          <button
            id="menu-toggle"
            className="menu-toggle"
            aria-label={menu ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menu}
            aria-controls="site-navigation"
            onClick={() => setMenu(!menu)}
          >
            <Icon name={menu ? "close" : "menu"} />
          </button>
          <nav id="site-navigation" className="site-nav" aria-label="Menu principal">
            <ul className="m-list">
              {navSections.map((section, index) => (
                <li
                  key={section.href}
                  className={`m-item ${expanded === index ? "is-expanded" : ""}`}
                  style={{ ["--i" as string]: index }}
                >
                  <div className="m-row">
                    <Link href={section.href} className="m-link" aria-current={current(section.href)} onClick={closeMenu}>
                      <span className="m-title">{section.label}</span>
                      <span className="m-desc">{section.short}</span>
                    </Link>
                    <button
                      type="button"
                      className="m-toggle"
                      aria-expanded={expanded === index}
                      aria-controls={`m-sub-${index}`}
                      aria-label={`${expanded === index ? "Masquer" : "Afficher"} les rubriques : ${section.label}`}
                      onClick={() => setExpanded(expanded === index ? null : index)}
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </button>
                  </div>
                  <div className="m-sub" id={`m-sub-${index}`}>
                    <ul className="m-sub-inner">
                      {section.entries.map((entry) => (
                        <li key={entry.href}>
                          <Link href={entry.href} onClick={closeMenu}>
                            {entry.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
            <div className="m-foot" style={{ ["--i" as string]: navSections.length }}>
              <Link href="/contact" className="btn btn-mint m-cta" aria-current={current("/contact")} onClick={closeMenu}>
                Parlons de votre projet
              </Link>
              <Link href="/#diagnostic" className="m-alt" onClick={closeMenu}>
                Faire le diagnostic express
              </Link>
              <a href={`mailto:${company.email}`} className="m-mail">
                {company.email}
              </a>
            </div>
          </nav>
          <ThemeToggle />
          <Link className="btn btn-mint btn-small site-cta" href="/contact">
            Parlons de votre projet
          </Link>
        </div>
      </header>

      {children}

      <StickyCta pathname={pathname} hidden={menu} />

      <footer className={`site-footer t-deep ${pathname === "/contact" ? "is-compact" : ""}`}>
        {pathname !== "/contact" && (
          <div className="wrap footer-call">
            <svg className="footer-signal" viewBox="-300 -300 600 600" aria-hidden="true">
              {[60, 110, 160, 210, 260].map((r, n) => (
                <polygon key={r} points={hexPoints(0, 0, r)} style={{ ["--n" as string]: n }} />
              ))}
            </svg>
            <h2 className="d-l">
              Votre premier inventaire
              <br />
              commence par un échange.
            </h2>
            <div className="footer-call-side">
              <p>
                Présentez votre activité, vos sites et votre objectif. Nous vous aidons à définir le bon périmètre avant tout
                engagement.
              </p>
              <Link className="btn btn-mint" href="/contact">
                Parlons de votre projet
              </Link>
            </div>
          </div>
        )}
        <div className="wrap footer-grid">
          <div className="footer-company">
            <img className="logo-on-dark" src="/brand/logo-light.svg" width="236" height="37" alt="SPS CARBON" />
            <img className="logo-on-light" src="/brand/logo-dark.svg" width="236" height="37" alt="" aria-hidden="true" />
            <p>
              Une initiative de SAFEPERFORM SOLUTIONS, cabinet d’audit, de conseil et de formation en management QHSE et RSE.
            </p>
            <a className="footer-mail" href={`mailto:${company.email}`}>
              {company.email}
            </a>
            <address>{company.address}</address>
          </div>
          <div>
            <h3>Explorer</h3>
            <ul>
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Passer à l’action</h3>
            <ul>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
              <li>
                <button type="button" onClick={openChecklist}>
                  Préparer mon inventaire
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h3>Informations</h3>
            <ul>
              <li>
                <Link href="/mentions-legales">Mentions légales</Link>
              </li>
              <li>
                <Link href="/confidentialite">Confidentialité</Link>
              </li>
              <li>
                <Link href="/cookies">Cookies</Link>
              </li>
              <li>
                <Link href="/conditions-utilisation">Conditions d’utilisation</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="wrap footer-base">
          <span>© 2026 SAFEPERFORM SOLUTIONS SARL AU</span>
          <span className="footer-status">
            <i aria-hidden="true" />
            Plateforme en développement
          </span>
          <a href="#main">Retour en haut</a>
        </div>
      </footer>
      <ProjectDialog open={dialog} onClose={closeChecklist} />
    </SiteActions.Provider>
  );
}
