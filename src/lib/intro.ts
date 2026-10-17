/**
 * Tiny pub/sub that lets the preloader tell the rest of the page
 * "the curtain is lifting, start your entrance".
 */
type Listener = () => void;

const listeners = new Set<Listener>();
let started = false;

export function onIntro(listener: Listener): () => void {
  if (started) {
    listener();
    return () => {};
  }
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function startIntro() {
  if (started) return;
  started = true;
  for (const l of listeners) l();
  listeners.clear();
}

export function introStarted() {
  return started;
}

/* ── Intro debugging ────────────────────────────────────────
 * TEMPORARY: a scrubber for reviewing the opening sequence.
 * On in `npm run dev`, or anywhere with #debug / ?debug in the URL.
 * Remove <IntroScrubber/> from app/page.tsx to drop it.
 */
export const INTRO_DEBUG =
  typeof window !== "undefined" &&
  (process.env.NODE_ENV === "development" ||
    /debug/.test(window.location.hash) ||
    /debug/.test(window.location.search));

type Timeline = gsap.core.Timeline;
const timelines = new Map<string, Timeline>();
const tlListeners = new Set<() => void>();

/** Lets the scrubber find the intro timelines. Returns an unregister fn. */
export function registerTimeline(name: string, tl: Timeline): () => void {
  timelines.set(name, tl);
  for (const l of tlListeners) l();
  return () => {
    if (timelines.get(name) === tl) {
      timelines.delete(name);
      for (const l of tlListeners) l();
    }
  };
}

export function getTimeline(name: string): Timeline | undefined {
  return timelines.get(name);
}

export function onTimelinesChange(listener: () => void): () => void {
  tlListeners.add(listener);
  return () => tlListeners.delete(listener);
}
