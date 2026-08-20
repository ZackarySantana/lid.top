import { access, readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const output = path.join(root, "dist/client");
const htmlPath = path.join(output, "index.html");
const html = await readFile(htmlPath, "utf8");

const requiredText = [
  "Zackary Santana",
  "Work",
  "Experience",
  "GitNotes",
  "gitreview",
  "opencode-later",
  "Nocuft",
  "Moondust",
  "MetLife",
];

for (const text of requiredText) {
  if (!html.includes(text)) throw new Error(`Static HTML is missing: ${text}`);
}

const projectCards =
  html.match(/class="project-card(?: is-unlinked)?\s*"/g)?.length ?? 0;
if (projectCards === 0)
  throw new Error("Static HTML contains no project cards");

for (const file of [
  "404.html",
  "favicon.svg",
  "robots.txt",
  "sitemap.xml",
  "site.webmanifest",
  "social-card.png",
  "Zackary-Santana-Resume.pdf",
]) {
  await access(path.join(output, file));
}

const mediaManifest = JSON.parse(
  await readFile(path.join(output, "media/projects/manifest.json"), "utf8"),
);
if (mediaManifest.projects.length !== projectCards) {
  throw new Error(
    `Expected media for ${projectCards} projects, found ${mediaManifest.projects.length}`,
  );
}

for (const slug of mediaManifest.projects) {
  const file = path.join(output, "media/projects", slug, "cover-1280.webp");
  const fileStats = await stat(file);
  if (fileStats.size > 900 * 1024)
    throw new Error(`${file} exceeds the 900 KB image budget`);
  await access(path.join(output, "media/projects", slug, "cover-640.avif"));
}

const writtenExtensions = new Set([
  ".ts",
  ".tsx",
  ".css",
  ".html",
  ".md",
  ".json",
  ".mjs",
]);
const ignoredDirectories = new Set([
  ".git",
  "dist",
  "node_modules",
  "public",
  "media-source",
]);

async function scan(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.isDirectory() && ignoredDirectories.has(entry.name)) continue;
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await scan(target);
      continue;
    }
    if (!writtenExtensions.has(path.extname(entry.name))) continue;
    const source = await readFile(target, "utf8");
    if (source.includes("\u2014"))
      throw new Error(`Em dash found in written file: ${target}`);
  }
}

await scan(root);
console.log("Static output validated.");
