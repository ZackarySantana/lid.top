import { render } from "@solidjs/web";
import { afterEach, describe, expect, it } from "vitest";

import App from "./App";
import { projects } from "./content/projects";
import { spotlightProducts } from "./content/products";

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

describe("product-focused personal site", () => {
  it("puts current products before the supporting archive", () => {
    const host = mountApp();

    expect(
      Array.from(host.querySelectorAll("h1 a"), (link) => link.textContent),
    ).toEqual(["dailies.now", "verbish.now"]);
    expect(host.querySelectorAll(".product-spotlight")).toHaveLength(
      spotlightProducts.length,
    );
    expect(host.querySelectorAll(".archive-row")).toHaveLength(projects.length);
    expect(host.querySelectorAll(".career-list > li")).toHaveLength(5);
  });

  it("links directly to both products and the contact address", () => {
    const host = mountApp();

    expect(
      host.querySelector<HTMLAnchorElement>(
        '.product-dailies a[href="https://dailies.now"]',
      ),
    ).not.toBeNull();
    expect(
      host.querySelector<HTMLAnchorElement>(
        '.product-verbish a[href="https://verbish.now"]',
      ),
    ).not.toBeNull();
    expect(
      host.querySelector<HTMLAnchorElement>(
        'a[href="mailto:contact@mail.lid.top"]',
      ),
    ).not.toBeNull();
    expect(host.textContent).not.toContain("Resume");
  });

  it("renders the supplied product demos as playable videos", () => {
    const host = mountApp();

    for (const product of spotlightProducts) {
      const video = host.querySelector<HTMLVideoElement>(
        `#${product.slug} video`,
      );
      expect(video).not.toBeNull();
      expect(video?.controls).toBe(true);
      expect(
        video?.querySelector('source[type="video/mp4"]')?.getAttribute("src"),
      ).toBe(product.media.video);
      expect(
        video?.querySelector('source[type="video/webm"]')?.getAttribute("src"),
      ).toBe(product.media.webm);
    }
  });

  it("keeps the project archive in true recency order", () => {
    const host = mountApp();
    const titles = Array.from(host.querySelectorAll(".archive-name")).map(
      (element) => element.textContent?.trim(),
    );

    expect(titles.slice(0, 4)).toEqual([
      "TREK Assistant",
      "TREK Rankings",
      "gitreview",
      "Nocuft",
    ]);
  });

  it("searches and filters projects using specific project types", async () => {
    const host = mountApp();
    const openCodeFilter = Array.from(
      host.querySelectorAll<HTMLButtonElement>(".archive-filters button"),
    ).find((button) => button.textContent?.startsWith("OpenCode Plugin"));

    expect(openCodeFilter).toBeDefined();
    openCodeFilter!.click();
    await Promise.resolve();
    expect(host.querySelectorAll(".archive-row")).toHaveLength(4);
    expect(
      Array.from(host.querySelectorAll(".archive-meta"), (meta) =>
        meta.textContent?.trim(),
      ),
    ).toEqual(Array(4).fill("OpenCode Plugin"));

    const search = host.querySelector<HTMLInputElement>(
      ".archive-search input",
    );
    search!.value = "later";
    search!.dispatchEvent(new InputEvent("input", { bubbles: true }));
    await Promise.resolve();
    expect(host.querySelectorAll(".archive-row")).toHaveLength(1);
    expect(host.querySelector(".archive-name")?.textContent).toContain(
      "opencode-later",
    );
  });

  it("shows technology tags without project numbers or visible dates", () => {
    const host = mountApp();

    expect(
      host.querySelectorAll(".archive-tags button").length,
    ).toBeGreaterThan(projects.length);
    expect(host.querySelector(".archive-number")).toBeNull();
    for (const meta of host.querySelectorAll(".archive-meta")) {
      expect(meta.textContent).not.toMatch(/\b20\d{2}\b/);
    }
  });

  it("keeps project images and videos available in the archive", () => {
    const host = mountApp();

    expect(host.querySelectorAll(".archive-media-button")).toHaveLength(
      projects.length,
    );
    expect(
      host.querySelector(
        '.archive-media-dialog video[aria-label="Nocuft compiling and deploying a DiamondFire project"]',
      ),
    ).not.toBeNull();
    expect(
      host
        .querySelector<HTMLImageElement>(
          '.archive-media-dialog img[alt="GitNotes displaying an interactive note above a GitHub commit diff"]',
        )
        ?.getAttribute("src"),
    ).toBe("./media/projects/gitnotes/cover-1280.webp");
  });

  it("prefers a live project destination in the compact archive", () => {
    const host = mountApp();
    const gitNotes = Array.from(host.querySelectorAll(".archive-row")).find(
      (row) => row.querySelector(".archive-name")?.textContent === "GitNotes",
    );

    expect(gitNotes?.querySelector<HTMLAnchorElement>("a")?.href).toBe(
      "https://chromewebstore.google.com/detail/gitnotes/inhgnndenedfophhcbpjdocjkdgomklm",
    );
  });

  it("uses the current Moondust docs URL", () => {
    const moondust = projects.find((project) => project.slug === "moondust");

    expect(moondust?.links.find((link) => link.kind === "docs")?.href).toBe(
      "https://zackarysantana.github.io/moondust/",
    );
  });
});
