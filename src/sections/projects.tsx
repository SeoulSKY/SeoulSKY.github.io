import { ArrowUpRight, Play } from "lucide-react";
import Image, { getImageProps } from "next/image";
import { Fragment, useEffect, useRef } from "react";
import { GithubIcon } from "@/components/icons";
import SectionHeading from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GITHUB_URL, type Project, projects } from "@/data/content";
import { useMediaQuery } from "@/hooks/use-media-query";
import { gsap, useGSAP } from "@/lib/gsap";
import { METRO_LINES } from "@/lib/metro";
import { cn } from "@/lib/utils";

/** Project media is about half the viewport wide on desktop, full width below. */
const MEDIA_SIZES = "(min-width: 1024px) 50vw, 100vw";

/** A video poster cannot be an <Image>, so it takes the optimized URL instead. */
function posterUrl(src: string): string {
  return getImageProps({ src, alt: "", fill: true, sizes: MEDIA_SIZES }).props
    .src;
}

function ProjectMedia({ project }: { project: Project }) {
  const video = useRef<HTMLVideoElement>(null);
  // reduced motion: no autoplay; the poster shows and controls let you play
  const still = useMediaQuery("(prefers-reduced-motion: reduce)");

  // only play while on screen
  useEffect(() => {
    const el = video.current;
    if (!el || still) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      el.pause();
    };
  }, [still]);

  return (
    <div className="pj-media relative isolate aspect-[16/10] overflow-hidden rounded-2xl bg-night-800 [clip-path:inset(0_round_1rem)]">
      <div className="pj-media-inner absolute inset-0">
        {project.video ? (
          <video
            ref={video}
            className="h-full w-full object-cover"
            src={project.video}
            poster={posterUrl(project.image)}
            muted
            loop
            playsInline
            preload="none"
            controls={still}
            aria-label={`${project.title} preview`}
          />
        ) : (
          <Image
            src={project.image}
            alt={`${project.title} preview`}
            fill
            sizes={MEDIA_SIZES}
            className="object-cover"
          />
        )}
      </div>
      <div className="-inset-px pointer-events-none absolute bg-gradient-to-t from-night-950/50 via-transparent to-transparent" />
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10 ring-inset" />
      {project.stat && (
        <span className="absolute bottom-4 left-4 rounded-full border border-white/15 bg-night-950/70 px-3 py-1 font-mono text-[11px] text-peach uppercase tracking-wider backdrop-blur">
          {project.stat}
        </span>
      )}
    </div>
  );
}

const LINE = METRO_LINES[4].color;

/**
 * The gangway between two carriages: a ribbed bellows that joins one
 * project's car to the next, so each car reads as one unit.
 */
function Gangway() {
  return (
    <div
      aria-hidden="true"
      className="relative h-10 w-24 shrink-0 self-center lg:h-32 lg:w-[5vw]"
    >
      <div className="absolute inset-0 rounded-md border border-white/10 bg-[repeating-linear-gradient(180deg,rgb(244_240_255/0.09)_0_2px,transparent_2px_7px)] bg-night-800 lg:bg-[repeating-linear-gradient(90deg,rgb(244_240_255/0.09)_0_2px,transparent_2px_7px)]" />
    </div>
  );
}

/** Wheel radius in px. The wheels turn by distance travelled / radius. */
const WHEEL_R = 16;

function Wheel({ className }: { className?: string }) {
  return (
    <svg
      viewBox="-17 -17 34 34"
      className={cn("pj-wheel absolute bottom-0 size-[34px]", className)}
      aria-hidden="true"
    >
      <circle
        r={WHEEL_R}
        fill="#0b0d26"
        stroke="rgb(244 240 255 / 0.3)"
        strokeWidth={2}
      />
      <circle
        r={10.5}
        fill="none"
        stroke="rgb(244 240 255 / 0.12)"
        strokeWidth={1.5}
      />
      {[0, 60, 120].map((a) => (
        <line
          key={a}
          x1={-10.5}
          x2={10.5}
          stroke="rgb(244 240 255 / 0.2)"
          strokeWidth={1.5}
          transform={`rotate(${a})`}
        />
      ))}
      <circle
        r={3.2}
        fill="#1e2152"
        stroke="rgb(244 240 255 / 0.45)"
        strokeWidth={1.2}
      />
    </svg>
  );
}

/** A bogie: the wheel frame under each end of a car. */
function Bogie({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("absolute top-full h-[46px] w-[150px]", className)}
    >
      {/* bolster: ties the bogie up into the car body */}
      <span className="-translate-x-1/2 absolute top-0 left-1/2 h-3 w-12 rounded-b-sm border-white/10 border-x border-b bg-night-800" />
      {/* side frame with its spring pocket */}
      <span className="absolute inset-x-[14px] top-[10px] h-[13px] rounded-[5px] border border-white/15 bg-night-700" />
      <span className="-translate-x-1/2 absolute top-[8px] left-1/2 h-[17px] w-7 rounded-[4px] border border-white/15 bg-[repeating-linear-gradient(180deg,rgb(244_240_255/0.14)_0_1.5px,transparent_1.5px_4px)] bg-night-800" />
      <Wheel className="left-[6px]" />
      <Wheel className="right-[6px]" />
    </div>
  );
}

function ProjectPanel({ project, index }: { project: Project; index: number }) {
  return (
    <div className="pj-car relative flex w-full shrink-0 lg:w-[min(86vw,1320px)]">
      <Bogie className="left-[7%] hidden lg:block" />
      <Bogie className="right-[7%] hidden lg:block" />
      <PanelBody project={project} index={index} />
    </div>
  );
}

function PanelBody({ project, index }: { project: Project; index: number }) {
  return (
    <article className="pj-panel glass group relative grid w-full gap-6 overflow-hidden rounded-[2rem] p-4 sm:gap-8 sm:p-6 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:gap-12 lg:p-8">
      <ProjectMedia project={project} />
      <div className="pj-info px-2 sm:px-0 lg:pr-4">
        <p className="flex items-center gap-3 font-mono text-mist/45 text-xs tracking-[0.3em]">
          <span
            className="rounded-sm px-1.5 py-0.5 font-semibold text-[10px] text-white tracking-[0.2em]"
            style={{ background: LINE }}
          >
            CAR {String(index + 1).padStart(2, "0")}
          </span>
          <span>/ {String(projects.length).padStart(2, "0")}</span>
        </p>
        <h3 className="mt-4 font-bold font-display text-5xl tracking-[-0.03em] sm:text-6xl xl:text-7xl">
          {project.title}
        </h3>
        <p className="mt-3 font-serif text-2xl text-peach italic leading-snug">
          {project.subtitle}
        </p>
        <p className="mt-5 max-w-lg text-[15px] text-mist/70 leading-relaxed">
          {project.description}
        </p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li key={tag}>
              <Badge variant="outline">{tag}</Badge>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap gap-3">
          {project.sourceCodeLink && (
            <Button asChild variant="outline">
              <a href={project.sourceCodeLink} target="_blank" rel="noreferrer">
                <GithubIcon />
                Source
              </a>
            </Button>
          )}
          {project.playLink && (
            <Button asChild>
              <a href={project.playLink} target="_blank" rel="noreferrer">
                <Play />
                Try it live
              </a>
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const track = q(".pj-track")[0] as HTMLElement;
          const wheels = q(".pj-wheel");
          gsap.set(wheels, { transformOrigin: "50% 50%" });
          // Stop when the GitHub card's right edge meets the page gutter
          // (measured from the card, not scrollWidth: the rail overhangs).
          const more = q(".pj-more")[0] as HTMLElement;
          function distance() {
            const gutter = parseFloat(getComputedStyle(track).paddingLeft);
            return Math.max(
              0,
              more.offsetLeft + more.offsetWidth + gutter - window.innerWidth,
            );
          }

          const scroller = gsap.to(track, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              trigger: q(".pj-pin")[0],
              start: "top top",
              end: () => `+=${distance()}`,
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
              anticipatePin: 1,
            },
            // the cars roll: each wheel turns by distance / radius
            onUpdate: () => {
              const x = gsap.getProperty(track, "x") as number;
              gsap.set(wheels, { rotation: (x / WHEEL_R) * (180 / Math.PI) });
            },
          });

          // inner parallax + reveal per panel, driven by the horizontal tween
          for (const panel of q<HTMLElement>(".pj-panel, .pj-more")) {
            const media = panel.querySelector(".pj-media-inner");
            if (media) {
              gsap.fromTo(
                media,
                { xPercent: -8, scale: 1.18 },
                {
                  xPercent: 8,
                  scale: 1.18,
                  ease: "none",
                  scrollTrigger: {
                    trigger: panel,
                    containerAnimation: scroller,
                    start: "left right",
                    end: "right left",
                    scrub: true,
                  },
                },
              );
            }
            gsap.from(panel.querySelectorAll(".pj-info > *"), {
              x: 120,
              autoAlpha: 0,
              stagger: 0.06,
              ease: "power2.out",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: scroller,
                // the GitHub card comes to rest at ~65% of the viewport, so
                // its reveal must finish before then
                start: panel.classList.contains("pj-more")
                  ? "left 100%"
                  : "left 85%",
                end: panel.classList.contains("pj-more")
                  ? "left 72%"
                  : "left 35%",
                scrub: true,
              },
            });
          }
        },
      );

      mm.add(
        "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
        () => {
          for (const panel of q<HTMLElement>(".pj-panel")) {
            gsap.from(panel, {
              y: 80,
              autoAlpha: 0,
              duration: 1.2,
              ease: "rise",
              scrollTrigger: { trigger: panel, start: "top 88%" },
            });
          }
        },
      );

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="projects"
      className="relative py-28 sm:py-40 lg:pb-0"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        <SectionHeading
          id="projects"
          index={4}
          title="Selected"
          accent="projects"
        >
          <p className="max-w-xl text-lg text-mist/65 leading-relaxed">
            A few things I’ve built: a Python library, a Discord bot, games and
            web apps.
          </p>
        </SectionHeading>
      </div>

      <div className="pj-pin relative mt-16 lg:mt-0 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:overflow-hidden lg:pt-16 lg:motion-reduce:overflow-x-auto">
        <div className="pj-track relative flex flex-col items-center px-5 sm:px-10 lg:w-max lg:flex-row lg:items-stretch lg:pb-[46px] lg:pl-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))]">
          {/* the rail the train runs on (uniform, so it reads as still) */}
          <span
            aria-hidden="true"
            className="-inset-x-[100vw] pointer-events-none absolute bottom-0 hidden h-[3px] rounded-full bg-[linear-gradient(180deg,rgb(244_240_255/0.38),rgb(244_240_255/0.12))] shadow-[0_6px_18px_rgb(168_155_219/0.18)] lg:block"
          />
          {projects.map((p, i) => (
            <Fragment key={p.title}>
              {i > 0 && <Gangway />}
              <ProjectPanel project={p} index={i} />
            </Fragment>
          ))}
          <div className="h-16 w-px shrink-0 lg:h-auto lg:w-[8vw]" />
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="pj-more group relative flex aspect-square w-full max-w-sm shrink-0 flex-col justify-between self-center overflow-hidden rounded-[2rem] border border-white/10 p-8 transition-colors hover:border-peach/50 lg:w-[26rem]"
          >
            <span className="font-mono text-mist/45 text-xs tracking-[0.3em]">
              MORE
            </span>
            <span className="pj-info">
              <span className="block font-bold font-display text-5xl tracking-tight">
                Everything else
              </span>
              <span className="mt-2 block font-serif text-2xl text-peach italic">
                lives on GitHub
              </span>
            </span>
            <span className="grid size-14 place-items-center self-end rounded-full bg-peach text-night-950 transition-transform duration-500 group-hover:rotate-45">
              <ArrowUpRight className="size-6" />
            </span>
            <span className="-right-24 -bottom-24 absolute size-64 rounded-full bg-dusk/20 blur-3xl transition-transform duration-700 group-hover:scale-150" />
          </a>
        </div>
      </div>
    </section>
  );
}
