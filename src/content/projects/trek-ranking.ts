import { defineProject } from "../types";

export default defineProject({
  slug: "trek-ranking",
  title: "TREK Rankings",
  eyebrow: "TREK plugin",
  year: "2026",
  date: "2026-08-08T02:06:50Z",
  shortDescription:
    "Personal place rankings built from fast, pairwise travel comparisons.",
  description:
    "TREK Rankings turns saved places into personal ordered lists through binary insertion, all-trip import, manual entries, public profile links, and an optional bridge back into editable TREK places.",
  category: "Extension",
  technologies: ["JavaScript", "TREK SDK", "SQLite", "Playwright"],
  links: [
    {
      label: "View source",
      href: "https://github.com/ZackarySantana/trek-ranking",
      kind: "source",
    },
  ],
  media: [
    {
      type: "image",
      src: "./media/projects/trek-ranking/cover-1280.webp",
      srcSet:
        "./media/projects/trek-ranking/cover-640.webp 640w, ./media/projects/trek-ranking/cover-1280.webp 1280w",
      alt: "TREK Rankings workspace showing ordered travel place lists",
    },
  ],
  order: 22,
});
