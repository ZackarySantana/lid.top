import { defineProject } from "../types";

export default defineProject({
  slug: "grove",
  title: "Grove",
  eyebrow: "VS Code extension",
  year: "2023 to 2024",
  date: "2024-11-18T14:26:59Z",
  shortDescription: "Evergreen CI workflows directly inside VS Code.",
  description:
    "Grove lets developers inspect, create, configure, restart, abort, and navigate Evergreen patches and tasks without leaving their editor.",
  category: "Extension",
  technologies: ["TypeScript", "VS Code", "Evergreen", "CI/CD"],
  links: [
    {
      label: "View source",
      href: "https://github.com/ZackarySantana/Grove",
      kind: "source",
    },
    {
      label: "VS Code Marketplace",
      href: "https://marketplace.visualstudio.com/items?itemName=ZackarySantana.grove",
      kind: "store",
    },
  ],
  media: [
    {
      type: "image",
      src: "./media/projects/grove/cover-1280.webp",
      srcSet:
        "./media/projects/grove/cover-640.webp 640w, ./media/projects/grove/cover-1280.webp 1280w",
      alt: "Grove extension showing Evergreen patches in VS Code",
    },
  ],
  featured: false,
  order: 10,
});
