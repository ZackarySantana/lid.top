import { type JSX } from "@solidjs/web";
import { createMemo, createSignal, For, Show } from "solid-js";

import { experiences } from "./content/experience";
import { projects } from "./content/projects";
import {
  indexedProducts,
  spotlightProducts,
  type SpotlightProduct,
} from "./content/products";
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

function OutboundLink(props: {
  href: string;
  label: string;
  class?: string;
}): JSX.Element {
  return (
    <a class={props.class} href={props.href} target="_blank" rel="noreferrer">
      <span>{props.label}</span>
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

function ProductSpotlight(props: {
  product: SpotlightProduct;
  index: number;
}): JSX.Element {
  const number = String(props.index + 1).padStart(2, "0");
  const isVerbish = props.product.slug === "verbish";

  return (
    <section
      class={`product-spotlight product-${props.product.slug}`}
      id={props.product.slug}
      aria-labelledby={`${props.product.slug}-title`}
    >
      <div class="product-shell">
        <header class="product-heading">
          <p class="product-number">
            <span>{number}</span>
          </p>
          <div>
            <p class="product-eyebrow">{props.product.name}</p>
            <h2 id={`${props.product.slug}-title`}>{props.product.headline}</h2>
          </div>
          <div class="product-introduction">
            <p>{props.product.description}</p>
            <OutboundLink
              class="product-cta"
              href={props.product.href}
              label={
                props.product.slug === "dailies"
                  ? "Play Dailies"
                  : "Open Verbish"
              }
            />
          </div>
        </header>

        <div class={{ "product-media": true, "has-still": isVerbish }}>
          {isVerbish && props.product.media.image ? (
            <picture class="product-still">
              <source
                type="image/avif"
                srcset={props.product.media.image.replace(".webp", ".avif")}
              />
              <img
                src={props.product.media.image}
                alt={props.product.media.imageAlt ?? ""}
                loading="lazy"
                decoding="async"
                width="1280"
                height="800"
              />
            </picture>
          ) : null}

          <div class="product-video-frame">
            <video
              controls
              muted
              playsinline
              preload="metadata"
              poster={props.product.media.poster}
              aria-label={props.product.media.label}
            >
              <source src={props.product.media.webm} type="video/webm" />
              <source src={props.product.media.video} type="video/mp4" />
            </video>
          </div>

          {props.product.slug === "dailies" ? (
            <div class="game-line" aria-hidden="true">
              <span>Six</span>
              <span>Tally</span>
              <span>Totem</span>
              <span>Vault</span>
            </div>
          ) : null}
        </div>

        <ul class="product-facts">
          <For each={props.product.details}>
            {(detail, index) => (
              <li>
                <span>{String(index() + 1).padStart(2, "0")}</span>
                {detail}
              </li>
            )}
          </For>
        </ul>
      </div>
    </section>
  );
}

function ArchiveRow(props: {
  project: Project;
  onTagSelect: (tag: string) => void;
}): JSX.Element {
  const link = primaryLink(props.project);
  const media = props.project.media[0];
  let mediaDialog!: HTMLDialogElement;

  return (
    <li class="archive-row">
      {media ? (
        <button
          class="archive-media-button"
          type="button"
          aria-label={`View ${props.project.title} demo`}
          onClick={() => mediaDialog.showModal()}
        >
          <img
            src={media.type === "image" ? media.src : media.poster}
            alt=""
            loading="lazy"
            decoding="async"
            width="128"
            height="128"
          />
        </button>
      ) : null}
      <div class="archive-content">
        <div class="archive-name">
          {link ? (
            <a href={link.href} target="_blank" rel="noreferrer">
              {props.project.title}
              <ArrowIcon />
            </a>
          ) : (
            <span>{props.project.title}</span>
          )}
        </div>
        <div class="archive-details">
          <p>{props.project.shortDescription}</p>
          <ul
            class="archive-tags"
            aria-label={`${props.project.title} technologies`}
          >
            <For each={props.project.technologies}>
              {(technology) => (
                <li>
                  <button
                    type="button"
                    onClick={() => props.onTagSelect(technology)}
                  >
                    {technology}
                  </button>
                </li>
              )}
            </For>
          </ul>
        </div>
        <p class="archive-meta">{props.project.category}</p>
      </div>
      {media ? (
        <dialog
          class="archive-media-dialog"
          ref={mediaDialog}
          aria-label={`${props.project.title} demo`}
          onClick={(event) => {
            if (event.target === mediaDialog) mediaDialog.close();
          }}
        >
          <div class="archive-dialog-header">
            <strong>{props.project.title}</strong>
            <div class="archive-dialog-actions">
              {media.type === "image" ? (
                <a href={media.src} target="_blank" rel="noreferrer">
                  Open full size
                </a>
              ) : null}
              <form method="dialog">
                <button type="submit">Close</button>
              </form>
            </div>
          </div>
          <div class="archive-dialog-media">
            {media.type === "image" ? (
              <a
                href={media.src}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${props.project.title} image full size`}
              >
                <picture>
                  <source
                    type="image/avif"
                    srcset={media.src.replace(
                      "cover-1280.webp",
                      "cover-1280.avif",
                    )}
                  />
                  <img
                    src={media.src}
                    srcset={media.srcSet}
                    alt={media.alt}
                    loading="lazy"
                    decoding="async"
                    width="1280"
                    height="800"
                  />
                </picture>
              </a>
            ) : (
              <video
                controls
                muted
                playsinline
                preload="metadata"
                poster={media.poster}
                aria-label={media.label}
              >
                {media.webmSrc ? (
                  <source src={media.webmSrc} type="video/webm" />
                ) : null}
                <source src={media.src} type="video/mp4" />
                {media.captions ? (
                  <track
                    kind="captions"
                    src={media.captions}
                    srclang="en"
                    label="English"
                  />
                ) : null}
              </video>
            )}
          </div>
        </dialog>
      ) : null}
    </li>
  );
}

function App(): JSX.Element {
  const [query, setQuery] = createSignal("");
  const [category, setCategory] = createSignal<CatalogCategory>("All");

  const categoryOptions: readonly CatalogCategory[] = [
    "All",
    ...projectCategories.filter((item) =>
      projects.some((project) => project.category === item),
    ),
  ];
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

  const selectTag = (tag: string) => {
    setCategory("All");
    setQuery(tag);
  };

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
            <a href="#products">Products</a>
            <a href="#other-work">Other work</a>
            <a href="#about">About</a>
            <a href={`mailto:${site.email}`}>Contact</a>
          </nav>
        </div>
      </header>

      <main id="main-content">
        <section class="hero" id="top" aria-labelledby="hero-title">
          <div class="hero-inner">
            <div class="hero-copy">
              <p class="hero-kicker">{site.name}</p>
              <h1 id="hero-title">
                <a href="#dailies">dailies.now</a>
                <a href="#verbish">verbish.now</a>
              </h1>
              <p class="hero-context">{site.role}</p>
            </div>
          </div>
        </section>

        <div id="products">
          <For each={spotlightProducts}>
            {(product, index) => (
              <ProductSpotlight product={product} index={index()} />
            )}
          </For>
        </div>

        <Show when={indexedProducts.length > 0}>
          <section
            class="product-index-section shell"
            aria-labelledby="product-index-title"
          >
            <div class="section-heading">
              <p>Products</p>
              <h2 id="product-index-title">Other products.</h2>
            </div>
            <ol class="product-index-list">
              <For each={indexedProducts}>
                {(product, index) => (
                  <li class="product-index-item">
                    <span>{String(index() + 3).padStart(2, "0")}</span>
                    <a href={product.href} target="_blank" rel="noreferrer">
                      <strong>{product.name}</strong>
                      <small>{product.headline}</small>
                      <ArrowIcon />
                    </a>
                  </li>
                )}
              </For>
            </ol>
          </section>
        </Show>

        <section class="archive-section shell" id="other-work">
          <div class="section-heading">
            <p>Other work</p>
            <h2>{projects.length} other projects.</h2>
          </div>

          <details class="archive-disclosure">
            <summary>
              <span>View the list</span>
              <span>{projects.length} projects</span>
            </summary>
            <div class="archive-controls" aria-label="Project filters">
              <label class="archive-search">
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
                class="archive-filters"
                role="group"
                aria-label="Filter by project type"
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

              <p class="archive-results" aria-live="polite">
                {visibleProjects().length}{" "}
                {visibleProjects().length === 1 ? "project" : "projects"}
              </p>
            </div>

            <Show
              when={visibleProjects().length > 0}
              fallback={
                <div class="archive-empty">
                  <p>No projects found.</p>
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
              }
            >
              <ol class="archive-list">
                <For each={visibleProjects()}>
                  {(project) => (
                    <ArchiveRow project={project} onTagSelect={selectTag} />
                  )}
                </For>
              </ol>
            </Show>
          </details>
        </section>

        <section class="about-section shell" id="about">
          <div class="section-heading">
            <p>Work</p>
            <h2>Software Engineer III at MongoDB.</h2>
          </div>

          <div class="about-grid">
            <p class="about-copy">
              I work on developer tools, CI/CD systems, and infrastructure.
            </p>
            <ol class="career-list" aria-label="Experience">
              <For each={experiences}>
                {(experience) => (
                  <li>
                    <div>
                      <strong>{experience.company}</strong>
                      <span>{experience.role}</span>
                    </div>
                    <span>{experience.period}</span>
                  </li>
                )}
              </For>
            </ol>
          </div>
        </section>

        <section class="contact-section" id="contact" aria-label="Contact">
          <div class="shell">
            <a class="contact-email" href={`mailto:${site.email}`}>
              <span>{site.email}</span>
              <ArrowIcon />
            </a>
          </div>
        </section>
      </main>

      <footer class="site-footer shell">
        <div>
          <a class="wordmark" href="#top">
            lid<span>.</span>top
          </a>
          <p>Zackary Santana, 2026.</p>
        </div>
        <nav aria-label="Footer navigation">
          <OutboundLink href="https://dailies.now" label="Dailies" />
          <OutboundLink href="https://verbish.now" label="Verbish" />
          <OutboundLink href={site.github} label="GitHub" />
          <OutboundLink href={site.linkedin} label="LinkedIn" />
        </nav>
      </footer>
    </>
  );
}

export default App;
