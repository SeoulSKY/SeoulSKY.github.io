import { useEffect, useId, useMemo, useRef, useState } from "react";
import { mulberry32 } from "@/lib/random";
import { cn, evenlySpaced } from "@/lib/utils";

/**
 * Seoul at dusk, drawn as SVG.
 *
 * Both layers share one coordinate space (1600 × 760, waterline at y = 520)
 * so they can be stacked with the giant hero title sandwiched in between:
 *   <MountainLayer/>  Bukhansan ridges, the Han river surface, horizon glow
 *   <CityLayer/>      Namsan + N Seoul Tower, the skyline, Lotte World Tower,
 *                     the 63 Building, Geunjeongjeon of Gyeongbokgung and
 *                     a rippling reflection of all of it in the river.
 *
 * CityLayer stacks three svgs: the reflection (drawn once), the city (still
 * once the entrance is over) and its lights (the only part that keeps
 * moving). Split this way, a blinking beacon repaints a handful of shapes
 * instead of the whole skyline.
 *
 * Class names prefixed `sk-` are animation hooks for GSAP.
 */

export const VIEW_W = 1600;
export const VIEW_H = 760;
export const WATERLINE = 520;
/** Phones see a tighter crop centred on Namsan, the palace and Lotte. */
export const NARROW_VIEWBOX = `505 0 620 ${VIEW_H}`;
export const WIDE_VIEWBOX = `0 0 ${VIEW_W} ${VIEW_H}`;

interface LayerProps {
  className?: string;
  viewBox?: string;
}

interface CityLayerProps extends LayerProps {
  /**
   * Draw the windows as one path per colour instead of one shape each: far
   * fewer DOM nodes, for a city whose windows never switch on and off.
   */
  staticWindows?: boolean;
}

/* ── helpers ───────────────────────────────────────────── */

function smoothPath(points: [number, number][], closeTo = WATERLINE) {
  // Catmull-Rom → cubic Bézier, then close down to the waterline.
  let d = `M${points[0][0]},${points[0][1]}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2[0]},${p2[1].toFixed(1)}`;
  }
  const last = points[points.length - 1];
  d += ` L${last[0]},${closeTo} L${points[0][0]},${closeTo} Z`;
  return d;
}

function ridge(seed: number, base: number, amp: number, step: number) {
  const rand = mulberry32(seed);
  const pts: [number, number][] = [];
  for (let x = -60; x <= VIEW_W + 60 + step; x += step) {
    // a couple of slow sine waves + jitter = believable granite peaks
    const y =
      base -
      Math.sin(x / 210 + seed) * amp * 0.55 -
      Math.sin(x / 83 + seed * 2) * amp * 0.3 -
      rand() * amp * 0.45;
    pts.push([x, y]);
  }
  return smoothPath(pts);
}

/* ── Mountains + river ─────────────────────────────────── */

export function MountainLayer({ className, viewBox }: LayerProps) {
  const uid = useId().replace(/:/g, "");
  const far = useMemo(() => ridge(7, 352, 110, 58), []);
  const near = useMemo(() => ridge(19, 430, 70, 46), []);

  return (
    <svg
      viewBox={viewBox ?? `0 0 ${VIEW_W} ${VIEW_H}`}
      className={className}
      preserveAspectRatio="xMidYMin slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${uid}-far`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7d6db8" />
          <stop offset="0.6" stopColor="#4a3d86" />
          <stop offset="1" stopColor="#2c2560" />
        </linearGradient>
        <linearGradient id={`${uid}-near`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3d3278" />
          <stop offset="1" stopColor="#1b1846" />
        </linearGradient>
        <linearGradient id={`${uid}-water`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3a2e6e" />
          <stop offset="0.25" stopColor="#1a1846" />
          <stop offset="1" stopColor="#06071a" />
        </linearGradient>
        <radialGradient id={`${uid}-glow`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffc3a1" stopOpacity="0.55" />
          <stop offset="0.5" stopColor="#f4a7b9" stopOpacity="0.18" />
          <stop offset="1" stopColor="#f4a7b9" stopOpacity="0" />
        </radialGradient>
        <linearGradient
          id={`${uid}-fade`}
          x1="0"
          y1={WATERLINE}
          x2="0"
          y2={VIEW_H}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#fff" stopOpacity="0.5" />
          <stop offset="0.7" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask
          id={`${uid}-mask`}
          maskUnits="userSpaceOnUse"
          x="0"
          y={WATERLINE}
          width={VIEW_W}
          height={VIEW_H - WATERLINE}
        >
          <rect
            x="0"
            y={WATERLINE}
            width={VIEW_W}
            height={VIEW_H - WATERLINE}
            fill={`url(#${uid}-fade)`}
          />
        </mask>
        <clipPath id={`${uid}-above`}>
          {/* things that rise into view emerge from behind the horizon,
              never over the water */}
          <rect
            x="-200"
            y="-400"
            width={VIEW_W + 400}
            height={WATERLINE + 400}
          />
        </clipPath>
      </defs>
      <rect
        className="sk-water"
        x="0"
        y={WATERLINE}
        width={VIEW_W}
        height={VIEW_H - WATERLINE}
        fill={`url(#${uid}-water)`}
      />
      <ellipse
        className="sk-horizon"
        cx={VIEW_W / 2}
        cy={WATERLINE}
        rx="900"
        ry="120"
        fill={`url(#${uid}-glow)`}
      />
      <g id={`${uid}-ridges`} clipPath={`url(#${uid}-above)`}>
        <path
          className="sk-ridge"
          d={far}
          fill={`url(#${uid}-far)`}
          opacity="0.85"
        />
        <path className="sk-ridge" d={near} fill={`url(#${uid}-near)`} />
      </g>

      <g mask={`url(#${uid}-mask)`}>
        <use
          className="sk-reflection"
          href={`#${uid}-ridges`}
          transform={`matrix(1 0 0 -1 0 ${WATERLINE * 2})`}
        />
      </g>
    </svg>
  );
}

/* ── City ──────────────────────────────────────────────── */

interface Building {
  x: number;
  w: number;
  h: number;
  top: "flat" | "step" | "spire" | "slant";
  windows: { x: number; y: number; c: string }[];
}

const WINDOW_COLORS = ["#ffd39a", "#ffb357", "#ffe8cc", "#cfd8ff", "#ffc3a1"];

function makeBuildings(
  seed: number,
  heightAt: (x: number) => number,
  minW: number,
  maxW: number,
  litChance: number,
): Building[] {
  const rand = mulberry32(seed);
  const out: Building[] = [];
  let x = -10;
  while (x < VIEW_W + 10) {
    const w = Math.round(minW + rand() * (maxW - minW));
    const h = Math.round(heightAt(x + w / 2) * (0.65 + rand() * 0.5));
    const r = rand();
    const top: Building["top"] =
      r < 0.55 ? "flat" : r < 0.75 ? "step" : r < 0.88 ? "spire" : "slant";
    const windows: Building["windows"] = [];
    for (let wy = WATERLINE - h + 10; wy < WATERLINE - 8; wy += 9) {
      for (let wx = x + 5; wx < x + w - 6; wx += 7) {
        if (rand() < litChance) {
          windows.push({
            x: wx,
            y: wy,
            c: WINDOW_COLORS[Math.floor(rand() * WINDOW_COLORS.length)],
          });
        }
      }
    }
    out.push({ x, w, h, top, windows });
    x += w + Math.round(rand() * 6);
  }
  return out;
}

function BuildingShape({
  b,
  fill,
  live,
  windows,
}: {
  b: Building;
  fill: string;
  live: boolean;
  windows: boolean;
}) {
  const y = WATERLINE - b.h;
  const { x, w } = b;
  return (
    <g
      className={hook(live, "sk-bldg")}
      data-origin={`${x + w / 2} ${WATERLINE}`}
    >
      {b.top === "step" && (
        <rect
          x={x + w * 0.2}
          y={y - 12}
          width={w * 0.6}
          height={14}
          fill={fill}
        />
      )}
      {b.top === "spire" && (
        <rect x={x + w / 2 - 1} y={y - 26} width={2} height={28} fill={fill} />
      )}
      {b.top === "slant" ? (
        <path
          d={`M${x},${WATERLINE} L${x},${y + 14} L${x + w},${y} L${x + w},${WATERLINE} Z`}
          fill={fill}
        />
      ) : (
        <rect x={x} y={y} width={w} height={b.h} fill={fill} />
      )}
      {windows &&
        b.windows.map((win) => (
          <rect
            key={`${win.x}-${win.y}`}
            className="sk-win"
            x={win.x}
            y={win.y}
            width={3}
            height={4}
            fill={win.c}
          />
        ))}
    </g>
  );
}

/** A row's windows as one path per colour (see `staticWindows`). */
function WindowPaths({ buildings }: { buildings: Building[] }) {
  const byColour = new Map<string, string>();
  for (const b of buildings) {
    for (const win of b.windows) {
      const d = byColour.get(win.c) ?? "";
      byColour.set(win.c, `${d}M${win.x},${win.y}h3v4h-3z`);
    }
  }
  return [...byColour].map(([colour, d]) => (
    <path key={colour} d={d} fill={colour} />
  ));
}

// Height envelope: low near the palace, rising toward Gangnam on the right.
function backHeights(x: number) {
  return (
    120 +
    Math.max(0, 1 - Math.abs(x - 1180) / 520) * 120 +
    Math.max(0, 1 - Math.abs(x - 260) / 300) * 60
  );
}
function frontHeights(x: number) {
  return (
    70 +
    Math.max(0, 1 - Math.abs(x - 1250) / 380) * 90 +
    Math.max(0, 1 - Math.abs(x - 150) / 260) * 50 -
    Math.max(0, 1 - Math.abs(x - 810) / 220) * 40
  );
}

/** The scene's own gradients, needed by every svg that draws it. */
function SceneDefs({ uid }: { uid: string }) {
  return (
    <>
      <linearGradient id={`${uid}-lotte`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#0d0f2c" />
        <stop offset="0.55" stopColor="#232660" />
        <stop offset="1" stopColor="#3b3480" />
      </linearGradient>
      <linearGradient id={`${uid}-lotteSheen`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#ffc3a1" stopOpacity="0.9" />
        <stop offset="0.5" stopColor="#f4a7b9" stopOpacity="0.35" />
        <stop offset="1" stopColor="#f4a7b9" stopOpacity="0" />
      </linearGradient>
      <linearGradient id={`${uid}-gold`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#ffd08a" />
        <stop offset="0.45" stopColor="#c9813f" />
        <stop offset="1" stopColor="#3a2340" />
      </linearGradient>
      <linearGradient id={`${uid}-hill`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#1d1b4c" />
        <stop offset="1" stopColor="#0c0d2a" />
      </linearGradient>
      <linearGradient id={`${uid}-hanok`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#ffb357" stopOpacity="0.85" />
        <stop offset="1" stopColor="#d9503f" stopOpacity="0.5" />
      </linearGradient>
      <radialGradient id={`${uid}-beacon`}>
        <stop offset="0" stopColor="#ffb357" stopOpacity="0.9" />
        <stop offset="1" stopColor="#ffb357" stopOpacity="0" />
      </radialGradient>
      <clipPath id={`${uid}-above`}>
        {/* things that rise into view emerge from behind the horizon,
            never over the water */}
        <rect x="-200" y="-400" width={VIEW_W + 400} height={WATERLINE + 400} />
      </clipPath>
    </>
  );
}

/** An `sk-` animation hook, left off the still copy the river reflects. */
function hook(live: boolean, name: string) {
  return live ? name : undefined;
}

interface BeaconProps {
  uid: string;
  live: boolean;
}

function LotteBeacons({ uid, live }: BeaconProps) {
  return (
    <>
      <circle
        className={hook(live, "sk-glow")}
        cx="1090"
        cy="74"
        r="22"
        fill={`url(#${uid}-beacon)`}
      />
      <circle
        className={hook(live, "sk-beacon")}
        cx="1083"
        cy="64"
        r="1.8"
        fill="#ffd39a"
      />
      <circle
        className={hook(live, "sk-beacon")}
        cx="1097"
        cy="64"
        r="1.8"
        fill="#ffd39a"
      />
    </>
  );
}

function NTowerBeacon({ uid, live }: BeaconProps) {
  return (
    <>
      <circle
        className={hook(live, "sk-glow")}
        cx="570"
        cy="86"
        r="20"
        fill={`url(#${uid}-beacon)`}
      />
      <circle
        className={hook(live, "sk-beacon")}
        cx="570"
        cy="85"
        r="2.6"
        fill="#ff8a6b"
      />
    </>
  );
}

/** Palace boxes, padded a little: a window inside one is hidden. */
const PALACE_BOXES = [
  [432, 658, 495], // west wall
  [962, 1208, 495], // east wall
  [636, 984, 488], // stone platform
  [672, 948, 412], // lower storey and its roof
  [704, 916, 356], // upper storey and its roof
  [572, 660, 464], // western pines
  [964, 1078, 464], // eastern pines
] as const;

function behindPalace(x: number, y: number) {
  return PALACE_BOXES.some(
    ([x0, x1, top]) => x + 3 > x0 && x < x1 && y + 4 > top,
  );
}

/** How many front-row windows can go dark now and then. */
const SHUTTERS = 80;

/**
 * Front-row windows the palace does not cover, picked the same way on every
 * render. A building-coloured shutter over one turns that light off.
 */
function pickShutters(front: Building[]) {
  const rand = mulberry32(7);
  const open = front
    .flatMap((b) => b.windows)
    .filter((w) => !behindPalace(w.x, w.y));
  const picked: Building["windows"] = [];
  while (picked.length < SHUTTERS && open.length > 0) {
    picked.push(open.splice(Math.floor(rand() * open.length), 1)[0]);
  }
  return picked;
}

/**
 * Everything in the city that keeps moving once it is lit: beacons, water
 * glints, lantern glow and the window shutters. Being a small svg of its
 * own, its motion repaints a few dozen shapes rather than the whole city.
 */
function CityLights({
  viewBox,
  front,
}: {
  viewBox: string;
  front: Building[];
}) {
  const uid = useId().replace(/:/g, "");
  const shutters = useMemo(() => pickShutters(front), [front]);
  return (
    <svg
      viewBox={viewBox}
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMin slice"
      aria-hidden="true"
    >
      <defs>
        <SceneDefs uid={uid} />
      </defs>
      {shutters.map((w) => (
        <rect
          key={`${w.x}-${w.y}`}
          className="sk-shutter"
          x={w.x}
          y={w.y}
          width={3}
          height={4}
          fill="#0d0e2b"
          opacity="0"
        />
      ))}
      {/* lantern light below the eaves, over the city's own lanterns */}
      {[
        ...evenlySpaced(7, 720, 26.5).map((x) => [x, 455, 33]),
        ...evenlySpaced(5, 748, 26).map((x) => [x, 411, 3]),
      ].map(([x, y, h]) => (
        <rect
          key={`${x}-${y}`}
          className="sk-lantern-glow"
          x={x}
          y={y}
          width="20"
          height={h}
          fill={`url(#${uid}-hanok)`}
          opacity="0"
        />
      ))}
      <g className="sk-lotte">
        <LotteBeacons uid={uid} live />
      </g>
      {/* grows with the tower, from the same origin */}
      <g className="sk-ntower" data-origin="570 406">
        <NTowerBeacon uid={uid} live />
      </g>

      {/* glints on the water */}
      <g className="sk-glints">
        {[
          [1060, 560, 60],
          [1110, 590, 34],
          [540, 566, 46],
          [590, 600, 22],
          [800, 548, 120],
          [1330, 572, 40],
          [240, 584, 36],
        ].map(([x, y, w]) => (
          <rect
            key={`${x}-${y}`}
            className="sk-glint"
            x={x - w / 2}
            y={y}
            width={w}
            height="1.4"
            rx="0.7"
            fill="#ffc3a1"
            opacity="0.5"
          />
        ))}
      </g>
    </svg>
  );
}

interface CitySceneProps {
  uid: string;
  back: Building[];
  front: Building[];
  /**
   * The animated city carries the `sk-` hooks and starts the way the
   * entrance expects. The still copy has no hooks and is drawn fully lit.
   */
  live: boolean;
  staticWindows: boolean;
}

function CityScene({ uid, back, front, live, staticWindows }: CitySceneProps) {
  const windows = live && !staticWindows;
  return (
    <>
      {/* back row of the city */}
      <g className={hook(live, "sk-city-back")}>
        {back.map((b) => (
          <BuildingShape
            key={`b${b.x}`}
            b={b}
            fill="#1b1a4a"
            live={live}
            windows={windows}
          />
        ))}
        {!windows && <WindowPaths buildings={back} />}
      </g>

      {/* 63 Building, the golden tower by the Han */}
      <g className={hook(live, "sk-63")} data-origin={`1331 ${WATERLINE}`}>
        <path
          d={`M1306,${WATERLINE} L1310,262 L1330,244 L1354,250 L1356,${WATERLINE} Z`}
          fill={`url(#${uid}-gold)`}
        />
        {evenlySpaced(14, 272, 17).map((fy) => (
          <rect
            key={fy}
            x="1311"
            y={fy}
            width="44"
            height="1"
            fill="#3a2340"
            opacity="0.35"
          />
        ))}
      </g>

      {/* Lotte World Tower, home of the SEOUL SKY observatory */}
      <g className={hook(live, "sk-lotte")} data-origin={`1090 ${WATERLINE}`}>
        <path
          className={hook(live, "sk-lotte-body")}
          d={`M1052,${WATERLINE} C1055,400 1066,230 1080,120 L1083,62 L1088,108 L1092,108 L1097,62 L1100,120 C1114,230 1125,400 1128,${WATERLINE} Z`}
          fill={`url(#${uid}-lotte)`}
        />
        <path
          className={hook(live, "sk-lotte-sheen")}
          d={`M1093,112 C1105,230 1115,400 1119,${WATERLINE} L1126,${WATERLINE} C1122,400 1111,230 1098,112 Z`}
          fill={`url(#${uid}-lotteSheen)`}
        />
        <path
          d={`M1090,108 L1090,${WATERLINE}`}
          stroke="#ffc3a1"
          strokeOpacity="0.18"
          strokeWidth="1"
        />
        <path
          className={hook(live, "sk-lotte-outline")}
          d={`M1052,${WATERLINE} C1055,400 1066,230 1080,120 L1083,62 L1088,108 L1092,108 L1097,62 L1100,120 C1114,230 1125,400 1128,${WATERLINE}`}
          fill="none"
          stroke="#ffc3a1"
          strokeWidth="1.4"
          strokeLinejoin="round"
          // where the entrance leaves the live outline
          opacity={live ? undefined : 0.35}
        />
        {/* the live beacons blink in CityLights */}
        {!live && <LotteBeacons uid={uid} live={false} />}
      </g>

      {/* Namsan + N Seoul Tower */}
      <g className={hook(live, "sk-namsan")} clipPath={`url(#${uid}-above)`}>
        <path
          d={`M330,${WATERLINE} C410,470 476,410 570,402 C664,410 730,470 810,${WATERLINE} Z`}
          fill={`url(#${uid}-hill)`}
        />
        <path
          d="M430,474 C480,432 520,410 570,404"
          stroke="#a89bdb"
          strokeOpacity="0.25"
          fill="none"
        />
      </g>
      <g className={hook(live, "sk-ntower")} data-origin="570 406">
        <rect x="550" y="394" width="40" height="12" rx="2" fill="#0e1030" />
        <rect x="557" y="384" width="26" height="12" rx="2" fill="#13163a" />
        <path d="M563,386 L565.5,238 L574.5,238 L577,386 Z" fill="#15183f" />
        <path
          d="M572,238 L574.5,238 L577,386 L574,386 Z"
          fill="#ffc3a1"
          opacity="0.28"
        />
        <rect x="558" y="230" width="24" height="8" rx="2" fill="#13163a" />
        <rect x="549" y="204" width="42" height="27" rx="7" fill="#1a1c4a" />
        <rect
          className={hook(live, "sk-ntower-band")}
          x="552"
          y="213"
          width="36"
          height="4"
          rx="1"
          fill="#ffd39a"
        />
        <rect
          x="552"
          y="221"
          width="36"
          height="2"
          rx="1"
          fill="#ffb357"
          opacity="0.55"
        />
        <rect x="554" y="196" width="32" height="9" rx="3" fill="#13163a" />
        <rect x="566.5" y="112" width="7" height="86" fill="#e9e3f7" />
        {[116, 136, 156, 176].map((y) => (
          <rect key={y} x="566.5" y={y} width="7" height="10" fill="#d9503f" />
        ))}
        <rect x="569" y="84" width="2" height="30" fill="#e9e3f7" />
        {!live && <NTowerBeacon uid={uid} live={false} />}
      </g>

      {/* front row of the city */}
      <g className={hook(live, "sk-city-front")}>
        {front.map((b) => (
          <BuildingShape
            key={`f${b.x}`}
            b={b}
            fill="#0d0e2b"
            live={live}
            windows={windows}
          />
        ))}
        {!windows && <WindowPaths buildings={front} />}
      </g>

      {/* Gyeongbokgung's Geunjeongjeon throne hall */}
      <g className={hook(live, "sk-palace")}>
        {/* pine trees */}
        <g className={hook(live, "sk-palace-part")} fill="#070818">
          {[598, 628, 990, 1020, 1046].map((x, i) => (
            <g key={x}>
              <ellipse cx={x} cy={492 - (i % 2) * 6} rx="22" ry="10" />
              <ellipse cx={x + 6} cy={480 - (i % 2) * 6} rx="16" ry="8" />
              <rect x={x - 2} y={490} width="4" height="30" />
            </g>
          ))}
        </g>
        {/* walls */}
        <g className={hook(live, "sk-palace-part")}>
          <rect x="440" y="504" width="210" height="16" fill="#0a0b24" />
          <rect x="436" y="499" width="218" height="6" rx="2" fill="#16183f" />
          <rect x="970" y="504" width="230" height="16" fill="#0a0b24" />
          <rect x="966" y="499" width="238" height="6" rx="2" fill="#16183f" />
        </g>
        {/* stone platform */}
        <g className={hook(live, "sk-palace-part")}>
          <rect x="640" y="504" width="340" height="16" fill="#151638" />
          <rect x="672" y="492" width="276" height="12" fill="#1c1d45" />
          <rect x="792" y="492" width="36" height="28" fill="#24255a" />
          {[497, 503, 509, 515].map((y) => (
            <rect key={y} x="792" y={y} width="36" height="1" fill="#0b0c26" />
          ))}
        </g>
        {/* lower storey */}
        <g className={hook(live, "sk-palace-part")}>
          <rect x="712" y="446" width="196" height="46" fill="#0b0c26" />
          {evenlySpaced(7, 720, 26.5).map((lx) => (
            <rect
              key={lx}
              className={hook(live, "sk-lantern")}
              x={lx}
              y="452"
              width="20"
              height="36"
              fill={`url(#${uid}-hanok)`}
              opacity="0.5"
            />
          ))}
          <path
            className={hook(live, "sk-roof")}
            d="M676,440 C694,452 722,455 748,453 L872,453 C898,455 926,452 944,440 C928,437 910,429 894,416 L726,416 C710,429 692,437 676,440 Z"
            fill="#090a20"
          />
          <path
            d="M676,440 C694,452 722,455 748,453 L872,453 C898,455 926,452 944,440"
            fill="none"
            stroke="#ffc3a1"
            strokeOpacity="0.45"
            strokeWidth="1.2"
          />
        </g>
        {/* upper storey */}
        <g className={hook(live, "sk-palace-part")}>
          <rect x="742" y="396" width="136" height="22" fill="#0b0c26" />
          {evenlySpaced(5, 748, 26).map((lx) => (
            <rect
              key={lx}
              className={hook(live, "sk-lantern")}
              x={lx}
              y="400"
              width="20"
              height="14"
              fill={`url(#${uid}-hanok)`}
              opacity="0.5"
            />
          ))}
          <path
            className={hook(live, "sk-roof")}
            d="M708,398 C726,409 752,411 772,409 L848,409 C868,411 894,409 912,398 C898,395 884,388 868,374 L752,374 C736,388 722,395 708,398 Z"
            fill="#090a20"
          />
          <path
            d="M708,398 C726,409 752,411 772,409 L848,409 C868,411 894,409 912,398"
            fill="none"
            stroke="#ffc3a1"
            strokeOpacity="0.45"
            strokeWidth="1.2"
          />
          <rect x="748" y="369" width="124" height="6" rx="2" fill="#090a20" />
          <path d="M742,375 L747,360 L755,370 Z" fill="#090a20" />
          <path d="M878,375 L873,360 L865,370 Z" fill="#090a20" />
        </g>
      </g>

      {/* lamps along the riverside */}
      <g className={hook(live, "sk-riverlights")}>
        {evenlySpaced(40, 20, 40).map((cx) => (
          <circle
            key={cx}
            cx={cx}
            cy={WATERLINE - 1.5}
            r="1.3"
            fill="#ffd39a"
          />
        ))}
      </g>
    </>
  );
}

/**
 * The city's reflection in the river: a still copy of the scene, flipped
 * at the waterline and rippled. As a live `<use>` of the animated city, its
 * ripple filter ran again on every frame that a window, beacon or lantern
 * changed. Since it never changes, it is drawn once as svg and then swapped
 * for an image of itself: one picture for the compositor, where the filter
 * and mask over a thousand-odd shapes cost it time on every frame.
 */
function CityReflection({
  viewBox,
  back,
  front,
}: {
  viewBox: string;
  back: Building[];
  front: Building[];
}) {
  const uid = useId().replace(/:/g, "");
  const ref = useRef<SVGSVGElement>(null);
  const [image, setImage] = useState<{ viewBox: string; src: string }>();

  useEffect(() => {
    // the svg is on the page only until its image is ready for this crop
    const svg = ref.current;
    if (!svg) return;
    const markup = new XMLSerializer().serializeToString(svg);
    const src = URL.createObjectURL(
      new Blob([markup], { type: "image/svg+xml" }),
    );
    setImage({ viewBox, src });
  }, [viewBox]);

  useEffect(() => {
    const src = image?.src;
    return () => {
      if (src) URL.revokeObjectURL(src);
    };
  }, [image]);

  // the wrapper stays put when its content is swapped, for the animations
  // that hold on to it
  if (image?.viewBox === viewBox) {
    return (
      <div className="sk-reflection absolute inset-0">
        {/* biome-ignore lint/performance/noImgElement: a blob URL, not an asset */}
        <img
          src={image.src}
          alt=""
          aria-hidden="true"
          className="h-full w-full"
        />
      </div>
    );
  }
  return (
    <div className="sk-reflection absolute inset-0">
      <svg
        ref={ref}
        viewBox={viewBox}
        className="h-full w-full"
        preserveAspectRatio="xMidYMin slice"
        aria-hidden="true"
      >
        <defs>
          <SceneDefs uid={uid} />
          <linearGradient
            id={`${uid}-fade`}
            x1="0"
            y1={WATERLINE}
            x2="0"
            y2={VIEW_H}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#fff" stopOpacity="0.55" />
            <stop offset="0.8" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <mask
            id={`${uid}-mask`}
            maskUnits="userSpaceOnUse"
            x="0"
            y={WATERLINE}
            width={VIEW_W}
            height={VIEW_H - WATERLINE}
          >
            <rect
              x="0"
              y={WATERLINE}
              width={VIEW_W}
              height={VIEW_H - WATERLINE}
              fill={`url(#${uid}-fade)`}
            />
          </mask>
          <filter
            id={`${uid}-ripple`}
            x="0"
            y={WATERLINE}
            width={VIEW_W}
            height={VIEW_H - WATERLINE}
            filterUnits="userSpaceOnUse"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.004 0.09"
              numOctaves="2"
              seed="3"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="9"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
        <g filter={`url(#${uid}-ripple)`} mask={`url(#${uid}-mask)`}>
          <g transform={`matrix(1 0 0 -1 0 ${WATERLINE * 2})`}>
            <CityScene
              uid={uid}
              back={back}
              front={front}
              live={false}
              staticWindows
            />
          </g>
        </g>
      </svg>
    </div>
  );
}

export function CityLayer({
  className,
  viewBox = WIDE_VIEWBOX,
  staticWindows = false,
}: CityLayerProps) {
  const uid = useId().replace(/:/g, "");
  const back = useMemo(() => makeBuildings(42, backHeights, 26, 54, 0.16), []);
  const front = useMemo(
    () => makeBuildings(1337, frontHeights, 22, 46, 0.28),
    [],
  );

  return (
    <div className={cn("relative", className)}>
      <CityReflection viewBox={viewBox} back={back} front={front} />
      <svg
        viewBox={viewBox}
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMin slice"
        aria-hidden="true"
      >
        <defs>
          <SceneDefs uid={uid} />
        </defs>

        <CityScene
          uid={uid}
          back={back}
          front={front}
          live
          staticWindows={staticWindows}
        />

        {/* landmark call-outs */}
        <g
          className="sk-labels"
          fontFamily="var(--font-mono)"
          fill="#f4f0ff"
          stroke="#0b0d26"
          strokeWidth="3"
          strokeLinejoin="round"
          paintOrder="stroke"
        >
          {[
            {
              path: "M564,92 L524,56 L502,56",
              dot: [564, 92],
              y: 56,
              x: 496,
              anchor: "end",
              title: "N SEOUL TOWER",
              sub: "남산서울타워 · 236M",
            },
            {
              path: "M1100,66 L1140,32 L1162,32",
              dot: [1100, 66],
              y: 32,
              x: 1168,
              anchor: "start",
              title: "LOTTE WORLD TOWER",
              sub: "롯데월드타워 · 555M",
            },
            {
              path: "M910,410 L950,446 L972,446",
              dot: [910, 410],
              y: 446,
              x: 978,
              anchor: "start",
              title: "GYEONGBOKGUNG",
              sub: "경복궁 · EST. 1395",
            },
          ].map((l) => {
            const { y } = l;
            return (
              <g key={l.title} className="sk-label">
                <path
                  className="sk-label-line"
                  d={l.path}
                  fill="none"
                  stroke="#ffc3a1"
                  strokeOpacity="0.7"
                  strokeWidth="0.8"
                />
                <circle
                  className="sk-label-dot"
                  cx={l.dot[0]}
                  cy={l.dot[1]}
                  r="2"
                  fill="#ffc3a1"
                />
                <text
                  className="sk-label-text"
                  x={l.x}
                  y={y - 2}
                  textAnchor={l.anchor as "start" | "end"}
                  fontSize="10"
                  letterSpacing="1.6"
                  fillOpacity="0.92"
                >
                  {l.title}
                </text>
                <text
                  className="sk-label-text"
                  x={l.x}
                  y={y + 11}
                  textAnchor={l.anchor as "start" | "end"}
                  fontSize="8.5"
                  letterSpacing="1"
                  fillOpacity="0.55"
                >
                  {l.sub}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
      <CityLights viewBox={viewBox} front={front} />
    </div>
  );
}
