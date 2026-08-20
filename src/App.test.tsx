import { render } from "@solidjs/web";
import { afterEach, describe, expect, it } from "vitest";

import App from "./App";
import { projects } from "./content/projects";

const disposals: Array<() => void> = [];

function mountApp() {
  const host = document.createElement("div");
  document.body.append(host);
  disposals.push(render(() => <App />, host));
  return host;
}

afterEach(() => {
  while (disposals.length) disposals.pop()?.();
  document.body.replaceChildren();
});

describe("portfolio application", () => {
  it("renders the static portfolio structure", () => {
    const host = mountApp();

    expect(host.querySelector("h1")?.textContent).toContain("build tools");
    expect(host.querySelectorAll(".project-card")).toHaveLength(
      projects.length,
    );
    expect(host.querySelectorAll(".experience-index > li")).toHaveLength(5);
  });

  it("filters the project catalog by search text", async () => {
    const host = mountApp();
    const search = host.querySelector<HTMLInputElement>('input[type="search"]');
    expect(search).not.toBeNull();

    search!.value = "GitNotes";
    search!.dispatchEvent(
      new InputEvent("input", { bubbles: true, data: "GitNotes" }),
    );
    await Promise.resolve();

    expect(host.querySelectorAll(".project-card")).toHaveLength(1);
    expect(host.querySelector(".project-card h3")?.textContent).toBe(
      "GitNotes",
    );
  });

  it("renders a useful empty state", async () => {
    const host = mountApp();
    const search = host.querySelector<HTMLInputElement>('input[type="search"]');

    search!.value = "definitely not a project";
    search!.dispatchEvent(new InputEvent("input", { bubbles: true }));
    await Promise.resolve();

    expect(host.querySelector(".empty-state h3")?.textContent).toBe(
      "No projects found.",
    );
  });

  it("prefers a project's live destination for the card click", () => {
    const host = mountApp();
    const gitNotes = Array.from(host.querySelectorAll(".project-card")).find(
      (card) => card.querySelector("h3")?.textContent === "GitNotes",
    );

    expect(
      gitNotes?.querySelector<HTMLAnchorElement>(".card-title a")?.href,
    ).toBe(
      "https://chromewebstore.google.com/detail/gitnotes/inhgnndenedfophhcbpjdocjkdgomklm",
    );
  });

  it("renders projects in true recency order", () => {
    const host = mountApp();
    const titles = Array.from(host.querySelectorAll(".project-card h3")).map(
      (heading) => heading.textContent,
    );

    expect(titles.slice(0, 4)).toEqual([
      "TREK Assistant",
      "TREK Rankings",
      "gitreview",
      "Nocuft",
    ]);
  });

  it("uses the current Moondust docs URL", () => {
    const moondust = projects.find((project) => project.slug === "moondust");

    expect(moondust?.links.find((link) => link.kind === "docs")?.href).toBe(
      "https://zackarysantana.github.io/moondust/",
    );
  });

  it("renders the final Nocuft demo as a playable video", () => {
    const host = mountApp();
    const video = host.querySelector<HTMLVideoElement>(
      'video[aria-label="Nocuft compiling and deploying a DiamondFire project"]',
    );

    expect(video).not.toBeNull();
    expect(video?.controls).toBe(true);
    expect(
      video?.querySelector('source[type="video/mp4"]')?.getAttribute("src"),
    ).toBe("./media/projects/nocuft/demo.mp4");
    expect(
      video?.querySelector('source[type="video/webm"]')?.getAttribute("src"),
    ).toBe("./media/projects/nocuft/demo.webm");
  });

  it("renders the MongoDB OpenFeature demo as a playable video", () => {
    const host = mountApp();
    const video = host.querySelector<HTMLVideoElement>(
      'video[aria-label="MongoDB OpenFeature provider and editor demonstration"]',
    );

    expect(video).not.toBeNull();
    expect(video?.controls).toBe(true);
    expect(
      video?.querySelector('source[type="video/mp4"]')?.getAttribute("src"),
    ).toBe("./media/projects/openfeature-go/demo.mp4");
    expect(
      video?.querySelector('source[type="video/webm"]')?.getAttribute("src"),
    ).toBe("./media/projects/openfeature-go/demo.webm");
  });

  it("renders the Moondust demo as a playable video", () => {
    const host = mountApp();
    const video = host.querySelector<HTMLVideoElement>(
      'video[aria-label="Moondust local application demonstration"]',
    );

    expect(video).not.toBeNull();
    expect(video?.controls).toBe(true);
    expect(
      video?.querySelector('source[type="video/mp4"]')?.getAttribute("src"),
    ).toBe("./media/projects/moondust/demo.mp4");
    expect(
      video?.querySelector('source[type="video/webm"]')?.getAttribute("src"),
    ).toBe("./media/projects/moondust/demo.webm");
  });
});
