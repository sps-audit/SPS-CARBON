"use client";

import Link from "next/link";
import { HeroCockpit } from "./hero-cockpit";
import { ScopeRings } from "./scope-rings";
import { SectorExplorer } from "./sector-explorer";
import { useSiteActions } from "./site-frame";
import { Odometer } from "./odometer";
import { BeforeAfter } from "./before-after";
import { steps } from "@/lib/steps";
import { Diagnostic } from "./diagnostic";

const facts = [
  { value: 3, label: "scopes couverts, des opérations à la chaîne de valeur" },
  { value: 15, label: "catégories du Scope 3 examinées selon votre activité" },
  { value: 6, label: "secteurs concernés par le MACF à l’export vers l’UE" },
  { value: 1, label: "interlocuteur, de la collecte jusqu’au plan d’action" },
];

const drivers = [
  {
    title: "Vos clients posent la question.",
    text: "Donneurs d’ordre et acheteurs demandent les émissions de leurs fournisseurs. Une réponse documentée protège la relation commerciale.",
  },
  {
    title: "L’export vers l’Europe change.",
    text: "Le MACF, ou CBAM, concerne le ciment, le fer et l’acier, l’aluminium, les engrais, l’hydrogène et l’électricité importés dans l’UE.",
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

const audiences = [
  {
    who: "PME et ETI",
    need: "Réaliser un premier bilan carbone, sans équipe environnement dédiée.",
    get: ["Une collecte guidée, site par site", "Un bilan Scopes 1 et 2 expliqué", "Les premières priorités d’action"],
  },
  {
    who: "Industriels",
    need: "Comprendre le poids de l’énergie, des combustibles et des procédés sur plusieurs sites.",
    get: ["Des émissions par site et par source", "Les consommations anormales repérées", "Un suivi d’une année sur l’autre"],
  },
  {
    who: "Exportateurs vers l’UE",
    need: "Préparer les données demandées par un client européen au titre du MACF / CBAM.",
    get: ["L’analyse des produits concernés", "Les données de production et d’intrants", "Un dossier technique à transmettre"],
  },
  {
    who: "Fournisseurs de grands comptes",
    need: "Répondre aux questionnaires carbone de vos clients, avec des chiffres que vous pouvez défendre.",
    get: ["Des réponses justifiées par vos données", "Une méthode présentable", "Des mises à jour sans tout refaire"],
  },
  {
    who: "Directions QHSE et RSE",
    need: "Intégrer le carbone au système de management et au reporting existant.",
    get: ["Un lien avec vos démarches ISO", "Des indicateurs pour la revue de direction", "Un rapport RSE mieux étayé"],
  },
];


const offers = [
  {
    name: "Bilan essentiel",
    scope: "Scopes 1 et 2",
    text: "Vos opérations et votre énergie : combustibles, véhicules, procédés, électricité. La base de toute démarche carbone.",
    items: ["Périmètre et collecte guidée", "Calculs et hypothèses documentés", "Restitution à la direction"],
    href: "/solutions#inventaire-essentiel",
  },
  {
    name: "Bilan complet",
    scope: "Scopes 1, 2 et 3",
    text: "Toute la chaîne de valeur : achats, transport, déchets, déplacements. Avec les catégories qui comptent vraiment pour vous.",
    items: ["Examen des quinze catégories", "Collecte auprès des contributeurs", "Plan de réduction priorisé"],
    href: "/solutions#chaine-de-valeur",
    featured: true,
  },
  {
    name: "Accompagnement MACF",
    scope: "Export vers l’UE",
    text: "Pour les marchandises concernées par le CBAM : les données de production à transmettre à votre client européen.",
    items: ["Analyse des produits concernés", "Données de production et intrants", "Dossier technique"],
    href: "/solutions#cbam",
  },
];

const comparison = [
  ["Pensé pour les entreprises marocaines", "À construire soi-même", "Variable", "Oui, en français, sources locales"],
  ["Accompagnement par des consultants", "Non", "Rarement inclus", "Cabinet QHSE et RSE à vos côtés"],
  ["Chaque chiffre relié à sa preuve", "Selon la rigueur interne", "Souvent", "Au cœur de la méthode"],
  ["Contrôle de la qualité des données", "Manuel", "Variable", "Contrôles avant chaque calcul"],
  ["Limites et estimations affichées", "Rarement", "Variable", "Toujours visibles"],
  ["Données pour le MACF / CBAM", "Non", "Option selon l’éditeur", "Parcours dédié"],
  ["Lien avec votre système de management", "Non", "Non", "ISO 14001, 9001, 45001"],
];

const frameworks = [
  { name: "GHG Protocol", ref: "Corporate Standard", text: "Classification en Scopes 1, 2 et 3 et principes de comptabilisation des émissions." },
  { name: "ISO 14064-1", ref: "Organisations", text: "Quantification et déclaration des émissions de gaz à effet de serre d’une organisation." },
  { name: "MACF / CBAM", ref: "Règlement (UE) 2023/956", text: "Émissions intrinsèques des marchandises concernées importées dans l’Union européenne." },
  { name: "Loi 09-08", ref: "Maroc, CNDP", text: "Protection des personnes physiques à l’égard du traitement des données personnelles." },
];

const trust = [
  {
    title: "Vos données vous appartiennent",
    text: "Elles servent à votre bilan, rien d’autre. La plateforme est conçue pour que vos données et vos rapports restent exportables.",
  },
  {
    title: "Des accès selon les rôles",
    text: "Contributeurs, validateurs et direction voient ce qui les concerne. Chacun sait ce qu’il doit fournir et ce qu’il peut modifier.",
  },
  {
    title: "Un historique complet",
    text: "Chaque correction garde sa justification, chaque rapport sa version. Vous pouvez expliquer une évolution d’une année sur l’autre.",
  },
  {
    title: "Le cadre marocain",
    text: "Données personnelles traitées selon la loi 09-08. Les formalités auprès de la CNDP sont finalisées avant l’ouverture du service.",
  },
];

const faq = [
  {
    q: "Que puis-je découvrir aujourd’hui ?",
    a: "Une présentation détaillée, une démonstration interactive avec des données fictives et une checklist adaptée à votre activité. La plateforme est en développement : l’accompagnement se fait aujourd’hui avec nos consultants, et les espaces clients ouvriront progressivement.",
  },
  {
    q: "Quelles données faut-il pour commencer ?",
    a: "Pour un premier bilan : vos factures d’électricité, vos achats de carburant et de combustibles, et la liste de vos sites et véhicules. Il n’est pas nécessaire d’avoir tout réuni avant de nous contacter.",
  },
  {
    q: "Combien de temps dure un premier bilan ?",
    a: "Cela dépend surtout de la disponibilité des données et du nombre de sites. Le calendrier est fixé lors du cadrage, avec les étapes et les personnes à mobiliser de votre côté.",
  },
  {
    q: "Comment est fixé le prix ?",
    a: "Selon le nombre de sites, les sources à examiner, la qualité des données et les livrables attendus. Vous recevez une proposition après le cadrage. Aucun abonnement n’est vendu sur ce site.",
  },
  {
    q: "Mon entreprise est-elle concernée par le MACF ?",
    a: "Le MACF vise certaines marchandises importées dans l’UE : ciment, fer et acier, aluminium, engrais, hydrogène et électricité, selon leur code douanier. Les obligations déclaratives reposent sur l’importateur européen, qui demandera des données à ses fournisseurs.",
  },
  {
    q: "Les résultats sont-ils certifiés ?",
    a: "La traçabilité facilite la revue mais ne constitue pas une certification. Une vérification indépendante nécessite un organisme et une mission distincts. Nous préparons un dossier qui se prête à cette vérification.",
  },
];

const i = (n: number) => ({ ["--i" as string]: n });

export function HomePage() {
  const { openChecklist } = useSiteActions();
  return (
    <main id="main" className="home">
      <section className="hero t-deep" aria-labelledby="hero-title">
        <div className="hero-glow" aria-hidden="true" />
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <p className="hero-by">Plateforme de comptabilité carbone pour les entreprises au Maroc</p>
            <h1 id="hero-title" className="d-xl">
              <span className="line"><span>Mesurez, pilotez</span></span>
              <span className="line"><span>et réduisez</span></span>
              <span className="line"><span>vos émissions.</span></span>
            </h1>
            <p className="lead hero-lead">
              SPS-CARBON réunit vos données d’énergie, de carburant, d’achats et de transport, calcule vos émissions des
              Scopes 1, 2 et 3 avec une méthode traçable et vous aide à décider où agir. Avec l’accompagnement d’un cabinet
              QHSE et RSE marocain.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-mint" href="/contact">
                Parlons de votre projet
              </Link>
              <a className="btn btn-ghost" href="/plateforme">
                Voir la plateforme
              </a>
            </div>
          </div>
          <HeroCockpit />
        </div>
        <div className="wrap hero-foot">
          <p>
            <span className="status-dot" aria-hidden="true" />
            Plateforme en développement. Les écrans présentés utilisent des données fictives.
          </p>
        </div>
      </section>

      <section className="facts t-dark" aria-label="Ce que couvre SPS-CARBON">
        <div className="wrap facts-grid">
          {facts.map((fact, n) => (
            <div className="fact" key={fact.label} data-reveal="rule" style={i(n)}>
              <strong>
                <Odometer value={fact.value} delay={n * 120} />
              </strong>
              <span>{fact.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="frameworks t-dark" aria-labelledby="frameworks-title">
        <div className="wrap frameworks-grid">
          <h2 id="frameworks-title" className="frameworks-title" data-reveal>
            Nos cadres de référence
          </h2>
          {frameworks.map((item, n) => (
            <div className="framework" key={item.name} data-reveal="rule" style={i(n)}>
              <strong>{item.name}</strong>
              <span className="framework-ref">{item.ref}</span>
              <p>{item.text}</p>
            </div>
          ))}
          <p className="frameworks-note" data-reveal>
            Se référer à un standard ne vaut pas certification : une vérification indépendante reste une mission distincte.
          </p>
        </div>
      </section>

      <section className="chapter t-ice" id="pourquoi" aria-labelledby="why-title">
        <div className="wrap grid">
          <div className="why-head">
            <h2 id="why-title" className="d-l" data-reveal="mask">
              Le carbone entre dans les décisions de l’entreprise.
            </h2>
            <p className="lead" data-reveal>
              Une demande client, un marché export, une facture d’énergie, un rapport RSE : les raisons de mesurer arrivent
              souvent en même temps.
            </p>
          </div>
          <ul className="drivers">
            {drivers.map((driver, n) => (
              <li key={driver.title} data-reveal="rule" style={i(n)}>
                <h3>{driver.title}</h3>
                <p>{driver.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="chapter t-dark" id="public" aria-labelledby="audience-title">
        <div className="wrap">
          <div className="chapter-head">
            <h2 id="audience-title" className="d-l" data-reveal="mask">
              Pour qui ?
            </h2>
            <p className="lead" data-reveal>
              SPS-CARBON s’adresse aux organisations qui doivent connaître leurs émissions, les justifier et les réduire, quel
              que soit leur niveau de départ.
            </p>
          </div>
          <div className="audiences">
            {audiences.map((audience, n) => (
              <article className="audience spot" key={audience.who} data-reveal="panel" style={i(n)}>
                <h3>{audience.who}</h3>
                <p className="audience-need">{audience.need}</p>
                <p className="audience-label">Ce que vous obtenez</p>
                <ul className="hex-list">
                  {audience.get.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
            <Link className="audience audience-cta spot" href="/contact" data-reveal="panel" style={i(5)}>
              <h3>Votre situation est différente ?</h3>
              <p className="audience-need">Décrivez votre activité et votre objectif : nous vous dirons par où commencer.</p>
              <span className="link link-light">Présenter mon besoin</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="chapter t-deep scopes-chapter" id="scopes" aria-labelledby="scopes-title">
        <div className="wrap">
          <div className="chapter-head">
            <h2 id="scopes-title" className="d-l" data-reveal="mask">
              Ce que nous mesurons.
            </h2>
            <p className="lead" data-reveal>
              Le GHG Protocol classe les émissions en trois scopes. SPS-CARBON les couvre tous, en commençant par ceux qui
              comptent pour votre activité.
            </p>
          </div>
          <ScopeRings />
        </div>
      </section>

      <section className="chapter t-ice" id="deroulement" aria-labelledby="process-title">
        <div className="wrap">
          <div className="chapter-head">
            <h2 id="process-title" className="d-l" data-reveal="mask">
              Comment ça se passe.
            </h2>
            <p className="lead" data-reveal>
              Un parcours clair, du premier échange au suivi annuel. À chaque étape, vous savez ce que nous attendons de vous
              et ce que vous recevez.
            </p>
          </div>
          <ol className="process" data-reveal="process">
            {steps.map((step, n) => (
              <li key={step.title} style={i(n)}>
                <span className="process-n">{n + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
          <div className="process-cta" data-reveal>
            <p>Quelles données réunir pour votre activité ?</p>
            <button type="button" className="btn btn-dark" onClick={openChecklist}>
              Créer ma checklist
            </button>
          </div>
        </div>
      </section>

      <section className="chapter t-dark" id="offres" aria-labelledby="offers-title">
        <div className="wrap">
          <div className="chapter-head">
            <h2 id="offers-title" className="d-l" data-reveal="mask">
              Trois façons de commencer.
            </h2>
            <p className="lead" data-reveal>
              Chaque mission démarre par un cadrage. Le prix dépend de vos sites, de vos données et des livrables attendus.
            </p>
          </div>
          <div className="offer-cards">
            {offers.map((offer, n) => (
              <article key={offer.name} className={`offer-card spot ${offer.featured ? "is-featured" : ""}`} data-reveal="panel" style={i(n)}>
                <span className="offer-scope">{offer.scope}</span>
                <h3>{offer.name}</h3>
                <p>{offer.text}</p>
                <ul className="hex-list">
                  {offer.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <Link href={offer.href} className="link link-light" aria-label={`En savoir plus : ${offer.name}`}>
                  En savoir plus
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="chapter t-ice" id="diagnostic" aria-labelledby="diagnostic-title">
        <div className="wrap grid diag-layout">
          <div className="diag-head">
            <h2 id="diagnostic-title" className="d-l" data-reveal="mask">
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

      <section className="chapter t-deep" id="confiance" aria-labelledby="trust-title">
        <div className="wrap">
          <div className="chapter-head">
            <h2 id="trust-title" className="d-l" data-reveal="mask">
              Vos données, sous contrôle.
            </h2>
            <p className="lead" data-reveal>
              Des principes posés dès la conception. La plateforme étant en développement, leur mise en œuvre est précisée à
              chaque étape du projet.
            </p>
          </div>
          <div className="trust-grid">
            {trust.map((item, n) => (
              <article className="trust spot" key={item.title} data-reveal="panel" style={i(n)}>
                <span className="trust-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    {n === 0 && <path d="M12 3 4 6v6c0 5 8 9 8 9s8-4 8-9V6Z M9 12l2 2 4-4" />}
                    {n === 1 && <path d="M8 11V7a4 4 0 0 1 8 0v4 M5 11h14v10H5Z M12 15v2" />}
                    {n === 2 && <path d="M12 7v5l3 2 M3 12a9 9 0 1 0 3-6.7 M3 4v4h4" />}
                    {n === 3 && <path d="M4 20h16 M6 20V10 M10 20V10 M14 20V10 M18 20V10 M3 10l9-6 9 6Z" />}
                  </svg>
                </span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="chapter t-ice" id="pourquoi-nous" aria-labelledby="compare-title">
        <div className="wrap">
          <div className="chapter-head">
            <h2 id="compare-title" className="d-l" data-reveal="mask">
              Pourquoi SPS-CARBON, et pas un autre outil.
            </h2>
            <p className="lead" data-reveal>
              Un tableur ou un logiciel importé produit un total. SPS-CARBON produit un bilan que vous comprenez, que vous
              pouvez défendre et qui débouche sur des actions.
            </p>
          </div>
          <BeforeAfter />
          <div className="compare-wrap" data-reveal="rise">
            <table className="compare">
              <caption className="sr-only">Comparaison de SPS-CARBON avec un tableur interne et un logiciel générique</caption>
              <thead>
                <tr>
                  <th scope="col">Critère</th>
                  <th scope="col">Tableur interne</th>
                  <th scope="col">Logiciel générique</th>
                  <th scope="col" className="is-us">SPS-CARBON</th>
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

      <section className="chapter t-dark" id="secteurs" aria-labelledby="sectors-title">
        <div className="wrap">
          <div className="chapter-head">
            <h2 id="sectors-title" className="d-l" data-reveal="mask">
              Votre secteur, vos sources d’émissions.
            </h2>
            <p className="lead" data-reveal>
              Choisissez un secteur pour voir où se situent, en général, les principales sources et dans quel scope elles se
              rangent.
            </p>
          </div>
          <SectorExplorer />
        </div>
      </section>

      <section className="chapter t-ice faq-chapter" aria-labelledby="faq-title">
        <div className="wrap grid">
          <div className="faq-side">
            <h2 id="faq-title" className="d-l faq-title" data-reveal="mask">
              Vos questions.
            </h2>
            <div className="faq-ask" data-reveal="panel">
              <p className="faq-ask-title">Une autre question ?</p>
              <p>Posez-la directement à l’équipe : périmètre, données, MACF ou calendrier.</p>
              <Link href="/contact" className="btn btn-dark btn-small">
                Poser ma question
              </Link>
              <a className="link" href="mailto:contact@sps-carbon.ma">
                contact@sps-carbon.ma
              </a>
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
