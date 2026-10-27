import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/gsap";
import { onIntro } from "@/lib/intro";
import { mulberry32 } from "@/lib/random";
import { onSkyCover, skyCovered } from "@/lib/sky";
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
}

const HUES = ["255,255,255", "255,228,210", "214,206,255", "255,214,190"];
const FILLS = HUES.map((hue) => `rgb(${hue})`);

/** Twinkling is slow, so 30 frames a second looks the same as 60. */
const FRAME_MS = 1000 / 30;

/**
 * A lightweight twinkling star canvas. It twinkles once the intro has
 * played (the preloader covers it until then) and pauses when off-screen.
 */
export default function Starfield({
  className,
  density = 1.4,
  fadeTo = 1,
  seed = 11,
}: StarfieldProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const found = ref.current;
    const context = found?.getContext("2d");
    if (!found || !context) return;
    // re-bound after the check: narrowing does not reach the hoisted
    // function declarations below, but these consts are non-null by type
    const canvas = found;
    const ctx = context;

    // stars grouped by hue, so each group sets its fill once per frame
    let groups: Star[][] = [];
    let w = 0;
    let h = 0;
    let raf = 0;
    let last = Number.NEGATIVE_INFINITY;
    let visible = true;
    // hidden behind something opaque (see lib/sky): no need to twinkle
    let covered = skyCovered();
    let started = false;
    const still = prefersReducedMotion();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function build() {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const rand = mulberry32(seed);
      const count = Math.round(((w * h) / 10000) * density);
      groups = HUES.map(() => []);
      for (let i = 0; i < count; i++) {
        // bias toward the top of the sky
        const y = rand() ** 1.6 * h * fadeTo;
        const star: Star = {
          x: rand() * w,
          y,
          r: rand() < 0.08 ? 1.1 + rand() * 0.8 : 0.35 + rand() * 0.7,
          base: (0.35 + rand() * 0.65) * (1 - (y / (h * fadeTo)) * 0.8),
          speed: 0.4 + rand() * 1.6,
          phase: rand() * Math.PI * 2,
        };
        groups[Math.floor(rand() * HUES.length)].push(star);
      }
    }

    function draw(t: number) {
      ctx.clearRect(0, 0, w, h);
      groups.forEach((stars, i) => {
        ctx.fillStyle = FILLS[i];
        for (const s of stars) {
          const tw = still
            ? 1
            : 0.6 + 0.4 * Math.sin(t * 0.001 * s.speed + s.phase);
          const a = s.base * tw;
          ctx.globalAlpha = a;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
          ctx.fill();
          if (s.r > 1.1) {
            ctx.globalAlpha = a * 0.15;
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r * 3.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      });
      ctx.globalAlpha = 1;
    }

    function loop(t: number) {
      if (t - last >= FRAME_MS - 1) {
        last = t;
        draw(t);
      }
      if (visible && !covered) raf = requestAnimationFrame(loop);
    }

    // (re)starts the loop; cancelling first means two loops never run
    function play() {
      if (still || !started || !visible || covered) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(loop);
    }

    build();
    draw(performance.now());
    const off = onIntro(() => {
      started = true;
      play();
    });

    const ro = new ResizeObserver(() => {
      build();
      draw(performance.now());
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      play();
    });
    io.observe(canvas);

    const offCover = onSkyCover((now) => {
      covered = now;
      if (covered) cancelAnimationFrame(raf);
      else play();
    });

    return () => {
      offCover();
      off();
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
