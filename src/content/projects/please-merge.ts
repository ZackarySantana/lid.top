import { defineProject } from "../types";

export default defineProject({
  slug: "please-merge",
  title: "please-merge",
  eyebrow: "Interactive explainer",
  year: "2026",
  date: "2026-02-22T14:10:51Z",
  shortDescription:
    "A simplified, visual explanation of how GitHub's merge queue works.",
  description:
    "please-merge turns a subtle repository workflow into an interactive model that is easier to explore than a wall of documentation.",
  category: "Developer Tool",
  technologies: ["HTML", "CSS", "JavaScript", "GitHub"],
  links: [
    {
      label: "View source",
      href: "https://github.com/ZackarySantana/please-merge",
      kind: "source",
    },
    {
      label: "Open demo",
      href: "https://zackarysantana.github.io/please-merge/",
      kind: "demo",
    },
  ],
  media: [
    {
      type: "image",
      src: "./media/projects/please-merge/cover-1280.webp",
      srcSet:
        "./media/projects/please-merge/cover-640.webp 640w, ./media/projects/please-merge/cover-1280.webp 1280w",
      alt: "please-merge interactive merge queue explainer",
    },
  ],
  featured: false,
  order: 14,
});
