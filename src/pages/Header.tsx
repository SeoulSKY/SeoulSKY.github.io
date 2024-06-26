import { motion } from "framer-motion";

import { paddingX, heroHeadText, heroSubText } from "../styles";
import Rocket from "../components/canvas/Rocket";

export default function Header() {
  return (
    <section className={"relative w-full h-screen mx-auto"}>
      <Rocket />
      
      <div
        className={`absolute inset-0 top-[120px]  max-w-7xl mx-auto ${paddingX} flex flex-row items-start gap-5`}
      >
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#0ea5e9]" />
          <div className="w-1 sm:h-80 h-40 blue-gradient" />
        </div>

        <div>
          <h1 className={`${heroHeadText} text-white`}>
            Hi, I'm <span className="text-[#0ea5e9]">SeoulSKY</span>
          </h1>
          <p className={`${heroSubText} mt-2 text-white-100`}>
            I'm a recent graduate with a major of Honours in Software Engineering and a minor in Applied Mathematics
          </p>
        </div>
      </div>

      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
        <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
          <motion.div
            animate={{
              y: [0, 24, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
            }}
            className="w-3 h-3 rounded-full bg-secondary mb-1"
          />
        </div>
      </div>
    </section>
  );
}
