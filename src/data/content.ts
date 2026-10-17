/**
 * All site copy lives here, ported from the previous version of seoulsky.dev.
 */
import chessaiPoster from "@/assets/projects/chessai.jpg";
import chessaiVideo from "@/assets/projects/chessai.mp4";
import desdemonaPoster from "@/assets/projects/desdemona.jpg";
import desdemonaVideo from "@/assets/projects/desdemona.mp4";
import gochat from "@/assets/projects/gochat.jpg";
import memorymatePoster from "@/assets/projects/memorymate.jpg";
import memorymateVideo from "@/assets/projects/memorymate.mp4";
import sorusoraPoster from "@/assets/projects/sorusora.jpg";
import sorusoraVideo from "@/assets/projects/sorusora.mp4";
import ytnoti from "@/assets/projects/ytnoti.jpg";

export const GITHUB_URL = "https://github.com/SeoulSKY";

export const navSections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "awards", label: "Awards" },
  { id: "contact", label: "Contact" },
] as const;

export const KOREAN: Record<string, string> = {
  about: "소개",
  experience: "경력",
  skills: "기술",
  projects: "작품",
  awards: "수상",
  contact: "연락",
};

export const heroTaglines = [
  "Software Engineer creating innovative solutions for the healthcare industry.",
  "Graduate in Software Engineering Honours with a Minor in Applied Mathematics.",
];

export const introduction =
  "I am a software engineer experienced in Python, Rust and TypeScript with expertise in frameworks such as React.js, Next.js and Tauri. I enjoy building scalable, intuitive solutions that address practical challenges. With a collaborative mindset and a knack for learning quickly, I can help bring your ideas to fruition. Let’s team up to make your vision a reality!";

export type ServiceKey = "backend" | "frontend" | "devops" | "app";

export const services: { key: ServiceKey; title: string; blurb: string }[] = [
  {
    key: "backend",
    title: "Back End Engineer",
    blurb: "APIs, microservices and high-performance Rust modules.",
  },
  {
    key: "frontend",
    title: "Front End Engineer",
    blurb: "React, Next.js and interfaces that feel effortless.",
  },
  {
    key: "devops",
    title: "DevOps Engineer",
    blurb: "CI pipelines, containers and reliable deployments.",
  },
  {
    key: "app",
    title: "Application Developer",
    blurb: "Cross-platform desktop apps with Tauri and React.",
  },
];

/** The unbuilt station above the Experience line. */
export const nextStop = {
  title: "Your team,",
  accent: "maybe?",
  cta: "Let’s talk",
};

export interface Experience {
  title: string;
  company: string;
  date: string;
  points: string[];
}

export const experiences: Experience[] = [
  {
    title: "Software Engineer",
    company: "NutraMate",
    date: "Jan 2025 — Present",
    points: [
      "Led development of the company’s desktop application using Tauri and React.js, taking ownership of architectural decisions, front-end design and implementation, backend integration, testing, and deployment to deliver a high-quality end-user experience.",
      "Developed high-performance Rust backend module for CPU-intensive processing and low-level operations, including scanner integration through FFI and direct Windows API interaction.",
      "Drove key architectural and system design decisions, improving scalability, reliability, and performance across services operating under high load.",
      "Led development of core microservices for user management and usage analytics, and contributed across the backend by implementing new REST API endpoints, integrating an LLM into the existing AI pipeline to enhance prescription entity extraction, and strengthening service reliability through automated test suites.",
      "Built and maintained CI pipelines automating regression testing and static analysis, while enforcing engineering best practices through linters, formatters, type checkers, and pre-commit workflows.",
    ],
  },
  {
    title: "Research Assistant",
    company: "Interaction Lab",
    date: "May 2021 — Aug 2021",
    points: [
      "Worked as a research assistant at the Human-Computer Interaction Laboratory, University of Saskatchewan.",
      "Engaged with the supervisor to elicit detailed project requirements, ensuring a clear understanding of their needs and objectives.",
      "Developed advanced software solutions utilizing official REST APIs from Twitter and Steam for data collection and analysis.",
      "Developed a website using an internal Python-based framework to conduct a survey for their research.",
    ],
  },
];

export interface Project {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  image: string;
  video?: string;
  sourceCodeLink?: string;
  playLink?: string;
  stat?: string;
}

export const projects: Project[] = [
  {
    title: "ytnoti",
    subtitle:
      "Python library for receiving real-time YouTube notifications via PubSubHubbub",
    description:
      "ytnoti is a Python library that provides real-time notifications for YouTube video uploads and edits via PubSubHubbub Protocol—no API polling needed. With 16,000+ downloads and 99% code coverage, it’s a lightweight, reliable, and easy-to-integrate solution for developers.",
    tags: ["Python", "FastAPI", "GitHub Actions"],
    image: ytnoti,
    sourceCodeLink: "https://github.com/SeoulSKY/ytnoti",
    stat: "16,000+ downloads",
  },
  {
    title: "SoruSora",
    subtitle: "Officially Verified AI-Powered Discord Bot",
    description:
      "SoruSora is an advanced, AI-driven Discord bot designed to enhance communication and collaboration within online communities. It enables natural, lifelike AI conversations and supports real-time translation across 45 languages. Now officially verified by Discord, SoruSora is trusted and actively used across 100+ servers worldwide.",
    tags: ["Python", "MongoDB", "Docker"],
    image: sorusoraPoster,
    video: sorusoraVideo,
    sourceCodeLink: "https://github.com/SeoulSKY/SoruSora",
    playLink: "https://sorusora.seoulsky.dev",
    stat: "100+ servers",
  },
  {
    title: "Desdemona",
    subtitle: "Powerful Othello AI",
    description:
      "Engage in a game of Othello against a powerful AI opponent, Desdemona, and explore the intriguing environment surrounding you, and discover what lies inside various buildings.",
    tags: ["Rust", "Unity3D", "Node.js"],
    image: desdemonaPoster,
    video: desdemonaVideo,
    sourceCodeLink: "https://github.com/SeoulSKY/Desdemona",
    playLink: "https://desdemona.seoulsky.dev",
  },
  {
    title: "Memory Mate",
    subtitle: "AI-Powered Dementia Treatment Platform",
    description:
      "Connect with our empathetic AI companion tailored for those with dementia, offering friendly conversations and engaging personalized brain games to enhance cognitive abilities.",
    tags: ["React Native", "TypeScript", "Gemini AI"],
    image: memorymatePoster,
    video: memorymateVideo,
    sourceCodeLink: "https://github.com/SeoulSKY/MemoryMate",
  },
  {
    title: "GoChat",
    subtitle: "Real-Time Chat Web Platform",
    description:
      "Experience a real-time chat web platform powered by WebSocket, Go, React, and MongoDB. Engage in instant communication and uncover the technical prowess behind this project.",
    tags: ["Go", "React.js", "TailwindCSS"],
    image: gochat,
    sourceCodeLink: "https://github.com/SeoulSKY/go-chat",
    playLink: "https://gochat.seoulsky.dev",
  },
  {
    title: "Chess AI",
    subtitle: "Highly Customizable Chess AI",
    description:
      "Experience the ultimate in strategic gaming with our customizable chess AI. Play on the web with dynamic difficulty adjustments and personalized settings, perfect for beginners and grandmasters alike. Enhance your skills and enjoy endless strategic fun.",
    tags: ["Java", "React.js", "CSS"],
    image: chessaiPoster,
    video: chessaiVideo,
    sourceCodeLink: "https://github.com/SeoulSKY/ChessAI",
  },
];

export interface Award {
  title: string;
  description: string;
  date: string;
}

export const awards: Award[] = [
  {
    title: "Academic Excellence Scholarship",
    description:
      "The College of Arts and Science awards the Academic Excellence Scholarship to students who maintain the highest overall academic averages in their respective programs. I was honoured to receive the scholarship in January 2024, recognizing my academic accomplishments during the 2022-2023 academic year in the Bachelor of Science Honours Software Engineering.",
    date: "Jan 2024",
  },
  {
    title: "Undergraduate Summer Research Award",
    description:
      "The Undergraduate Summer Research Awards (USRA) competition is an opportunity for talented and motivated undergraduate students to gain leading-edge research and software development experience by working during the summer on a research project under the supervision of a Computer Science faculty member.",
    date: "Aug 2021",
  },
  {
    title: "Dean's Honour List 2020-21",
    description:
      "The Dean’s Honour List recognizes undergraduate students whose grades rank in the top 5% of those studying with a full course load in the College of Arts and Science.",
    date: "Sep 2020",
  },
  {
    title: "Academic Excellence Entrance Scholarship",
    description:
      "Recognizing academic accomplishment with an admission average of 90+%.",
    date: "Jan 2019",
  },
];

/* ── Skills ─────────────────────────────────────────────── */

const icons = import.meta.glob<string>("@/assets/skills/*.svg", {
  eager: true,
  import: "default",
  query: "?url",
});

function icon(file: string): string {
  const match = Object.entries(icons).find(([path]) =>
    path.endsWith(`/${file}.svg`),
  );
  if (!match) throw new Error(`Missing skill icon: ${file}`);
  return match[1];
}

export interface Skill {
  name: string;
  icon: string;
}

export const skillRows: { label: string; skills: Skill[] }[] = [
  {
    label: "Languages",
    skills: [
      { name: "Python", icon: icon("python-dark") },
      { name: "Rust", icon: icon("rust") },
      { name: "TypeScript", icon: icon("typescript") },
      { name: "JavaScript", icon: icon("javascript") },
      { name: "Go", icon: icon("golang") },
      { name: "Java", icon: icon("java-dark") },
      { name: "C", icon: icon("c") },
      { name: "C#", icon: icon("cs") },
      { name: "Scala", icon: icon("scala-dark") },
      { name: "HTML", icon: icon("html") },
      { name: "CSS", icon: icon("css") },
      { name: "Bash", icon: icon("bash-dark") },
    ],
  },
  {
    label: "Frameworks",
    skills: [
      { name: "React", icon: icon("react-dark") },
      { name: "Next.js", icon: icon("nextjs-dark") },
      { name: "Tauri", icon: icon("tauri-dark") },
      { name: "Vite", icon: icon("vite-dark") },
      { name: "Tailwind CSS", icon: icon("tailwindcss-dark") },
      { name: "FastAPI", icon: icon("fastapi") },
      { name: "Django", icon: icon("django") },
      { name: "Flask", icon: icon("flask-dark") },
      { name: "Express", icon: icon("expressjs-dark") },
      { name: "NestJS", icon: icon("nestjs-dark") },
      { name: "Unity", icon: icon("unity-dark") },
    ],
  },
  {
    label: "Infra & Tools",
    skills: [
      { name: "AWS", icon: icon("aws-dark") },
      { name: "Cloudflare", icon: icon("cloudflare-dark") },
      { name: "Docker", icon: icon("docker") },
      { name: "Nginx", icon: icon("nginx") },
      { name: "PostgreSQL", icon: icon("postgresql-dark") },
      { name: "MongoDB", icon: icon("mongodb") },
      { name: "Linux", icon: icon("linux-dark") },
      { name: "Ubuntu", icon: icon("ubuntu-dark") },
      { name: "Git", icon: icon("git") },
      { name: "GitHub", icon: icon("github-dark") },
      { name: "GitHub Actions", icon: icon("github-actions-dark") },
      { name: "GitLab", icon: icon("gitlab-dark") },
      { name: "Vercel", icon: icon("vercel-dark") },
      { name: "Sentry", icon: icon("sentry") },
      { name: "Postman", icon: icon("postman") },
    ],
  },
];
