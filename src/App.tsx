import { BrowserRouter } from "react-router-dom";
import AnimatedCursor from "react-animated-cursor";

import About from "./pages/About";
import Experience from "./pages/Experiences";
import Hero from "./pages/Hero";
import Navbar from "./components/Navbar";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import Stars from "./components/canvas/Stars";
import Contact from "./pages/Contact";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRef } from "react";
import Awards from "./pages/Awards";

const sections = [
  {
    name: "About",
    Section: About,
  },
  {
    name: "Experience",
    Section: Experience,
  },
  {
    name: "Skills",
    Section: Skills,
  },
  {
    name: "Projects",
    Section: Projects,
  },
  {
    name: "Awards",
    Section: Awards,
  },
  {
    name: "Contact",
    Section: Contact,
  },
];

export default function App() {
  const components = sections.map((section) => {
    return {
      ...section,
      ref: useRef(null),
    };
  });

  return (
    <BrowserRouter>
      <div className="relative z-0 bg-black">
        <Stars />

        <Navbar sections={components} />
        <Hero />
        {components.map((component) => (
          <div key={component.name} ref={component.ref}>
            <component.Section />
          </div>
        ))}
      </div>

      <ToastContainer theme="dark" transition={Bounce} />

      <AnimatedCursor
        color="256, 256, 256"
        outerSize={35}
        innerScale={1}
        outerScale={1.7}
        outerAlpha={0}
        outerStyle={{
          border: "3px solid #fff",
        }}
      />
    </BrowserRouter>
  );
}
