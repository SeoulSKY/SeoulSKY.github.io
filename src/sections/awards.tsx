import { Award as AwardIcon } from "lucide-react";
import { useRef } from "react";
import SectionHeading from "@/components/section-heading";
import { awards } from "@/data/content";
import { gsap, useGSAP, withMotion } from "@/lib/gsap";

export default function Awards() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () =>
      withMotion(() => {
        const q = gsap.utils.selector(root);
        gsap.from(q(".ticket"), {
          y: 120,
          rotate: (i: number) => (i % 2 ? 6 : -6),
          autoAlpha: 0,
          duration: 1.4,
          stagger: 0.12,
          ease: "rise",
          scrollTrigger: { trigger: q(".tickets")[0], start: "top 85%" },
        });
      }),
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="awards"
      className="relative px-5 py-28 sm:px-10 sm:py-40"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          id="awards"
          index={5}
          title="Honours"
          accent="& awards"
        />

        <ol className="tickets mt-16 grid gap-6 sm:mt-24 lg:grid-cols-2">
          {awards.map((a, i) => (
            <li
              key={a.title}
              className="ticket group hover:-translate-y-1.5 relative flex overflow-hidden rounded-3xl transition-transform duration-500"
            >
              {/* stub */}
              <div className="relative flex w-28 shrink-0 flex-col items-center justify-between bg-line-5 px-3 py-6 text-night-950 sm:w-36">
                <span className="font-bold font-kr text-xs">5호선</span>
                <div className="text-center">
                  <p className="font-bold font-display text-4xl leading-none tracking-tight sm:text-5xl">
                    {a.year}
                  </p>
                  <p className="mt-1 font-mono text-xs uppercase tracking-[0.25em]">
                    {a.month}
                  </p>
                </div>
                <span className="font-mono text-[10px] tracking-widest">
                  NO. 5{String(i + 1).padStart(2, "0")}
                </span>
                {/* notches */}
                <span className="-top-3 -right-3 absolute size-6 rounded-full bg-night-950" />
                <span className="-right-3 -bottom-3 absolute size-6 rounded-full bg-night-950" />
              </div>
              {/* perforation */}
              <div className="w-px bg-[repeating-linear-gradient(180deg,rgb(255_255_255/0.35)_0_6px,transparent_6px_12px)]" />
              {/* body */}
              <div className="glass relative flex-1 rounded-r-3xl border-l-0 p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display font-semibold text-xl tracking-tight sm:text-2xl">
                    {a.title}
                  </h3>
                  <AwardIcon className="mt-1 size-5 shrink-0 text-line-5 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-125" />
                </div>
                <p className="mt-4 text-[14px] text-mist/65 leading-relaxed">
                  {a.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
