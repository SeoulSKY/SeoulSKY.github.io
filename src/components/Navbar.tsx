import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { paddingX } from "../styles.js";
import logo from "../assets/logo.png";
import menu from "../assets/menu.svg";
import close from "../assets/close.svg";
import useScroll from "../hooks/useScroll";
import { pressableMotion } from "../utils/motion";

function ScrollBar() {
  const scrollY = useScroll();

  return (
    <div
      className={"h-2 rounded bg-white"}
      style={{ width: `${scrollY * 100}%` }}
    />
  );
}

interface NavbarProps {
  sections: { name: string; ref: React.RefObject<HTMLElement> }[];
}

const SMALL_DISPLAY_WIDTH = 900;

export default function Navbar({ sections }: NavbarProps) {
  const [toggle, setToggle] = useState(false);
  const [displayMenu, setDisplayMenu] = useState(
    window.innerWidth < SMALL_DISPLAY_WIDTH,
  );

  useEffect(() => {
    window.addEventListener("resize", () => {
      setDisplayMenu(window.innerWidth < SMALL_DISPLAY_WIDTH);
    });
  }, []);

  return (
    <div className={"fixed top-0 z-20 flex w-full flex-col items-start"}>
      <nav className={`${paddingX} flex w-full bg-black pt-3`}>
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between pb-3">
          <motion.div {...pressableMotion()}>
            <div
              className="flex items-center gap-2"
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              <img src={logo} alt="logo" className="h-9 w-9 object-contain" />
              <p className="flex text-[18px] font-bold text-white">SeoulSKY</p>
            </div>
          </motion.div>

          {!displayMenu && (
            <ul className="flex list-none flex-row gap-10">
              {sections.map(({ name, ref }) => (
                <motion.li
                  key={name}
                  className={
                    "cursor-pointer text-[18px] font-medium text-secondary hover:text-white"
                  }
                  onClick={() => {
                    if (ref.current) {
                      ref.current.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  {...pressableMotion()}
                >
                  {name}
                </motion.li>
              ))}
            </ul>
          )}

          {displayMenu && (
            <div className="flex flex-1 items-center justify-end">
              <img
                src={toggle ? close : menu}
                alt="menu"
                className="h-[28px] w-[28px] object-contain"
                onClick={() => setToggle(!toggle)}
              />

              <div
                className={`${
                  !toggle ? "hidden" : "flex"
                } black-gradient absolute right-0 top-20 z-10 mx-4 my-2 min-w-[140px] rounded-xl p-6`}
              >
                <ul className="flex flex-1 list-none flex-col items-start justify-end gap-4">
                  {sections.map(({ name, ref }) => (
                    <li
                      key={name}
                      className={
                        "font-poppins cursor-pointer text-[16px] font-medium text-secondary"
                      }
                      onClick={() => {
                        setToggle(!toggle);
                        ref.current?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      {name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </nav>
      <ScrollBar />
    </div>
  );
}
