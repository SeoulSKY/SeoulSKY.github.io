import { useMemo, useRef, useState } from "react";
import Carriage, {
  CARRIAGE_VIEWBOX,
  DOOR_TRAVEL,
} from "@/components/seoul/carriage";
import { useMounted } from "@/hooks/use-mounted";
import {
  gsap,
  prefersReducedMotion,
  ScrollSmoother,
  useGSAP,
} from "@/lib/gsap";
import { INTRO_DEBUG, registerTimeline, startIntro } from "@/lib/intro";
import { METRO_LINES } from "@/lib/metro";

/**
 * "Last train to SeoulSKY"
 *
 * The Seoul Metro network sketches itself in light, a Line 2 train runs
 * along real Line 2 stations (211 Seongsu → 215 Jamsillaru) and pulls into
 * the terminus, 216 SeoulSKY. The camera dives into the carriage and the
 * doors slide open onto the hero.
 */

type Pt = [number, number];

interface Station {
  code: string;
  en: string;
  kr: string;
  at: Pt;
  transfer?: string;
  /** label below the station instead of above (landscape) */
  below?: boolean;
  /** label to the left of the station (landscape) */
  flip?: boolean;
}

const LINE2 = METRO_LINES[2].color;

/* Route drawn for a 1600 × 900 landscape canvas. */
const MAIN: Pt[] = [
  [-80, 640],
  [330, 640],
  [470, 500],
  [760, 500],
  [880, 380],
  [1180, 380],
  [1300, 500],
  [1440, 500],
];

/*
 * Real Seoul Metro Line 2 stations (211–215), in order, ending at the
 * SeoulSKY stop.
 * (Independent of the site's sections, so new sections don't break the map.)
 */
const LINE7 = METRO_LINES[7].color;
const LINE8 = METRO_LINES[8].color;

const STATIONS: Station[] = [
  { code: "211", en: "Seongsu", kr: "성수", at: [180, 640] },
  {
    code: "212",
    en: "Konkuk Univ.",
    kr: "건대입구",
    at: [540, 500],
    transfer: LINE7,
  },
  { code: "213", en: "Guui", kr: "구의", at: [690, 500], below: true },
  { code: "214", en: "Gangbyeon", kr: "강변", at: [960, 380], flip: true },
  {
    code: "215",
    en: "Jamsillaru",
    kr: "잠실나루",
    at: [1100, 380],
  },
  {
    // the final stop is the brand itself
    code: "216",
    en: "SeoulSKY",
    kr: "서울하늘",
    at: [1440, 500],
    transfer: LINE8,
  },
];

const TERMINUS_CODE = STATIONS[STATIONS.length - 1].code;
/** shown in the "next" panel once the train has arrived */
const AFTER_TERMINUS = "도착 · Arrived";

const CROSSING: { color: string; pts: Pt[]; width?: number }[] = [
  // the Seongsu branch (Line 2) heading south from Seongsu
  {
    color: LINE2,
    pts: [
      [180, 640],
      [180, 760],
      [260, 840],
      [260, 940],
    ],
  },
  // Line 7 through Konkuk Univ.
  {
    color: LINE7,
    pts: [
      [660, -40],
      [660, 260],
      [540, 380],
      [540, 940],
    ],
  },
  // Line 8 through Jamsil
  {
    color: LINE8,
    pts: [
      [1380, -40],
      [1380, 300],
      [1440, 360],
      [1440, 500],
      [1640, 500],
    ],
  },
  // other lines of the network, for density (they meet none of our stations)
  {
    color: METRO_LINES[1].color,
    pts: [
      [-40, 160],
      [260, 160],
      [380, 40],
      [380, -40],
    ],
  },
  {
    color: METRO_LINES[3].color,
    pts: [
      [1640, 760],
      [1380, 760],
      [1260, 880],
      [1260, 940],
    ],
  },
];

/* the Han river, which Line 2 crosses between Gangbyeon and Jamsillaru */
const HAN: Pt[] = [
  [990, -60],
  [1010, 160],
  [1040, 420],
  [1010, 700],
  [1060, 960],
];

const ANNOUNCEMENTS = [
  "이번 역은 서울하늘, 서울하늘역입니다",
  "This stop is SeoulSKY",
  "내리실 문은 왼쪽입니다",
  "The doors are on your left",
];

function layout(portrait: boolean) {
  // Portrait: rotate the map a quarter turn (x ↔ y) and halve it so the
  // labels stay readable on a phone.
  function t(p: Pt): Pt {
    return portrait ? [p[1] * 0.5 - 30, p[0] * 0.5] : p;
  }
  function d(pts: Pt[]) {
    return pts.map((p, i) => `${i ? "L" : "M"}${t(p)[0]},${t(p)[1]}`).join(" ");
  }

  const main = MAIN.map(t);
  // cumulative length of each station along the main route
  const segs = main.slice(1).map((b, i) => {
    const a = main[i];
    return { a, b, len: Math.hypot(b[0] - a[0], b[1] - a[1]) };
  });
  const total = segs.reduce((s, x) => s + x.len, 0);
  function lengthAt(p: Pt) {
    let acc = 0;
    for (const s of segs) {
      const ap = Math.hypot(p[0] - s.a[0], p[1] - s.a[1]);
      const pb = Math.hypot(s.b[0] - p[0], s.b[1] - p[1]);
      if (Math.abs(ap + pb - s.len) < 0.5) return acc + ap;
      acc += s.len;
    }
    return total;
  }

  return {
    viewBox: portrait ? "0 -20 450 860" : "0 0 1600 900",
    main: d(MAIN),
    total,
    stations: STATIONS.map((s) => ({
      ...s,
      p: t(s.at),
      len: lengthAt(t(s.at)),
    })),
    crossings: CROSSING.map((c) => ({ color: c.color, d: d(c.pts) })),
    han: d(HAN),
    hanLabel: t([1024, 120]),
    terminus: t(STATIONS[STATIONS.length - 1].at),
    portrait,
  };
}

/**
 * Where a point of the map lands in the scene, in px from its top left.
 * The map is a full-scene svg fitted with `meet`.
 */
function mapPointOnScreen(scene: HTMLElement, viewBox: string, [px, py]: Pt) {
  const [x, y, w, h] = viewBox.split(" ").map(Number);
  const W = scene.clientWidth;
  const H = scene.clientHeight;
  const s = Math.min(W / w, H / h);
  return [(px - x) * s + (W - w * s) / 2, (py - y) * s + (H - h * s) / 2];
}

/** Screen px per carriage unit; the carriage is a full-scene `slice` svg. */
function carriageUnit(scene: HTMLElement, portrait: boolean) {
  const [, , w, h] = (
    portrait ? CARRIAGE_VIEWBOX.portrait : CARRIAGE_VIEWBOX.landscape
  )
    .split(" ")
    .map(Number);
  return Math.max(scene.clientWidth / w, scene.clientHeight / h);
}

/**
 * The scene's layout depends on the viewport, so it renders only in the
 * browser. The prerendered page gets the scene's empty night backdrop, which
 * covers the page until the intro takes over. Once the intro is over the
 * scene unmounts, which reverts its animations and listeners.
 */
export default function Preloader() {
  const mounted = useMounted();
  const [done, setDone] = useState(false);
  if (!mounted) {
    return (
      <div
        aria-hidden="true"
        className="fixed inset-0 z-100 bg-night-950 motion-reduce:hidden"
      />
    );
  }
  if (done) return null;
  return <PreloaderScene onDone={() => setDone(true)} />;
}

/** The page behind the intro: kept out of the tab order while it plays. */
function setPageInert(inert: boolean) {
  document.getElementById("smooth-wrapper")?.toggleAttribute("inert", inert);
}

function PreloaderScene({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const L = useMemo(
    () =>
      layout(
        typeof window !== "undefined" &&
          window.matchMedia("(max-aspect-ratio: 1/1)").matches,
      ),
    [],
  );

  useGSAP(
    (_, contextSafe) => {
      const q = gsap.utils.selector(root);
      const scene = root.current;
      if (!scene) return;
      if (prefersReducedMotion()) {
        startIntro();
        onDone();
        return;
      }

      document.body.classList.add("is-loading");
      setPageInert(true);
      ScrollSmoother.get()?.paused(true);

      function release() {
        document.body.classList.remove("is-loading");
        setPageInert(false);
        ScrollSmoother.get()?.paused(false);
      }

      function finish() {
        release();
        onDone();
      }

      const fontsReady = Promise.race([
        document.fonts?.ready ?? Promise.resolve(),
        new Promise((r) => setTimeout(r, 2500)),
      ]);

      const route = q<SVGPathElement>(".pl-route")[0];
      const trail = q<SVGPathElement>(".pl-trail")[0];
      const cars = q<SVGGElement>(".pl-car");
      const pct = q(".pl-pct")[0];
      const next = q(".pl-next")[0];
      const total = route.getTotalLength();
      const CAR = L.portrait ? 28 : 64; // car pitch along the track

      gsap.set(trail, { strokeDasharray: total, strokeDashoffset: total });

      /* LED announcement ticker */
      gsap.to(q(".pl-ticker"), {
        xPercent: -50,
        duration: 16,
        ease: "none",
        repeat: -1,
      });

      const passed = new Set<string>();
      function arrive(code: string) {
        const g = q(`[data-station="${code}"]`)[0];
        if (!g) return;
        const st = L.stations.find((x) => x.code === code);
        const origin = st ? `${st.p[0]} ${st.p[1]}` : "0 0";
        gsap.fromTo(
          g.querySelector(".pl-st-dot"),
          { scale: 1.9, svgOrigin: origin },
          { scale: 1, svgOrigin: origin, duration: 0.6, ease: "back.out(3)" },
        );
        gsap.fromTo(
          g.querySelector(".pl-st-ping"),
          { scale: 0.6, autoAlpha: 0.9, svgOrigin: origin },
          { scale: 3.4, autoAlpha: 0, svgOrigin: origin, duration: 1 },
        );
        gsap.to(g.querySelectorAll(".pl-st-label"), {
          opacity: 1,
          duration: 0.3,
        });
        const chip = g.querySelector(".pl-st-chip");
        const chipText = g.querySelector(".pl-st-chiptext");
        if (chip) gsap.to(chip, { fill: LINE2, duration: 0.3 });
        if (chipText) gsap.to(chipText, { fill: "#06071a", duration: 0.3 });
        const i = L.stations.findIndex((s) => s.code === code);
        const n = L.stations[i + 1];
        if (next) {
          next.textContent = n ? `${n.en} ${n.kr}` : AFTER_TERMINUS;
        }
      }

      function depart(code: string) {
        const g = q(`[data-station="${code}"]`)[0];
        if (!g) return;
        gsap.set(g.querySelectorAll(".pl-st-label"), {
          opacity: code === TERMINUS_CODE ? 0.6 : 0.45,
        });
        const chip = g.querySelector(".pl-st-chip");
        const chipText = g.querySelector(".pl-st-chiptext");
        if (chip) gsap.set(chip, { fill: "#06071a" });
        if (chipText) gsap.set(chipText, { fill: LINE2 });
        const s = L.stations.find((x) => x.code === code);
        if (next && s) next.textContent = `${s.en} ${s.kr}`;
      }

      const train = { d: 0 };
      function placeTrain() {
        cars.forEach((car, i) => {
          const at = train.d - i * CAR;
          if (at < 0) {
            car.setAttribute("opacity", "0");
            return;
          }
          const p = route.getPointAtLength(at);
          const ahead = route.getPointAtLength(Math.min(total, at + 2));
          const behind = route.getPointAtLength(Math.max(0, at - 2));
          const a =
            (Math.atan2(ahead.y - behind.y, ahead.x - behind.x) * 180) /
            Math.PI;
          car.setAttribute("opacity", "1");
          car.setAttribute(
            "transform",
            `translate(${p.x} ${p.y}) rotate(${a})`,
          );
        });
        trail.style.strokeDashoffset = String(total - train.d);
        if (pct) {
          pct.textContent = String(
            Math.round((train.d / total) * 100),
          ).padStart(3, "0");
        }
        for (const s of L.stations) {
          if (!passed.has(s.code) && train.d >= s.len - 1) {
            passed.add(s.code);
            arrive(s.code);
          } else if (passed.has(s.code) && train.d < s.len - 1) {
            // scrubbed backwards past this station
            passed.delete(s.code);
            depart(s.code);
          }
        }
      }
      placeTrain();

      const tl = gsap.timeline({ defaults: { ease: "rise" } });

      tl.addLabel("map")
        .from(q(".pl-board"), { yPercent: -120, autoAlpha: 0, duration: 1 }, 0)
        .from(
          q(".pl-hud"),
          { autoAlpha: 0, y: 16, duration: 0.8, stagger: 0.1 },
          0.2,
        )
        .from(q(".pl-grid, .pl-river"), { autoAlpha: 0, duration: 1.2 }, 0)
        .from(
          q(".pl-cross"),
          { drawSVG: "0%", duration: 1.6, stagger: 0.12, ease: "power2.inOut" },
          0.1,
        )
        .from(
          q(".pl-route, .pl-route-glow"),
          {
            drawSVG: "0%",
            duration: 1.5,
            ease: "power3.inOut",
          },
          0.25,
        )
        .from(
          q(".pl-st"),
          {
            scale: 0,
            svgOrigin: (i: number) =>
              `${L.stations[i].p[0]} ${L.stations[i].p[1]}`,
            duration: 0.6,
            stagger: 0.12,
            ease: "back.out(2.5)",
          },
          0.6,
        )
        .from(
          q(".pl-st-label"),
          { autoAlpha: 0, y: 8, duration: 0.6, stagger: 0.06 },
          0.9,
        )
        .from(
          q(".pl-terminus-halo"),
          {
            scale: 0,
            svgOrigin: `${L.terminus[0]} ${L.terminus[1]}`,
            duration: 1,
          },
          1.2,
        )
        // the train runs the line
        .to(
          train,
          {
            d: total,
            duration: 3,
            ease: "power2.inOut",
            onUpdate: placeTrain,
          },
          1.2,
        )
        .addLabel("arrived")
        // the LED sign stops scrolling and announces the arrival
        .to(
          q(".pl-ticker-wrap"),
          { autoAlpha: 0, y: -10, duration: 0.35, ease: "power2.in" },
          "arrived",
        )
        .fromTo(
          q(".pl-arrive"),
          { autoAlpha: 0, y: 10 },
          { autoAlpha: 1, y: 0, duration: 0.5, ease: "rise" },
          "arrived+=0.25",
        )
        .fromTo(
          q(".pl-arrive"),
          { textShadow: "0 0 0px rgba(255,179,87,0)" },
          {
            keyframes: [
              { textShadow: "0 0 16px rgba(255,179,87,1)", duration: 0.35 },
              { textShadow: "0 0 8px rgba(255,179,87,0.75)", duration: 0.6 },
            ],
            ease: "sine.out",
          },
          "arrived+=0.3",
        )
        .fromTo(
          q(".pl-board"),
          {
            boxShadow:
              "0 20px 60px -20px rgba(0,0,0,0.9), 0 0 0 0 rgba(255,179,87,0)",
          },
          {
            boxShadow:
              "0 20px 60px -20px rgba(0,0,0,0.9), 0 0 24px 0 rgba(255,179,87,0.35)",
            duration: 0.6,
          },
          "arrived+=0.3",
        )
        .to(
          q(".pl-terminus-halo"),
          {
            scale: 1.6,
            autoAlpha: 0,
            duration: 0.6,
            svgOrigin: `${L.terminus[0]} ${L.terminus[1]}`,
          },
          "arrived+=0.3",
        )
        // the camera dives into the platform
        .addLabel("dive", "arrived+=1.5")
        .to(
          q(".pl-map"),
          {
            // The svg element scales, as a CSS transform. Scaling a group
            // inside it relaid out and repainted the whole map every frame.
            scale: 9,
            transformOrigin: () => {
              const [x, y] = mapPointOnScreen(scene, L.viewBox, L.terminus);
              return `${x}px ${y}px`;
            },
            duration: 1.1,
            ease: "power3.in",
          },
          "dive",
        )
        .to(
          q(".pl-svg"),
          {
            autoAlpha: 0,
            filter: "blur(6px)",
            duration: 0.5,
            ease: "power1.in",
          },
          "dive+=0.6",
        )
        .to(
          q(".pl-board, .pl-hud, .pl-skip"),
          { autoAlpha: 0, duration: 0.4 },
          "dive",
        )
        .addLabel("doors", "dive+=0.75")
        .fromTo(
          q(".pl-doors"),
          { autoAlpha: 0, scale: 1.18 },
          { autoAlpha: 1, scale: 1, duration: 0.8, ease: "power3.out" },
          "doors",
        )
        // the train has just braked: the cabin rocks, the straps swing and settle
        .fromTo(
          q(".pl-cabin"),
          { x: () => 14 * carriageUnit(scene, L.portrait) },
          { x: 0, duration: 1.6, ease: "elastic.out(1, 0.35)" },
          "doors",
        )
        .fromTo(
          q(".pl-strap"),
          { rotate: 16 },
          {
            rotate: 0,
            svgOrigin: (_i: number, el: Element) =>
              (el as SVGElement).dataset.origin ?? "0 0",
            duration: 2.8,
            ease: "elastic.out(1, 0.22)",
            stagger: 0.04,
          },
          "doors",
        )
        .from(
          q(".pl-door-sign"),
          { autoAlpha: 0, duration: 0.4, stagger: 0.12 },
          "doors+=0.35",
        )
        .from(
          q(".pl-mini-dot"),
          {
            scale: 0,
            svgOrigin: (_i: number, el: Element) =>
              (el as SVGElement).dataset.origin ?? "0 0",
            duration: 0.3,
            stagger: 0.05,
            ease: "back.out(3)",
          },
          "doors+=0.45",
        )
        .to(
          q(".pl-mini-here"),
          {
            fill: "#ffb357",
            duration: 0.18,
            repeat: 5,
            yoyo: true,
            ease: "none",
          },
          "doors+=0.6",
        )
        // unlatch… and open
        .to(
          q(".pl-door-l"),
          { x: -5, duration: 0.16, ease: "power2.out" },
          "doors+=1.5",
        )
        .to(q(".pl-door-r"), { x: 5, duration: 0.16, ease: "power2.out" }, "<")
        // the view through the door windows stays put while the glass moves
        .to(
          q(".pl-door-view-l"),
          { x: 5, duration: 0.16, ease: "power2.out" },
          "<",
        )
        .to(
          q(".pl-door-view-r"),
          { x: -5, duration: 0.16, ease: "power2.out" },
          "<",
        )
        .addLabel("intro", "doors+=1.6")
        .add(() => startIntro(), "intro")
        .to(
          q(".pl-door-l"),
          { x: -DOOR_TRAVEL - 4, duration: 1.3, ease: "seoul" },
          "doors+=1.7",
        )
        .to(
          q(".pl-door-r"),
          { x: DOOR_TRAVEL + 4, duration: 1.3, ease: "seoul" },
          "<",
        )
        .to(
          q(".pl-door-view-l"),
          { x: DOOR_TRAVEL + 4, duration: 1.3, ease: "seoul" },
          "<",
        )
        .to(
          q(".pl-door-view-r"),
          { x: -DOOR_TRAVEL - 4, duration: 1.3, ease: "seoul" },
          "<",
        )
        // …and the camera steps out through the doorway
        .to(
          q(".pl-carbody"),
          {
            // push straight through the doorway: the walls leave the frame
            // instead of fading over the city
            scale: 5.6,
            transformOrigin: "50% 52.8%",
            duration: 1.25,
            ease: "power3.in",
          },
          "doors+=2.4",
        )
        .set(q(".pl-carbody"), { autoAlpha: 0 })
        .add(INTRO_DEBUG ? () => {} : finish);
      if (INTRO_DEBUG) {
        // keep the overlay mounted so the scrubber can rewind into it
        tl.set(root.current, { autoAlpha: 0 });
        tl.add(release);
      }
      if (!INTRO_DEBUG) {
        // hold at the platform until the fonts are in
        tl.addPause("arrived", () => {
          fontsReady.then(() => tl.play());
        });
      }
      const unregister = registerTimeline("preloader", tl);

      const skip = contextSafe?.(() => {
        if (tl.time() >= tl.labels.dive) return;
        // The intro scrubber nests this timeline in its own, and a nested
        // timeline follows its parent's playhead, so seek whichever drives it.
        const parent = tl.parent;
        if (parent && parent !== gsap.globalTimeline) {
          parent.seek(tl.startTime() + tl.labels.dive).play();
        } else {
          tl.seek("dive").play();
        }
      });
      function onKey(e: KeyboardEvent) {
        if (e.key === "Enter" && !e.repeat) skip?.();
      }
      const btn = q(".pl-skip")[0];
      if (skip && btn) btn.addEventListener("click", skip);
      window.addEventListener("keydown", onKey);
      return () => {
        unregister();
        if (skip && btn) btn.removeEventListener("click", skip);
        window.removeEventListener("keydown", onKey);
        // in case the scene goes away before the intro has finished
        release();
      };
    },
    { scope: root },
  );

  const ticker = [...ANNOUNCEMENTS, ...ANNOUNCEMENTS].join("   ·   ");

  return (
    // Not aria-hidden as a whole: the Skip button inside must stay reachable.
    // Everything else is decoration and hidden from assistive tech.
    <div ref={root} className="fixed inset-0 z-100 select-none">
      {/* ── inside the carriage: the doors (revealed at arrival) ── */}
      <div aria-hidden="true" className="invisible absolute inset-0 pl-doors">
        <div className="absolute inset-0 pl-carbody">
          <Carriage portrait={L.portrait} />
        </div>
      </div>

      {/* ── the metro map ─────────────────────────────────────── */}
      {/* its own layer, so the blur as it fades is the compositor's job */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-night-950 pl-svg will-change-[filter,opacity]"
      >
        <div
          className="absolute inset-0 pl-grid opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(rgb(244 240 255 / 0.07) 1px, transparent 1.2px)",
            backgroundSize: "28px 28px",
            maskImage:
              "radial-gradient(ellipse at center, #000 30%, transparent 75%)",
          }}
        />
        <svg
          viewBox={L.viewBox}
          preserveAspectRatio="xMidYMid meet"
          className="absolute inset-0 h-full w-full pl-map"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="pl-beam" cx="0" cy="0.5" r="1">
              <stop offset="0" stopColor="#fff6d6" stopOpacity="0.85" />
              <stop offset="1" stopColor="#fff6d6" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="pl-halo">
              <stop offset="0" stopColor="#ffc3a1" stopOpacity="0.55" />
              <stop offset="1" stopColor="#ffc3a1" stopOpacity="0" />
            </radialGradient>
          </defs>
          <g>
            {/* other lines of the network */}
            {/* the Han river */}
            <g className="pl-river">
              <path
                d={L.han}
                fill="none"
                stroke="#2b5aa0"
                strokeOpacity="0.3"
                strokeWidth={L.portrait ? 26 : 46}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <text
                x={L.hanLabel[0]}
                y={L.hanLabel[1]}
                fontFamily="var(--font-mono)"
                fontSize={L.portrait ? 8 : 11}
                letterSpacing="2"
                fill="#7fa6e0"
                fillOpacity="0.75"
              >
                한강 HAN RIVER
              </text>
            </g>
            {L.crossings.map((c) => (
              <path
                key={c.color}
                className="pl-cross"
                d={c.d}
                fill="none"
                stroke={c.color}
                strokeOpacity="0.4"
                strokeWidth={L.portrait ? 5 : 7}
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            ))}

            {/* Line 2 */}
            <path
              className="pl-route-glow"
              d={L.main}
              fill="none"
              stroke={LINE2}
              strokeOpacity="0.35"
              strokeWidth={L.portrait ? 14 : 22}
              strokeLinejoin="round"
              style={{ filter: "blur(8px)" }}
            />
            <path
              className="pl-route"
              d={L.main}
              fill="none"
              stroke={LINE2}
              strokeWidth={L.portrait ? 6 : 11}
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            <path
              className="pl-trail"
              d={L.main}
              fill="none"
              stroke="#b9ffd6"
              strokeWidth={L.portrait ? 2 : 3}
              strokeLinejoin="round"
              strokeLinecap="round"
              style={{ filter: "drop-shadow(0 0 6px #00ff85)" }}
            />

            <circle
              className="pl-terminus-halo"
              cx={L.terminus[0]}
              cy={L.terminus[1]}
              r={L.portrait ? 60 : 110}
              fill="url(#pl-halo)"
            />

            {/* stations */}
            {L.stations.map((s) => (
              <StationMark key={s.code} s={s} portrait={L.portrait} />
            ))}

            {/* the train: three cars placed along the path every frame */}
            {[0, 1, 2].map((i) => (
              <g key={i} className="pl-car" opacity="0">
                <g transform={L.portrait ? "scale(0.6)" : "scale(1.35)"}>
                  {i === 0 && (
                    <path
                      d="M22,-4 L180,-40 L180,40 L22,4 Z"
                      fill="url(#pl-beam)"
                      opacity="0.55"
                    />
                  )}
                  <rect
                    x="-22"
                    y="-8"
                    width="44"
                    height="16"
                    rx={i === 0 ? 7 : 4}
                    fill="#eceaf6"
                  />
                  <rect x="-22" y="1.5" width="44" height="3" fill={LINE2} />
                  {[-14, -4, 6].map((x) => (
                    <rect
                      key={x}
                      x={x}
                      y="-5"
                      width="7"
                      height="4"
                      rx="1"
                      fill="#1e2152"
                    />
                  ))}
                  {i === 0 && (
                    <>
                      <circle cx="20" cy="-4" r="1.6" fill="#fff6d6" />
                      <circle cx="20" cy="4" r="1.6" fill="#fff6d6" />
                    </>
                  )}
                  {i === 2 && <circle cx="-21" cy="0" r="1.6" fill="#ff6b6b" />}
                </g>
              </g>
            ))}
          </g>
        </svg>
      </div>

      {/* ── LED destination board ─────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-x-3 top-3 sm:inset-x-0 sm:top-6 sm:flex sm:justify-center"
      >
        <div className="flex items-stretch overflow-hidden rounded-2xl border border-white/10 bg-[#07081c]/90 pl-board shadow-[0_20px_60px_-20px_rgb(0_0_0/0.9)] sm:w-[min(760px,90vw)]">
          <div className="flex shrink-0 items-center gap-2 border-white/10 border-r px-3 sm:px-4">
            <span
              className="grid size-7 place-items-center rounded-full font-bold font-display text-night-950 text-sm"
              style={{ background: LINE2 }}
            >
              2
            </span>
            <span className="hidden font-kr font-semibold text-sm sm:inline">
              2호선
            </span>
          </div>
          <div className="relative min-w-0 flex-1 overflow-hidden py-3">
            <div className="pl-ticker-wrap">
              <div className="flex w-max whitespace-nowrap pl-ticker font-mono text-amber text-board tracking-sign [text-shadow:0_0_8px_rgb(255_179_87/0.8)] sm:text-sm">
                <span className="pr-8">{ticker}</span>
                <span className="pr-8">{ticker}</span>
              </div>
            </div>
            {/* shown on arrival, replacing the scrolling announcements */}
            <div className="invisible absolute inset-0 flex items-center justify-center gap-2 whitespace-nowrap px-3 pl-arrive text-amber">
              <span className="font-bold font-kr text-board tracking-sign sm:text-sm">
                서울하늘 도착
              </span>
              <span className="hidden font-mono text-2xs tracking-[0.14em] opacity-80 sm:inline sm:text-[12px]">
                · ARRIVED AT SEOULSKY
              </span>
            </div>
            {/* dot-matrix mesh */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(transparent 55%, #07081c 60%)",
                backgroundSize: "3px 3px",
              }}
            />
          </div>
          <div className="flex shrink-0 flex-col justify-center border-white/10 border-l px-3 text-right sm:px-4">
            <span className="font-mono text-[9px] text-mist/45 uppercase tracking-caption">
              다음역 · Next
            </span>
            <span className="pl-next font-medium text-board text-mist">
              {STATIONS[0].en} {STATIONS[0].kr}
            </span>
          </div>
        </div>
      </div>

      {/* ── HUD ───────────────────────────────────────────────── */}
      <div className="absolute inset-x-5 bottom-5 flex items-end justify-between font-mono text-2xs text-mist/50 uppercase tracking-label sm:inset-x-10 sm:bottom-8">
        <span aria-hidden="true" className="hidden pl-hud sm:inline">
          Seoul Metropolitan Subway · 37.5665°N 126.9780°E
        </span>
        <span aria-hidden="true" className="pl-hud sm:hidden">
          37.5665°N 126.9780°E
        </span>
        <span className="flex items-center gap-4">
          <button
            type="button"
            aria-label="Skip intro"
            className="cursor-pointer rounded-full border border-white/15 px-3 py-1.5 pl-hud pl-skip text-mist/60 transition-colors hover:border-white/40 hover:text-mist"
          >
            Skip ↵
          </button>
          <span aria-hidden="true" className="pl-hud text-mist">
            <span className="pl-pct tabular-nums">000</span>%
          </span>
        </span>
      </div>
    </div>
  );
}

function StationMark({
  s,
  portrait,
}: {
  s: Station & { p: Pt };
  portrait: boolean;
}) {
  const [x, y] = s.p;
  const terminus = s.code === TERMINUS_CODE;
  const r = portrait ? (terminus ? 11 : 7) : terminus ? 16 : 10;
  const sw = portrait ? (terminus ? 4 : 3) : terminus ? 6 : 4;

  // place labels clear of the track (it is 11 units wide)
  const below = !portrait && s.below;
  const flip = !portrait && s.flip;
  const chipW = portrait ? 26 : 40;
  let lx = flip ? x - 18 : x + (portrait ? 14 : 18);
  let ly = below ? y + 60 : y - (portrait ? 18 : 30);
  let anchor: "start" | "middle" | "end" = flip ? "end" : "start";
  const chipX = flip ? lx - chipW : lx;
  const halo = {
    stroke: "#06071a",
    strokeWidth: portrait ? 4 : 6,
    strokeLinejoin: "round" as const,
    paintOrder: "stroke" as const,
  };
  if (terminus) {
    // nudged left so the long sub-label never runs off the right edge
    lx = x - (portrait ? 0 : 90);
    ly = y + (portrait ? 46 : 70);
    anchor = "middle";
  }

  return (
    <g data-station={s.code}>
      <circle
        className="pl-st-ping"
        cx={x}
        cy={y}
        r={r}
        fill="none"
        stroke={terminus ? "#ffc3a1" : LINE2}
        strokeWidth="2"
        opacity="0"
      />
      <g className="pl-st">
        <circle
          className="pl-st-dot"
          cx={x}
          cy={y}
          r={r}
          fill="#f4f0ff"
          stroke={s.transfer ? "#0b0d26" : LINE2}
          strokeWidth={sw}
        />
        {s.transfer && (
          <circle
            cx={x}
            cy={y}
            r={r - sw - 1}
            fill="none"
            stroke={s.transfer}
            strokeWidth={portrait ? 1.5 : 2}
          />
        )}
      </g>

      {terminus ? (
        <g className="pl-st-label" opacity="0.6">
          <text
            x={lx}
            y={ly}
            textAnchor={anchor}
            fontFamily="var(--font-display)"
            fontWeight="800"
            fontSize={portrait ? 30 : 48}
            letterSpacing="-1.5"
            fill="#f4f0ff"
            {...halo}
          >
            {s.en}
            <tspan
              dx={portrait ? 8 : 12}
              fontFamily="var(--font-kr)"
              fontWeight="700"
              fontSize={portrait ? 20 : 30}
              letterSpacing="0"
              fill="#ffc3a1"
            >
              {s.kr}
            </tspan>
          </text>
        </g>
      ) : (
        <g className="pl-st-label" opacity="0.45">
          <rect
            className="pl-st-chip"
            x={chipX}
            y={ly - (portrait ? 26 : 42)}
            width={chipW}
            height={portrait ? 13 : 20}
            rx={portrait ? 6.5 : 10}
            fill="#06071a"
            stroke={LINE2}
            strokeWidth="1.2"
          />
          <text
            className="pl-st-chiptext"
            x={chipX + chipW / 2}
            y={ly - (portrait ? 16.5 : 28)}
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize={portrait ? 8 : 12}
            fill={LINE2}
          >
            {s.code}
          </text>
          <text
            x={lx}
            y={ly}
            textAnchor={anchor}
            fontFamily="var(--font-display)"
            fontWeight="700"
            fontSize={portrait ? 15 : 25}
            fill="#f4f0ff"
            {...halo}
          >
            {s.en}
            <tspan
              dx={portrait ? 5 : 8}
              fontFamily="var(--font-kr)"
              fontWeight="500"
              fontSize={portrait ? 11 : 17}
              fill="#a7a3c7"
            >
              {s.kr}
            </tspan>
          </text>
        </g>
      )}
    </g>
  );
}
