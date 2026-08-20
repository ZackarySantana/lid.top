import { defineProject } from "../types";

export default defineProject({
  slug: "opencode-cost",
  title: "opencode-cost",
  eyebrow: "OpenCode Plugin",
  year: "2026",
  date: "2026-08-04T01:46:05Z",
  shortDescription:
    "Persistent cost and token tracking through a native OpenCode dashboard.",
  description:
    "The plugin records OpenCode's provider-calculated costs and token telemetry in an idempotent SQLite ledger, with native date, project, provider, and model filters.",
  category: "OpenCode Plugin",
  technologies: ["TypeScript", "Bun", "OpenCode", "OpenTUI", "SQLite"],
  links: [
    {
      label: "npm package",
      href: "https://www.npmjs.com/package/opencode-cost",
      kind: "package",
    },
    {
      label: "View source",
      href: "https://github.com/ZackarySantana/opencode-cost",
      kind: "source",
    },
  ],
  media: [
    {
      type: "image",
      src: "./media/projects/opencode-cost/cover-1280.webp",
      srcSet:
        "./media/projects/opencode-cost/cover-640.webp 640w, ./media/projects/opencode-cost/cover-1280.webp 1280w",
      alt: "OpenCode cost dashboard with token, model, project, and daily totals",
    },
  ],
  order: 26,
});
