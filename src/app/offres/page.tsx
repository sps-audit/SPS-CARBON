import type { Metadata } from "next";
import Link from "next/link";
import { Focus } from "@/components/focus";
import { OfferBuilder } from "@/components/offer-builder";
import { PageHead } from "@/components/page-head";
import { PlanCompare } from "@/components/plan-compare";
import { comparisonGroups, options, plans, priceDrivers, type Cell } from "@/lib/offers";
import { shareMetadata } from "@/lib/share";

const title = "Offres | SPS-CARBON";
const description =
  "Bilan essentiel (Scopes 1 et 2), bilan complet (Scopes 1, 2 et 3) ou accompagnement MACF : comparez les formules SPS-CARBON, ajoutez des options et composez votre périmètre.";

export const metadata: Metadata = { title, description, ...shareMetadata(title, description, "offres") };

const faq = [
  {
    q: "Pourquoi les prix ne sont-ils pas affichés ?",
    a: "Deux entreprises de même taille peuvent avoir des besoins très différents : un site ou dix, des factures réunies ou à rechercher, un rapport interne ou un dossier pour un client européen. Après le cadrage, vous recevez une proposition chiffrée qui détaille chaque élément.",
  },
  {
    q: "Peut-on commencer par les Scopes 1 et 2, puis élargir ?",
    a: "Oui. Le bilan essentiel pose une base solide. Le Scope 3 s’ajoute ensuite catégorie par catégorie, en reprenant le même périmètre et les mêmes données.",
  },
  {
    q: "Le MACF demande-t-il un bilan complet de l’entreprise ?",
    a: "Non. Le MACF porte sur les émissions intrinsèques des marchandises concernées, calculées à l’échelle de l’installation et du produit. C’est un travail distinct de l’inventaire de l’organisation, même si les deux partagent une partie des données.",
  },
  {
    q: "Combien de temps dure une mission ?",
    a: "Cela dépend surtout de la disponibilité des données et du nombre de sites. Le calendrier est fixé lors du cadrage, avec les étapes et les personnes à mobiliser de votre côté.",
  },
  {
    q: "Les résultats sont-ils certifiés ?",
    a: "La traçabilité facilite la revue mais ne constitue pas une certification. Une vérification indépendante nécessite un organisme et une mission distincts. L’option « Préparation à la vérification » organise le dossier pour cet organisme.",
  },
  {
    q: "Que se passe-t-il après le premier bilan ?",
    a: "Les actions prioritaires sont suivies avec leurs responsables. La mise à jour annuelle reprend le même périmètre pour mesurer le chemin parcouru et expliquer les écarts d’une année sur l’autre.",
  },
];

function Mark({ cell }: { cell: Cell }) {
  if (cell === true)
    return (
      <span className="pt-yes">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m5 12 4 4L19 6" />
        </svg>
        <span className="sr-only">Inclus</span>
      </span>
    );
  if (cell === false)
    return (
      <span className="pt-no">
        <span aria-hidden="true" />
        <span className="sr-only">Non inclus</span>
      </span>
    );
  return <span className="pt-note">{cell}</span>;
}

function Head({ id, title, lead }: { id: string; title: string; lead: string }) {
  return (
    <div className="head is-split">
      <Focus className="t-h2" id={id}>
        {title}
      </Focus>
      <p className="t-lead" data-reveal="rise">
        {lead}
      </p>
    </div>
  );
}

export default function OffresPage() {
  return (
    <main id="main" className="page">
      <PageHead
        crumb="Offres"
        title="Trouvez la formule qui vous convient."
        lead="Trois formules, des options selon votre besoin, et une proposition chiffrée après un cadrage clair. Comparez, composez votre périmètre, puis envoyez votre demande."
        instrument="offres"
      >
        <div className="page-head-actions">
          <Link className="btn" href="#composer">
            Composer mon périmètre
          </Link>
          <Link className="link" href="#comparer">
            Comparer les formules
          </Link>
        </div>
      </PageHead>

      <section className="chapter s-tint" id="formules" aria-labelledby="plans-title">
        <div className="wrap">
          <Head
            id="plans-title"
            title="Trois formules."
            lead="Chaque mission démarre par un cadrage. Le prix dépend de vos sites, de vos données et des livrables attendus."
          />
          <div className="offer-cards" data-reveal="stagger">
            {plans.map((plan) => (
              <article key={plan.id} className={`offer-card spot ${plan.featured ? "is-featured" : ""}`}>
                <div className="offer-top">
                  <span className="offer-scope">{plan.scope}</span>
                  {plan.badge && <span className="offer-badge">{plan.badge}</span>}
                </div>
                <h3 className="t-h3">{plan.name}</h3>
                <p className="offer-for">{plan.forWho}</p>
                <p>{plan.text}</p>
                <ul className="check-list">
                  {plan.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div className="offer-actions">
                  <Link href={`/contact?sujet=${plan.subject}`} className={`btn btn-small ${plan.featured ? "" : "btn-quiet"}`}>
                    Choisir cette formule
                  </Link>
                  <Link href={plan.href} className="link" aria-label={`En savoir plus : ${plan.name}`}>
                    En savoir plus
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="chapter" id="comparer" aria-labelledby="compare-plans-title">
        <div className="wrap">
          <Head
            id="compare-plans-title"
            title="Comparer les formules."
            lead="Ce que chaque formule mesure, la méthode appliquée, les documents que vous recevez et l’accompagnement prévu."
          />
          <PlanCompare names={plans.map((plan) => plan.name)} featured={Math.max(0, plans.findIndex((plan) => plan.featured))}>
          <div className="plan-table-wrap" data-reveal="rise">
            <table className="plan-table">
              <caption className="sr-only">Comparaison des trois formules SPS-CARBON</caption>
              <thead>
                <tr>
                  <td />
                  {plans.map((plan) => (
                    <th scope="col" key={plan.id} className={plan.featured ? "is-featured" : ""}>
                      <strong>{plan.name}</strong>
                      <small>{plan.scope}</small>
                    </th>
                  ))}
                </tr>
              </thead>
              {comparisonGroups.map((group) => (
                <tbody key={group.title}>
                  <tr className="pt-group">
                    <th scope="colgroup" colSpan={4}>
                      <span>{group.title}</span>
                    </th>
                  </tr>
                  {group.rows.map((row) => (
                    <tr key={row.label}>
                      <th scope="row">{row.label}</th>
                      {row.cells.map((cell, n) => (
                        <td key={n} className={plans[n].featured ? "is-featured" : ""}>
                          <Mark cell={cell} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              ))}
              <tfoot>
                <tr>
                  <td />
                  {plans.map((plan) => (
                    <td key={plan.id} className={plan.featured ? "is-featured" : ""}>
                      <Link href={`/contact?sujet=${plan.subject}`} className="link">
                        Demander une proposition
                      </Link>
                    </td>
                  ))}
                </tr>
              </tfoot>
            </table>
          </div>
          </PlanCompare>
          <p className="plan-scroll-hint">Faites glisser le tableau pour voir les trois formules.</p>
        </div>
      </section>

      <section className="chapter s-tint" id="options" aria-labelledby="options-title">
        <div className="wrap">
          <Head id="options-title" title="Des options selon votre besoin." lead="À ajouter à n’importe quelle formule, au moment du cadrage ou plus tard." />
          <ul className="option-grid" data-reveal="stagger">
            {options.map((option) => (
              <li key={option.id}>
                <h3>{option.name}</h3>
                <p>{option.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="chapter" id="composer" aria-labelledby="builder-title">
        <div className="wrap">
          <Head
            id="builder-title"
            title="Composez votre périmètre."
            lead="Trois questions, quelques options : la formule adaptée s’affiche, avec une demande déjà rédigée pour notre équipe."
          />
          <div data-reveal="rise">
            <OfferBuilder />
          </div>
        </div>
      </section>

      <section className="chapter s-tint" id="prix" aria-labelledby="price-title">
        <div className="wrap trust-grid">
          <div className="head">
            <Focus className="t-h2" id="price-title">
              Comment est fixé le prix.
            </Focus>
            <p className="t-lead" data-reveal="rise">
              Quatre éléments déterminent la proposition. Vous la recevez après le cadrage, détaillée ligne par ligne. Aucun
              abonnement n’est vendu sur ce site.
            </p>
          </div>
          <dl className="spec" data-reveal="stagger">
            {priceDrivers.map((driver) => (
              <div key={driver.title}>
                <dt>{driver.title}</dt>
                <dd>{driver.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="chapter faq-chapter" aria-labelledby="offres-faq-title">
        <div className="wrap faq-grid">
          <div className="faq-side">
            <Focus className="t-h2" id="offres-faq-title">
              Questions sur les offres.
            </Focus>
            <div className="faq-ask" data-reveal="rise">
              <p className="faq-ask-title">Un besoin particulier ?</p>
              <p>Plusieurs filiales, un appel d’offres, une échéance proche : décrivez-le, nous adaptons le cadrage.</p>
              <Link href="/contact" className="btn btn-small">
                Décrire mon besoin
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
