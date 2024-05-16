import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { sectionHeadText, sectionSubText } from "../styles";
import SectionWrapper from "../components/SectionWrapper";
import { fadeIn, textVariant } from "../utils/motion";

import memorymate from "../assets/memorymate.gif";
import desdemona from "../assets/desdemona.gif";
import gochat from "../assets/gochat.png";
import sorusora from "../assets/sorusora.gif";
import github from "../assets/github.png";
import play from "../assets/play.png";

interface Project {
  name: string;
  description: string;
  tags: { name: string; color: string }[];
  image: string;
  sourceCodeLink?: string;
  playLink?: string;
}

const projects: Project[] = [
  {
    name: "Memory Mate",
    description: "Connect with our empathetic AI companion tailored for those with dementia, offering friendly " +
      "conversations and engaging personalized brain games to enhance cognitive abilities.",
    tags: [
      {
        name: "React Native",
        color: "blue-text-gradient",
      },
      {
        name: "Gemini AI",
        color: "green-text-gradient",
      },
      {
        name: "TypeScript",
        color: "pink-text-gradient",
      },
    ],
    image: memorymate,
    sourceCodeLink: "https://github.com/SeoulSKY/MemoryMate",
  },
  {
    name: "Desdemona",
    description: "Engage in a game of Othello against a powerful AI opponent, Desdemona, and explore the intriguing " +
      "environment surrounding you, and discover what lies inside various buildings.",
    tags: [
      {
        name: "Rust",
        color: "blue-text-gradient",
      },
      {
        name: "Unity3D",
        color: "green-text-gradient",
      },
      {
        name: "Node.js",
        color: "pink-text-gradient",
      },
    ],
    image: desdemona,
    sourceCodeLink: "https://github.com/SeoulSKY/Desdemona",
    playLink: "https://desdemona.seoulsky.org",
  },
  {
    name: "Go Chat",
    description: "Experience a real-time chat web application powered by WebSocket, Docker, Go, React, and MongoDB. " +
      "Engage in instant communication and uncover the technical prowess behind this project.",
    tags: [
      {
        name: "Go",
        color: "blue-text-gradient",
      },
      {
        name: "React.js",
        color: "green-text-gradient",
      },
      {
        name: "Docker",
        color: "pink-text-gradient",
      },
    ],
    image: gochat,
    sourceCodeLink: "https://github.com/SeoulSKY/go-chat",
  },
  {
    name: "SoruSora",
    description: "Engage in lifelike AI chats, translate messages into 25 languages simultaneously, and convert " +
      "videos to text. Explore innovative features for enhanced communication and content sharing.",
    tags: [
      {
        name: "Python",
        color: "blue-text-gradient",
      },
      {
        name: "MongoDB",
        color: "green-text-gradient",
      },
      {
        name: "Docker",
        color: "pink-text-gradient",
      },
    ],
    image: sorusora,
    sourceCodeLink: "https://github.com/SeoulSKY/SoruSora",
    playLink: "https://sorusora.seoulsky.org",
  },
];


interface LinkIconProps {
  link: string;
  icon: string;
}

function LinkIcon({ link, icon }: LinkIconProps) {
  return (
    <motion.div
      onClick={() => window.open(link, "_blank")}
      className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
      whileHover={{ scale: 1.1 }}
    >
      <img
        src={icon}
        alt="link"
        className="w-1/2 h-1/2 object-contain"
      />
    </motion.div>
  );
}

interface ProjectCardProps extends Project {
  index: number;
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
        className="bg-blue-950 p-5 rounded-2xl sm:w-[360px] w-full"
      >
        <div className="relative w-full aspect-video">
          <img
            src={image}
            alt="project_image"
            className="w-full h-full object-cover rounded-2xl"
          />

          <div className="space-x-1 absolute inset-0 flex justify-end m-3 card-img_hover">
            {sourceCodeLink && <LinkIcon link={sourceCodeLink} icon={github} />}
            {playLink && <LinkIcon link={playLink} icon={play} />}
          </div>
        </div>

        <div className="mt-5">
          <h3 className="text-white font-bold text-[24px]">{name}</h3>
          <p className="mt-2 text-secondary text-[14px]">{description}</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
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

      <div className="w-full flex">
        <motion.p
          variants={fadeIn(0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          Delve into my personal software development journey, where I've embarked on a range of diverse projects,
          always striving to deliver top-notch solutions. Explore in detail my approaches to overcoming various
          challenges in the field.
        </motion.p>
      </div>

      <div className="mt-20 flex flex-wrap gap-7">
        {projects.map((project, index) => (
          <ProjectCard index={index} {...project} />
        ))}
      </div>
    </>
  );
}

export default SectionWrapper(Projects, Projects.name.toLowerCase());
