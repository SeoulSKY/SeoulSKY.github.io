import { motion } from "framer-motion";

import { fadeIn } from "../utils/motion";
import { ReactNode } from "react";
import { cn } from "../utils";

interface SectionProps {
  id: string;
  className?: string;
  title: string;
  titleClassName?: string;
  subTitle: string;
  subTitleClassName?: string;
  children: ReactNode;
}

export default function Section({
  id,
  className,
  title,
  titleClassName,
  subTitle,
  subTitleClassName,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={"container relative z-0 mx-auto max-w-7xl scroll-mt-7"}
    >
      <motion.div {...fadeIn(1.25, "down", "spring", 50)} className={className}>
        <p
          className={cn(
            "text-[14px] uppercase tracking-wider text-secondary sm:text-[18px]",
            subTitleClassName,
          )}
        >
          {subTitle}
        </p>
        <h2
          className={cn(
            "text-[30px] font-black text-white xs:text-[40px] sm:text-[50px] md:text-[60px]",
            titleClassName,
          )}
        >
          {title}
        </h2>
      </motion.div>
      {children}
    </section>
  );
}
