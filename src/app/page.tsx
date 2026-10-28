"use client";

import "@/lib/gsap";

import CursorGlow from "@/components/cursor-glow";
import Footer from "@/components/footer";
import IntroScrubber from "@/components/intro-scrubber";
import Navbar from "@/components/navbar";
import Preloader from "@/components/preloader";
import Starfield from "@/components/seoul/starfield";
import SmoothScroll from "@/components/smooth-scroll";
import { useMounted } from "@/hooks/use-mounted";
import { INTRO_DEBUG } from "@/lib/intro";
import About from "@/sections/about";
import Awards from "@/sections/awards";
import Contact from "@/sections/contact";
import Experience from "@/sections/experience";
import Hero from "@/sections/hero";
import Projects from "@/sections/projects";
import Skills from "@/sections/skills";

export default function Page() {
  // INTRO_DEBUG reads the URL, which the prerendered page cannot know
  const mounted = useMounted();

  return (
    <>
      <SmoothScroll />
      <Preloader />
      {/* TEMPORARY: review controls for the opening sequence */}
      {mounted && INTRO_DEBUG && <IntroScrubber />}

      {/* the night sky behind everything below the hero */}
      <div
        aria-hidden="true"
        className="-z-10 pointer-events-none fixed inset-0"
      >
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_120%,#1d1650_0%,#0b0d26_45%,#06071a_100%)]" />
        <Starfield
          className="absolute inset-0 opacity-70"
          density={0.9}
          seed={5}
        />
      </div>
      <CursorGlow />
      <Navbar />

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <Hero />
            <About />
            <Experience />
            <Skills />
            <Projects />
            <Awards />
            <Contact />
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}
