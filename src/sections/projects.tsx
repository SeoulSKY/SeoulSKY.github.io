import { ArrowUpRight, Play } from "lucide-react";
import Image, { getImageProps } from "next/image";
import {
  Fragment,
  type ReactNode,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { GithubIcon } from "@/components/icons";
import SectionHeading from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GITHUB_URL, type Project, projects } from "@/data/content";
import { useMediaQuery } from "@/hooks/use-media-query";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { METRO_LINES } from "@/lib/metro";
import { cn } from "@/lib/utils";

/**
 * When the train rides the page scroll: a car fits on screen and motion is
 * allowed. Otherwise the train is a row you swipe. Keep in step with the
 * `ride` variant in globals.css.
 */
const RIDE = "(min-height: 40rem) and (prefers-reduced-motion: no-preference)";

/** Smallest the train is scaled to fit a screen, so its copy stays legible. */
const MIN_SCALE = 0.85;

/** Project media fills a car's first window. */
const MEDIA_SIZES = "(min-width: 1024px) 34rem, 26rem";

/**
 * A pane of black-tinted glass in a car's window, in the same light rubber
 * gasket as the windows in the doors: the bay's full width and `--pane`
 * tall, which the car works out (see ProjectCar) and the
 * windows in its doors share, so every window on the car's side lines up.
 * A sheen of platform light marks it as glass.
 */
const PANE =
  "pj-pane relative isolate h-(--pane) w-full overflow-hidden rounded-xl border-[3px] border-white/50 bg-[linear-gradient(155deg,rgb(244_240_255/0.16),transparent_32%),linear-gradient(335deg,rgb(244_240_255/0.06),transparent_25%)] bg-night-950 [clip-path:inset(0_round_0.75rem)]";

/**
 * A video poster cannot be an <Image>, so it takes the optimized URL
 * instead. A `fill` image's src is its largest size (3840px), so ask for a
 * fixed width: the widest pane (about 34rem) at 2x, or a phone's at 3x.
 */
function posterUrl(src: string): string {
  return getImageProps({ src, alt: "", width: 544, height: 340 }).props.src;
}

const LINE = METRO_LINES[4].color;

function ProjectMedia({ project }: { project: Project }) {
  const video = useRef<HTMLVideoElement>(null);
  // reduced motion: no autoplay; the poster shows and controls let you play
  const still = useMediaQuery("(prefers-reduced-motion: reduce)");
  // A video's poster and source wait until the section is about a screen
  // away, so the page does not fetch them on load, nor mid-ride. (The
  // section, not the video: the stage clips the cars, so a video only
  // counts as near once it is already on screen.)
  const [near, setNear] = useState(false);

  useEffect(() => {
    const section = video.current?.closest("section");
    if (!section) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "100% 0px" },
    );
    io.observe(section);
    return () => io.disconnect();
  }, []);

  // only play while on screen
  useEffect(() => {
    const el = video.current;
    if (!el || still || !near) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      el.pause();
    };
  }, [still, near]);

  return (
    // the picture shows through the glass at 16:10, as large as fits
    <div className={cn("[container-type:size]", PANE)}>
      <div className="pj-media absolute inset-0 m-auto aspect-16/10 w-[min(100cqw,160cqh)] overflow-hidden rounded-lg bg-night-800 [clip-path:inset(0_round_0.5rem)]">
        <div className="pj-media-inner absolute inset-0">
          {project.video ? (
            <video
              ref={video}
              className="h-full w-full object-cover"
              src={near ? project.video : undefined}
              poster={near ? posterUrl(project.image) : undefined}
              muted
              loop
              playsInline
              preload="none"
              controls={still}
              aria-label={`${project.title} preview`}
            />
          ) : (
            <Image
              src={project.image}
              alt={`${project.title} preview`}
              fill
              sizes={MEDIA_SIZES}
              className="object-cover"
            />
          )}
        </div>
        <div className="-inset-px pointer-events-none absolute bg-gradient-to-t from-night-950/50 via-transparent to-transparent" />
        <div className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-white/10 ring-inset" />
        {project.stat && (
          <span className="absolute bottom-3 left-3 rounded-full border border-white/15 bg-night-950/80 px-3 py-1 font-mono text-2xs text-peach uppercase tracking-wider sm:bottom-4 sm:left-4">
            {project.stat}
          </span>
        )}
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-white/10 ring-inset" />
    </div>
  );
}

/**
 * A bare tinted pane: what a window shows from a dark platform. It sits
 * across the doors from the picture's pane, at the same size, so the two
 * halves of the car mirror each other.
 */
function TintedGlass() {
  return (
    <div aria-hidden="true" className={cn(PANE)}>
      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-white/10 ring-inset" />
    </div>
  );
}

/**
 * The gangway between two carriages: a ribbed bellows that joins one
 * project's car to the next, so each car reads as one unit.
 */
function Gangway() {
  return (
    <div
      aria-hidden="true"
      className="relative my-3 w-6 shrink-0 self-stretch rounded-sm border-white/10 border-y bg-[repeating-linear-gradient(90deg,rgb(244_240_255/0.14)_0_2px,rgb(6_7_26/0.35)_2px_5px)] bg-night-700 lg:my-5 lg:w-8"
    />
  );
}

/**
 * A single-arm pantograph raised against the contact wire, as on the motor
 * cars: a base frame on red stacked insulators, the lower arm, the knee,
 * the upper arm and the pan head with its curved horns. It stands `--lift`
 * above the car body, where the overhead line hangs.
 */
function Pantograph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 60"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("absolute bottom-full h-(--lift)", className)}
      aria-hidden="true"
    >
      {/* red stacked insulators, the base frame and an equipment box */}
      {[16, 74].map((x) => (
        <g key={x}>
          {[0, 1, 2].map((disc) => (
            <rect
              key={disc}
              x={x - 4}
              y={47 + disc * 3.4}
              width={8}
              height={2.6}
              rx={1.2}
              fill="#a3402f"
            />
          ))}
        </g>
      ))}
      <rect
        x={6}
        y={42}
        width={82}
        height={5}
        rx={1.2}
        fill="rgb(244 240 255 / 0.5)"
      />
      <rect
        x={94}
        y={34}
        width={22}
        height={24}
        rx={1.5}
        fill="#5b5f86"
        stroke="rgb(244 240 255 / 0.3)"
      />
      {/* the arm: lower arm up to the knee, upper arm back to the head */}
      <path
        d="M22 42 L76 24 L50 6"
        stroke="rgb(244 240 255 / 0.75)"
        strokeWidth={3}
      />
      <path
        d="M30 42 L74 27"
        stroke="rgb(244 240 255 / 0.45)"
        strokeWidth={1.4}
      />
      <path
        d="M22 42 L30 34"
        stroke="rgb(244 240 255 / 0.55)"
        strokeWidth={2}
      />
      {/* the pan head, bowed down into horns at either end */}
      <path
        d="M24 8 Q26 1.2 33 1.2 L67 1.2 Q74 1.2 76 8"
        stroke="rgb(244 240 255 / 0.85)"
        strokeWidth={2.4}
      />
      <path
        d="M44 3 L50 6 L56 3"
        stroke="rgb(244 240 255 / 0.6)"
        strokeWidth={1.6}
      />
    </svg>
  );
}

/**
 * A bogie's size, in units of its wheel's diameter: wheels sit 2.2 apart
 * under a frame 3.6 long, and ride just under the floor, so the bogie hangs
 * 1.06 below the car body. `--wheel` sets the diameter, about a seventh of
 * the body's height.
 */
const BOGIE_LENGTH = 3.6;

/**
 * The ring of bolt holes on a wheel's disc, rounded so the prerendered
 * markup matches the browser's: Math.cos and Math.sin may differ in the
 * last digit between engines, which breaks hydration.
 */
const BOLT_HOLES = [0, 60, 120, 180, 240, 300].map((a) => {
  const t = (a * Math.PI) / 180;
  return [
    Math.round(26 * Math.cos(t) * 100) / 100,
    Math.round(26 * Math.sin(t) * 100) / 100,
  ];
});

/**
 * A solid disc wheel, as on a modern EMU: flange, tread, the brake disc and
 * a ring of bolt holes, which show it turning.
 */
function Wheel({ className }: { className?: string }) {
  return (
    <svg
      viewBox="-50 -50 100 100"
      className={cn(
        "pj-wheel absolute top-[5.66%] h-[94.34%] w-[27.78%]",
        className,
      )}
      aria-hidden="true"
    >
      <circle
        r={49}
        fill="#1b1d3f"
        stroke="rgb(244 240 255 / 0.4)"
        strokeWidth={2}
      />
      <circle
        r={43}
        fill="#2a2d57"
        stroke="rgb(244 240 255 / 0.18)"
        strokeWidth={1.5}
      />
      <circle
        r={33}
        stroke="rgb(244 240 255 / 0.12)"
        strokeWidth={1.2}
        fill="none"
      />
      {BOLT_HOLES.map(([cx, cy]) => (
        <circle key={`${cx},${cy}`} cx={cx} cy={cy} r={3.6} fill="#14162f" />
      ))}
      <circle
        r={13}
        fill="#3a3d66"
        stroke="rgb(244 240 255 / 0.3)"
        strokeWidth={1.5}
      />
    </svg>
  );
}

/**
 * A bogie under each end of a car, side on: the side frame over the two
 * wheels, dipping between them, with the axle boxes on the wheel centres,
 * brake units at the treads, and the bolster and air spring that carry the
 * body. The frame is drawn over the wheels, which turn behind it.
 */
function Bogie({ className }: { className?: string }) {
  const frame = "#3a3d66";
  const edge = "rgb(244 240 255 / 0.28)";

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pj-bogie absolute top-full aspect-[360/106] w-[calc(var(--wheel)*3.6)]",
        className,
      )}
    >
      <Wheel className="left-[5.56%]" />
      <Wheel className="left-[66.67%]" />
      <svg
        viewBox="0 0 360 106"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        {/* air spring and bolster, up into the body */}
        <rect
          x={150}
          y={0}
          width={60}
          height={8}
          rx={3}
          fill="#23264d"
          stroke={edge}
        />
        <rect
          x={124}
          y={6}
          width={112}
          height={14}
          rx={3}
          fill={frame}
          stroke={edge}
        />
        {/* brake units against the treads */}
        {[116, 222].map((x) => (
          <rect
            key={x}
            x={x}
            y={43}
            width={22}
            height={30}
            rx={3}
            fill="#2c2f5a"
            stroke={edge}
          />
        ))}
        {/* the side frame, dipping between the axle boxes */}
        <path
          d="M30 21 H118 Q138 21 144 33 L150 43 H210 L216 33 Q222 21 242 21 H330 Q338 21 338 29 V37 Q338 43 330 43 H252 Q238 43 232 51 L226 61 H134 L128 51 Q122 43 108 43 H30 Q22 43 22 37 V29 Q22 21 30 21 Z"
          fill={frame}
          stroke={edge}
          strokeWidth={1.5}
        />
        {/* axle boxes on the wheel centres */}
        {[70, 290].map((cx) => (
          <g key={cx}>
            <rect
              x={cx - 18}
              y={39}
              width={36}
              height={34}
              rx={6}
              fill="#4a4e7a"
              stroke={edge}
              strokeWidth={1.5}
            />
            <circle
              cx={cx}
              cy={56}
              r={9}
              fill="#2c2f5a"
              stroke={edge}
              strokeWidth={1.2}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}

/** The car body's silver: brushed stainless with fine horizontal grooves. */
const STAINLESS =
  "[background:repeating-linear-gradient(180deg,transparent_0_15px,rgb(6_7_26/0.1)_15px_16px),linear-gradient(180deg,rgb(244_240_255/0.5),rgb(244_240_255/0.36)_55%,rgb(244_240_255/0.3)),var(--night-700)]";

/**
 * A pair of sliding doors in Line 4 livery, after the Korail EMUs that run
 * it: stainless leaves in a recessed frame, with a blue band down their
 * middle (sky blue around the windows, deep blue below) and a sky-blue cap
 * above, up to the roof line. The doors run down to the sill, below the
 * windows.
 */
function Door() {
  return (
    <div
      aria-hidden="true"
      className="-mt-3 lg:-mt-5 flex w-[clamp(8.5rem,13vw,12rem)] shrink-0 flex-col items-center"
    >
      <span className="pj-cap h-4 w-[62%] bg-line-4 lg:h-6" />
      <div className="relative w-full flex-1 rounded-t-md border-[rgb(6_7_26/0.35)] border-x-[3px] border-t-[3px] [background:linear-gradient(180deg,rgb(244_240_255/0.4),rgb(244_240_255/0.28)),var(--night-700)]">
        <span className="absolute inset-x-[19%] inset-y-0 bg-[linear-gradient(180deg,var(--line-4)_0_calc(var(--pane)+1rem),var(--line-4-door)_calc(var(--pane)+1rem))]" />
        {/* the seam where the two leaves meet */}
        <span className="-translate-x-1/2 absolute inset-y-0 left-1/2 w-0.75 bg-night-950/70" />
        {/* each leaf's window, across the edge of the band, level with
            the panes in the car's windows (same top, same height) */}
        {["left-[11%]", "right-[11%]"].map((side) => (
          <span
            key={side}
            className={cn(
              "absolute top-1.5 h-(--pane) w-[30%] rounded-[0.7rem] border-[3px] border-white/50 bg-[linear-gradient(155deg,rgb(244_240_255/0.14),transparent_40%)] bg-night-950 lg:top-2",
              side,
            )}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * A window bay on the car's side: the window itself (a PANE of black glass
 * set in the silver body) over a panel mounted below it for the copy. Both
 * bays of a car are one `--side` wide, so the doors sit centred between
 * them; on the first and last cars the cab adds its length at the end. Its
 * border is invisible but kept, so the panes stay level with the windows
 * in the doors.
 */
function Window({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "pj-window relative mb-6 flex w-(--side) shrink-0 snap-start flex-col border-[3px] border-transparent lg:mb-8",
        className,
      )}
    >
      {children}
    </div>
  );
}

/**
 * The nose of a cab car, side on, after the Korail Line 4 EMUs: a smooth cap
 * that sweeps down from the roof and leans forward to its foot, with a
 * sliver of the black front glass and its line-colour edge at the tip, the
 * headlight (or tail light) low on the front, and the skirt and coupler
 * below. It draws in a stretched viewBox to fit any car height, so its
 * strokes keep their width (non-scaling) and the lights sit in percentages.
 */
function Nose({ rear = false }: { rear?: boolean }) {
  const id = useId();

  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative w-[6.5rem] shrink-0 lg:w-[9.5rem]",
        rear && "-scale-x-100",
      )}
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        fill="none"
        className="absolute inset-0 h-full w-full overflow-visible"
        aria-hidden="true"
      >
        <defs>
          {/* the body's stainless, without its grooves: the cap is moulded */}
          <linearGradient id={`${id}-cap`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#8989a9" />
            <stop offset="0.55" stopColor="#6b6c90" />
            <stop offset="1" stopColor="#5e5f86" />
          </linearGradient>
        </defs>
        <path
          d="M101 0 L80 0 C42 0 13 13 6 40 L0 88 Q0 100 9 100 L101 100 Z"
          fill={`url(#${id}-cap)`}
        />
        <path
          d="M101 0 L80 0 C42 0 13 13 6 40 L0 88 Q0 100 9 100 L101 100"
          stroke="rgb(244 240 255 / 0.3)"
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
        />
        {/* the black front glass, wrapping round the tip */}
        <path
          d="M50 3 C28 4.5 13 14 7.6 38 L4.6 62 L13 62 L15.6 41 C20 23 31 12 54 7.5 Z"
          fill="#06071a"
        />
        <path
          d="M58 1.6 C30 2.6 11 13 6 38 L2.8 64"
          stroke={LINE}
          strokeWidth={3}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <span
        className={cn(
          "absolute top-[72%] left-[4%] h-2.5 w-[22%] rounded-full",
          rear ? "bg-dancheong" : "bg-mist",
        )}
      />
      {/* the skirt and coupler under the tip */}
      <span className="absolute top-full left-[10%] h-3.5 w-[70%] rounded-b-md border-white/10 border-x border-b bg-night-700" />
      <span className="-translate-x-1/3 absolute top-full left-0 mt-1 h-2 w-[22%] rounded-sm border border-white/15 bg-night-800" />
    </div>
  );
}

/**
 * The cab section of the body, behind the nose: the driver's door, about
 * one door leaf wide, with its window and grab handle.
 */
function Cab({ rear = false }: { rear?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "-mt-3 lg:-mt-5 relative w-(--cab) shrink-0",
        rear ? "-mr-3 lg:-mr-5" : "-ml-3 lg:-ml-5",
      )}
    >
      <span
        className={cn(
          "absolute top-4 bottom-0 w-[68%] rounded-t-lg border-2 border-night-950/35 border-b-0 bg-mist/10 lg:top-6",
          rear ? "left-1.5" : "right-1.5",
        )}
      >
        <span className="absolute inset-x-[18%] top-[7px] h-(--pane) rounded-md border-2 border-night-950/70 bg-[linear-gradient(155deg,rgb(244_240_255/0.14),transparent_40%)] bg-night-950 lg:top-[9px]" />
        <span
          className={cn(
            "absolute top-[56%] h-6 w-1 rounded-full bg-night-950/45",
            rear ? "right-1.5" : "left-1.5",
          )}
        />
      </span>
    </div>
  );
}

function ProjectCar({ project, index }: { project: Project; index: number }) {
  const front = index === 0;
  const rear = index === projects.length - 1;
  // the motor cars, which draw power through a pantograph
  const motor = index === 1 || index === 4;

  return (
    <div className="pj-car relative flex shrink-0">
      {/* roof line and its long air-conditioning unit */}
      <span
        aria-hidden="true"
        className={cn(
          "-top-2 absolute h-2 rounded-t-lg bg-mist/45",
          front ? "left-[8%]" : "left-[2%]",
          rear ? "right-[8%]" : "right-[2%]",
        )}
      />
      <span
        aria-hidden="true"
        className={cn(
          "-top-5 absolute h-3.5 w-[34%] rounded-t-md bg-[repeating-linear-gradient(90deg,rgb(6_7_26/0.18)_0_1px,transparent_1px_7px)] bg-mist/55",
          front ? "left-[30%]" : motor ? "left-[10%]" : "left-[20%]",
        )}
      />
      {motor && <Pantograph className="left-[54%]" />}
      {/* the cab cars carry one close to the cab, mirrored at the rear */}
      {front && <Pantograph className="left-[13%]" />}
      {rear && <Pantograph className="-scale-x-100 right-[13%]" />}
      {/* equipment boxes slung under the floor between the bogies */}
      <span
        aria-hidden="true"
        className="absolute top-full left-[36%] h-4 w-[12%] rounded-b-sm border-white/10 border-x border-b bg-night-700"
      />
      <span
        aria-hidden="true"
        className="absolute top-full right-[36%] h-3 w-[10%] rounded-b-sm border-white/10 border-x border-b bg-night-700"
      />
      <Bogie
        className={front ? "left-[9%] lg:left-[10%]" : "left-[4%] lg:left-[6%]"}
      />
      <Bogie
        className={
          rear ? "right-[9%] lg:right-[10%]" : "right-[4%] lg:right-[6%]"
        }
      />
      {front && <Nose />}
      <article
        className={cn(
          // --pane: the height of every window on the car's side. Riding,
          // the fit in Projects sets it to half the door (--pane-ride).
          // Otherwise (the swipe row, and before the fit runs) it is about
          // half (0.82 of --rest, the car's taller half less its pane),
          // less on screens too short for that.
          "pj-panel relative flex items-stretch gap-3 overflow-clip rounded-[1.25rem] border border-white/30 px-3 pt-3 [--cab:4.5rem] [--pane:var(--pane-ride,min(calc(var(--rest)*0.82),clamp(5rem,calc(100svh-5rem-var(--lift)-var(--wheel)*1.06-var(--rest)),26rem)))] [--rest:22rem] [--side:min(calc(100vw-2.5rem),26rem)] lg:gap-5 lg:px-5 lg:pt-5 lg:[--cab:6rem] lg:[--side:clamp(28rem,36vw,36rem)]",
          STAINLESS,
          // the nose carries on from a cab car's open end
          front && "rounded-l-none border-l-0",
          rear && "rounded-r-none border-r-0",
        )}
      >
        {front && <Cab />}
        <Window className="p-2.5 lg:p-3">
          <ProjectMedia project={project} />
          <div className="pj-reveal glass mt-3 flex-1 rounded-xl px-4 pt-4 pb-4 lg:mt-4 lg:px-6 lg:pt-6 lg:pb-6">
            <p className="flex items-center gap-3 font-mono text-mist/45 text-xs tracking-eyebrow">
              <span
                className="rounded-sm px-1.5 py-0.5 font-semibold text-3xs text-white tracking-label"
                style={{ background: LINE }}
              >
                CAR {String(index + 1).padStart(2, "0")}
              </span>
              <span>/ {String(projects.length).padStart(2, "0")}</span>
            </p>
            <h3 className="mt-3 font-bold font-display text-4xl tracking-[-0.03em] sm:text-5xl lg:text-6xl">
              {project.title}
            </h3>
            <p className="mt-2 font-serif text-lg text-peach italic leading-snug sm:text-xl lg:text-2xl">
              {project.subtitle}
            </p>
          </div>
        </Window>
        <Door />
        <Window className="p-2.5 lg:p-3">
          <TintedGlass />
          <div className="pj-reveal glass mt-3 flex-1 rounded-xl px-4 pt-4 pb-4 lg:mt-4 lg:px-6 lg:pt-6 lg:pb-6">
            <p className="text-body text-mist/70 leading-relaxed">
              {project.description}
            </p>
            <ul className="mt-5 flex flex-wrap gap-2 lg:mt-6">
              {project.tags.map((tag) => (
                <li key={tag}>
                  <Badge variant="outline">{tag}</Badge>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3 lg:mt-8">
              {project.sourceCodeLink && (
                <Button asChild variant="outline">
                  <a
                    href={project.sourceCodeLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <GithubIcon />
                    Source
                  </a>
                </Button>
              )}
              {project.playLink && (
                <Button asChild>
                  <a href={project.playLink} target="_blank" rel="noreferrer">
                    <Play />
                    Try it live
                  </a>
                </Button>
              )}
            </div>
          </div>
        </Window>
        {rear && <Cab rear />}
      </article>
      {rear && <Nose rear />}
    </div>
  );
}

export default function Projects() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add(
        { ride: RIDE, fine: "(hover: hover) and (pointer: fine)" },
        (ctx) => {
          const { ride, fine } = ctx.conditions as Record<string, boolean>;
          if (!ride) return;
          const pin = q(".pj-pin")[0] as HTMLElement;
          const stage = q(".pj-stage")[0] as HTMLElement;
          const track = q(".pj-track")[0] as HTMLElement;
          const wheels = q(".pj-wheel");
          const bogie = q(".pj-bogie")[0] as HTMLElement;
          const box = q(".pj-scale")[0] as HTMLElement;
          const car = q(".pj-panel")[0] as HTMLElement;
          const pane = q(".pj-pane")[0] as HTMLElement;
          const cap = q(".pj-cap")[0] as HTMLElement;

          // The windows are half the door, as on the real car. The door
          // runs the car's height, which is the pane plus the rest of the
          // car (the copy below it), so the pane matches that rest, less
          // the door's cap. If the train is then taller than the stage, it
          // all scales down together (s), proportions intact; below
          // MIN_SCALE the copy would get too small, so the panes give up
          // height instead.
          let s = 1;
          function fitTrain() {
            gsap.set(box, { scale: 1, width: "" });
            const rest = car.offsetHeight - pane.offsetHeight;
            const half = Math.max(80, rest - cap.offsetHeight);
            const cs = getComputedStyle(track);
            const lift = parseFloat(cs.paddingTop);
            const under = parseFloat(cs.paddingBottom);
            // the stage below the navbar, less the messenger wire, which hangs
            // above the block, and a little air under the rail
            const room =
              stage.clientHeight -
              parseFloat(getComputedStyle(stage).paddingTop) -
              24;
            let p = half;
            s = Math.min(1, room / (lift + p + rest + under));
            if (s < MIN_SCALE) {
              s = MIN_SCALE;
              p = Math.max(80, room / s - lift - rest - under);
            }
            track.style.setProperty("--pane-ride", `${p}px`);
            // scaled from its left edge, and widened to match, so the line
            // and rail still span the stage
            gsap.set(box, {
              scale: s,
              transformOrigin: "0% 50%",
              width: `${100 / s}%`,
            });
          }
          fitTrain();
          ScrollTrigger.addEventListener("refreshInit", fitTrain);
          // the wheel's radius in px, from its bogie (wheels are 1 / 3.6 of
          // its length); measured on refresh, never per frame
          let radius = 1;
          function measureWheel() {
            radius = bogie.offsetWidth / BOGIE_LENGTH / 2 || 1;
          }
          measureWheel();
          ScrollTrigger.addEventListener("refresh", measureWheel);
          gsap.set(wheels, { transformOrigin: "50% 50%" });

          // Each bogie's span along the track, measured on refresh, so a
          // frame works out which are on screen from data alone and turns
          // only their wheels, through quick setters (gsap.set would build a
          // tween for every wheel, every frame).
          const bogies = q<HTMLElement>(".pj-bogie").map((el) => ({
            el,
            from: 0,
            to: 0,
            turn: [...el.querySelectorAll(".pj-wheel")].map((w) =>
              gsap.quickSetter(w, "rotation", "deg"),
            ),
          }));
          function measureBogies() {
            for (const b of bogies) {
              const car = b.el.offsetParent as HTMLElement;
              b.from = car.offsetLeft + b.el.offsetLeft;
              b.to = b.from + b.el.offsetWidth;
            }
          }
          measureBogies();
          ScrollTrigger.addEventListener("refresh", measureBogies);
          // Stop when the GitHub card's right edge meets the page gutter
          // (measured from the card, not scrollWidth: the rail overhangs).
          const more = q(".pj-more")[0] as HTMLElement;
          function distance() {
            const gutter = parseFloat(getComputedStyle(track).paddingLeft);
            return Math.max(
              0,
              more.offsetLeft +
                more.offsetWidth +
                gutter -
                window.innerWidth / s,
            );
          }

          // Touch screens scroll natively, so the stage sticks with CSS while
          // the page scrolls past it, and the wrapper is made as tall as the
          // ride. ScrollSmoother leaves `sticky` nothing to stick to, so fine
          // pointers pin the stage instead.
          function fitRide() {
            pin.style.height = `${stage.offsetHeight + distance() * s}px`;
          }
          if (!fine) {
            fitRide();
            ScrollTrigger.addEventListener("refreshInit", fitRide);
          }

          const scroller = gsap.to(track, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: fine
              ? {
                  trigger: stage,
                  start: "top top",
                  end: () => `+=${distance() * s}`,
                  pin: true,
                  scrub: 1,
                  invalidateOnRefresh: true,
                  anticipatePin: 1,
                }
              : {
                  trigger: pin,
                  start: "top top",
                  end: "bottom bottom",
                  scrub: true,
                  invalidateOnRefresh: true,
                },
            // the cars roll: each wheel turns by distance / radius
            onUpdate: () => {
              const x = gsap.getProperty(track, "x") as number;
              const deg = (x / radius) * (180 / Math.PI);
              // the stage's width in the track's own px
              const view = window.innerWidth / s;
              for (const b of bogies) {
                if (b.to + x < 0 || b.from + x > view) continue;
                for (const turn of b.turn) turn(deg);
              }
            },
          });

          // inner parallax per car, driven by the horizontal tween
          for (const media of q<HTMLElement>(".pj-media-inner")) {
            gsap.fromTo(
              media,
              { xPercent: -8, scale: 1.18 },
              {
                xPercent: 8,
                scale: 1.18,
                ease: "none",
                scrollTrigger: {
                  trigger: media.parentElement,
                  containerAnimation: scroller,
                  start: "left right",
                  end: "right left",
                  scrub: true,
                },
              },
            );
          }
          // the copy slides in as its window comes past
          for (const group of q<HTMLElement>(".pj-reveal, .pj-more .pj-info")) {
            const end = group.classList.contains("pj-info");
            gsap.from(group.children, {
              x: 120,
              autoAlpha: 0,
              stagger: 0.06,
              ease: "power2.out",
              scrollTrigger: {
                trigger: group,
                containerAnimation: scroller,
                // the GitHub card comes to rest at the far gutter, so its
                // reveal must finish before then
                start: end ? "left 100%" : "left 95%",
                end: end ? "left 72%" : "left 50%",
                scrub: true,
              },
            });
          }

          return () => {
            ScrollTrigger.removeEventListener("refreshInit", fitRide);
            ScrollTrigger.removeEventListener("refreshInit", fitTrain);
            track.style.removeProperty("--pane-ride");
            ScrollTrigger.removeEventListener("refresh", measureWheel);
            ScrollTrigger.removeEventListener("refresh", measureBogies);
            pin.style.height = "";
          };
        },
      );

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="projects"
      className="relative py-28 ride:pb-0 sm:py-40"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        <SectionHeading
          id="projects"
          index={4}
          title="Selected"
          accent="projects"
        >
          <p className="max-w-xl text-lg text-mist/65 leading-relaxed">
            A few things I’ve built: a Python library, a Discord bot, games and
            web apps.
          </p>
        </SectionHeading>
      </div>

      <div className="pj-pin relative mt-12 ride:mt-0 sm:mt-16">
        <div className="pj-stage ride:sticky ride:top-0 ride:flex ride:h-svh ride:flex-col ride:justify-center ride:overflow-hidden ride:pt-20">
          {/* --lift: how far the pantographs stand above the car body, which
              is where the overhead line hangs. --above: the room above the
              cars, which holds the line: riding, it is part of the block the
              stage centres below the navbar; swiping, it also keeps the
              row's clipping off the roof. */}
          <div className="pj-scale relative [--above:5rem] [--lift:3.5rem] ride:[--above:var(--lift)] lg:[--lift:clamp(3.5rem,9svh,5rem)]">
            {/* the overhead line: a contact wire hung from a messenger wire
                by droppers. Like the rail, it stays put and reads as still. */}
            <span
              aria-hidden="true"
              className="-translate-y-full pointer-events-none absolute inset-x-0 top-[calc(var(--above)-var(--lift))] h-3 border-mist/45 border-t border-t-mist/20 border-b bg-[repeating-linear-gradient(90deg,rgb(244_240_255/0.2)_0_1px,transparent_1px_5.5rem)]"
            />
            {/* the rail the train runs on: it stays put while the cars move,
                and it is uniform, so it reads as still. It is drawn over the
                wheels, whose flanges run behind the railhead. */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-0.75 bg-[linear-gradient(180deg,rgb(244_240_255/0.38),rgb(244_240_255/0.12))] shadow-[0_6px_18px_rgb(168_155_219/0.18)]"
            />
            {/* riding, the scroll drives the track; otherwise it is a row
                you swipe, which stops at each window */}
            <div className="ride:snap-none snap-x snap-mandatory scroll-px-5 ride:overflow-visible overflow-x-auto overscroll-x-contain pt-12 ride:pt-0 [scrollbar-width:none] sm:scroll-px-10 [&::-webkit-scrollbar]:hidden">
              <div className="pj-track relative flex w-max items-stretch px-5 pt-8 ride:pt-(--lift) pb-[calc(var(--wheel)*1.06)] [--wheel:3.75rem] sm:px-10 lg:pl-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))] lg:[--wheel:clamp(3.75rem,9.8svh,5.5rem)]">
                {projects.map((p, i) => (
                  <Fragment key={p.title}>
                    {i > 0 && <Gangway />}
                    <ProjectCar project={p} index={i} />
                  </Fragment>
                ))}
                <div className="w-10 shrink-0 lg:w-[8vw]" />
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="pj-more group relative flex aspect-square w-[72vw] max-w-sm shrink-0 snap-start flex-col justify-between self-center overflow-hidden rounded-4xl border border-white/10 p-6 transition-colors hover:border-peach/50 sm:p-8 lg:w-104"
                >
                  <span className="font-mono text-mist/45 text-xs tracking-eyebrow">
                    MORE
                  </span>
                  <span className="pj-info">
                    <span className="block font-bold font-display text-4xl tracking-tight sm:text-5xl">
                      Everything else
                    </span>
                    <span className="mt-2 block font-serif text-2xl text-peach italic">
                      lives on GitHub
                    </span>
                  </span>
                  <span className="grid size-14 place-items-center self-end rounded-full bg-peach text-night-950 transition-transform duration-500 group-hover:rotate-45">
                    <ArrowUpRight className="size-6" />
                  </span>
                  {/* the dusk glow: a radial gradient, not a blur filter, which would be
                      redrawn as the card moves */}
                  <span className="-right-32 -bottom-32 absolute size-96 rounded-full bg-[radial-gradient(closest-side,rgb(244_167_185/0.22),transparent)] transition-transform duration-700 group-hover:scale-150" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
