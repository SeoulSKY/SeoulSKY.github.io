import { motion } from "framer-motion";

import { padding } from "../styles.js";
import { staggerContainer } from "../utils/motion";


export default function SectionWrapper(Component: () => JSX.Element, idName: string): () => JSX.Element {
  return (() =>
    <motion.section
      variants={staggerContainer()}
      initial='hidden'
      whileInView='show'
      viewport={{ once: true, amount: 0.25 }}
      className={`${padding} max-w-7xl mx-auto relative z-0`}
    >
      <span className='hash-span' id={idName}>
        &nbsp;
      </span>

      <Component />
    </motion.section>
  );
}
