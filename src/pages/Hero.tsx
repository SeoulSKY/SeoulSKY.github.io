import { motion } from "framer-motion";

import { paddingX, heroHeadText, heroSubText } from "../styles";
import Rocket from "../components/canvas/Rocket";

export default function Hero() {
  return (
    <section className={"relative mx-auto h-screen w-full"}>
      <Rocket />

      <div
        className={`absolute inset-0 top-[120px] mx-auto max-w-7xl ${paddingX} flex flex-row items-start gap-5`}
      >
        <div className="mt-5 flex flex-col items-center justify-center">
          <div className="h-5 w-5 rounded-full bg-[#0ea5e9]" />
          <div className="blue-gradient h-40 w-1 sm:h-80" />
        </div>

        <div>
          <h1 className={`${heroHeadText} text-white`}>
            Hi, I'm <span className="text-[#0ea5e9]">SeoulSKY</span>
          </h1>
          <p className={`${heroSubText} mt-2 text-white-100`}>
            I'm a recent graduate with a major of Honours in Software
            Engineering and a minor in Applied Mathematics
          </p>
        </div>
      </div>

      <div className="absolute bottom-32 flex w-full items-center justify-center xs:bottom-10">
        <div className="flex h-[64px] w-[35px] items-start justify-center rounded-3xl border-4 border-secondary p-2">
          <motion.div
            animate={{
              y: [0, 24, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
            }}
            className="mb-1 h-3 w-3 rounded-full bg-secondary"
          />
        </div>
      </div>
    </section>
  );
}
