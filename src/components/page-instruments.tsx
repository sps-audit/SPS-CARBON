import type { CSSProperties, ReactNode } from "react";
import { CoastMap } from "./coast-map";

/*
 * The instrument at the head of each inner page: a small glass screen that
 * shows, in the product's own vocabulary, what the page is about. Decorative
 * (aria-hidden): every fact it shows is also in the page text. Static HTML and
 * CSS; it is read by a scan line on arrival, then tilts a little with the
 * pointer (--px, --py from the motion layer). Example figures only.
 */

export type InstrumentName =
  | "plateforme"
  | "solutions"
  | "methodologie"
  | "cabinet"
  | "ressources"
  | "offres"
  | "outils"
  | "normes"
  | "contact";

const i = (n: number) => ({ ["--i" as string]: n }) as CSSProperties;

function Frame({ title, chip = "Exemple", children, className = "" }: { title: string; chip?: string; children: ReactNode; className?: string }) {
  return (
    <div className={`pi ${className}`} data-reveal="scan" style={{ ["--scan-delay" as string]: "200ms" }}>
      <div className="pi-bar">
        <span className="pi-dots">
          <i />
          <i />
          <i />
        </span>
        <span className="pi-title">{title}</span>
        {chip && <span className="demo-chip">{chip}</span>}
      </div>
      <div className="pi-body">{children}</div>
    </div>
  );
}

function Plateforme() {
  const rows = [
    ["Collecte guidée", "62 % reçu", "ok"],
    ["Contrôle qualité", "3 points", "check"],
    ["Calcul traçable", "5,51 t", "ok"],
    ["Tableau de bord", "2 910 t", "ok"],
    ["Plan de réduction", "−30 %", "ok"],
    ["Rapports et MACF", "Prêts", "ok"],
  ];
  return (
    <Frame title="Atelier Atlas, bilan 2025">
      <ol className="pi-flow">
        {rows.map(([name, value, tone], n) => (
          <li key={name} style={i(n)} className={`is-${tone}`}>
            <span>{name}</span>
            <strong>{value}</strong>
          </li>
        ))}
      </ol>
    </Frame>
  );
}

function Solutions() {
  const tracks = [
    { name: "Bilan essentiel", cover: [1, 2], note: "Opérations et énergie" },
    { name: "Bilan complet", cover: [1, 2, 3], note: "Toute la chaîne de valeur" },
    { name: "Accompagnement MACF", cover: [], note: "Données par produit exporté" },
  ];
  return (
    <Frame title="Trois parcours">
      <ul className="pi-tracks">
        {tracks.map((track, n) => (
          <li key={track.name} style={i(n)}>
            <p>
              <strong>{track.name}</strong>
              <span>{track.note}</span>
            </p>
            <div className="pi-scopes">
              {track.cover.length ? (
                [1, 2, 3].map((scope) => (
                  <i key={scope} className={track.cover.includes(scope) ? `is-on s${scope}` : ""}>
                    Scope {scope}
                  </i>
                ))
              ) : (
                <i className="is-on is-product">Produit, code NC</i>
              )}
            </div>
          </li>
        ))}
      </ul>
    </Frame>
  );
}

function Methodologie() {
  const steps = ["Définir le périmètre", "Identifier les sources", "Contrôler les données", "Choisir les facteurs", "Restituer", "Améliorer"];
  return (
    <Frame title="Chaîne de calcul">
      <ol className="pi-ladder">
        {steps.map((step, n) => (
          <li key={step} style={i(n)}>
            <span className="pi-tick" />
            {step}
          </li>
        ))}
      </ol>
      <p className="pi-eq">
        <span>Quantité</span>
        <b>×</b>
        <span>Facteur</span>
        <b>=</b>
        <strong>tCO₂e</strong>
      </p>
    </Frame>
  );
}

function Cabinet() {
  return (
    <Frame title="SAFEPERFORM SOLUTIONS" chip="" className="pi-map">
      <CoastMap mode="load" />
    </Frame>
  );
}

function Ressources() {
  const docs = ["Liste des sites", "Factures d’électricité", "Carburants et combustibles", "Registre des fluides", "Données de production", "Demande du client"];
  return (
    <Frame title="Préparer mon inventaire" chip="">
      <ul className="pi-checks">
        {docs.map((doc, n) => (
          <li key={doc} style={i(n)} className={n < 4 ? "is-done" : ""}>
            <span className="pi-box" />
            {doc}
          </li>
        ))}
      </ul>
      <p className="pi-progress">
        <span>
          <i />
        </span>
        4 sur 6 réunis
      </p>
    </Frame>
  );
}

function Offres() {
  const lines = [
    ["Formule", "Bilan complet"],
    ["Sites", "3"],
    ["Scopes", "1, 2 et 3"],
    ["Option", "Formation des équipes"],
  ];
  return (
    <Frame title="Votre périmètre">
      <dl className="pi-sheet">
        {lines.map(([k, value], n) => (
          <div key={k} style={i(n)}>
            <dt>{k}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
      <p className="pi-result">Proposition chiffrée après le cadrage</p>
    </Frame>
  );
}

function Outils() {
  const lines = [
    ["Électricité", "10 000 kWh", "0,551", "5,51 t"],
    ["Gasoil", "1 200 L", "2,68", "3,22 t"],
  ];
  return (
    <Frame title="Calculateur express">
      <ul className="pi-receipt">
        {lines.map(([source, quantity, factor, result], n) => (
          <li key={source} style={i(n)}>
            <span>{source}</span>
            <span>{quantity}</span>
            <b>×</b>
            <span>{factor}</span>
            <strong>{result}</strong>
          </li>
        ))}
      </ul>
      <p className="pi-total">
        <span>Total, Scopes 1 et 2</span>
        <strong className="readout">8,73 t</strong>
      </p>
    </Frame>
  );
}

function Normes() {
  const marks = [
    { year: "2019", text: "Rapport ESG des sociétés cotées", tag: "Maroc" },
    { year: "2023", text: "MACF, période transitoire", tag: "UE" },
    { year: "2026", text: "MACF, période définitive", tag: "UE" },
    { year: "2027", text: "Première déclaration annuelle", tag: "UE" },
    { year: "2030", text: "Horizon de la CDN", tag: "Maroc" },
  ];
  return (
    <Frame title="Repères" chip="">
      <ol className="pi-ruler">
        {marks.map((mark, n) => (
          <li key={mark.year} style={i(n)}>
            <strong>{mark.year}</strong>
            <span>{mark.text}</span>
            <em>{mark.tag}</em>
          </li>
        ))}
      </ol>
    </Frame>
  );
}

function Contact() {
  const steps = ["Votre besoin", "Vos informations", "Relecture"];
  return (
    <Frame title="Premier échange" chip="">
      <ol className="pi-steps">
        {steps.map((step, n) => (
          <li key={step} style={i(n)}>
            <span>{n + 1}</span>
            {step}
          </li>
        ))}
      </ol>
      <p className="pi-note">Le message est préparé ici, puis envoyé depuis votre messagerie.</p>
    </Frame>
  );
}

const instruments: Record<InstrumentName, () => ReactNode> = {
  plateforme: Plateforme,
  solutions: Solutions,
  methodologie: Methodologie,
  cabinet: Cabinet,
  ressources: Ressources,
  offres: Offres,
  outils: Outils,
  normes: Normes,
  contact: Contact,
};

export function PageInstrument({ name }: { name: InstrumentName }) {
  const Instrument = instruments[name];
  return (
    <div className="page-instrument" aria-hidden="true">
      <Instrument />
    </div>
  );
}
