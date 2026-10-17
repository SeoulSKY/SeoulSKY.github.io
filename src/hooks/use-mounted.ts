import { useSyncExternalStore } from "react";

function subscribe() {
  return () => {};
}

/** False while prerendering and hydrating, true once running in the browser. */
export function useMounted(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
