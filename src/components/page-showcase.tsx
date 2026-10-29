"use client";

import Link from "next/link";
import { ProductPreview } from "./product-preview";
import { FeatureTour } from "./feature-tour";
import { Deliverables } from "./deliverables";
import { Diagnostic } from "./diagnostic";
import { ScopeChain } from "./scope-chain";
import { SectorExplorer } from "./sector-explorer";
import { Focus } from "./focus";
import { useSiteActions } from "./site-frame";

/*
 * Each inner page opens with something to try or look at before the reading:
 * the demo for the platform, the diagnostic for the solutions, the scopes for
 * the method, the way of working for the firm, the checklist for the resources.
 */
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

export function PageShowcase({ slug }: { slug: string }) {
  const { openChecklist } = useSiteActions();

  if (slug === "plateforme")
    return (
      <>
        <section className="chapter page-showcase" id="demonstration" aria-labelledby="showcase-title">
          <div className="wrap">
            <Head
              id="showcase-title"
              title="Voyez-la fonctionner."
              lead="Une entreprise fictive, des facteurs illustratifs : changez de source, parcourez les mois et ouvrez le détail d’un calcul."
            />
            <div data-reveal="rise">
              <ProductPreview />
            </div>
          </div>
        </section>
        <section className="chapter s-tint" id="modules" aria-labelledby="modules-title">
          <div className="wrap">
            <Head
              id="modules-title"
              title="Six modules, un seul fil."
              lead="De la demande de données au dossier partagé : chaque module reprend ce que le précédent a produit, sans ressaisie."
            />
            <FeatureTour />
          </div>
        </section>
      </>
    );

  if (slug === "solutions")
    return (
      <>
        <section className="chapter page-showcase" id="diagnostic" aria-labelledby="showcase-title">
          <div className="wrap diag-layout">
            <Head
              id="showcase-title"
              split={false}
              title="Quel parcours pour vous ?"
              lead="Cinq questions, une minute : votre point de départ et les données à préparer. Les trois parcours sont détaillés juste après."
            />
            <div data-reveal="rise">
              <Diagnostic />
            </div>
          </div>
        </section>
        <section className="chapter s-tint" id="livrables" aria-labelledby="deliverables-title">
          <div className="wrap">
            <Head
              id="deliverables-title"
              title="Ce que vous recevez."
              lead="Des documents que votre direction lit, que vos clients comprennent et qu’un vérificateur peut relire."
            />
            <Deliverables />
            <div className="section-cta" data-reveal="rise">
              <Link href="/offres" className="btn">
                Comparer les offres
              </Link>
              <span className="t-meta">Ce que chaque formule inclut, et les options pour composer votre périmètre.</span>
            </div>
          </div>
        </section>
      </>
    );

  if (slug === "methodologie")
    return (
      <section className="chapter page-showcase" id="trois-scopes" aria-labelledby="showcase-title">
        <div className="wrap">
          <Head
            id="showcase-title"
            title="Tout part des trois scopes."
            lead="Le GHG Protocol range chaque émission dans un scope, selon sa relation avec votre organisation. Choisissez-en un : c’est la base du périmètre que la méthode construit ensuite."
          />
          <ScopeChain />
        </div>
      </section>
    );

  if (slug === "ressources")
    return (
      <section className="chapter page-showcase" id="checklist" aria-labelledby="showcase-title">
        <div className="wrap">
          <Head
            id="showcase-title"
            title="Préparez vos données."
            lead="Choisissez votre secteur pour voir d’où viennent, en général, ses émissions. Puis créez la checklist des données à réunir, à télécharger ou à imprimer."
          />
          <div data-reveal="rise">
            <SectorExplorer />
          </div>
          <div className="section-cta" data-reveal="rise">
            <button type="button" className="btn" onClick={openChecklist}>
              Créer ma checklist
            </button>
            <span className="t-meta">La liste des données à réunir, selon votre activité.</span>
          </div>
        </div>
      </section>
    );

  return null;
}
