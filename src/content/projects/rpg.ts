import { defineProject } from "../types";

export default defineProject({
  slug: "rpg",
  title: "RPG",
  eyebrow: "Game",
  year: "2022",
  date: "2022-08-04T04:07:17Z",
  shortDescription:
    "A Godot role-playing game with combat, enemy behaviors, and explorable worlds.",
  description:
    "RPG experiments with distinct attacks, enemy AI, collision systems, animation, world design, and lightweight story elements.",
  category: "Game",
  technologies: ["Godot", "GDScript", "Game design", "Animation"],
  links: [
    {
      label: "View source",
      href: "https://github.com/ZackarySantana/RPG",
      kind: "source",
    },
  ],
  media: [
    {
      type: "image",
      src: "./media/projects/rpg/cover-1280.webp",
      srcSet:
        "./media/projects/rpg/cover-640.webp 640w, ./media/projects/rpg/cover-1280.webp 1280w",
      alt: "RPG game world and character",
    },
  ],
  featured: false,
  order: 20,
});
