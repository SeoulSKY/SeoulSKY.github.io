import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** False while prerendering and hydrating, true once running in the browser. */
export function useMounted(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
