import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import "react-vertical-timeline-component/style.min.css";

import Section from "../components/Section";
import uofs from "../assets/uofs.png";
import { twConfig } from "../utils";

interface Experience {
  title: string;
  companyName: string;
  date: string;
  icon: string;
  iconBg: string;
  points: string[];
}

const experiences: Experience[] = [
  {
    title: "Research Assistant",
    companyName: "Interaction Lab",
    icon: uofs,
    iconBg: twConfig.theme.colors.blue["950"],
    date: "May 2021 - August 2021",
    points: [
      "Worked as a research assistant at the Human-Computer Interaction Laboratory, University of Saskatchewan.",
      "Engaged with the supervisor to elicit detailed project requirements, ensuring a clear understanding of their " +
        "needs and objectives.",
      "Developed advanced software solutions utilizing official REST APIs from Twitter and Steam for data collection " +
        "and analysis.",
      "Developed a website using an internal Python-based framework to conduct a survey for their research.",
    ],
  },
];

interface ExperienceCardProps {
  experience: Experience;
}

function ExperienceCard({ experience }: ExperienceCardProps) {
  const bgColor = twConfig.theme.colors.blue["950"];
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: bgColor,
        color: "white",
      }}
      contentArrowStyle={{ borderRight: `7px solid ${bgColor}` }}
      date={experience.date}
      iconStyle={{ background: experience.iconBg }}
      icon={
        <div className="flex h-full w-full items-center justify-center">
          <img
            src={experience.icon}
            alt={experience.companyName}
            className="h-[60%] w-[60%] object-contain"
          />
        </div>
      }
      intersectionObserverProps={{ triggerOnce: false }}
    >
      <div>
        <h3 className="text-[24px] font-bold text-white">{experience.title}</h3>
        <p
          className="text-[16px] font-semibold text-secondary"
          style={{ margin: 0 }}
        >
          {experience.companyName}
        </p>
      </div>

      <ul className="ml-5 mt-5 list-disc space-y-2">
        {experience.points.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className="pl-1 text-[14px] tracking-wider text-white"
          >
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
}

export default function Experiences() {
  return (
    <Section
      id={"experiences"}
      className={"text-center"}
      title={"Work Experience"}
      subTitle={"What I have done so far"}
    >
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
    </Section>
  );
}
