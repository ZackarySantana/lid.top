import type { ProjectModule } from "./types";

const modules = import.meta.glob<ProjectModule>("./projects/*.ts", {
  eager: true,
});

export const projects = Object.values(modules)
  .map((module) => module.default)
  .sort(
    (left, right) =>
      projectRecency(right.date) - projectRecency(left.date) ||
      left.order - right.order,
  );

export function projectRecency(date: string): number {
  const timestamp = Date.parse(date);
  if (Number.isNaN(timestamp)) throw new Error(`Invalid project date: ${date}`);
  return timestamp;
}
