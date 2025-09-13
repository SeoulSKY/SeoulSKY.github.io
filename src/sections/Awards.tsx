import Section from "@/components/Section";
import { Timeline } from "@/components/ui/timeline";

interface Award {
  title: string;
  description: string;
  date: string;
}

const awards: Award[] = [
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

export default function Awards() {
  return (
    // biome-ignore lint/correctness/useUniqueElementIds: Used for navigation
    <Section id="awards" title="Awards">
      <div className="mt-20 flex flex-col">
        <div className="relative w-full overflow-clip">
          <Timeline
            data={awards.map((exp) => ({
              title: exp.date,
              content: (
                <div className="flex flex-col gap-8">
                  <h3 className="font-bold text-3xl text-white">{exp.title}</h3>
                  <p className="leading-8">{exp.description}</p>
                </div>
              ),
            }))}
          />
        </div>
      </div>
    </Section>
  );
}
