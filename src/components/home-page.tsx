"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { HeroTrace } from "./hero-trace";
import { Releve } from "./releve";
import { AudiencePicker } from "./audience-picker";
import { BeforeAfter } from "./before-after";
import { WhyUs } from "./why-us";
import { PhotoBand } from "./photo-slot";
import { useSiteActions } from "./site-frame";
import { steps } from "@/lib/steps";
import { plans } from "@/lib/offers";

/*
 * Home page. One case runs through it: the invoice of the hero is followed
 * step by step in "Le relevé", then the firm that checks it, the comparison,
 * the ways to start and the questions. Density varies on purpose: full-width
 * bands, text columns and tables drawn with hairlines; only what reacts
 * (profile picker, the story, the before/after slider) sits in a card.
 */

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
    a: "Une démonstration interactive avec des données d’exemple, des outils gratuits (calculateur express, vérificateur MACF, diagnostic) et une checklist adaptée à votre activité. Les missions sont menées dès maintenant par nos consultants avec la méthode SPS-CARBON ; l’accès à la plateforme ouvre sur invitation, dans le cadre du programme pilote 2026.",
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
      <HeroTrace />

      <section className="band" id="pourquoi" aria-labelledby="why-title">
        <div className="wrap band-split">
          <h2 className="band-title" id="why-title">
            Les raisons de mesurer arrivent rarement seules
          </h2>
          <AudiencePicker />
        </div>
      </section>

      <Releve />

      <WhyUs />

      <PhotoBand ids={["terrain", "revue"]} label="Nos consultants sur le terrain" />

      <section className="band is-tint" id="comparaison" aria-labelledby="compare-title">
        <div className="wrap">
          <h2 className="band-title" id="compare-title">
            Un bilan que vous pouvez défendre, pas seulement un total
          </h2>
          <BeforeAfter />
          <div className="compare-wrap">
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

      <section className="band" id="offres" aria-labelledby="offers-title">
        <div className="wrap">
          <h2 className="band-title" id="offers-title">
            Trois façons de commencer, chacune chiffrée après un cadrage
          </h2>
          <div className="offer-cols">
            {plans.map((offer) => (
              <article key={offer.id} className="offer-col">
                <p className="offer-scope">{offer.scope}</p>
                <h3 className="offer-name">{offer.name}</h3>
                <p className="offer-for">{offer.forWho}</p>
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
          <p className="offers-note">
            Le prix dépend de vos sites, de vos données et des livrables attendus.{" "}
            <Link href="/offres" className="link">
              Comparer les offres et composer votre périmètre
            </Link>
          </p>

          <div className="tools-strip" id="outils" aria-labelledby="tools-title">
            <h3 id="tools-title" className="tools-strip-title">
              Ou commencez gratuitement, sans inscription
            </h3>
            <ul>
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

      <section className="band is-rule" id="deroulement" aria-labelledby="process-title">
        <div className="wrap">
          <h2 className="band-title" id="process-title">
            À chaque étape, vous savez ce que vous apportez et ce que vous recevez
          </h2>
          <ol className="steps">
            {steps.map((step, n) => (
              <li key={step.title}>
                <span className="steps-n" aria-hidden="true">
                  {n + 1}
                </span>
                <h3>{step.title}</h3>
                <dl className="steps-io">
                  <div>
                    <dt>Vous apportez</dt>
                    <dd>{step.give}</dd>
                  </div>
                  <div>
                    <dt>Vous recevez</dt>
                    <dd>{step.get}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ol>
          <div className="section-cta">
            <button type="button" className="btn" onClick={openChecklist}>
              Créer ma checklist de données
            </button>
            <span className="t-meta">La liste des documents à réunir, selon votre activité.</span>
          </div>
        </div>
      </section>

      <section className="band is-rule faq-chapter" aria-labelledby="faq-title">
        <div className="wrap faq-grid">
          <div className="faq-side">
            <h2 className="band-title" id="faq-title">
              Les questions qu’on nous pose avant de commencer
            </h2>
            <div className="faq-ask">
              <p className="faq-ask-title">Une autre question ?</p>
              <p>Posez-la directement à l’équipe : périmètre, données, MACF ou calendrier.</p>
              <Link href="/contact" className="btn btn-small">
                Poser ma question
              </Link>
            </div>
          </div>
          <div className="faq">
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
