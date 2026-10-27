import {
  awards,
  experiences,
  GITHUB_URL,
  projects,
  site,
  skillRows,
} from "@/data/content";

const PERSON = `${site.url}/#person`;
const WEBSITE = `${site.url}/#website`;

/**
 * Schema.org JSON-LD for search engines: the page is the profile of one
 * person, whose projects are listed as their source code.
 */
function graph() {
  const job = experiences.find((experience) =>
    experience.date.endsWith("Present"),
  );

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": WEBSITE,
        url: site.url,
        name: site.name,
        description: site.description,
        inLanguage: "en",
        publisher: { "@id": PERSON },
      },
      {
        "@type": "ProfilePage",
        "@id": `${site.url}/#profile`,
        url: site.url,
        name: site.title,
        description: site.description,
        inLanguage: "en",
        isPartOf: { "@id": WEBSITE },
        mainEntity: { "@id": PERSON },
      },
      {
        "@type": "Person",
        "@id": PERSON,
        name: site.name,
        url: site.url,
        image: `${site.url}/logo.png`,
        description: site.description,
        jobTitle: job?.title ?? "Software Engineer",
        ...(job && {
          worksFor: { "@type": "Organization", name: job.company },
        }),
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "University of Saskatchewan",
        },
        knowsAbout: skillRows.flatMap((row) =>
          row.skills.map((skill) => skill.name),
        ),
        award: awards.map((award) => award.title),
        sameAs: [GITHUB_URL],
      },
      ...projects.map((project) => ({
        "@type": "SoftwareSourceCode",
        name: project.title,
        headline: project.subtitle,
        description: project.description,
        image: `${site.url}${project.image}`,
        codeRepository: project.sourceCodeLink,
        url: project.playLink ?? project.sourceCodeLink,
        keywords: project.tags.join(", "),
        author: { "@id": PERSON },
      })),
    ],
  };
}

export default function StructuredData() {
  return (
    <script
      type="application/ld+json"
      // a "<" in the copy must not be able to close the script tag
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD has to be inline, and the payload is escaped
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(graph()).replace(/</g, "\\u003c"),
      }}
    />
  );
}
