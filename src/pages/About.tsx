import Tilt from "react-parallax-tilt";
import Atropos from "atropos/react";
import { motion } from "framer-motion";

import { sectionHeadText, sectionSubText } from "../styles";
import SectionWrapper from "../components/SectionWrapper";
import { fadeIn, textVariant } from "../utils/motion";
import backend from "../assets/backend.png";
import devops from "../assets/devops.png";
import frontend from "../assets/frontend.png";
import game from "../assets/game.png";

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

interface ServiceCardProps extends Service {
  index: number;
}


function ServiceCard({ index, title, icon }: ServiceCardProps) {
  return (
    <Tilt className="xs:w-[250px] w-full">
      <motion.div
        variants={fadeIn(index * 0.5, 0.75, "right", "spring")}
        className="w-full green-blue-gradient p-[1px] rounded-[20px] shadow-card"
      >
        <Atropos shadow={false}>
          <div
            className="py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col"
            data-atropos-offset="-10"
          >
            <img
              src={icon}
              alt={title}
              className="w-16 h-16"
            />

            <h3 className="text-white text-[20px] font-bold text-center">
              {title}
            </h3>
          </div>
        </Atropos>
      </motion.div>
    </Tilt>
  );
}

function About(){
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={sectionSubText}>Introduction</p>
        <h2 className={sectionHeadText}>Overview</h2>
      </motion.div>

      <motion.p
        variants={fadeIn(0.1, 1)}
        className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
      >
        I'm a skilled software developer with experience in Python, C#, Rust, TypeScript and JavaScript, specializing
        in frameworks like React.js, React Native and Unity3D.
        My passion lies in creating efficient, scalable, and user-friendly solutions that tackle real-world problems.
        I thrive on collaboration and quick learning, making me your ideal partner to bring your ideas to life.
        Let's work together to turn your vision into reality!
      </motion.p>

      <div className="mt-20 flex flex-wrap gap-10">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
}

export default SectionWrapper(About);
