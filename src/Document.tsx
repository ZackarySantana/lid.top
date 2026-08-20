import "@fontsource-variable/instrument-sans";
import "@fontsource/ibm-plex-mono/latin-400.css";
import { HydrationScript, type JSX } from "@solidjs/web";
import type { ParentProps } from "solid-js";

import "./styles/global.css";

const description =
  "Zackary Santana builds developer tools, CI/CD systems, infrastructure, and polished web products.";

export default function Document(props: ParentProps): JSX.Element {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0b0d11" />
        <meta name="color-scheme" content="dark" />
        <meta name="description" content={description} />
        <meta name="author" content="Zackary Santana" />
        <meta name="robots" content="index, follow" />

        <title>Zackary Santana | Software Engineer</title>
        <link rel="canonical" href="https://lid.top/" />
        <link rel="icon" href="./favicon.svg" type="image/svg+xml" />
        <link rel="manifest" href="./site.webmanifest" />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="lid.top" />
        <meta
          property="og:title"
          content="Zackary Santana | Software Engineer"
        />
        <meta property="og:description" content={description} />
        <meta property="og:url" content="https://lid.top/" />
        <meta property="og:image" content="https://lid.top/social-card.png" />
        <meta
          property="og:image:alt"
          content="Zackary Santana, software engineer"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Zackary Santana | Software Engineer"
        />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="https://lid.top/social-card.png" />

        <script
          type="application/ld+json"
          textContent={JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Zackary Santana",
            url: "https://lid.top/",
            jobTitle: "Software Engineer III",
            worksFor: {
              "@type": "Organization",
              name: "MongoDB",
            },
            sameAs: [
              "https://github.com/ZackarySantana",
              "https://www.linkedin.com/in/zackary-santana/",
            ],
          })}
        />
        <HydrationScript />
      </head>
      <body>{props.children}</body>
    </html>
  );
}
