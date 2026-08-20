import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("renders and filters the project index", async ({ page }, testInfo) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "build tools",
  );
  expect(await page.locator(".project-card").count()).toBeGreaterThan(0);
  await expect(page.locator("#featured")).toHaveCount(0);

  if (testInfo.project.name === "mobile-chromium") {
    await page.locator(".filter-select select").selectOption("Library");
  } else {
    await page.getByRole("button", { name: /^Library/ }).click();
  }
  expect(await page.locator(".project-card").count()).toBeGreaterThan(0);
  await expect(
    page.locator('.project-card:not([data-category="Library"])'),
  ).toHaveCount(0);

  if (testInfo.project.name === "mobile-chromium") {
    await page.locator(".filter-select select").selectOption("All");
  } else {
    await page.getByRole("button", { name: /^All/ }).click();
  }
  await page
    .getByRole("searchbox", { name: "Search projects" })
    .fill("GitNotes");
  await expect(page.locator(".project-card")).toHaveCount(1);
  await expect(
    page.locator(".project-card").getByRole("heading", { name: "GitNotes" }),
  ).toBeVisible();

  await page
    .getByRole("searchbox", { name: "Search projects" })
    .fill("no matching project");
  await expect(
    page.getByRole("heading", { name: "No projects found." }),
  ).toBeVisible();
});

test("has no automatically detectable accessibility violations", async ({
  page,
}) => {
  await page.goto("/");
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});

test("keeps all portfolio content when JavaScript is disabled", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4173/");

  expect(await page.locator(".project-card").count()).toBeGreaterThan(0);
  await expect(
    page.getByRole("searchbox", { name: "Search projects" }),
  ).toHaveCount(1);
  await expect(page.getByRole("heading", { name: "Experience" })).toBeVisible();

  await context.close();
});
