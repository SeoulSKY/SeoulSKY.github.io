import { useRef } from "react";
import { gsap, isFinePointer, useGSAP } from "@/lib/gsap";

/** A soft lantern-like glow that trails the pointer on desktop. */
export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!isFinePointer() || !ref.current) return;
    const el = ref.current;
    const x = gsap.quickTo(el, "x", { duration: 0.9, ease: "power3" });
    const y = gsap.quickTo(el, "y", { duration: 0.9, ease: "power3" });
    function move(e: PointerEvent) {
      x(e.clientX);
      y(e.clientY);
      gsap.to(el, { autoAlpha: 1, duration: 0.6, overwrite: "auto" });
    }
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  });

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="-translate-x-1/2 -translate-y-1/2 pointer-events-none fixed top-0 left-0 z-[60] size-[420px] rounded-full opacity-0 mix-blend-screen"
      style={{
        background:
          "radial-gradient(closest-side, rgb(255 195 161 / 0.09), rgb(244 167 185 / 0.04) 50%, transparent)",
      }}
    />
  );
}
