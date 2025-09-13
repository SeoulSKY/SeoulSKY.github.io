import { motion } from "motion/react";
import chessai from "@/assets/chessai.gif";
import desdemona from "@/assets/desdemona.gif";
import github from "@/assets/github.png";
import gochat from "@/assets/gochat.png";
import memorymate from "@/assets/memorymate.gif";
import play from "@/assets/play.png";
import sorusora from "@/assets/sorusora.gif";
import Section from "@/components/Section";
import { CometCard } from "@/components/ui/comet-card";
import { fadeIn, staggerContainer } from "@/utils/motion";

interface Project {
  title: string;
  subTitle: string;
  description: string;
  tags: string[];
  image: string;
  sourceCodeLink?: string;
  playLink?: string;
}

const projects: Project[] = [
  {
    title: "Memory Mate",
    subTitle: "AI-Powered Dementia Treatment Platform",
    description:
      "Connect with our empathetic AI companion tailored for those with dementia, offering friendly conversations and engaging personalized brain games to enhance cognitive abilities.",
    tags: ["React Native", "TypeScript", "Gemini AI"],
    image: memorymate,
    sourceCodeLink: "https://github.com/SeoulSKY/MemoryMate",
  },
  {
    title: "Desdemona",
    subTitle: "Powerful Othello AI",
    description:
      "Engage in a game of Othello against a powerful AI opponent, Desdemona, and explore the intriguing environment surrounding you, and discover what lies inside various buildings.",
    tags: ["Rust", "Unity3D", "Node.js"],
    image: desdemona,
    sourceCodeLink: "https://github.com/SeoulSKY/Desdemona",
    playLink: "https://desdemona.seoulsky.dev",
  },
  {
    title: "GoChat",
    subTitle: "Real-Time Chat Web Platform",
    description:
      "Experience a real-time chat web platform powered by WebSocket, Go, React, and MongoDB. Engage in instant communication and uncover the technical prowess behind this project.",
    tags: ["Go", "React.js", "tailwindcss"],
    image: gochat,
    sourceCodeLink: "https://github.com/SeoulSKY/go-chat",
    playLink: "https://gochat.seoulsky.dev",
  },
  {
    title: "SoruSora",
    subTitle: "Officially Verified AI-Powered Discord Bot",
    description:
      "SoruSora is an advanced, AI-driven Discord bot designed to enhance communication and collaboration within online communities. It enables natural, lifelike AI conversations and supports real-time translation across 45 languages. Now officially verified by Discord, SoruSora is trusted and actively used across 100+ servers worldwide.",
    tags: ["Python", "MongoDB", "Docker"],
    image: sorusora,
    sourceCodeLink: "https://github.com/SeoulSKY/SoruSora",
    playLink: "https://sorusora.seoulsky.dev",
  },
  {
    title: "Chess AI",
    subTitle: "Highly Customizable Chess AI",
    description:
      "Experience the ultimate in strategic gaming with our customizable chess AI Play on the web with dynamic difficulty adjustments and personalized settings, perfect for beginners and grandmasters alike. Enhance your skills and enjoy endless strategic fun.",
    tags: ["Java", "React.js", "CSS"],
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
    <a
      href={link}
      target="_blank"
      className="flex h-10 w-10 cursor-pointer cursor-target items-center justify-center rounded-full bg-black/70 hover:scale-110"
    >
      <img src={icon} alt="link" className="h-1/2 w-1/2 object-contain" />
    </a>
  );
}

export default function Projects() {
  return (
    // biome-ignore lint/correctness/useUniqueElementIds: Used for navigation
    <Section id="projects" title="Projects">
      <div className="flex w-full">
        <motion.p {...fadeIn(1)} className="mt-4 max-w-3xl text-lg leading-8">
          Discover my personal journey in software development, marked by a wide
          array of projects and a commitment to delivering high-quality
          solutions. Gain insight into how I approach and resolve different
          challenges within the field.
        </motion.p>
      </div>

      <motion.div
        {...staggerContainer(0.25)}
        className="mt-20 flex flex-wrap gap-7"
      >
        {projects.map(
          ({
            title,
            subTitle,
            description,
            tags,
            image,
            sourceCodeLink,
            playLink,
          }) => (
            <motion.div
              className="cursor-target"
              key={title}
              {...fadeIn(0.5, "up", "tween", 50, true)}
            >
              <CometCard>
                <div className="w-full rounded-2xl border border-muted-foreground/30 p-5 backdrop-blur-md sm:w-85">
                  <div className="relative aspect-video w-full">
                    <img
                      src={image}
                      alt="project thumbnail"
                      className="h-full w-full rounded-2xl object-cover"
                    />

                    <div className="absolute inset-0 m-3 flex justify-end space-x-1">
                      {sourceCodeLink && (
                        <LinkIcon link={sourceCodeLink} icon={github} />
                      )}
                      {playLink && <LinkIcon link={playLink} icon={play} />}
                    </div>
                  </div>

                  <div className="mt-5">
                    <h3 className="font-bold text-2xl text-white">{title}</h3>
                    <p className="text-muted-foreground">{subTitle}</p>
                    <p className="mt-4 text-sm">{description}</p>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-3">
                    {tags.map((tag) => (
                      <p key={tag} className="text-sm">
                        #{tag}
                      </p>
                    ))}
                  </div>
                </div>
              </CometCard>
            </motion.div>
          ),
        )}
      </motion.div>
    </Section>
  );
}
