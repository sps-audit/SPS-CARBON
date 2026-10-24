import type { Metadata } from "next";
import Link from "next/link";
import { PageMotif } from "@/components/motifs";
import { NormsExplorer } from "@/components/norms-explorer";
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

export default function NormesPage() {
  return (
    <main id="main" className="page">
      <header className="page-hero t-deep">
        <div className="wrap page-hero-grid">
          <div className="page-hero-copy">
            <nav className="crumbs" aria-label="Fil d’Ariane">
              <Link href="/">Accueil</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">Normes carbone</span>
            </nav>
            <h1 className="d-l page-title" data-reveal="mask">
              Les normes carbone, expliquées simplement.
            </h1>
            <p className="lead">
              GHG Protocol, ISO 14064, ISO 14067, MACF, CSRD… Quelle norme sert à quoi, laquelle vous concerne, et ce que
              SPS-CARBON fait avec chacune.
            </p>
          </div>
          <div className="page-hero-visual" aria-hidden="true">
            <PageMotif name="perimetres" />
          </div>
        </div>
      </header>

      <section className="chapter t-dark" id="carte" aria-labelledby="norms-title">
        <div className="wrap">
          <div className="chapter-head">
            <h2 id="norms-title" className="d-l" data-reveal="mask">
              Quelle norme pour quelle question ?
            </h2>
            <p className="lead" data-reveal>
              Choisissez votre situation : les normes qui vous concernent ressortent. Sélectionnez une norme pour l’essentiel en
              trois points.
            </p>
          </div>
          <NormsExplorer />
        </div>
      </section>

      <section className="chapter t-ice" id="engagement" aria-labelledby="commit-title">
        <div className="wrap">
          <div className="chapter-head">
            <h2 id="commit-title" className="d-l" data-reveal="mask">
              Des chiffres conformes, et honnêtes.
            </h2>
            <p className="lead" data-reveal>
              Une norme n’a de valeur que si son application est rigoureuse et expliquée. Voici ce que nous nous imposons.
            </p>
          </div>
          <ol className="norm-commit">
            {commitments.map((item, n) => (
              <li key={item.title} data-reveal="rule" style={{ ["--i" as string]: n }}>
                <span className="norm-commit-n" aria-hidden="true">
                  {n + 1}
                </span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ol>
          <div className="norm-cta" data-reveal>
            <div>
              <p className="norm-cta-title">Une norme vous est demandée ?</p>
              <p>Dites-nous laquelle et par qui : nous vous aidons à définir le bon périmètre.</p>
            </div>
            <div className="norm-cta-actions">
              <Link className="btn btn-dark" href="/contact">
                Parlons de votre projet
              </Link>
              <Link className="link" href="/#diagnostic">
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
