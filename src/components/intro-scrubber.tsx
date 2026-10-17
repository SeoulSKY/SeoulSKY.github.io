/**
 * TEMPORARY review tool: a transport bar for the opening sequence
 * (metro preloader → doors → hero entrance). Rendered only when
 * INTRO_DEBUG is on (dev server, or #debug in the URL).
 *
 * Keys: Space play/pause · ←/→ 0.1s (Shift: 1s) · , / . one frame ·
 *       Home restart · 1–5 jump to a marker · H hide
 */
import {
  ChevronsLeft,
  ChevronsRight,
  Copy,
  Pause,
  Play,
  RotateCcw,
  StepBack,
  StepForward,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { getTimeline, onTimelinesChange } from "@/lib/intro";
import { cn } from "@/lib/utils";

const MARKERS: { key: string; label: string }[] = [
  { key: "map", label: "Map" },
  { key: "arrived", label: "Arrive" },
  { key: "dive", label: "Dive" },
  { key: "doors", label: "Doors" },
  { key: "intro", label: "Hero" },
];
const SPEEDS = [0.25, 0.5, 1, 2];
const FRAME = 1 / 60;

export default function IntroScrubber() {
  const master = useRef<gsap.core.Timeline | null>(null);
  const [ready, setReady] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(1);
  const [playing, setPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [hidden, setHidden] = useState(false);
  const [marks, setMarks] = useState<{ label: string; t: number }[]>([]);
  const [copied, setCopied] = useState(false);

  // Nest the preloader and hero timelines into one master timeline.
  useEffect(() => {
    const build = () => {
      const pre = getTimeline("preloader");
      const hero = getTimeline("hero");
      if (!pre) return;
      const keep = master.current?.time() ?? pre.time();
      const wasPaused = master.current?.paused() ?? false;
      master.current?.kill();

      const m = gsap.timeline({ paused: true });
      m.add(pre, 0);
      const introAt = pre.labels.intro ?? pre.duration();
      if (hero) {
        hero.paused(false);
        m.add(hero, introAt);
      }
      m.time(keep, true);
      if (!wasPaused) m.play();
      master.current = m;

      setDuration(m.duration());
      setMarks([
        ...MARKERS.filter((x) => x.key in pre.labels).map((x) => ({
          label: x.label,
          t: pre.labels[x.key],
        })),
        ...(hero ? [{ label: "End", t: introAt + hero.duration() }] : []),
      ]);
      setReady(true);
    };
    build();
    const off = onTimelinesChange(build);

    const tick = () => {
      const m = master.current;
      if (!m) return;
      setTime(m.time());
      setPlaying(!m.paused() && m.progress() < 1);
    };
    gsap.ticker.add(tick);
    return () => {
      off();
      gsap.ticker.remove(tick);
    };
  }, []);

  const seek = useCallback((t: number, pause = true) => {
    const m = master.current;
    if (!m) return;
    if (pause) m.pause();
    m.time(gsap.utils.clamp(0, m.duration(), t));
  }, []);

  const toggle = useCallback(() => {
    const m = master.current;
    if (!m) return;
    if (m.progress() >= 1) {
      m.restart();
    } else {
      m.paused(!m.paused());
    }
  }, []);

  const nudge = useCallback(
    (dt: number) => seek((master.current?.time() ?? 0) + dt),
    [seek],
  );

  const setRate = (s: number) => {
    setSpeed(s);
    master.current?.timeScale(s);
  };

  const nearest = () => {
    const before = marks.filter((m) => m.t <= time + 1e-3).at(-1);
    return before
      ? `${before.label} +${(time - before.t).toFixed(2)}s`
      : `${time.toFixed(2)}s`;
  };

  const copy = async () => {
    const text = `intro @ ${time.toFixed(2)}s (${nearest()})`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      /* clipboard unavailable — the time is on screen anyway */
    }
  };

  // keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement;
      if (el.closest("input, textarea, [contenteditable]")) return;
      const big = e.shiftKey ? 1 : 0.1;
      if (e.code === "Space") {
        e.preventDefault();
        toggle();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        nudge(-big);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        nudge(big);
      } else if (e.key === ",") nudge(-FRAME);
      else if (e.key === ".") nudge(FRAME);
      else if (e.key === "Home") {
        e.preventDefault();
        master.current?.restart();
      } else if (e.key.toLowerCase() === "h") setHidden((h) => !h);
      else if (/^[1-9]$/.test(e.key)) {
        const m = marks[Number(e.key) - 1];
        if (m) seek(m.t);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggle, nudge, seek, marks]);

  if (!ready) return null;

  if (hidden) {
    return (
      <button
        type="button"
        onClick={() => setHidden(false)}
        className="fixed right-4 bottom-4 z-[300] cursor-pointer rounded-full border border-white/15 bg-night-900/90 px-3 py-1.5 font-mono text-[11px] text-mist/80 backdrop-blur"
      >
        Intro ▸ {time.toFixed(2)}s
      </button>
    );
  }

  const btn =
    "grid size-8 shrink-0 cursor-pointer place-items-center rounded-full text-mist/80 transition hover:bg-white/10 hover:text-mist";

  return (
    <div
      className="-translate-x-1/2 fixed bottom-3 left-1/2 z-[300] w-[min(760px,calc(100vw-24px))] rounded-2xl border border-white/15 bg-[#07081c]/92 p-3 font-mono text-mist shadow-[0_20px_60px_-10px_rgb(0_0_0/0.9)] backdrop-blur-xl"
      onPointerDown={(e) => e.stopPropagation()}
    >
      <div className="flex flex-wrap items-center gap-1">
        <span className="mr-1 rounded-full bg-[#00a84d] px-2 py-0.5 font-bold text-[10px] text-night-950 uppercase tracking-wider">
          Intro
        </span>
        <button
          type="button"
          className={btn}
          title="Restart (Home)"
          onClick={() => master.current?.restart()}
        >
          <RotateCcw className="size-4" />
        </button>
        <button
          type="button"
          className={btn}
          title="−1s (Shift+←)"
          onClick={() => nudge(-1)}
        >
          <ChevronsLeft className="size-4" />
        </button>
        <button
          type="button"
          className={btn}
          title="−1 frame (,)"
          onClick={() => nudge(-FRAME)}
        >
          <StepBack className="size-4" />
        </button>
        <button
          type="button"
          className="grid size-9 shrink-0 cursor-pointer place-items-center rounded-full bg-peach text-night-950 transition hover:brightness-110"
          title="Play / pause (Space)"
          onClick={toggle}
        >
          {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
        </button>
        <button
          type="button"
          className={btn}
          title="+1 frame (.)"
          onClick={() => nudge(FRAME)}
        >
          <StepForward className="size-4" />
        </button>
        <button
          type="button"
          className={btn}
          title="+1s (Shift+→)"
          onClick={() => nudge(1)}
        >
          <ChevronsRight className="size-4" />
        </button>

        <span className="ml-2 text-[12px] tabular-nums">
          {time.toFixed(2)}
          <span className="text-mist/40"> / {duration.toFixed(2)}s</span>
        </span>
        <span className="ml-2 hidden text-[11px] text-peach sm:inline">
          {nearest()}
        </span>

        <div className="ml-auto flex items-center gap-1">
          {SPEEDS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setRate(s)}
              className={cn(
                "cursor-pointer rounded-full px-2 py-1 text-[11px] transition",
                speed === s
                  ? "bg-white/15 text-mist"
                  : "text-mist/50 hover:text-mist",
              )}
            >
              {s}×
            </button>
          ))}
          <button
            type="button"
            className={btn}
            title="Copy timestamp for feedback"
            onClick={copy}
          >
            {copied ? (
              <span className="text-[#00a84d] text-[10px]">✓</span>
            ) : (
              <Copy className="size-3.5" />
            )}
          </button>
          <button
            type="button"
            className={btn}
            title="Hide (H)"
            onClick={() => setHidden(true)}
          >
            <X className="size-4" />
          </button>
        </div>
      </div>

      <div className="relative mt-2 px-1 pt-5">
        {/* markers */}
        {marks.map((m, i) => (
          <button
            key={m.label}
            type="button"
            onClick={() => seek(m.t)}
            title={`Jump to ${m.label} (${i + 1})`}
            className="-translate-x-1/2 absolute top-0 cursor-pointer whitespace-nowrap rounded px-1 text-[9px] text-mist/55 uppercase tracking-wider hover:text-peach"
            style={{ left: `calc(${(m.t / duration) * 100}% )` }}
          >
            {m.label}
          </button>
        ))}
        <div className="pointer-events-none absolute inset-x-1 top-[26px] h-1.5">
          {marks.map((m) => (
            <span
              key={m.label}
              className="-translate-y-1/4 absolute top-0 h-3 w-px bg-white/30"
              style={{ left: `${(m.t / duration) * 100}%` }}
            />
          ))}
        </div>
        <input
          type="range"
          min={0}
          max={duration}
          step={0.01}
          value={time}
          onChange={(e) => seek(Number(e.target.value))}
          aria-label="Intro timeline"
          className="intro-scrub w-full cursor-pointer"
          style={
            { "--p": `${(time / duration) * 100}%` } as React.CSSProperties
          }
        />
      </div>
    </div>
  );
}
