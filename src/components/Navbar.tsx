import React, {useEffect, useState} from "react";
import {motion} from "framer-motion";

import { paddingX } from "../styles.js";
import logo from "../assets/logo.png";
import menu from "../assets/menu.svg";
import close from "../assets/close.svg";
import useScroll from "../hooks/useScroll";
import {pressableMotion} from "../utils/motion";

function ScrollBar() {
  const scrollY = useScroll();

  return (
    <div
      className={"bg-white h-2 rounded"}
      style={{width: `${scrollY * 100}%`}}
    />
  );
}

interface NavbarProps {
  sections: { name: string, ref: React.RefObject<HTMLElement>}[];
}

const SMALL_DISPLAY_WIDTH = 900;

export default function Navbar({sections}: NavbarProps) {
  const [toggle, setToggle] = useState(false);
  const [displayMenu, setDisplayMenu] = useState(window.innerWidth < SMALL_DISPLAY_WIDTH);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setDisplayMenu(window.innerWidth < SMALL_DISPLAY_WIDTH);
    });
  }, []);

  return (
    <div className={"flex w-full flex-col items-start fixed top-0 z-20"}>
      <nav className={`${paddingX} w-full flex bg-black pt-3`}>
        <div className="w-full flex justify-between items-center max-w-7xl mx-auto pb-3">
          <motion.div {...pressableMotion()}>
            <div
              className="flex items-center gap-2"
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              <img src={logo} alt="logo" className="w-9 h-9 object-contain" />
              <p className="text-white text-[18px] font-bold flex">
                SeoulSKY
              </p>
            </div>
          </motion.div>

          {!displayMenu && <ul className="list-none flex flex-row gap-10">
            {sections.map(({name, ref}) => (
              <motion.li
                key={name}
                className={"text-secondary hover:text-white text-[18px] font-medium cursor-pointer"}
                onClick={() => {
                  if (ref.current) {
                    ref.current.scrollIntoView({behavior: "smooth"});
                  }
                }}
                {...pressableMotion()}
              >
                {name}
              </motion.li>
            ))}
          </ul>}

          {displayMenu && <div className="flex flex-1 justify-end items-center">
            <img
              src={toggle ? close : menu}
              alt="menu"
              className="w-[28px] h-[28px] object-contain"
              onClick={() => setToggle(!toggle)}
            />

            <div
              className={`${!toggle ? "hidden" : "flex"
              } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
            >
              <ul className="list-none flex justify-end items-start flex-1 flex-col gap-4">
                {sections.map(({name, ref}) => (
                  <li
                    key={name}
                    className={"font-poppins font-medium cursor-pointer text-[16px] text-secondary"}
                    onClick={() => {
                      setToggle(!toggle);
                      ref.current?.scrollIntoView({behavior: "smooth"});
                    }}
                  >
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          </div>}
        </div>
      </nav>
      <ScrollBar />
    </div>
  );
}
