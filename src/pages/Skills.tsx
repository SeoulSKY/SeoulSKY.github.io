import { useRef } from "react";

import SectionWrapper from "../components/SectionWrapper";
import { motion, useInView } from "framer-motion";
import { sectionHeadText, sectionSubText } from "../styles";
import { textVariant } from "../utils/motion";

const skills: string[] = [
  "ae",
  "apple",
  "bash",
  "c",
  "cs",
  "cloudflare",
  "css",
  "discord",
  "docker",
  "express",
  "figma",
  "firebase",
  "flask",
  "gcp",
  "git",
  "github",
  "githubactions",
  "html",
  "idea",
  "java",
  "js",
  "latex",
  "linux",
  "matlab",
  "mongodb",
  "mysql",
  "nginx",
  "nodejs",
  "ps",
  "postgres",
  "postman",
  "pr",
  "py",
  "react",
  "rust",
  "scala",
  "tailwind",
  "ts",
  "unity",
  "vscode",
  "windows",
];

const NUM_FRAMES = 50;
const MIN_MOVE = -10;
const MAX_MOVE = 10;

function randomFrames(): number[] {
  return Array.from({ length: NUM_FRAMES }, () => Math.random() * (MAX_MOVE - MIN_MOVE) + MIN_MOVE);
}

function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true});

  return (
    <>
      <motion.div ref={ref} variants={textVariant()}>
        <p className={`${sectionSubText} text-center`}>
          What I am capable of
        </p>
        <h2 className={`${sectionHeadText} text-center`}>
          Skills
        </h2>
      </motion.div>

      {isInView && <div className="mt-20 flex flex-row flex-wrap justify-center gap-10">
        {skills.map((tech, index) => (
          <motion.div
            key={`tech-${index}`}
            className="w-20 h-20"
            animate={{
              x: randomFrames(),
              y: randomFrames(),
              transition: {
                type: "string",
                duration: NUM_FRAMES * 2,
                repeat: Infinity,
                repeatType: "reverse",
                delay: Math.random()
              }
            }}
            whileHover={{ scale: 1.1, rotate: 20 }}
          >
            <motion.img
              key={`tech-${index}`}
              className={"w-full h-full"}
              src={`https://skillicons.dev/icons?i=${tech}`}
              alt={tech}
              initial={{ scale: 0 }}
              animate={{ scale: 1, transition: { type: "spring", delay: index * 0.05 } }}
            />
          </motion.div>
        ))}
      </div>}
    </>
  );
}

export default SectionWrapper(Skills, Skills.name.toLowerCase());
