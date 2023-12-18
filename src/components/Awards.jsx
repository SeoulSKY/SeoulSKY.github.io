import React from "react";
import { motion } from "framer-motion";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { awards } from "../constants";

const SchoolIcon = () => {
  return (
    <svg focusable={"false"} viewBox={"0 0 24 24"} aria-hidden={"true"}>
      <path d={"M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"} fill={"white"}></path>
    </svg>
  )
}

const AwardCard = ({
  index,
  title,
  date,
  description,
}) => (
  <motion.div
    variants={fadeIn("", "spring", index * 0.5, 0.75)}
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
        <h3 className='pb-4 text-white text-[24px] font-bold'>{title}</h3>
      </div>

      <div className='text-white-100 text-[14px] tracking-wider'>
        {description}
      </div>
    </VerticalTimelineElement>
  </motion.div>
);

const Awards = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>What I am proud of</p>
        <h2 className={styles.sectionHeadText}>Awards</h2>
      </motion.div>

      <VerticalTimeline layout={"1-column-left"}>
        <div className={`flex flex-wrap gap-7`}>
          {awards.map((award, index) => (
            <AwardCard key={award.title} index={index} {...award} />
          ))}
        </div>
      </VerticalTimeline>
    </>
  )
}

export default SectionWrapper(Awards, "award");
