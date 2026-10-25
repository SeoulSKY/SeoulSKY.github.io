import Image from "next/image";
import { useRef } from "react";
import SectionHeading from "@/components/section-heading";
import { type Skill, skillRows } from "@/data/content";
import { gsap, ScrollTrigger, useGSAP, withMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

function SkillPill({ skill, hidden }: { skill: Skill; hidden?: boolean }) {
  return (
    <li
      aria-hidden={hidden || undefined}
      className={cn(
        "group flex shrink-0 items-center gap-3 rounded-2xl border border-white/8 bg-white/3 py-3 pr-5 pl-3 transition-colors duration-300 hover:border-peach/40 hover:bg-white/7",
        // the second copy only exists to loop the marquee
        hidden && "motion-reduce:hidden",
      )}
    >
      <Image
        src={skill.icon}
        alt=""
        width={40}
        height={40}
        className="group-hover:-rotate-8 size-9 transition-transform duration-500 group-hover:scale-110 sm:size-10"
      />
      <span className="whitespace-nowrap font-medium text-mist/85 text-sm sm:text-base">
        {skill.name}
      </span>
    </li>
  );
}

export default function Skills() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () =>
      withMotion(() => {
        const q = gsap.utils.selector(root);
        const removers: (() => void)[] = [];

        const loops = q<HTMLElement>(".mq-track").map((track, i) => {
          const dir = i % 2 === 0 ? -1 : 1;
          const loop = gsap.fromTo(
            track,
            { xPercent: dir < 0 ? 0 : -50 },
            {
              xPercent: dir < 0 ? -50 : 0,
              duration: 38 + i * 6,
              ease: "none",
              repeat: -1,
              paused: true,
            },
          );
          // hovering a row slows its traffic down
          const row = track.parentElement;
          if (row) {
            function slow() {
              gsap.to(loop, {
                timeScale: 0.15,
                duration: 0.6,
                overwrite: true,
              });
            }
            function resume() {
              gsap.to(loop, { timeScale: 1, duration: 0.6, overwrite: true });
            }
            row.addEventListener("pointerenter", slow);
            row.addEventListener("pointerleave", resume);
            removers.push(() => {
              row.removeEventListener("pointerenter", slow);
              row.removeEventListener("pointerleave", resume);
            });
          }
          return loop;
        });

        // the rows only move while on screen, at a steady pace whatever
        // the scroll speed
        ScrollTrigger.create({
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => {
            for (const loop of loops) loop.paused(!self.isActive);
          },
        });

        gsap.from(q(".mq-row"), {
          // rise, not slide: a sideways entrance reads as the traffic
          // racing (or reversing) before it settles
          autoAlpha: 0,
          y: 40,
          duration: 1.4,
          stagger: 0.12,
          ease: "rise",
          scrollTrigger: { trigger: q(".mq-rows")[0], start: "top 85%" },
        });

        return () => {
          for (const remove of removers) remove();
        };
      }),
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="skills"
      className="relative overflow-hidden py-28 sm:py-40"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        <SectionHeading id="skills" index={3} title="The" accent="toolbox">
          <p className="max-w-xl text-lg text-mist/65 leading-relaxed">
            Languages, frameworks and infrastructure I reach for. Hover a row to
            slow the traffic down.
          </p>
        </SectionHeading>
      </div>

      <div className="mq-rows mt-16 flex flex-col gap-5 sm:mt-24">
        {skillRows.map((row) => (
          <div key={row.label} className="mq-row">
            <p className="mx-auto mb-3 max-w-7xl px-5 font-mono text-2xs text-mist/45 uppercase tracking-eyebrow sm:px-10">
              {row.label}
            </p>
            {/* reduced motion: no marquee, so the row wraps in the page column */}
            <div className="mask-fade-x motion-reduce:mask-none overflow-hidden motion-reduce:mx-auto motion-reduce:max-w-7xl motion-reduce:px-5 sm:motion-reduce:px-10">
              <ul
                className="mq-track flex w-max gap-3 pr-3 motion-reduce:w-auto motion-reduce:flex-wrap motion-reduce:pr-0"
                aria-label={row.label}
              >
                {[...row.skills, ...row.skills].map((skill, i) => (
                  <SkillPill
                    key={`${skill.name}-${i}`}
                    skill={skill}
                    hidden={i >= row.skills.length}
                  />
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
