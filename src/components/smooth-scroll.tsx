import { prefersReducedMotion, ScrollSmoother, useGSAP } from "@/lib/gsap";

/** Creates the page-wide ScrollSmoother before any other ScrollTrigger. */
export default function SmoothScroll() {
  useGSAP(() => {
    if (prefersReducedMotion()) return;
    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.15,
      smoothTouch: 0.1,
      effects: true,
      normalizeScroll: false,
    });
    return () => smoother.kill();
  });
  return null;
}
