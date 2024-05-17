import { motion } from "framer-motion";

import { padding } from "../styles";
import { staggerContainer } from "../utils/motion";


export default function SectionWrapper(Element: () => JSX.Element): () => JSX.Element {
  function Wrapper() {
    return (
      <motion.section
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className={`${padding} max-w-7xl mx-auto relative z-0`}
      >
        <span className="hash-span" id={Element.name.toLowerCase()}>
          &nbsp;
        </span>

        <Element />
      </motion.section>
    );
  }


  Object.defineProperty(Wrapper, "name", { value: Element.name });

  return Wrapper;
}
