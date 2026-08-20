import { defineProject } from "../types";

export default defineProject({
  slug: "gb",
  title: "gb",
  eyebrow: "Benchmark explorer",
  year: "2025",
  date: "2025-10-23T00:17:33Z",
  shortDescription:
    "A web interface for reading and comparing Go benchmark results.",
  description:
    "gb turns benchmark output into a navigable interface that makes performance comparisons easier to scan and share.",
  category: "Developer Tool",
  technologies: ["TypeScript", "Go", "Benchmarks", "GitHub Pages"],
  links: [
    {
      label: "View source",
      href: "https://github.com/ZackarySantana/gb",
      kind: "source",
    },
    {
      label: "Open demo",
      href: "https://zackarysantana.github.io/gb/",
      kind: "demo",
    },
  ],
  media: [
    {
      type: "image",
      src: "./media/projects/gb/cover-1280.webp",
      srcSet:
        "./media/projects/gb/cover-640.webp 640w, ./media/projects/gb/cover-1280.webp 1280w",
      alt: "gb benchmark comparison interface cover",
    },
  ],
  featured: false,
  order: 13,
});
