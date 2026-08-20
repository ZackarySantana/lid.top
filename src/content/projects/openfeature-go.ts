import { defineProject } from "../types";

export default defineProject({
  slug: "openfeature-go",
  title: "OpenFeature MongoDB Provider",
  eyebrow: "Go library and editor",
  year: "2025 to 2026",
  date: "2026-05-28T13:30:17Z",
  shortDescription:
    "An OpenFeature provider that stores and evaluates feature flags in MongoDB.",
  description:
    "The provider supports multiple storage models, live collection watching, priority-based targeting rules, a specialized management client, an editor, and an MCP server.",
  category: "Library",
  technologies: ["Go", "MongoDB", "OpenFeature", "MCP", "Docker"],
  links: [
    {
      label: "View source",
      href: "https://github.com/ZackarySantana/openfeature-go",
      kind: "source",
    },
    {
      label: "Editor image",
      href: "https://hub.docker.com/r/lidtop/mongo-openfeature-go-editor",
      kind: "package",
    },
  ],
  media: [
    {
      type: "video",
      src: "./media/projects/openfeature-go/demo.mp4",
      webmSrc: "./media/projects/openfeature-go/demo.webm",
      poster: "./media/projects/openfeature-go/poster.jpg",
      label: "MongoDB OpenFeature provider and editor demonstration",
      caption:
        "Feature flags, targeting rules, and editor workflows backed by MongoDB.",
    },
  ],
  featured: true,
  order: 4,
});
