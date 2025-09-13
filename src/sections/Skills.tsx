import { motion } from "motion/react";
import Section from "../components/Section";
import { staggerContainer, zoomIn } from "../utils/motion";

const skills: string[] = [
  "ae",
  "apple",
  "aws",
  "bash",
  "bootstrap",
  "c",
  "cs",
  "cloudflare",
  "css",
  "discord",
  "docker",
  "express",
  "fastapi",
  "figma",
  "firebase",
  "flask",
  "gcp",
  "git",
  "github",
  "githubactions",
  "go",
  "html",
  "idea",
  "java",
  "js",
  "jest",
  "latex",
  "linux",
  "matlab",
  "mongodb",
  "mysql",
  "nextjs",
  "nginx",
  "nodejs",
  "ps",
  "postgres",
  "postman",
  "pr",
  "py",
  "raspberrypi",
  "react",
  "rust",
  "scala",
  "tailwind",
  "ts",
  "unity",
  "vite",
  "vscode",
  "windows",
];

const NUM_FRAMES = 50;
const MIN_MOVE = -10;
const MAX_MOVE = 10;

function randomFrames(): number[] {
  return Array.from(
    { length: NUM_FRAMES },
    () => Math.random() * (MAX_MOVE - MIN_MOVE) + MIN_MOVE,
  );
}

export default function Skills() {
  return (
    // biome-ignore lint/correctness/useUniqueElementIds: Used for navigation
    <Section id="skills" className="text-center" title="Skills">
      <motion.div
        {...staggerContainer(0.02)}
        className="mt-20 flex flex-row flex-wrap justify-center gap-10"
      >
        {skills.map((tech) => (
          <motion.div
            key={tech}
            className="size-20 cursor-target"
            animate={{
              x: randomFrames(),
              y: randomFrames(),
              transition: {
                type: "tween",
                duration: NUM_FRAMES * 2,
                repeat: Infinity,
                repeatType: "reverse",
                delay: Math.random(),
              },
            }}
          >
            <motion.img
              key={tech}
              className="h-full w-full duration-300 hover:rotate-12 hover:scale-110"
              src={`https://skillicons.dev/icons?i=${tech}`}
              alt={tech}
              {...zoomIn(0.1, "tween", true)}
            />
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
