"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

/*
 * Desktop navigation: a gliding indicator and a panel that drops from the
 * header bar for each section, with its contents and a featured entry drawn as
 * a small instrument. Keyboard: focusing a top link opens its panel; Tab
 * continues into the panel; Escape closes.
 */

type Entry = { label: string; href: string; note?: string };
type Section = {
  href: string;
  label: string;
  short: string;
  intro: string;
  numbered?: boolean;
  entries: Entry[];
  feature: { kicker: string; title: string; href: string; cta: string; visual: "screen" | "rings" | "steps" | "map" | "sheet" | "plans" | "calc" };
};

export const navSections: Section[] = [
  {
    href: "/plateforme",
    label: "La plateforme",
    short: "Collecte, contrôle, calcul traçable et pilotage",
    intro: "De la donnée de terrain à une décision éclairée : collecte, contrôle, calcul traçable et pilotage.",
    entries: [
      { label: "Collecte guidée", href: "/plateforme#collecte", note: "Chaque contributeur sait quoi fournir" },
      { label: "Contrôle qualité", href: "/plateforme#revue", note: "Les anomalies remontent avant le calcul" },
      { label: "Calcul traçable", href: "/plateforme#tracabilite", note: "Chaque tonne remonte à sa preuve" },
      { label: "Pilotage et plan d’action", href: "/plateforme#pilotage", note: "Des priorités, pas seulement un total" },
      { label: "Méthodologie", href: "/methodologie", note: "Six étapes, GHG Protocol et ISO 14064-1" },
    ],
    feature: { kicker: "Démonstration", title: "Explorez l’espace client avec des données fictives.", href: "/plateforme#demonstration", cta: "Essayer la démonstration", visual: "screen" },
  },
  {
    href: "/solutions",
    label: "Solutions",
    short: "Bilan essentiel, bilan complet, accompagnement MACF",
    intro: "Trois parcours selon votre besoin, toujours précédés d’un cadrage clair.",
    entries: [
      { label: "Bilan essentiel, Scopes 1 et 2", href: "/solutions#inventaire-essentiel", note: "Vos opérations et votre énergie" },
      { label: "Bilan complet, Scope 3", href: "/solutions#chaine-de-valeur", note: "Toute la chaîne de valeur" },
      { label: "Accompagnement MACF / CBAM", href: "/solutions#cbam", note: "Données produit pour l’export vers l’UE" },
      { label: "Selon votre secteur", href: "/solutions#entreprises", note: "Industrie, services, commerce, export" },
      { label: "Livrables et cadrage", href: "/solutions#livrables", note: "Ce que vous recevez, et quand" },
    ],
    feature: { kicker: "Diagnostic express", title: "Cinq questions pour trouver votre point de départ.", href: "/outils#diagnostic", cta: "Faire le diagnostic", visual: "rings" },
  },
  {
    href: "/offres",
    label: "Offres",
    short: "Formules, comparatif, options et prix",
    intro: "Trois formules, des options selon votre besoin, une proposition chiffrée après le cadrage.",
    entries: [
      { label: "Les trois formules", href: "/offres#formules", note: "Essentiel, complet, MACF" },
      { label: "Comparer les formules", href: "/offres#comparer", note: "Ce que chacune inclut" },
      { label: "Options", href: "/offres#options", note: "Sites, formation, vérification…" },
      { label: "Comment est fixé le prix", href: "/offres#prix", note: "Quatre éléments, aucun abonnement" },
    ],
    feature: { kicker: "Configurateur", title: "Composez votre périmètre en trois questions.", href: "/offres#composer", cta: "Composer mon périmètre", visual: "plans" },
  },
  {
    href: "/outils",
    label: "Outils",
    short: "Calculateur express, vérificateur MACF, diagnostic",
    intro: "Des outils gratuits, sans inscription, calculés dans votre navigateur.",
    entries: [
      { label: "Calculateur express", href: "/outils#calculateur", note: "Scopes 1 et 2, sources affichées" },
      { label: "Vérificateur MACF / CBAM", href: "/outils#macf", note: "Vos exportations sont-elles concernées ?" },
      { label: "Diagnostic express", href: "/outils#diagnostic", note: "Votre point de départ en 5 questions" },
      { label: "Checklist des données", href: "/outils#checklist", note: "Les documents à réunir" },
    ],
    feature: { kicker: "Outil gratuit", title: "Estimez vos Scopes 1 et 2 à partir de vos factures.", href: "/outils#calculateur", cta: "Ouvrir le calculateur", visual: "calc" },
  },
  {
    href: "/cabinet",
    label: "Le cabinet",
    short: "SAFEPERFORM SOLUTIONS, QHSE et RSE à El Jadida",
    intro: "SAFEPERFORM SOLUTIONS : audit, conseil et formation en management QHSE et RSE, à El Jadida.",
    entries: [
      { label: "À l’origine du projet", href: "/cabinet#identite" },
      { label: "Notre conviction", href: "/cabinet#conviction" },
      { label: "Carbone, QHSE et RSE", href: "/cabinet#qhse-rse" },
      { label: "Travailler avec vos équipes", href: "/cabinet#collaboration" },
      { label: "Nos engagements", href: "/cabinet#engagements" },
    ],
    feature: { kicker: "El Jadida, Maroc", title: "Un cabinet marocain, au plus près de vos sites.", href: "/contact", cta: "Nous contacter", visual: "map" },
  },
  {
    href: "/ressources",
    label: "Ressources",
    short: "Checklist des données et repères pratiques",
    intro: "Des repères pratiques pour préparer vos données et lire un rapport carbone.",
    entries: [
      { label: "Normes carbone expliquées", href: "/normes" },
      { label: "Méthodologie en six étapes", href: "/methodologie" },
      { label: "Avant le premier inventaire", href: "/ressources#premier-inventaire" },
      { label: "Scope 1, 2 et 3", href: "/ressources#scopes" },
      { label: "Lire les données d’électricité", href: "/ressources#electricite" },
      { label: "Carburants et combustibles", href: "/ressources#combustibles" },
      { label: "Lire un rapport carbone", href: "/ressources#lire-un-rapport" },
    ],
    feature: { kicker: "Outil gratuit", title: "La checklist des données à réunir, selon votre activité.", href: "/ressources#checklist", cta: "Préparer mes données", visual: "sheet" },
  },
];

function Visual({ kind }: { kind: Section["feature"]["visual"] }) {
  if (kind === "screen")
    return (
      <div className="mv mv-screen">
        {[52, 70, 46, 84, 64, 90, 58].map((h, i) => (
          <i key={i} style={{ height: `${h}%`, ["--i" as string]: i }} />
        ))}
      </div>
    );
  if (kind === "rings")
    return (
      <div className="mv mv-rings">
        <i />
        <i />
        <i />
      </div>
    );
  if (kind === "plans")
    return (
      <div className="mv mv-plans">
        {[2, 3, 4].map((n, i) => (
          <span key={n} style={{ ["--i" as string]: i }}>
            {Array.from({ length: n }, (_, k) => (
              <i key={k} />
            ))}
          </span>
        ))}
      </div>
    );
  if (kind === "calc")
    return (
      <div className="mv mv-calc">
        <span>kWh</span>
        <b>×</b>
        <span>facteur</span>
        <b>=</b>
        <strong>tCO₂e</strong>
      </div>
    );
  if (kind === "steps")
    return (
      <div className="mv mv-steps">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <i key={i} style={{ ["--i" as string]: i }} />
        ))}
      </div>
    );
  if (kind === "map")
    return (
      <div className="mv mv-map">
        <svg viewBox="0 0 120 80">
          <path d="M8 76 C 30 60, 40 52, 58 40 S 84 18, 112 6" />
          <circle cx="66" cy="34" r="4" />
        </svg>
      </div>
    );
  return (
    <div className="mv mv-sheet">
      {[0, 1, 2, 3].map((i) => (
        <i key={i} style={{ ["--i" as string]: i }} />
      ))}
    </div>
  );
}

export function SiteNav({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const [previous, setPrevious] = useState<number | null>(null);
  const [panelHeight, setPanelHeight] = useState(0);
  const [mark, setMark] = useState<{ x: number; w: number } | null>(null);
  const nav = useRef<HTMLElement>(null);
  const panels = useRef<(HTMLDivElement | null)[]>([]);
  const links = useRef<(HTMLAnchorElement | null)[]>([]);
  const closeTimer = useRef(0);
  const quietFocus = useRef(false);
  const currentIndex = navSections.findIndex((section) => section.href === pathname);

  function show(index: number) {
    window.clearTimeout(closeTimer.current);
    setPrevious(open);
    setOpen(index);
  }
  function hide(delay = 160) {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(null), delay);
  }

  // Indicator follows the open item, rests on the current page. Measured again
  // once the web font has loaded and whenever the window is resized.
  useEffect(() => {
    const measure = () => {
      const index = open ?? (currentIndex >= 0 ? currentIndex : null);
      const link = index !== null ? links.current[index] : null;
      // Measured against the header bar, which also positions the panels.
      const host = nav.current?.closest<HTMLElement>(".site-header-inner") ?? null;
      if (!link || !host) {
        setMark(null);
        return;
      }
      const a = link.getBoundingClientRect();
      const b = host.getBoundingClientRect();
      setMark({ x: a.left - b.left, w: a.width });
    };
    measure();
    let alive = true;
    document.fonts?.ready.then(() => alive && measure());
    window.addEventListener("resize", measure);
    return () => {
      alive = false;
      window.removeEventListener("resize", measure);
    };
  }, [open, currentIndex]);

  useEffect(() => {
    if (open === null) return;
    const panel = panels.current[open];
    if (panel) setPanelHeight(panel.offsetHeight);
  }, [open]);

  useEffect(() => {
    setOpen(null);
  }, [pathname]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        const index = open;
        setOpen(null);
        quietFocus.current = true;
        links.current[index]?.focus();
        quietFocus.current = false;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const direction = open !== null && previous !== null ? Math.sign(open - previous) : 0;

  return (
    <>
      <nav
        ref={nav}
        className={`mega-nav ${open !== null ? "is-open" : ""}`}
        aria-label="Navigation principale"
        onMouseLeave={() => hide()}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node)) hide(0);
        }}
      >
        {navSections.map((section, index) => (
          <div className="mega-item" key={section.href} onMouseEnter={() => show(index)}>
            <Link
              href={section.href}
              ref={(element) => {
                links.current[index] = element;
              }}
              aria-current={pathname === section.href ? "page" : undefined}
              aria-expanded={open === index}
              aria-controls={`mega-${index}`}
              onFocus={() => {
                if (!quietFocus.current) show(index);
              }}
              className={open === index ? "is-hot" : ""}
            >
              {section.label}
            </Link>
            <div
              id={`mega-${index}`}
              ref={(element) => {
                panels.current[index] = element;
              }}
              className={`mega-panel ${open === index ? "is-active" : ""}`}
              style={{ ["--dir" as string]: direction }}
              onMouseEnter={() => show(index)}
            >
              <div className="mega-intro">
                <p className="mega-kicker">{section.label}</p>
                <p className="mega-lead">{section.intro}</p>
                <Link href={section.href} className="link" tabIndex={open === index ? 0 : -1}>
                  Voir la page
                </Link>
              </div>
              <ul className={`mega-list ${section.numbered ? "is-numbered" : ""}`}>
                {section.entries.map((entry, n) => (
                  <li key={entry.href} style={{ ["--i" as string]: n }}>
                    <Link href={entry.href} tabIndex={open === index ? 0 : -1}>
                      {section.numbered && <span className="mega-n">{n + 1}</span>}
                      <span>
                        <strong>{entry.label}</strong>
                        {entry.note && <small>{entry.note}</small>}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href={section.feature.href} className="mega-feature" tabIndex={open === index ? 0 : -1}>
                <Visual kind={section.feature.visual} />
                <span className="mega-feature-kicker">{section.feature.kicker}</span>
                <strong>{section.feature.title}</strong>
                <span className="mega-feature-cta">{section.feature.cta}</span>
              </Link>
            </div>
          </div>
        ))}
        <span
          className="mega-mark"
          aria-hidden="true"
          style={mark ? { transform: `translateX(${mark.x}px)`, width: `${mark.w}px`, opacity: 1 } : { opacity: 0 }}
        />
      </nav>
      <div className="mega-backdrop" aria-hidden="true" style={{ ["--ph" as string]: `${panelHeight}px` }} />
    </>
  );
}
