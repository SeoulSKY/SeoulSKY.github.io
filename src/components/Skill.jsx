import { React, useRef } from "react";
import {
  AfterEffects,
  Bash_Dark,
  C,
  CS,
  CSS,
  Cloudflare_Dark,
  Discord,
  Docker,
  ExpressJS_Dark,
  Figma_Dark,
  Firebase_Dark,
  Flask_Dark,
  Git,
  GithubActions_Dark,
  Github_Dark,
  HTML,
  JavaScript,
  Java_Dark,
  LaTeX_Dark,
  Linux_Dark,
  Markdown_Dark,
  Matlab_Dark,
  MySQL_Dark,
  Nginx,
  NodeJS_Dark,
  Photoshop,
  PostgreSQL_Dark,
  Postman,
  Premiere,
  Python_Dark,
  React_Dark,
  Rocket,
  Rust,
  Scala_Dark,
  TailwindCSS_Dark,
  TypeScript,
  Unity_Dark,
  VSCode_Dark,
} from "react-skillicons";

import { SectionWrapper } from "../hoc";
import { motion, useInView } from "framer-motion";
import { styles } from "../styles";
import { textVariant } from "../utils/motion";

const techs = [
  <AfterEffects />,
  <Bash_Dark />,
  <C />,
  <CS />,
  <CSS />,
  <Cloudflare_Dark />,
  <Discord />,
  <Docker />,
  <ExpressJS_Dark />,
  <Figma_Dark />,
  <Firebase_Dark />,
  <Flask_Dark />,
  <Git />,
  <GithubActions_Dark />,
  <Github_Dark />,
  <HTML />,
  <JavaScript />,
  <Java_Dark />,
  <LaTeX_Dark />,
  <Linux_Dark />,
  <Markdown_Dark />,
  <Matlab_Dark />,
  <MySQL_Dark />,
  <Nginx />,
  <NodeJS_Dark />,
  <Photoshop />,
  <PostgreSQL_Dark />,
  <Postman />,
  <Premiere />,
  <Python_Dark />,
  <React_Dark />,
  <Rocket />,
  <Rust />,
  <Scala_Dark />,
  <TailwindCSS_Dark />,
  <TypeScript />,
  <Unity_Dark />,
  <VSCode_Dark />,
]

const Skill = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true});

  return (
    <>
      <motion.div ref={ref} variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>
          What I am capable of
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          Skills
        </h2>
      </motion.div>

      {isInView && <div className='mt-20 flex flex-row flex-wrap justify-center gap-10'>
        {techs.map((tech, index) => (
          <motion.div
            key={`tech-${index}`}
            className='w-20 h-20'
            initial={{ scale: 0 }}
            animate={{ scale: 1, transition: { type: "spring", delay: index * 0.05 } }}
          >
            {tech}
          </motion.div>
        ))}
      </div>}
    </>
  );
};

export default SectionWrapper(Skill, "skill");
