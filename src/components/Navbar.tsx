import React, { useState } from "react";
import { motion, useScroll } from "framer-motion";

import logo from "../assets/logo.png";
import menu from "../assets/menu.svg";
import close from "../assets/close.svg";
import { pressableMotion } from "../utils/motion";
import { cn } from "../utils";

function ScrollBar() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className={"h-2 w-full rounded bg-secondary"}
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
    <div className={"fixed top-0 z-20 flex w-full flex-col items-start"}>
      <nav className={"container-x flex w-full bg-black pt-3"}>
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between pb-3">
          <motion.button
            className="flex items-center gap-2"
            {...pressableMotion()}
            onClick={() => {
              window.scrollTo(0, 0);
            }}
          >
            <img src={logo} alt="logo" className="h-9 w-9 object-contain" />
            <p className="flex text-[18px] font-bold text-white">SeoulSKY</p>
          </motion.button>

          <ul className="hidden list-none flex-row gap-10 lg:flex">
            {sections.map((name) => (
              <motion.li
                key={name}
                className={
                  "cursor-pointer text-[18px] font-medium text-secondary hover:text-white"
                }
                {...pressableMotion()}
              >
                <a href={`#${name.toLowerCase()}`}>{name}</a>
              </motion.li>
            ))}
          </ul>

          <div className="flex flex-1 items-center justify-end lg:hidden">
            <button onClick={() => setToggle(!toggle)}>
              <img
                src={toggle ? close : menu}
                alt="menu"
                className="h-[28px] w-[28px] object-contain"
              />
            </button>

            <div
              className={cn(
                "black-gradient absolute right-0 top-20 z-10 mx-4 my-2 min-w-[140px] rounded-xl p-6",
                toggle ? "flex" : "hidden",
              )}
            >
              <ul className="flex flex-1 list-none flex-col items-start justify-end gap-4">
                {sections.map((name) => (
                  <li
                    key={name}
                    className={
                      "font-poppins cursor-pointer text-[16px] font-medium text-secondary"
                    }
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
