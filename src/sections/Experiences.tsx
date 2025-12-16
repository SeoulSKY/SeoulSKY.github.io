import { Timeline } from "@/components/ui/timeline";

import Section from "../components/Section";

interface Experience {
  title: string;
  companyName: string;
  date: string;
  points: string[];
}

const experiences: Experience[] = [
  {
    title: "Software Engineer",
    companyName: "NutraMate",
    date: "Jan 2025 - Present",
    points: [
      "Led development of the company’s desktop application using Tauri and React.js, taking ownership of architectural decisions, front-end design and implementation, backend integration, testing, and deployment to deliver a high-quality end-user experience.",
      "Developed high-performance Rust backend module for CPU-intensive processing and low-level operations, including scanner integration through FFI and direct Windows API interaction.",
      "Drove key architectural and system design decisions, improving scalability, reliability, and performance across services operating under high load.",
      "Led development of core microservices for user management and usage analytics, and contributed across the backend by implementing new REST API endpoints, integrating an LLM into the existing AI pipeline to enhance prescription entity extraction, and strengthening service reliability through automated test suites.",
      "Built and maintained CI pipelines automating regression testing and static analysis, while enforcing engineering best practices through linters, formatters, type checkers, and pre-commit workflows.",
    ],
  },
  {
    title: "Research Assistant",
    companyName: "Interaction Lab",
    date: "May 2021 - Aug 2021",
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

export default function Experiences() {
  return (
    // biome-ignore lint/correctness/useUniqueElementIds: Used for navigation
    <Section id="experiences" title="Work Experience">
      <div className="mt-20 flex flex-col">
        <div className="relative w-full overflow-clip">
          <Timeline
            data={experiences.map((exp) => ({
              title: exp.date,
              content: (
                <div>
                  <div>
                    <h3 className="font-bold text-3xl text-white">
                      {exp.title}
                    </h3>
                    <p className="font-semibold text-muted-foreground text-xl">
                      {exp.companyName}
                    </p>
                  </div>

                  <ul className="mt-5 ml-5 list-disc space-y-2">
                    {exp.points.map((point) => (
                      <li
                        key={point}
                        className="pl- text-lg text-white tracking-wider"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ),
            }))}
          />
        </div>
      </div>
    </Section>
  );
}
