/**
 * TEMPORARY review tool: a play bar for the opening sequence
 * (metro preloader → doors → hero entrance). Rendered only when
 * INTRO_DEBUG is on (dev server, or #debug / ?debug in the URL).
 *
 * Starts hidden behind a small "Intro" button. Keys: Space play/pause
 * while the bar is open.
 */
import { Pause, Play, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { getTimeline, onTimelinesChange } from "@/lib/intro";

export default function IntroScrubber() {
  const master = useRef<gsap.core.Timeline | null>(null);
  const [ready, setReady] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(1);
  const [playing, setPlaying] = useState(true);
  const [hidden, setHidden] = useState(true);

  // Nest the preloader and hero timelines into one master timeline.
  useEffect(() => {
    function build() {
      const pre = getTimeline("preloader");
      const hero = getTimeline("hero");
      if (!pre) return;
      const keep = master.current?.time() ?? pre.time();
      const wasPaused = master.current?.paused() ?? false;
      master.current?.kill();

      const m = gsap.timeline({ paused: true });
      m.add(pre, 0);
      if (hero) {
        hero.paused(false);
        m.add(hero, pre.labels.intro ?? pre.duration());
      }
      m.time(keep, true);
      if (!wasPaused) m.play();
      master.current = m;

      setDuration(m.duration());
      setReady(true);
    }
    build();
    const off = onTimelinesChange(build);

    function tick() {
      const m = master.current;
      if (!m) return;
      setTime(m.time());
      setPlaying(!m.paused() && m.progress() < 1);
    }
    gsap.ticker.add(tick);
    return () => {
      off();
      gsap.ticker.remove(tick);
    };
  }, []);

  function seek(t: number) {
    const m = master.current;
    if (!m) return;
    m.pause();
    m.time(gsap.utils.clamp(0, m.duration(), t));
  }

  const toggle = useCallback(() => {
    const m = master.current;
    if (!m) return;
    if (m.progress() >= 1) {
      m.restart();
    } else {
      m.paused(!m.paused());
    }
  }, []);

  useEffect(() => {
    // a hidden bar leaves Space to scroll the page
    if (hidden) return;
    function onKey(e: KeyboardEvent) {
      const el = e.target as HTMLElement;
      // let text fields keep Space, but not the timeline slider
      if (el.closest('input:not([type="range"]), textarea, [contenteditable]'))
        return;
      if (e.code === "Space") {
        e.preventDefault();
        toggle();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggle, hidden]);

  if (!ready) return null;

  if (hidden) {
    return (
      <button
        type="button"
        onClick={() => setHidden(false)}
        aria-label="Show intro controls"
        className="fixed right-4 bottom-4 z-300 cursor-pointer rounded-full border border-white/15 bg-night-900/90 px-3 py-1.5 font-mono text-2xs text-mist/80 uppercase tracking-wider backdrop-blur transition hover:text-mist"
      >
        Intro
      </button>
    );
  }

  return (
    <div
      className="-translate-x-1/2 fixed bottom-3 left-1/2 z-300 flex w-[min(760px,calc(100vw-24px))] items-center gap-3 rounded-2xl border border-white/15 bg-[#07081c]/92 p-3 text-mist shadow-[0_20px_60px_-10px_rgb(0_0_0/0.9)] backdrop-blur-xl"
      onPointerDown={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        className="grid size-9 shrink-0 cursor-pointer place-items-center rounded-full bg-peach text-night-950 transition hover:brightness-110"
        title="Play / pause (Space)"
        aria-label={playing ? "Pause intro" : "Play intro"}
        onClick={toggle}
      >
        {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
      </button>
      <input
        type="range"
        min={0}
        max={duration}
        step={0.01}
        value={time}
        onChange={(e) => seek(Number(e.target.value))}
        aria-label="Intro timeline"
        className="intro-scrub w-full cursor-pointer"
        style={{ "--p": `${(time / duration) * 100}%` } as React.CSSProperties}
      />
      <button
        type="button"
        className="grid size-8 shrink-0 cursor-pointer place-items-center rounded-full text-mist/80 transition hover:bg-white/10 hover:text-mist"
        title="Hide"
        aria-label="Hide intro controls"
        onClick={() => setHidden(true)}
      >
        <X className="size-4" />
      </button>
    </div>
  );
}
