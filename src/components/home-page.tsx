"use client";

import Link from "next/link";
import { HeroInstrument } from "./hero-instrument";
import { Releve } from "./releve";
import { PlatformBento } from "./platform-bento";
import { AudiencePicker } from "./audience-picker";
import { SectorExplorer } from "./sector-explorer";
import { BeforeAfter } from "./before-after";
import { Focus } from "./focus";
import { useSiteActions } from "./site-frame";
import { steps } from "@/lib/steps";
import { plans } from "@/lib/offers";

const frameworks = [
  { name: "GHG Protocol", ref: "Corporate Standard", text: "Classement en Scopes 1, 2 et 3 et principes de comptabilisation." },
  { name: "ISO 14064-1", ref: "Organisations", text: "Quantification et déclaration des gaz à effet de serre d’une organisation." },
  { name: "MACF / CBAM", ref: "Règlement (UE) 2023/956", text: "Émissions intrinsèques des marchandises importées dans l’Union européenne." },
  { name: "Loi 09-08", ref: "Maroc, CNDP", text: "Protection des personnes physiques à l’égard du traitement des données personnelles." },
];

const drivers = [
  {
    title: "Vos clients posent la question.",
    text: "Donneurs d’ordre et acheteurs demandent les émissions de leurs fournisseurs. Une réponse documentée protège la relation commerciale.",
  },
  {
    title: "L’export vers l’Europe change.",
    text: "Le MACF concerne le ciment, le fer et l’acier, l’aluminium, les engrais, l’hydrogène et l’électricité importés dans l’Union européenne.",
  },
  {
    title: "L’énergie pèse sur vos coûts.",
    text: "Mesurer l’électricité et les carburants, c’est savoir où se concentrent les consommations, donc où agir en premier.",
  },
  {
    title: "Le reporting RSE se structure.",
    text: "Banques, partenaires et systèmes de management attendent des informations environnementales structurées et vérifiables.",
  },
];

const comparison = [
  ["Pensé pour les entreprises marocaines", "À construire soi-même", "Variable", "En français, avec des sources locales"],
  ["Accompagnement par des consultants", "Non", "Rarement inclus", "Un cabinet QHSE et RSE à vos côtés"],
  ["Chaque chiffre relié à sa preuve", "Selon la rigueur interne", "Souvent", "Au cœur de la méthode"],
  ["Contrôle de la qualité des données", "Manuel", "Variable", "Avant chaque calcul"],
  ["Limites et estimations affichées", "Rarement", "Variable", "Toujours visibles"],
  ["Données pour le MACF / CBAM", "Non", "Option selon l’éditeur", "Parcours dédié"],
  ["Lien avec votre système de management", "Non", "Non", "ISO 14001, 9001 et 45001"],
];

const principles = [
  {
    term: "Vos données vous appartiennent",
    text: "Elles servent à votre bilan, et à rien d’autre. Vos données et vos rapports restent exportables.",
  },
  {
    term: "Des accès selon les rôles",
    text: "Contributeurs, validateurs et direction voient ce qui les concerne. Chacun sait ce qu’il fournit et ce qu’il peut modifier.",
  },
  {
    term: "Un historique complet",
    text: "Chaque correction garde sa justification, chaque rapport sa version. Une évolution s’explique d’une année sur l’autre.",
  },
  {
    term: "Le cadre marocain",
    text: "Les données personnelles sont traitées selon la loi 09-08, avec les formalités CNDP accomplies avant l’ouverture des espaces clients.",
  },
];

const faq = [
  {
    q: "Que puis-je découvrir aujourd’hui ?",
    a: "Une démonstration interactive avec des données d’exemple, des outils gratuits (calculateur express, vérificateur MACF, diagnostic) et une checklist adaptée à votre activité. Les missions sont menées dès maintenant par nos consultants avec la méthode SPS-CARBON ; les espaces clients de la plateforme ouvrent progressivement.",
  },
  {
    q: "Quelles données faut-il pour commencer ?",
    a: "Pour un premier bilan : vos factures d’électricité, vos achats de carburant et de combustibles, et la liste de vos sites et véhicules. Inutile d’avoir tout réuni avant de nous contacter.",
  },
  {
    q: "Combien de temps dure un premier bilan ?",
    a: "Cela dépend surtout de la disponibilité des données et du nombre de sites. Le calendrier est fixé lors du cadrage, avec les étapes et les personnes à mobiliser de votre côté.",
  },
  {
    q: "Comment est fixé le prix ?",
    a: "Selon le nombre de sites, les sources à examiner, la qualité des données et les livrables attendus. Vous recevez une proposition après le cadrage ; la page Offres compare ce que chaque formule inclut. Aucun abonnement n’est vendu sur ce site.",
  },
  {
    q: "Mon entreprise est-elle concernée par le MACF ?",
    a: "Le MACF vise certaines marchandises importées dans l’UE : ciment, fer et acier, aluminium, engrais, hydrogène et électricité, selon leur code douanier. Les obligations déclaratives reposent sur l’importateur européen, qui demande des données à ses fournisseurs.",
  },
  {
    q: "Les résultats sont-ils certifiés ?",
    a: "La traçabilité facilite la revue mais ne constitue pas une certification. Une vérification indépendante relève d’un organisme et d’une mission distincts. Nous préparons un dossier qui se prête à cette vérification.",
  },
];

const tools = [
  { href: "/outils#calculateur", name: "Calculateur express", text: "Vos Scopes 1 et 2 à partir de vos factures, chaque facteur sourcé.", visual: ["12 400 L", "×", "2,68", "=", "33,2 t"] },
  { href: "/outils#macf", name: "Vérificateur MACF", text: "Vos exportations vers l’UE sont-elles concernées par le CBAM ?", visual: ["Code NC", "→", "Concerné"] },
  { href: "/outils#diagnostic", name: "Diagnostic express", text: "Cinq questions pour trouver votre point de départ.", visual: ["5 questions", "→", "Votre parcours"] },
];

const i = (n: number) => ({ ["--i" as string]: n });

export function HomePage() {
  const { openChecklist } = useSiteActions();
  return (
    <main id="main" className="home">
      <HeroInstrument />

      <section className="chapter is-tight frames" aria-labelledby="frames-title">
        <div className="wrap frames-grid">
          <h2 id="frames-title" className="frames-title">
            Nos cadres de référence
          </h2>
          <ul className="frames-list" data-reveal="stagger">
            {frameworks.map((item) => (
              <li key={item.name}>
                <strong>{item.name}</strong>
                <span>{item.ref}</span>
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
          <p className="frames-note">
            Se référer à un standard ne vaut pas certification : une vérification indépendante reste une mission distincte.{" "}
            <Link href="/normes" className="link">
              Toutes les normes carbone, expliquées
            </Link>
          </p>
        </div>
      </section>

      <section className="chapter why" id="pourquoi" aria-labelledby="why-title">
        <div className="wrap why-grid">
          <div className="why-head">
            <Focus className="t-h2" id="why-title">
              Le carbone entre dans les décisions de l’entreprise.
            </Focus>
            <p className="t-lead" data-reveal="rise">
              Une demande client, un marché export, une facture d’énergie, un rapport RSE : les raisons de mesurer arrivent
              souvent en même temps.
            </p>
          </div>
          <ul className="why-list">
            {drivers.map((driver, n) => (
              <li key={driver.title} data-reveal="rise" style={i(n)}>
                <h3 className="t-h3">{driver.title}</h3>
                <p>{driver.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Releve />

      <section className="chapter s-tint bento-chapter" id="plateforme" aria-labelledby="bento-title">
        <div className="wrap">
          <div className="head is-split">
            <Focus className="t-h2" id="bento-title">
              Tout votre carbone, sur un seul écran.
            </Focus>
            <p className="t-lead" data-reveal="rise">
              Chaque module répond à une question de la direction. Essayez-les : ils réagissent. Écrans de démonstration,
              données d’exemple.
            </p>
          </div>
          <PlatformBento />
          <div className="section-cta" data-reveal="rise">
            <Link href="/plateforme" className="btn">
              Découvrir la plateforme
            </Link>
            <Link href="/plateforme#demonstration" className="link">
              Essayer la démonstration
            </Link>
          </div>
        </div>
      </section>

      <section className="chapter" id="public" aria-labelledby="audience-title">
        <div className="wrap audience-grid">
          <div className="head">
            <Focus className="t-h2" id="audience-title">
              Pour qui ?
            </Focus>
            <p className="t-lead" data-reveal="rise">
              Pour les organisations qui doivent connaître leurs émissions, les justifier et les réduire, quel que soit leur
              point de départ.
            </p>
          </div>
          <div data-reveal="rise">
            <AudiencePicker />
          </div>
        </div>
      </section>

      <section className="chapter s-tint" id="secteurs" aria-labelledby="sectors-title">
        <div className="wrap">
          <div className="head is-split">
            <Focus className="t-h2" id="sectors-title">
              Votre secteur, vos sources d’émissions.
            </Focus>
            <p className="t-lead" data-reveal="rise">
              Choisissez un secteur pour voir où se situent, en général, les principales sources, et dans quel scope elles se
              rangent.
            </p>
          </div>
          <div data-reveal="rise">
            <SectorExplorer />
          </div>
        </div>
      </section>

      <section className="chapter" id="pourquoi-nous" aria-labelledby="compare-title">
        <div className="wrap">
          <div className="head is-split">
            <Focus className="t-h2" id="compare-title">
              Un bilan que vous pouvez défendre.
            </Focus>
            <p className="t-lead" data-reveal="rise">
              Un tableur ou un logiciel importé produit un total. SPS-CARBON produit un bilan que vous comprenez, que vous
              pouvez justifier et qui débouche sur des actions.
            </p>
          </div>
          <div data-reveal="rise">
            <BeforeAfter />
          </div>
          <div className="compare-wrap" data-reveal="rise">
            <table className="compare">
              <caption className="sr-only">Comparaison de SPS-CARBON avec un tableur interne et un logiciel générique</caption>
              <thead>
                <tr>
                  <th scope="col">Critère</th>
                  <th scope="col">Tableur interne</th>
                  <th scope="col">Logiciel générique</th>
                  <th scope="col" className="is-us">
                    SPS-CARBON
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.map(([criterion, sheet, generic, us]) => (
                  <tr key={criterion}>
                    <th scope="row">{criterion}</th>
                    <td>{sheet}</td>
                    <td>{generic}</td>
                    <td className="is-us">{us}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="chapter s-tint" id="offres" aria-labelledby="offers-title">
        <div className="wrap">
          <div className="head is-split">
            <Focus className="t-h2" id="offers-title">
              Trois façons de commencer.
            </Focus>
            <p className="t-lead" data-reveal="rise">
              Chaque mission démarre par un cadrage. Le prix dépend de vos sites, de vos données et des livrables attendus.
            </p>
          </div>
          <div className="offer-cards" data-reveal="stagger">
            {plans.map((offer) => (
              <article key={offer.name} className={`offer-card spot ${offer.featured ? "is-featured" : ""}`}>
                <div className="offer-top">
                  <span className="offer-scope">{offer.scope}</span>
                  {offer.badge && <span className="offer-badge">{offer.badge}</span>}
                </div>
                <h3 className="t-h3">{offer.name}</h3>
                <p>{offer.text}</p>
                <ul className="check-list">
                  {offer.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <Link href={offer.href} className="link" aria-label={`En savoir plus : ${offer.name}`}>
                  En savoir plus
                </Link>
              </article>
            ))}
          </div>
          <div className="offers-more" data-reveal="rise">
            <p>Comparez ce que chaque formule inclut, ajoutez des options et composez votre périmètre.</p>
            <Link href="/offres" className="btn btn-quiet btn-small">
              Comparer les offres
            </Link>
          </div>

          <div className="tools-strip" id="outils" aria-labelledby="tools-title">
            <h3 id="tools-title" className="tools-strip-title">
              Ou commencez gratuitement, sans inscription.
            </h3>
            <ul data-reveal="stagger">
              {tools.map((tool) => (
                <li key={tool.href}>
                  <Link href={tool.href} className="tool-row">
                    <span className="tool-row-visual" aria-hidden="true">
                      {tool.visual.map((part, n) => (
                        <span key={n} className={n === tool.visual.length - 1 ? "is-out" : ["×", "=", "→"].includes(part) ? "is-op" : ""}>
                          {part}
                        </span>
                      ))}
                    </span>
                    <strong>{tool.name}</strong>
                    <span className="tool-row-text">{tool.text}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="chapter path-chapter" id="deroulement" aria-labelledby="process-title">
        <div className="wrap">
          <div className="head is-split">
            <Focus className="t-h2" id="process-title">
              Comment se déroule une mission.
            </Focus>
            <p className="t-lead" data-reveal="rise">
              Du premier échange au suivi annuel. À chaque étape, vous savez ce que nous attendons de vous et ce que vous
              recevez.
            </p>
          </div>
          <ol className="path" data-reveal="rise">
            <svg className="path-line" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">
              <line className="path-line-a" x1="0" y1="-22" x2="100" y2="78" pathLength={1} vectorEffect="non-scaling-stroke" />
              <line className="path-line-b" x1="0" y1="0" x2="100" y2="100" pathLength={1} vectorEffect="non-scaling-stroke" />
            </svg>
            {steps.map((step, n) => (
              <li key={step.title} style={i(n)}>
                <span className="path-n">{n + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
          <div className="section-cta" data-reveal="rise">
            <button type="button" className="btn" onClick={openChecklist}>
              Créer ma checklist de données
            </button>
            <span className="t-meta">La liste des documents à réunir, selon votre activité.</span>
          </div>
        </div>
      </section>

      <section className="chapter s-tint" id="confiance" aria-labelledby="trust-title">
        <div className="wrap trust-grid">
          <div className="head">
            <Focus className="t-h2" id="trust-title">
              Vos données, sous contrôle.
            </Focus>
            <p className="t-lead" data-reveal="rise">
              Quatre principes, posés dès la conception de la plateforme et appliqués dans chaque mission.
            </p>
          </div>
          <dl className="spec" data-reveal="stagger">
            {principles.map((item) => (
              <div key={item.term}>
                <dt>{item.term}</dt>
                <dd>{item.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="chapter faq-chapter" aria-labelledby="faq-title">
        <div className="wrap faq-grid">
          <div className="faq-side">
            <Focus className="t-h2" id="faq-title">
              Vos questions.
            </Focus>
            <div className="faq-ask" data-reveal="rise">
              <p className="faq-ask-title">Une autre question ?</p>
              <p>Posez-la directement à l’équipe : périmètre, données, MACF ou calendrier.</p>
              <Link href="/contact" className="btn btn-small">
                Poser ma question
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
