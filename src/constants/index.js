import {
  backend,
  devops,
  frontend,
  game,

  cSharp,
  css,
  docker,
  html,
  java,
  javascript,
  mysql,
  nodejs,
  python,
  react,
  rust,
  typescript,
  unity,

  uofs,

  sorusora,
  desdemona,
  gochat,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
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

const technologies = [
  {
    name: "C#",
    icon: cSharp,
  },
  {
    name: "CSS",
    icon: css,
  },
  {
    name: "Docker",
    icon: docker,
  },
  {
    name: "HTML",
    icon: html,
  },
  {
    name: "Java",
    icon: java,
  },
  {
    name: "Javascript",
    icon: javascript,
  },
  {
    name: "MySQL",
    icon: mysql,
  },
  {
    name: "Node.js",
    icon: nodejs,
  },
  {
    name: "Python",
    icon: python,
  },
  {
    name: "React.js",
    icon: react,
  },
  {
    name: "Rust",
    icon: rust,
  },
  {
    name: "Typescript",
    icon: typescript,
  },
  {
    name: "Unity 3D",
    icon: unity,
  },
];

const experiences = [
  {
    title: "Research Assistant",
    company_name: "Interaction Lab",
    icon: uofs,
    iconBg: "#383E56",
    date: "May 2021 - August 2021",
    points: [
      "Worked as a research assistant at the Human-Computer Interaction Laboratory, University of Saskatchewan.",
      "Engaged with the supervisor to elicit detailed project requirements, ensuring a clear understanding of his needs and objectives.",
      "Developed advanced software solutions utilizing official REST APIs from Twitter and Steam for data collection and analysis.",
      "Developed website using internal Python based framework to conduct survey for his research.",
    ],
  }
];

const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Rick does.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const projects = [
  {
    name: "SoruSora",
    description:
      "Engage in lifelike AI chats, translate messages into 15 languages simultaneously, and convert videos to text. Explore innovative features for enhanced communication and content sharing.",
    tags: [
      {
        name: "python",
        color: "blue-text-gradient",
      },
      {
        name: "NoSQL",
        color: "green-text-gradient",
      },
      {
        name: "Docker",
        color: "pink-text-gradient",
      },
    ],
    image: sorusora,
    source_code_link: "https://github.com/SeoulSKY/SoruSora",
  },
  {
    name: "Desdemona",
    description:
      "Engage in a game of Othello against a powerful AI opponent, Desdemona, and explore the intriguing environment surrounding you, and discover what lies inside various buildings.",
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
    source_code_link: "https://github.com/SeoulSKY/Desdemona",
  },
  {
    name: "Go Chat",
    description:
      "Experience a real-time chat web application powered by WebSocket, Docker, Go, React, and MongoDB. Engage in instant communication and uncover the technical prowess behind this project.",
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
    source_code_link: "https://github.com/SeoulSKY/go-chat",
  },
];

export { services, technologies, experiences, testimonials, projects };
