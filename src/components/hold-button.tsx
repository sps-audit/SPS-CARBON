"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { Icon } from "./icons";

/*
 * Hold to confirm: a destructive action that asks for a deliberate press.
 * While the button is held (pointer, Space or Enter) the danger fill wipes in
 * from the left; letting go early sends it back. A tap does nothing, so a
 * file is never deleted by a slip of the finger.
 */
type State = "idle" | "holding" | "done";

export function HoldButton({
  onConfirm,
  label = "Maintenir pour supprimer",
  doneLabel = "Supprimé",
  accessibleLabel,
  duration = 1200,
}: {
  onConfirm: () => void;
  label?: string;
  doneLabel?: string;
  /** Spoken name, e.g. "Supprimer Factures.csv, maintenir le bouton enfoncé". */
  accessibleLabel?: string;
  duration?: number;
}) {
  const [state, setState] = useState<State>("idle");
  const timer = useRef(0);
  const confirm = useRef(onConfirm);
  confirm.current = onConfirm;

  const release = useCallback(() => {
    window.clearTimeout(timer.current);
    setState((current) => (current === "holding" ? "idle" : current));
  }, []);

  const press = useCallback(() => {
    window.clearTimeout(timer.current);
    setState((current) => (current === "done" ? current : "holding"));
    timer.current = window.setTimeout(() => {
      setState("done");
      navigator.vibrate?.(12);
      confirm.current();
      // If the parent keeps the button on screen, it comes back after a moment.
      timer.current = window.setTimeout(() => setState("idle"), 1600);
    }, duration);
  }, [duration]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  // A finger that slides off the button lets go, as it would on a real switch.
  const onPointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    if (state !== "holding") return;
    const box = event.currentTarget.getBoundingClientRect();
    const out =
      event.clientX < box.left - 8 || event.clientX > box.right + 8 || event.clientY < box.top - 8 || event.clientY > box.bottom + 8;
    if (out) release();
  };

  const content = (text: string) => (
    <>
      <Icon name="trash" />
      <span>{text}</span>
    </>
  );

  return (
    <button
      type="button"
      className={`hold is-${state}`}
      style={{ "--hold-ms": `${duration}ms` } as CSSProperties}
      aria-label={accessibleLabel}
      onPointerDown={(event) => {
        if (event.button !== 0 || state === "done") return;
        event.currentTarget.setPointerCapture(event.pointerId);
        press();
      }}
      onPointerMove={onPointerMove}
      onPointerUp={release}
      onPointerCancel={release}
      onLostPointerCapture={release}
      onKeyDown={(event) => {
        if ((event.key === " " || event.key === "Enter") && !event.repeat) {
          event.preventDefault();
          if (state !== "done") press();
        }
      }}
      onKeyUp={(event) => {
        if (event.key === " " || event.key === "Enter") release();
      }}
      onBlur={release}
      onContextMenu={(event) => event.preventDefault()}
    >
      <span className="hold-face">{content(label)}</span>
      <span className="hold-fill" aria-hidden="true">
        {content(state === "done" ? doneLabel : label)}
      </span>
    </button>
  );
}
