import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";
import { execFile } from "node:child_process";
import {
  mkdir,
  readdir,
  readFile,
  stat,
  writeFile,
  copyFile,
} from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import sharp from "sharp";

const execFileAsync = promisify(execFile);
const root = process.cwd();
const projectContentDirectory = path.join(root, "src/content/projects");
const sourceRoot = path.join(root, "media-source/projects");
const outputRoot = path.join(root, "public/media/projects");
const imageExtensions = [".png", ".jpg", ".jpeg", ".webp", ".avif", ".svg"];
const videoExtensions = [".mp4", ".mov", ".m4v", ".webm"];

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function wrapTitle(value, maxLength = 22) {
  const words = value.split(/\s+/);
  const lines = [];
  let line = "";

  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (line && candidate.length > maxLength) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }

  if (line) lines.push(line);
  return lines.slice(0, 2);
}

function fallbackCover(project) {
  const titleLines = wrapTitle(project.title);
  const longestLine = Math.max(...titleLines.map((line) => line.length), 1);
  const fontSize = Math.max(58, Math.min(88, (88 * 22) / longestLine));
  const lineHeight = fontSize * 1.12;
  const firstBaseline = 420 - ((titleLines.length - 1) * lineHeight) / 2;
  const title = titleLines
    .map(
      (line, index) =>
        `<text x="104" y="${firstBaseline + index * lineHeight}" fill="#eceef2" font-family="Arial, sans-serif" font-size="${fontSize}" font-weight="600" letter-spacing="-3">${escapeXml(line)}</text>`,
    )
    .join("");
  const label = escapeXml(project.eyebrow.toUpperCase());
  return Buffer.from(`
    <svg width="1280" height="800" viewBox="0 0 1280 800" xmlns="http://www.w3.org/2000/svg">
      <rect width="1280" height="800" fill="#222934"/>
      <path d="M80 88h1120M80 712h1120" stroke="#525c6b"/>
      <text x="80" y="145" fill="#7c8695" font-family="monospace" font-size="20" letter-spacing="3">${label}</text>
      <rect x="80" y="315" width="8" height="170" fill="#6a9dff"/>
      ${title}
      <text x="80" y="665" fill="#7c8695" font-family="monospace" font-size="18" letter-spacing="2">ZACKARY SANTANA / LID.TOP</text>
      <circle cx="1188" cy="654" r="9" fill="#6a9dff"/>
    </svg>
  `);
}

async function projectDefinitions() {
  const files = (await readdir(projectContentDirectory)).filter((file) =>
    file.endsWith(".ts"),
  );
  const definitions = [];

  for (const file of files) {
    const source = await readFile(
      path.join(projectContentDirectory, file),
      "utf8",
    );
    const slug = source.match(/slug:\s*"([^"]+)"/)?.[1];
    const title = source.match(/title:\s*"([^"]+)"/)?.[1];
    const eyebrow = source.match(/eyebrow:\s*"([^"]+)"/)?.[1];
    if (!slug || !title || !eyebrow)
      throw new Error(`Could not read project metadata from ${file}`);
    definitions.push({ slug, title, eyebrow });
  }

  return definitions;
}

async function optionalDirectoryFiles(directory) {
  try {
    return await readdir(directory);
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
}

async function prepareImage(project, sourceDirectory, outputDirectory) {
  const files = await optionalDirectoryFiles(sourceDirectory);
  const imageNames = files.filter((file) =>
    imageExtensions.includes(path.extname(file).toLowerCase()),
  );
  const coverName =
    imageNames.find(
      (file) => path.parse(file).name.toLowerCase() === "cover",
    ) ?? imageNames[0];
  const input = coverName
    ? path.join(sourceDirectory, coverName)
    : fallbackCover(project);

  await Promise.all([
    sharp(input)
      .resize(640, 400, { fit: "cover", position: "attention" })
      .webp({ quality: 82 })
      .toFile(path.join(outputDirectory, "cover-640.webp")),
    sharp(input)
      .resize(1280, 800, { fit: "cover", position: "attention" })
      .webp({ quality: 84 })
      .toFile(path.join(outputDirectory, "cover-1280.webp")),
    sharp(input)
      .resize(1280, 800, { fit: "cover", position: "attention" })
      .avif({ quality: 56 })
      .toFile(path.join(outputDirectory, "cover-1280.avif")),
    sharp(input)
      .resize(640, 400, { fit: "cover", position: "attention" })
      .avif({ quality: 54 })
      .toFile(path.join(outputDirectory, "cover-640.avif")),
  ]);
}

async function prepareVideo(sourceDirectory, outputDirectory) {
  const files = await optionalDirectoryFiles(sourceDirectory);
  const videoName = files.find((file) =>
    videoExtensions.includes(path.extname(file).toLowerCase()),
  );
  if (!videoName) return;

  const input = path.join(sourceDirectory, videoName);
  const sourceStats = await stat(input);
  if (sourceStats.size > 80 * 1024 * 1024) {
    throw new Error(`${input} exceeds the 80 MB source media limit`);
  }

  await execFileAsync(ffmpegInstaller.path, [
    "-y",
    "-i",
    input,
    "-vf",
    "scale='min(1280,iw)':-2",
    "-movflags",
    "+faststart",
    "-pix_fmt",
    "yuv420p",
    "-crf",
    "25",
    path.join(outputDirectory, "demo.mp4"),
  ]);
  await execFileAsync(ffmpegInstaller.path, [
    "-y",
    "-i",
    input,
    "-vf",
    "scale='min(1280,iw)':-2",
    "-c:v",
    "libvpx-vp9",
    "-crf",
    "34",
    "-b:v",
    "0",
    "-an",
    path.join(outputDirectory, "demo.webm"),
  ]);
  await execFileAsync(ffmpegInstaller.path, [
    "-y",
    "-ss",
    "00:00:01",
    "-i",
    input,
    "-frames:v",
    "1",
    "-vf",
    "scale='min(1280,iw)':-2",
    path.join(outputDirectory, "poster.jpg"),
  ]);

  if (files.includes("captions.vtt")) {
    await copyFile(
      path.join(sourceDirectory, "captions.vtt"),
      path.join(outputDirectory, "captions.vtt"),
    );
  }
}

await mkdir(outputRoot, { recursive: true });
const projects = await projectDefinitions();

for (const project of projects) {
  const sourceDirectory = path.join(sourceRoot, project.slug);
  const outputDirectory = path.join(outputRoot, project.slug);
  await mkdir(outputDirectory, { recursive: true });
  await prepareImage(project, sourceDirectory, outputDirectory);
  await prepareVideo(sourceDirectory, outputDirectory);
}

await sharp(path.join(root, "public/social-card.svg"))
  .png({ compressionLevel: 9, palette: true })
  .toFile(path.join(root, "public/social-card.png"));

await writeFile(
  path.join(outputRoot, "manifest.json"),
  `${JSON.stringify({ generatedAt: new Date().toISOString(), projects: projects.map(({ slug }) => slug) }, null, 2)}\n`,
);

console.log(`Prepared media for ${projects.length} projects.`);
