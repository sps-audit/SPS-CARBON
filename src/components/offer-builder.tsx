"use client";

import { useState } from "react";
import Link from "next/link";
import { options, plans, type PlanId } from "@/lib/offers";

/*
 * Compose your scope: three questions and a few options give the formula that
 * fits and a request already written for the contact form. Nothing is sent.
 */

const goals = [
  { id: "first", label: "Mesurer mes émissions pour la première fois" },
  { id: "client", label: "Répondre à un client ou à une banque" },
  { id: "export", label: "Exporter vers l’UE des produits concernés par le MACF" },
  { id: "reduce", label: "Réduire mes émissions et suivre mes progrès" },
] as const;

const siteCounts = ["Un seul site", "2 à 5 sites", "Plus de 5 sites"] as const;
const chainAnswers = ["Oui, toute la chaîne de valeur", "Non, mes opérations d’abord", "Je ne sais pas encore"] as const;

type Goal = (typeof goals)[number]["id"];

function pick(goal: Goal | null, chain: string | null): PlanId {
  if (goal === "export") return "macf";
  if (chain === chainAnswers[0]) return "complet";
  if (chain === chainAnswers[1]) return "essentiel";
  // Undecided: client requests and reduction plans usually reach the value chain.
  return goal === "client" || goal === "reduce" ? "complet" : "essentiel";
}

export function OfferBuilder() {
  const [goal, setGoal] = useState<Goal | null>(null);
  const [sites, setSites] = useState<string | null>(null);
  const [chain, setChain] = useState<string | null>(null);
  const [extras, setExtras] = useState<string[]>([]);

  const ready = goal !== null && sites !== null && (goal === "export" || chain !== null);
  const plan = plans.find((p) => p.id === pick(goal, chain))!;
  const chosen = options.filter((o) => extras.includes(o.id));
  const suggested =
    sites && sites !== siteCounts[0] && !extras.includes("sites") ? options.find((o) => o.id === "sites") : undefined;

  const context = [
    `Formule envisagée : ${plan.name} (${plan.scope})`,
    goal && `Objectif : ${goals.find((g) => g.id === goal)!.label}`,
    sites && `Périmètre : ${sites}`,
    goal !== "export" && chain && `Chaîne de valeur : ${chain}`,
    chosen.length > 0 && `Options : ${chosen.map((o) => o.name).join(", ")}`,
  ]
    .filter(Boolean)
    .join("\n");

  // A client request keeps its own subject in the contact form; otherwise the formula's.
  const subject = goal === "client" ? 5 : plan.subject;
  const href = `/contact?sujet=${subject}${sites ? `&sites=${encodeURIComponent(sites)}` : ""}&contexte=${encodeURIComponent(context)}`;

  const toggle = (id: string) => setExtras((list) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id]));

  return (
    <div className="builder">
      <form className="builder-form" onSubmit={(event) => event.preventDefault()} aria-label="Composer votre périmètre">
        <fieldset className="builder-q">
          <legend>
            <span className="builder-n" aria-hidden="true">1</span>
            Quel est votre objectif principal ?
          </legend>
          <div className="builder-choices">
            {goals.map((g) => (
              <label key={g.id} className={`choice ${goal === g.id ? "is-on" : ""}`}>
                <input type="radio" name="goal" checked={goal === g.id} onChange={() => setGoal(g.id)} />
                <span>{g.label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="builder-q">
          <legend>
            <span className="builder-n" aria-hidden="true">2</span>
            Combien de sites faut-il couvrir ?
          </legend>
          <div className="builder-choices is-row">
            {siteCounts.map((s) => (
              <label key={s} className={`choice ${sites === s ? "is-on" : ""}`}>
                <input type="radio" name="sites" checked={sites === s} onChange={() => setSites(s)} />
                <span>{s}</span>
              </label>
            ))}
          </div>
        </fieldset>

        {goal !== "export" && (
          <fieldset className="builder-q">
            <legend>
              <span className="builder-n" aria-hidden="true">3</span>
              Faut-il inclure vos achats, vos transports et vos fournisseurs ?
            </legend>
            <div className="builder-choices is-row">
              {chainAnswers.map((c) => (
                <label key={c} className={`choice ${chain === c ? "is-on" : ""}`}>
                  <input type="radio" name="chain" checked={chain === c} onChange={() => setChain(c)} />
                  <span>{c}</span>
                </label>
              ))}
            </div>
          </fieldset>
        )}

        <fieldset className="builder-q">
          <legend>
            <span className="builder-n" aria-hidden="true">{goal === "export" ? 3 : 4}</span>
            Des options à ajouter ? <small>Facultatif</small>
          </legend>
          <div className="builder-options">
            {options.map((o) => (
              <label key={o.id} className={`option ${extras.includes(o.id) ? "is-on" : ""}`}>
                <input type="checkbox" checked={extras.includes(o.id)} onChange={() => toggle(o.id)} />
                <span>
                  <strong>{o.name}</strong>
                  <small>{o.text}</small>
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      </form>

      <aside className={`builder-result ${ready ? "is-ready" : ""}`} aria-live="polite">
        {!ready ? (
          <div className="builder-empty">
            <p className="builder-kicker">Votre formule</p>
            <p className="builder-wait">Répondez aux questions : la formule adaptée et votre demande s’affichent ici.</p>
            <ul className="builder-ghost" aria-hidden="true">
              <li />
              <li />
              <li />
            </ul>
          </div>
        ) : (
          <div className="builder-filled" key={plan.id}>
            <p className="builder-kicker">Votre formule</p>
            <h3>{plan.name}</h3>
            <p className="builder-scope">{plan.scope}</p>
            <p>{plan.forWho}</p>
            <ul className="dash-list">
              {plan.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
              {chosen.map((o) => (
                <li key={o.id}>{o.name}</li>
              ))}
            </ul>
            {suggested && (
              <p className="builder-hint">
                Avec plusieurs sites, pensez à l’option « {suggested.name} » : chaque site est cadré dans la proposition.
              </p>
            )}
            <div className="builder-actions">
              <Link href={href} className="btn btn-signal">
                Demander ma proposition
              </Link>
              <Link href={plan.href} className="link">
                Voir le détail de la formule
              </Link>
            </div>
            <p className="builder-note">
              Votre demande arrive pré-remplie dans le formulaire de contact. Rien n’est envoyé avant votre relecture.
            </p>
          </div>
        )}
      </aside>
    </div>
  );
}
