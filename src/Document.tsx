import "@fontsource-variable/instrument-sans";
import "@fontsource/ibm-plex-mono/latin-400.css";
import { HydrationScript, type JSX } from "@solidjs/web";
import type { ParentProps } from "solid-js";

import "./styles/global.css";

const description =
  "dailies.now and verbish.now by Zackary Santana, a software engineer at MongoDB.";

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

        <title>Zackary Santana | dailies.now, verbish.now</title>
        <link rel="canonical" href="https://lid.top/" />
        <link rel="icon" href="./favicon.svg" type="image/svg+xml" />
        <link rel="manifest" href="./site.webmanifest" />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="lid.top" />
        <meta
          property="og:title"
          content="Zackary Santana | dailies.now, verbish.now"
        />
        <meta property="og:description" content={description} />
        <meta property="og:url" content="https://lid.top/" />
        <meta property="og:image" content="https://lid.top/social-card.png" />
        <meta
          property="og:image:alt"
          content="Zackary Santana, dailies.now and verbish.now"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Zackary Santana | dailies.now, verbish.now"
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
            email: "mailto:contact@mail.lid.top",
            jobTitle: "Software Engineer III",
            worksFor: {
              "@type": "Organization",
              name: "MongoDB",
            },
            sameAs: [
              "https://github.com/ZackarySantana",
              "https://www.linkedin.com/in/zackary-santana/",
            ],
            knowsAbout: [
              "Product engineering",
              "Developer tools",
              "Web applications",
            ],
          })}
        />
        <HydrationScript />
      </head>
      <body>{props.children}</body>
    </html>
  );
}
