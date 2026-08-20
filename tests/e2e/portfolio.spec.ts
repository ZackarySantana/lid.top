import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("leads with products and keeps the broader archive available", async ({
  page,
}) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    /dailies\.now\s*verbish\.now/,
  );
  await expect(page.locator(".product-spotlight")).toHaveCount(2);
  await expect(
    page.getByRole("heading", { name: "Four new puzzles every day." }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Read faster. Stay focused." }),
  ).toBeVisible();

  await page.locator("details.archive-disclosure > summary").click();
  expect(await page.locator(".archive-row").count()).toBeGreaterThan(0);
  await expect(page.locator(".archive-number")).toHaveCount(0);
  await page.getByRole("button", { name: /OpenCode Plugin 4/ }).click();
  await expect(page.locator(".archive-row")).toHaveCount(4);
  await page.getByPlaceholder("Search projects").fill("later");
  await expect(page.locator(".archive-row")).toHaveCount(1);
  await expect(page.locator(".archive-name")).toContainText("opencode-later");
  await page.getByPlaceholder("Search projects").fill("");
  await page.getByRole("button", { name: /All 18/ }).click();
  await expect(
    page.locator(".archive-name", { hasText: "GitNotes" }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: /View .* demo/ })
    .first()
    .click();
  await expect(page.locator(".archive-media-dialog[open]")).toHaveCount(1);
  await page.getByRole("button", { name: "Close" }).click();

  await expect(
    page.getByRole("link", { name: "contact@mail.lid.top" }),
  ).toHaveAttribute("href", "mailto:contact@mail.lid.top");
  await expect(page.getByText("Resume", { exact: true })).toHaveCount(0);
});

test("has no automatically detectable accessibility violations", async ({
  page,
}) => {
  await page.goto("/");
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});

test("keeps product and archive content when JavaScript is disabled", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4173/");

  await expect(page.locator(".product-spotlight")).toHaveCount(2);
  expect(await page.locator(".archive-row").count()).toBeGreaterThan(0);
  await expect(
    page.locator("#about").getByRole("heading", {
      name: "Software Engineer III at MongoDB.",
    }),
  ).toBeVisible();
  await expect(page.locator("#dailies video source")).toHaveCount(2);
  await expect(page.locator("#verbish video source")).toHaveCount(2);

  await context.close();
});
