"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { HeroInstrument } from "./hero-instrument";
import { PlateShowcase } from "./plate-showcase";
import { PlatformCapture } from "./platform-capture";
import { OfferPlate } from "./offer-plate";
import { PhasePlate } from "./phase-plate";
import { AudiencePicker } from "./audience-picker";
import { WhyUs } from "./why-us";
import { Focus } from "./focus";
import { useSiteActions } from "./site-frame";
import { offerPlate, phasePlate } from "@/lib/plates";
import { demoCase, platformDemo } from "@/lib/demo-case";

const comparison = [
  ["Pensé pour les entreprises marocaines", "À construire soi-même", "Variable", "En français, avec des sources locales"],
  ["Accompagnement par des consultants", "Non", "Rarement inclus", "Un cabinet QHSE et RSE à vos côtés"],
  ["Chaque chiffre relié à sa preuve", "Selon la rigueur interne", "Souvent", "Au cœur de la méthode"],
  ["Contrôle de la qualité des données", "Manuel", "Variable", "Avant chaque calcul"],
  ["Limites et estimations affichées", "Rarement", "Variable", "Toujours visibles"],
  ["Données pour le MACF / CBAM", "Non", "Option selon l’éditeur", "Parcours dédié"],
  ["Lien avec votre système de management", "Non", "Non", "ISO 14001, 9001 et 45001"],
];

const faq: { q: string; a: ReactNode }[] = [
  {
    q: "Que puis-je découvrir aujourd’hui ?",
    a: "La plateforme elle-même, en démonstration avec une entreprise fictive, des outils gratuits (calculateur express, vérificateur MACF, diagnostic) et une checklist adaptée à votre activité. Les missions sont menées dès maintenant par nos consultants avec la méthode SPS-CARBON ; l’accès à la plateforme avec vos données ouvre sur invitation, dans le cadre du programme pilote 2026.",
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
    q: "Sur quelles normes s’appuie la méthode ?",
    a: (
      <>
        Le GHG Protocol pour le classement en Scopes 1, 2 et 3, l’ISO 14064-1 pour la quantification et la déclaration,
        le règlement (UE) 2023/956 pour le MACF, et la loi 09-08 pour les données personnelles.{" "}
        <Link href="/normes" className="link">
          Toutes les normes carbone, expliquées
        </Link>
      </>
    ),
  },
  {
    q: "Que deviennent nos données ?",
    a: "Elles vous appartiennent, servent à votre bilan et à rien d’autre, et restent exportables. Les accès dépendent des rôles (contributeurs, validateurs, direction) ; chaque correction garde sa justification et chaque rapport sa version. Les données personnelles sont traitées selon la loi 09-08, avec les formalités CNDP accomplies avant l’ouverture des espaces clients.",
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



export function HomePage() {
  const { openChecklist } = useSiteActions();
  return (
    <main id="main" className="home">
      <HeroInstrument />

      <section className="chapter" id="pourquoi" aria-labelledby="why-title">
        <div className="wrap audience-grid">
          <div className="head">
            <Focus className="t-h2" id="why-title">
              Vos raisons de mesurer.
            </Focus>
            <p className="t-lead" data-reveal="rise">
              Une demande client, un marché export, une facture d’énergie, un rapport RSE : elles arrivent souvent en même
              temps. Choisissez votre situation.
            </p>
          </div>
          <div data-reveal="rise">
            <AudiencePicker />
          </div>
        </div>
      </section>

      <section className="chapter s-tint bento-chapter" id="plateforme" aria-labelledby="bento-title">
        <div className="wrap">
          <div className="head is-split">
            <Focus className="t-h2" id="bento-title">
              Tout votre carbone, sur un seul écran.
            </Focus>
            <p className="t-lead" data-reveal="rise">
              Cinq modules, cinq questions de la direction. Choisissez-en un : tout part du bilan de la démonstration de la
              plateforme, {demoCase.name}, une entreprise fictive.
            </p>
          </div>
          <PlateShowcase />
        </div>
      </section>

      <section className="chapter" id="demonstration" aria-labelledby="demo-title">
        <div className="wrap demo-band">
          <div className="demo-band-copy">
            <Focus className="t-h2" id="demo-title">
              Ouvrez la vraie plateforme.
            </Focus>
            <p className="t-lead" data-reveal="rise">
              La démonstration n’est pas une maquette : ce sont les écrans et les calculs de la plateforme, ouverts sur
              {" "}{demoCase.name}, une entreprise fictive. Choisissez un rôle et parcourez le bilan.
            </p>
            <ul className="demo-roles" data-reveal="rise">
              <li>
                <strong>Cliente</strong>
                Saisir, contrôler, suivre le plan de réduction.
              </li>
              <li>
                <strong>Consultante SafePerform</strong>
                Revoir les données, commenter, valider.
              </li>
              <li>
                <strong>Vérificateur indépendant</strong>
                Échantillonner et rendre un avis, en lecture seule.
              </li>
            </ul>
            <div className="section-cta" data-reveal="rise">
              <a href={platformDemo.url} className="btn" target="_blank" rel="noopener">
                {platformDemo.cta}
              </a>
              <span className="t-meta">{platformDemo.note}</span>
            </div>
          </div>
          <div data-reveal="rise">
            <PlatformCapture ambiance="voile" sizes="(max-width: 1000px) 100vw, 860px" />
          </div>
        </div>
      </section>

      <WhyUs />

      <section className="chapter s-tint" id="comparaison" aria-labelledby="compare-title">
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
                    <td data-label="Tableur interne">{sheet}</td>
                    <td data-label="Logiciel générique">{generic}</td>
                    <td data-label="SPS-CARBON" className="is-us">
                      {us}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="chapter" id="offres" aria-labelledby="offers-title">
        <div className="wrap">
          <div className="head is-split">
            <Focus className="t-h2" id="offers-title">
              {offerPlate.title}
            </Focus>
            <p className="t-lead" data-reveal="rise">
              {offerPlate.lead}
            </p>
          </div>
          <div data-reveal="rise">
            <OfferPlate />
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

      <section className="chapter s-tint phase-chapter" id="deroulement" aria-labelledby="process-title">
        <div className="wrap phase-grid">
          <div className="phase-side">
            <Focus className="t-h2" id="process-title">
              {phasePlate.title}
            </Focus>
            <p className="t-lead" data-reveal="rise">
              {phasePlate.lead}
            </p>
            <div className="section-cta" data-reveal="rise">
              <button type="button" className="btn" onClick={openChecklist}>
                Créer ma checklist de données
              </button>
              <span className="t-meta">La liste des documents à réunir, selon votre activité.</span>
            </div>
          </div>
          <div data-reveal="rise">
            <PhasePlate />
          </div>
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
