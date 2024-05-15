import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { sectionHeadText, sectionSubText } from "../styles";
import { github, play } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

interface LinkIconProps {
  link: string;
  icon: string;
}

function LinkIcon({ link, icon }: LinkIconProps) {
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
  );
}

interface ProjectCardProps {
  index: number;
  name: string;
  description: string;
  tags: { name: string; color: string }[];
  image: string;
  sourceCodeLink?: string;
  playLink?: string;

}

function ProjectCard({
  index,
  name,
  description,
  tags,
  image,
  sourceCodeLink,
  playLink,
}: ProjectCardProps) {
  return (
    <motion.div variants={fadeIn(index * 0.5, 0.75, "up", "spring")}>
      <Tilt
        // options={{
        //   max: 45,
        //   scale: 1,
        //   speed: 450,
        // }}
        className='bg-blue-950 p-5 rounded-2xl sm:w-[360px] w-full'
      >
        <div className='relative w-full aspect-video'>
          <img
            src={image}
            alt='project_image'
            className='w-full h-full object-cover rounded-2xl'
          />

          <div className='space-x-1 absolute inset-0 flex justify-end m-3 card-img_hover'>
            {sourceCodeLink && <LinkIcon link={sourceCodeLink} icon={github} />}
            {playLink && <LinkIcon link={playLink} icon={play} />}
          </div>
        </div>

        <div className='mt-5'>
          <h3 className='text-white font-bold text-[24px]'>{name}</h3>
          <p className='mt-2 text-secondary text-[14px]'>{description}</p>
        </div>

        <div className='mt-4 flex flex-wrap gap-2'>
          {tags.map(({name, color}) => (
            <p
              key={`${name}-${name}`}
              className={`text-[14px] ${color}`}
            >
              #{name}
            </p>
          ))}
        </div>
      </Tilt>
    </motion.div>
  );
}

function Projects(){
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={sectionSubText}>My work</p>
        <h2 className={sectionHeadText}>Projects</h2>
      </motion.div>

      <div className='w-full flex'>
        <motion.p
          variants={fadeIn(0.1, 1)}
          className='mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]'
        >
          Delve into my personal software development journey, where I've embarked on a range of diverse projects, always striving to deliver top-notch solutions.
           Explore in detail my approaches to overcoming various challenges in the field.
        </motion.p>
      </div>

      <div className='mt-20 flex flex-wrap gap-7'>
        {projects.map((project, index) => (
          <ProjectCard index={index} {...project} />
        ))}
      </div>
    </>
  );
}

export default SectionWrapper(Projects, "project");
