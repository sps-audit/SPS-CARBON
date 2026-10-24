"use client";

import { ProductPreview } from "./product-preview";
import { Diagnostic } from "./diagnostic";
import { ScopeRings } from "./scope-rings";
import { SectorExplorer } from "./sector-explorer";
import { useSiteActions } from "./site-frame";
import { steps } from "@/lib/steps";

/*
 * Each inner page opens with something to try or look at before the reading:
 * the demo for the platform, the diagnostic for the solutions, the scopes for
 * the method, the way of working for the firm, the checklist for the resources.
 */
export function PageShowcase({ slug }: { slug: string }) {
  const { openChecklist } = useSiteActions();

  if (slug === "plateforme")
    return (
      <section className="chapter t-deep page-showcase" id="demonstration" aria-labelledby="showcase-title">
        <div className="wrap">
          <div className="chapter-head">
            <h2 id="showcase-title" className="d-l" data-reveal="mask">
              Voyez-la fonctionner.
            </h2>
            <p className="lead" data-reveal>
              Une entreprise fictive, des facteurs illustratifs : changez de source, parcourez les mois et ouvrez le détail d’un
              calcul. La suite de la page explique chaque principe.
            </p>
          </div>
          <div data-reveal="rise">
            <ProductPreview />
          </div>
        </div>
      </section>
    );

  if (slug === "solutions")
    return (
      <section className="chapter t-ice page-showcase" id="diagnostic" aria-labelledby="showcase-title">
        <div className="wrap grid diag-layout">
          <div className="diag-head">
            <h2 id="showcase-title" className="d-l" data-reveal="mask">
              Quel parcours pour vous ?
            </h2>
            <p className="lead" data-reveal>
              Cinq questions, une minute : votre point de départ et les données à préparer. Les trois parcours sont détaillés
              juste après.
            </p>
          </div>
          <div className="diag-wrap" data-reveal="rise">
            <Diagnostic />
          </div>
        </div>
      </section>
    );

  if (slug === "methodologie")
    return (
      <section className="chapter t-dark scopes-chapter page-showcase" id="trois-scopes" aria-labelledby="showcase-title">
        <div className="wrap">
          <div className="chapter-head">
            <h2 id="showcase-title" className="d-l" data-reveal="mask">
              Tout part des trois scopes.
            </h2>
            <p className="lead" data-reveal>
              Le GHG Protocol range chaque émission dans un scope. Explorez-les : c’est la base du périmètre que la méthode
              construit ensuite, étape par étape.
            </p>
          </div>
          <ScopeRings />
        </div>
      </section>
    );

  if (slug === "cabinet")
    return (
      <section className="chapter t-ice page-showcase" id="parcours" aria-labelledby="showcase-title">
        <div className="wrap">
          <div className="chapter-head">
            <h2 id="showcase-title" className="d-l" data-reveal="mask">
              Travailler avec nous.
            </h2>
            <p className="lead" data-reveal>
              Du premier échange au suivi annuel, vous savez à chaque étape ce que nous attendons de vous et ce que vous recevez.
            </p>
          </div>
          <ol className="process" data-reveal="process">
            {steps.map((step, n) => (
              <li key={step.title} style={{ ["--i" as string]: n }}>
                <span className="process-n">{n + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    );

  if (slug === "ressources")
    return (
      <section className="chapter t-dark page-showcase" id="checklist" aria-labelledby="showcase-title">
        <div className="wrap">
          <div className="chapter-head">
            <h2 id="showcase-title" className="d-l" data-reveal="mask">
              Préparez vos données.
            </h2>
            <p className="lead" data-reveal>
              Choisissez votre secteur pour voir d’où viennent, en général, ses émissions. Puis créez la checklist des données à
              réunir, à télécharger ou imprimer.
            </p>
          </div>
          <SectorExplorer />
          <div className="showcase-cta" data-reveal>
            <p>La liste des données à réunir, selon votre activité.</p>
            <button type="button" className="btn btn-mint" onClick={openChecklist}>
              Créer ma checklist
            </button>
          </div>
        </div>
      </section>
    );

  return null;
}
