"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "./icons";

const sectors = {
  services: {
    name: "Services & bureaux",
    icon: "layers",
    data: [
      "Factures d’électricité par site",
      "Carburant des véhicules sous votre contrôle",
      "Déplacements professionnels et trajets des équipes",
      "Achats et équipements informatiques",
    ],
  },
  industry: {
    name: "Industrie & production",
    icon: "chart",
    data: [
      "Consommations d’électricité et de combustibles",
      "Quantités produites et procédés industriels",
      "Matières premières et transport",
      "Équipements de froid et registres de maintenance",
    ],
  },
  commerce: {
    name: "Commerce & distribution",
    icon: "globe",
    data: [
      "Énergie des magasins et entrepôts",
      "Produits achetés et emballages",
      "Transport amont et livraisons",
      "Froid commercial et gestion des déchets",
    ],
  },
  hospitality: {
    name: "Hôtellerie & restauration",
    icon: "compass",
    data: [
      "Électricité, gaz et autres combustibles",
      "Achats alimentaires et autres fournitures",
      "Installations de climatisation et de froid",
      "Déchets et déplacements professionnels",
    ],
  },
} as const;
type Sector = keyof typeof sectors;

export function ProjectDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [sector, setSector] = useState<Sector>("services");
  const [step, setStep] = useState(1);
  const [company, setCompany] = useState("");
  const [downloaded, setDownloaded] = useState(false);
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      setStep(1);
      setDownloaded(false);
      if (typeof dialog.showModal === "function") dialog.showModal();
      else dialog.setAttribute("open", "");
      document.body.style.overflow = "hidden";
    }
    if (!open && dialog.open) {
      if (typeof dialog.close === "function") dialog.close();
      else dialog.removeAttribute("open");
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (ref.current?.open) titleRef.current?.focus({ preventScroll: true });
    ref.current?.scrollTo({ top: 0 });
  }, [step]);

  function download() {
    const text = `SPS CARBON — Préparer mon premier inventaire\n\nEntreprise : ${company.trim() || "À préciser"}\nActivité : ${sectors[sector].name}\n\nAvant de collecter : définir la période, les sites et les activités sous votre contrôle.\n\nDonnées à réunir :\n${sectors[sector].data.map((item) => `[ ] ${item}`).join("\n")}\n\nPour chaque donnée : conserver la quantité, l’unité, la période, le site et le justificatif. Distinguer les valeurs mesurées, estimées et manquantes.\n\nListe indicative, à adapter au périmètre réel. Elle n’est ni un inventaire complet ni une certification. SPS CARBON est en développement. Aucune information n’a été transmise.\n`;
    const url = URL.createObjectURL(
      new Blob(["\ufeff", text], { type: "text/plain;charset=utf-8" }),
    );
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "sps-carbon-ma-checklist.txt";
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setDownloaded(true);
  }

  return (
    <dialog
      ref={ref}
      className="project-dialog"
      aria-labelledby="dialog-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          const rect = event.currentTarget.getBoundingClientRect();
          if (
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom
          )
            onClose();
        }
      }}
    >
      <div className="dialog-top">
        <img className="logo-on-light" src="/brand/logo-dark.svg" width="168" height="21" alt="SPS CARBON" />
        <img className="logo-on-dark" src="/brand/logo-light.svg" width="168" height="21" alt="" aria-hidden="true" />
        <button className="icon-button" onClick={onClose} aria-label="Fermer">
          <Icon name="close" />
        </button>
      </div>
      <div className="dialog-content">
        <p className="dialog-step">
          Premiers repères <span>{step} / 2</span>
        </p>
        <h2 id="dialog-title" ref={titleRef} tabIndex={-1}>
          {step === 1
            ? "Votre activité. Votre point de départ."
            : "Les bonnes données, dès le départ."}
        </h2>
        {step === 1 ? (
          <>
            <p>
              Découvrez les premières informations utiles pour préparer votre
              démarche carbone.
            </p>
            <label className="text-field">
              Nom de votre entreprise <span>(facultatif)</span>
              <input
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                maxLength={100}
                placeholder="Votre entreprise"
                autoComplete="organization"
              />
            </label>
            <fieldset className="sector-options">
              <legend>Quelle est votre activité principale ?</legend>
              {Object.entries(sectors).map(([id, item]) => (
                <label key={id} className={sector === id ? "selected" : ""}>
                  <input
                    type="radio"
                    name="sector"
                    value={id}
                    checked={sector === id}
                    onChange={() => setSector(id as Sector)}
                  />
                  <Icon name={item.icon} />
                  <span>{item.name}</span>
                  {sector === id && <Icon name="check" />}
                </label>
              ))}
            </fieldset>
            <button
              className="btn dialog-next"
              onClick={() => setStep(2)}
            >
              Voir ma checklist
            </button>
            <small className="dialog-privacy">
              Ces informations restent dans cette page. Aucun envoi, aucune
              inscription.
            </small>
          </>
        ) : (
          <>
            <p>
              {company.trim() ? `${company.trim()} — ` : ""}
              {sectors[sector].name}
            </p>
            <ul className="checklist">
              {sectors[sector].data.map((item) => (
                <li key={item}>
                  <Icon name="check" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="checklist-note">
              <strong>Commencez par définir votre périmètre.</strong>
              <p>
                Choisissez une période et les sites à examiner. Gardez les
                justificatifs et signalez les données qui vous manquent.
              </p>
            </div>
            <p className="checklist-disclaimer">
              Cette liste est indicative et doit être adaptée à votre
              entreprise. Elle ne constitue pas un inventaire complet.
            </p>
            <button
              className="btn dialog-next"
              onClick={download}
            >
              <Icon name="download" /> Télécharger ma checklist
            </button>
            <p className="download-status" role="status">
              {downloaded
                ? "Votre checklist a été préparée pour téléchargement."
                : "Un fichier texte, facile à partager avec votre équipe"}
            </p>
            <button
              className="link link-quiet"
              onClick={() => {
                setStep(1);
                setDownloaded(false);
              }}
            >
              Modifier mon activité
            </button>
          </>
        )}
      </div>
    </dialog>
  );
}
