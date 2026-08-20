import { defineProject } from "../types";

export default defineProject({
  slug: "trek-ai-chat",
  title: "TREK Assistant",
  eyebrow: "TREK plugin",
  year: "2026",
  date: "2026-08-08T04:39:39Z",
  shortDescription:
    "Trip-scoped AI conversations that prepare travel changes for human review.",
  description:
    "TREK Assistant adds private and shared planning threads, OpenRouter streaming, Google Places search, and reviewable proposals for places, itineraries, and day notes without letting the model mutate a trip on its own.",
  category: "TREK Plugin",
  technologies: [
    "JavaScript",
    "TREK SDK",
    "OpenRouter",
    "Google Places",
    "SQLite",
  ],
  links: [
    {
      label: "View source",
      href: "https://github.com/ZackarySantana/trek-ai-chat",
      kind: "source",
    },
  ],
  media: [
    {
      type: "image",
      src: "./media/projects/trek-ai-chat/cover-1280.webp",
      srcSet:
        "./media/projects/trek-ai-chat/cover-640.webp 640w, ./media/projects/trek-ai-chat/cover-1280.webp 1280w",
      alt: "TREK Assistant workspace with trip conversations and travel proposals",
    },
  ],
  order: 21,
});
