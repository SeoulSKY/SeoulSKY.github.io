import { useId, useMemo } from "react";
import { mulberry32 } from "@/lib/random";

/**
 * Seoul at night, seen from a train on the Han: the far ridges, two rows of
 * towers with lit windows, Namsan with N Seoul Tower, the 63 Building and
 * Lotte World Tower, a bridge strung with lights, and the river carrying
 * their reflections. It runs behind the Projects train, showing through its
 * windows, and slides past in parallax as the train rides.
 *
 * One static svg, painted once and only ever moved as a whole. It is
 * `CITY_W` units wide and 1000 tall, horizon at `HORIZON`, so it is drawn
 * at the stage's height and `CITY_W / 1000` times as wide.
 */
export const CITY_W = 3600;
const HORIZON = 560;

/** Lit-window colours: mostly warm, some cool office light. */
const LIGHTS = ["#ffd39a", "#ffb357", "#ffe6c4", "#f4f0ff", "#b9cdfa"];

interface Building {
  x: number;
  w: number;
  h: number;
  /** a set-back crown or a spire on top */
  crown: "flat" | "step" | "spire";
  lights: [number, number, string][];
}

function buildRow(
  seed: number,
  {
    minH,
    maxH,
    minW,
    maxW,
    lit,
    gaps,
  }: {
    minH: number;
    maxH: number;
    minW: number;
    maxW: number;
    lit: number;
    /** spans left clear for the landmarks */
    gaps: [number, number][];
  },
): Building[] {
  const rand = mulberry32(seed);
  const row: Building[] = [];
  let x = -20;
  while (x < CITY_W + 20) {
    const w = Math.round(minW + rand() * (maxW - minW));
    const clear = gaps.some(([a, b]) => x + w > a && x < b);
    if (clear) {
      x += w;
      continue;
    }
    const h = Math.round(minH + rand() ** 1.6 * (maxH - minH));
    const r = rand();
    const crown = r < 0.18 ? "step" : r < 0.26 ? "spire" : "flat";
    const lights: [number, number, string][] = [];
    for (let cy = HORIZON - h + 12; cy < HORIZON - 10; cy += 13) {
      for (let cx = x + 6; cx < x + w - 8; cx += 10) {
        if (rand() < lit) {
          lights.push([
            cx,
            cy,
            LIGHTS[Math.floor(rand() * LIGHTS.length) % LIGHTS.length],
          ]);
        }
      }
    }
    row.push({ x, w, h, crown, lights });
    x += w + Math.round(rand() * 10);
  }
  return row;
}

/** Namsan, N Seoul Tower, the 63 Building and Lotte World Tower. */
const NAMSAN_X = 1080;
const SIXTY3_X = 1960;
const LOTTE_X = 2780;

export default function NightCity({ className }: { className?: string }) {
  // plain ids: this svg is also serialised into an image for the windows
  const id = `nc${useId().replace(/[^\w-]/g, "")}`;

  const { back, front, bridge, reflections } = useMemo(() => {
    const back = buildRow(41, {
      minH: 60,
      maxH: 230,
      minW: 34,
      maxW: 90,
      lit: 0.08,
      gaps: [[LOTTE_X - 40, LOTTE_X + 40]],
    });
    const front = buildRow(7, {
      minH: 40,
      maxH: 190,
      minW: 40,
      maxW: 110,
      lit: 0.2,
      gaps: [
        [NAMSAN_X - 150, NAMSAN_X + 150],
        [SIXTY3_X - 40, SIXTY3_X + 40],
        [LOTTE_X - 60, LOTTE_X + 60],
      ],
    });
    // a bridge across the middle of the view, lamps every 26 units
    const lamps: number[] = [];
    for (let x = 1320; x <= 3300; x += 26) lamps.push(x);
    // the lit windows of the front row, smeared down into the water
    const rand = mulberry32(99);
    const reflections = front
      .filter((b) => b.lights.length > 3)
      .map((b) => ({
        x: b.x + b.w * (0.2 + rand() * 0.6),
        w: 2 + Math.round(rand() * 4),
        h: 60 + Math.round(rand() * 160),
      }));
    return { back, front, bridge: lamps, reflections };
  }, []);

  return (
    <svg
      viewBox={`0 0 ${CITY_W} 1000`}
      preserveAspectRatio="xMinYMid meet"
      className={className}
      style={{ aspectRatio: `${CITY_W} / 1000` }}
      aria-hidden="true"
    >
      <defs>
        {/* the dusk still lingering on the horizon */}
        <linearGradient id={`${id}-haze`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4a3483" stopOpacity="0" />
          <stop offset="0.55" stopColor="#4a3483" stopOpacity="0.28" />
          <stop offset="0.85" stopColor="#9b5f9c" stopOpacity="0.3" />
          <stop offset="1" stopColor="#e894ad" stopOpacity="0.34" />
        </linearGradient>
        <linearGradient id={`${id}-river`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1a1748" />
          <stop offset="0.25" stopColor="#0d0e2b" />
          <stop offset="1" stopColor="#06071a" />
        </linearGradient>
        <linearGradient id={`${id}-streak`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffd39a" stopOpacity="0.55" />
          <stop offset="1" stopColor="#ffd39a" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={`${id}-glow`}>
          <stop offset="0" stopColor="#ffb357" stopOpacity="0.5" />
          <stop offset="1" stopColor="#ffb357" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* sky haze down to the horizon; above it the starfield shows */}
      <rect
        x="0"
        y="180"
        width={CITY_W}
        height={HORIZON - 180}
        fill={`url(#${id}-haze)`}
      />

      {/* Bukhansan's ridges, far behind */}
      <path
        d={`M0 ${HORIZON} L0 470 C160 430 260 380 380 400 C470 414 520 352 640 340 C760 330 820 410 930 420 C1040 430 1120 360 1260 372 C1380 384 1460 440 1600 430 C1760 420 1820 360 1980 356 C2140 352 2220 420 2380 424 C2520 428 2600 380 2760 384 C2920 388 3040 440 3200 436 C3360 432 3460 400 3600 410 L3600 ${HORIZON} Z`}
        fill="#1b1a4a"
      />

      {/* the back row of towers, dim */}
      <g fill="#15183f">
        {back.map((b) => (
          <rect key={b.x} x={b.x} y={HORIZON - b.h} width={b.w} height={b.h} />
        ))}
      </g>
      <g>
        {back.flatMap((b) =>
          b.lights.map(([x, y, c]) => (
            <rect
              key={`${x},${y}`}
              x={x}
              y={y}
              width={4}
              height={6}
              fill={c}
              fillOpacity={0.45}
            />
          )),
        )}
      </g>

      {/* Namsan and N Seoul Tower, its beacon lit */}
      <path
        d={`M${NAMSAN_X - 260} ${HORIZON} C${NAMSAN_X - 170} 500 ${NAMSAN_X - 90} 452 ${NAMSAN_X} 448 C${NAMSAN_X + 90} 452 ${NAMSAN_X + 170} 500 ${NAMSAN_X + 260} ${HORIZON} Z`}
        fill="#101233"
      />
      <g transform={`translate(${NAMSAN_X} 448)`}>
        <rect x="-22" y="-14" width="44" height="14" rx="2" fill="#0e1030" />
        <path d="M-7 -14 L-5 -150 L5 -150 L7 -14 Z" fill="#15183f" />
        <rect x="-26" y="-178" width="52" height="28" rx="9" fill="#1a1c4a" />
        <rect
          x="-24"
          y="-166"
          width="48"
          height="4"
          fill="#ffd39a"
          fillOpacity={0.9}
        />
        <rect x="-18" y="-186" width="36" height="9" rx="3" fill="#13163a" />
        <rect x="-3.5" y="-262" width="7" height="78" fill="#e9e3f7" />
        {[-252, -232, -212].map((y) => (
          <rect key={y} x="-3.5" y={y} width="7" height="8" fill="#d9503f" />
        ))}
        <rect x="-1" y="-292" width="2" height="30" fill="#e9e3f7" />
        <circle cy="-294" r="18" fill={`url(#${id}-glow)`} />
        <circle cy="-294" r="3" fill="#ff8a6b" />
      </g>

      {/* the 63 Building: a golden glass tower, stepped at the crown */}
      <g transform={`translate(${SIXTY3_X} ${HORIZON})`}>
        <path d="M-30 0 L-30 -230 Q-24 -262 0 -270 L0 0 Z" fill="#3a2d38" />
        <path d="M0 0 L0 -270 Q24 -262 30 -230 L30 0 Z" fill="#2a2132" />
        {[-250, -220, -190, -160, -130, -100, -70, -40].map((y) => (
          <rect
            key={y}
            x="-26"
            y={y}
            width="52"
            height="2"
            fill="#ffc3a1"
            fillOpacity={0.22}
          />
        ))}
      </g>

      {/* Lotte World Tower: the long taper and the split crown */}
      <g transform={`translate(${LOTTE_X} ${HORIZON})`}>
        <path
          d="M-46 0 C-40 -150 -22 -330 -6 -440 L-2 -470 L0 -440 L2 -470 L6 -440 C22 -330 40 -150 46 0 Z"
          fill="#191b45"
        />
        <path d="M0 0 L0 -440 L6 -440 C22 -330 40 -150 46 0 Z" fill="#13163a" />
        <path
          d="M-2 -440 L-6 -440 C-22 -330 -40 -150 -46 0"
          fill="none"
          stroke="#a89bdb"
          strokeOpacity={0.35}
          strokeWidth={1.5}
        />
        <circle cy="-470" r="22" fill={`url(#${id}-glow)`} />
        <circle cy="-470" r="2.6" fill="#ffd39a" />
      </g>

      {/* the front row, darker, with more windows lit */}
      <g fill="#0d0e2b">
        {front.map((b) => (
          <g key={b.x}>
            <rect x={b.x} y={HORIZON - b.h} width={b.w} height={b.h} />
            {b.crown === "step" && (
              <rect
                x={b.x + b.w * 0.2}
                y={HORIZON - b.h - 14}
                width={b.w * 0.6}
                height={14}
              />
            )}
            {b.crown === "spire" && (
              <rect
                x={b.x + b.w / 2 - 1}
                y={HORIZON - b.h - 36}
                width={2}
                height={36}
              />
            )}
          </g>
        ))}
      </g>
      <g>
        {front.flatMap((b) =>
          b.lights.map(([x, y, c]) => (
            <rect
              key={`${x},${y}`}
              x={x}
              y={y}
              width={5}
              height={7}
              fill={c}
              fillOpacity={0.85}
            />
          )),
        )}
      </g>
      {/* red aviation lights on the spires */}
      {front
        .filter((b) => b.crown === "spire")
        .map((b) => (
          <circle
            key={b.x}
            cx={b.x + b.w / 2}
            cy={HORIZON - b.h - 37}
            r={3}
            fill="#ff6b5b"
          />
        ))}

      {/* the river */}
      <rect
        x="0"
        y={HORIZON}
        width={CITY_W}
        height={1000 - HORIZON}
        fill={`url(#${id}-river)`}
      />
      <rect
        x="0"
        y={HORIZON}
        width={CITY_W}
        height="2"
        fill="#e894ad"
        fillOpacity={0.35}
      />
      {/* the city's lights smeared down into the water */}
      <g>
        {reflections.map((r) => (
          <rect
            key={r.x}
            x={r.x}
            y={HORIZON + 6}
            width={r.w}
            height={r.h}
            fill={`url(#${id}-streak)`}
            fillOpacity={0.5}
          />
        ))}
      </g>

      {/* a bridge across the Han, its lamps and their reflections */}
      <g>
        <rect x="1300" y="574" width="2020" height="7" fill="#0b0c26" />
        <rect
          x="1300"
          y="572"
          width="2020"
          height="2"
          fill="#a89bdb"
          fillOpacity={0.4}
        />
        {[1420, 1720, 2020, 2320, 2620, 2920, 3220].map((x) => (
          <rect
            key={x}
            x={x - 5}
            y="581"
            width="10"
            height="44"
            fill="#0b0c26"
          />
        ))}
        {bridge.map((x) => (
          <g key={x}>
            <circle cx={x} cy="569" r="2.2" fill="#ffd39a" />
            <rect
              x={x - 1}
              y="590"
              width="2"
              height="70"
              fill={`url(#${id}-streak)`}
              fillOpacity={0.6}
            />
          </g>
        ))}
      </g>
    </svg>
  );
}
