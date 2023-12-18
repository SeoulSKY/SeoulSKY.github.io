import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { github, play } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

const LinkIcon = ({ link, icon }) => {
  return (
    <motion.div
      onClick={() => window.open(link, "_blank")}
      className='black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer'
      whileHover={{ scale: 1.1 }}
    >
      <img
        src={icon}
        alt='link'
        className='w-1/2 h-1/2 object-contain'
      />
    </motion.div>
  )
}

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
  play_link,
}) => {
  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className='bg-blue-950 p-5 rounded-2xl sm:w-[360px] w-full'
      >
        <div className='relative w-full h-[230px]'>
          <img
            src={image}
            alt='project_image'
            className='w-full h-full object-cover rounded-2xl'
          />

          <div className='space-x-1 absolute inset-0 flex justify-end m-3 card-img_hover'>
            <LinkIcon link={source_code_link} icon={github} />
            {play_link && <LinkIcon link={play_link} icon={play} />}
          </div>
        </div>

        <div className='mt-5'>
          <h3 className='text-white font-bold text-[24px]'>{name}</h3>
          <p className='mt-2 text-secondary text-[14px]'>{description}</p>
        </div>

        <div className='mt-4 flex flex-wrap gap-2'>
          {tags.map((tag) => (
            <p
              key={`${name}-${tag.name}`}
              className={`text-[14px] ${tag.color}`}
            >
              #{tag.name}
            </p>
          ))}
        </div>
      </Tilt>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} `}>My work</p>
        <h2 className={`${styles.sectionHeadText}`}>Projects</h2>
      </motion.div>

      <div className='w-full flex'>
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className='mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]'
        >
          Delve into my personal software development journey, where I've embarked on a range of diverse projects, always striving to deliver top-notch solutions.
           Explore in detail my approaches to overcoming various challenges in the field.
        </motion.p>
      </div>

      <div className='mt-20 flex flex-wrap gap-7'>
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Projects, "project");
