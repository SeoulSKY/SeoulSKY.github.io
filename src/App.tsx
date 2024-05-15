import { BrowserRouter } from "react-router-dom";
import AnimatedCursor from "react-animated-cursor";
import { motion, useScroll } from "framer-motion";
// import { positions, transitions, Provider as AlertProvider } from "react-alert";
// import AlertTemplate from "react-alert-template-basic";

import About from "./components/About";
// import Contact from "./components/Contact";
import Experience from "./components/Experience";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import StarsCanvas from "./components/canvas/Stars";

// const alertOptions = {
//   position: positions.TOP_RIGHT,
//   timeout: 5000,
//   offset: "5rem",
//   transition: transitions.SCALE
// };

function ScrollBar() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div className={"bg-gray-100 fixed bottom-0 h-2 w-full rounded"} style={{ scaleX: scrollYProgress }} />
  );
}

export default function App() {
  return (
    <BrowserRouter>
      {/*<AlertProvider template={AlertTemplate} {...alertOptions}>*/}
        <div className="relative z-0 bg-primary">
          <Navbar />
          <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
            <Hero />
          </div>
          <StarsCanvas />
          <About />
          <Experience />
          <Skills />
          <Projects />
          {/*<div className='relative z-0'>*/}
          {/*  <Contact />*/}
          {/*</div>*/}
          <ScrollBar />
        </div>

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
      {/*</AlertProvider>*/}
    </BrowserRouter>
  );
}
