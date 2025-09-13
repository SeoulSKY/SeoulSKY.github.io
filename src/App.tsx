import Introduction from "./sections/Introduction";
import Experiences from "./sections/Experiences";
import Navbar from "./components/Navbar";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import Contact from "./sections/Contact";
import { Toaster } from "@/components/ui/sonner";
import Awards from "./sections/Awards";
import Hero from "./sections/Hero";
import type { JSX } from "react";
import Galaxy from "@/components/Galaxy";
import TargetCursor from "./components/TargetCursor";
import { ThemeProvider } from "./components/theme-provider";

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
    <main className="relative z-0 h-full w-screen bg-black">
      <ThemeProvider defaultTheme="dark">
        <TargetCursor spinDuration={2} hideDefaultCursor={true} />

        <div className="-z-50 fixed inset-0">
          <Galaxy mouseRepulsion={false} />
        </div>

        <Navbar sections={sections.map((section) => section.name)} />

        <Hero />
        <div className="my-24 flex flex-col gap-20 px-6 sm:px-24">
          {sections.map((section) => (
            <section.Element key={section.name} />
          ))}
        </div>
        <Toaster theme="dark" richColors />
      </ThemeProvider>
    </main>
  );
}
