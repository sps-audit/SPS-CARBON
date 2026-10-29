import Link from "next/link";
import { Focus } from "./focus";
import { Trajectory } from "./trajectory";
import { company } from "@/lib/company";
import { cabinetContact, references, sectors, team, trades, values } from "@/lib/cabinet";

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

/* Activities, sectors, team and values: who the cabinet is, before the method. */
export function CabinetShowcase() {
  return (
    <>
      <section className="chapter" id="activites" aria-labelledby="cab-trades-title">
        <div className="wrap">
          <Head
            id="cab-trades-title"
            title="Former, accompagner, auditer."
            lead="Un organisme de formation et un cabinet de conseil, d’audit et d’accompagnement en systèmes de management : qualité, sécurité des denrées alimentaires, santé et sécurité au travail, environnement, développement durable, RSE et gestion de projets."
          />
          <div className="cab-trades" data-reveal="stagger">
            {trades.map((trade) => (
              <article key={trade.id} className="cab-trade" id={trade.id}>
                <h3>{trade.name}</h3>
                <p className="cab-trade-lead">{trade.lead}</p>
                <p>{trade.text}</p>
                <ul className="check-list">
                  {trade.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <p className="cab-note" data-reveal="rise">
            La formation, le conseil et l’audit se complètent : comprendre une exigence, l’appliquer avec les équipes, puis vérifier
            ce qui fonctionne.
          </p>
        </div>
      </section>

      <section className="chapter s-tint" id="secteurs" aria-labelledby="cab-sectors-title">
        <div className="wrap">
          <Head
            id="cab-sectors-title"
            title="Une approche adaptée à votre secteur."
            lead="Les contraintes et les priorités varient d’une activité à l’autre. SAFEPERFORM SOLUTIONS adapte ses interventions au contexte de l’entreprise, aux pratiques de ses équipes et aux exigences de son secteur."
          />
          <ul className="cab-sectors" data-reveal="stagger">
            {sectors.map((sector) => (
              <li key={sector}>{sector}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="chapter" id="equipe" aria-labelledby="cab-team-title">
        <div className="wrap">
          <Head
            id="cab-team-title"
            title="La direction et l’équipe."
            lead="Des consultants issus du terrain QHSE, qui forment, accompagnent et auditent eux-mêmes les missions du cabinet."
          />
          <div className="cab-team" data-reveal="stagger">
            {team.map((person) => (
              <article key={person.name} className="cab-person">
                <span className="cab-monogram" aria-hidden="true">
                  {person.initials}
                </span>
                <div>
                  <h3>{person.name}</h3>
                  <p className="cab-role">{person.role}</p>
                  <p>{person.text}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="cab-note">Les qualifications citées sont celles des personnes ; elles ne valent pas accréditation du cabinet.</p>
        </div>
      </section>

      <section className="chapter s-tint" id="valeurs" aria-labelledby="cab-values-title">
        <div className="wrap">
          <Head
            id="cab-values-title"
            title="Notre manière de travailler."
            lead="Une expertise accessible, une attention au terrain et une relation fondée sur la confiance."
          />
          <dl className="cab-values" data-reveal="stagger">
            {values.map((value) => (
              <div key={value.name}>
                <dt>{value.name}</dt>
                <dd>{value.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}

/* References, the two contacts and the closing call, after the method. */
export function CabinetEnd() {
  return (
    <section className="chapter" id="references" aria-labelledby="cab-refs-title">
      <div className="wrap cab-end">
        <div className="cab-refs" data-reveal="rise">
          <h2 id="cab-refs-title">Références affichées par le cabinet</h2>
          <ul>
            {references.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
          <p className="cab-note">
            Entreprises citées par SAFEPERFORM SOLUTIONS pour ses missions de formation, de conseil et d’audit. Elles ne sont pas
            présentées comme utilisatrices de SPS-CARBON.
          </p>
        </div>

        <div className="cab-contacts" data-reveal="stagger">
          <article>
            <h3>SAFEPERFORM SOLUTIONS</h3>
            <p className="cab-role">Formation, conseil, audit QHSE et RSE</p>
            <a href={cabinetContact.phoneHref}>{cabinetContact.phone}</a>
            <a href={`mailto:${cabinetContact.email}`}>{cabinetContact.email}</a>
            <p>{cabinetContact.hours}</p>
          </article>
          <article>
            <h3>SPS-CARBON</h3>
            <p className="cab-role">Comptabilité carbone et plateforme</p>
            <a href={`mailto:${company.email}`}>{company.email}</a>
            <address>{company.address}</address>
          </article>
        </div>

        <div className="page-callout s-night" data-reveal="rise">
          <Trajectory className="page-callout-line" />
          <h2>Échangeons sur les besoins de votre entreprise</h2>
          <p>
            Formation, audit, accompagnement QHSE, démarche RSE ou projet carbone : présentez votre contexte et vos priorités pour
            préparer un premier échange avec notre équipe.
          </p>
          <Link className="btn btn-signal" href="/contact">
            Contacter le cabinet
          </Link>
        </div>
      </div>
    </section>
  );
}
