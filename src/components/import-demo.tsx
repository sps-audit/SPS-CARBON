"use client";

import { useCallback, useEffect, useRef, useState, type DragEvent } from "react";
import { HoldButton } from "./hold-button";
import { Icon } from "./icons";
import { useReducedMotion } from "./motion";

/*
 * Import, as the collection module will do it: drop a bill or an export, the
 * documents slide into the folder while the lines are counted, then the file
 * waits in the list for the quality check. Here everything stays in the
 * visitor's browser: a CSV is counted line by line, any other file by size.
 */
type Stage = "idle" | "over" | "loading" | "done";
type Unit = "lignes" | "Ko";
type Row = { id: string; name: string; amount: number; unit: Unit; at: string; fresh?: boolean };
type Batch = { name: string; amount: number; unit: Unit; count: number };

const ACCEPT = [".csv", ".xlsx", ".xls", ".pdf"];
const nf = new Intl.NumberFormat("fr-FR");
const LOAD_MS = 2600;
const DONE_MS = 2600;

// Fictive company, like every other demonstration on the site.
const SAMPLE: Batch = { name: "Factures-electricite-2025.csv", amount: 3721, unit: "lignes", count: 1 };
const START: Row[] = [
  { id: "s1", name: "Gasoil-flotte-2025.xlsx", amount: 418, unit: "Ko", at: "Hier" },
  { id: "s2", name: "Facture-electricite-mars.pdf", amount: 212, unit: "Ko", at: "Lundi" },
];

const extension = (name: string) => name.slice(name.lastIndexOf(".")).toLowerCase();
const amountText = (amount: number, unit: Unit) => `${nf.format(amount)} ${unit}`;

async function measure(files: File[]): Promise<Batch> {
  const name = files.length > 1 ? `${files.length} fichiers` : files[0].name;
  const bytes = files.reduce((sum, file) => sum + file.size, 0);
  const csv = files.every((file) => extension(file.name) === ".csv") && bytes < 30_000_000;
  if (!csv) return { name, amount: Math.max(1, Math.round(bytes / 1024)), unit: "Ko", count: files.length };
  let lines = 0;
  for (const file of files) lines += (await file.text()).split(/\r?\n/).filter((line) => line.trim()).length;
  return { name, amount: lines, unit: "lignes", count: files.length };
}

function HexMark({ done }: { done: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.6 20.2 7.3v9.4L12 21.4 3.8 16.7V7.3Z" />
      <path className={done ? "imp-mark-check" : "imp-mark-dot"} d={done ? "m8.4 12.2 2.4 2.4 4.8-5" : "M12 12h.01"} />
    </svg>
  );
}

export function ImportDemo() {
  const reduced = useReducedMotion();
  const [stage, setStage] = useState<Stage>("idle");
  const [batch, setBatch] = useState<Batch | null>(null);
  const [rows, setRows] = useState<Row[]>(START);
  const [leaving, setLeaving] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [said, setSaid] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const counter = useRef<HTMLElement>(null);
  const depth = useRef(0);
  const timers = useRef<number[]>([]);
  const frame = useRef(0);
  const busy = stage === "loading" || stage === "done";

  const later = (fn: () => void, ms: number) => timers.current.push(window.setTimeout(fn, ms));

  useEffect(
    () => () => {
      timers.current.forEach(window.clearTimeout);
      cancelAnimationFrame(frame.current);
    },
    [],
  );

  // The counter is written outside React while it runs; at rest it shows the batch total.
  useEffect(() => {
    if (stage !== "loading" && counter.current)
      counter.current.textContent = batch ? amountText(batch.amount, batch.unit) : amountText(0, "lignes");
  }, [stage, batch]);

  // A file dropped beside the card must not make the browser open it.
  useEffect(() => {
    const guard = (event: globalThis.DragEvent) => {
      if (event.dataTransfer?.types.includes("Files")) event.preventDefault();
    };
    window.addEventListener("dragover", guard);
    window.addEventListener("drop", guard);
    return () => {
      window.removeEventListener("dragover", guard);
      window.removeEventListener("drop", guard);
    };
  }, []);

  const run = useCallback(
    (next: Batch) => {
      const load = reduced ? 500 : LOAD_MS;
      setBatch(next);
      setStage("loading");
      setSaid(`Import en cours : ${next.name}`);
      const begin = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - begin) / load);
        const eased = 1 - Math.pow(1 - t, 3);
        if (counter.current) counter.current.textContent = amountText(Math.round(next.amount * eased), next.unit);
        if (t < 1) frame.current = requestAnimationFrame(tick);
      };
      frame.current = requestAnimationFrame(tick);
      later(() => {
        setStage("done");
        setSaid(`Import réussi : ${next.name}, ${amountText(next.amount, next.unit)}.`);
        const id = `${Date.now()}`;
        setRows((list) => [{ id, name: next.name, amount: next.amount, unit: next.unit, at: "À l’instant", fresh: true }, ...list]);
      }, load);
      later(() => setStage("idle"), load + DONE_MS);
    },
    [reduced],
  );

  const take = async (files: File[]) => {
    if (busy || files.length === 0) return;
    const refused = files.find((file) => !ACCEPT.includes(extension(file.name)));
    if (refused) {
      setStage("idle");
      setError(`Format non pris en charge : ${extension(refused.name) || refused.name}. Formats acceptés : ${ACCEPT.join(", ")}.`);
      return;
    }
    setError("");
    run(await measure(files));
  };

  // The full red "Supprimé" stays a beat, then the row folds away.
  const remove = (row: Row) => {
    setSaid(`${row.name} supprimé.`);
    const beat = reduced ? 0 : 360;
    later(() => setLeaving((list) => [...list, row.id]), beat);
    later(() => {
      setRows((list) => list.filter((item) => item.id !== row.id));
      setLeaving((list) => list.filter((id) => id !== row.id));
    }, reduced ? beat : beat + 420);
  };

  const drag = {
    onDragEnter: (event: DragEvent) => {
      event.preventDefault();
      if (busy) return;
      depth.current += 1;
      setStage("over");
    },
    onDragOver: (event: DragEvent) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = busy ? "none" : "copy";
    },
    onDragLeave: () => {
      if (busy) return;
      depth.current = Math.max(0, depth.current - 1);
      if (depth.current === 0) setStage("idle");
    },
    onDrop: (event: DragEvent) => {
      event.preventDefault();
      depth.current = 0;
      if (!busy) void take(Array.from(event.dataTransfer.files));
    },
  };

  const title =
    stage === "over" ? "Relâchez pour importer" : stage === "loading" ? "Import en cours" : stage === "done" ? "Import réussi" : "Déposer des fichiers";

  return (
    <div className="imp">
      <div className="imp-card" data-stage={stage} {...drag}>
        <div className="imp-art" aria-hidden="true">
          <div className="imp-docs">
            <span className="imp-doc d1" />
            <span className="imp-doc d2" />
            <span className="imp-doc d3">
              <Icon name="electric" />
              <b>XLSX</b>
            </span>
          </div>
          <div className="imp-folder">
            <span className="imp-folder-back" />
            <span className="imp-sheet s1" />
            <span className="imp-sheet s2" />
            <span className="imp-folder-front">
              <HexMark done={stage === "done"} />
              <span className="imp-folder-text">
                <small>Importé</small>
                <strong ref={counter} className="readout" />
              </span>
            </span>
          </div>
        </div>

        <div className="imp-copy">
          <p className="imp-title" key={stage === "over" ? "idle" : stage}>
            {stage === "loading" && <i className="imp-spin" aria-hidden="true" />}
            {stage === "done" && <Icon name="check" className="imp-ok" />}
            {title}
          </p>
          {stage === "loading" || stage === "done" ? (
            <p className="imp-hint">
              {stage === "done" && batch
                ? `${batch.name}\u00a0: ${amountText(batch.amount, batch.unit)}, prêt${batch.count > 1 ? "s" : ""} pour le contrôle qualité.`
                : batch?.name}
            </p>
          ) : (
            <>
              <p className="imp-hint">
                Glissez une facture ou un export ici,{" "}
                <button type="button" className="link" onClick={() => input.current?.click()}>
                  choisissez un fichier
                </button>{" "}
                ou{" "}
                <button type="button" className="link" onClick={() => run(SAMPLE)}>
                  essayez l’exemple
                </button>
                .
              </p>
              <p className="imp-formats">Formats : {ACCEPT.join(", ")}. Lu dans votre navigateur, rien n’est envoyé.</p>
            </>
          )}
          {error && <p className="imp-error">{error}</p>}
        </div>

        <input
          ref={input}
          type="file"
          multiple
          accept={ACCEPT.join(",")}
          hidden
          onChange={(event) => {
            void take(Array.from(event.target.files ?? []));
            event.target.value = "";
          }}
        />
      </div>

      <div className="imp-list">
        <div className="imp-list-head">
          <strong>Fichiers importés</strong>
          <span>Exemple fictif</span>
        </div>
        {rows.length > 0 ? (
          <ul>
            {rows.map((row) => (
              <li key={row.id} className={`imp-row ${row.fresh ? "is-fresh" : ""} ${leaving.includes(row.id) ? "is-leaving" : ""}`}>
                <div className="imp-row-in">
                  <span className="imp-row-icon">
                    <Icon name="file" />
                  </span>
                  <span className="imp-row-name">
                    <strong>{row.name}</strong>
                    <small>
                      {amountText(row.amount, row.unit)} · {row.at}
                    </small>
                  </span>
                  <em className="tag wait">À contrôler</em>
                  <HoldButton
                    accessibleLabel={`Supprimer ${row.name}, maintenir le bouton enfoncé`}
                    onConfirm={() => remove(row)}
                  />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="imp-empty">Aucun fichier pour l’instant. Déposez-en un pour lancer la collecte.</p>
        )}
        <p className="imp-note">Pour retirer un fichier, maintenez le bouton enfoncé : un simple clic ne supprime rien.</p>
      </div>

      <p className="sr-only" aria-live="polite">
        {error || said}
      </p>
    </div>
  );
}
