import { useCallback, useSyncExternalStore } from "react";

export function useMediaQuery(query: string): boolean {
  // a stable subscribe, so React only resubscribes when the query changes
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query],
  );
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}
