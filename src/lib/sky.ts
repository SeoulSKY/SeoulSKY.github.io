/**
 * Whether something opaque covers the whole screen, hiding the page's
 * starfield (the Projects ride, with its night city behind the train).
 * The starfield stops twinkling while it is covered, since nobody can see
 * it, and its full-screen canvas would otherwise be redrawn for nothing.
 */
type Listener = (covered: boolean) => void;

const listeners = new Set<Listener>();
const covers = new Set<string>();

/** Marks the sky covered (or uncovered) by `who`; any one cover counts. */
export function coverSky(who: string, covered: boolean) {
  const before = covers.size > 0;
  if (covered) covers.add(who);
  else covers.delete(who);
  const after = covers.size > 0;
  if (before !== after) for (const l of listeners) l(after);
}

export function skyCovered() {
  return covers.size > 0;
}

/** Calls `listener` whenever the sky becomes covered or uncovered. */
export function onSkyCover(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
