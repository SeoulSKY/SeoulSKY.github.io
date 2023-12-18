import { BrowserRouter } from "react-router-dom";
import AnimatedCursor from "react-animated-cursor"

import { About, Contact, Experience, Feedbacks, Hero, Navbar, Skills, Projects, StarsCanvas } from "./components";

const App = () => {
  return (
    <BrowserRouter>
      <div className='relative z-0 bg-primary'>
        <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
          <Navbar />
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
    </BrowserRouter>
  );
}

export default App;
