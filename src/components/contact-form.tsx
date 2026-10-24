"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { company } from "@/lib/company";

const subjects = [
  "Préparer un premier inventaire carbone",
  "Explorer le Scope 3 et la chaîne de valeur",
  "Préciser un besoin MACF / CBAM",
  "Découvrir le projet de plateforme",
  "Échanger sur un autre besoin",
];

export function ContactForm() {
  const [fields, setFields] = useState({
    name: "",
    organisation: "",
    subject: subjects[0],
    message: "",
  });
  const [review, setReview] = useState(false);
  const [status, setStatus] = useState("");
  const reviewHeading = useRef<HTMLHeadingElement>(null);
  const nameInput = useRef<HTMLInputElement>(null);
  const messageInput = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (review) reviewHeading.current?.focus();
  }, [review]);

  // Context carried from the diagnostic express (?sujet=…&contexte=…), shown for review.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const subject = subjects[Number(params.get("sujet"))];
    const context = params.get("contexte");
    if (!subject && !context) return;
    setFields((current) => ({
      ...current,
      subject: subject ?? current.subject,
      message: context && !current.message ? `Contexte issu du diagnostic express :\n${context}\n\n` : current.message,
    }));
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
    setReview(true);
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
    setReview(false);
    setStatus("Vous pouvez modifier votre message avant de le préparer à nouveau.");
    requestAnimationFrame(() => nameInput.current?.focus());
  }

  return (
    <div className="contact-form">
      {!review ? (
        <form onSubmit={prepareMessage} aria-labelledby="contact-form-title">
          <p className="form-step">Étape 1 sur 2</p>
          <h2 id="contact-form-title">Préparons votre premier échange.</h2>
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
          <div className="form-field">
            <label htmlFor="contact-subject">Votre sujet *</label>
            <select
              id="contact-subject"
              name="subject"
              required
              value={fields.subject}
              onChange={(event) =>
                setFields({ ...fields, subject: event.target.value })
              }
            >
              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
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
          <button className="btn btn-dark" type="submit">
            Préparer mon message
          </button>
        </form>
      ) : (
        <section className="draft-review" aria-labelledby="contact-review-title">
          <p className="form-step">Étape 2 sur 2</p>
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
            <a className="btn btn-dark" href={mailto}>
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
