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
      "Took full ownership of the company’s desktop application, building with Tauri, React.js, TypeScript, Tailwind CSS, Zod, Vite, TanStack, and Zustand to deliver a fast, responsive, secure, and user-centric experience.",
      "Developed robust Rust backend logic for system-level operations and performance-critical tasks, including TWAIN-based scanner integration via FFI (Foreign Function Interface) to enable seamless hardware interaction for image acquisition.",
      "Owned microservices for user management and usage data collection, while contributing to others by adding REST API endpoints, integrating an LLM to enhance the AI pipeline with data generation for training, and implementing automated test cases to ensure maintainability and reliability.",
      "Built lightweight yet robust CI pipelines to automate regression testing and static analysis; enforced engineering best practices through linters, formatters, type checkers, and pre-commit Git hooks.",
      "Consistently delivered features under rapidly changing requirements, providing accurate timeline estimates and adapting quickly to evolving scope in a fast-paced startup environment.",
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
