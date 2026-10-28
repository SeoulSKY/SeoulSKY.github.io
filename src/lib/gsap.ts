import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { TextPlugin } from "gsap/TextPlugin";
import { type RefObject, useLayoutEffect, useState } from "react";
import { flushSync } from "react-dom";

gsap.registerPlugin(
  useGSAP,
  ScrollTrigger,
  ScrollSmoother,
  ScrollToPlugin,
  SplitText,
  DrawSVGPlugin,
  TextPlugin,
  ScrambleTextPlugin,
  CustomEase,
);

// The site's two eases: `seoul` for curtains, wipes and rules, `rise` for
// things entering.
CustomEase.create("seoul", "0.76, 0, 0.24, 1");
CustomEase.create("rise", "0.16, 1, 0.3, 1");

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Runs `setup` only while the visitor allows motion, and undoes it if they
 * turn reduced motion on later. `setup` may return its own cleanup. Returns
 * the revert, for a useGSAP cleanup.
 */
export function withMotion(setup: () => unknown) {
  const mm = gsap.matchMedia();
  mm.add("(prefers-reduced-motion: no-preference)", setup);
  return () => mm.revert();
}

/*
 * Work for what is below the fold, put off until the page has hydrated.
 * Building every section's animations at once made the first load one long
 * task (about 0.7s on Lighthouse's throttled phone), so this work queues
 * up instead and runs one piece per task, in the order the effects would
 * have run it. Meanwhile the page is under the intro, or (reduced motion)
 * this work is off screen.
 */
const later: (() => void)[] = [];
let draining = false;

/** Runs the next queued piece, then refreshes ScrollTrigger once done. */
function drainLater() {
  const run = later.shift();
  if (!run) {
    draining = false;
    // a pin set up late (Projects') moves every trigger below it, and
    // the ones made early (the navbar's) need measuring again
    ScrollTrigger.refresh();
    return;
  }
  run();
  setTimeout(drainLater, 0);
}

/** Queues `run` behind what is already waiting; returns a cancel. */
function queueLater(run: () => void) {
  later.push(run);
  if (!draining) {
    draining = true;
    setTimeout(drainLater, 0);
  }
  return () => {
    const queued = later.indexOf(run);
    if (queued >= 0) later.splice(queued, 1);
  };
}

/**
 * useGSAP for what is below the fold: the setup waits its turn in the
 * queue above. Takes the same callback and `{ scope }` as useGSAP.
 */
export function useGSAPLater(
  setup: () => unknown,
  { scope }: { scope: RefObject<Element | null> },
) {
  useGSAP(
    () => {
      let ctx: gsap.Context | undefined;
      const cancel = queueLater(() => {
        ctx = gsap.context(setup, scope.current ?? undefined);
      });
      return () => {
        cancel();
        ctx?.revert();
      };
    },
    { scope },
  );
}

/**
 * False until this component's turn in the queue above, then true: for a
 * big, still drawing below the fold, left out of the prerendered page so
 * it is not hydrated (or laid out under the intro) with everything else.
 * The drawing is committed within its turn, so a useGSAPLater setup
 * declared after this hook finds it in the page.
 */
export function useRenderLater() {
  const [ready, setReady] = useState(false);
  useLayoutEffect(() => queueLater(() => flushSync(() => setReady(true))), []);
  return ready;
}

export function isFinePointer() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches
  );
}

/** Scrolls to a section, through ScrollSmoother when it is active. */
export function scrollToSection(id: string) {
  const target = id === "top" ? 0 : document.getElementById(id);
  if (target === null) return;
  const smoother = ScrollSmoother.get();
  if (smoother) {
    smoother.scrollTo(target, true, "top top");
  } else {
    gsap.to(window, {
      duration: 1.2,
      ease: "seoul",
      scrollTo: { y: target, autoKill: true },
    });
  }
}

export {
  gsap,
  useGSAP,
  ScrollTrigger,
  ScrollSmoother,
  SplitText,
  DrawSVGPlugin,
};
