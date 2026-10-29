"use client";

/*
 * One scroll reader for the whole site. The scroll position and the viewport
 * height are read once per scroll event, before any frame writes, and every
 * scroll-driven effect runs from the same animation frame with those values.
 * Reading scrollY after a style write forces a full layout in Chromium; with
 * this store no effect ever does.
 */
type Listener = (y: number, vh: number) => void;

let y = 0;
let vh = 1;
let frame = 0;
let started = false;
const listeners = new Set<Listener>();

function flush() {
  frame = 0;
  for (const listener of listeners) listener(y, vh);
}

function schedule() {
  if (!frame) frame = requestAnimationFrame(flush);
}

function start() {
  if (started || typeof window === "undefined") return;
  started = true;
  y = window.scrollY;
  vh = window.innerHeight || 1;
  window.addEventListener(
    "scroll",
    () => {
      y = window.scrollY;
      schedule();
    },
    { passive: true },
  );
  window.addEventListener("resize", () => {
    y = window.scrollY;
    vh = window.innerHeight || 1;
    schedule();
  });
}

/** Runs `listener` on every scroll frame (and once on the next frame). Returns an unsubscribe function. */
export function onScrollFrame(listener: Listener) {
  start();
  listeners.add(listener);
  schedule();
  return () => {
    listeners.delete(listener);
  };
}

/** The last known scroll position and viewport height. */
export function scrollState() {
  start();
  return { y, vh };
}

/** Asks every listener to run again on the next frame (after a geometry change). */
export function requestScrollFrame() {
  start();
  schedule();
}
