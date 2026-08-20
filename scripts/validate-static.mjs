import { access, readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const output = path.join(root, "dist/client");
const htmlPath = path.join(output, "index.html");
const html = await readFile(htmlPath, "utf8");

const requiredText = [
  "Zackary Santana",
  "dailies.now",
  "verbish.now",
  "contact@mail.lid.top",
  "Other work",
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

const archiveRows = html.match(/class="archive-row"/g)?.length ?? 0;
if (archiveRows === 0) throw new Error("Static HTML contains no archive rows");

const productSpotlights =
  html.match(/class="product-spotlight product-/g)?.length ?? 0;
if (productSpotlights === 0)
  throw new Error("Static HTML contains no product spotlights");
const productIndexRows = html.match(/class="product-index-item"/g)?.length ?? 0;

for (const file of [
  "404.html",
  "favicon.svg",
  "robots.txt",
  "sitemap.xml",
  "site.webmanifest",
  "social-card.png",
]) {
  await access(path.join(output, file));
}

const mediaManifest = JSON.parse(
  await readFile(path.join(output, "media/projects/manifest.json"), "utf8"),
);
if (mediaManifest.items.length !== archiveRows) {
  throw new Error(
    `Expected media for ${archiveRows} projects, found ${mediaManifest.items.length}`,
  );
}

for (const slug of mediaManifest.items) {
  const file = path.join(output, "media/projects", slug, "cover-1280.webp");
  const fileStats = await stat(file);
  if (fileStats.size > 900 * 1024)
    throw new Error(`${file} exceeds the 900 KB image budget`);
  await access(path.join(output, "media/projects", slug, "cover-640.avif"));
}

const productMediaManifest = JSON.parse(
  await readFile(path.join(output, "media/products/manifest.json"), "utf8"),
);
const productRecords = productSpotlights + productIndexRows;
if (productMediaManifest.items.length !== productRecords) {
  throw new Error(
    `Expected media for ${productRecords} products, found ${productMediaManifest.items.length}`,
  );
}

for (const slug of productMediaManifest.items) {
  const directory = path.join(output, "media/products", slug);
  await access(path.join(directory, "demo.mp4"));
  await access(path.join(directory, "demo.webm"));
  await access(path.join(directory, "poster.jpg"));
  await access(path.join(directory, "cover-1280.webp"));
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
