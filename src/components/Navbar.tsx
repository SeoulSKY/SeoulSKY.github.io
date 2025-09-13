import { motion, useScroll } from "motion/react";
import { useState } from "react";
import close from "@/assets/close.svg";
import logo from "@/assets/logo.png";
import menu from "@/assets/menu.svg";
import { cn } from "@/lib/utils";

function ScrollBar() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="h-2 w-full rounded bg-white"
      style={{ scaleX: scrollYProgress, transformOrigin: 0 }}
    />
  );
}

interface NavbarProps {
  sections: string[];
}

export default function Navbar({ sections }: NavbarProps) {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="fixed top-0 z-20 flex w-full flex-col items-start">
      <nav className="flex w-full pt-3 backdrop-blur">
        <div className="mx-auto flex w-full items-center justify-between px-6 pb-3 sm:px-24">
          <button
            type="button"
            className="group flex cursor-pointer cursor-target items-center gap-2 duration-300 hover:scale-110"
            onClick={() => {
              window.scrollTo(0, 0);
            }}
          >
            <img src={logo} alt="logo" className="h-9 w-9 object-contain" />
            <p className="flex font-bold text-[18px] text-muted-foreground group-hover:text-white">
              SeoulSKY
            </p>
          </button>

          <ul className="hidden list-none flex-row gap-10 lg:flex">
            {sections.map((name) => (
              <li
                key={name}
                className="cursor-target font-medium text-[18px] text-muted-foreground duration-300 hover:scale-110 hover:text-white"
              >
                <a href={`#${name.toLowerCase()}`}>{name}</a>
              </li>
            ))}
          </ul>

          <div className="flex flex-1 items-center justify-end lg:hidden">
            <button type="button" onClick={() => setToggle(!toggle)}>
              <img
                src={toggle ? close : menu}
                alt="menu"
                className="h-[28px] w-[28px] object-contain"
              />
            </button>

            <div
              className={cn(
                "absolute top-20 right-0 z-10 mx-4 my-2 min-w-[140px] rounded-xl p-6",
                toggle ? "flex" : "hidden",
              )}
            >
              <ul className="flex flex-1 list-none flex-col items-start justify-end gap-4">
                {sections.map((name) => (
                  <li
                    key={name}
                    className="cursor-pointer font-medium text-[16px] text-white"
                  >
                    <a
                      href={`#${name.toLowerCase()}`}
                    >{`${name[0].toUpperCase()}${name.slice(1)}`}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <ScrollBar />
    </div>
  );
}
