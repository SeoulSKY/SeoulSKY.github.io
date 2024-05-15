import { BrowserRouter } from "react-router-dom";
import AnimatedCursor from "react-animated-cursor";
import { motion, useScroll } from "framer-motion";

import About from "./pages/About";
import Experience from "./pages/Experience";
import Hero from "./pages/Hero";
import Navbar from "./components/Navbar";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import Stars from "./components/canvas/Stars";
import Contact from "./pages/Contact";
import {Bounce, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import Awards from "./pages/Awards";

function ScrollBar() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div className={"bg-gray-100 fixed bottom-0 h-2 w-full rounded"} style={{ scaleX: scrollYProgress }} />
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
        <Navbar />
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Hero />
        </div>
        <Stars />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Awards />
        <div className="relative z-0">
          <Contact />
        </div>
        <ScrollBar />
      </div>

      <ToastContainer
        theme="dark"
        transition={Bounce}
      />

      <AnimatedCursor
        color="256, 256, 256"
        outerSize={35}
        innerScale={1}
        outerScale={1.7}
        outerAlpha={0}
        outerStyle={{
          border: "3px solid #fff"
        }}
      />
    </BrowserRouter>
  );
}
