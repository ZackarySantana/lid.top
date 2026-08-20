import { defineProject } from "../types";

export default defineProject({
  slug: "weekdays",
  title: "Weekdays",
  eyebrow: "Planning product",
  year: "2022 to 2023",
  date: "2023-01-02T00:00:00Z",
  shortDescription:
    "A weekly Kanban board that organizes tasks around the days they matter.",
  description:
    "Weekdays used drag and drop, categories, date-backed navigation, and account persistence to make planning feel like a focused native application.",
  category: "Product",
  technologies: ["SolidStart", "Solid", "TypeScript", "SQLite", "Docker"],
  links: [],
  media: [
    {
      type: "image",
      src: "./media/projects/weekdays/cover-1280.webp",
      srcSet:
        "./media/projects/weekdays/cover-640.webp 640w, ./media/projects/weekdays/cover-1280.webp 1280w",
      alt: "Weekdays weekly Kanban board",
    },
  ],
  featured: false,
  order: 17,
});
