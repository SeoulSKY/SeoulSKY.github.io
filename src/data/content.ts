/**
 * The site's content: navigation, profile, experience, projects, awards and
 * skills. Section intros and headings live in the section components.
 */
export const GITHUB_URL = "https://github.com/SeoulSKY";

export const navSections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "awards", label: "Awards" },
  { id: "contact", label: "Contact" },
] as const;

/** A section's id, which is also its anchor on the page. */
export type SectionId = (typeof navSections)[number]["id"];

export const KOREAN: Record<SectionId, string> = {
  about: "소개",
  experience: "경력",
  skills: "기술",
  projects: "작품",
  awards: "수상",
  contact: "연락",
};

/** Figures quoted in more than one place, so they change together. */
export const FIGURES = {
  ytnotiDownloads: 31000,
  ytnotiStars: 35,
  ytnotiContributors: 5,
  sorusoraServers: 100,
  sorusoraLanguages: 45,
};

export function thousands(n: number): string {
  return n.toLocaleString("en-US");
}

export const heroTaglines = [
  "Software Engineer building products for the healthcare industry.",
  "Graduate in Software Engineering Honours with a Minor in Applied Mathematics.",
];

export const introduction =
  "I’m a software engineer who works mostly in Python, Rust and TypeScript, with React.js, Next.js and Tauri on the front end. I like building software that scales and is easy to use, aimed at problems people actually have. I learn fast and work well on a team. If you have something you want built, let’s talk.";

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

/** The counters beside the About introduction. */
export const stats: Stat[] = [
  { value: FIGURES.ytnotiDownloads, suffix: "+", label: "ytnoti downloads" },
  { value: FIGURES.ytnotiStars, suffix: "", label: "GitHub stars on ytnoti" },
  {
    value: FIGURES.sorusoraServers,
    suffix: "+",
    label: "Discord servers on SoruSora",
  },
  {
    value: FIGURES.ytnotiContributors,
    suffix: "",
    label: "contributors to ytnoti",
  },
];

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
    blurb: "React, Next.js and interfaces that are easy to use.",
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
    date: "Jan 2025 – Present",
    points: [
      "Own the company’s Windows desktop app end to end, built with Tauri, React and TypeScript on a Rust backend, covering architecture, UI, backend integration, testing, and release. Built the self-hosted server that distributes signed app updates and the PMS automation agent.",
      "Built prescription intake from document scanners, email, and fax, including TWAIN scanner support by calling a native C++ library from Rust through FFI, Gmail and Outlook import with multi-account OAuth 2.0, fax machine and cloud fax import.",
      "Own the company’s pharmacy ambient AI scribe end to end, which turns recorded patient consultations into filled assessment forms for pharmacist review. Built an on-device speech recognition and speaker diarization pipeline for CPU-only PCs, and an LLM extraction layer with hallucination safeguards that verify every answer against the transcript and flag uncertain ones for review.",
      "Turned a prototype of the company website (www.nutramate.com) into a production built with Next.js, implementing server-side rendering, image and media optimization, and SEO through structured data, sitemaps and per-page metadata, and deployed it on AWS.",
      "Designed and built the authentication and authorization service, with role-based access control and organization accounts that group multiple users.",
      "Enforced engineering standards with CI, Git hooks for linting, formatting, and type checking, and automated test suites.",
    ],
  },
  {
    title: "Research Assistant",
    company: "Interaction Lab",
    date: "May 2021 – Aug 2021",
    points: [
      "Worked as a research assistant at the Human-Computer Interaction Laboratory, University of Saskatchewan.",
      "Met with my supervisor to work out detailed project requirements.",
      "Built tools that collected and analyzed data through the official Twitter and Steam REST APIs.",
      "Built a survey website for the lab’s research using an internal Python framework.",
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
      "Python library for receiving real-time YouTube notifications via WebSub",
    description: `ytnoti is a Python library that sends real-time notifications when a YouTube video is uploaded, edited or deleted, or when a live stream starts. It uses the WebSub protocol, so there is no API polling. It has ${thousands(FIGURES.ytnotiDownloads)}+ downloads, ${FIGURES.ytnotiStars} GitHub stars and ${FIGURES.ytnotiContributors} contributors.`,
    tags: ["Python", "FastAPI", "GitHub Actions"],
    image: "/projects/ytnoti.jpg",
    sourceCodeLink: "https://github.com/SeoulSKY/ytnoti",
    stat: `${thousands(FIGURES.ytnotiDownloads)}+ downloads`,
  },
  {
    title: "SoruSora",
    subtitle: "Officially Verified AI Discord Bot",
    description: `SoruSora is a Discord bot that holds AI conversations and translates messages in real time across ${FIGURES.sorusoraLanguages} languages. Discord has verified it, and it runs on ${FIGURES.sorusoraServers}+ servers.`,
    tags: ["Python", "MongoDB", "Docker"],
    image: "/projects/sorusora.jpg",
    video: "/projects/sorusora.mp4",
    sourceCodeLink: "https://github.com/SeoulSKY/SoruSora",
    playLink: "https://sorusora.seoulsky.dev",
    stat: `${FIGURES.sorusoraServers}+ servers`,
  },
  {
    title: "Desdemona",
    subtitle: "Othello AI Opponent",
    description:
      "Play Othello against Desdemona, a strong AI opponent, then explore the 3D world around the board and look inside its buildings.",
    tags: ["Rust", "Unity3D", "Node.js"],
    image: "/projects/desdemona.jpg",
    video: "/projects/desdemona.mp4",
    sourceCodeLink: "https://github.com/SeoulSKY/Desdemona",
    playLink: "https://desdemona.seoulsky.dev",
  },
  {
    title: "Memory Mate",
    subtitle: "AI Companion for People with Dementia",
    description:
      "An AI companion for people with dementia. It holds friendly conversations and offers personalized brain games that exercise memory and thinking.",
    tags: ["React Native", "TypeScript", "Gemini AI"],
    image: "/projects/memorymate.jpg",
    video: "/projects/memorymate.mp4",
    sourceCodeLink: "https://github.com/SeoulSKY/MemoryMate",
  },
  {
    title: "GoChat",
    subtitle: "Real-Time Chat Web App",
    description:
      "A real-time chat web app built with WebSocket, Go, React, and MongoDB.",
    tags: ["Go", "React.js", "TailwindCSS"],
    image: "/projects/gochat.jpg",
    sourceCodeLink: "https://github.com/SeoulSKY/go-chat",
    playLink: "https://gochat.seoulsky.dev",
  },
  {
    title: "Chess AI",
    subtitle: "Customizable Chess AI",
    description:
      "A chess AI you can play in the browser, with adjustable difficulty and custom settings, so it suits beginners and strong players alike.",
    tags: ["Java", "React.js", "CSS"],
    image: "/projects/chessai.jpg",
    video: "/projects/chessai.mp4",
    sourceCodeLink: "https://github.com/SeoulSKY/ChessAI",
  },
];

export interface Award {
  title: string;
  description: string;
  month: string;
  year: number;
}

export const awards: Award[] = [
  {
    title: "Academic Excellence Scholarship",
    description:
      "The College of Arts and Science awards the Academic Excellence Scholarship to students who maintain the highest overall academic averages in their respective programs. I was honoured to receive the scholarship in January 2024, recognizing my academic accomplishments during the 2022-2023 academic year in the Bachelor of Science Honours Software Engineering.",
    month: "Jan",
    year: 2024,
  },
  {
    title: "Undergraduate Summer Research Award",
    description:
      "The Undergraduate Summer Research Awards (USRA) competition is an opportunity for talented and motivated undergraduate students to gain leading-edge research and software development experience by working during the summer on a research project under the supervision of a Computer Science faculty member.",
    month: "Aug",
    year: 2021,
  },
  {
    title: "Dean's Honour List 2020-21",
    description:
      "The Dean’s Honour List recognizes undergraduate students whose grades rank in the top 5% of those studying with a full course load in the College of Arts and Science.",
    month: "Sep",
    year: 2020,
  },
  {
    title: "Academic Excellence Entrance Scholarship",
    description:
      "Recognizing academic accomplishment with an admission average of 90+%.",
    month: "Jan",
    year: 2019,
  },
];

/* ── Skills ─────────────────────────────────────────────── */

/** Skill logos live in public/skills. */
function icon(file: string): string {
  return `/skills/${file}.svg`;
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
