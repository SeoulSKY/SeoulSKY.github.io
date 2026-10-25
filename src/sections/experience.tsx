import { ArrowDownRight } from "lucide-react";
import MetroLine from "@/components/metro-line";
import SectionHeading from "@/components/section-heading";
import SectionLink from "@/components/section-link";
import { experiences, nextStop } from "@/data/content";
import { METRO_LINES } from "@/lib/metro";

const LINE = METRO_LINES[2].color;

export default function Experience() {
  return (
    <section id="experience" className="relative px-5 py-28 sm:px-10 sm:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          id="experience"
          index={2}
          title="Work"
          accent="experience"
        >
          <p className="max-w-xl text-lg text-mist/65 leading-relaxed">
            Every stop on the line so far, from research in an HCI lab to owning
            healthcare software end to end, from a desktop app to an AI scribe.
          </p>
        </SectionHeading>

        <div className="mt-20 lg:mt-28">
          <MetroLine
            color={LINE}
            next={
              <div className="pt-1">
                <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-2xs uppercase tracking-label">
                  <span style={{ color: LINE }}>
                    <span className="font-kr font-semibold tracking-widest">
                      다음 역
                    </span>{" "}
                    · Next stop
                  </span>
                  <span className="text-mist/40">
                    <span className="font-kr tracking-widest">공사 중</span> ·
                    Under construction
                  </span>
                </p>
                <p className="mt-3 font-display font-semibold text-3xl tracking-tight sm:text-4xl">
                  {nextStop.title}{" "}
                  <span className="font-normal font-serif text-peach italic">
                    {nextStop.accent}
                  </span>
                </p>
                <SectionLink
                  to="contact"
                  className="group mt-4 inline-flex items-center gap-1.5 font-mono text-mist/60 text-xs uppercase tracking-label transition-colors hover:text-peach"
                >
                  {nextStop.cta}
                  <ArrowDownRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                </SectionLink>
              </div>
            }
            stops={experiences.map((exp, i) => ({
              key: `${exp.company}-${exp.date}`,
              when: exp.date,
              code: `2${String(i + 1).padStart(2, "0")} · ${exp.company}`,
              content: (
                <article className="glass rounded-3xl p-6 sm:p-9">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                    <h3 className="font-display font-semibold text-3xl tracking-tight sm:text-4xl">
                      {exp.title}
                    </h3>
                    <p className="font-serif text-2xl text-peach italic">
                      {exp.company}
                    </p>
                  </div>
                  <ul className="mt-7 space-y-4">
                    {exp.points.map((point) => (
                      <li
                        key={point}
                        className="relative pl-6 text-body text-mist/75 leading-relaxed"
                      >
                        <span className="absolute top-[0.6em] left-0 size-2 rounded-full border-2 border-line-2" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </article>
              ),
            }))}
          />
        </div>
      </div>
    </section>
  );
}
