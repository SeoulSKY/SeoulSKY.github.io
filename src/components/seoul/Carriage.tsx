/**
 * Inside a Seoul Metro carriage, facing a pair of doors — modelled on a
 * modern Seoul EMU: a recessed vestibule with white jambs, embossed
 * stainless door leaves with rounded windows, curved stanchions,
 * seat-end wing partitions, patterned bench seats, triangle hand straps,
 * the LCD route display above the doors and the blue vinyl floor.
 *
 * Everything is one SVG so it scales as a single picture. GSAP hooks:
 *   .pl-cabin          whole scene (brake jolt)
 *   .pl-door-l / -r    door leaves (slide ±DOOR_TRAVEL into the pockets)
 *   .pl-strap          hand straps (sway; data-origin = pivot)
 *   .pl-mini-dot       LCD route stations (data-origin)   .pl-mini-here  terminus
 *   .pl-door-sign      LCD text groups
 */

import { mulberry32 } from "@/lib/random";

const LINE2 = "#00a84d";

/* door geometry (landscape units) */
const JAMB = { x0: 520, x1: 1080, y0: 150, y1: 890 }; // outer opening
const DOOR = { x0: 548, x1: 1052, y0: 176, y1: 880 }; // door plane
const MID = 800;
export const DOOR_TRAVEL = MID - DOOR.x0; // 252
/** The doorway's centre as a fraction of the viewBox (for the camera push). */
export const DOORWAY_CENTER = { x: 0.5, y: (DOOR.y0 + DOOR.y1) / 2 };

export const CARRIAGE_VIEWBOX = {
  landscape: "0 0 1600 1000",
  portrait: "455 -170 690 1340",
};

const STRAP_X = [100, 230, 360];
const RAIL_Y = 160; // top of the strap rail (9 units thick)
const RAIL_CY = RAIL_Y + 4.5;

/** A triangle hand strap, clamped around the ceiling rail. */
function Strap({ x, id }: { x: number; id: string }) {
  const band0 = RAIL_Y + 8;
  const buckle = band0 + 70;
  const h0 = buckle + 14; // top of the handle
  const h1 = h0 + 60; // bottom bar of the handle
  return (
    <g className="pl-strap" data-origin={`${x} ${RAIL_CY}`}>
      {/* soft shadow on the wall */}
      <path
        d={`M${x + 12},${band0 + 6} V${buckle} M${x + 12},${h0 + 6} l26,48 q2,10 -8,10 h-36 q-10,0 -8,-10 z`}
        stroke="#000"
        strokeOpacity="0.08"
        strokeWidth="10"
        fill="none"
        filter={`url(#${id}-soft)`}
      />
      <rect
        x={x - 5}
        y={band0}
        width={10}
        height={buckle - band0 + 2}
        rx={2}
        fill={`url(#${id}-strap)`}
      />
      {/* clamp wrapping the rail */}
      <rect
        x={x - 9}
        y={RAIL_Y - 4}
        width={18}
        height={20}
        rx={5}
        fill={`url(#${id}-strap)`}
        stroke="#9a9eaa"
        strokeWidth="1"
      />
      <rect x={x - 7} y={buckle} width={14} height={16} rx={4} fill="#c8cbd4" />
      <path
        d={`M${x},${h0} L${x + 27},${h1 - 10} Q${x + 30},${h1} ${x + 19},${h1} L${x - 19},${h1} Q${x - 30},${h1} ${x - 27},${h1 - 10} Z`}
        fill="none"
        stroke={`url(#${id}-handle)`}
        strokeWidth="10"
        strokeLinejoin="round"
      />
      <path
        d={`M${x - 3},${h0 + 6} L${x - 23},${h1 - 14}`}
        stroke="#fff"
        strokeOpacity="0.8"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </g>
  );
}

/* stanchion: rises from the seat-end partition, meets the strap rail and
   bends into the door header */
const POLE_X = 486;
const POLE_L = `M${POLE_X},566 L${POLE_X},204 C${POLE_X},174 498,160 522,154`;
const mirrorPath = (d: string) =>
  d.replace(
    /(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/g,
    (_, x, y) => `${1600 - Number(x)},${y}`,
  );

function Pole({ side, id }: { side: "l" | "r"; id: string }) {
  const d = side === "l" ? POLE_L : mirrorPath(POLE_L);
  const dir = side === "l" ? 1 : -1;
  const px = side === "l" ? POLE_X : 1600 - POLE_X;
  return (
    <g>
      <path
        d={d}
        transform={`translate(${12 * dir} 8)`}
        stroke="#000"
        strokeOpacity="0.12"
        strokeWidth="20"
        fill="none"
        filter={`url(#${id}-soft)`}
      />
      <path
        d={d}
        stroke="#8d929e"
        strokeWidth="17"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d={d}
        stroke="#d4d7df"
        strokeWidth="12"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d={d}
        transform={`translate(${-3 * dir} 0)`}
        stroke="#fff"
        strokeWidth="3.5"
        strokeOpacity="0.95"
        fill="none"
        strokeLinecap="round"
      />
      {/* tee joint where the strap rail meets the pole */}
      <rect
        x={px - 13}
        y={RAIL_Y - 5}
        width="26"
        height="19"
        rx="5"
        fill="#b4b8c3"
        stroke="#8d929e"
        strokeWidth="1.5"
      />
      {/* collar where the pole meets the partition */}
      <rect x={px - 13} y="560" width="26" height="12" rx="4" fill="#a3a7b3" />
    </g>
  );
}

const WING =
  "M500,560 L500,884 Q500,912 472,912 L420,912 C392,912 378,890 378,856 L378,704 C378,624 410,574 472,560 Z";

/* bench seats: equal-width cushions running away from the partition */
const SEAT_END = 378; // where the partition's face meets the bench
const SEAT_W = 128;
const SEATS = 6;

function Bench({ id }: { id: string }) {
  return (
    <g>
      {/* seat frame behind the cushions (fills the seams, runs under the partition) */}
      <rect
        x="-300"
        y="592"
        width={SEAT_END + 96 + 300}
        height="214"
        rx="6"
        fill="#c9ccd5"
      />
      {Array.from({ length: SEATS }, (_, i) => {
        const x0 = SEAT_END - (i + 1) * SEAT_W;
        const priority = i === 0;
        // every seat is the same width; the seat frame fills in behind the partition
        const backW = SEAT_W - 6;
        const seatW = SEAT_W - 4;
        const fabric = priority ? `url(#${id}-priority)` : `url(#${id}-fabric)`;
        return (
          // biome-ignore lint/suspicious/noArrayIndexKey: fixed set of seats
          <g key={i}>
            <rect
              x={x0 + 3}
              y="598"
              width={backW}
              height="142"
              rx="14"
              fill={fabric}
            />
            <rect
              x={x0 + 3}
              y="598"
              width={backW}
              height="142"
              rx="14"
              fill={`url(#${id}-cushion)`}
            />
            <rect
              x={x0 + 2}
              y="744"
              width={seatW}
              height="56"
              rx="10"
              fill={fabric}
            />
            <rect
              x={x0 + 2}
              y="744"
              width={seatW}
              height="56"
              rx="10"
              fill={`url(#${id}-seatTop)`}
            />
          </g>
        );
      })}
      <rect
        x="-300"
        y="806"
        width={SEAT_END + 96 + 300}
        height="74"
        fill={`url(#${id}-underSeat)`}
      />
    </g>
  );
}

/* ── The view outside ─────────────────────────────────────
   One continuous dusk scene in carriage coordinates, seen through every
   window. The horizon sits at a single eye level for all of them, so the
   door windows (set slightly higher) simply show a little less ground. */

const HORIZON = 455;

function buildRow(
  seed: number,
  minW: number,
  maxW: number,
  minH: number,
  maxH: number,
  litChance: number,
) {
  const rand = mulberry32(seed);
  const out: {
    x: number;
    w: number;
    h: number;
    lit: { x: number; y: number }[];
  }[] = [];
  let x = -20;
  while (x < 1620) {
    const w = Math.round(minW + rand() * (maxW - minW));
    const h = Math.round(minH + rand() * (maxH - minH));
    const lit: { x: number; y: number }[] = [];
    for (let wy = HORIZON - h + 4; wy < HORIZON - 3; wy += 5) {
      for (let wx = x + 3; wx < x + w - 3; wx += 4) {
        if (rand() < litChance) lit.push({ x: wx, y: wy });
      }
    }
    out.push({ x, w, h, lit });
    x += w + Math.round(rand() * 3);
  }
  return out;
}

const FAR_ROW = buildRow(7, 10, 24, 10, 38, 0);
const NEAR_ROW = buildRow(23, 12, 30, 6, 30, 0.22);
const LIT_COLORS = ["#ffd39a", "#ffb357", "#ffe8cc", "#ffc3a1"];

function CityView({ id }: { id: string }) {
  return (
    <g>
      {/* distant blocks, softened by haze */}
      {FAR_ROW.map((b) => (
        <rect
          key={`f${b.x}`}
          x={b.x}
          y={HORIZON - b.h}
          width={b.w}
          height={b.h}
          fill="#2c2766"
        />
      ))}

      {/* Namsan with N Seoul Tower (seen from the left side) */}
      <path
        d={`M120,${HORIZON} C160,${HORIZON - 26} 190,${HORIZON - 34} 214,${HORIZON - 34} C240,${HORIZON - 34} 270,${HORIZON - 24} 310,${HORIZON} Z`}
        fill="#1b1a48"
      />
      <rect x="212" y={HORIZON - 92} width="4" height="60" fill="#1b1a48" />
      <rect
        x="206"
        y={HORIZON - 100}
        width="16"
        height="9"
        rx="3"
        fill="#1b1a48"
      />
      <rect
        x="208"
        y={HORIZON - 96}
        width="12"
        height="1.6"
        fill="#ffd39a"
        opacity="0.9"
      />
      <rect x="213" y={HORIZON - 128} width="2" height="28" fill="#1b1a48" />
      <circle cx="214" cy={HORIZON - 129} r="1.8" fill="#ff8a6b" />

      {/* Lotte World Tower (seen from the right side) */}
      <path
        d={`M1388,${HORIZON} C1390,${HORIZON - 50} 1395,${HORIZON - 100} 1399,${HORIZON - 128} L1400,${HORIZON - 140} L1402,${HORIZON - 130} L1404,${HORIZON - 140} L1405,${HORIZON - 128} C1409,${HORIZON - 100} 1414,${HORIZON - 50} 1416,${HORIZON} Z`}
        fill="#1b1a48"
      />
      <path
        d={`M1404,${HORIZON - 126} C1407,${HORIZON - 96} 1411,${HORIZON - 50} 1413,${HORIZON}`}
        stroke="#ffc3a1"
        strokeOpacity="0.35"
        strokeWidth="1"
        fill="none"
      />
      <circle cx="1402" cy={HORIZON - 138} r="1.6" fill="#ffd39a" />

      {/* near blocks with lit windows */}
      {NEAR_ROW.map((b) => (
        <g key={`n${b.x}`}>
          <rect
            x={b.x}
            y={HORIZON - b.h}
            width={b.w}
            height={b.h}
            fill="#11122f"
          />
          {b.lit.map((l, i) => (
            <rect
              key={`${l.x}-${l.y}`}
              x={l.x}
              y={l.y}
              width="1.8"
              height="2.2"
              fill={LIT_COLORS[i % LIT_COLORS.length]}
              opacity="0.9"
            />
          ))}
        </g>
      ))}

      {/* the Han below the horizon, holding the last of the dusk */}
      <rect
        x="-20"
        y={HORIZON}
        width="1640"
        height="140"
        fill={`url(#${id}-river)`}
      />
      <rect
        x="-20"
        y={HORIZON}
        width="1640"
        height="1.5"
        fill="#ffc3a1"
        opacity="0.25"
      />
      {[90, 330, 640, 700, 880, 980, 1260, 1480].map((x) => (
        <rect
          key={x}
          x={x}
          y={HORIZON + 8 + (x % 7)}
          width={30 + (x % 23)}
          height="1.2"
          rx="0.6"
          fill="#ffb357"
          opacity="0.35"
        />
      ))}
    </g>
  );
}

type PosterKind = "skyline" | "ytnoti" | "sorusora" | "desdemona";

/** A small subway ad: each one advertises a piece of the portfolio. */
function Poster({
  x,
  w,
  kind,
  id,
}: {
  x: number;
  w: number;
  kind: PosterKind;
  id: string;
}) {
  const y = 109;
  const h = 36;
  const clip = `${id}-poster-${kind}`;
  const title = (t: string, fill: string, dx = 0) => (
    <text
      x={x + 44 + dx}
      y={y + 17}
      fontFamily="var(--font-display)"
      fontWeight="800"
      fontSize="13.5"
      letterSpacing="-0.3"
      fill={fill}
    >
      {t}
    </text>
  );
  const sub = (t: string, fill: string, dx = 0) => (
    <text
      x={x + 44 + dx}
      y={y + 29}
      fontFamily="var(--font-mono)"
      fontSize="7.2"
      letterSpacing="0.6"
      fill={fill}
    >
      {t}
    </text>
  );
  return (
    <g>
      <clipPath id={clip}>
        <rect x={x} y={y} width={w} height={h} rx="3" />
      </clipPath>
      <g clipPath={`url(#${clip})`}>
        {kind === "skyline" && (
          <>
            <rect x={x} y={y} width={w} height={h} fill={`url(#${id}-dusk)`} />
            {/* Namsan + N Seoul Tower, Lotte World Tower, a few blocks */}
            <path
              d={`M${x},${y + h} L${x},${y + 30} Q${x + 18},${y + 22} ${x + 34},${y + 27} L${x + 34},${y + h} Z
                  M${x + 25},${y + 24} L${x + 25.6},${y + 8} L${x + 26.4},${y + 8} L${x + 27},${y + 24} Z
                  M${x + w - 34},${y + h} C${x + w - 33},${y + 22} ${x + w - 30},${y + 10} ${x + w - 28},${y + 3} L${x + w - 26},${y + 10} C${x + w - 24},${y + 22} ${x + w - 22},${y + h - 2} ${x + w - 21},${y + h} Z`}
              fill="#0b0d26"
            />
            <rect
              x={x + 23}
              y={y + 11}
              width={5}
              height={3}
              rx="1"
              fill="#0b0d26"
            />
            {[40, 52, 60, 70, 82, 96, 108, 118].map((dx, i) => (
              <rect
                key={dx}
                x={x + dx + 18}
                y={y + h - 4 - (i % 3) * 2}
                width={8}
                height={4 + (i % 3) * 2}
                fill="#0b0d26"
              />
            ))}
            <circle cx={x + 26} cy={y + 7} r="1.4" fill="#ffb357" />
            <text
              x={x + 44}
              y={y + 16}
              fontFamily="var(--font-display)"
              fontWeight="800"
              fontSize="14"
              letterSpacing="-0.4"
              fill="#fff"
            >
              SeoulSKY
            </text>
            <text
              x={x + 44}
              y={y + 25}
              fontFamily="var(--font-kr)"
              fontWeight="600"
              fontSize="7"
              letterSpacing="1.4"
              fill="#ffc3a1"
            >
              서울하늘 · 포트폴리오
            </text>
          </>
        )}
        {kind === "ytnoti" && (
          <>
            <rect x={x} y={y} width={w} height={h} fill="#ffffff" />
            <rect x={x} y={y} width={5} height={h} fill="#ff2d2d" />
            <rect
              x={x + 14}
              y={y + 8}
              width={22}
              height={20}
              rx="6"
              fill="#ff2d2d"
            />
            <path
              d={`M${x + 22},${y + 13} L${x + 30},${y + 18} L${x + 22},${y + 23} Z`}
              fill="#fff"
            />
            {title("ytnoti", "#1e2152")}
            {sub("16,000+ DOWNLOADS", "#d6312f")}
          </>
        )}
        {kind === "sorusora" && (
          <>
            <rect x={x} y={y} width={w} height={h} fill="#5865f2" />
            <circle
              cx={x + w - 14}
              cy={y + 6}
              r="22"
              fill="#fff"
              opacity="0.08"
            />
            <path
              d={`M${x + 14},${y + 10} h20 a4,4 0 0 1 4,4 v8 a4,4 0 0 1 -4,4 h-11 l-5,4 v-4 h-4 a4,4 0 0 1 -4,-4 v-8 a4,4 0 0 1 4,-4 z`}
              fill="#fff"
            />
            <circle cx={x + 20} cy={y + 18} r="1.6" fill="#5865f2" />
            <circle cx={x + 25} cy={y + 18} r="1.6" fill="#5865f2" />
            <circle cx={x + 30} cy={y + 18} r="1.6" fill="#5865f2" />
            {title("SoruSora", "#fff")}
            {sub("AI BOT · 45 LANGUAGES", "#dfe2ff")}
          </>
        )}
        {kind === "desdemona" && (
          <>
            <rect x={x} y={y} width={w} height={h} fill="#0f3d2b" />
            <g opacity="0.5">
              {Array.from({ length: 5 }, (_, i) => (
                <line
                  // biome-ignore lint/suspicious/noArrayIndexKey: static grid
                  key={i}
                  x1={x + 8 + i * 8}
                  y1={y}
                  x2={x + 8 + i * 8}
                  y2={y + h}
                  stroke="#1f6b4a"
                  strokeWidth="1"
                />
              ))}
              {Array.from({ length: 4 }, (_, i) => (
                <line
                  // biome-ignore lint/suspicious/noArrayIndexKey: static grid
                  key={i}
                  x1={x}
                  y1={y + 6 + i * 8}
                  x2={x + 40}
                  y2={y + 6 + i * 8}
                  stroke="#1f6b4a"
                  strokeWidth="1"
                />
              ))}
            </g>
            <circle cx={x + 16} cy={y + 14} r="5" fill="#f4f0ff" />
            <circle
              cx={x + 26}
              cy={y + 14}
              r="5"
              fill="#0b0d26"
              stroke="#2a5a44"
            />
            <circle
              cx={x + 16}
              cy={y + 24}
              r="5"
              fill="#0b0d26"
              stroke="#2a5a44"
            />
            <circle cx={x + 26} cy={y + 24} r="5" fill="#f4f0ff" />
            {title("Desdemona", "#f4f0ff")}
            {sub("OTHELLO AI · RUST + UNITY", "#9fe0bf")}
          </>
        )}
      </g>
    </g>
  );
}

function SideWall({ side, id }: { side: "l" | "r"; id: string }) {
  // drawn for the left side; the right side is mirrored around x = 800
  const unmirror = side === "r" ? "matrix(-1 0 0 1 466 0)" : undefined;
  return (
    <g transform={side === "r" ? "matrix(-1 0 0 1 1600 0)" : undefined}>
      {/* ad posters in the ceiling cove — the portfolio advertising itself */}
      {[
        [40, 186],
        [246, 180],
      ].map(([x, w]) => (
        <g key={x}>
          <rect x={x} y="102" width={w} height="50" rx="7" fill="#d9dce4" />
          <rect
            x={x + 2}
            y="104"
            width={w - 4}
            height="46"
            rx="6"
            fill="#fbfbfd"
            stroke="#c4c8d1"
            strokeWidth="1.5"
          />
        </g>
      ))}
      <g transform={unmirror}>
        {side === "l" ? (
          <>
            <Poster x={47} w={172} kind="skyline" id={id} />
            <Poster x={253} w={166} kind="ytnoti" id={id} />
          </>
        ) : (
          <>
            <Poster x={47} w={166} kind="sorusora" id={id} />
            <Poster x={247} w={172} kind="desdemona" id={id} />
          </>
        )}
      </g>
      {/* glass over the posters */}
      {[
        [40, 186],
        [246, 180],
      ].map(([x, _w]) => (
        <path
          key={x}
          d={`M${x + 20},106 h40 l-22,42 h-40 z`}
          fill="#fff"
          opacity="0.25"
        />
      ))}

      {/* window */}
      <rect x="34" y="232" width="392" height="300" rx="40" fill="#c4c8d1" />
      <rect x="44" y="242" width="372" height="280" rx="32" fill="#2a2d3a" />
      <rect
        x="48"
        y="246"
        width="364"
        height="272"
        rx="29"
        fill={`url(#${id}-duskAbs)`}
      />
      {/* the city outside, drawn in carriage coordinates (un-mirrored) */}
      <g transform={side === "r" ? "matrix(-1 0 0 1 1600 0)" : undefined}>
        <g clipPath={`url(#${id}-sidewin-${side})`}>
          <CityView id={id} />
        </g>
      </g>
      {/* glass reflections, clipped to the rounded corners */}
      <g clipPath={`url(#${id}-sidewin)`}>
        <path
          d="M150,246 L230,246 L120,518 L48,518 L48,470 Z"
          fill="#fff"
          opacity="0.1"
        />
        <path
          d="M262,246 L292,246 L182,518 L152,518 Z"
          fill="#fff"
          opacity="0.07"
        />
      </g>
      <rect
        x="48"
        y="246"
        width="364"
        height="272"
        rx="29"
        fill="none"
        stroke="#000"
        strokeOpacity="0.25"
        strokeWidth="3"
      />

      <Bench id={id} />

      {/* seat-end wing partition */}
      <path
        d={WING}
        transform="translate(5 7)"
        fill="#000"
        opacity="0.1"
        filter={`url(#${id}-soft)`}
      />
      <path
        d={WING}
        fill={`url(#${id}-wing)`}
        stroke="#cfd3dc"
        strokeWidth="2"
      />
      <path
        d="M390,704 C390,632 418,590 470,576"
        stroke="#fff"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
        opacity="0.95"
      />
      <path
        d="M488,600 L488,880"
        stroke="#000"
        strokeOpacity="0.06"
        strokeWidth="6"
      />

      {/* strap rail: hung from the ceiling between the ad frames, tied into the pole */}
      {[22, 236].map((x) => (
        <g key={x}>
          <rect x={x - 8} y="95" width="16" height="5" rx="2" fill="#aeb2bd" />
          <rect
            x={x - 3}
            y="98"
            width="6"
            height={RAIL_Y - 96}
            fill={`url(#${id}-strap)`}
          />
        </g>
      ))}
      <rect
        x="-300"
        y={RAIL_Y}
        width={POLE_X + 300}
        height="9"
        rx="4.5"
        fill={`url(#${id}-rail)`}
      />
      {STRAP_X.map((x) => (
        <Strap key={x} x={x} id={id} />
      ))}
    </g>
  );
}

function DoorLeaf({ side, id }: { side: "l" | "r"; id: string }) {
  const left = side === "l";
  const x0 = left ? DOOR.x0 : MID;
  const w = MID - DOOR.x0;
  const wx = x0 + 32;
  const ww = w - 64;
  return (
    <g className={`pl-door-${side}`}>
      <rect
        x={x0}
        y={DOOR.y0}
        width={w}
        height={DOOR.y1 - DOOR.y0}
        fill={`url(#${id}-steel)`}
      />
      <rect
        x={x0}
        y={DOOR.y0}
        width={w}
        height={DOOR.y1 - DOOR.y0}
        fill={`url(#${id}-dimple)`}
      />
      <rect
        x={x0}
        y={DOOR.y0}
        width={w}
        height={DOOR.y1 - DOOR.y0}
        fill={`url(#${id}-sheen${side})`}
      />

      {/* window */}
      <rect
        x={wx - 8}
        y="208"
        width={ww + 16}
        height="282"
        rx="44"
        fill="#a3a8b4"
      />
      <rect
        x={wx - 3}
        y="213"
        width={ww + 6}
        height="272"
        rx="40"
        fill="#3a3d4a"
      />
      <rect
        x={wx}
        y="216"
        width={ww}
        height="266"
        rx="37"
        fill={`url(#${id}-duskAbs)`}
      />
      {/* the same city, held still while the glass slides past it */}
      <g clipPath={`url(#${id}-win${side})`}>
        <g className={`pl-door-view-${side}`}>
          <CityView id={id} />
        </g>
      </g>
      <g clipPath={`url(#${id}-win${side})`}>
        <path
          d={`M${wx + 40},216 L${wx + 90},216 L${wx + 10},482 L${wx - 40},482 Z`}
          fill="#fff"
          opacity="0.14"
        />
        <path
          d={`M${wx + 112},216 L${wx + 128},216 L${wx + 48},482 L${wx + 32},482 Z`}
          fill="#fff"
          opacity="0.09"
        />
      </g>

      {/* rubber seal on the meeting edge */}
      <rect
        x={left ? MID - 7 : MID}
        y={DOOR.y0}
        width="7"
        height={DOOR.y1 - DOOR.y0}
        fill="#16171f"
      />
      <rect
        x={left ? MID - 7 : MID + 5}
        y={DOOR.y0}
        width="1.5"
        height={DOOR.y1 - DOOR.y0}
        fill="#fff"
        opacity="0.15"
      />
      {/* pocket edge */}
      <rect
        x={left ? DOOR.x0 : DOOR.x1 - 3}
        y={DOOR.y0}
        width="3"
        height={DOOR.y1 - DOOR.y0}
        fill="#6d7280"
      />
    </g>
  );
}

export default function Carriage({ portrait }: { portrait: boolean }) {
  const id = "cab";
  return (
    <svg
      viewBox={
        portrait ? CARRIAGE_VIEWBOX.portrait : CARRIAGE_VIEWBOX.landscape
      }
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${id}-ceiling`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d8dbe3" />
          <stop offset="0.75" stopColor="#f2f3f7" />
          <stop offset="1" stopColor="#e2e5ec" />
        </linearGradient>
        <linearGradient id={`${id}-wall`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f5f6f9" />
          <stop offset="0.6" stopColor="#eceef3" />
          <stop offset="1" stopColor="#dcdfe6" />
        </linearGradient>
        <linearGradient id={`${id}-floor`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4f7590" />
          <stop offset="1" stopColor="#2c4558" />
        </linearGradient>
        <radialGradient id={`${id}-floorShine`} cx="0.5" cy="0" r="0.6">
          <stop offset="0" stopColor="#fff" stopOpacity="0.35" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-dusk`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0c0e2e" />
          <stop offset="0.38" stopColor="#2a2163" />
          <stop offset="0.62" stopColor="#6a4592" />
          <stop offset="0.85" stopColor="#e894ad" />
          <stop offset="1" stopColor="#ffc3a1" />
        </linearGradient>
        <linearGradient id={`${id}-steel`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d9dce3" />
          <stop offset="0.5" stopColor="#c3c7d0" />
          <stop offset="1" stopColor="#aeb3be" />
        </linearGradient>
        <linearGradient id={`${id}-sheenl`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#000" stopOpacity="0.12" />
          <stop offset="0.45" stopColor="#fff" stopOpacity="0.3" />
          <stop offset="0.6" stopColor="#fff" stopOpacity="0.05" />
          <stop offset="1" stopColor="#000" stopOpacity="0.06" />
        </linearGradient>
        <linearGradient id={`${id}-sheenr`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#000" stopOpacity="0.06" />
          <stop offset="0.4" stopColor="#fff" stopOpacity="0.05" />
          <stop offset="0.55" stopColor="#fff" stopOpacity="0.3" />
          <stop offset="1" stopColor="#000" stopOpacity="0.12" />
        </linearGradient>
        {/* embossed checker stainless */}
        <pattern
          id={`${id}-dimple`}
          width="10"
          height="10"
          patternUnits="userSpaceOnUse"
        >
          <rect width="5" height="5" fill="#fff" opacity="0.13" />
          <rect x="5" y="5" width="5" height="5" fill="#fff" opacity="0.13" />
          <rect x="5" width="5" height="5" fill="#000" opacity="0.035" />
          <rect y="5" width="5" height="5" fill="#000" opacity="0.035" />
        </pattern>
        <pattern
          id={`${id}-rib`}
          width="6"
          height="6"
          patternUnits="userSpaceOnUse"
        >
          <rect width="6" height="6" fill="#9aa0ab" />
          <rect width="6" height="2.5" fill="#c9cdd5" />
        </pattern>
        <linearGradient id={`${id}-jambL`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#e9ebf0" />
          <stop offset="1" stopColor="#b8bcc6" />
        </linearGradient>
        <linearGradient id={`${id}-jambR`} x1="1" y1="0" x2="0" y2="0">
          <stop offset="0" stopColor="#e9ebf0" />
          <stop offset="1" stopColor="#b8bcc6" />
        </linearGradient>
        <linearGradient id={`${id}-jambT`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#dfe2e8" />
          <stop offset="1" stopColor="#aeb2bd" />
        </linearGradient>
        <linearGradient id={`${id}-wing`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#e6e9ef" />
          <stop offset="0.35" stopColor="#ffffff" />
          <stop offset="1" stopColor="#d6dae2" />
        </linearGradient>
        <linearGradient id={`${id}-rail`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.5" stopColor="#c3c7d0" />
          <stop offset="1" stopColor="#868b97" />
        </linearGradient>
        <linearGradient id={`${id}-strap`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#a9adb8" />
          <stop offset="0.5" stopColor="#e9ebf0" />
          <stop offset="1" stopColor="#a9adb8" />
        </linearGradient>
        <linearGradient id={`${id}-handle`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#c2c6cf" />
        </linearGradient>
        {/* seat fabric: muted grey-teal with confetti swooshes */}
        <pattern
          id={`${id}-fabric`}
          width="46"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <rect width="46" height="40" fill="#545e6d" />
          <path
            d="M4,8 q6,-5 12,0"
            stroke="#f2b04b"
            strokeWidth="1.8"
            strokeOpacity="0.75"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M24,22 q5,4 10,-1"
            stroke="#e66a8a"
            strokeWidth="1.8"
            strokeOpacity="0.75"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M8,30 q4,-6 10,-4"
            stroke="#6fc3e8"
            strokeWidth="1.8"
            strokeOpacity="0.75"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M32,6 q5,2 7,7"
            stroke={LINE2}
            strokeWidth="1.8"
            strokeOpacity="0.75"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="40" cy="32" r="1.6" fill="#f4f0ff" opacity="0.6" />
        </pattern>
        <pattern
          id={`${id}-priority`}
          width="18"
          height="18"
          patternUnits="userSpaceOnUse"
        >
          <rect width="18" height="18" fill="#d6458a" />
          <path d="M0,9 L9,0 L18,9 L9,18 Z" fill="#e865a2" />
          <circle cx="9" cy="9" r="1.6" fill="#ffd1e4" />
        </pattern>
        <linearGradient id={`${id}-cushion`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.18" />
          <stop offset="0.25" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id={`${id}-seatTop`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.22" />
          <stop offset="1" stopColor="#000" stopOpacity="0.28" />
        </linearGradient>
        <linearGradient id={`${id}-underSeat`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1f2430" />
          <stop offset="1" stopColor="#3d4656" />
        </linearGradient>
        <radialGradient id={`${id}-vignette`} cx="0.5" cy="0.5" r="0.75">
          <stop offset="0.55" stopColor="#06071a" stopOpacity="0" />
          <stop offset="1" stopColor="#06071a" stopOpacity="0.55" />
        </radialGradient>
        <radialGradient id={`${id}-amber`}>
          <stop offset="0" stopColor="#ffb357" stopOpacity="0.9" />
          <stop offset="1" stopColor="#ffb357" stopOpacity="0" />
        </radialGradient>
        <filter id={`${id}-soft`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
        <filter id={`${id}-glow`} x="-50%" y="-200%" width="200%" height="500%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
        <filter id={`${id}-bokeh`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3.5" />
        </filter>
        <linearGradient
          id={`${id}-duskAbs`}
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="200"
          x2="0"
          y2={HORIZON}
        >
          <stop offset="0" stopColor="#0c0e2e" />
          <stop offset="0.38" stopColor="#2a2163" />
          <stop offset="0.64" stopColor="#6a4592" />
          <stop offset="0.86" stopColor="#e894ad" />
          <stop offset="1" stopColor="#ffc3a1" />
        </linearGradient>
        <linearGradient
          id={`${id}-river`}
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1={HORIZON}
          x2="0"
          y2={HORIZON + 70}
        >
          <stop offset="0" stopColor="#5a3f7e" />
          <stop offset="0.35" stopColor="#2a2156" />
          <stop offset="1" stopColor="#0b0d26" />
        </linearGradient>
        <clipPath id={`${id}-sidewin-l`}>
          <rect x="48" y="246" width="364" height="272" rx="29" />
        </clipPath>
        <clipPath id={`${id}-sidewin-r`}>
          <rect x="1188" y="246" width="364" height="272" rx="29" />
        </clipPath>
        <clipPath id={`${id}-sidewin`}>
          <rect x="48" y="246" width="364" height="272" rx="29" />
        </clipPath>
        <clipPath id={`${id}-floorClip`}>
          <rect x="-300" y="884" width="2200" height="440" />
        </clipPath>
        <clipPath id={`${id}-door`}>
          <rect
            x={DOOR.x0}
            y={DOOR.y0}
            width={DOOR.x1 - DOOR.x0}
            height={DOOR.y1 - DOOR.y0}
          />
        </clipPath>
        <clipPath id={`${id}-winl`}>
          <rect
            x={DOOR.x0 + 32}
            y="216"
            width={MID - DOOR.x0 - 64}
            height="266"
            rx="37"
          />
        </clipPath>
        <clipPath id={`${id}-winr`}>
          <rect
            x={MID + 32}
            y="216"
            width={MID - DOOR.x0 - 64}
            height="266"
            rx="37"
          />
        </clipPath>
      </defs>

      <g className="pl-cabin">
        {/* side walls, with a hole for the doorway */}
        <path
          fillRule="evenodd"
          fill={`url(#${id}-wall)`}
          d={`M-300,90 H1900 V890 H-300 Z M${JAMB.x0},${JAMB.y0 + 18} Q${JAMB.x0},${JAMB.y0} ${JAMB.x0 + 18},${JAMB.y0} H${JAMB.x1 - 18} Q${JAMB.x1},${JAMB.y0} ${JAMB.x1},${JAMB.y0 + 18} V${JAMB.y1} H${JAMB.x0} Z`}
        />
        {/* Line 2 accent where the wall meets the ceiling */}
        <rect x="-300" y="90" width="2200" height="5" fill={LINE2} />

        {/* ceiling */}
        <rect
          x="-300"
          y="-320"
          width="2200"
          height="410"
          fill={`url(#${id}-ceiling)`}
        />
        <g>
          <rect
            x="60"
            y="22"
            width="640"
            height="16"
            rx="8"
            fill="#fff"
            filter={`url(#${id}-glow)`}
            opacity="0.9"
          />
          <rect
            x="900"
            y="22"
            width="640"
            height="16"
            rx="8"
            fill="#fff"
            filter={`url(#${id}-glow)`}
            opacity="0.9"
          />
          <rect x="60" y="24" width="640" height="12" rx="6" fill="#fff" />
          <rect x="900" y="24" width="640" height="12" rx="6" fill="#fff" />
          <rect
            x="-300"
            y="-120"
            width="2200"
            height="14"
            fill="#fff"
            opacity="0.8"
            filter={`url(#${id}-glow)`}
          />
          {Array.from({ length: 14 }, (_, i) => (
            <rect
              // biome-ignore lint/suspicious/noArrayIndexKey: static vents
              key={i}
              x={730 + i * 10}
              y="20"
              width="5"
              height="20"
              rx="2"
              fill="#b9bdc7"
            />
          ))}
          <rect
            x="-300"
            y="78"
            width="2200"
            height="12"
            fill="#000"
            opacity="0.05"
          />
        </g>

        {/* floor */}
        <rect
          x="-300"
          y="880"
          width="2200"
          height="440"
          fill={`url(#${id}-floor)`}
        />
        {/* sheen on the floor only — it must never spill into the doorway */}
        <ellipse
          cx="800"
          cy="900"
          rx="520"
          ry="260"
          fill={`url(#${id}-floorShine)`}
          clipPath={`url(#${id}-floorClip)`}
        />
        <rect x="-300" y="876" width="2200" height="8" fill="#c9ccd4" />

        <SideWall side="l" id={id} />
        <SideWall side="r" id={id} />

        {/* backing for the vestibule: fills the rounded corners of the opening
            (everything except the door plane, which must stay see-through) */}
        <path
          fillRule="evenodd"
          fill="#c3c7d0"
          d={`M${JAMB.x0},${JAMB.y0 + 18} Q${JAMB.x0},${JAMB.y0} ${JAMB.x0 + 18},${JAMB.y0} H${JAMB.x1 - 18} Q${JAMB.x1},${JAMB.y0} ${JAMB.x1},${JAMB.y0 + 18} V${JAMB.y1} H${JAMB.x0} Z M${DOOR.x0},${DOOR.y0} V${DOOR.y1} H${DOOR.x1} V${DOOR.y0} Z`}
        />
        {/* door jambs: the vestibule's depth */}
        <path
          d={`M${JAMB.x0},${JAMB.y0 + 10} L${DOOR.x0},${DOOR.y0} L${DOOR.x0},${DOOR.y1} L${JAMB.x0},${JAMB.y1} Z`}
          fill={`url(#${id}-jambL)`}
        />
        <path
          d={`M${JAMB.x1},${JAMB.y0 + 10} L${DOOR.x1},${DOOR.y0} L${DOOR.x1},${DOOR.y1} L${JAMB.x1},${JAMB.y1} Z`}
          fill={`url(#${id}-jambR)`}
        />
        <path
          d={`M${JAMB.x0 + 10},${JAMB.y0} H${JAMB.x1 - 10} L${DOOR.x1},${DOOR.y0} H${DOOR.x0} Z`}
          fill={`url(#${id}-jambT)`}
        />
        <path
          d={`M${JAMB.x0},${JAMB.y1} V${JAMB.y0 + 18} Q${JAMB.x0},${JAMB.y0} ${JAMB.x0 + 18},${JAMB.y0} H${JAMB.x1 - 18} Q${JAMB.x1},${JAMB.y0} ${JAMB.x1},${JAMB.y0 + 18} V${JAMB.y1}`}
          fill="none"
          stroke="#fff"
          strokeWidth="4"
        />
        <path
          d={`M${JAMB.x0 - 4},${JAMB.y1} V${JAMB.y0 + 14} Q${JAMB.x0 - 4},${JAMB.y0 - 4} ${JAMB.x0 + 14},${JAMB.y0 - 4} H${JAMB.x1 - 14} Q${JAMB.x1 + 4},${JAMB.y0 - 4} ${JAMB.x1 + 4},${JAMB.y0 + 14} V${JAMB.y1}`}
          fill="none"
          stroke="#000"
          strokeOpacity="0.08"
          strokeWidth="3"
        />

        {/* LCD route display above the doors */}
        <g>
          <rect
            x="566"
            y="98"
            width="468"
            height="48"
            rx="8"
            fill="#05060f"
            stroke="#2c2f3d"
            strokeWidth="3"
          />
          <rect
            x="566"
            y="98"
            width="468"
            height="20"
            rx="8"
            fill="#fff"
            opacity="0.04"
          />
          <g className="pl-door-sign">
            <circle cx="590" cy="122" r="10" fill={LINE2} />
            <text
              x="590"
              y="126"
              textAnchor="middle"
              fontFamily="var(--font-display)"
              fontWeight="800"
              fontSize="11"
              fill="#06071a"
            >
              2
            </text>
            <text
              x="608"
              y="119"
              fontFamily="var(--font-kr)"
              fontWeight="700"
              fontSize="12"
              fill="#f4f0ff"
            >
              이번 역 서울하늘
            </text>
            <text
              x="608"
              y="135"
              fontFamily="var(--font-mono)"
              fontSize="8.5"
              fill="#a7a3c7"
              letterSpacing="1"
            >
              THIS STOP · SEOULSKY
            </text>
          </g>
          <g className="pl-door-sign">
            <line
              x1="772"
              y1="122"
              x2="1012"
              y2="122"
              stroke={LINE2}
              strokeWidth="3"
              strokeLinecap="round"
            />
            {[772, 820, 868, 916, 964, 1012].map((cx, i) => {
              const last = i === 5;
              return (
                <circle
                  key={cx}
                  className={last ? "pl-mini-dot pl-mini-here" : "pl-mini-dot"}
                  data-origin={`${cx} 122`}
                  cx={cx}
                  cy="122"
                  r={last ? 6 : 4}
                  fill={last ? "#5a4630" : "#f4f0ff"}
                  stroke={last ? "#ffc3a1" : LINE2}
                  strokeWidth="2"
                />
              );
            })}
          </g>
        </g>

        {/* the doorway: leaves slide into the wall pockets */}
        <g clipPath={`url(#${id}-door)`}>
          <DoorLeaf side="l" id={id} />
          <DoorLeaf side="r" id={id} />
          {/* top shadow cast by the header */}
          <rect
            x={DOOR.x0}
            y={DOOR.y0}
            width={DOOR.x1 - DOOR.x0}
            height="16"
            fill="#000"
            opacity="0.12"
          />
        </g>

        {/* threshold plate */}
        <path
          d={`M${DOOR.x0},${DOOR.y1} H${DOOR.x1} L${DOOR.x1 + 46},${DOOR.y1 + 58} H${DOOR.x0 - 46} Z`}
          fill={`url(#${id}-rib)`}
        />
        <path
          d={`M${DOOR.x0},${DOOR.y1} H${DOOR.x1} L${DOOR.x1 + 46},${DOOR.y1 + 58} H${DOOR.x0 - 46} Z`}
          fill="#fff"
          opacity="0.12"
        />
        <rect
          x={DOOR.x0 - 46}
          y={DOOR.y1 + 58}
          width={DOOR.x1 - DOOR.x0 + 92}
          height="4"
          fill="#f2c94c"
        />

        <Pole side="l" id={id} />
        <Pole side="r" id={id} />
      </g>

      {/* mood: keep the cabin in the night palette — with a hole for the
          doorway, so nothing tints the city once the doors are open */}
      <path
        fillRule="evenodd"
        d={`M-300,-320 H1900 V1320 H-300 Z M${DOOR.x0},${DOOR.y0} V${DOOR.y1} H${DOOR.x1} V${DOOR.y0} Z`}
        fill={`url(#${id}-vignette)`}
        pointerEvents="none"
      />
      <path
        fillRule="evenodd"
        d={`M-300,-320 H1900 V1320 H-300 Z M${DOOR.x0},${DOOR.y0} V${DOOR.y1} H${DOOR.x1} V${DOOR.y0} Z`}
        fill="#1e2152"
        opacity="0.08"
        pointerEvents="none"
      />
    </svg>
  );
}
