import { Menu } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { GithubIcon } from "@/components/icons";
import SectionLink from "@/components/section-link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { GITHUB_URL, KOREAN, navSections } from "@/data/content";
import { gsap, prefersReducedMotion, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { onIntro } from "@/lib/intro";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);

  useGSAP(
    () => {
      const reduce = prefersReducedMotion();
      if (!reduce) gsap.set(root.current, { yPercent: -120, autoAlpha: 0 });
      // Build the entrance here, not in the onIntro callback: the preloader's
      // timeline fires that callback inside its own GSAP context, so a tween
      // made there would be reverted (back to hidden) when the preloader
      // unmounts.
      const enter = gsap.to(root.current, {
        yPercent: 0,
        autoAlpha: 1,
        duration: 1.2,
        delay: 1.6,
        ease: "rise",
        paused: true,
      });
      const off = onIntro(() => enter.restart(true));

      // scroll progress
      gsap.to(".nav-progress", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
      });

      // a frosted pill once we've left the hero
      ScrollTrigger.create({
        start: () => window.innerHeight * 0.6,
        end: "max",
        toggleClass: { targets: root.current, className: "is-scrolled" },
      });

      // active section
      const triggers = navSections.map(({ id }) =>
        ScrollTrigger.create({
          trigger: document.getElementById(id),
          start: "top 55%",
          end: "bottom 55%",
          // measure after the sections' own pins (Projects adds scroll length)
          refreshPriority: -1,
          onToggle: (self) => self.isActive && setActive(id),
          onLeaveBack: () => id === "about" && setActive(""),
        }),
      );
      return () => {
        off();
        for (const t of triggers) t.kill();
      };
    },
    { scope: root },
  );

  function close() {
    setOpen(false);
  }

  return (
    <header
      ref={root}
      className="group/nav fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-transparent px-3 py-2 transition-[background,border-color,box-shadow,backdrop-filter] duration-500 group-[.is-scrolled]/nav:border-white/10 group-[.is-scrolled]/nav:bg-night-900/60 group-[.is-scrolled]/nav:shadow-[0_10px_40px_-20px_rgb(0_0_0/0.8)] group-[.is-scrolled]/nav:backdrop-blur-xl sm:px-4">
        <SectionLink
          to="top"
          onClick={close}
          className="group flex items-center gap-2.5"
          aria-label="Back to top"
        >
          <Image
            src="/logo.png"
            alt=""
            width={32}
            height={32}
            className="group-hover:-rotate-12 size-8 rounded-full ring-1 ring-white/20 transition-transform duration-500 group-hover:scale-110"
          />
          <span className="font-bold font-display text-[17px] tracking-tight">
            SeoulSKY
          </span>
        </SectionLink>

        <ul className="hidden items-center gap-1 lg:flex">
          {navSections.map(({ id, label }) => (
            <li key={id}>
              <SectionLink
                to={id}
                onClick={close}
                aria-current={active === id ? "location" : undefined}
                className={cn(
                  "group relative flex flex-col items-center rounded-full px-4 py-1.5 text-sm transition-colors",
                  active === id ? "text-mist" : "text-mist/60 hover:text-mist",
                )}
              >
                <span
                  className={cn(
                    "absolute inset-0 rounded-full bg-white/7 transition-all duration-500",
                    active === id
                      ? "scale-100 opacity-100"
                      : "scale-75 opacity-0",
                  )}
                />
                <span className="relative">{label}</span>
              </SectionLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub profile"
            className="grid size-9 place-items-center rounded-full border border-white/10 bg-white/3 text-mist/80 transition hover:border-white/25 hover:text-mist"
          >
            <GithubIcon className="size-4" />
          </a>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className="grid size-9 cursor-pointer place-items-center rounded-full border border-white/10 bg-white/3 lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-4" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full border-white/10 bg-night-950/95 p-8 backdrop-blur-xl sm:max-w-sm"
            >
              <SheetTitle className="font-kr text-peach text-sm tracking-eyebrow">
                서울하늘
              </SheetTitle>
              <SheetDescription className="sr-only">
                Site navigation
              </SheetDescription>
              <ul className="mt-10 flex flex-col gap-2">
                {navSections.map(({ id, label }, i) => (
                  <li key={id}>
                    <SectionLink
                      to={id}
                      onClick={close}
                      aria-current={active === id ? "location" : undefined}
                      className="group flex w-full items-baseline gap-4 border-white/5 border-b py-4 text-left"
                    >
                      <span className="font-mono text-mist/40 text-xs">
                        0{i + 1}
                      </span>
                      <span className="font-display font-semibold text-3xl transition-colors group-hover:text-peach">
                        {label}
                      </span>
                      <span className="ml-auto font-kr text-mist/40 text-sm">
                        {KOREAN[id]}
                      </span>
                    </SectionLink>
                  </li>
                ))}
              </ul>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
      <div className="nav-progress pointer-events-none fixed inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-lavender via-dusk to-peach" />
    </header>
  );
}
