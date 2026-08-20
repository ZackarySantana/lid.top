import { type JSX } from "@solidjs/web";
import { For, createMemo, createSignal, type ParentProps } from "solid-js";

import { experiences } from "./content/experience";
import { projects } from "./content/projects";
import { site } from "./content/site";
import {
  projectCategories,
  type Project,
  type ProjectCategory,
  type ProjectLink,
} from "./content/types";

type CatalogCategory = "All" | ProjectCategory;

const linkPriority: readonly ProjectLink["kind"][] = [
  "demo",
  "store",
  "docs",
  "package",
  "source",
];

function ArrowIcon(): JSX.Element {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M4 12 12 4M5 4h7v7" />
    </svg>
  );
}

function ExternalLink(
  props: ParentProps<{
    href: string;
    class?: string;
    download?: string;
  }>,
): JSX.Element {
  return (
    <a
      class={props.class}
      href={props.href}
      target={props.download ? undefined : "_blank"}
      rel={props.download ? undefined : "noreferrer"}
      download={props.download}
    >
      <span>{props.children}</span>
      <ArrowIcon />
    </a>
  );
}

function primaryLink(project: Project): ProjectLink | undefined {
  for (const kind of linkPriority) {
    const link = project.links.find((candidate) => candidate.kind === kind);
    if (link) return link;
  }
  return project.links[0];
}

function orderedLinks(project: Project): readonly ProjectLink[] {
  return [...project.links].sort(
    (left, right) =>
      linkPriority.indexOf(left.kind) - linkPriority.indexOf(right.kind),
  );
}

function ProjectCard(props: { project: Project; index: number }): JSX.Element {
  const cover = () => props.project.media[0];
  const mainLink = () => primaryLink(props.project);
  const imageSource = () => {
    const media = cover();
    return media?.type === "video" ? media.poster : media?.src;
  };
  const imageAlt = () => {
    const media = cover();
    return media?.type === "video" ? media.label : media?.alt;
  };
  const avifSourceSet = () => {
    const media = cover();
    return media?.type === "image"
      ? `${media.src.replace("cover-1280.webp", "cover-640.avif")} 640w, ${media.src.replace("cover-1280.webp", "cover-1280.avif")} 1280w`
      : undefined;
  };
  const imageSrcSet = () => {
    const media = cover();
    return media?.type === "image" ? media.srcSet : undefined;
  };
  const videoMedia = () => {
    const media = cover();
    return media?.type === "video" ? media : undefined;
  };

  return (
    <article
      class={{ "project-card": true, "is-unlinked": !mainLink() }}
      data-category={props.project.category}
    >
      <div class="card-media">
        {imageSource() ? (
          cover()?.type === "image" ? (
            <picture>
              <source
                type="image/avif"
                srcset={avifSourceSet()}
                sizes="(min-width: 1180px) 536px, (min-width: 760px) 46vw, calc(100vw - 32px)"
              />
              <img
                src={imageSource()}
                srcset={imageSrcSet()}
                sizes="(min-width: 1180px) 536px, (min-width: 760px) 46vw, calc(100vw - 32px)"
                alt={imageAlt() ?? ""}
                loading={props.index < 2 ? "eager" : "lazy"}
                fetchpriority={props.index < 2 ? "high" : "auto"}
                decoding="async"
                width="1280"
                height="800"
              />
            </picture>
          ) : (
            <video
              controls
              playsinline
              preload="metadata"
              poster={videoMedia()?.poster}
              aria-label={videoMedia()?.label}
            >
              {videoMedia()?.webmSrc ? (
                <source src={videoMedia()!.webmSrc} type="video/webm" />
              ) : null}
              <source src={videoMedia()!.src} type="video/mp4" />
              {videoMedia()?.captions ? (
                <track
                  kind="captions"
                  src={videoMedia()!.captions}
                  srclang="en"
                  label="English"
                />
              ) : null}
            </video>
          )
        ) : null}
      </div>

      <div class="card-body">
        <p class="card-meta">
          {props.project.category} · {props.project.year}
        </p>
        {mainLink() ? (
          <h3 class="card-title">
            <a href={mainLink()!.href} target="_blank" rel="noreferrer">
              {props.project.title}
            </a>
          </h3>
        ) : (
          <h3 class="card-title">{props.project.title}</h3>
        )}
        <p class="card-description">{props.project.shortDescription}</p>
        <p class="card-technologies">
          {props.project.technologies.join(" · ")}
        </p>
        <div class="card-links">
          {props.project.links.length ? (
            <For each={orderedLinks(props.project)}>
              {(link) => (
                <ExternalLink href={link.href}>{link.label}</ExternalLink>
              )}
            </For>
          ) : (
            <span>Archive project</span>
          )}
        </div>
      </div>
    </article>
  );
}

function App(): JSX.Element {
  const [query, setQuery] = createSignal("");
  const [category, setCategory] = createSignal<CatalogCategory>("All");

  const categoryOptions = ["All", ...projectCategories] as const;
  const categoryCount = (item: CatalogCategory) =>
    item === "All"
      ? projects.length
      : projects.filter((project) => project.category === item).length;

  const visibleProjects = createMemo(() => {
    const normalizedQuery = query().trim().toLowerCase();
    const activeCategory = category();

    return projects.filter((project) => {
      const matchesCategory =
        activeCategory === "All" || project.category === activeCategory;
      const searchText = [
        project.title,
        project.shortDescription,
        project.description,
        project.category,
        ...project.technologies,
      ]
        .join(" ")
        .toLowerCase();

      return (
        matchesCategory &&
        (!normalizedQuery || searchText.includes(normalizedQuery))
      );
    });
  });

  return (
    <>
      <a class="skip-link" href="#main-content">
        Skip to content
      </a>

      <header class="site-header">
        <div class="header-inner">
          <a class="wordmark" href="#top" aria-label="lid.top home">
            lid<span>.</span>top
          </a>
          <nav aria-label="Primary navigation">
            <a href="#work">Work</a>
            <a href="#experience">Experience</a>
            <a href={site.resume} download="Zackary-Santana-Resume.pdf">
              Resume
            </a>
          </nav>
        </div>
      </header>

      <main id="main-content">
        <section class="intro shell" id="top" aria-labelledby="intro-title">
          <p class="intro-label">
            {site.name} <span>/</span> {site.role}
          </p>
          <h1 id="intro-title">{site.headline}</h1>
          <p class="intro-copy">{site.introduction}</p>
          <div class="intro-links">
            <ExternalLink href={site.github}>GitHub</ExternalLink>
            <ExternalLink href={site.linkedin}>LinkedIn</ExternalLink>
            <ExternalLink
              href={site.resume}
              download="Zackary-Santana-Resume.pdf"
            >
              Resume
            </ExternalLink>
          </div>
        </section>

        <section
          class="work-section shell"
          id="work"
          aria-labelledby="work-title"
        >
          <div class="section-header">
            <h2 id="work-title">Work</h2>
            <p>
              Projects across developer tools, products, libraries, extensions,
              community work, and games.
            </p>
          </div>

          <div class="project-controls" aria-label="Project filters">
            <label class="search-field">
              <span class="sr-only">Search projects</span>
              <svg viewBox="0 0 20 20" aria-hidden="true">
                <circle cx="8.5" cy="8.5" r="5.5" />
                <path d="m13 13 4 4" />
              </svg>
              <input
                type="search"
                value={query()}
                onInput={(event) => setQuery(event.currentTarget.value)}
                placeholder="Search projects"
              />
            </label>

            <div
              class="filter-list"
              role="group"
              aria-label="Filter by category"
            >
              <For each={categoryOptions}>
                {(item) => (
                  <button
                    type="button"
                    class={{ active: category() === item }}
                    aria-pressed={category() === item ? "true" : "false"}
                    onClick={() => setCategory(item)}
                  >
                    {item} <span>{categoryCount(item)}</span>
                  </button>
                )}
              </For>
            </div>

            <label class="filter-select">
              <span class="sr-only">Filter by category</span>
              <select
                value={category()}
                onChange={(event) =>
                  setCategory(event.currentTarget.value as CatalogCategory)
                }
              >
                <For each={categoryOptions}>
                  {(item) => (
                    <option value={item}>
                      {item} ({categoryCount(item)})
                    </option>
                  )}
                </For>
              </select>
            </label>
          </div>

          <p class="sr-only" aria-live="polite">
            {visibleProjects().length} project results
          </p>

          {visibleProjects().length ? (
            <div class="project-grid">
              <For each={visibleProjects()}>
                {(project, index) => (
                  <ProjectCard project={project} index={index()} />
                )}
              </For>
            </div>
          ) : (
            <div class="empty-state">
              <h3>No projects found.</h3>
              <p>Try another search or category.</p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setCategory("All");
                }}
              >
                Clear filters
              </button>
            </div>
          )}
        </section>

        <section
          class="experience-section shell"
          id="experience"
          aria-labelledby="experience-title"
        >
          <div class="section-header">
            <h2 id="experience-title">Experience</h2>
            <p>
              Software for engineering organizations, product teams, and new
              developers.
            </p>
          </div>

          <ol class="experience-index">
            <For each={experiences}>
              {(experience, index) => (
                <li>
                  <span class="row-number" aria-hidden="true">
                    {String(index() + 1).padStart(2, "0")}
                  </span>
                  <article>
                    <div class="experience-heading">
                      <div>
                        <h3>{experience.company}</h3>
                        <p>{experience.role}</p>
                      </div>
                      <div class="experience-stamp">
                        <p class="experience-period">{experience.period}</p>
                        {experience.location ? (
                          <p class="experience-location">
                            {experience.location}
                          </p>
                        ) : null}
                      </div>
                    </div>
                    <p class="experience-summary">{experience.summary}</p>
                    <ul>
                      <For each={experience.highlights}>
                        {(highlight) => <li>{highlight}</li>}
                      </For>
                    </ul>
                  </article>
                </li>
              )}
            </For>
          </ol>
        </section>
      </main>

      <footer class="site-footer shell">
        <div>
          <a class="wordmark" href="#top">
            lid<span>.</span>top
          </a>
          <p>Designed and built by Zackary Santana with Solid 2.</p>
        </div>
        <nav aria-label="Footer navigation">
          <ExternalLink href={site.github}>GitHub</ExternalLink>
          <ExternalLink href={site.linkedin}>LinkedIn</ExternalLink>
          <a href="#top">Back to top</a>
        </nav>
      </footer>
    </>
  );
}

export default App;
