"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import { company } from "@/lib/company";
import { canSend, deliver, mailDraft } from "@/lib/deliver";
import { useAuthTabs } from "./auth-shell";

/*
 * "Créer un espace entreprise": four short steps, then a review before
 * sending. During the pilot programme an account is opened by the team, so
 * this is a request: no password is set here, the invitation brings it.
 * The entries survive a reload for the session (sessionStorage), errors are
 * shown next to their field, and nothing is sent before the conditions of use
 * and the privacy policy have been accepted.
 */

const sectors = [
  "Industrie manufacturière",
  "Agroalimentaire",
  "BTP et matériaux",
  "Énergie et eau",
  "Transport et logistique",
  "Commerce et distribution",
  "Services",
  "Autre secteur",
];
const siteCounts = ["1 site", "2 à 5 sites", "6 à 20 sites", "Plus de 20 sites"];
const goals = [
  { value: "Réaliser un premier bilan carbone", text: "Scopes 1 et 2, puis la chaîne de valeur" },
  { value: "Répondre à un client ou à une banque", text: "Un questionnaire ou des chiffres à justifier" },
  { value: "Préparer le MACF / CBAM", text: "Les données produit pour un client européen" },
  { value: "Piloter un plan de réduction", text: "Des actions chiffrées et une trajectoire" },
];
const roles = ["Direction générale", "Responsable QHSE", "Responsable RSE", "Direction financière", "Direction industrielle", "Responsable énergie"];
const webmail = /@(gmail|googlemail|hotmail|outlook|live|yahoo|icloud|me|aol|proton|protonmail|gmx|menara)\./i;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const STORE = "sps-signup";

type Fields = {
  company: string;
  ice: string;
  sector: string;
  sites: string;
  city: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  goal: string;
  message: string;
  terms: boolean;
  privacy: boolean;
};

const empty: Fields = {
  company: "",
  ice: "",
  sector: "",
  sites: "",
  city: "",
  name: "",
  role: "",
  email: "",
  phone: "",
  goal: "",
  message: "",
  terms: false,
  privacy: false,
};

const steps = ["Entreprise", "Contact", "Démarche", "Vérification"];
type Errors = Partial<Record<keyof Fields, string>>;

function check(step: number, f: Fields): Errors {
  const e: Errors = {};
  if (step === 0) {
    if (!f.company.trim()) e.company = "Indiquez la raison sociale de l’entreprise.";
    if (f.ice.trim() && !/^\d{15}$/.test(f.ice.replace(/\s/g, ""))) e.ice = "L’ICE compte 15 chiffres.";
    if (!f.sector) e.sector = "Choisissez un secteur, même approximatif.";
    if (!f.sites) e.sites = "Indiquez le nombre de sites concernés.";
  }
  if (step === 1) {
    if (!f.name.trim()) e.name = "Indiquez votre prénom et votre nom.";
    if (!f.role.trim()) e.role = "Indiquez votre fonction.";
    if (!emailPattern.test(f.email.trim())) e.email = f.email.trim() ? "Vérifiez l’adresse : elle semble incomplète." : "Indiquez votre e-mail professionnel.";
  }
  if (step === 2) {
    if (!f.goal) e.goal = "Choisissez l’objectif principal de la démarche.";
  }
  if (step === 3) {
    if (!f.terms) e.terms = "Acceptez les conditions d’utilisation pour envoyer la demande.";
    if (!f.privacy) e.privacy = "Confirmez avoir pris connaissance de la politique de confidentialité.";
  }
  return e;
}

export function SignupForm() {
  const [f, setF] = useState<Fields>(empty);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"form" | "sending" | "sent" | "draft">("form");
  // The tabs belong to the first screen only, as before; later steps fold them away.
  useAuthTabs(step === 0 && (state === "form" || state === "sending"));
  const [copied, setCopied] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  const form = useRef<HTMLFormElement>(null);
  const trap = useRef<HTMLInputElement>(null);
  const restored = useRef(false);

  // Restore an unfinished request (this tab only), then keep it up to date.
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORE);
      if (saved) setF({ ...empty, ...JSON.parse(saved), terms: false, privacy: false });
    } catch {
      /* storage unavailable: the form simply starts empty */
    }
    restored.current = true;
  }, []);
  useEffect(() => {
    if (!restored.current || state === "sent") return;
    try {
      // Consents are never remembered: they are given at the moment of sending.
      sessionStorage.setItem(STORE, JSON.stringify({ ...f, terms: false, privacy: false }));
    } catch {
      /* ignore */
    }
  }, [f, state]);

  const set = <K extends keyof Fields>(key: K, value: Fields[K]) => {
    setF((current) => ({ ...current, [key]: value }));
    if (errors[key]) setErrors((current) => ({ ...current, [key]: undefined }));
  };

  function go(next: number) {
    setStep(next);
    setErrors({});
    requestAnimationFrame(() => heading.current?.focus({ preventScroll: true }));
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    heading.current?.closest(".auth-panel")?.scrollIntoView({ block: "start", behavior: still ? "auto" : "smooth" });
  }

  function showErrors(found: Errors) {
    setErrors(found);
    const first = Object.keys(found)[0];
    requestAnimationFrame(() => {
      const field = form.current?.querySelector<HTMLElement>(`[data-field="${first}"]`);
      field?.focus();
    });
  }

  const summary = [
    `Entreprise : ${f.company.trim()}`,
    ...(f.ice.trim() ? [`ICE : ${f.ice.replace(/\s/g, "")}`] : []),
    `Secteur : ${f.sector}`,
    `Sites : ${f.sites}`,
    ...(f.city.trim() ? [`Ville : ${f.city.trim()}`] : []),
    `Contact : ${f.name.trim()}, ${f.role.trim()}`,
    `E-mail : ${f.email.trim()}`,
    ...(f.phone.trim() ? [`Téléphone : ${f.phone.trim()}`] : []),
    `Objectif : ${f.goal}`,
    ...(f.message.trim() ? ["", f.message.trim()] : []),
    "",
    "Conditions d’utilisation acceptées et politique de confidentialité lue.",
  ].join("\n");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "sending") return;
    const found = check(step, f);
    if (Object.keys(found).length) return showErrors(found);
    if (step < 3) return go(step + 1);

    setState("sending");
    const sent = await deliver(
      `Demande d’espace entreprise : ${f.company.trim()}`,
      {
        name: f.name.trim(),
        email: f.email.trim(),
        Fonction: f.role.trim(),
        "Téléphone": f.phone.trim() || "Non indiqué",
        Entreprise: f.company.trim(),
        ICE: f.ice.replace(/\s/g, "") || "Non indiqué",
        Secteur: f.sector,
        Sites: f.sites,
        Ville: f.city.trim() || "Non indiquée",
        Objectif: f.goal,
        message: f.message.trim() || "Aucun message",
        Acceptation: "Conditions d’utilisation acceptées ; politique de confidentialité lue",
      },
      trap.current?.checked ?? false,
    );
    if (sent) {
      try {
        sessionStorage.removeItem(STORE);
      } catch {
        /* ignore */
      }
      setState("sent");
    } else {
      setState("draft");
    }
    requestAnimationFrame(() => heading.current?.focus());
  }

  const err = (key: keyof Fields) => (errors[key] ? { "aria-invalid": true, "aria-describedby": `su-${key}-error` } : {});
  const message = (key: keyof Fields) =>
    errors[key] ? (
      <p className="field-error" id={`su-${key}-error`}>
        {errors[key]}
      </p>
    ) : null;

  if (state === "sent" || state === "draft") {
    const sent = state === "sent";
    return (
      <section className="auth-panel" aria-labelledby="su-done">
        <h1 id="su-done" ref={heading} tabIndex={-1} className="auth-title">
          {sent ? `Merci, ${f.name.trim().split(" ")[0]}, votre demande est envoyée` : "Votre demande est prête"}
        </h1>
        <p className="auth-lead">
          {sent
            ? `Nous revenons vers vous à ${f.email.trim()} pour la suite de l’ouverture de l’espace ${f.company.trim()}.`
            : "L’envoi depuis cette page n’est pas disponible pour le moment. Votre demande est rédigée : envoyez-la depuis votre messagerie, elle arrive à la même équipe."}
        </p>
        {!sent && (
          <div className="auth-draft">
            <a className="btn" href={mailDraft(`Demande d’espace entreprise : ${f.company.trim()}`, summary)}>
              Ouvrir ma messagerie
            </a>
            <button
              type="button"
              className="link"
              onClick={() =>
                navigator.clipboard
                  ?.writeText(`À : ${company.email}\n\n${summary}`)
                  .then(() => setCopied("Demande copiée : collez-la dans un e-mail à " + company.email + "."))
                  .catch(() => setCopied("Copie indisponible : écrivez à " + company.email + "."))
              }
            >
              Copier la demande
            </button>
            <p className="auth-note" role="status">
              {copied}
            </p>
          </div>
        )}
        <ol className="auth-next">
          <li>
            <strong>Vérification</strong>
            <span>Notre équipe relit votre demande et vérifie l’entreprise.</span>
          </li>
          <li>
            <strong>Échange de cadrage</strong>
            <span>Un consultant fait le point avec vous : sites, données disponibles, échéances.</span>
          </li>
          <li>
            <strong>Invitation</strong>
            <span>Vous recevez le lien personnel de votre espace pilote et créez votre mot de passe.</span>
          </li>
        </ol>
        <div className="auth-alt">
          <Link href="/plateforme#demonstration" className="link">
            Essayer la démonstration
          </Link>
          <Link href="/outils" className="link">
            Outils gratuits
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="auth-panel" aria-labelledby="su-title">
      <h1 id="su-title" ref={heading} tabIndex={-1} className="auth-title">
        {["L’espace de votre entreprise", "Votre interlocuteur", "Votre démarche", "Vérification"][step]}
      </h1>
      <p className="auth-lead">
        {
          [
            "Quatre étapes, environ deux minutes. Pendant le pilote, chaque espace est ouvert par notre équipe après un échange.",
            "La personne qui recevra l’invitation et suivra la démarche avec nos consultants.",
            "Pour préparer le premier échange avec le bon consultant.",
            "Relisez votre demande. Vous pourrez la compléter lors de l’échange de cadrage.",
          ][step]
        }
      </p>

      <ol className="auth-steps" aria-label={`Étape ${step + 1} sur 4`}>
        {steps.map((label, n) => (
          <li key={label} className={n < step ? "is-done" : n === step ? "is-current" : ""} aria-current={n === step ? "step" : undefined}>
            <span>{label}</span>
          </li>
        ))}
      </ol>

      <form ref={form} className="auth-form" onSubmit={submit} noValidate key={step}>
        {step === 0 && (
          <>
            <Field id="company" label="Raison sociale" required message={message("company")}>
              <input id="su-company" data-field="company" autoComplete="organization" maxLength={160} value={f.company} onChange={(e) => set("company", e.target.value)} {...err("company")} />
            </Field>
            <div className="form-grid">
              <Field id="ice" label="ICE" hint="Facultatif, 15 chiffres" message={message("ice")}>
                <input id="su-ice" data-field="ice" inputMode="numeric" maxLength={19} value={f.ice} onChange={(e) => set("ice", e.target.value)} {...err("ice")} />
              </Field>
              <Field id="city" label="Ville" hint="Facultatif">
                <input id="su-city" data-field="city" autoComplete="address-level2" maxLength={80} value={f.city} onChange={(e) => set("city", e.target.value)} />
              </Field>
            </div>
            <Field id="sector" label="Secteur d’activité" required message={message("sector")}>
              <select id="su-sector" data-field="sector" value={f.sector} onChange={(e) => set("sector", e.target.value)} {...err("sector")}>
                <option value="">Choisir un secteur</option>
                {sectors.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </Field>
            <fieldset className="auth-choices is-row" {...(errors.sites ? { "aria-describedby": "su-sites-error" } : {})}>
              <legend>
                Sites concernés <span aria-hidden="true">*</span>
              </legend>
              {siteCounts.map((s, n) => (
                <label key={s} className={`auth-chip ${f.sites === s ? "is-on" : ""}`}>
                  <input type="radio" name="sites" value={s} checked={f.sites === s} onChange={() => set("sites", s)} data-field={n === 0 ? "sites" : undefined} />
                  {s}
                </label>
              ))}
              {message("sites")}
            </fieldset>
          </>
        )}

        {step === 1 && (
          <>
            <Field id="name" label="Prénom et nom" required message={message("name")}>
              <input id="su-name" data-field="name" autoComplete="name" maxLength={120} value={f.name} onChange={(e) => set("name", e.target.value)} {...err("name")} />
            </Field>
            <Field id="role" label="Fonction" required message={message("role")}>
              <input id="su-role" data-field="role" list="su-roles" autoComplete="organization-title" maxLength={120} value={f.role} onChange={(e) => set("role", e.target.value)} {...err("role")} />
              <datalist id="su-roles">
                {roles.map((r) => (
                  <option key={r} value={r} />
                ))}
              </datalist>
            </Field>
            <Field
              id="email"
              label="E-mail professionnel"
              required
              message={message("email")}
              hint={!errors.email && webmail.test(f.email) ? "Une adresse au nom de domaine de l’entreprise facilite la vérification." : undefined}
            >
              <input id="su-email" data-field="email" type="email" inputMode="email" autoComplete="email" autoCapitalize="none" spellCheck={false} maxLength={180} value={f.email} onChange={(e) => set("email", e.target.value)} {...err("email")} />
            </Field>
            <Field id="phone" label="Téléphone" hint="Facultatif, pour l’échange de cadrage">
              <input id="su-phone" data-field="phone" type="tel" inputMode="tel" autoComplete="tel" maxLength={40} value={f.phone} onChange={(e) => set("phone", e.target.value)} />
            </Field>
          </>
        )}

        {step === 2 && (
          <>
            <fieldset className="auth-choices" {...(errors.goal ? { "aria-describedby": "su-goal-error" } : {})}>
              <legend>
                Objectif principal <span aria-hidden="true">*</span>
              </legend>
              {goals.map((g, n) => (
                <label key={g.value} className={`auth-choice ${f.goal === g.value ? "is-on" : ""}`}>
                  <input type="radio" name="goal" value={g.value} checked={f.goal === g.value} onChange={() => set("goal", g.value)} data-field={n === 0 ? "goal" : undefined} />
                  <strong>{g.value}</strong>
                  <small>{g.text}</small>
                </label>
              ))}
              {message("goal")}
            </fieldset>
            <Field id="message" label="Précisions" hint="Facultatif : échéances, client qui vous sollicite, données déjà disponibles">
              <textarea id="su-message" data-field="message" rows={4} maxLength={2000} value={f.message} onChange={(e) => set("message", e.target.value)} />
            </Field>
          </>
        )}

        {step === 3 && (
          <>
            <dl className="auth-review">
              <Review label="Entreprise" onEdit={() => go(0)}>
                {f.company}
                {f.ice.trim() && <small>ICE {f.ice.replace(/\s/g, "")}</small>}
                <small>
                  {f.sector}, {f.sites.toLowerCase()}
                  {f.city.trim() && `, ${f.city.trim()}`}
                </small>
              </Review>
              <Review label="Contact" onEdit={() => go(1)}>
                {f.name}
                <small>{f.role}</small>
                <small>
                  {f.email}
                  {f.phone.trim() && `, ${f.phone.trim()}`}
                </small>
              </Review>
              <Review label="Démarche" onEdit={() => go(2)}>
                {f.goal}
                {f.message.trim() && <small className="auth-review-note">{f.message.trim()}</small>}
              </Review>
            </dl>

            <div className="auth-consents">
              <label className={`auth-consent ${errors.terms ? "is-error" : ""}`}>
                <input type="checkbox" data-field="terms" checked={f.terms} onChange={(e) => set("terms", e.target.checked)} {...err("terms")} />
                <span>
                  J’accepte les{" "}
                  <Link href="/conditions-utilisation" target="_blank" rel="noopener">
                    conditions d’utilisation
                  </Link>{" "}
                  de SPS-CARBON, au nom de l’entreprise que je représente.
                </span>
              </label>
              {message("terms")}
              <label className={`auth-consent ${errors.privacy ? "is-error" : ""}`}>
                <input type="checkbox" data-field="privacy" checked={f.privacy} onChange={(e) => set("privacy", e.target.checked)} {...err("privacy")} />
                <span>
                  J’ai pris connaissance de la{" "}
                  <Link href="/confidentialite" target="_blank" rel="noopener">
                    politique de confidentialité
                  </Link>{" "}
                  : mes informations servent à traiter cette demande, conformément à la loi n° 09-08.
                </span>
              </label>
              {message("privacy")}
            </div>
            {canSend && (
              <label className="form-trap" aria-hidden="true">
                Ne pas cocher
                <input ref={trap} type="checkbox" tabIndex={-1} autoComplete="off" />
              </label>
            )}
          </>
        )}

        <div className="auth-actions">
          {step > 0 && (
            <button type="button" className="btn btn-quiet" onClick={() => go(step - 1)}>
              Retour
            </button>
          )}
          <button className="btn auth-submit" type="submit" disabled={state === "sending"} aria-busy={state === "sending"}>
            {step < 3 ? "Continuer" : state === "sending" ? "Envoi en cours…" : canSend ? "Envoyer ma demande" : "Préparer ma demande"}
          </button>
        </div>
        <p className="auth-note">
          Déjà invité ? <Link href="/connexion">Se connecter</Link>. Vos informations restent sur cet appareil jusqu’à l’envoi.
        </p>
      </form>
    </section>
  );
}

function Field({ id, label, required, hint, message, children }: { id: string; label: string; required?: boolean; hint?: string; message?: ReactNode; children: ReactNode }) {
  return (
    <div className="form-field">
      <label htmlFor={`su-${id}`}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
        {hint && <small className="field-hint">{hint}</small>}
      </label>
      {children}
      {message}
    </div>
  );
}

function Review({ label, onEdit, children }: { label: string; onEdit: () => void; children: ReactNode }) {
  return (
    <div>
      <dt>{label}</dt>
      <dd>{children}</dd>
      <button type="button" className="link" onClick={onEdit} aria-label={`Modifier : ${label}`}>
        Modifier
      </button>
    </div>
  );
}
