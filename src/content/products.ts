export interface SpotlightProduct {
  slug: string;
  name: string;
  eyebrow: string;
  headline: string;
  description: string;
  href: string;
  spotlight: boolean;
  details: readonly string[];
  media: {
    video: string;
    webm: string;
    poster: string;
    label: string;
    image?: string;
    imageAlt?: string;
  };
}

export const products = [
  {
    slug: "dailies",
    name: "dailies.now",
    eyebrow: "Daily word, number, and logic games",
    headline: "Four new puzzles every day.",
    description:
      "Dailies is free to play. Keep a streak, compare scores on the leaderboards, or open a room for party games with friends.",
    href: "https://dailies.now",
    spotlight: true,
    details: [
      "Four solo puzzles daily",
      "Streaks, scores, leaderboards",
      "Rooms, chat, and party games",
    ],
    media: {
      video: "./media/products/dailies/demo.mp4",
      webm: "./media/products/dailies/demo.webm",
      poster: "./media/products/dailies/poster.jpg",
      label: "Playing the Tally number puzzle in Dailies",
    },
  },
  {
    slug: "verbish",
    name: "verbish.now",
    eyebrow: "Reading practice at your own pace",
    headline: "Read faster. Stay focused.",
    description:
      "Load your own text or pick a public-domain classic. Set the pace, read one word at a time, and keep your progress across languages.",
    href: "https://verbish.now",
    spotlight: true,
    details: [
      "Your text or public-domain classics",
      "Adjustable pace, one word at a time",
      "Saved progress, multiple languages",
    ],
    media: {
      video: "./media/products/verbish/demo.mp4",
      webm: "./media/products/verbish/demo.webm",
      poster: "./media/products/verbish/poster.jpg",
      label: "Reading Alice in Wonderland with the Verbish focus reader",
      image: "./media/products/verbish/cover-1280.webp",
      imageAlt:
        "Verbish homepage with reading practice copy and a shelf of classic books",
    },
  },
] as const satisfies readonly SpotlightProduct[];

export const spotlightProducts = products
  .filter((product) => product.spotlight)
  .slice(0, 2);

export const indexedProducts = products.filter(
  (product) =>
    !spotlightProducts.some((spotlight) => spotlight.slug === product.slug),
);
