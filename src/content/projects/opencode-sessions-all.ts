import { defineProject } from "../types";

export default defineProject({
  slug: "opencode-sessions-all",
  title: "opencode-sessions-all",
  eyebrow: "OpenCode Plugin",
  year: "2026",
  date: "2026-08-04T03:17:34Z",
  shortDescription:
    "Cross-project session search and navigation inside OpenCode's native TUI.",
  description:
    "The plugin indexes sessions and message text from every opened project into SQLite, then provides a keyboard-first browser for search, project filtering, subagent discovery, and session navigation.",
  category: "OpenCode Plugin",
  technologies: ["TypeScript", "Bun", "OpenCode", "OpenTUI", "SQLite"],
  links: [
    {
      label: "npm package",
      href: "https://www.npmjs.com/package/opencode-sessions-all",
      kind: "package",
    },
    {
      label: "View source",
      href: "https://github.com/ZackarySantana/opencode-sessions-all",
      kind: "source",
    },
  ],
  media: [
    {
      type: "image",
      src: "./media/projects/opencode-sessions-all/cover-1280.webp",
      srcSet:
        "./media/projects/opencode-sessions-all/cover-640.webp 640w, ./media/projects/opencode-sessions-all/cover-1280.webp 1280w",
      alt: "OpenCode cross-project session browser with search and filters",
    },
  ],
  order: 25,
});
