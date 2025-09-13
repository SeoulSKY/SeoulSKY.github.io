import { motion } from "motion/react";

import Section from "@/components/Section";
import { fadeIn, staggerContainer } from "@/utils/motion";
import PixelCard from "@/components/PixelCard";
import { Server, AppWindow, Workflow, type LucideIcon } from "lucide-react";

interface Service {
  title: string;
  Icon: LucideIcon;
}

const services: Service[] = [
  {
    title: "Back End Engineer",
    Icon: Server,
  },
  {
    title: "Front End Engineer",
    Icon: AppWindow,
  },
  {
    title: "DevOps Engineer",
    Icon: Workflow,
  },
  {
    title: "Application Engineer",
    Icon: AppWindow,
  },
];

function ServiceCard({ title, Icon }: Service) {
  return (
    <motion.div
      className="cursor-target"
      {...fadeIn(0.75, "right", "tween", undefined, true)}
    >
      <PixelCard className="h-80 w-auto" variant="blue">
        <div className="absolute flex flex-col items-center gap-10 p-2">
          <Icon className="size-12" />

          <h3 className="text-center font-bold text-white text-xl">{title}</h3>
        </div>
      </PixelCard>
    </motion.div>
  );
}

export default function Introduction() {
  return (
    // biome-ignore lint/correctness/useUniqueElementIds: Used for navigation
    <Section id="introduction" title="Introduction">
      <motion.p {...fadeIn(1)} className="mt-4 max-w-3xl text-lg leading-8">
        I am a software engineer experienced in Python, Rust and TypeScript with
        expertise in frameworks such as React.js, Next.js and Tauri. I enjoy
        building scalable, intuitive solutions that address practical
        challenges. With a collaborative mindset and a knack for learning
        quickly, I can help bring your ideas to fruition. Let’s team up to make
        your vision a reality!
      </motion.p>

      <motion.div
        {...staggerContainer(0.25)}
        className="mt-20 flex flex-wrap items-center gap-10"
      >
        {services.map((service) => (
          <ServiceCard key={service.title} {...service} />
        ))}
      </motion.div>
    </Section>
  );
}
