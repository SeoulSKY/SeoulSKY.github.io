import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";

import "react-vertical-timeline-component/style.min.css";

import { sectionHeadText, sectionSubText } from "../styles";
import SectionWrapper from "../components/SectionWrapper";
import { textVariant } from "../utils/motion";
import uofs from "../assets/uofs.png";
const experiences = [
  {
    title: "Research Assistant",
    companyName: "Interaction Lab",
    icon: uofs,
    iconBg: "#383E56",
    date: "May 2021 - August 2021",
    points: [
      "Worked as a research assistant at the Human-Computer Interaction Laboratory, University of Saskatchewan.",
      "Engaged with the supervisor to elicit detailed project requirements, ensuring a clear understanding of their " +
      "needs and objectives.",
      "Developed advanced software solutions utilizing official REST APIs from Twitter and Steam for data collection " +
      "and analysis.",
      "Developed a website using an internal Python-based framework to conduct a survey for their research.",
    ],
  }
];

interface ExperienceCardProps {
  experience: {
    title: string;
    companyName: string;
    date: string;
    icon: string;
    iconBg: string;
    points: string[];
  };
}

function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "#172554",
        color: "#fff",
      }}
      contentArrowStyle={{ borderRight: "7px solid #172554" }}
      date={experience.date}
      iconStyle={{ background: experience.iconBg }}
      icon={
        <div className="flex justify-center items-center w-full h-full">
          <img
            src={experience.icon}
            alt={experience.companyName}
            className="w-[60%] h-[60%] object-contain"
          />
        </div>
      }
    >
      <div>
        <h3 className="text-white text-[24px] font-bold">{experience.title}</h3>
        <p
          className="text-secondary text-[16px] font-semibold"
          style={{ margin: 0 }}
        >
          {experience.companyName}
        </p>
      </div>

      <ul className="mt-5 list-disc ml-5 space-y-2">
        {experience.points.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className="text-white-100 text-[14px] pl-1 tracking-wider"
          >
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
}

function Experiences() {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${sectionSubText} text-center`}>
          What I have done so far
        </p>
        <h2 className={`${sectionHeadText} text-center`}>
          Work Experience
        </h2>
      </motion.div>

      <div className="mt-20 flex flex-col">
        <VerticalTimeline>
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={`experience-${index}`}
              experience={experience}
            />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
}

export default SectionWrapper(Experiences, Experiences.name.toLowerCase());
