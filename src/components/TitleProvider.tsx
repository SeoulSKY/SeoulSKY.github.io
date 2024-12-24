import { motion, useInView } from "framer-motion";
import { textVariant } from "../utils/motion";
import { ReactNode, useRef } from "react";
import { cn } from "../utils";

interface TitleProps {
  className?: string;
  title: string;
  titleClassName?: string;
  subTitle: string;
  subTitleClassName?: string;
  children: ReactNode;
}

export default function TitleProvider({
  className,
  title,
  titleClassName,
  subTitle,
  subTitleClassName,
  children,
}: TitleProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <>
      <motion.div ref={ref} variants={textVariant()} className={className}>
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
      {isInView && children}
    </>
  );
}
