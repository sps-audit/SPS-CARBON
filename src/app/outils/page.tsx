import type { Metadata } from "next";
import Link from "next/link";
import { CarbonCalculator } from "@/components/carbon-calculator";
import { CbamChecker } from "@/components/cbam-checker";
import { ChecklistButton } from "@/components/checklist-button";
import { Diagnostic } from "@/components/diagnostic";
import { Focus } from "@/components/focus";
import { PageHead } from "@/components/page-head";
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

function Head({ id, title, lead, split = true }: { id: string; title: string; lead: string; split?: boolean }) {
  return (
    <div className={`head ${split ? "is-split" : ""}`}>
      <Focus className="t-h2" id={id}>
        {title}
      </Focus>
      <p className="t-lead" data-reveal="rise">
        {lead}
      </p>
    </div>
  );
}

export default function OutilsPage() {
  return (
    <main id="main" className="page">
      <PageHead
        crumb="Outils gratuits"
        title="Des outils gratuits pour démarrer."
        lead="Estimez vos émissions, vérifiez si le MACF vous concerne, préparez vos données. Sans inscription : tout se calcule dans votre navigateur, rien n’est envoyé."
        instrument="outils"
      />

      <nav className="tool-index" aria-label="Les outils">
        <div className="wrap">
          <ul data-reveal="stagger">
            {tools.map((tool) => (
              <li key={tool.href}>
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

      <section className="chapter s-tint" id="calculateur" aria-labelledby="calc-title">
        <div className="wrap">
          <Head
            id="calc-title"
            title="Calculateur express, Scopes 1 et 2."
            lead="Saisissez vos consommations de l’année. Chaque ligne montre son calcul et la source de son facteur ; vous pouvez remplacer le facteur par le vôtre."
          />
          <div data-reveal="rise">
            <CarbonCalculator />
          </div>
        </div>
      </section>

      <section className="chapter" id="macf" aria-labelledby="cbam-title">
        <div className="wrap">
          <Head
            id="cbam-title"
            title="Le MACF vous concerne-t-il ?"
            lead="Depuis le 1er janvier 2026, le mécanisme d’ajustement carbone aux frontières de l’UE est entré dans sa période définitive. Trois questions pour savoir où vous en êtes."
          />
          <div data-reveal="rise">
            <CbamChecker />
          </div>
        </div>
      </section>

      <section className="chapter s-tint" id="diagnostic" aria-labelledby="tools-diag-title">
        <div className="wrap diag-layout">
          <Head
            id="tools-diag-title"
            split={false}
            title="Diagnostic express."
            lead="Cinq questions, une minute. Découvrez votre point de départ et les données à préparer, puis transmettez votre contexte à notre équipe."
          />
          <div data-reveal="rise">
            <Diagnostic />
          </div>
        </div>
      </section>

      <section className="chapter" id="checklist" aria-labelledby="tools-checklist-title">
        <div className="wrap tool-duo" data-reveal="stagger">
          <div className="tool-duo-item spot">
            <h2 id="tools-checklist-title" className="t-h3">
              Checklist des données.
            </h2>
            <p>
              Choisissez votre secteur et vos sources : la liste des documents à réunir s’affiche, à télécharger ou à imprimer pour
              vos équipes.
            </p>
            <ChecklistButton />
          </div>
          <div className="tool-duo-item spot">
            <h2 className="t-h3">Quelle norme pour vous ?</h2>
            <p>
              GHG Protocol, ISO 14064-1, ISO 14067, MACF, CSRD, SBTi : choisissez votre situation, les normes qui vous concernent
              ressortent.
            </p>
            <Link href="/normes" className="btn btn-quiet">
              Explorer les normes
            </Link>
          </div>
        </div>
      </section>

      <section className="chapter s-tint faq-chapter" aria-labelledby="tools-faq-title">
        <div className="wrap faq-grid">
          <div className="faq-side">
            <Focus className="t-h2" id="tools-faq-title">
              Questions sur les outils.
            </Focus>
            <div className="faq-ask" data-reveal="rise">
              <p className="faq-ask-title">Besoin d’un vrai bilan ?</p>
              <p>Un périmètre défini, des données contrôlées, chaque hypothèse documentée : comparez nos formules.</p>
              <Link href="/offres" className="btn btn-small">
                Voir les offres
              </Link>
            </div>
          </div>
          <div className="faq" data-reveal="rise">
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
