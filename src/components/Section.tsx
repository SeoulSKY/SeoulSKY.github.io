import type { ReactNode } from "react";
import ScrollFloat from "./ScrollFloat";

interface SectionProps {
  id: string;
  className?: string;
  title: string;
  titleClassName?: string;
  children: ReactNode;
}

export default function Section({
  id,
  className,
  title,
  children,
}: SectionProps) {
  return (
    <section id={id} className="w-full scroll-mt-7">
      <ScrollFloat
        containerClassName={className}
        textClassName="font-black text-5xl"
        animationDuration={3}
      >
        {title}
      </ScrollFloat>
      {children}
    </section>
  );
}
