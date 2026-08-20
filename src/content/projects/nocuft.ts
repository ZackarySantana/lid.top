import { defineProject } from "../types";

export default defineProject({
  slug: "nocuft",
  title: "Nocuft",
  eyebrow: "DiamondFire toolchain",
  year: "2026",
  date: "2026-08-06T04:30:00Z",
  shortDescription:
    "A TypeScript toolchain for building and deploying DiamondFire code.",
  description:
    "Nocuft combines a compile-time SDK, compiler and intermediate representation, local project CLI, generated bindings, and a Fabric client mod that applies builds inside Minecraft.",
  category: "Developer Tool",
  technologies: ["TypeScript", "Node.js", "Java", "Fabric", "Minecraft"],
  links: [
    {
      label: "npm package",
      href: "https://www.npmjs.com/package/nocuft",
      kind: "package",
    },
    {
      label: "View source",
      href: "https://github.com/ZackarySantana/nocuft2",
      kind: "source",
    },
  ],
  media: [
    {
      type: "video",
      src: "./media/projects/nocuft/demo.mp4",
      webmSrc: "./media/projects/nocuft/demo.webm",
      poster: "./media/projects/nocuft/poster.jpg",
      label: "Nocuft compiling and deploying a DiamondFire project",
      caption:
        "A complete Nocuft project workflow from source to in-game build.",
    },
  ],
  order: 23,
});
