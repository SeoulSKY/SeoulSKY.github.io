import {
  isFinePointer,
  prefersReducedMotion,
  ScrollSmoother,
  useGSAP,
} from "@/lib/gsap";

/**
 * Creates the page-wide ScrollSmoother before any other ScrollTrigger.
 * Touch screens keep native scrolling: smoothing a finger's scroll moves the
 * whole page on the main thread, which lags on phones.
 */
export default function SmoothScroll() {
  useGSAP(() => {
    if (prefersReducedMotion() || !isFinePointer()) return;
    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.15,
      normalizeScroll: false,
    });
    return () => smoother.kill();
  });
  return null;
}
