import { BrowserRouter } from "react-router-dom";
import AnimatedCursor from "react-animated-cursor";

import Introduction from "./sections/Introduction";
import Experiences from "./sections/Experiences";
import Navbar from "./components/Navbar";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import Stars from "./components/canvas/Stars";
import Contact from "./sections/Contact";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Awards from "./sections/Awards";
import Hero from "./sections/Hero";

interface Section {
  name: string;
  Element: () => JSX.Element;
}

const sections: Section[] = [
  {
    name: "Introduction",
    Element: Introduction,
  },
  {
    name: "Experiences",
    Element: Experiences,
  },
  {
    name: "Skills",
    Element: Skills,
  },
  {
    name: "Projects",
    Element: Projects,
  },
  {
    name: "Awards",
    Element: Awards,
  },
  {
    name: "Contact",
    Element: Contact,
  },
];

export default function App() {
  return (
    <BrowserRouter>
      <main className="relative z-0 bg-black">
        <Stars />

        <Navbar sections={sections.map((section) => section.name)} />

        <Hero />
        {sections.map((section) => (
          <section.Element key={section.name} />
        ))}
      </main>

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
