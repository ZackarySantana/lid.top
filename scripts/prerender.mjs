import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const serverEntry = path.join(root, "dist/server/server.js");
const outputFile = path.join(root, "dist/client/index.html");
const server = await import(
  `${pathToFileURL(serverEntry).href}?build=${Date.now()}`
);
const response = await server.handleRequest(new Request("https://lid.top/"));

if (!response.ok) {
  throw new Error(
    `Prerender returned ${response.status} ${response.statusText}`,
  );
}

const html = await response.text();
if (!html.includes("Zackary Santana") || !html.includes("GitNotes")) {
  throw new Error("Prerendered document is missing expected portfolio content");
}

await mkdir(path.dirname(outputFile), { recursive: true });
await writeFile(outputFile, html);
console.log(`Prerendered ${outputFile}`);
