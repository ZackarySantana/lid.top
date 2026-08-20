import { defineProject } from "../types";

export default defineProject({
  slug: "zedith",
  title: "Zedith",
  eyebrow: "Hytale mod collection",
  year: "2026",
  date: "2026-02-07T20:13:29Z",
  shortDescription:
    "A modular collection of Hytale gameplay mods and shared libraries.",
  description:
    "Zedith brings independently released Hytale projects into one tested Gradle workspace, including PartyChat, the GlowText formatting engine, and the Configure GUI library.",
  category: "Game",
  technologies: ["Java", "Gradle", "Hytale", "ECS", "JUnit"],
  links: [
    {
      label: "View source",
      href: "https://github.com/ZackarySantana/zedith",
      kind: "source",
    },
  ],
  media: [
    {
      type: "image",
      src: "./media/projects/zedith/cover-1280.webp",
      srcSet:
        "./media/projects/zedith/cover-640.webp 640w, ./media/projects/zedith/cover-1280.webp 1280w",
      alt: "Zedith Hytale mods and shared libraries title card",
    },
  ],
  order: 28,
});
