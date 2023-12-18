import {
  backend,
  devops,
  frontend,
  game,

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
    play_link: "https://discord.com/invite/kQZDJJB",
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
];

const awards = [
  {
    title: "Undergraduate Summer Research Award",
    date: "August 2021",
    description: "The Undergraduate Summer Research Awards (USRA) competition is an opportunity for talented and motivated undergraduate students to gain leading-edge research and software development experience by working during the summer on a research project under the supervision of a Computer Science faculty member",
  },
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
