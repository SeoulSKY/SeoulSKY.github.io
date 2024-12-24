import SectionWrapper from "../components/SectionWrapper";
import { motion } from "framer-motion";
import TitleProvider from "../components/TitleProvider";

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

function Skills() {
  return (
    <TitleProvider
      className={"text-center"}
      title={"Skills"}
      subTitle={"What I am capable of"}
    >
      <div className="mt-20 flex flex-row flex-wrap justify-center gap-10">
        {skills.map((tech, index) => (
          <motion.div
            key={`tech-${index}`}
            className="h-20 w-20"
            animate={{
              x: randomFrames(),
              y: randomFrames(),
              transition: {
                type: "string",
                duration: NUM_FRAMES * 2,
                repeat: Infinity,
                repeatType: "reverse",
                delay: Math.random(),
              },
            }}
            whileHover={{ scale: 1.1, rotate: 20 }}
          >
            <motion.img
              key={`tech-${index}`}
              className={"h-full w-full"}
              src={`https://skillicons.dev/icons?i=${tech}`}
              alt={tech}
              initial={{ scale: 0 }}
              animate={{
                scale: 1,
                transition: { type: "spring", delay: index * 0.05 },
              }}
            />
          </motion.div>
        ))}
      </div>
    </TitleProvider>
  );
}

export default SectionWrapper(Skills);
