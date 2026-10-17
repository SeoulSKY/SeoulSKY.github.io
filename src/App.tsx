import CursorGlow from "@/components/CursorGlow";
import Footer from "@/components/Footer";
import IntroScrubber from "@/components/IntroScrubber";
import Navbar from "@/components/Navbar";
import Preloader from "@/components/Preloader";
import SmoothScroll from "@/components/SmoothScroll";
import Starfield from "@/components/seoul/Starfield";
import { Toaster } from "@/components/ui/sonner";
import { INTRO_DEBUG } from "@/lib/intro";
import About from "@/sections/About";
import Awards from "@/sections/Awards";
import Contact from "@/sections/Contact";
import Experience from "@/sections/Experience";
import Hero from "@/sections/Hero";
import Projects from "@/sections/Projects";
import Skills from "@/sections/Skills";

export default function App() {
  return (
    <>
      <SmoothScroll />
      <Preloader />
      {/* TEMPORARY: review controls for the opening sequence */}
      {INTRO_DEBUG && <IntroScrubber />}

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

      <Toaster position="bottom-center" richColors />
    </>
  );
}
