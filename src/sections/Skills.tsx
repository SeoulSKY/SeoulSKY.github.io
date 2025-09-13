import { motion } from "motion/react";
import Section from "@/components/Section";
import { staggerContainer, zoomIn } from "@/utils/motion";
import aws from "@/assets/skill-icons/AWS-Dark.svg";
import bash from "@/assets/skill-icons/Bash-Dark.svg";
import c from "@/assets/skill-icons/C.svg";
import cloudflare from "@/assets/skill-icons/Cloudflare-Dark.svg";
import cs from "@/assets/skill-icons/CS.svg";
import css from "@/assets/skill-icons/CSS.svg";
import django from "@/assets/skill-icons/Django.svg";
import docker from "@/assets/skill-icons/Docker.svg";
import expressJs from "@/assets/skill-icons/ExpressJS-Dark.svg";
import fastAPI from "@/assets/skill-icons/FastAPI.svg";
import flask from "@/assets/skill-icons/Flask-Dark.svg";
import git from "@/assets/skill-icons/Git.svg";
import github from "@/assets/skill-icons/GitHub-Dark.svg";
import githubActions from "@/assets/skill-icons/GitHubActions-Dark.svg";
import gitlab from "@/assets/skill-icons/GitLab-Dark.svg";
import go from "@/assets/skill-icons/GoLang.svg";
import html from "@/assets/skill-icons/HTML.svg";
import java from "@/assets/skill-icons/Java-Dark.svg";
import javascript from "@/assets/skill-icons/JavaScript.svg";
import linux from "@/assets/skill-icons/Linux-Dark.svg";
import mongodb from "@/assets/skill-icons/MongoDB.svg";
import nestjs from "@/assets/skill-icons/NestJS-Dark.svg";
import nextjs from "@/assets/skill-icons/NextJS-Dark.svg";
import nginx from "@/assets/skill-icons/Nginx.svg";
import postgreSQL from "@/assets/skill-icons/PostgreSQL-Dark.svg";
import postman from "@/assets/skill-icons/Postman.svg";
import python from "@/assets/skill-icons/Python-Dark.svg";
import react from "@/assets/skill-icons/React-Dark.svg";
import rust from "@/assets/skill-icons/Rust.svg";
import scala from "@/assets/skill-icons/Scala-Dark.svg";
import sentry from "@/assets/skill-icons/Sentry.svg";
import tailwindcss from "@/assets/skill-icons/TailwindCSS-Dark.svg";
import tauri from "@/assets/skill-icons/Tauri-Dark.svg";
import typescript from "@/assets/skill-icons/Typescript.svg";
import ubuntu from "@/assets/skill-icons/Ubuntu-Dark.svg";
import unity from "@/assets/skill-icons/Unity-Dark.svg";
import vercel from "@/assets/skill-icons/Vercel-Dark.svg";
import vite from "@/assets/skill-icons/Vite-Dark.svg";

const skills: string[] = [
  aws,
  bash,
  c,
  cloudflare,
  cs,
  css,
  django,
  docker,
  expressJs,
  fastAPI,
  flask,
  git,
  github,
  githubActions,
  gitlab,
  go,
  html,
  java,
  javascript,
  linux,
  mongodb,
  nestjs,
  nextjs,
  nginx,
  postgreSQL,
  postman,
  python,
  react,
  rust,
  scala,
  sentry,
  tailwindcss,
  tauri,
  typescript,
  ubuntu,
  unity,
  vercel,
  vite,
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
              src={tech}
              alt={tech}
              {...zoomIn(0.1, "tween", true)}
            />
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
