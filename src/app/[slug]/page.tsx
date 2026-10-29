import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { editorialPages } from "@/lib/editorial";
import { legalPages } from "@/lib/legal";
import { EditorialIndex } from "@/components/editorial-index";
import { PageHead } from "@/components/page-head";
import type { InstrumentName } from "@/components/page-instruments";
import { PageShowcase } from "@/components/page-showcase";
import { CabinetEnd, CabinetShowcase } from "@/components/cabinet";
import { Trajectory } from "@/components/trajectory";
import { shareCards, shareMetadata, type ShareCard } from "@/lib/share";

type EditorialPageProps = {
  params: Promise<{ slug: string }>;
};

const pages = [...editorialPages, ...legalPages];
const legalSlugs = new Set(legalPages.map((page) => page.slug));

const instruments: Record<string, InstrumentName> = {
  plateforme: "plateforme",
  solutions: "solutions",
  methodologie: "methodologie",
  cabinet: "cabinet",
  ressources: "ressources",
};

const contactPrompts: Record<
  string,
  { title: string; description: string; label: string }
> = {
  plateforme: {
    title: "Partons de vos données et de vos usages.",
    description:
      "Présentez votre activité et les difficultés rencontrées dans votre collecte. Cet échange permet de préciser les besoins auxquels la démarche SPS-CARBON doit répondre.",
    label: "Présenter mon besoin",
  },
  solutions: {
    title: "Quel parcours correspond à votre entreprise ?",
    description:
      "Un premier échange permet de définir votre objectif, les sites concernés, les données disponibles et les livrables attendus avant de cadrer une mission.",
    label: "Discuter de mon projet",
  },
  methodologie: {
    title: "Construisons un périmètre qui a du sens.",
    description:
      "Votre organisation, votre activité et l’usage prévu des résultats déterminent la démarche. Décrivez votre contexte pour préparer un cadrage adapté.",
    label: "Préparer mon cadrage",
  },
  cabinet: {
    title: "Échangeons sur vos enjeux carbone.",
    description:
      "Une première mesure, une demande client ou une démarche QHSE et RSE à structurer : présentez votre besoin à SAFEPERFORM SOLUTIONS.",
    label: "Contacter le cabinet",
  },
  ressources: {
    title: "Votre préparation soulève des questions ?",
    description:
      "Les premières données permettent souvent de préciser les étapes suivantes. Partagez votre contexte et les points à clarifier pour organiser votre démarche.",
    label: "Échanger sur ma démarche",
  },
};

const sectionTitle = (title: string) =>
  title.replace(/^\d{2} · /, "").replace(" · ", " : ");

function findPage(slug: string) {
  const page = pages.find((candidate) => candidate.slug === slug);
  if (!page) notFound();
  return page;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return pages.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: EditorialPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = findPage(slug);
  const title = `${page.kicker} | SPS-CARBON`;

  return {
    title,
    description: page.description,
    ...shareMetadata(title, page.description, (shareCards as readonly string[]).includes(slug) ? (slug as ShareCard) : "accueil"),
  };
}

export default async function EditorialPage({ params }: EditorialPageProps) {
  const { slug } = await params;
  const page = findPage(slug);
  // The firm page ends with its own references, contacts and call (CabinetEnd).
  const contactPrompt = slug === "cabinet" ? undefined : contactPrompts[slug];
  const legal = legalSlugs.has(slug);
  const numbered = slug === "methodologie";
  const sections = page.sections.map((section) => ({
    ...section,
    title: sectionTitle(section.title),
  }));

  return (
    <main id="main" className={legal ? "page page-legal" : "page"}>
      <PageHead crumb={page.kicker} title={page.title} lead={page.description} instrument={legal ? undefined : instruments[slug]}>
        {slug === "plateforme" && (
          <div className="page-status">
            <i aria-hidden="true" />
            <p>
              <strong>Programme pilote 2026.</strong> Les missions sont menées dès aujourd’hui avec la méthode SPS-CARBON ;
              l’accès à la plateforme ouvre sur invitation, entreprise par entreprise.
            </p>
            <Link href="/inscription" className="btn btn-signal btn-small">
              Créer un espace entreprise
            </Link>
          </div>
        )}
      </PageHead>

      {slug === "cabinet" ? <CabinetShowcase /> : !legal && <PageShowcase slug={slug} />}

      <div className={`chapter page-body ${legal ? "" : "s-tint"}`}>
        <div className="wrap page-layout">
          <aside className="page-aside">
            <EditorialIndex sections={sections} numbered={numbered} />
          </aside>

          <article className="page-article" aria-label={page.kicker}>
            {sections.map((section, index) => (
              <section className="page-section" id={section.id} key={section.id} aria-labelledby={`${section.id}-title`} data-reveal="rise">
                {numbered && (
                  <span className="page-step" aria-hidden="true">
                    Étape {index + 1}
                  </span>
                )}
                <h2 id={`${section.id}-title`}>{section.title}</h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.bullets && section.bullets.length > 0 && (
                  <ul className="dash-list">
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            {contactPrompt && (
              <section data-reveal="rise" className="page-callout s-night" aria-labelledby="page-contact-title">
                <Trajectory className="page-callout-line" />
                <h2 id="page-contact-title">{contactPrompt.title}</h2>
                <p>{contactPrompt.description}</p>
                <Link className="btn btn-signal" href="/contact">
                  {contactPrompt.label}
                </Link>
              </section>
            )}
          </article>
        </div>
      </div>
      {slug === "cabinet" && <CabinetEnd />}
    </main>
  );
}
