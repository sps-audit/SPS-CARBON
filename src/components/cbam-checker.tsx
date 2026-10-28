"use client";

import { useState } from "react";
import Link from "next/link";

/*
 * MACF / CBAM checker: three questions, an indication and the data an EU
 * importer will ask for. Based on regulation (EU) 2023/956 as amended in 2025
 * (definitive period from 1 January 2026, 50-tonne threshold). Not legal advice.
 */

const markets = ["Oui, je vends directement à un importateur de l’UE", "Oui, via un client ou un intermédiaire", "Non"] as const;

const products = [
  { id: "cement", label: "Ciment ou clinker", threshold: true },
  { id: "steel", label: "Fer, acier ou produits en acier (tubes, vis, boulons…)", threshold: true },
  { id: "alu", label: "Aluminium ou produits en aluminium", threshold: true },
  { id: "fert", label: "Engrais azotés (ammoniac, urée, DAP, MAP, NPK…)", threshold: true },
  { id: "h2", label: "Hydrogène", threshold: false },
  { id: "elec", label: "Électricité", threshold: false },
  { id: "other", label: "Un autre produit", threshold: false },
] as const;

const volumes = ["Plus de 50 tonnes", "Moins de 50 tonnes", "Je ne sais pas"] as const;

type Verdict = { tone: "yes" | "maybe" | "no"; title: string; text: string; concerned: boolean };

function verdict(market: string | null, product: string | null, volume: string | null): Verdict | null {
  if (market === null) return null;
  if (market === "Non")
    return {
      tone: "no",
      title: "Pas concerné directement par le MACF",
      text: "Le MACF ne s’applique qu’aux marchandises importées dans l’Union européenne. Vos clients, vos banques ou vos partenaires peuvent toutefois vous demander vos émissions : un bilan des Scopes 1 et 2 reste le bon point de départ.",
      concerned: false,
    };
  if (product === null) return null;
  const item = products.find((p) => p.id === product)!;
  if (item.id === "other")
    return {
      tone: "no",
      title: "Votre produit n’est pas couvert aujourd’hui",
      text: "Le MACF vise le ciment, le fer et l’acier, l’aluminium, les engrais, l’hydrogène et l’électricité, selon leur code douanier (NC). Son périmètre peut évoluer : vérifiez le code NC de vos produits à chaque modification du règlement.",
      concerned: false,
    };
  if (!item.threshold)
    return {
      tone: "yes",
      title: "Concerné",
      text: "Vos marchandises figurent dans le MACF et aucun seuil de 50 tonnes ne s’applique à l’hydrogène ni à l’électricité. Votre client européen aura besoin des émissions de vos installations.",
      concerned: true,
    };
  if (volume === null) return null;
  if (volume === volumes[0])
    return {
      tone: "yes",
      title: "Très probablement concerné",
      text: "Vos marchandises figurent dans le MACF et votre client dépasse le seuil de 50 tonnes par an. Il doit déclarer les émissions intrinsèques de ses importations : il vous demandera vos données.",
      concerned: true,
    };
  if (volume === volumes[1])
    return {
      tone: "maybe",
      title: "Votre client peut être exempté",
      text: "Sous 50 tonnes par an, tous fournisseurs confondus, un importateur n’a pas d’obligation MACF pour ces marchandises. Vos autres clients européens, au-delà du seuil, vous demanderont en revanche ces données.",
      concerned: true,
    };
  return {
    tone: "maybe",
    title: "Probablement concerné, à confirmer",
    text: "Vos marchandises figurent dans le MACF. Le seuil de 50 tonnes s’apprécie chez l’importateur, tous fournisseurs confondus : posez la question à votre client européen.",
    concerned: true,
  };
}

const asks = [
  "Les émissions directes de vos installations par tonne produite, et les émissions indirectes pour certains produits comme le ciment et les engrais",
  "Les quantités produites et les intrants utilisés (précurseurs), sur la période déclarée",
  "La méthode de surveillance appliquée et les justificatifs, pour la vérification",
  "Le prix du carbone éventuellement payé dans le pays de production",
];

const dates = [
  { when: "1er janv. 2026", what: "Début de la période définitive" },
  { when: "Févr. 2027", what: "Vente des certificats MACF pour les importations de 2026" },
  { when: "30 sept. 2027", what: "Première déclaration annuelle, sur les importations de 2026" },
];

export function CbamChecker() {
  const [market, setMarket] = useState<string | null>(null);
  const [product, setProduct] = useState<string | null>(null);
  const [volume, setVolume] = useState<string | null>(null);

  const item = products.find((p) => p.id === product);
  const result = verdict(market, product, volume);
  const showProduct = market !== null && market !== "Non";
  const showVolume = showProduct && item?.threshold;

  const context = [
    market && `Vente vers l’UE : ${market}`,
    item && `Produit : ${item.label}`,
    showVolume && volume && `Volume chez l’importateur : ${volume}`,
    result && `Indication du vérificateur : ${result.title}`,
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <div className="checker">
      <form className="checker-form" onSubmit={(event) => event.preventDefault()} aria-label="Vérifier si le MACF vous concerne">
        <fieldset className="builder-q">
          <legend>
            <span className="builder-n" aria-hidden="true">1</span>
            Vos produits sont-ils importés dans l’Union européenne ?
          </legend>
          <div className="builder-choices">
            {markets.map((m) => (
              <label key={m} className={`choice ${market === m ? "is-on" : ""}`}>
                <input
                  type="radio"
                  name="cbam-market"
                  checked={market === m}
                  onChange={() => {
                    setMarket(m);
                    if (m === "Non") {
                      setProduct(null);
                      setVolume(null);
                    }
                  }}
                />
                <span>{m}</span>
              </label>
            ))}
          </div>
        </fieldset>

        {showProduct && (
          <fieldset className="builder-q">
            <legend>
              <span className="builder-n" aria-hidden="true">2</span>
              Que vendez-vous ?
            </legend>
            <div className="builder-choices">
              {products.map((p) => (
                <label key={p.id} className={`choice ${product === p.id ? "is-on" : ""}`}>
                  <input
                    type="radio"
                    name="cbam-product"
                    checked={product === p.id}
                    onChange={() => {
                      setProduct(p.id);
                      setVolume(null);
                    }}
                  />
                  <span>{p.label}</span>
                </label>
              ))}
            </div>
          </fieldset>
        )}

        {showVolume && (
          <fieldset className="builder-q">
            <legend>
              <span className="builder-n" aria-hidden="true">3</span>
              Votre client importe-t-il plus de 50 tonnes par an de ces marchandises, tous fournisseurs confondus ?
            </legend>
            <div className="builder-choices is-row">
              {volumes.map((v) => (
                <label key={v} className={`choice ${volume === v ? "is-on" : ""}`}>
                  <input type="radio" name="cbam-volume" checked={volume === v} onChange={() => setVolume(v)} />
                  <span>{v}</span>
                </label>
              ))}
            </div>
          </fieldset>
        )}
      </form>

      <aside className={`checker-result ${result ? `is-${result.tone}` : ""}`} aria-live="polite">
        {!result ? (
          <div className="builder-empty">
            <p className="builder-kicker">Votre situation</p>
            <p className="builder-wait">Répondez aux questions : l’indication et les données à préparer s’affichent ici.</p>
          </div>
        ) : (
          <div className="builder-filled" key={result.title}>
            <p className="checker-verdict">
              <span className="checker-dot" aria-hidden="true" />
              {result.title}
            </p>
            <p>{result.text}</p>
            {result.concerned && (
              <>
                <p className="checker-sub">Ce que votre client européen vous demandera</p>
                <ul className="hex-list">
                  {asks.map((ask) => (
                    <li key={ask}>{ask}</li>
                  ))}
                </ul>
                <p className="checker-sub">Les dates clés</p>
                <ol className="checker-dates">
                  {dates.map((d) => (
                    <li key={d.when}>
                      <strong>{d.when}</strong>
                      <span>{d.what}</span>
                    </li>
                  ))}
                </ol>
              </>
            )}
            <div className="builder-actions">
              <Link
                href={`/contact?sujet=${result.concerned ? 2 : 0}&contexte=${encodeURIComponent(context)}`}
                className="btn btn-mint"
              >
                {result.concerned ? "Préparer mes données MACF" : "Commencer par un bilan"}
              </Link>
              <Link href={result.concerned ? "/solutions#cbam" : "/solutions#inventaire-essentiel"} className="link">
                {result.concerned ? "L’accompagnement MACF" : "Le bilan essentiel"}
              </Link>
            </div>
            <p className="builder-note">
              Une indication, pas un avis juridique : le code NC de chaque produit et la situation de l’importateur font foi.
            </p>
          </div>
        )}
      </aside>
    </div>
  );
}
