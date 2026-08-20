import { defineProject } from "../types";

export default defineProject({
  slug: "gitreview",
  title: "gitreview",
  eyebrow: "Browser extension",
  year: "2026",
  date: "2026-08-06T23:44:43Z",
  shortDescription:
    "A focused review queue layered onto GitHub pull request pages.",
  description:
    "gitreview adds age-based review zones, local filters, approval context, requested teams, and page navigation while keeping tokens local and optional.",
  category: "Chrome Extension",
  technologies: ["TypeScript", "Chrome", "WXT", "GitHub API", "Shadow DOM"],
  links: [
    {
      label: "View source",
      href: "https://github.com/ZackarySantana/gitreview",
      kind: "source",
    },
  ],
  media: [
    {
      type: "image",
      src: "./media/projects/gitreview/cover-1280.webp",
      srcSet:
        "./media/projects/gitreview/cover-640.webp 640w, ./media/projects/gitreview/cover-1280.webp 1280w",
      alt: "gitreview adding an age-based review queue to GitHub pull requests",
    },
  ],
  featured: false,
  order: 9,
});
