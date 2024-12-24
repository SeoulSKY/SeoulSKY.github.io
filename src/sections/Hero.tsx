import { motion } from "framer-motion";

import Rocket from "../components/canvas/Rocket";

export default function Hero() {
  return (
    <section className={"relative mx-auto h-screen w-full"}>
      <Rocket />

      <div
        className={
          "container-x absolute inset-0 top-[120px] mx-auto flex max-w-7xl flex-row items-start gap-5"
        }
      >
        <div>
          <h1
            className={
              "mt-2 text-[40px] font-black text-white xs:text-[50px] sm:text-[60px] lg:text-[80px] lg:leading-[98px]"
            }
          >
            Hi, I'm <span className="text-primary">SeoulSKY</span>
          </h1>
          <p
            className={
              "text-white-100 mt-2 text-[16px] font-medium xs:text-[20px] sm:text-[26px] lg:text-[30px] lg:leading-[40px]"
            }
          >
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
