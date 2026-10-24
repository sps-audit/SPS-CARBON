import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { PageMotif } from "@/components/motifs";
import { company } from "@/lib/company";
import { shareMetadata } from "@/lib/share";

const title = "Parlons de votre projet | SPS-CARBON";
const description =
  "Contactez SAFEPERFORM SOLUTIONS à El Jadida pour échanger sur votre inventaire carbone, vos données et vos objectifs QHSE et RSE.";

export const metadata: Metadata = { title, description, ...shareMetadata(title, description) };

export default function ContactPage() {
  return (
    <main id="main" className="page">
      <header className="page-hero t-deep">
        <div className="wrap page-hero-grid">
          <div className="page-hero-copy">
            <nav className="crumbs" aria-label="Fil d’Ariane">
              <Link href="/">Accueil</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">Contact</span>
            </nav>
            <h1 className="d-l page-title" data-reveal="mask">Votre démarche commence par une conversation.</h1>
            <p className="lead">
              Un premier inventaire, une demande client ou des données à structurer : parlons de votre activité et des
              décisions que vous souhaitez éclairer.
            </p>
          </div>
          <div className="page-hero-visual" aria-hidden="true">
            <PageMotif name="conversation" />
          </div>
        </div>
      </header>

      <div className="page-body t-ice">
        <div className="wrap contact-layout">
          <aside className="contact-info" aria-labelledby="contact-info-title">
            <h2 id="contact-info-title">SAFEPERFORM SOLUTIONS</h2>
            <p>{company.activity}.</p>
            <p>
              Nous commençons par votre contexte : les sites concernés, les données disponibles et le résultat attendu. Cet
              échange permet de préciser le périmètre d’un accompagnement.
            </p>
            <a className="contact-mail" href={`mailto:${company.email}`}>
              {company.email}
            </a>
            <address>{company.address}</address>
            <h3>Pour préparer notre échange</h3>
            <ul className="hex-list">
              <li>Votre secteur d’activité et les sites concernés.</li>
              <li>L’objectif de la démarche et son destinataire.</li>
              <li>La période étudiée et les éventuelles échéances.</li>
              <li>Les données déjà disponibles dans votre entreprise.</li>
            </ul>
            <p className="form-notice">
              Quelques lignes suffisent pour ce premier contact. Les justificatifs et les informations détaillées pourront
              être précisés lors du cadrage.
            </p>
          </aside>
          <ContactForm />
        </div>
      </div>
    </main>
  );
}
