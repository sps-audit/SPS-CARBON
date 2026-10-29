"use client";

import { useId, useState } from "react";
import Link from "next/link";

/*
 * Express calculator, Scopes 1 and 2. Every line shows its calculation:
 * quantity × factor = tCO₂e, with the factor's source. Factors are editable.
 * Runs in the browser only: nothing is sent or stored.
 *
 * Fuel factors: CO₂ from combustion, IPCC 2006 Guidelines, vol. 2 (energy),
 * default carbon content (kg CO₂/TJ) × default net calorific value (TJ/Gg).
 *   Gas oil / diesel   74 100 × 43,0 = 3,186 kg CO₂/kg × 0,84 kg/L  = 2,68 kg CO₂/L
 *   Motor gasoline     69 300 × 44,3 = 3,070 kg CO₂/kg × 0,745 kg/L = 2,29 kg CO₂/L
 *   LPG                63 100 × 47,3 = 2,98 kg CO₂/kg
 *   Residual fuel oil  77 400 × 40,4 = 3,13 kg CO₂/kg
 * Electricity: average carbon intensity of power generation in Morocco in 2024,
 * 551 g CO₂e/kWh (Low Carbon Power, from Ember and IEA data), location-based.
 */

type Line = {
  id: string;
  label: string;
  hint: string;
  unit: string;
  factor: number;
  factorUnit: string;
  scope: 1 | 2;
  source: string;
};

const lines: Line[] = [
  {
    id: "elec",
    label: "Électricité achetée",
    hint: "Total des factures d’électricité de l’année",
    unit: "kWh",
    factor: 0.551,
    factorUnit: "kgCO₂e/kWh",
    scope: 2,
    source: "Intensité moyenne de la production d’électricité au Maroc en 2024 : 551 gCO₂e/kWh (Low Carbon Power, données Ember et AIE). Méthode « localisation ».",
  },
  {
    id: "diesel",
    label: "Gasoil",
    hint: "Véhicules, engins, groupes électrogènes",
    unit: "L",
    factor: 2.68,
    factorUnit: "kgCO₂/L",
    scope: 1,
    source: "GIEC 2006, vol. 2 : 74 100 kgCO₂/TJ, PCI 43,0 TJ/Gg, densité retenue 0,84 kg/L. CO₂ de combustion.",
  },
  {
    id: "petrol",
    label: "Essence",
    hint: "Véhicules légers",
    unit: "L",
    factor: 2.29,
    factorUnit: "kgCO₂/L",
    scope: 1,
    source: "GIEC 2006, vol. 2 : 69 300 kgCO₂/TJ, PCI 44,3 TJ/Gg, densité retenue 0,745 kg/L. CO₂ de combustion.",
  },
  {
    id: "lpg",
    label: "Butane et propane",
    hint: "Chaudières, fours, cuisines, chariots",
    unit: "kg",
    factor: 2.98,
    factorUnit: "kgCO₂/kg",
    scope: 1,
    source: "GIEC 2006, vol. 2, GPL : 63 100 kgCO₂/TJ, PCI 47,3 TJ/Gg. CO₂ de combustion.",
  },
  {
    id: "fuel",
    label: "Fioul lourd",
    hint: "Chaudières et fours industriels",
    unit: "kg",
    factor: 3.13,
    factorUnit: "kgCO₂/kg",
    scope: 1,
    source: "GIEC 2006, vol. 2, fioul résiduel : 77 400 kgCO₂/TJ, PCI 40,4 TJ/Gg. CO₂ de combustion.",
  },
];

const nf = (digits: number) => new Intl.NumberFormat("fr-FR", { maximumFractionDigits: digits, minimumFractionDigits: 0 });
const tonnes = (kg: number) => nf(kg >= 1_000_000 ? 0 : kg >= 10_000 ? 1 : 2).format(kg / 1000);

function parse(value: string) {
  const n = Number(value.replace(/\s/g, "").replace(",", "."));
  return Number.isFinite(n) && n > 0 ? n : 0;
}

export function CarbonCalculator() {
  const uid = useId();
  const [quantities, setQuantities] = useState<Record<string, string>>({});
  const [factors, setFactors] = useState<Record<string, string>>({});
  const [editing, setEditing] = useState<string | null>(null);

  const results = lines.map((line) => {
    const qty = parse(quantities[line.id] ?? "");
    const custom = factors[line.id];
    const factor = custom !== undefined && parse(custom) > 0 ? parse(custom) : line.factor;
    return { line, qty, factor, kg: qty * factor, changed: custom !== undefined && parse(custom) !== line.factor };
  });

  const s1 = results.filter((r) => r.line.scope === 1).reduce((sum, r) => sum + r.kg, 0);
  const s2 = results.filter((r) => r.line.scope === 2).reduce((sum, r) => sum + r.kg, 0);
  const total = s1 + s2;
  const top = [...results].sort((a, b) => b.kg - a.kg)[0];

  const context = results
    .filter((r) => r.qty > 0)
    .map((r) => `${r.line.label} : ${nf(0).format(r.qty)} ${r.line.unit}`)
    .join("\n");
  const href = `/contact?sujet=0&contexte=${encodeURIComponent(
    `Estimation du calculateur express : ${tonnes(total)} tCO₂e (Scope 1 : ${tonnes(s1)} t, Scope 2 : ${tonnes(s2)} t)\n${context}`,
  )}`;

  return (
    <div className="calc">
      <div className="calc-lines" role="group" aria-label="Vos consommations annuelles">
        <div className="calc-head" aria-hidden="true">
          <span>Consommation annuelle</span>
          <span>Facteur d’émission</span>
          <span>Résultat</span>
        </div>
        {results.map(({ line, qty, factor, kg, changed }) => {
          const qtyId = `${uid}-${line.id}`;
          const factorId = `${uid}-${line.id}-f`;
          const sourceId = `${uid}-${line.id}-s`;
          return (
            <div className={`calc-line ${qty > 0 ? "has-value" : ""}`} key={line.id}>
              <div className="calc-input">
                <label htmlFor={qtyId}>
                  <strong>{line.label}</strong>
                  <small>
                    <em className="calc-scope">Scope {line.scope}</em> {line.hint}
                  </small>
                </label>
                <div className="calc-field">
                  <input
                    id={qtyId}
                    inputMode="decimal"
                    autoComplete="off"
                    placeholder="0"
                    value={quantities[line.id] ?? ""}
                    onChange={(event) => setQuantities({ ...quantities, [line.id]: event.target.value })}
                  />
                  <span>{line.unit}</span>
                </div>
              </div>
              <div className="calc-factor">
                <span className="calc-op" aria-hidden="true">
                  ×
                </span>
                {editing === line.id ? (
                  <div className="calc-field is-small">
                    <label htmlFor={factorId} className="sr-only">
                      Facteur d’émission pour {line.label}, en {line.factorUnit}
                    </label>
                    <input
                      id={factorId}
                      inputMode="decimal"
                      autoFocus
                      value={factors[line.id] ?? String(line.factor).replace(".", ",")}
                      onChange={(event) => setFactors({ ...factors, [line.id]: event.target.value })}
                      onBlur={() => setEditing(null)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === "Escape") setEditing(null);
                      }}
                      aria-describedby={sourceId}
                    />
                    <span>{line.factorUnit}</span>
                  </div>
                ) : (
                  <button
                    type="button"
                    className={`calc-factor-btn ${changed ? "is-changed" : ""}`}
                    onClick={() => setEditing(line.id)}
                    aria-describedby={sourceId}
                    aria-label={`Modifier le facteur pour ${line.label} : ${nf(3).format(factor)} ${line.factorUnit}`}
                  >
                    <strong>{nf(3).format(factor)}</strong>
                    <small>{line.factorUnit}</small>
                  </button>
                )}
                <p className="calc-source" id={sourceId}>
                  {changed ? "Facteur modifié par vous. Valeur par défaut : " + nf(3).format(line.factor) + " " + line.factorUnit + ". " : ""}
                  {line.source}
                </p>
              </div>
              <div className="calc-out">
                <span className="calc-op" aria-hidden="true">
                  =
                </span>
                <span className="calc-result">
                  <strong>{qty > 0 ? tonnes(kg) : "0"}</strong>
                  <small>tCO₂e</small>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <aside className="calc-total s-night" aria-label="Résultat de l’estimation">
        <p className="calc-total-label">Estimation Scopes 1 et 2</p>
        <p className="calc-total-value" aria-live="polite" aria-atomic="true">
          <strong>{tonnes(total)}</strong>
          <span>tCO₂e par an</span>
        </p>
        <div className={`calc-split${total ? "" : " is-empty"}`} aria-hidden="true">
          <i style={{ flexGrow: total ? s1 : 1 }} className="s1" />
          <i style={{ flexGrow: total ? s2 : 1 }} className="s2" />
        </div>
        <dl className="calc-scopes">
          <div>
            <dt>
              <i className="calc-key s1" aria-hidden="true" />
              Scope 1, combustibles
            </dt>
            <dd>{tonnes(s1)} t</dd>
          </div>
          <div>
            <dt>
              <i className="calc-key s2" aria-hidden="true" />
              Scope 2, électricité
            </dt>
            <dd>{tonnes(s2)} t</dd>
          </div>
        </dl>
        {total > 0 && top && (
          <p className="calc-insight">
            Premier poste : <strong>{top.line.label.toLowerCase()}</strong>, {nf(0).format((top.kg / total) * 100)} % du total.
            C’est là qu’une vérification des données et des actions auront le plus d’effet.
          </p>
        )}
        <p className="calc-caveat">
          Un ordre de grandeur, pas un bilan : hors Scope 3, hors fluides frigorigènes et procédés, hors émissions amont des
          combustibles.
        </p>
        <div className="calc-actions">
          <Link href={total > 0 ? href : "/contact?sujet=0"} className="btn btn-signal">
            Passer à un vrai bilan
          </Link>
          <button
            type="button"
            className="link"
            onClick={() => {
              setQuantities({});
              setFactors({});
            }}
          >
            Effacer
          </button>
        </div>
      </aside>
    </div>
  );
}
