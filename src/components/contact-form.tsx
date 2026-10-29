"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { company } from "@/lib/company";

// Indexes are used in links (?sujet=N): keep the order, append new subjects at the end.
const subjects = [
  "Préparer un premier inventaire carbone",
  "Explorer le Scope 3 et la chaîne de valeur",
  "Préciser un besoin MACF / CBAM",
  "Découvrir le projet de plateforme",
  "Échanger sur un autre besoin",
  "Répondre à un questionnaire carbone",
  "Proposer un partenariat",
];

// Step 1: the reason for the request, in the order a visitor thinks of it.
const reasons = [
  { subject: 0, title: "Réaliser mon premier bilan carbone", text: "Vos opérations et votre énergie, Scopes 1 et 2" },
  { subject: 5, title: "Répondre à un client ou à une banque", text: "Un questionnaire ou une demande d’émissions à traiter" },
  { subject: 1, title: "Élargir au Scope 3", text: "Achats, transport, déchets et fournisseurs" },
  { subject: 2, title: "Préparer le MACF / CBAM", text: "Les données produit pour votre client européen" },
  { subject: 3, title: "Découvrir la plateforme", text: "La démonstration et la feuille de route" },
  { subject: 6, title: "Proposer un partenariat", text: "Bureau d’études, expert-comptable, fédération…" },
  { subject: 4, title: "Un autre besoin", text: "Formation, système de management, question ponctuelle" },
];

const siteOptions = ["Un seul site", "2 à 5 sites", "Plus de 5 sites", "Je ne sais pas encore"];
const deadlineOptions = ["Moins de 3 mois", "3 à 6 mois", "Plus de 6 mois", "Pas d’échéance précise"];

export function ContactForm() {
  const [fields, setFields] = useState({
    name: "",
    organisation: "",
    subject: subjects[0],
    sites: "",
    deadline: "",
    message: "",
  });
  const [stage, setStage] = useState<"reason" | "details" | "review">("reason");
  const review = stage === "review";
  const reasonHeading = useRef<HTMLHeadingElement>(null);
  const detailsHeading = useRef<HTMLHeadingElement>(null);
  const skipFocus = useRef(true);
  const [status, setStatus] = useState("");
  const reviewHeading = useRef<HTMLHeadingElement>(null);
  const nameInput = useRef<HTMLInputElement>(null);
  const messageInput = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // No focus move on arrival (first render, or a reason carried in the link).
    if (skipFocus.current) {
      skipFocus.current = false;
      return;
    }
    if (stage === "review") reviewHeading.current?.focus();
    if (stage === "details") detailsHeading.current?.focus();
    if (stage === "reason") reasonHeading.current?.focus();
  }, [stage]);

  // Context carried from the diagnostic express (?sujet=…&contexte=…), shown for review.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const raw = params.get("sujet");
    const subject = raw !== null && raw !== "" ? subjects[Number(raw)] : undefined;
    const context = params.get("contexte");
    const sites = params.get("sites");
    if (!subject && !context) return;
    setFields((current) => ({
      ...current,
      subject: subject ?? current.subject,
      sites: sites && siteOptions.includes(sites) ? sites : current.sites,
      message: context && !current.message ? `Contexte transmis depuis le site :\n${context}\n\n` : current.message,
    }));
    // The reason is already known: go straight to the details.
    if (subject) {
      skipFocus.current = true;
      setStage("details");
    }
  }, []);

  const body = [
    "Bonjour,",
    "",
    fields.message.trim(),
    "",
    `Nom : ${fields.name.trim()}`,
    ...(fields.organisation.trim()
      ? [`Entreprise : ${fields.organisation.trim()}`]
      : []),
    ...(fields.sites ? [`Sites concernés : ${fields.sites}`] : []),
    ...(fields.deadline ? [`Échéance : ${fields.deadline}`] : []),
    "",
    "Cordialement,",
    fields.name.trim(),
  ].join("\n");
  const mailto = `mailto:${company.email}?subject=${encodeURIComponent(
    `[SPS-CARBON] ${fields.subject}`,
  )}&body=${encodeURIComponent(body)}`;

  function prepareMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!fields.name.trim() || !fields.message.trim()) {
      setStatus("Indiquez votre nom et quelques mots sur votre besoin.");
      if (!fields.name.trim()) nameInput.current?.focus();
      else messageInput.current?.focus();
      return;
    }
    setStage("review");
    setStatus("Votre brouillon est prêt à être relu. Aucun message n’a été envoyé.");
  }

  async function copyMessage() {
    try {
      await navigator.clipboard.writeText(
        `À : ${company.email}\nObjet : ${fields.subject}\n\n${body}`,
      );
      setStatus("Le brouillon a été copié. Vous pouvez le coller dans votre messagerie.");
    } catch {
      setStatus(
        "La copie automatique est indisponible. Sélectionnez le texte du brouillon ci-dessous, puis copiez-le dans votre messagerie.",
      );
    }
  }

  function editMessage() {
    setStage("details");
    setStatus("Vous pouvez modifier votre message avant de le préparer à nouveau.");
    requestAnimationFrame(() => nameInput.current?.focus());
  }

  const currentReason = reasons.find((reason) => subjects[reason.subject] === fields.subject);

  return (
    <div className="contact-form">
      <ol className="form-progress" aria-hidden="true">
        {["Votre besoin", "Vos informations", "Relecture"].map((label, n) => {
          const at = ["reason", "details", "review"].indexOf(stage);
          return (
            <li key={label} className={n < at ? "is-done" : n === at ? "is-current" : ""}>
              <span>{n + 1}</span>
              {label}
            </li>
          );
        })}
      </ol>
      {stage === "reason" ? (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setStage("details");
          }}
          aria-labelledby="contact-reason-title"
        >
          <p className="form-step">Étape 1 sur 3</p>
          <h2 id="contact-reason-title" ref={reasonHeading} tabIndex={-1}>
            Quelle est la raison de votre demande ?
          </h2>
          <fieldset className="reason-grid">
            <legend className="sr-only">Raison de votre demande</legend>
            {reasons.map((reason) => {
              const on = fields.subject === subjects[reason.subject];
              return (
                <label key={reason.subject} className={`reason ${on ? "is-on" : ""}`}>
                  <input
                    type="radio"
                    name="reason"
                    checked={on}
                    onChange={() => setFields({ ...fields, subject: subjects[reason.subject] })}
                  />
                  <strong>{reason.title}</strong>
                  <small>{reason.text}</small>
                </label>
              );
            })}
          </fieldset>
          <button className="btn" type="submit">
            Continuer
          </button>
        </form>
      ) : !review ? (
        <form onSubmit={prepareMessage} aria-labelledby="contact-form-title">
          <p className="form-step">Étape 2 sur 3</p>
          <h2 id="contact-form-title" ref={detailsHeading} tabIndex={-1}>
            Préparons votre premier échange.
          </h2>
          <p className="form-reason">
            <span>
              Votre besoin : <strong>{currentReason?.title ?? fields.subject}</strong>
            </span>
            <button type="button" className="link" onClick={() => setStage("reason")}>
              Modifier
            </button>
          </p>
          <p>
            Décrivez votre activité, votre objectif et les éventuelles échéances.
            Les champs marqués d’un astérisque sont obligatoires.
          </p>
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="contact-name">Votre nom *</label>
              <input
                id="contact-name"
                name="name"
                autoComplete="name"
                required
                maxLength={120}
                ref={nameInput}
                value={fields.name}
                onChange={(event) =>
                  setFields({ ...fields, name: event.target.value })
                }
                placeholder="Prénom et nom"
              />
            </div>
            <div className="form-field">
              <label htmlFor="contact-organisation">Votre entreprise</label>
              <input
                id="contact-organisation"
                name="organisation"
                autoComplete="organization"
                maxLength={180}
                value={fields.organisation}
                onChange={(event) =>
                  setFields({ ...fields, organisation: event.target.value })
                }
                placeholder="Facultatif"
              />
            </div>
          </div>
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="contact-sites">Sites concernés</label>
              <select
                id="contact-sites"
                name="sites"
                value={fields.sites}
                onChange={(event) => setFields({ ...fields, sites: event.target.value })}
              >
                <option value="">Facultatif</option>
                {siteOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-field">
              <label htmlFor="contact-deadline">Échéance</label>
              <select
                id="contact-deadline"
                name="deadline"
                value={fields.deadline}
                onChange={(event) => setFields({ ...fields, deadline: event.target.value })}
              >
                <option value="">Facultatif</option>
                {deadlineOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-field">
            <label htmlFor="contact-message">Votre message *</label>
            <textarea
              id="contact-message"
              name="message"
              required
              maxLength={4000}
              rows={7}
              ref={messageInput}
              value={fields.message}
              onChange={(event) =>
                setFields({ ...fields, message: event.target.value })
              }
              placeholder="Votre activité, les sites concernés, le résultat recherché…"
              aria-describedby="contact-privacy"
            />
          </div>
          <p className="form-notice" id="contact-privacy">
            Ce formulaire prépare un brouillon dans cette page. Aucune donnée
            n’est envoyée automatiquement ni enregistrée par ce formulaire.
            Après relecture, vous pourrez ouvrir votre messagerie et choisir
            d’envoyer le message. Consultez notre{" "}
            <Link href="/confidentialite">politique de confidentialité</Link>.
          </p>
          <button className="btn" type="submit">
            Préparer mon message
          </button>
        </form>
      ) : (
        <section className="draft-review" aria-labelledby="contact-review-title">
          <p className="form-step">Étape 3 sur 3</p>
          <h2 id="contact-review-title" ref={reviewHeading} tabIndex={-1}>
            Votre message, prêt à être relu.
          </h2>
          <p>
            Vérifiez le brouillon, puis ouvrez votre application de messagerie.
            Vous y gardez la main sur l’envoi et pouvez encore modifier le contenu.
          </p>
          <dl className="draft-meta">
            <div>
              <dt>Destinataire</dt>
              <dd>{company.email}</dd>
            </div>
            <div>
              <dt>Objet</dt>
              <dd>[SPS-CARBON] {fields.subject}</dd>
            </div>
          </dl>
          <pre className="draft-body" tabIndex={0} aria-label="Brouillon du message">
            {body}
          </pre>
          <div className="draft-actions">
            <a className="btn" href={mailto}>
              Ouvrir ma messagerie
            </a>
            <button className="link" type="button" onClick={copyMessage}>
              Copier le brouillon
            </button>
            <button className="link" type="button" onClick={editMessage}>
              Modifier mon message
            </button>
          </div>
          <p className="form-notice">
            Si aucune messagerie ne s’ouvre, copiez le brouillon et adressez-le à{" "}
            <a href={`mailto:${company.email}`}>{company.email}</a>. Aucun message
            n’est envoyé depuis ce site.
          </p>
        </section>
      )}
      <p className="form-notice" role="status" aria-live="polite" aria-atomic="true">
        {status}
      </p>
    </div>
  );
}
