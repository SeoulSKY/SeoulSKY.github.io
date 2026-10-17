import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import {
  CityLayer,
  MountainLayer,
  NARROW_VIEWBOX,
  WIDE_VIEWBOX,
} from "@/components/seoul/skyline";
import Starfield from "@/components/seoul/starfield";
import { Button } from "@/components/ui/button";
import { heroTaglines } from "@/data/content";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  gsap,
  isFinePointer,
  prefersReducedMotion,
  SplitText,
  scrollToSection,
  useGSAP,
} from "@/lib/gsap";
import { introStarted, onIntro, registerTimeline } from "@/lib/intro";

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const narrow = useMediaQuery("(max-width: 639px)");
  const viewBox = narrow ? NARROW_VIEWBOX : WIDE_VIEWBOX;

  useGSAP(
    (_, contextSafe) => {
      const q = gsap.utils.selector(root);
      const reduce = prefersReducedMotion();

      const split = SplitText.create(q(".hero-title")[0], {
        type: "chars",
        charsClass: "hero-char",
      });

      const originOf = (el: Element) =>
        (el as SVGElement).dataset.origin ?? "0 0";

      /* ── initial (pre-curtain) state ─────────────────────── */
      gsap.set(q(".hero-night"), { autoAlpha: 1 });
      gsap.set(q(".hero-stars, .hero-moon, .hero-cloud"), { autoAlpha: 0 });
      gsap.set(q(".sk-ridge"), { y: 160 });
      gsap.set(q(".sk-water, .sk-horizon"), { autoAlpha: 0 });
      gsap.set(split.chars, {
        yPercent: 115,
        rotateX: -75,
        autoAlpha: 0,
        transformOrigin: "50% 100% -40",
      });
      gsap.set(q(".hero-hello, .hero-eyebrow"), { autoAlpha: 0, y: 24 });
      gsap.set(q(".sk-bldg, .sk-63"), {
        scaleY: 0,
        svgOrigin: (_i: number, el: Element) => originOf(el),
      });
      gsap.set(q(".sk-namsan"), { y: 140 });
      gsap.set(q(".sk-ntower"), {
        scaleY: 0,
        svgOrigin: (_i: number, el: Element) => originOf(el),
      });
      gsap.set(q(".sk-lotte-body, .sk-lotte-sheen"), { autoAlpha: 0 });
      gsap.set(q(".sk-lotte-outline"), { drawSVG: "50% 50%" });
      gsap.set(q(".sk-glow, .sk-beacon"), { autoAlpha: 0 });
      gsap.set(q(".sk-palace-part"), { y: 50, autoAlpha: 0 });
      gsap.set(q(".sk-win, .sk-lantern, .sk-riverlights circle"), {
        autoAlpha: 0,
      });
      gsap.set(q(".sk-reflection"), { autoAlpha: 0 });
      gsap.set(q(".sk-glint"), {
        scaleX: 0,
        transformOrigin: "50% 50%",
      });
      gsap.set(q(".sk-label-line"), { drawSVG: "0%" });
      gsap.set(q(".sk-label-text, .sk-label-dot"), { autoAlpha: 0 });
      gsap.set(q(".hero-reveal"), { autoAlpha: 0, y: 30 });

      /* ── the entrance ────────────────────────────────────── */
      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "rise" },
        onComplete: () => startLoops(),
      });

      tl.to(
        q(".hero-night"),
        { autoAlpha: 0, duration: 2.6, ease: "power2.inOut" },
        0,
      )
        .to(q(".sk-water, .sk-horizon"), { autoAlpha: 1, duration: 2 }, 0.1)
        .to(q(".hero-stars"), { autoAlpha: 1, duration: 2.4 }, 0.2)
        .fromTo(
          q(".hero-moon"),
          { autoAlpha: 0, y: 40, scale: 0.8 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 2.2 },
          0.4,
        )
        .to(
          q(".hero-cloud"),
          { autoAlpha: 1, duration: 2.5, stagger: 0.2 },
          0.6,
        )
        .to(q(".sk-ridge"), { y: 0, duration: 1.8, stagger: 0.18 }, 0.15)
        .to(q(".hero-eyebrow"), { autoAlpha: 1, y: 0, duration: 1 }, 0.35)
        .to(
          q(".hero-eyebrow-coords"),
          {
            duration: 1.4,
            scrambleText: {
              text: "37.5665°N  126.9780°E",
              chars: "0123456789°.NE",
              speed: 0.6,
            },
          },
          0.4,
        )
        .to(q(".hero-hello"), { autoAlpha: 1, y: 0, duration: 1.2 }, 0.45)
        .to(
          split.chars,
          {
            yPercent: 0,
            rotateX: 0,
            autoAlpha: 1,
            duration: 1.5,
            stagger: { each: 0.06, from: "start" },
            ease: "expo.out",
          },
          0.5,
        )
        .to(
          q(".sk-city-back .sk-bldg"),
          {
            scaleY: 1,
            duration: 1.3,
            stagger: { amount: 0.9, from: "center" },
            ease: "expo.out",
          },
          0.8,
        )
        .to(q(".sk-namsan"), { y: 0, duration: 1.6 }, 0.9)
        .to(
          q(".sk-ntower"),
          { scaleY: 1, duration: 1.4, ease: "back.out(1.3)" },
          1.25,
        )
        .to(
          q(".sk-lotte .sk-beacon, .sk-lotte .sk-glow"),
          { autoAlpha: 1, duration: 0.4 },
          1.0,
        )
        .to(
          q(".sk-lotte-outline"),
          { drawSVG: "0% 100%", duration: 1.8, ease: "power2.inOut" },
          1.05,
        )
        .to(
          q(".sk-lotte-body"),
          { autoAlpha: 1, duration: 1.2, ease: "power1.out" },
          1.9,
        )
        .to(q(".sk-lotte-sheen"), { autoAlpha: 1, duration: 1.4 }, 2.3)
        .to(q(".sk-lotte-outline"), { opacity: 0.35, duration: 1 }, 2.6)
        .to(q(".sk-63"), { scaleY: 1, duration: 1.4, ease: "expo.out" }, 1.2)
        .to(
          q(".sk-city-front .sk-bldg"),
          {
            scaleY: 1,
            duration: 1.2,
            stagger: { amount: 0.8, from: "edges" },
            ease: "expo.out",
          },
          1.15,
        )
        .to(
          q(".sk-palace-part"),
          { y: 0, autoAlpha: 1, duration: 1.3, stagger: 0.12 },
          1.5,
        )
        .to(
          q(".sk-ntower .sk-beacon, .sk-ntower .sk-glow"),
          { autoAlpha: 1, duration: 0.4 },
          2.3,
        )
        .to(
          q(".sk-win"),
          {
            autoAlpha: 1,
            duration: 0.25,
            stagger: { amount: 1.6, from: "random" },
            ease: "none",
          },
          2.0,
        )
        .to(
          q(".sk-lantern"),
          {
            autoAlpha: 0.55,
            duration: 0.8,
            stagger: { amount: 0.6, from: "center" },
          },
          2.4,
        )
        .to(
          q(".sk-riverlights circle"),
          {
            autoAlpha: 1,
            duration: 0.3,
            stagger: { amount: 0.8, from: "center" },
          },
          2.4,
        )
        .to(q(".sk-reflection"), { autoAlpha: 1, duration: 2 }, 2.2)
        .to(q(".sk-glint"), { scaleX: 1, duration: 1.4, stagger: 0.08 }, 2.6)
        .to(
          q(".sk-label-line"),
          {
            drawSVG: "100%",
            duration: 0.9,
            stagger: 0.18,
            ease: "power2.inOut",
          },
          2.6,
        )
        .to(
          q(".sk-label-text, .sk-label-dot"),
          { autoAlpha: 1, duration: 0.6, stagger: 0.06 },
          3.0,
        )
        .to(
          q(".hero-reveal"),
          { autoAlpha: 1, y: 0, duration: 1.1, stagger: 0.12 },
          2.4,
        )
        .add(() => startTyping(), 2.6);

      /* ── ambient loops (start once the city is lit) ──────── */
      let looping = false;
      function startLoops() {
        if (reduce || looping) return;
        looping = true;
        gsap.to(q(".sk-beacon"), {
          autoAlpha: 0.15,
          duration: 0.9,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: 0.4,
        });
        gsap.to(q(".sk-glow"), {
          scale: 1.4,
          autoAlpha: 0.4,
          transformOrigin: "50% 50%",
          duration: 1.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
        gsap.to(q(".sk-glint"), {
          scaleX: () => gsap.utils.random(0.3, 1.3),
          opacity: () => gsap.utils.random(0.15, 0.7),
          duration: () => gsap.utils.random(1.2, 2.6),
          repeat: -1,
          repeatRefresh: true,
          yoyo: true,
          ease: "sine.inOut",
        });
        gsap.to(q(".sk-lantern"), {
          opacity: () => gsap.utils.random(0.4, 0.7),
          duration: () => gsap.utils.random(0.3, 1.2),
          repeat: -1,
          repeatRefresh: true,
          ease: "sine.inOut",
        });
        gsap.to(q(".sk-ripple-offset"), {
          attr: { dy: 400 },
          duration: 22,
          repeat: -1,
          ease: "none",
        });
        gsap.to(q(".hero-cloud"), {
          xPercent: (i: number) => (i % 2 ? -18 : 14),
          duration: (i: number) => 40 + i * 12,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
        // a few windows switch on/off, like a living city
        const wins = q(".sk-win");
        gsap.delayedCall(1, function flicker() {
          const w = wins[Math.floor(Math.random() * wins.length)];
          if (w)
            gsap.to(w, {
              autoAlpha: Math.random() < 0.5 ? 0 : 1,
              duration: 0.2,
            });
          gsap.delayedCall(gsap.utils.random(0.15, 0.6), flicker);
        });
        shootingStars();
      }

      let typed = false;
      function startTyping() {
        const el = q(".hero-typed")[0];
        if (!el || typed) return;
        typed = true;
        if (reduce) {
          el.textContent = heroTaglines[0];
          return;
        }
        const typing = gsap.timeline({ repeat: -1 });
        for (const line of heroTaglines) {
          typing
            .to(el, {
              text: { value: line },
              duration: line.length * 0.028,
              ease: "none",
            })
            .to({}, { duration: 3.2 })
            .to(el, {
              text: { value: "", rtl: true },
              duration: 0.7,
              ease: "none",
            })
            .to({}, { duration: 0.35 });
        }
      }

      function shootingStars() {
        const sky = q(".hero-shooting")[0] as HTMLElement | undefined;
        if (!sky) return;
        const spawn = () => {
          const star = document.createElement("span");
          star.className =
            "absolute h-px w-36 rounded-full bg-gradient-to-r from-transparent via-white/70 to-white";
          sky.appendChild(star);
          const startX = gsap.utils.random(0.35, 1.05) * sky.clientWidth;
          const startY = gsap.utils.random(0.02, 0.3) * sky.clientHeight;
          gsap.fromTo(
            star,
            { x: startX, y: startY, rotate: 155, autoAlpha: 0, scaleX: 0.3 },
            {
              keyframes: [
                { autoAlpha: 1, scaleX: 1, duration: 0.2 },
                {
                  x: startX - 420,
                  y: startY + 190,
                  duration: 0.9,
                  ease: "power1.in",
                },
                { autoAlpha: 0, duration: 0.2 },
              ],
              onComplete: () => star.remove(),
            },
          );
          gsap.delayedCall(gsap.utils.random(4, 9), spawn);
        };
        gsap.delayedCall(1.5, spawn);
      }

      let unsubscribe = () => {};
      if (reduce) {
        tl.progress(1);
      } else if (introStarted()) {
        // re-run after a breakpoint change: skip straight to the lit city
        tl.progress(1);
      } else {
        unsubscribe = onIntro(() => tl.play());
      }

      /* ── mouse parallax ──────────────────────────────────── */
      let removeMove = () => {};
      if (isFinePointer() && !reduce) {
        const layers = [
          { el: q(".hero-stars"), depth: 6 },
          { el: q(".hero-moon"), depth: 10 },
          { el: q(".layer-back svg"), depth: 12 },
          { el: q(".hero-title-wrap"), depth: 20 },
          { el: q(".layer-front svg"), depth: 30 },
        ].map(({ el, depth }) => ({
          x: gsap.quickTo(el, "x", { duration: 1.2, ease: "power3" }),
          y: gsap.quickTo(el, "y", { duration: 1.2, ease: "power3" }),
          depth,
        }));
        const onMove = contextSafe?.((e: PointerEvent) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          for (const l of layers) {
            l.x(-nx * l.depth);
            l.y(-ny * l.depth * 0.5);
          }
        });
        if (onMove) {
          window.addEventListener("pointermove", onMove);
          removeMove = () => window.removeEventListener("pointermove", onMove);
        }
      }

      /* ── scroll-out: the city sinks into night as you leave ── */
      if (!reduce) {
        const out = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
        out
          .to(
            q(".hero-title-block"),
            { yPercent: -60, scale: 1.08, autoAlpha: 0, ease: "none" },
            0,
          )
          .to(q(".layer-back"), { y: 140, ease: "none" }, 0)
          .to(q(".layer-front"), { y: 60, ease: "none" }, 0)
          .to(q(".hero-moon"), { y: 120, ease: "none" }, 0)
          .to(q(".hero-content"), { y: -80, autoAlpha: 0, ease: "none" }, 0)
          .to(q(".hero-dim"), { autoAlpha: 0.75, ease: "none" }, 0);
      }

      const unregister = registerTimeline("hero", tl);

      return () => {
        unregister();
        unsubscribe();
        removeMove();
        split.revert();
      };
    },
    { scope: root, dependencies: [narrow], revertOnUpdate: true },
  );

  return (
    <section
      ref={root}
      id="top"
      className="hero relative h-[100svh] min-h-[600px] w-full overflow-hidden"
    >
      {/* sky */}
      <div className="hero-sky absolute inset-0" />
      <div className="hero-sun absolute inset-x-0 bottom-0" />
      <Starfield
        className="hero-stars !h-[70%] absolute inset-x-0 top-0"
        density={2.2}
        fadeTo={0.95}
      />
      <div className="hero-shooting pointer-events-none absolute inset-0 overflow-hidden" />
      <div className="hero-moon absolute top-[13%] right-[9%] size-10 rounded-full sm:top-[15%] sm:size-14" />
      <div className="hero-cloud -left-[10%] absolute top-[30%] h-16 w-[55%] rounded-full" />
      <div className="hero-cloud absolute top-[44%] right-[-15%] h-12 w-[50%] rounded-full" />
      <div className="hero-cloud absolute top-[52%] left-[15%] h-8 w-[35%] rounded-full" />
      <div className="hero-night pointer-events-none absolute inset-0 bg-night-950" />

      {/* mountains + river */}
      <div className="layer-back scene-box pointer-events-none">
        <MountainLayer viewBox={viewBox} className="h-full w-full" />
      </div>

      {/* the name, tucked behind the skyline */}
      <div className="hero-title-block absolute inset-x-0 text-center">
        <div className="hero-title-wrap">
          <p className="hero-eyebrow mb-3 font-mono text-[10px] text-mist/70 uppercase tracking-[0.35em] sm:mb-5 sm:text-xs">
            <span className="font-kr text-peach tracking-[0.2em]">
              서울하늘
            </span>
            <span className="mx-3 inline-block h-px w-6 bg-mist/30 align-middle sm:w-10" />
            <span className="hero-eyebrow-coords tabular-nums">
              00.0000°N 000.0000°E
            </span>
          </p>
          <p className="hero-hello font-serif text-2xl text-mist/90 italic sm:text-4xl lg:text-5xl">
            Hi, I’m
          </p>
          <h1
            className="hero-title font-display font-extrabold leading-[0.85] tracking-[-0.045em]"
            style={{ perspective: "800px" }}
          >
            SeoulSKY
          </h1>
        </div>
      </div>

      {/* the city */}
      <div className="layer-front scene-box pointer-events-none">
        <CityLayer viewBox={viewBox} className="h-full w-full" />
      </div>
      <div className="hero-dim pointer-events-none absolute inset-0 bg-night-950 opacity-0" />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-night-950" />

      {/* on the water */}
      <div className="hero-content absolute inset-x-0 bottom-0 z-10 px-5 pb-6 sm:px-10 sm:pb-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
          <p className="hero-reveal min-h-[3.2em] max-w-md font-medium text-[15px] text-mist/90 leading-relaxed sm:min-h-[3.4em] sm:text-lg">
            <span className="hero-typed" />
            <span className="ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[0.18em] animate-pulse bg-peach" />
            <span className="sr-only">{heroTaglines.join(" ")}</span>
          </p>
          <div className="flex items-center gap-3">
            <Button
              className="hero-reveal"
              size="lg"
              onClick={() => scrollToSection("projects")}
            >
              View projects
              <ArrowDown />
            </Button>
            <Button
              className="hero-reveal"
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("contact")}
            >
              Get in touch
              <ArrowUpRight />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
