import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import Section from "../components/Section";
import { twConfig } from "../utils";

interface Award {
  title: string;
  date: string;
  description: string;
}

const awards: Award[] = [
  {
    title: "Dean’s Honour List 2020-21",
    date: "September 2020",
    description:
      "The Dean’s Honour List recognizes undergraduate students whose grades rank in the top 5% of " +
      "those studying with a full course load in the College of Arts and Science",
  },
  {
    title: "University of Saskatchewan Entrance Scholarship",
    date: "January 2019",
    description:
      "Recognizing academic accomplishment with an admission average of 90+%",
  },
];

function SchoolIcon() {
  return (
    <svg focusable={"false"} viewBox={"0 0 24 24"} aria-hidden={"true"}>
      <path
        d={
          "M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"
        }
        fill={"white"}
      ></path>
    </svg>
  );
}

interface AwardCardProps {
  index: number;
  title: string;
  date: string;
  description: string;
}

function AwardCard({ title, date, description }: AwardCardProps) {
  const bgColor = twConfig.theme.colors.blue["950"];
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: bgColor,
        color: "white",
      }}
      contentArrowStyle={{ borderRight: `7px solid ${bgColor}` }}
      date={date}
      iconStyle={{ background: "#085e3f", color: "white" }}
      icon={<SchoolIcon />}
      style={{ marginBottom: 0 }}
      intersectionObserverProps={{ triggerOnce: false }}
    >
      <div>
        <h3 className="pb-4 text-[24px] font-bold text-white">{title}</h3>
      </div>

      <div className="text-[14px] tracking-wider text-white">{description}</div>
    </VerticalTimelineElement>
  );
}

export default function Awards() {
  return (
    <Section id={"awards"} title={"Awards"} subTitle={"What I am proud of"}>
      <VerticalTimeline layout={"1-column-left"}>
        <div className={"flex flex-wrap"}>
          {awards.map((award, index) => (
            <AwardCard key={award.title} index={index} {...award} />
          ))}
        </div>
      </VerticalTimeline>
    </Section>
  );
}
