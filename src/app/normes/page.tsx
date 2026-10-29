import type { Metadata } from "next";
import Link from "next/link";
import { Focus } from "@/components/focus";
import { PageHead } from "@/components/page-head";
import { NormsExplorer } from "@/components/norms-explorer";
import { RegTimeline } from "@/components/reg-timeline";
import { shareMetadata } from "@/lib/share";

const title = "Normes carbone | SPS-CARBON";
const description =
  "GHG Protocol, ISO 14064, ISO 14067, ISO 14083, MACF, CSRD, SBTi, ISO 14068-1 : quelle norme carbone sert à quoi, laquelle vous concerne et ce que SPS-CARBON fait avec chacune.";

export const metadata: Metadata = { title, description, ...shareMetadata(title, description) };

const commitments = [
  {
    title: "Deux cadres de calcul",
    text: "SPS-CARBON calcule selon le GHG Protocol et l’ISO 14064-1, les références les plus demandées par les clients, les banques et les vérificateurs.",
  },
  {
    title: "Un dossier prêt pour la vérification",
    text: "Sources, facteurs d’émission, versions et hypothèses sont tracés : un vérificateur peut remonter de chaque tonne à sa preuve.",
  },
  {
    title: "Aucun faux label",
    text: "Se référer à une norme ne vaut pas certification. Quand une vérification est nécessaire, elle est confiée à un organisme indépendant accrédité.",
  },
];

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

export default function NormesPage() {
  return (
    <main id="main" className="page">
      <PageHead
        crumb="Normes carbone"
        title="Les normes carbone, expliquées simplement."
        lead="GHG Protocol, ISO 14064, ISO 14067, MACF, CSRD… Quelle norme sert à quoi, laquelle vous concerne, et ce que SPS-CARBON fait avec chacune."
        instrument="normes"
      />

      <section className="chapter s-tint" id="carte" aria-labelledby="norms-title">
        <div className="wrap">
          <Head
            id="norms-title"
            title="Quelle norme pour quelle question ?"
            lead="Choisissez votre situation : les normes qui vous concernent ressortent. Sélectionnez une norme pour l’essentiel en trois points."
          />
          <div data-reveal="rise">
            <NormsExplorer />
          </div>
        </div>
      </section>

      <section className="chapter" id="echeances" aria-labelledby="timeline-title">
        <div className="wrap">
          <Head
            id="timeline-title"
            title="Les échéances à retenir."
            lead="Le reporting ESG au Maroc et le MACF en Europe avancent en parallèle. Voici où nous en sommes, et ce qui arrive."
          />
          <RegTimeline />
        </div>
      </section>

      <section className="chapter s-tint" id="engagement" aria-labelledby="commit-title">
        <div className="wrap trust-grid">
          <div className="head">
            <Focus className="t-h2" id="commit-title">
              Des chiffres conformes, et honnêtes.
            </Focus>
            <p className="t-lead" data-reveal="rise">
              Une norme n’a de valeur que si son application est rigoureuse et expliquée. Voici ce que nous nous imposons.
            </p>
          </div>
          <dl className="spec" data-reveal="stagger">
            {commitments.map((item) => (
              <div key={item.title}>
                <dt>{item.title}</dt>
                <dd>{item.text}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="wrap">
          <div className="norm-cta" data-reveal="rise">
            <div>
              <p className="norm-cta-title">Une norme vous est demandée ?</p>
              <p>Dites-nous laquelle et par qui : nous vous aidons à définir le bon périmètre.</p>
            </div>
            <div className="norm-cta-actions">
              <Link className="btn" href="/contact">
                Parlons de votre projet
              </Link>
              <Link className="link" href="/outils#diagnostic">
                Faire le diagnostic express
              </Link>
            </div>
          </div>
          <p className="norm-note">
            Textes à jour en octobre 2026. Les règles évoluent : le cadre applicable est vérifié lors du cadrage de chaque mission.
          </p>
        </div>
      </section>
    </main>
  );
}
