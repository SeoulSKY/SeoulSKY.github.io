import {
  backend,
  devops,
  frontend,
  game,

  uofs,

  memorymate,
  desdemona,
  gochat,
  sorusora,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "experience",
    title: "Experience",
  },
  {
    id: "skill",
    title: "Skill",
  },
  {
    id: "project",
    title: "Project",
  },
  {
    id: "award",
    title: "Award",
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

const experiences = [
  {
    title: "Research Assistant",
    companyName: "Interaction Lab",
    icon: uofs,
    iconBg: "#383E56",
    date: "May 2021 - August 2021",
    points: [
      "Worked as a research assistant at the Human-Computer Interaction Laboratory, University of Saskatchewan.",
      "Engaged with the supervisor to elicit detailed project requirements, ensuring a clear understanding of their needs and objectives.",
      "Developed advanced software solutions utilizing official REST APIs from Twitter and Steam for data collection and analysis.",
      "Developed a website using an internal Python-based framework to conduct a survey for their research.",
    ],
  }
];

const projects = [
  {
    name: "Memory Mate",
    description:
      "Connect with our empathetic AI companion tailored for those with dementia, offering friendly conversations and engaging personalized brain games to enhance cognitive abilities.",
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
    source_code_link: "https://github.com/SeoulSKY/MemoryMate",
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
    play_link: "https://desdemona.seoulsky.org",
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
    play_link: null,
  },
  {
    name: "SoruSora",
    description:
      "Engage in lifelike AI chats, translate messages into 25 languages simultaneously, and convert videos to text. Explore innovative features for enhanced communication and content sharing.",
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
    source_code_link: "https://github.com/SeoulSKY/SoruSora",
    play_link: "https://sorusora.seoulsky.org",
  },
];

const awards = [
  {
    title: "Dean’s Honour List 2020-21",
    date: "September 2020",
    description: "The Dean’s Honour List recognizes undergraduate students whose grades rank in the top 5% of those studying with a full course load in the College of Arts and Science",
  },
  {
    title: "University of Saskatchewan Entrance Scholarship",
    date: "January 2019",
    description: "Recognizing academic accomplishment with an admission average of 90+%",
  },
];


export { services, experiences, awards, projects };
