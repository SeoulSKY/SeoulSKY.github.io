import { motion } from "framer-motion";

import { staggerContainer } from "../utils/motion";

export default function SectionWrapper(
  Element: () => JSX.Element,
): () => JSX.Element {
  function Wrapper() {
    return (
      <motion.section
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className={"container relative z-0 mx-auto max-w-7xl"}
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
