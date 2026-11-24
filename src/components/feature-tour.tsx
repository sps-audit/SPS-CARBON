"use client";

import { useEffect, useRef, useState } from "react";

const modules = [
  {
    name: "Collecte guidée",
    title: "Chaque contributeur sait quoi fournir.",
    text: "La plateforme transforme votre périmètre en demandes précises : quelle donnée, pour quel site, quelle période, quel justificatif. Vous suivez ce qui est reçu, en attente ou manquant.",
  },
  {
    name: "Contrôle qualité",
    title: "Les anomalies remontent avant le calcul.",
    text: "Doublons de période, unités incompatibles, mois absents, hausses inhabituelles : les points à vérifier sont signalés et chaque correction est expliquée. Un mois manquant ne devient jamais un zéro.",
  },
  {
    name: "Calcul traçable",
    title: "Chaque tonne remonte à sa facture.",
    text: "Quantité, unité, facteur d’émission, source, version, hypothèse : le chemin du calcul reste ouvert. Vos équipes, vos clients ou un vérificateur peuvent le relire.",
  },
  {
    name: "Tableau de bord",
    title: "Scopes 1, 2 et 3 en un coup d’œil.",
    text: "Vos émissions par scope, par site et par source, avec la part estimée et ce qui reste à examiner. La direction voit l’essentiel, l’expert garde le détail.",
  },
  {
    name: "Plan de réduction",
    title: "Des priorités, pas seulement un total.",
    text: "Les postes les plus lourds deviennent des actions : responsable, échéance, effet attendu. Les années suivantes, vous mesurez le chemin parcouru.",
  },
  {
    name: "Rapports et MACF",
    title: "Un dossier prêt à partager.",
    text: "Rapport de bilan, annexe méthodologique, réponses aux questionnaires de vos clients et, pour les exportateurs concernés, les données de production utiles au MACF / CBAM.",
  },
];

function Screen({ index }: { index: number }) {
  switch (index) {
    case 0:
      return (
        <div className="ui ui-collect">
          <div className="ui-head">Collecte guidée <span>Conserverie Atlas</span></div>
          {[
            ["Chaudière vapeur, fioul lourd", "Suivi mensuel", "Reçu", "ok"],
            ["Propane, ligne de cuisson", "Donnée annuelle", "Reçu", "ok"],
            ["Camions frigorifiques", "Suivi mensuel", "Mois manquant", "wait"],
            ["Groupe électrogène", "Facture", "Justificatif attendu", "miss"],
            ["Chariots élévateurs diesel", "Donnée annuelle", "À préciser", "wait"],
          ].map(([label, period, status, tone], i) => (
            <div className="ui-row" key={label} style={{ ["--i" as string]: i }}>
              <span>{label}</span>
              <small>{period}</small>
              <em className={`tag ${tone}`}>{status}</em>
            </div>
          ))}
          <div className="ui-progress"><span style={{ width: "54%" }} /></div>
          <small className="ui-foot">Collecte : 54 % des données reçues, 14 sur 26</small>
        </div>
      );
    case 1:
      return (
        <div className="ui ui-quality">
          <div className="ui-head">Contrôles avant calcul <span>3 points</span></div>
          {[
            ["Mois manquant", "Camions frigorifiques : décembre", "warn"],
            ["Qualité à préciser", "Chariots élévateurs diesel", "warn"],
            ["Écart avec 2024", "Eaux usées +32 %, à expliquer", "info"],
          ].map(([title, text, tone], i) => (
            <div className={`ui-alert ${tone}`} key={title} style={{ ["--i" as string]: i }}>
              <strong>{title}</strong>
              <span>{text}</span>
              <button tabIndex={-1}>Vérifier</button>
            </div>
          ))}
          <small className="ui-foot">Chaque correction garde sa justification</small>
        </div>
      );
    case 2:
      return (
        <div className="ui ui-calc">
          <div className="ui-head">Fer blanc pour boîtes <span>2025</span></div>
          <div className="ui-equation">
            <div><strong>1 450</strong><small>tonnes achetées</small></div>
            <b>×</b>
            <div><strong>3,19</strong><small>tCO₂e par tonne</small></div>
            <b>=</b>
            <div className="ui-result"><strong>4 626</strong><small>tCO₂e, Scope 3</small></div>
          </div>
          <div className="ui-trace">
            <span>Source du facteur</span><strong>FM6E v17, acier neuf importé</strong>
            <span>Pièce</span><strong>Export comptable des achats 2025</strong>
          </div>
        </div>
      );
    case 3:
      return (
        <div className="ui ui-dash">
          <div className="ui-head">Bilan 2025 <span>Conserverie Atlas</span></div>
          <div className="ui-dash-total"><strong>9 146</strong><small>tCO₂e</small></div>
          {[
            ["Scope 1", 14, "1 288 t"],
            ["Scope 2", 22, "2 008 t"],
            ["Scope 3", 64, "5 850 t"],
          ].map(([name, share, value], i) => (
            <div className="ui-bar" key={name as string} style={{ ["--i" as string]: i }}>
              <span>{name}</span>
              <div><i style={{ width: `${share}%` }} /></div>
              <strong>{value}</strong>
            </div>
          ))}
          <small className="ui-foot">Incertitude ± 7,6 %, fiabilité bonne (4,2 sur 5)</small>
        </div>
      );
    case 4:
      return (
        <div className="ui ui-plan">
          <div className="ui-head">Plan de réduction <span>Objectif −30 % en 2030</span></div>
          {[
            ["Variateurs sur les compresseurs", "Maintenance", "En cours", "wait"],
            ["Chaudière : du fioul lourd au gaz naturel", "Direction technique", "Planifié", "info"],
            ["Optimiser les tournées de livraison", "Logistique", "Réalisé", "ok"],
          ].map(([action, owner, status, tone], i) => (
            <div className="ui-row" key={action} style={{ ["--i" as string]: i }}>
              <span>{action}</span>
              <small>{owner}</small>
              <em className={`tag ${tone}`}>{status}</em>
            </div>
          ))}
          <svg viewBox="0 0 300 70" className="ui-trajectory" preserveAspectRatio="none">
            <path className="base" d="M0 18 L300 18" />
            <path className="goal" d="M0 18 C 100 22, 180 40, 300 56" />
          </svg>
          <small className="ui-foot">Trajectoire définie avec la direction</small>
        </div>
      );
    default:
      return (
        <div className="ui ui-report">
          <div className="ui-doc">
            <span className="ui-doc-title">Rapport de bilan carbone 2025</span>
            {["Synthèse pour la direction", "Périmètre et méthode", "Résultats par scope", "Limites et estimations", "Plan de réduction"].map(
              (item, i) => (
                <span className="ui-doc-line" key={item} style={{ ["--i" as string]: i }}>
                  {item}
                </span>
              ),
            )}
          </div>
          <div className="ui-exports">
            <em>PDF</em>
            <em>Excel</em>
            <em>Fiche produit MACF</em>
          </div>
        </div>
      );
  }
}

export function FeatureTour() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index));
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((item) => item && observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="tour">
      <ol className="tour-steps">
        {modules.map((module, index) => (
          <li
            key={module.name}
            data-index={index}
            ref={(element) => {
              refs.current[index] = element;
            }}
            className={active === index ? "is-active" : ""}
          >
            <span className="tour-name">{module.name}</span>
            <h3>{module.title}</h3>
            <p>{module.text}</p>
            <div className="tour-inline" aria-hidden="true">
              <Screen index={index} />
            </div>
          </li>
        ))}
      </ol>
      <div className="tour-sticky" aria-hidden="true">
        <div className="tour-screen">
          <div className="tour-tabs">
            {modules.map((module, index) => (
              <span key={module.name} className={active === index ? "is-active" : ""}>
                {module.name}
              </span>
            ))}
          </div>
          <div className="tour-stage" key={active}>
            <Screen index={active} />
          </div>
        </div>
      </div>
    </div>
  );
}
