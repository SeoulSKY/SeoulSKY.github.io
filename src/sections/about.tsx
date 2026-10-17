import {
  AppWindow,
  LayoutTemplate,
  type LucideIcon,
  Server,
  Workflow,
} from "lucide-react";
import { useRef } from "react";
import SectionHeading from "@/components/section-heading";
import { introduction, type ServiceKey, services, stats } from "@/data/content";
import {
  gsap,
  isFinePointer,
  SplitText,
  useGSAP,
  withMotion,
} from "@/lib/gsap";

const ICONS: Record<ServiceKey, LucideIcon> = {
  backend: Server,
  frontend: LayoutTemplate,
  devops: Workflow,
  app: AppWindow,
};

function formatStat(n: number): string {
  return Math.round(n).toLocaleString("en-US");
}

/** Tilts each card toward the pointer. Returns a function that undoes it. */
function addTilt(cards: HTMLElement[]) {
  const removers = cards.map((card) => {
    // quickTo needs GSAP's own property names: given the CSS-style alias
    // "rotateX" it cannot find the property and never moves the card
    const rx = gsap.quickTo(card, "rotationX", {
      duration: 0.6,
      ease: "power3",
    });
    const ry = gsap.quickTo(card, "rotationY", {
      duration: 0.6,
      ease: "power3",
    });
    function move(e: PointerEvent) {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      card.style.setProperty("--mx", `${px * 100}%`);
      card.style.setProperty("--my", `${py * 100}%`);
      rx((0.5 - py) * 12);
      ry((px - 0.5) * 12);
    }
    function leave() {
      rx(0);
      ry(0);
    }
    card.addEventListener("pointermove", move);
    card.addEventListener("pointerleave", leave);
    return () => {
      card.removeEventListener("pointermove", move);
      card.removeEventListener("pointerleave", leave);
    };
  });
  return () => {
    for (const remove of removers) remove();
  };
}

export default function About() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () =>
      withMotion(() => {
        const q = gsap.utils.selector(root);

        // words light up as you read
        const split = SplitText.create(q(".about-copy")[0], { type: "words" });
        gsap.fromTo(
          split.words,
          { opacity: 0.14 },
          {
            opacity: 1,
            stagger: 0.1,
            ease: "none",
            scrollTrigger: {
              trigger: q(".about-copy")[0],
              start: "top 80%",
              end: "bottom 45%",
              scrub: true,
            },
          },
        );

        // counters: the markup holds the real figure for crawlers and
        // reduced motion; here it counts up from zero instead
        const counters = q<HTMLElement>(".stat-num");
        for (const el of counters) {
          const target = Number(el.dataset.value);
          const obj = { v: 0 };
          el.textContent = "0";
          gsap.to(obj, {
            v: target,
            duration: 2.2,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 90%" },
            onUpdate: () => {
              el.textContent = formatStat(obj.v);
            },
          });
        }
        gsap.from(q(".stat"), {
          y: 40,
          autoAlpha: 0,
          duration: 1.1,
          stagger: 0.1,
          ease: "rise",
          scrollTrigger: { trigger: q(".stats")[0], start: "top 88%" },
        });

        // service cards
        gsap.from(q(".svc"), {
          y: 80,
          autoAlpha: 0,
          rotateX: -20,
          duration: 1.3,
          stagger: 0.12,
          ease: "rise",
          scrollTrigger: { trigger: q(".svc-grid")[0], start: "top 85%" },
        });

        const removeTilt = isFinePointer()
          ? addTilt(q<HTMLElement>(".svc"))
          : null;

        return () => {
          removeTilt?.();
          split.revert();
          for (const el of counters) {
            el.textContent = formatStat(Number(el.dataset.value));
          }
        };
      }),
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="about"
      className="relative px-5 py-28 sm:px-10 sm:py-40"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          id="about"
          index={1}
          title="Scalable, intuitive"
          accent="software."
        />

        <div className="mt-16 grid gap-16 lg:mt-24 lg:grid-cols-12">
          <p className="about-copy font-display font-medium text-[clamp(1.35rem,2.6vw,2.4rem)] leading-[1.3] tracking-[-0.015em] lg:col-span-8">
            {introduction}
          </p>

          <dl className="stats grid grid-cols-2 gap-x-6 gap-y-10 self-end lg:col-span-4 lg:grid-cols-1 lg:gap-8 lg:border-white/10 lg:border-l lg:pl-10">
            {stats.map((s) => (
              <div key={s.label} className="stat">
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display font-semibold text-4xl tracking-tight sm:text-5xl">
                  <span className="stat-num tabular-nums" data-value={s.value}>
                    {formatStat(s.value)}
                  </span>
                  <span className="text-peach">{s.suffix}</span>
                </dd>
                <dd className="mt-1 font-mono text-[11px] text-mist/55 uppercase tracking-[0.18em]">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div
          className="svc-grid mt-24 grid gap-4 sm:grid-cols-2 lg:mt-32 lg:grid-cols-4"
          style={{ perspective: "1000px" }}
        >
          {services.map(({ key, title, blurb }, i) => {
            const Icon = ICONS[key];
            return (
              <article
                key={key}
                className="svc group glass relative flex min-h-72 flex-col justify-between overflow-hidden rounded-3xl p-7 [transform-style:preserve-3d]"
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(420px circle at var(--mx,50%) var(--my,50%), rgb(255 195 161 / 0.16), transparent 45%)",
                  }}
                />
                <div className="flex items-start justify-between">
                  <span className="grid size-12 place-items-center rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent text-peach">
                    <Icon className="size-5" strokeWidth={1.6} />
                  </span>
                  <span className="font-mono text-mist/35 text-xs">
                    0{i + 1}
                  </span>
                </div>
                <div style={{ transform: "translateZ(30px)" }}>
                  <h3 className="font-display font-semibold text-2xl tracking-tight">
                    {title}
                  </h3>
                  <p className="mt-2 text-mist/60 text-sm leading-relaxed">
                    {blurb}
                  </p>
                </div>
                <div className="absolute inset-x-7 bottom-0 h-px bg-gradient-to-r from-transparent via-peach/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
