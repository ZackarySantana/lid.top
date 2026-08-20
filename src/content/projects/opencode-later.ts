import { defineProject } from "../types";

export default defineProject({
  slug: "opencode-later",
  title: "opencode-later",
  eyebrow: "OpenCode Plugin",
  year: "2026",
  date: "2026-08-05T02:19:12Z",
  shortDescription:
    "A persistent Later list with native OpenCode sidebar integration.",
  description:
    "The plugin adds a global SQLite-backed list, native sidebar section, and keyboard-first management view for adding, editing, completing, restoring, deleting, reordering, and starting saved items.",
  category: "OpenCode Plugin",
  technologies: ["TypeScript", "Bun", "OpenCode", "OpenTUI", "SQLite"],
  links: [
    {
      label: "npm package",
      href: "https://www.npmjs.com/package/opencode-later",
      kind: "package",
    },
    {
      label: "View source",
      href: "https://github.com/ZackarySantana/opencode-later",
      kind: "source",
    },
  ],
  media: [
    {
      type: "image",
      src: "./media/projects/opencode-later/cover-1280.webp",
      srcSet:
        "./media/projects/opencode-later/cover-640.webp 640w, ./media/projects/opencode-later/cover-1280.webp 1280w",
      alt: "opencode-later native management view for saved work items",
    },
  ],
  order: 24,
});
