import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { sectionHeadText, sectionSubText } from "../styles";
import SectionWrapper from "../components/SectionWrapper";
import { fadeIn, textVariant } from "../utils/motion";

import memorymate from "../assets/memorymate.gif";
import desdemona from "../assets/desdemona.gif";
import gochat from "../assets/gochat.png";
import sorusora from "../assets/sorusora.gif";
import chessai from "../assets/chessai.gif";
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
    description:
      "Connect with our empathetic AI companion tailored for those with dementia, offering friendly " +
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
    description:
      "Engage in a game of Othello against a powerful AI opponent, Desdemona, and explore the intriguing " +
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
    name: "GoChat",
    description:
      "Experience a real-time chat web platform powered by WebSocket, Go, React, and MongoDB. " +
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
        name: "tailwindcss",
        color: "pink-text-gradient",
      },
    ],
    image: gochat,
    sourceCodeLink: "https://github.com/SeoulSKY/go-chat",
    playLink: "https://gochat.seoulsky.org",
  },
  {
    name: "SoruSora",
    description:
      "Engage in lifelike AI chats, translate messages into 25 languages simultaneously, and convert " +
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
  {
    name: "Chess AI",
    description:
      "Experience the ultimate in strategic gaming with our customizable chess AI. " +
      "Play on the web with dynamic difficulty adjustments and personalized settings, perfect for beginners and " +
      "grandmasters alike. Enhance your skills and enjoy endless strategic fun.",
    tags: [
      {
        name: "Java",
        color: "blue-text-gradient",
      },
      {
        name: "React.js",
        color: "green-text-gradient",
      },
      {
        name: "CSS",
        color: "pink-text-gradient",
      },
    ],
    image: chessai,
    sourceCodeLink: "https://github.com/SeoulSKY/ChessAI",
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
      className="black-gradient flex h-10 w-10 cursor-pointer items-center justify-center rounded-full"
      whileHover={{ scale: 1.1 }}
    >
      <img src={icon} alt="link" className="h-1/2 w-1/2 object-contain" />
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
    <motion.div key={name} variants={fadeIn(index * 0.5, 0.75, "up", "spring")}>
      <Tilt className="w-full rounded-2xl bg-blue-950 p-5 sm:w-[360px]">
        <div className="relative aspect-video w-full">
          <img
            src={image}
            alt="project_image"
            className="h-full w-full rounded-2xl object-cover"
          />

          <div className="card-img_hover absolute inset-0 m-3 flex justify-end space-x-1">
            {sourceCodeLink && <LinkIcon link={sourceCodeLink} icon={github} />}
            {playLink && <LinkIcon link={playLink} icon={play} />}
          </div>
        </div>

        <div className="mt-5">
          <h3 className="text-[24px] font-bold text-white">{name}</h3>
          <p className="mt-2 text-[14px] text-secondary">{description}</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map(({ name, color }) => (
            <p key={name} className={`text-[14px] ${color}`}>
              #{name}
            </p>
          ))}
        </div>
      </Tilt>
    </motion.div>
  );
}

function Projects() {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={sectionSubText}>My work</p>
        <h2 className={sectionHeadText}>Projects</h2>
      </motion.div>

      <div className="flex w-full">
        <motion.p
          variants={fadeIn(0.1, 1)}
          className="mt-3 max-w-3xl text-[17px] leading-[30px] text-secondary"
        >
          Delve into my personal software development journey, where I've
          embarked on a range of diverse projects, always striving to deliver
          top-notch solutions. Explore in detail my approaches to overcoming
          various challenges in the field.
        </motion.p>
      </div>

      <div className="mt-20 flex flex-wrap gap-7">
        {projects.map((project, index) => (
          <ProjectCard key={project.name} index={index} {...project} />
        ))}
      </div>
    </>
  );
}

export default SectionWrapper(Projects);
