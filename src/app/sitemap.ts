import type { MetadataRoute } from "next";
import { projects, site } from "@/data/content";

/**
 * The site is one page, so the sitemap is one URL. It still lists the
 * project pictures and clips, which can then turn up in image and video
 * search under it.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      // the page changes only when it is deployed, so the build time is
      // when it last changed
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      images: projects.map((project) => `${site.url}${project.image}`),
      videos: projects.flatMap((project) =>
        project.video
          ? [
              {
                title: `${project.title}: ${project.subtitle}`,
                description: project.description,
                thumbnail_loc: `${site.url}${project.image}`,
                content_loc: `${site.url}${project.video}`,
              },
            ]
          : [],
      ),
    },
  ];
}
