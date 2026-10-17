import { useRef } from "react";
import { KOREAN } from "@/data/content";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/** Official Seoul Metropolitan Subway line colours, Line 1–9. */
export const METRO_LINES: Record<number, { color: string; ink: string }> = {
  1: { color: "#0052a4", ink: "#ffffff" },
  2: { color: "#00a84d", ink: "#ffffff" },
  3: { color: "#ef7c1c", ink: "#ffffff" },
  4: { color: "#00a4e3", ink: "#ffffff" },
  5: { color: "#996cac", ink: "#ffffff" },
  6: { color: "#cd7c2f", ink: "#ffffff" },
  7: { color: "#747f00", ink: "#ffffff" },
  8: { color: "#e6186c", ink: "#ffffff" },
  9: { color: "#bdb092", ink: "#06071a" },
};

interface SectionHeadingProps {
  id: string;
  /** which Seoul Metro line this section rides (1–9) */
  index: number;
  title: string;
  /** optional italic serif tail, e.g. "in motion" */
  accent?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function SectionHeading({
  id,
  index,
  title,
  accent,
  className,
  children,
}: SectionHeadingProps) {
  const root = useRef<HTMLDivElement>(null);
  const line = METRO_LINES[index] ?? METRO_LINES[2];

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const split = SplitText.create(q(".sh-title")[0], {
        type: "lines,words",
        mask: "lines",
        linesClass: "sh-line",
      });
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top 82%" },
        defaults: { ease: "rise" },
      });
      tl.from(q(".sh-rule"), { scaleX: 0, duration: 1.4, ease: "seoul" }, 0)
        .from(
          q(".sh-meta"),
          { autoAlpha: 0, y: 14, duration: 0.8, stagger: 0.08 },
          0.1,
        )
        .from(
          split.words,
          { yPercent: 110, duration: 1.2, stagger: 0.06 },
          0.15,
        );
      const body = q(".sh-body");
      if (body.length)
        tl.from(body, { autoAlpha: 0, y: 24, duration: 1 }, 0.45);
      return () => split.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className={cn("relative", className)}>
      <div className="flex items-center gap-3 font-mono text-[11px] text-mist/55 uppercase tracking-[0.3em] sm:gap-4">
        <span className="sh-meta flex shrink-0 items-center gap-2.5">
          <span
            className="grid size-7 place-items-center rounded-full font-bold font-display text-sm tracking-normal shadow-[0_0_0_3px_rgb(6_7_26)]"
            style={{ background: line.color, color: line.ink }}
            aria-hidden="true"
          >
            {index}
          </span>
          <span className="font-kr font-semibold text-mist/85 text-xs tracking-[0.12em]">
            {index}호선
          </span>
          <span className="hidden text-mist/45 sm:inline">Line {index}</span>
        </span>
        <span
          className="sh-rule h-[3px] flex-1 origin-left rounded-full"
          style={{
            background: `linear-gradient(90deg, ${line.color} 0%, ${line.color}99 45%, transparent 100%)`,
          }}
        />
        <span className="sh-meta font-kr tracking-[0.2em]">{KOREAN[id]}</span>
      </div>
      <h2 className="sh-title mt-6 font-bold font-display text-[clamp(2.6rem,7vw,6.5rem)] leading-[0.95] tracking-[-0.035em]">
        {title}
        {accent && (
          <>
            {" "}
            <span className="font-normal font-serif text-peach italic tracking-[-0.01em]">
              {accent}
            </span>
          </>
        )}
      </h2>
      {children && <div className="sh-body mt-6">{children}</div>}
    </div>
  );
}
