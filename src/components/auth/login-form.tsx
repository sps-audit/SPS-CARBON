"use client";

import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { company } from "@/lib/company";
import { Icon } from "../icons";
import { AuthTabs } from "./auth-tabs";

/*
 * Sign-in, e-mail first: the address is asked before anything else, so no
 * password is ever typed into this site. When the client application is
 * open (company.appUrl) the visitor is sent to it; until then the page says
 * plainly that client spaces open by invitation, and offers the next steps.
 */

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [stage, setStage] = useState<"email" | "going" | "pilot">("email");
  const input = useRef<HTMLInputElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = email.trim();
    if (!emailPattern.test(value)) {
      setError(value ? "Vérifiez l’adresse : elle semble incomplète." : "Indiquez l’adresse e-mail de votre espace.");
      input.current?.focus();
      return;
    }
    setError("");
    if (company.appUrl) {
      setStage("going");
      window.location.assign(company.appUrl);
      return;
    }
    setStage("pilot");
    requestAnimationFrame(() => heading.current?.focus());
  }

  if (stage === "pilot") {
    return (
      <section className="auth-panel" aria-labelledby="pilot-title">
        <AuthTabs active="connexion" />
        <h1 id="pilot-title" ref={heading} tabIndex={-1} className="auth-title">
          Votre espace s’ouvre sur invitation.
        </h1>
        <p className="auth-lead">
          Pendant le programme pilote, chaque espace entreprise est ouvert par notre équipe, après un échange de cadrage.
          L’invitation arrive par e-mail avec un lien personnel : c’est lui qui vous connecte.
        </p>
        <ul className="auth-paths">
          <li>
            <Link href="/inscription" className="auth-path">
              <Icon name="building" />
              <span>
                <strong>Créer un espace entreprise</strong>
                <small>Présentez votre entreprise, nous ouvrons votre espace pilote.</small>
              </span>
            </Link>
          </li>
          <li>
            <a href={`mailto:${company.email}?subject=${encodeURIComponent("[SPS-CARBON] Invitation à mon espace")}`} className="auth-path">
              <Icon name="signin" />
              <span>
                <strong>J’attends mon invitation</strong>
                <small>Écrivez-nous depuis l’adresse prévue pour votre espace.</small>
              </span>
            </a>
          </li>
        </ul>
        <div className="auth-alt">
          <button type="button" className="link" onClick={() => setStage("email")}>
            Utiliser une autre adresse
          </button>
          <Link href="/plateforme#demonstration" className="link">
            Essayer la démonstration
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="auth-panel" aria-labelledby="login-title">
      <AuthTabs active="connexion" />
      <h1 id="login-title" className="auth-title">
        Connexion à votre espace
      </h1>
      <p className="auth-lead">Utilisez l’adresse e-mail de votre entreprise.</p>

      <form className="auth-form" onSubmit={submit} noValidate>
        <div className="form-field">
          <label htmlFor="login-email">Adresse e-mail professionnelle</label>
          <input
            id="login-email"
            ref={input}
            type="email"
            inputMode="email"
            autoComplete="username"
            autoCapitalize="none"
            spellCheck={false}
            placeholder="prenom.nom@entreprise.ma"
            value={email}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? "login-error" : undefined}
            onChange={(event) => setEmail(event.target.value)}
          />
          {error && (
            <p className="field-error" id="login-error">
              {error}
            </p>
          )}
        </div>
        <button className="btn auth-submit" type="submit" disabled={stage === "going"} aria-busy={stage === "going"}>
          {stage === "going" ? "Ouverture de votre espace…" : "Continuer"}
        </button>
      </form>

      <p className="auth-note">
        Programme pilote 2026 : les espaces entreprise sont ouverts par notre équipe, sur invitation.
      </p>
    </section>
  );
}
