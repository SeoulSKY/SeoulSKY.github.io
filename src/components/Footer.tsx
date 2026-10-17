import { ArrowUp } from "lucide-react";
import { useRef } from "react";
import {
  CityLayer,
  NARROW_VIEWBOX,
  WIDE_VIEWBOX,
} from "@/components/seoul/Skyline";
import Starfield from "@/components/seoul/Starfield";
import { GITHUB_URL, navSections } from "@/data/content";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { gsap, scrollToSection, useGSAP } from "@/lib/gsap";

export default function Footer() {
  const root = useRef<HTMLElement>(null);
  const narrow = useMediaQuery("(max-width: 639px)");

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      gsap.from(q(".ft-city"), {
        yPercent: 35,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top bottom",
          end: "bottom bottom",
          scrub: true,
        },
      });
      gsap.from(q(".ft-word"), {
        yPercent: 60,
        autoAlpha: 0,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top 90%",
          end: "bottom bottom",
          scrub: true,
        },
      });
    },
    { scope: root },
  );

  return (
    <footer
      ref={root}
      className="footer relative overflow-hidden border-white/5 border-t"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-night-950 via-[#120f38] to-[#2a1d55]" />
      <Starfield className="absolute inset-0" density={1.2} seed={99} />

      <div className="relative mx-auto flex max-w-7xl flex-col gap-10 px-5 pt-24 sm:px-10 sm:pt-32">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <div>
            <p className="font-kr text-peach text-sm tracking-[0.3em]">
              서울하늘
            </p>
            <p className="mt-4 max-w-sm font-serif text-3xl text-mist/85 italic leading-snug sm:text-4xl">
              Thanks for visiting — see you under the same sky.
            </p>
          </div>
          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-12 gap-y-2 text-sm sm:grid-cols-3"
          >
            {navSections.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => scrollToSection(id)}
                className="cursor-pointer text-left text-mist/60 transition-colors hover:text-peach"
              >
                {label}
              </button>
            ))}
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="text-mist/60 transition-colors hover:text-peach"
            >
              GitHub
            </a>
          </nav>
        </div>
      </div>

      <div className="relative mt-10">
        <p
          aria-hidden="true"
          className="ft-word pointer-events-none absolute inset-x-0 top-[4%] select-none text-center font-display font-extrabold text-[22vw] text-white/[0.06] leading-none tracking-[-0.05em]"
        >
          SeoulSKY
        </p>
        <CityLayer
          viewBox={narrow ? NARROW_VIEWBOX : WIDE_VIEWBOX}
          className="ft-city relative block aspect-[620/760] h-auto w-full sm:aspect-[1600/760] [&_.sk-labels]:hidden"
        />
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 pb-6 font-mono text-[11px] text-mist/50 uppercase tracking-[0.2em] sm:px-10">
          <span>© {new Date().getFullYear()} SeoulSKY</span>
          <button
            type="button"
            onClick={() => scrollToSection("top")}
            className="group flex cursor-pointer items-center gap-2 transition-colors hover:text-mist"
          >
            Back to top
            <span className="group-hover:-translate-y-1 grid size-8 place-items-center rounded-full border border-white/15 transition-transform duration-500">
              <ArrowUp className="size-3.5" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
