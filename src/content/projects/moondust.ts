import { defineProject } from "../types";

export default defineProject({
  slug: "moondust",
  title: "Moondust",
  eyebrow: "Local developer app",
  year: "2026",
  date: "2026-05-05T17:16:16Z",
  shortDescription:
    "A cross-platform local application delivered as a single binary.",
  description:
    "Moondust combines a local web interface, documentation, release tooling, and a lightweight desktop shell. It launches through npm or a native binary without bundling a full browser runtime.",
  category: "Developer Tool",
  technologies: ["TypeScript", "Go", "Sash", "Local-first", "Cross-platform"],
  links: [
    {
      label: "View source",
      href: "https://github.com/ZackarySantana/moondust",
      kind: "source",
    },
    {
      label: "Read the docs",
      href: "https://zackarysantana.github.io/moondust/",
      kind: "docs",
    },
  ],
  media: [
    {
      type: "video",
      src: "./media/projects/moondust/demo.mp4",
      webmSrc: "./media/projects/moondust/demo.webm",
      poster: "./media/projects/moondust/poster.jpg",
      label: "Moondust local application demonstration",
      caption:
        "Launching and using Moondust's local web interface and desktop workflow.",
    },
  ],
  featured: true,
  order: 2,
});
