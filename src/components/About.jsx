import React from "react";
import Tilt from "react-parallax-tilt";
import Atropos from 'atropos/react';
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const ServiceCard = ({ index, title, icon }) => (
  <Tilt
    className='xs:w-[250px] w-full'
  >
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className='w-full green-blue-gradient p-[1px] rounded-[20px] shadow-card'
    >
      <Atropos duration={100}>
        <div
          options={{
            max: 45,
            scale: 1,
            speed: 450,
          }}
          className='bg-blue-950 rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'
          data-atropos-offset="-10"
        >
          <img
            src={icon}
            alt='web-development'
            className='w-16 h-16 object-contain'
          />

          <h3 className='text-white text-[20px] font-bold text-center'>
            {title}
          </h3>
        </div>
      </Atropos>
    </motion.div>
  </Tilt>
);

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'
      >
        I'm a skilled software developer with experience in Python, C#, Rust, TypeScript and JavaScript, specializing in frameworks like React.js, Node.js and Unity3D.
        My passion lies in creating efficient, scalable, and user-friendly solutions that tackle real-world problems.
        I thrive on collaboration and quick learning, making me your ideal partner to bring your ideas to life.
        Let's work together to turn your vision into reality!
      </motion.p>

      <div className='mt-20 flex flex-wrap gap-10'>
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
