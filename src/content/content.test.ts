import { describe, expect, it } from "vitest";

import { experiences } from "./experience";
import { projectRecency, projects } from "./projects";
import { spotlightProducts } from "./products";
import { projectCategories } from "./types";

describe("portfolio content", () => {
  it("contains the intended launch catalog", () => {
    expect(projects.length).toBeGreaterThan(0);
    const orders = projects.map((project) => project.order);
    expect(new Set(orders).size).toBe(orders.length);
    expect(projects.map((project) => projectRecency(project.date))).toEqual(
      projects
        .map((project) => projectRecency(project.date))
        .toSorted((left, right) => right - left),
    );
  });

  it("uses unique slugs and valid categories", () => {
    const slugs = projects.map((project) => project.slug);
    expect(new Set(slugs).size).toBe(slugs.length);

    for (const project of projects) {
      expect(projectCategories).toContain(project.category);
      expect(projectRecency(project.date)).toBeGreaterThan(0);
    }
  });

  it("provides accessible local media and valid links", () => {
    for (const project of projects) {
      expect(project.media.length).toBeGreaterThan(0);
      for (const media of project.media) {
        if (media.type === "image") {
          expect(media.alt.trim().length).toBeGreaterThan(8);
          expect(media.src).toMatch(/^\.\/media\//);
        } else {
          expect(media.label.trim().length).toBeGreaterThan(8);
          expect(media.poster).toMatch(/^\.\/media\//);
        }
      }

      for (const link of project.links) {
        expect(() => new URL(link.href)).not.toThrow();
        expect(link.href).toMatch(/^https:\/\//);
      }
    }
  });

  it("contains the agreed professional timeline", () => {
    expect(experiences.map((experience) => experience.company)).toEqual([
      "MongoDB",
      "Addigy",
      "4Geeks Academy",
      "MongoDB",
      "MetLife",
    ]);
    expect(experiences[0].period).toBe("August 2023 to present");
  });

  it("defines distinct product spotlights with local demos", () => {
    expect(spotlightProducts.map((product) => product.slug)).toEqual([
      "dailies",
      "verbish",
    ]);

    for (const product of spotlightProducts) {
      expect(() => new URL(product.href)).not.toThrow();
      expect(product.media.video).toMatch(/^\.\/media\/products\//);
      expect(product.media.webm).toMatch(/^\.\/media\/products\//);
      expect(product.media.poster).toMatch(/^\.\/media\/products\//);
      expect(product.details).toHaveLength(3);
    }
  });
});
