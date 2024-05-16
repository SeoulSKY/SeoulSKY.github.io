import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {motion} from "framer-motion";

import { paddingX } from "../styles.js";
import logo from "../assets/logo.png";
import menu from "../assets/menu.svg";
import close from "../assets/close.svg";
import useScroll from "../hooks/useScroll";

const navElements: string[] = [
  "About",
  "Experiences",
  "Skills",
  "Projects",
  "Awards",
  "Contact",
];

function ScrollBar() {
  const scrollY = useScroll();

  return (
    <div
      className={`bg-white h-2 rounded`}
      style={{width: `${scrollY * 100}%`}}
    />
  );
}

const SMALL_DISPLAY_WIDTH = 900;

export default function Navbar() {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [displayMenu, setDisplayMenu] = useState(window.innerWidth < SMALL_DISPLAY_WIDTH);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setDisplayMenu(window.innerWidth < SMALL_DISPLAY_WIDTH);
    });
  }, []);

  return (
    <div className={"flex w-full flex-col items-start fixed top-0 z-20"}>
      <nav className={`${paddingX} w-full flex bg-primary pt-3`}>
        <div className="w-full flex justify-between items-center max-w-7xl mx-auto pb-3">
          <motion.div whileHover={{ scale: 1.1 }}>
            <Link
              to="/"
              className="flex items-center gap-2"
              onClick={() => {
                setActive("");
                window.scrollTo(0, 0);
              }}
            >
              <img src={logo} alt="logo" className="w-9 h-9 object-contain" />
              <p className="text-white text-[18px] font-bold flex">
                SeoulSKY
              </p>
            </Link>
          </motion.div>

          {!displayMenu && <ul className="list-none flex flex-row gap-10">
            {navElements.map((element) => (
              <motion.li
                key={element}
                className={`${active === element ? "text-white" : "text-secondary"
                } hover:text-white text-[18px] font-medium cursor-pointer`}
                onClick={() => setActive(element)}
                whileHover={{ scale: 1.1 }}
              >
                <a href={`#${element.toLowerCase()}`}>{element}</a>
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
                {navElements.map((element) => (
                  <li
                    key={element}
                    className={`font-poppins font-medium cursor-pointer text-[16px] 
                    ${active === element? "text-white" : "text-secondary"}`}
                    onClick={() => {
                      setToggle(!toggle);
                      setActive(element);
                    }}
                  >
                    <a href={`#${element.toLowerCase()}`}>{element}</a>
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
