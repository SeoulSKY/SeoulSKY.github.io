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
import NightCity, { CITY_W } from "@/components/seoul/night-city";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GITHUB_URL, type Project, projects } from "@/data/content";
import { useMediaQuery } from "@/hooks/use-media-query";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { METRO_LINES } from "@/lib/metro";
import { mulberry32 } from "@/lib/random";
import { coverSky } from "@/lib/sky";
import { cn } from "@/lib/utils";

/**
 * When the train rides the page scroll: a car fits on screen and motion is
 * allowed. Otherwise the train is a row you swipe. Keep in step with the
 * `ride` variant in globals.css.
 */
const RIDE = "(min-height: 40rem) and (prefers-reduced-motion: no-preference)";

/**
 * The camera follows the train part way, so the world slides the other way:
 * for every px the cars move left on screen, the ground (masts, wire
 * droppers) moves WORLD px right, and the far city CITY px right.
 */
const WORLD = 0.6;
const CITY = 0.14;

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
  "pj-pane relative isolate h-(--pane) w-full overflow-hidden rounded-xl border-[3px] border-white/50 bg-[linear-gradient(155deg,rgb(244_240_255/0.16),transparent_32%),linear-gradient(335deg,rgb(244_240_255/0.06),transparent_25%)] [clip-path:inset(0_round_0.75rem)]";

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
    <div className={cn("bg-night-950 [container-type:size]", PANE)}>
      <div className="pj-media absolute inset-0 m-auto aspect-16/10 w-[min(100cqw,160cqh)] overflow-hidden rounded-lg bg-night-800 [clip-path:inset(0_round_0.5rem)]">
        <div className="pj-media-inner absolute inset-0 will-change-transform">
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
 * What a clear window shows: the city behind the train and the catenary
 * masts going by, lined up with the real ones around the train. A small
 * canvas, redrawn as the train moves from one bitmap of the city, so a
 * frame repaints only the canvas, not the window's details over it.
 */
function SeeThrough({ kind = "glass" }: { kind?: ViewKind }) {
  return (
    <canvas
      data-kind={kind}
      className="pj-see pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}

/**
 * What a canvas window shows: plain glass (the door leaves, the driver's
 * door), the far side seen through open doors, or the second window's view
 * into the lit car.
 */
type ViewKind = "glass" | "inside" | "car";

/** Hand straps along the grab rail, as a fraction of the window's width. */
const STRAPS = [0.16, 0.37, 0.58, 0.79];
/** How far each strap swings, relative to the others, so they don't move as one. */
const STRAP_SWAY = STRAPS.map((_, i) => 0.85 + ((i * 37) % 11) / 30);

/** The seats across the aisle, the last one a priority seat. */
const SEATS = ["seat", "seat", "seat", "seat", "priority"] as const;

/**
 * Paints the lit Line 4 car into a window's canvas, over the city already
 * drawn there: the far side's white walls framing its window, the LED strip
 * and sky-blue trim, the seat-end pole, the sky-blue bucket seats (a pink
 * priority seat at the end), the stainless grab bar and the hand straps,
 * swung by `angle` degrees. `w` and `h` are canvas px, `k` canvas px per
 * CSS px of the track. One canvas with nothing over it: DOM laid over a
 * canvas is pushed onto compositor layers of its own.
 */
function paintCarInside(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  k: number,
  angle: number,
) {
  paintCarRoom(ctx, w, h, k);
  paintStraps(ctx, w, h, angle);
}

/** The still part of the lit car: everything but the hand straps. */
function paintCarRoom(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  k: number,
) {
  const x0 = w * 0.08;
  const x1 = w * 0.92;
  const y0 = h * 0.24;
  const y1 = h * 0.64;
  let g = ctx.createLinearGradient(0, 0, 0, y0);
  g.addColorStop(0, "#dfe3ee");
  g.addColorStop(1, "#eef1f7");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, y0);
  ctx.fillStyle = "#e9ecf4";
  ctx.fillRect(0, y0, x0, h - y0);
  ctx.fillRect(x1, y0, w - x1, h - y0);
  g = ctx.createLinearGradient(0, y1, 0, h);
  g.addColorStop(0, "#eef1f7");
  g.addColorStop(1, "#dde2ec");
  ctx.fillStyle = g;
  ctx.fillRect(0, y1, w, h - y1);
  // the far window's gasket
  ctx.strokeStyle = "#b9bfcf";
  ctx.lineWidth = 3 * k;
  ctx.beginPath();
  ctx.roundRect(
    x0 + 1.5 * k,
    y0 + 1.5 * k,
    x1 - x0 - 3 * k,
    y1 - y0 - 3 * k,
    5 * k,
  );
  ctx.stroke();
  // the LED strip and its glow, and the sky-blue trim
  ctx.fillStyle = "rgb(255 255 255 / 0.5)";
  ctx.fillRect(w * 0.03, h * 0.03 - 2 * k, w * 0.94, 7 * k);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(w * 0.03, h * 0.03, w * 0.94, 3 * k);
  ctx.fillStyle = LINE;
  ctx.fillRect(0, h * 0.1, w, 3 * k);
  // the seat-end pole
  const px = w * 0.03;
  g = ctx.createLinearGradient(px, 0, px + 6 * k, 0);
  g.addColorStop(0, "#9aa0b6");
  g.addColorStop(0.45, "#ffffff");
  g.addColorStop(1, "#a9aec2");
  ctx.fillStyle = g;
  ctx.fillRect(px, h * 0.12, 6 * k, h);
  // the seats across the aisle, on a white seat frame
  const sy = h * 0.7;
  const sh = h * 0.2;
  const gap = 3 * k;
  const sw = (x1 - x0 - gap * (SEATS.length - 1)) / SEATS.length;
  SEATS.forEach((seat, i) => {
    const sx = x0 + i * (sw + gap);
    g = ctx.createLinearGradient(0, sy, 0, sy + sh);
    if (seat === "priority") {
      g.addColorStop(0, "#f8bccd");
      g.addColorStop(0.45, "#f29bb6");
      g.addColorStop(1, "#dc85a2");
    } else {
      g.addColorStop(0, "#45bdf0");
      g.addColorStop(0.45, "#00a4e3");
      g.addColorStop(1, "#008cc6");
    }
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.roundRect(sx, sy, sw, sh, [sw * 0.4, sw * 0.4, 0, 0]);
    ctx.fill();
    ctx.fillStyle = "rgb(255 255 255 / 0.6)";
    ctx.fillRect(sx + sw * 0.25, sy, sw * 0.5, 2 * k);
  });
  ctx.fillStyle = "#f7f8fb";
  ctx.fillRect(w * 0.06, h * 0.9, w * 0.88, h * 0.1);
  // the stainless grab bar, and the straps hanging from it
  const by = h * 0.15;
  g = ctx.createLinearGradient(0, by, 0, by + 3 * k);
  g.addColorStop(0, "#ffffff");
  g.addColorStop(1, "#9aa0b6");
  ctx.fillStyle = g;
  ctx.fillRect(0, by, w, 3 * k);
}

/** The hand straps on the grab bar, swung by `angle` degrees. */
function paintStraps(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  angle: number,
) {
  const by = h * 0.15;
  const unit = (h * 0.26) / 64;
  STRAPS.forEach((at, i) => {
    ctx.save();
    ctx.translate(w * at, by);
    ctx.rotate((angle * STRAP_SWAY[i] * Math.PI) / 180);
    ctx.scale(unit, unit);
    ctx.translate(-10, 0);
    ctx.fillStyle = "#8e93a8";
    ctx.fillRect(8, 0, 4, 38);
    ctx.strokeStyle = "#c9cdd9";
    ctx.lineWidth = 3.2;
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(10, 37);
    ctx.lineTo(18, 58);
    ctx.quadraticCurveTo(18.6, 61, 15.6, 61);
    ctx.lineTo(4.4, 61);
    ctx.quadraticCurveTo(1.4, 61, 2, 58);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  });
}

/**
 * Paints every window canvas once, for the row you swipe (short screens and
 * reduced motion): no city or masts, just the dark night behind the glass,
 * the lit car in the second windows, and the sheen.
 */
function paintWindowsStill(root: HTMLElement) {
  const res = Math.min(window.devicePixelRatio || 1, 1.5);
  for (const canvas of root.querySelectorAll<HTMLCanvasElement>(".pj-see")) {
    const win = canvas.parentElement as HTMLElement;
    const w = Math.max(1, Math.round(win.clientWidth * res));
    const h = Math.max(1, Math.round(win.clientHeight * res));
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) continue;
    const kind = (canvas.dataset.kind ?? "glass") as ViewKind;
    const radius = Math.max(
      0,
      parseFloat(getComputedStyle(win).borderTopLeftRadius) - win.clientTop,
    );
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(0, 0, w, h, radius * res);
    ctx.clip();
    ctx.fillStyle = "#06071a";
    ctx.fillRect(0, 0, w, h);
    if (kind === "car") paintCarInside(ctx, w, h, res, 0);
    if (kind !== "inside") paintSheen(ctx, w, h, kind === "car" ? 0.18 : 0.16);
    ctx.restore();
  }
}

/**
 * The night sky behind the ride, painted under the city's bitmap so the
 * bitmap is opaque: the page's gradient from night-950 down to its violet
 * foot, and static stars thinning toward the horizon, much as the page's
 * starfield draws them.
 */
function paintNightSky(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  res: number,
) {
  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, "#06071a");
  g.addColorStop(0.55, "#090b22");
  g.addColorStop(1, "#15123f");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
  const rand = mulberry32(5);
  const count = Math.round(((w / res) * (h / res) * 0.9) / 10000);
  ctx.fillStyle = "#ffffff";
  for (let i = 0; i < count; i++) {
    const y = rand() ** 1.6 * h * 0.6;
    const r = (rand() < 0.08 ? 1.1 + rand() * 0.8 : 0.35 + rand() * 0.7) * res;
    ctx.globalAlpha = (0.25 + rand() * 0.45) * (1 - (y / (h * 0.6)) * 0.8);
    ctx.beginPath();
    ctx.arc(rand() * w, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

/** A sheen of platform light across a pane, from its top-left corner. */
function paintSheen(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  strength: number,
) {
  const g = ctx.createLinearGradient(0, 0, w * 0.45, h);
  g.addColorStop(0, `rgb(244 240 255 / ${strength})`);
  g.addColorStop(0.32, "rgb(244 240 255 / 0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
}

/**
 * The second window, across the doors from the picture: clear glass into a
 * lit Line 4 car, after the Korail 341000s that run it (`paintCarInside`).
 * It is a single canvas that also carries the city sliding past behind it,
 * and the straps swinging with the ride.
 */
function CarView() {
  return (
    <div
      aria-hidden="true"
      className="pj-pane pj-clear relative h-(--pane) w-full rounded-xl border-[3px] border-white/50 bg-[#e9ecf4]"
    >
      <SeeThrough kind="car" />
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
  const id = useId();

  return (
    <svg
      viewBox="0 0 120 60"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(
        "pj-panto absolute bottom-full h-(--lift) overflow-visible",
        className,
      )}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={`${id}-arc`}>
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.25" stopColor="#bfe3ff" stopOpacity="0.9" />
          <stop offset="1" stopColor="#5aa8ff" stopOpacity="0" />
        </radialGradient>
      </defs>
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
      {/* an arc where the pan head meets the wire, flashed at speed */}
      <g className="pj-spark" opacity={0}>
        <circle cx={50} cy={0.5} r={16} fill={`url(#${id}-arc)`} />
        <path
          d="M50 0.5 L43 -7 M50 0.5 L58 -6 M50 0.5 L46 8 M50 0.5 L56 7"
          stroke="#e8f4ff"
          strokeWidth={1.1}
        />
      </g>
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
  "[background:repeating-linear-gradient(180deg,transparent_0_15px,rgb(6_7_26/0.1)_15px_16px),linear-gradient(180deg,rgb(244_240_255/0.62)_0,rgb(244_240_255/0.44)_2.5%,rgb(244_240_255/0.36)_30%,rgb(214_224_255/0.3)_68%,rgb(255_214_190/0.18)_95%,rgb(244_240_255/0.16)),var(--night-700)]";

/**
 * A pair of sliding doors in Line 4 livery, after the Korail EMUs that run
 * it: stainless leaves in a recessed frame, with a blue band down their
 * middle (sky blue around the windows, deep blue below) and a sky-blue cap
 * above, up to the roof line. The doors run down to the sill, below the
 * windows. When the riding train stops, the doors of the car in the middle
 * of the screen slide open on its lit interior (see `stations` in
 * Projects).
 */
function Door() {
  return (
    <div
      aria-hidden="true"
      className="pj-doorway -mt-3 lg:-mt-5 relative flex w-[clamp(8.5rem,13vw,12rem)] shrink-0 flex-col items-center"
    >
      {/* the body runs on above the doorway, up to the roof line */}
      <span className="pj-cap h-4 w-[62%] lg:h-6" />
      <div className="relative w-full flex-1 overflow-hidden rounded-t-md border-[rgb(6_7_26/0.35)] border-x-[3px] border-t-[3px]">
        {/* inside, seen when the doors open: a lit Line 4 car. Doors face
            each other across the aisle, so the doorway looks onto the
            closed doors opposite (their windows onto the city), with the
            route display above them, the seat-end poles either side and
            the yellow edge on the floor. */}
        <div className="pj-inside absolute inset-0 hidden bg-[linear-gradient(180deg,#e3e7f0,#eef1f7_30%,#e8ebf3)]">
          <span className="absolute inset-x-[16%] top-0 h-1.5 rounded-b-sm bg-night-900 lg:h-2">
            <span className="-translate-y-1/2 absolute inset-x-[12%] top-1/2 h-0.5 bg-line-4" />
          </span>
          <span className="absolute inset-x-[16%] top-1.5 bottom-[9%] bg-[linear-gradient(180deg,#d3d7e3,#c3c8d6)] lg:top-2">
            {(["left-[5%]", "right-[5%]"] as const).map((at) => (
              <span
                key={at}
                className={cn(
                  "pj-clear absolute top-[3%] h-[calc(var(--pane)*0.9)] w-[40%] rounded-[0.6rem] border-2 border-[#9ea4b6] bg-night-950",
                  at,
                )}
              >
                <SeeThrough kind="inside" />
              </span>
            ))}
            <span className="-translate-x-1/2 absolute inset-y-0 left-1/2 w-0.5 bg-[#8d93a7]" />
          </span>
          {["left-[5%]", "right-[5%]"].map((at) => (
            <span
              key={at}
              className={cn(
                "absolute top-0 bottom-[9%] w-1.5 bg-[linear-gradient(90deg,#9aa0b6,#ffffff_45%,#a9aec2)]",
                at,
              )}
            />
          ))}
          <span className="absolute inset-x-0 bottom-0 h-[9%] border-[#f2c94c] border-t-2 bg-[#a3a9bb]" />
        </div>
        {/* the two leaves, after the Korail Line 4 cars: sky blue down to
            just under their windows, a deep-blue band, then bare stainless
            to the sill. Each leaf's tall window sits by the seam, level
            with the panes in the car's windows (same top, same height).
            Riding, they slide apart into the body's pockets when the train
            stops. */}
        {(["l", "r"] as const).map((side) => (
          <div
            key={side}
            className={cn(
              "absolute inset-y-0 w-1/2 [background:linear-gradient(180deg,var(--line-4)_0_calc(var(--pane)+1rem),var(--line-4-door)_calc(var(--pane)+1rem)_calc(var(--pane)+1.75rem),transparent_calc(var(--pane)+1.75rem)),linear-gradient(180deg,rgb(244_240_255/0.4),rgb(244_240_255/0.28)),var(--night-700)]",
              side === "l"
                ? "pj-leaf-l left-0 border-night-950/70 border-r-[1.5px]"
                : "pj-leaf-r right-0 border-night-950/70 border-l-[1.5px]",
            )}
          >
            <span
              className={cn(
                "pj-clear absolute top-1.5 h-(--pane) w-[46%] rounded-[0.7rem] border-[3px] border-night-950/55 bg-night-950 lg:top-2",
                side === "l" ? "right-[14%]" : "left-[14%]",
              )}
            >
              <SeeThrough />
            </span>
          </div>
        ))}
        {/* the doorway's light, washing over the leaves as they open */}
        <span className="pj-glow pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_45%,rgb(226_236_255/0.3),transparent)] opacity-0" />
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
            <stop offset="0" stopColor="#8f8fad" />
            <stop offset="0.3" stopColor="#6b6c90" />
            <stop offset="0.68" stopColor="#555a86" />
            <stop offset="0.95" stopColor="#555274" />
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
        {/* the sky-blue frame round the front mask, wrapping the corner
            as on the Korail Line 4 cab, and the black lower front with the
            lamps; a sliver of the black windscreen shows at the tip */}
        <path
          d="M101 0 L80 0 C42 0 13 13 6 40 L1.7 74 L22 74 L26 44 C31.5 24 51 13.5 84 12 L101 12 Z"
          fill={LINE}
        />
        <path d="M1.7 74 L0 88 Q0 100 9 100 L30 100 L30 74 Z" fill="#0d0f2a" />
        <path
          d="M44 3.6 C25 5.4 12 15 7.4 38 L4.6 60 L9.6 60 L12.3 40 C16.4 22.5 27.5 12.5 48 6.4 Z"
          fill="#06071a"
        />
      </svg>
      <span
        className={cn(
          "absolute top-[81%] left-[4%] h-2.5 w-[20%] rounded-full",
          rear ? "bg-[#ff5a4a]" : "bg-white",
        )}
      />
      {/* the lamp's glow, and ahead of the front car its beam along the
          rail; radial gradients, never blur filters */}
      <span
        className={cn(
          "-translate-x-1/2 -translate-y-1/2 pointer-events-none absolute top-[calc(81%+5px)] left-[14%] size-24 rounded-full",
          rear
            ? "bg-[radial-gradient(closest-side,rgb(255_90_74/0.55),transparent)]"
            : "bg-[radial-gradient(closest-side,rgb(255_250_240/0.7),transparent)]",
        )}
      />
      {/* the beam, angled down onto the track, and the rail it catches
          (front); the tail lamp's red on the rail (rear) */}
      {!rear && (
        <span className="-translate-y-1/2 -rotate-[7deg] pointer-events-none absolute top-[calc(81%+5px)] right-[88%] h-[46%] w-[min(72vw,48rem)] origin-right bg-[radial-gradient(ellipse_100%_26%_at_100%_50%,rgb(255_248_232/0.42),rgb(255_248_232/0.12)_45%,transparent_75%),radial-gradient(ellipse_60%_50%_at_100%_50%,rgb(255_248_232/0.1),transparent_70%)]" />
      )}
      <span
        className={cn(
          "pointer-events-none absolute top-[calc(100%+var(--wheel)*1.06-2px)] right-[80%] h-[3px]",
          rear
            ? "w-40 bg-[linear-gradient(90deg,transparent,rgb(255_90_74/0.6))]"
            : "w-[min(60vw,36rem)] bg-[linear-gradient(90deg,transparent,rgb(255_246_228/0.85))]",
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
        <span className="pj-clear absolute inset-x-[18%] top-[7px] h-(--pane) rounded-md border-2 border-night-950/70 bg-night-950 lg:top-[9px]">
          <SeeThrough />
        </span>
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
      {/* the doorway's light pouring out onto the track when the doors
          open; placed under the doors on refresh */}
      <span
        aria-hidden="true"
        className="pj-spill -translate-x-1/2 pointer-events-none absolute top-full z-20 h-[calc(var(--wheel)*1.1)] w-[clamp(18rem,30vw,26rem)] bg-[radial-gradient(ellipse_45%_100%_at_50%_0%,rgb(226_236_255/0.55),rgb(226_236_255/0.13)_55%,transparent)] opacity-0"
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
          <CarView />
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
          if (!ride) {
            // the row you swipe: paint the windows once, still
            if (root.current) paintWindowsStill(root.current);
            return;
          }
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

          // ── the world outside ──────────────────────────────────────
          // The city is one svg behind the train, rasterised once into a
          // bitmap. Every clear window is a small canvas that copies its own
          // slice of that bitmap, and draws the masts going by, whenever the
          // train moves: a frame redraws a few small canvases instead of
          // repainting whole windows (and the details over them).
          const city = q(".pj-city")[0] as HTMLElement;
          const masts = q(".pj-masts")[0] as HTMLElement;
          const wire = q(".pj-wire")[0] as HTMLElement;
          const setCity = gsap.quickSetter(city, "x", "px");
          const setMasts = gsap.quickSetter(masts, "x", "px");
          const setWire = gsap.quickSetter(wire, "x", "px");
          const citySvg = URL.createObjectURL(
            new Blob(
              [
                new XMLSerializer().serializeToString(
                  city.querySelector("svg") as SVGSVGElement,
                ),
              ],
              { type: "image/svg+xml" },
            ),
          );
          let cityBitmap: HTMLCanvasElement | null = null;
          /** bitmap px per screen px */
          let bitmapScale = 1;
          let alive = true;
          // A weaker device (few cores or little memory): the windows'
          // canvases at 1x and no sparks. Elsewhere 1.5x is sharp enough
          // behind glass, and far cheaper than a phone's 3x.
          const nav = navigator as Navigator & { deviceMemory?: number };
          const weak =
            (navigator.hardwareConcurrency || 8) <= 4 ||
            (nav.deviceMemory ?? 8) <= 4;
          const res = weak ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);
          // Lite: the ride without the world outside. No city or masts
          // behind the train (the page's starfield shows instead), the
          // windows painted once and left still, no sparks. A device with
          // 2 GB or less starts lite; any other drops to it if the ride
          // cannot keep up (see watchFrames).
          let lite = (nav.deviceMemory ?? 8) <= 2;
          // The bitmap also takes the svg's place behind the train: a canvas
          // layer just moves, where the svg (thousands of shapes) was
          // re-recorded and re-rasterised as it slid. The svg stays for the
          // first paint, and comes back if the stage changes size a lot.
          const svg = city.querySelector("svg") as SVGSVGElement;
          const raster = document.createElement("img");
          function paintCity() {
            if (!alive || !raster.complete || !raster.naturalWidth) return;
            const tall = stage.clientHeight;
            const wide = Math.round((tall * CITY_W) / 1000);
            const canvas = document.createElement("canvas");
            canvas.width = Math.round(wide * res);
            canvas.height = Math.round(tall * res);
            canvas.className = "block h-full w-auto";
            canvas.setAttribute("aria-hidden", "true");
            // Opaque, with the night sky and its stars painted in: the
            // browser then skips everything hidden behind it (the page's
            // gradient and its twinkling starfield, which pauses too).
            const cctx = canvas.getContext("2d", { alpha: false });
            if (cctx) {
              paintNightSky(cctx, canvas.width, canvas.height, res);
              cctx.drawImage(raster, 0, 0, canvas.width, canvas.height);
            }
            cityBitmap?.remove();
            city.appendChild(canvas);
            svg.style.display = "none";
            cityBitmap = canvas;
            bitmapScale = canvas.width / wide;
            moveWorld(gsap.getProperty(track, "x") as number, true);
          }
          raster.onload = paintCity;
          raster.src = citySvg;
          /** doorways standing open, whose far windows are worth drawing */
          const openWays = new Set<HTMLElement>();
          // On a weaker device the door leaves' little windows stay plain
          // tinted glass: a dozen fewer canvases (and compositor layers).
          const views = q<HTMLCanvasElement>(".pj-see")
            .filter((canvas) => {
              const leaf = canvas.closest(".pj-leaf-l, .pj-leaf-r");
              if (weak && leaf) {
                canvas.style.display = "none";
                return false;
              }
              return true;
            })
            .map((canvas) => ({
              canvas,
              ctx: canvas.getContext("2d"),
              kind: (canvas.dataset.kind ?? "glass") as ViewKind,
              /** the window's corner radius, in the track's own px */
              radius: 0,
              /** what lies over the city, drawn once per size: the lit
                  car (but its straps) and the glass's sheen */
              over: null as HTMLCanvasElement | null,
              /** in the page: a canvas is a compositor layer, so those
                  far off screen are taken out of it */
              live: true,
              win: canvas.parentElement as HTMLElement,
              /** the doorway it looks out of, for the far side's windows */
              way: canvas.closest(".pj-inside")
                ? (canvas.closest(".pj-doorway") as HTMLElement)
                : null,
              /** the window's inside, in screen px, with the track at 0 */
              left: 0,
              top: 0,
              w: 0,
              h: 0,
            }));
          let stageW = 0;
          let cityShift = 0;
          let cityFactor = CITY;
          let mastGap = 1;
          let dropGap = 1;
          let drawnAt = Number.NaN;
          function measureWorld() {
            if (
              cityBitmap &&
              Math.abs(cityBitmap.height / res - stage.clientHeight) >
                stage.clientHeight * 0.15
            ) {
              paintCity();
            }
            stageW = stage.clientWidth;
            const ride = distance() * s;
            // never slide the city so far that its edge shows
            cityFactor =
              ride > 0
                ? Math.min(
                    CITY,
                    Math.max(0, (city.offsetWidth - stageW) / ride),
                  )
                : 0;
            cityShift = cityFactor * ride;
            mastGap = masts.offsetWidth - box.offsetWidth || 1;
            dropGap = wire.offsetWidth - box.offsetWidth || 1;
            const x = gsap.getProperty(track, "x") as number;
            for (const v of views) measureView(v, x);
            moveWorld(x, true);
          }
          function measureView(v: (typeof views)[number], x: number) {
            // the far side's windows are out of the page until their doors
            // open (see setDoor), which measures them then
            if (v.way && !openWays.has(v.way)) return;
            const frame = stage.getBoundingClientRect();
            const r = v.win.getBoundingClientRect();
            v.left = r.left - frame.left + v.win.clientLeft * s - x * s;
            v.top = r.top - frame.top + v.win.clientTop * s;
            v.w = v.win.clientWidth * s;
            v.h = v.win.clientHeight * s;
            v.radius = Math.max(
              0,
              parseFloat(getComputedStyle(v.win).borderTopLeftRadius) -
                v.win.clientTop,
            );
            v.canvas.width = Math.max(1, Math.round(v.w * res));
            v.canvas.height = Math.max(1, Math.round(v.h * res));
            v.over = null;
            if (v.kind === "inside") return;
            const over = document.createElement("canvas");
            over.width = v.canvas.width;
            over.height = v.canvas.height;
            const octx = over.getContext("2d");
            if (!octx) return;
            const k = over.width / (v.w / s);
            if (v.kind === "car")
              paintCarRoom(octx, over.width, over.height, k);
            paintSheen(
              octx,
              over.width,
              over.height,
              v.kind === "car" ? 0.18 : 0.16,
            );
            v.over = over;
          }
          /** how far the straps hang from true, in degrees (see sway) */
          let strapAngle = 0;
          function drawView(
            v: (typeof views)[number],
            left: number,
            cityX: number,
            m: number,
          ) {
            const { canvas, ctx } = v;
            if (!ctx || !v.w) return;
            const w = canvas.width;
            const h = canvas.height;
            // canvas px per px of the track
            const k = w / (v.w / s);
            ctx.save();
            ctx.clearRect(0, 0, w, h);
            ctx.beginPath();
            ctx.roundRect(0, 0, w, h, v.radius * k);
            ctx.clip();
            // the night sky first: the city's bitmap is clear above it
            ctx.fillStyle = "#06071a";
            ctx.fillRect(0, 0, w, h);
            if (cityBitmap) {
              ctx.drawImage(
                cityBitmap,
                (left - cityX) * bitmapScale,
                v.top * bitmapScale,
                v.w * bitmapScale,
                v.h * bitmapScale,
                0,
                0,
                w,
                h,
              );
            }
            // the masts: a pole starts at m - 14 + n * gap, in the track's
            // own px from the stage's left edge (see .pj-masts)
            const from = left / s;
            let pole =
              ((((m - 14 - from) % mastGap) + mastGap) % mastGap) - mastGap;
            for (; pole < v.w / s; pole += mastGap) {
              ctx.fillStyle = "#1b1e45";
              ctx.fillRect(pole * k, 0, 10 * k, h);
              ctx.fillStyle = "rgb(244 240 255 / 0.18)";
              ctx.fillRect((pole + 10) * k, 0, 2 * k, h);
            }
            if (v.over) ctx.drawImage(v.over, 0, 0);
            if (v.kind === "car") paintStraps(ctx, w, h, strapAngle);
            ctx.restore();
          }
          /** Redraws the on-screen cars' windows into the lit car, as the
              straps swing while the track stands still. */
          function redrawCars(x: number) {
            const cityX = -cityShift + cityFactor * -x * s;
            const m = (-x * WORLD) % mastGap;
            for (const v of views) {
              if (v.kind !== "car") continue;
              const left = v.left + x * s;
              if (left > stageW || left + v.w < 0) continue;
              drawView(v, left, cityX, m);
            }
          }
          function moveWorld(x: number, force = false) {
            if (x === drawnAt && !force) return;
            drawnAt = x;
            if (lite) {
              setWire((-x * WORLD) % dropGap);
              return;
            }
            const cityX = -cityShift + cityFactor * -x * s;
            setCity(cityX);
            const ground = -x * WORLD;
            const m = ground % mastGap;
            setMasts(m);
            setWire(ground % dropGap);
            for (const v of views) {
              const left = v.left + x * s;
              // within half a screen: in the page, ready to come on
              const near = left < stageW * 1.5 && left + v.w > -stageW * 0.5;
              if (near !== v.live) {
                v.live = near;
                v.canvas.style.display = near ? "" : "none";
              }
              if (left > stageW || left + v.w < 0) continue;
              if (v.way && !openWays.has(v.way)) continue;
              drawView(v, left, cityX, m);
            }
          }
          measureWorld();
          ScrollTrigger.addEventListener("refresh", measureWorld);

          function goLite() {
            lite = true;
            gsap.set([city, masts], { display: "none" });
            coverSky("projects", false);
            // the windows, still: the night behind them, the lit car with
            // its straps hanging true, the sheen; the door leaves' and the
            // cab's little windows stay plain tinted glass
            for (const v of views) {
              if (v.kind === "car") {
                v.canvas.style.display = "";
                v.live = true;
              } else {
                v.canvas.style.display = "none";
                v.live = false;
              }
            }
            if (root.current) paintWindowsStill(root.current);
          }
          function repaintLite() {
            if (lite && root.current) paintWindowsStill(root.current);
          }
          ScrollTrigger.addEventListener("refresh", repaintLite);
          if (lite) goLite();

          // Watches the first moments of riding: if the frames come slower
          // than about 36 a second while the train moves, this device
          // cannot keep up with the world outside, so the ride drops it.
          const moving: number[] = [];
          let watching = !lite;
          function watchFrames(dt: number, speed: number) {
            if (!watching || speed === 0 || dt <= 0 || dt > 250) return;
            moving.push(dt);
            if (moving.length < 30) return;
            const sorted = [...moving].sort((a, b) => a - b);
            const median = sorted[Math.floor(sorted.length / 2)];
            watching = false;
            if (median > 28) goLite();
          }

          // ── straps and sparks ──────────────────────────────────────
          // The hand straps hang on a spring: they swing back as the train
          // speeds up and forward as it brakes, then settle. At speed the
          // pantographs arc against the wire. Both run on the ticker, only
          // while the stage is on screen, for the cars on screen.
          const cars = q<HTMLElement>(".pj-car").map((el) => ({
            el,
            from: 0,
            to: 0,
            sparks: [...el.querySelectorAll(".pj-spark")] as SVGGElement[],
            door: {
              /** the doorway's centre along the track */
              at: 0,
              open: false,
              way: el.querySelector(".pj-doorway") as HTMLElement,
              /** the lit car behind the leaves, painted only while open */
              inside: el.querySelector(".pj-inside") as HTMLElement,
              leaves: [
                el.querySelector(".pj-leaf-l"),
                el.querySelector(".pj-leaf-r"),
              ] as HTMLElement[],
              glow: el.querySelector(".pj-glow") as HTMLElement,
              spill: el.querySelector(".pj-spill") as HTMLElement,
            },
          }));
          function measureCars() {
            for (const c of cars) {
              c.from = c.el.offsetLeft;
              c.to = c.from + c.el.offsetWidth;
              // the doorway's centre, from the car's own edge
              let at = c.door.way.offsetWidth / 2;
              for (
                let e: HTMLElement | null = c.door.way;
                e && e !== c.el;
                e = e.offsetParent as HTMLElement | null
              ) {
                at += e.offsetLeft;
              }
              c.door.at = c.from + at;
              gsap.set(c.door.spill, { left: at });
            }
          }
          measureCars();
          ScrollTrigger.addEventListener("refresh", measureCars);
          let lastX = gsap.getProperty(track, "x") as number;
          let lastSpeed = 0;
          let angle = 0;
          let swing = 0;
          let shown = 0;
          function sway(_time: number, dt: number) {
            const x = gsap.getProperty(track, "x") as number;
            const f = Math.min(dt, 64) / 16.667;
            const speed = dt > 0 ? (x - lastX) / dt : 0;
            watchFrames(dt, speed);
            // a pendulum in the car: kicked by the train's acceleration
            // (back as it pulls away, forward as it brakes), pulled home by
            // gravity, and damped
            const accel = dt > 0 ? (speed - lastSpeed) / dt : 0;
            lastX = x;
            lastSpeed = speed;
            swing += (accel * 220 - angle * 0.07) * f;
            swing *= 0.9 ** f;
            angle = gsap.utils.clamp(-28, 28, angle + swing * f);
            // at rest, straps settled and the stop handled (doors open, or
            // none near enough): nothing here has anything to do
            if (
              speed === 0 &&
              still > 1500 &&
              Math.abs(swing) < 0.005 &&
              Math.abs(angle - shown) < 0.05
            ) {
              return;
            }
            const view = stageW / s;
            const onScreen = cars.filter(
              (c) => c.to + x > 0 && c.from + x < view,
            );
            // redraw the straps (in the cars' window canvases) only when
            // they visibly move; moving, the track's own redraw does it
            if (Math.abs(angle - shown) > 0.05) {
              shown = angle;
              strapAngle = angle;
              if (speed === 0 && !lite) redrawCars(x);
            }
            stations(x, speed, dt, view);
            if (
              !weak &&
              !lite &&
              Math.abs(speed) > 0.35 &&
              Math.random() < 0.1 * f
            ) {
              const arcs = onScreen.flatMap((c) => c.sparks);
              const arc = arcs[Math.floor(Math.random() * arcs.length)];
              if (arc) {
                gsap.fromTo(
                  arc,
                  {
                    opacity: 1,
                    scale: 0.7 + Math.random() * 0.7,
                    svgOrigin: "50 0.5",
                  },
                  {
                    opacity: 0,
                    duration: 0.1 + Math.random() * 0.16,
                    ease: "power2.in",
                    overwrite: true,
                  },
                );
              }
            }
          }
          // ── station stops ──────────────────────────────────────────
          // When the ride comes to rest, the car whose doors are nearest the
          // middle of the screen opens them on its lit interior, and its
          // light spills onto the track. Moving again shuts them at once.
          let still = 0;
          function setDoor(door: (typeof cars)[number]["door"], open: boolean) {
            if (door.open === open) return;
            door.open = open;
            if (open) {
              openWays.add(door.way);
              gsap.set(door.inside, { display: "block" });
              const x = gsap.getProperty(track, "x") as number;
              for (const v of views) if (v.way === door.way) measureView(v, x);
              moveWorld(x, true);
            } else {
              openWays.delete(door.way);
            }
            const [l, r] = door.leaves;
            const time = open ? 1.1 : 0.45;
            const ease = open ? "power2.inOut" : "power2.in";
            const delay = open ? 0.15 : 0;
            gsap.to(l, {
              xPercent: open ? -94 : 0,
              duration: time,
              ease,
              delay,
              overwrite: true,
              // shut, the leaves cover the inside: stop painting it
              onComplete: open
                ? undefined
                : () => {
                    if (!door.open) gsap.set(door.inside, { display: "none" });
                  },
            });
            gsap.to(r, {
              xPercent: open ? 94 : 0,
              duration: time,
              ease,
              delay,
              overwrite: true,
            });
            gsap.to([door.glow, door.spill], {
              opacity: open ? 1 : 0,
              duration: open ? 1.3 : 0.35,
              delay: open ? 0.35 : 0,
              ease: "power1.out",
              overwrite: true,
            });
          }
          function stations(
            x: number,
            speed: number,
            dt: number,
            view: number,
          ) {
            if (Math.abs(speed) > 0.03) {
              still = 0;
              for (const c of cars) setDoor(c.door, false);
              return;
            }
            still += dt;
            if (still < 500 || cars.some((c) => c.door.open)) return;
            let best: (typeof cars)[number] | undefined;
            // the doors nearest the middle, wherever they are on screen
            let gap = view * 0.5;
            for (const c of cars) {
              const off = Math.abs(c.door.at + x - view / 2);
              if (off < gap) {
                gap = off;
                best = c;
              }
            }
            if (best) setDoor(best.door, true);
          }

          // the stage fills the screen from its top reaching the screen's
          // top until its foot leaves the bottom: the opaque city hides
          // the page's starfield then, so it can rest
          const cover = ScrollTrigger.create({
            trigger: pin,
            start: "top top",
            end: "bottom bottom",
            refreshPriority: -1,
            onToggle: (self) => coverSky("projects", self.isActive && !lite),
          });
          const swayer = ScrollTrigger.create({
            trigger: pin,
            start: "top bottom",
            end: "bottom top",
            // measured after the stage's pin, which adds the ride's length
            refreshPriority: -1,
            onToggle: (self) => {
              lastX = gsap.getProperty(track, "x") as number;
              lastSpeed = 0;
              if (self.isActive) gsap.ticker.add(sway);
              else {
                gsap.ticker.remove(sway);
                for (const c of cars) setDoor(c.door, false);
              }
            },
          });
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
              moveWorld(x);
              // the wheels roll over the ground, which moves too
              const deg = ((x * (1 + WORLD)) / radius) * (180 / Math.PI);
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
            swayer.kill();
            ScrollTrigger.removeEventListener("refresh", repaintLite);
            gsap.set([city, masts], { clearProps: "display" });
            cover.kill();
            coverSky("projects", false);
            gsap.ticker.remove(sway);
            ScrollTrigger.removeEventListener("refresh", measureWorld);
            ScrollTrigger.removeEventListener("refresh", measureCars);
            alive = false;
            URL.revokeObjectURL(citySvg);
            cityBitmap?.remove();
            svg.style.display = "";
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
        <div className="pj-stage relative ride:sticky ride:top-0 ride:flex ride:h-svh ride:flex-col ride:justify-center ride:overflow-hidden ride:pt-20">
          {/* Seoul at night behind the train; riding, it slides past in
              parallax, and every clear window shows the same view */}
          <div
            aria-hidden="true"
            className="pj-city pointer-events-none absolute inset-y-0 left-0 ride:block hidden will-change-transform"
          >
            <NightCity className="h-full w-auto" />
          </div>
          {/* --lift: how far the pantographs stand above the car body, which
              is where the overhead line hangs. --above: the room above the
              cars, which holds the line: riding, it is part of the block the
              stage centres below the navbar; swiping, it also keeps the
              row's clipping off the roof. */}
          <div className="pj-scale relative [--above:5rem] [--lift:3.5rem] [--mast-gap:clamp(18rem,62vw,46rem)] ride:[--above:var(--lift)] lg:[--lift:clamp(3.5rem,9svh,5rem)]">
            {/* catenary masts along the line, behind the cars: each pole
                rises past the wire and holds it on a cantilever arm. They
                stay with the ground, so they rush past as the train rides. */}
            <span
              aria-hidden="true"
              className="pj-masts pointer-events-none absolute bottom-0 left-[calc(var(--mast-gap)*-1)] ride:block hidden w-[calc(100%+var(--mast-gap))] will-change-transform"
              style={{
                top: "calc(var(--above) - var(--lift) - 1.75rem)",
                backgroundImage:
                  "linear-gradient(90deg, transparent 0 calc(100% - 14px), #1b1e45 calc(100% - 14px) calc(100% - 4px), rgb(244 240 255 / 0.2) calc(100% - 4px) calc(100% - 2px), transparent calc(100% - 2px)), linear-gradient(90deg, transparent 0 calc(100% - 7rem), #2a2d57 calc(100% - 7rem) calc(100% - 8px), transparent calc(100% - 8px))",
                backgroundSize: "var(--mast-gap) 100%, var(--mast-gap) 4px",
                backgroundPosition: "0 0, 0 0.85rem",
                backgroundRepeat: "repeat-x",
              }}
            />
            {/* the overhead line: a contact wire hung from a messenger wire
                by droppers. Like the rail, it stays put and reads as still. */}
            <span
              aria-hidden="true"
              className="-translate-y-full pj-wire -left-[5.5rem] pointer-events-none absolute top-[calc(var(--above)-var(--lift))] right-0 h-3 border-mist/45 border-t border-t-mist/20 border-b bg-[repeating-linear-gradient(90deg,rgb(244_240_255/0.2)_0_1px,transparent_1px_5.5rem)] will-change-transform"
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
                  className="pj-more glass group relative flex aspect-square w-[72vw] max-w-sm shrink-0 snap-start flex-col justify-between self-center overflow-hidden rounded-4xl border border-white/10 p-6 transition-colors hover:border-peach/50 sm:p-8 lg:w-104"
                >
                  <span className="font-mono text-mist/45 text-xs tracking-eyebrow">
                    MORE PROJECTS
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
