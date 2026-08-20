import { defineProject } from "../types";

export default defineProject({
  slug: "opencode-context",
  title: "opencode-context",
  eyebrow: "OpenCode plugin",
  year: "2026",
  date: "2026-08-05T01:42:29Z",
  shortDescription:
    "A native OpenCode modal for inspecting retained context and token usage.",
  description:
    "The TUI reports recorded token usage, estimated context utilization, cache efficiency, message activity, and the largest retained contributors without invoking another model.",
  category: "Extension",
  technologies: ["TypeScript", "Bun", "OpenCode", "TUI"],
  links: [
    {
      label: "View source",
      href: "https://github.com/ZackarySantana/opencode-context",
      kind: "source",
    },
    {
      label: "npm package",
      href: "https://www.npmjs.com/package/opencode-context-tui",
      kind: "package",
    },
  ],
  media: [
    {
      type: "image",
      src: "./media/projects/opencode-context/cover-1280.webp",
      srcSet:
        "./media/projects/opencode-context/cover-640.webp 640w, ./media/projects/opencode-context/cover-1280.webp 1280w",
      alt: "OpenCode context modal showing token utilization and session activity",
    },
  ],
  featured: false,
  order: 8,
});
