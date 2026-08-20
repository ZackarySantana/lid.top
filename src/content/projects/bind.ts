import { defineProject } from "../types";

export default defineProject({
  slug: "bind",
  title: "bind",
  eyebrow: "Go library",
  year: "2025 to 2026",
  date: "2026-04-04T18:12:19Z",
  shortDescription:
    "A flexible way to bind many external data sources into Go structs.",
  description:
    "bind combines JSON, YAML, environment variables, CLI arguments, HTTP paths, and custom suppliers through ordinary struct tags. It includes lazy values, caching, levels, required fields, and controlled parallelism.",
  category: "Library",
  technologies: ["Go", "Reflection", "Configuration", "Benchmarks"],
  links: [
    {
      label: "View source",
      href: "https://github.com/ZackarySantana/bind",
      kind: "source",
    },
    {
      label: "Benchmarks",
      href: "https://zackarysantana.github.io/bind/bench/",
      kind: "demo",
    },
  ],
  media: [
    {
      type: "image",
      src: "./media/projects/bind/cover-1280.webp",
      srcSet:
        "./media/projects/bind/cover-640.webp 640w, ./media/projects/bind/cover-1280.webp 1280w",
      alt: "bind Go library cover with structured configuration fields",
    },
  ],
  featured: true,
  order: 5,
});
