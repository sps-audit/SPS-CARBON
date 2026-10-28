import type { Metadata } from "next";
import Link from "next/link";
import { CarbonCalculator } from "@/components/carbon-calculator";
import { CbamChecker } from "@/components/cbam-checker";
import { ChecklistButton } from "@/components/checklist-button";
import { Diagnostic } from "@/components/diagnostic";
import { shareMetadata } from "@/lib/share";

const title = "Outils gratuits | SPS-CARBON";
const description =
  "Calculateur carbone express des Scopes 1 et 2, vérificateur MACF / CBAM, diagnostic express et checklist des données : des outils gratuits, sans inscription, calculés dans votre navigateur.";

export const metadata: Metadata = { title, description, ...shareMetadata(title, description) };

const tools = [
  { href: "#calculateur", name: "Calculateur express", text: "Vos émissions des Scopes 1 et 2 à partir de vos factures.", time: "2 minutes" },
  { href: "#macf", name: "Vérificateur MACF", text: "Vos exportations vers l’UE sont-elles concernées par le CBAM ?", time: "1 minute" },
  { href: "#diagnostic", name: "Diagnostic express", text: "Le point de départ et la formule adaptés à votre entreprise.", time: "1 minute" },
  { href: "#checklist", name: "Checklist des données", text: "La liste des documents à réunir selon votre activité.", time: "3 minutes" },
  { href: "/normes", name: "Quelle norme pour vous ?", text: "GHG Protocol, ISO 14064, MACF, CSRD : laquelle vous concerne.", time: "2 minutes" },
];

const faq = [
  {
    q: "Ces outils sont-ils vraiment gratuits ?",
    a: "Oui, sans inscription et sans limite. Ils servent à préparer votre démarche ; vous décidez ensuite si vous souhaitez échanger avec notre équipe.",
  },
  {
    q: "Mes chiffres sont-ils envoyés quelque part ?",
    a: "Non. Les calculs se font dans votre navigateur. Rien n’est envoyé ni enregistré par ce site. Si vous choisissez de nous contacter, vos réponses sont reprises dans un brouillon que vous relisez avant tout envoi.",
  },
  {
    q: "Le calculateur remplace-t-il un bilan carbone ?",
    a: "Non. Il donne un ordre de grandeur des Scopes 1 et 2 à partir de quelques consommations. Un bilan définit un périmètre, contrôle les données, couvre les fluides frigorigènes, les procédés et souvent le Scope 3, et documente chaque hypothèse.",
  },
  {
    q: "D’où viennent les facteurs d’émission ?",
    a: "Les combustibles utilisent les valeurs par défaut du GIEC (lignes directrices 2006, volume énergie) ; l’électricité utilise l’intensité moyenne de la production marocaine en 2024. Chaque source est affichée sous le facteur, que vous pouvez remplacer par la valeur retenue pour votre bilan.",
  },
  {
    q: "Le vérificateur MACF vaut-il avis juridique ?",
    a: "Non. Il donne une indication à partir de trois questions. Le code douanier (NC) de chaque produit et la situation de l’importateur européen font foi ; nous pouvons les examiner avec vous.",
  },
];

export default function OutilsPage() {
  return (
    <main id="main" className="page">
      <header className="page-hero t-deep">
        <div className="wrap page-hero-grid">
          <div className="page-hero-copy">
            <nav className="crumbs" aria-label="Fil d’Ariane">
              <Link href="/">Accueil</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">Outils gratuits</span>
            </nav>
            <h1 className="d-l page-title" data-reveal="mask">
              Des outils gratuits pour démarrer.
            </h1>
            <p className="lead">
              Estimez vos émissions, vérifiez si le MACF vous concerne, préparez vos données. Sans inscription : tout se calcule dans
              votre navigateur, rien n’est envoyé.
            </p>
          </div>
          <div className="page-hero-visual" aria-hidden="true">
            <div className="eq-motif">
              <div className="eq-cell q">
                <strong>10 000</strong>
                <small>kWh</small>
              </div>
              <b>×</b>
              <div className="eq-cell f">
                <strong>0,551</strong>
                <small>kgCO₂e/kWh</small>
              </div>
              <b>=</b>
              <div className="eq-cell r">
                <strong>5,51</strong>
                <small>tCO₂e</small>
              </div>
              <p className="eq-source">Source du facteur affichée</p>
            </div>
          </div>
        </div>
      </header>

      <nav className="tool-index t-deep" aria-label="Les outils">
        <div className="wrap">
          <ul>
            {tools.map((tool, n) => (
              <li key={tool.href} data-reveal="rule" style={{ ["--i" as string]: n }}>
                <a href={tool.href}>
                  <strong>{tool.name}</strong>
                  <span>{tool.text}</span>
                  <small>{tool.time}</small>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <section className="chapter t-dark" id="calculateur" aria-labelledby="calc-title">
        <div className="wrap">
          <div className="chapter-head">
            <h2 id="calc-title" className="d-l" data-reveal="mask">
              Calculateur express, Scopes 1 et 2.
            </h2>
            <p className="lead" data-reveal>
              Saisissez vos consommations de l’année. Chaque ligne montre son calcul et la source de son facteur ; vous pouvez
              remplacer le facteur par le vôtre.
            </p>
          </div>
          <div data-reveal="rise">
            <CarbonCalculator />
          </div>
        </div>
      </section>

      <section className="chapter t-deep" id="macf" aria-labelledby="cbam-title">
        <div className="wrap">
          <div className="chapter-head">
            <h2 id="cbam-title" className="d-l" data-reveal="mask">
              Le MACF vous concerne-t-il ?
            </h2>
            <p className="lead" data-reveal>
              Depuis le 1er janvier 2026, le mécanisme d’ajustement carbone aux frontières de l’UE est entré dans sa période
              définitive. Trois questions pour savoir où vous en êtes.
            </p>
          </div>
          <div data-reveal="rise">
            <CbamChecker />
          </div>
        </div>
      </section>

      <section className="chapter t-ice" id="diagnostic" aria-labelledby="tools-diag-title">
        <div className="wrap grid diag-layout">
          <div className="diag-head">
            <h2 id="tools-diag-title" className="d-l" data-reveal="mask">
              Diagnostic express.
            </h2>
            <p className="lead" data-reveal>
              Cinq questions, une minute. Découvrez votre point de départ et les données à préparer, puis transmettez votre
              contexte en un clic.
            </p>
          </div>
          <div className="diag-wrap" data-reveal="rise">
            <Diagnostic />
          </div>
        </div>
      </section>

      <section className="chapter t-dark" id="checklist" aria-labelledby="tools-checklist-title">
        <div className="wrap grid tool-duo">
          <div className="tool-duo-item" data-reveal="panel">
            <h2 id="tools-checklist-title" className="d-m">
              Checklist des données.
            </h2>
            <p>
              Choisissez votre secteur et vos sources : la liste des documents à réunir s’affiche, à télécharger ou à imprimer
              pour vos équipes.
            </p>
            <ChecklistButton />
          </div>
          <div className="tool-duo-item" data-reveal="panel" style={{ ["--i" as string]: 1 }}>
            <h2 className="d-m">Quelle norme pour vous ?</h2>
            <p>
              GHG Protocol, ISO 14064-1, ISO 14067, MACF, CSRD, SBTi : choisissez votre situation, les normes qui vous concernent
              ressortent.
            </p>
            <Link href="/normes" className="btn btn-ghost">
              Explorer les normes
            </Link>
          </div>
        </div>
      </section>

      <section className="chapter t-ice faq-chapter" aria-labelledby="tools-faq-title">
        <div className="wrap grid">
          <div className="faq-side">
            <h2 id="tools-faq-title" className="d-l faq-title" data-reveal="mask">
              Questions sur les outils.
            </h2>
            <div className="faq-ask" data-reveal="panel">
              <p className="faq-ask-title">Besoin d’un vrai bilan ?</p>
              <p>Un périmètre défini, des données contrôlées, chaque hypothèse documentée : comparez nos formules.</p>
              <Link href="/offres" className="btn btn-dark btn-small">
                Voir les offres
              </Link>
            </div>
          </div>
          <div className="faq" data-reveal>
            {faq.map((item) => (
              <details key={item.q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
