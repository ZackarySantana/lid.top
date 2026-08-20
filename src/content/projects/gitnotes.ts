import { defineProject } from "../types";

export default defineProject({
  slug: "gitnotes",
  title: "GitNotes",
  eyebrow: "Browser extension",
  year: "2026",
  date: "2026-07-06T02:57:59Z",
  shortDescription: "A Chrome extension that brings git notes back to GitHub.",
  description:
    "GitHub stores git notes but no longer displays them. GitNotes restores that missing context with badges, Markdown rendering, sandboxed interactive reports, and links that jump directly into a diff.",
  category: "Extension",
  technologies: ["TypeScript", "Chrome", "GitHub API", "Sandboxed HTML"],
  links: [
    {
      label: "View source",
      href: "https://github.com/ZackarySantana/gitnotes",
      kind: "source",
    },
    {
      label: "Chrome Web Store",
      href: "https://chromewebstore.google.com/detail/gitnotes/inhgnndenedfophhcbpjdocjkdgomklm",
      kind: "store",
    },
  ],
  media: [
    {
      type: "image",
      src: "./media/projects/gitnotes/cover-1280.webp",
      srcSet:
        "./media/projects/gitnotes/cover-640.webp 640w, ./media/projects/gitnotes/cover-1280.webp 1280w",
      alt: "GitNotes displaying an interactive note above a GitHub commit diff",
    },
  ],
  featured: true,
  order: 1,
});
