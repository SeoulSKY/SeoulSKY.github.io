import React from "react";
import { motion } from "framer-motion";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import { sectionHeadText, sectionSubText } from "../styles";
import SectionWrapper from "../components/SectionWrapper";
import { fadeIn, textVariant } from "../utils/motion";

const awards = [
  {
    title: "Dean’s Honour List 2020-21",
    date: "September 2020",
    description: "The Dean’s Honour List recognizes undergraduate students whose grades rank in the top 5% of " +
      "those studying with a full course load in the College of Arts and Science",
  },
  {
    title: "University of Saskatchewan Entrance Scholarship",
    date: "January 2019",
    description: "Recognizing academic accomplishment with an admission average of 90+%",
  },
];

function SchoolIcon() {
  return (
    <svg focusable={"false"} viewBox={"0 0 24 24"} aria-hidden={"true"}>
      <path d={"M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"} fill={"white"}></path>
    </svg>
  );
}

interface AwardCardProps {
  index: number;
  title: string;
  date: string;
  description: string;

}

function AwardCard({
  index,
  title,
  date,
  description,
}: AwardCardProps) {
  return (
    <motion.div
      variants={fadeIn(index * 0.5, 0.75, undefined, "spring")}
    >
      <VerticalTimelineElement
        contentStyle={{
          background: "#172554",
          color: "#fff",
        }}
        contentArrowStyle={{ borderRight: "7px solid #172554" }}
        date={date}
        iconStyle={{ background: "#085e3f", color: "#fff" }}
        icon={<SchoolIcon />}
      >
        <div>
          <h3 className="pb-4 text-white text-[24px] font-bold">{title}</h3>
        </div>

        <div className="text-white-100 text-[14px] tracking-wider">
          {description}
        </div>
      </VerticalTimelineElement>
    </motion.div>
  );
}

function Awards() {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={sectionSubText}>What I am proud of</p>
        <h2 className={sectionHeadText}>Awards</h2>
      </motion.div>

      <VerticalTimeline layout={"1-column-left"}>
        <div className={"flex flex-wrap gap-7"}>
          {awards.map((award, index) => (
            <AwardCard key={award.title} index={index} {...award} />
          ))}
        </div>
      </VerticalTimeline>
    </>
  );
}

export default SectionWrapper(Awards);
