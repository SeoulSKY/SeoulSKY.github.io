import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/gsap";
import { mulberry32 } from "@/lib/random";
import { cn } from "@/lib/utils";

interface StarfieldProps {
  className?: string;
  /** stars per 10,000 px² */
  density?: number;
  /** 0–1: how far down the canvas stars may appear (fades out toward it) */
  fadeTo?: number;
  seed?: number;
}

interface Star {
  x: number;
  y: number;
  r: number;
  base: number;
  speed: number;
  phase: number;
  hue: string;
}

const HUES = ["255,255,255", "255,228,210", "214,206,255", "255,214,190"];

/** A lightweight twinkling star canvas that pauses when off-screen. */
export default function Starfield({
  className,
  density = 1.4,
  fadeTo = 1,
  seed = 11,
}: StarfieldProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let stars: Star[] = [];
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    const still = prefersReducedMotion();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const build = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const rand = mulberry32(seed);
      const count = Math.round(((w * h) / 10000) * density);
      stars = Array.from({ length: count }, () => {
        // bias toward the top of the sky
        const y = rand() ** 1.6 * h * fadeTo;
        return {
          x: rand() * w,
          y,
          r: rand() < 0.08 ? 1.1 + rand() * 0.8 : 0.35 + rand() * 0.7,
          base: (0.35 + rand() * 0.65) * (1 - (y / (h * fadeTo)) * 0.8),
          speed: 0.4 + rand() * 1.6,
          phase: rand() * Math.PI * 2,
          hue: HUES[Math.floor(rand() * HUES.length)],
        };
      });
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        const tw = still
          ? 1
          : 0.6 + 0.4 * Math.sin(t * 0.001 * s.speed + s.phase);
        const a = s.base * tw;
        ctx.fillStyle = `rgba(${s.hue},${a.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
        if (s.r > 1.1) {
          ctx.fillStyle = `rgba(${s.hue},${(a * 0.15).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r * 3.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const loop = (t: number) => {
      draw(t);
      if (!still && visible) raf = requestAnimationFrame(loop);
    };

    build();
    raf = requestAnimationFrame(loop);

    const ro = new ResizeObserver(() => {
      build();
      draw(performance.now());
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(([entry]) => {
      const was = visible;
      visible = entry.isIntersecting;
      if (visible && !was && !still) raf = requestAnimationFrame(loop);
    });
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [density, fadeTo, seed]);

  return (
    <canvas
      ref={ref}
      className={cn("pointer-events-none block h-full w-full", className)}
    />
  );
}
