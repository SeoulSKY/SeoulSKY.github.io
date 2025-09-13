import { motion } from "motion/react";

import Rocket from "../components/canvas/Rocket";
import TextType from "@/components/TextType";

export default function Hero() {
  return (
    <section className="relative mx-auto h-screen w-full">
      <Rocket />

      <div className="absolute inset-0 top-[120px] mx-auto flex max-w-7xl flex-row items-start gap-5">
        <div>
          <h1 className="mt-2 mb-7 font-black text-7xl">
            Hi, I'm <span className="text-sky-400">SeoulSKY</span>
          </h1>
          <TextType
            text={[
              "I'm a recent graduate with a major of Honours in Software Engineering and a minor in Applied Mathematics",
              "I'm a recent graduate with a major of Honours in Software Engineering and a minor in Applied Mathematics",
            ]}
            className="mt-2 font-medium text-3xl text-neutral-100"
            typingSpeed={20}
            deletingSpeed={0}
          />
        </div>
      </div>

      <div className="absolute bottom-32 xs:bottom-10 flex w-full items-center justify-center">
        <div className="flex h-[64px] w-[35px] items-start justify-center rounded-3xl border-4 border-muted-foreground p-2">
          <motion.div
            animate={{
              y: [0, 24, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
            }}
            className="mb-1 h-3 w-3 rounded-full bg-muted-foreground"
          />
        </div>
      </div>
    </section>
  );
}
