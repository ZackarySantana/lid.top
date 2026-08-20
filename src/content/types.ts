export const projectCategories = [
  "Developer Tool",
  "Product",
  "Library",
  "Extension",
  "Community",
  "Game",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export interface ProjectLink {
  label: string;
  href: string;
  kind: "source" | "demo" | "package" | "docs" | "store";
}

export interface ImageMedia {
  type: "image";
  src: string;
  srcSet?: string;
  alt: string;
  caption?: string;
}

export interface VideoMedia {
  type: "video";
  src: string;
  webmSrc?: string;
  poster: string;
  label: string;
  caption?: string;
  captions?: string;
}

export type ProjectMedia = ImageMedia | VideoMedia;

export interface Project {
  slug: string;
  title: string;
  eyebrow: string;
  year: string;
  date: string;
  shortDescription: string;
  description: string;
  category: ProjectCategory;
  technologies: readonly string[];
  links: readonly ProjectLink[];
  media: readonly ProjectMedia[];
  /** Reserved for future curation. It does not create a separate section. */
  featured?: boolean;
  order: number;
}

export interface ProjectModule {
  default: Project;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  location?: string;
  summary: string;
  highlights: readonly string[];
}

export function defineProject(project: Project): Project {
  return project;
}
