"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useSiteActions } from "./site-frame";

/*
 * Diagnostic express: five questions, one recommendation and the data to prepare.
 * Nothing is sent or stored; the answers can be carried into the contact draft.
 */

const questions = [
  { id: "sector", legend: "Quel est votre secteur ?", options: ["Industrie", "Agroalimentaire", "Transport et logistique", "Commerce et distribution", "Services et hôtellerie"] },
  {
    id: "export",
    legend: "Exportez-vous vers l’UE du ciment, de l’acier, de l’aluminium, des engrais, de l’hydrogène ou de l’électricité ?",
    options: ["Oui", "Non", "Je ne sais pas"],
  },
  { id: "request", legend: "Un client, une banque ou un partenaire vous demande-t-il vos émissions ?", options: ["Oui", "Pas encore"] },
  { id: "history", legend: "Avez-vous déjà réalisé un bilan carbone ?", options: ["Jamais", "En partie", "Oui, à mettre à jour"] },
  { id: "sites", legend: "Combien de sites faut-il couvrir ?", options: ["Un seul", "2 à 5", "Plus de 5"] },
] as const;

type Answers = Partial<Record<(typeof questions)[number]["id"], string>>;

const prepare: Record<string, string[]> = {
  Industrie: ["Factures d’électricité par site", "Combustibles des fours et chaudières", "Quantités produites et matières premières"],
  Agroalimentaire: ["Électricité et vapeur de transformation", "Registres des installations de froid", "Achats de matières agricoles et emballages"],
  "Transport et logistique": ["Litres de carburant par véhicule", "Électricité des entrepôts", "Volumes confiés aux sous-traitants"],
  "Commerce et distribution": ["Électricité des magasins et entrepôts", "Registres du froid commercial", "Achats de produits et livraisons"],
  "Services et hôtellerie": ["Électricité, gaz et climatisation", "Achats et équipements", "Déplacements professionnels"],
};

function recommend(answers: Answers) {
  if (answers.export === "Oui")
    return {
      offer: "Accompagnement MACF",
      href: "/solutions#cbam",
      subject: 2,
      why: "Vos produits peuvent relever du MACF : votre client européen aura besoin de données de production précises pour ses déclarations.",
    };
  if (answers.history === "Oui, à mettre à jour" || (answers.history === "En partie" && answers.request === "Oui"))
    return {
      offer: "Bilan complet, Scopes 1, 2 et 3",
      href: "/solutions#chaine-de-valeur",
      subject: 1,
      why: "Vous avez une base : l’étape suivante est d’élargir à la chaîne de valeur et de prioriser les actions.",
    };
  return {
    offer: "Bilan essentiel, Scopes 1 et 2",
    href: "/solutions#inventaire-essentiel",
    subject: 0,
    why:
      answers.request === "Oui"
        ? "Une demande est déjà là : commençons par un premier bilan solide de vos opérations et de votre énergie."
        : "Le bon point de départ : mesurer vos opérations et votre énergie, avec une méthode documentée.",
  };
}

export function Diagnostic() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [direction, setDirection] = useState(1);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const { openChecklist } = useSiteActions();
  const done = step >= questions.length;
  const question = questions[Math.min(step, questions.length - 1)];
  const result = done ? recommend(answers) : null;

  function choose(value: string) {
    setAnswers({ ...answers, [question.id]: value });
    setDirection(1);
    window.setTimeout(() => {
      setStep((current) => current + 1);
      requestAnimationFrame(() => titleRef.current?.focus({ preventScroll: true }));
    }, 180);
  }
  function back() {
    setDirection(-1);
    setStep((current) => Math.max(0, current - 1));
  }
  function restart() {
    setAnswers({});
    setDirection(-1);
    setStep(0);
  }

  const context = [
    answers.sector && `Secteur : ${answers.sector}`,
    answers.sites && `Sites : ${answers.sites}`,
    answers.export && `Export UE (MACF) : ${answers.export}`,
    answers.request && `Demande externe : ${answers.request}`,
    answers.history && `Bilan existant : ${answers.history}`,
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <div className="diag" data-step={step}>
      <div className="diag-progress" aria-hidden="true">
        {questions.map((item, index) => (
          <span key={item.id} className={index < step ? "is-done" : index === step ? "is-current" : ""} />
        ))}
      </div>
      <p className="diag-count" aria-live="polite">
        {done ? "Votre recommandation" : `Question ${step + 1} sur ${questions.length}`}
      </p>

      {!done ? (
        <fieldset className="diag-card" key={step} style={{ ["--dir" as string]: direction }}>
          <legend>
            <h3 ref={titleRef} tabIndex={-1}>
              {question.legend}
            </h3>
          </legend>
          <div className="diag-options">
            {question.options.map((option, index) => (
              <button
                key={option}
                type="button"
                className={answers[question.id] === option ? "is-picked" : ""}
                onClick={() => choose(option)}
                style={{ ["--i" as string]: index }}
                aria-pressed={answers[question.id] === option}
              >
                <span className="diag-key" aria-hidden="true">
                  {String.fromCharCode(65 + index)}
                </span>
                {option}
              </button>
            ))}
          </div>
          {step > 0 && (
            <button type="button" className="diag-back" onClick={back}>
              Question précédente
            </button>
          )}
        </fieldset>
      ) : (
        result && (
          <div className="diag-result" key="result">
            <div className="diag-result-main">
              <span className="diag-badge">Point de départ conseillé</span>
              <h3 ref={titleRef} tabIndex={-1}>
                {result.offer}
              </h3>
              <p>{result.why}</p>
              {answers.export === "Je ne sais pas" && (
                <p className="diag-note">
                  À vérifier ensemble : le MACF dépend du code douanier de vos produits. Nous pouvons le confirmer lors du premier
                  échange.
                </p>
              )}
              {answers.sites === "Plus de 5" && (
                <p className="diag-note">Avec plus de cinq sites, la collecte guidée par contributeur fera gagner beaucoup de temps.</p>
              )}
            </div>
            <div className="diag-result-side">
              <p className="diag-label">À préparer en priorité</p>
              <ul className="dash-list">
                {(prepare[answers.sector ?? "Industrie"] ?? prepare.Industrie).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="diag-actions">
              <Link
                className="btn btn-signal"
                href={`/contact?sujet=${result.subject}&contexte=${encodeURIComponent(context)}`}
              >
                Recevoir une proposition de cadrage
              </Link>
              <button type="button" className="btn btn-quiet" onClick={openChecklist}>
                Créer ma checklist complète
              </button>
              <Link href={result.href} className="link">
                Voir le détail de l’offre
              </Link>
              <button type="button" className="diag-back" onClick={restart}>
                Recommencer
              </button>
            </div>
            <p className="diag-privacy">Vos réponses restent dans cette page. Rien n’est envoyé ni enregistré.</p>
          </div>
        )
      )}
    </div>
  );
}
