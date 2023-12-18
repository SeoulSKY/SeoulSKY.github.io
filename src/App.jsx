import { BrowserRouter } from "react-router-dom";
import AnimatedCursor from "react-animated-cursor"
import { motion, useScroll } from "framer-motion";
import { positions, transitions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from "react-alert-template-basic";

import { About, Contact, Experience, Feedbacks, Hero, Navbar, Skills, Projects, StarsCanvas } from "./components";

const alertOptions = {
  position: positions.TOP_RIGHT,
  timeout: 5000,
  offset: "5rem",
  transition: transitions.SCALE
}

const ScrollBar = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div className={"bg-gray-100 fixed bottom-0 h-2 w-full rounded"} style={{ scaleX: scrollYProgress }} />
  )
}

const App = () => {
  return (
    <BrowserRouter>
      <AlertProvider template={AlertTemplate} {...alertOptions}>
        <div className='relative z-0 bg-primary'>
          <Navbar />
          <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
            <Hero />
          </div>
          <StarsCanvas />
          <About />
          <Experience />
          <Skills />
          <Projects />
          <Feedbacks />
          <div className='relative z-0'>
            <Contact />
          </div>
          <ScrollBar />
        </div>

        <AnimatedCursor
          color="256, 256, 256"
          outerSize={35}
          innerScale={1}
          outerScale={1.7}
          outerAlpha={0}
          outerStyle={{
            border: '3px solid #fff'
          }}
          />
      </AlertProvider>
    </BrowserRouter>
  );
}

export default App;
