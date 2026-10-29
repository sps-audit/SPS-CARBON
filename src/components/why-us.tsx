"use client";

import Link from "next/link";
import { CoastMap } from "./coast-map";
import { Focus } from "./focus";

/*
 * "Pourquoi SPS-CARBON" (home page): the three differences the firm stands
 * on, each shown with a fragment of the real work rather than an icon card.
 * Everything shown here is a fact about the firm or an explicitly labelled
 * example; no client, figure or certification is invented.
 */

const review = [
  { label: "Facture d’électricité, mars", value: "10 000 kWh", state: "Pièce jointe", tone: "ok" },
  { label: "Écart avec février", value: "+38 %", state: "À justifier", tone: "check" },
  { label: "Gazole, flotte de livraison", value: "4 200 L", state: "Contrôlé", tone: "ok" },
] as const;

const clauses = [
  { n: "4.1", name: "Contexte de l’organisme", text: "Le changement climatique est-il un enjeu pertinent ? Votre bilan y répond, chiffres à l’appui." },
  { n: "6.1", name: "Risques et opportunités", text: "Sources significatives, exposition au MACF, attentes de vos clients." },
  { n: "9.1", name: "Surveillance et mesure", text: "Des indicateurs carbone suivis par site, comparables d’une année à l’autre." },
  { n: "9.3", name: "Revue de direction", text: "Résultats, trajectoire et plan d’action, prêts à présenter." },
];

const anchors = [
  { k: "El Jadida", v: "Le siège du cabinet et de son équipe" },
  { k: "Loi 09-08", v: "Vos données personnelles protégées selon le droit marocain" },
  { k: "MACF", v: "Les données que vos clients européens vous demandent" },
];

export function WhyUs() {
  return (
    <section className="chapter why-chapter" id="pourquoi-nous" aria-labelledby="whyus-title">
      <div className="wrap">
        <div className="head is-split">
          <Focus className="t-h2" id="whyus-title">
            Pourquoi SPS-CARBON, et pas un autre.
          </Focus>
          <p className="t-lead" data-reveal="rise">
            Un logiciel vous donne un total. SPS-CARBON vous donne un bilan, le cabinet qui le défend avec vous, et une
            équipe qui connaît le terrain marocain.
          </p>
        </div>

        <div className="why-rows">
          <article className="why-row" data-reveal="rise">
            <div className="why-copy">
              <h3 className="t-h3">Un cabinet d’audit derrière chaque chiffre.</h3>
              <p>
                SPS-CARBON est porté par SAFEPERFORM SOLUTIONS, cabinet d’audit, de conseil et de formation en QHSE et RSE.
                Nos consultants relisent vos données comme ils mènent un audit : une preuve pour chaque ligne, un écart
                justifié avant d’être calculé, des recommandations hiérarchisées.
              </p>
              <Link href="/cabinet" className="link">
                Découvrir le cabinet
              </Link>
            </div>
            <figure className="why-ui" data-ui>
              <figcaption className="why-ui-head">
                <span>Revue du consultant</span>
                <span className="why-ui-note">Exemple, données fictives</span>
              </figcaption>
              <ul className="why-review">
                {review.map((row) => (
                  <li key={row.label} className={`is-${row.tone}`}>
                    <span className="why-review-label">{row.label}</span>
                    <span className="why-review-value">{row.value}</span>
                    <span className="why-review-state">{row.state}</span>
                  </li>
                ))}
              </ul>
              <p className="why-review-comment">
                <strong>Consultant SPS</strong>
                Justification demandée au service maintenance : arrêt d’un compresseur en février. Écart accepté, pièce
                ajoutée au dossier.
              </p>
            </figure>
          </article>

          <article className="why-row is-flip" data-reveal="rise">
            <div className="why-copy">
              <h3 className="t-h3">Votre carbone, dans vos systèmes ISO.</h3>
              <p>
                Depuis l’amendement de 2024, l’ISO 9001, l’ISO 14001 et l’ISO 45001 demandent si le changement climatique est
                un enjeu pertinent pour vous. Nos livrables se rangent dans les chapitres que vos équipes QHSE connaissent
                déjà, jusqu’à la revue de direction.
              </p>
              <Link href="/methodologie" className="link">
                Voir la méthode
              </Link>
            </div>
            <figure className="why-ui" data-ui>
              <figcaption className="why-ui-head">
                <span>Structure commune ISO 9001, 14001 et 45001</span>
              </figcaption>
              <ol className="why-clauses">
                {clauses.map((c) => (
                  <li key={c.n}>
                    <span className="why-clause-n">§ {c.n}</span>
                    <span className="why-clause-name">{c.name}</span>
                    <span className="why-clause-text">{c.text}</span>
                  </li>
                ))}
              </ol>
            </figure>
          </article>

          <article className="why-row" data-reveal="rise">
            <div className="why-copy">
              <h3 className="t-h3">Une équipe ancrée au Maroc.</h3>
              <p>
                Le cabinet est implanté à El Jadida. Nous travaillons en français, avec vos factures, vos sites et vos
                contraintes : le droit marocain des données, les exportations vers l’Union européenne, les questionnaires
                de vos donneurs d’ordre.
              </p>
              <dl className="why-anchors">
                {anchors.map((a) => (
                  <div key={a.k}>
                    <dt>{a.k}</dt>
                    <dd>{a.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="why-map">
              <CoastMap />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
