import Tilt from "react-parallax-tilt";
import Atropos from "atropos/react";
import { motion } from "framer-motion";

import Section from "../components/Section";
import { fadeIn, staggerContainer } from "../utils/motion";
import backend from "../assets/backend.png";
import devops from "../assets/devops.png";
import frontend from "../assets/frontend.png";
import game from "../assets/game.png";
import React from "react";

interface Service {
  title: string;
  icon: string;
}

const services: Service[] = [
  {
    title: "Backend Developer",
    icon: backend,
  },
  {
    title: "Web Developer",
    icon: frontend,
  },
  {
    title: "DevOps Developer",
    icon: devops,
  },
  {
    title: "Game Developer",
    icon: game,
  },
];

function ServiceCard({ title, icon }: Service) {
  return (
    <Tilt className="w-full xs:w-[250px]">
      <motion.div
        {...fadeIn(0.75, "right", "spring", undefined, true)}
        className="green-blue-gradient w-full rounded-[20px] p-[1px] shadow-card"
      >
        <Atropos shadow={false}>
          <div
            className="flex min-h-[280px] flex-col items-center justify-evenly px-12 py-5"
            data-atropos-offset="-10"
          >
            <img src={icon} alt={title} className="h-16 w-16" />

            <h3 className="text-center text-[20px] font-bold text-white">
              {title}
            </h3>
          </div>
        </Atropos>
      </motion.div>
    </Tilt>
  );
}

export default function Introduction() {
  return (
    <Section id={"introduction"} title={"Introduction"} subTitle={"Who I am"}>
      <motion.p
        {...fadeIn(1)}
        className="mt-4 max-w-3xl text-[17px] leading-[30px] text-secondary"
      >
        I am a software developer experienced in Python, C#, Rust, TypeScript,
        and JavaScript, with expertise in frameworks such as React.js, React
        Native, and Unity3D. I enjoy building scalable, intuitive solutions that
        address practical challenges. With a collaborative mindset and a knack
        for learning quickly, I can help bring your ideas to fruition. Let’s
        team up to make your vision a reality!
      </motion.p>

      <motion.div
        {...staggerContainer(0.25)}
        className="mt-20 flex flex-wrap gap-10"
      >
        {services.map((service) => (
          <ServiceCard key={service.title} {...service} />
        ))}
      </motion.div>
    </Section>
  );
}
