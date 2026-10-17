import { type ReactNode, useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, withMotion } from "@/lib/gsap";

export interface Stop {
  key: string;
  /** small label above the station name, e.g. a date */
  when: string;
  /** station code shown in the marker, Seoul-Metro style (e.g. "201") */
  code: string;
  content: ReactNode;
}

interface MetroLineProps {
  color: string;
  stops: Stop[];
  /**
   * The station that isn't built yet. Drawn above the line like an extension
   * under construction on a Seoul Metro map: hollow station, dashed track.
   */
  next?: ReactNode;
}

/**
 * A vertical Seoul-Metro line map. The coloured track fills as you scroll
 * and each station lights up when the train reaches it.
 */
export default function MetroLine({ color, stops, next }: MetroLineProps) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const rail = q<HTMLElement>(".ml-rail")[0];
      const track = q<HTMLElement>(".ml-track")[0];

      // The rail runs exactly from the first station's centre to the last.
      function layout() {
        const dots = q<HTMLElement>(".ml-dot");
        if (!dots.length) return;
        const base = track.getBoundingClientRect().top;
        function centre(el: HTMLElement) {
          const r = el.getBoundingClientRect();
          return r.top + r.height / 2 - base;
        }
        const first = centre(dots[0]);
        const last = centre(dots[dots.length - 1]);
        rail.style.top = `${first}px`;
        rail.style.height = `${Math.max(0, last - first)}px`;
      }
      layout();
      ScrollTrigger.addEventListener("refreshInit", layout);
      let pending = 0;
      const ro = new ResizeObserver(() => {
        clearTimeout(pending);
        pending = window.setTimeout(() => {
          layout();
          ScrollTrigger.refresh();
        }, 120);
      });
      ro.observe(track);

      // With reduced motion, show the finished ride: the train at the end
      // of the line and every station lit.
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(q(".ml-train"), { top: "100%" });
        gsap.set(q(".ml-dot"), { backgroundColor: color });
        gsap.set(q(".ml-ping"), { autoAlpha: 0 });
      });
      const revertMotion = withMotion(() => {
        // Fill and train both ride the 60% line, so the train is always
        // exactly where the scroll is, and reaches each station as it lights.
        const ride = {
          trigger: rail,
          start: "top 60%",
          end: "bottom 60%",
          scrub: 0.4,
        };
        gsap.fromTo(
          q(".ml-fill"),
          { scaleY: 0 },
          { scaleY: 1, ease: "none", scrollTrigger: ride },
        );
        gsap.fromTo(
          q(".ml-train"),
          { top: "0%" },
          { top: "100%", ease: "none", scrollTrigger: { ...ride } },
        );
        gsap.from(q(".ml-next .ml-reveal"), {
          y: 40,
          autoAlpha: 0,
          duration: 1.2,
          ease: "rise",
          scrollTrigger: { trigger: q(".ml-next")[0], start: "top 85%" },
        });
        for (const stop of q<HTMLElement>(".ml-stop")) {
          const dot = stop.querySelector<HTMLElement>(".ml-dot");
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: dot,
              start: "center 60%",
              toggleActions: "play none none reverse",
            },
          });
          tl.to(dot, {
            scale: 1.25,
            backgroundColor: color,
            duration: 0.4,
            ease: "back.out(3)",
          })
            .to(dot, { scale: 1, duration: 0.3 })
            .fromTo(
              stop.querySelector(".ml-ping"),
              { scale: 0.6, autoAlpha: 0.8 },
              { scale: 2.6, autoAlpha: 0, duration: 1 },
              0,
            );
          gsap.from(stop.querySelectorAll(".ml-reveal"), {
            y: 60,
            autoAlpha: 0,
            duration: 1.2,
            stagger: 0.1,
            ease: "rise",
            scrollTrigger: { trigger: stop, start: "top 85%" },
          });
        }
      });

      return () => {
        revertMotion();
        mm.revert();
        ScrollTrigger.removeEventListener("refreshInit", layout);
        ro.disconnect();
        clearTimeout(pending);
      };
    },
    { scope: root },
  );

  return (
    <div ref={root} className="relative">
      {/* the extension under construction: the next stop */}
      {next && (
        <div className="ml-next grid grid-cols-[28px_1fr] gap-5 sm:gap-8">
          <div className="flex flex-col items-center">
            <span className="relative grid size-6 place-items-center">
              <span
                className="absolute inset-0 animate-ping rounded-full opacity-30 [animation-duration:2.4s]"
                style={{ background: color }}
              />
              <span
                className="relative size-6 rounded-full border-[3px] border-dashed bg-night-950"
                style={{ borderColor: color }}
              />
            </span>
            {/* dashed extension, running on under the first station's centre */}
            <span
              className="-mb-[18px] mt-2 w-[6px] flex-1 rounded-full opacity-55"
              style={{
                background: `repeating-linear-gradient(180deg, ${color} 0 10px, transparent 10px 18px)`,
              }}
            />
          </div>
          <div className="ml-reveal pb-16 sm:pb-24">{next}</div>
        </div>
      )}

      <div className="relative ml-track">
        {/* the rail: first station centre → last station centre (set in JS) */}
        <div className="-translate-x-1/2 absolute top-0 left-[14px] ml-rail h-0 w-[6px] rounded-full bg-white/[0.07]">
          <div
            className="absolute inset-0 ml-fill origin-top rounded-full"
            style={{ background: color, boxShadow: `0 0 24px ${color}` }}
          />
          <div
            className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 z-10 ml-train size-3 rounded-full bg-white"
            style={{ boxShadow: `0 0 0 4px ${color}, 0 0 24px 4px ${color}` }}
          />
        </div>

        <ol className="relative flex flex-col gap-16 sm:gap-24">
          {stops.map((s) => (
            <li
              key={s.key}
              className="relative ml-stop grid grid-cols-[28px_1fr] gap-5 sm:gap-8 lg:grid-cols-[28px_200px_1fr]"
            >
              <div className="relative flex justify-center pt-1.5">
                <span
                  className="absolute top-1.5 ml-ping size-6 rounded-full"
                  style={{ background: color }}
                />
                <span
                  className="relative ml-dot grid size-6 place-items-center rounded-full border-[5px] bg-night-950"
                  style={{ borderColor: color }}
                />
              </div>
              <div className="ml-reveal pt-[5px]">
                <span
                  className="inline-flex items-center gap-2 rounded-full border px-2.5 py-1 font-mono text-[11px] tracking-wider"
                  style={{ borderColor: `${color}66`, color }}
                >
                  {s.code}
                </span>
                <p className="mt-3 font-mono text-mist/60 text-xs uppercase tracking-[0.2em]">
                  {s.when}
                </p>
              </div>
              <div className="col-start-2 ml-reveal lg:col-start-3">
                {s.content}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
