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
