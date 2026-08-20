# lid.top

Zackary Santana's product-focused personal site, built with the Solid 2 release candidate and deployed to GitHub Pages.

The production build renders the complete page on the server during CI, writes that response to `dist/client/index.html`, and deploys only static HTML, CSS, JavaScript, fonts, and media. No server is required after the build.

## Development

Requirements:

- Node.js 24 or newer
- npm 11 or newer

Install and start the development server:

```sh
npm install
npm run dev
```

Run the complete local verification:

```sh
npm run check
```

For browser tests, build the site, install Chromium once, and run Playwright:

```sh
npm run build
npx playwright install chromium
npm run test:e2e
```

## Adding a project

Projects are local, typed content. The site does not depend on GitHub at build time or runtime.

1. Copy an existing file in `src/content/projects/` and give it a unique `slug`, ISO `date`, and `order`. The date controls newest-first sorting; order only breaks exact timestamp ties.
2. Add a cover image under `media-source/projects/<slug>/`. Supported formats are PNG, JPEG, WebP, AVIF, and SVG.
3. Optionally add one short video in MP4, MOV, M4V, or WebM format. Add `captions.vtt` beside it if the clip contains speech.
4. Run `npm run media:prepare` to create responsive images and web-ready video formats.
5. Choose the link kinds carefully. Cards prefer demos, stores, docs, and packages before source links.

If a cover is absent, the media script creates a branded fallback from the project title and category. Project links are optional, which allows older archive projects to remain visible without publishing dead URLs.

## Adding a spotlight product

The products receiving the most attention live in `src/content/products.ts`. The homepage intentionally gives these products much more room than the broader project archive.

1. Add the product copy, destination, facts, and media paths to `products`.
2. Set `spotlight: true` only when it should compete for one of the two large homepage positions. Additional products automatically enter the compact product index.
3. Add original media under `media-source/products/<slug>/`.
4. Name the primary screenshot `cover` and the primary video `demo`.
5. Run `npm run media:prepare` to generate responsive images, web video formats, and a poster.

The spotlight layout is content-driven, but each product can use its own color and media composition through its slug class in `src/styles/global.css`.

## Content and media

- Project content: `src/content/projects/`
- Spotlight product content: `src/content/products.ts`
- Experience content: `src/content/experience.ts`
- Personal links and hero copy: `src/content/site.ts`
- Original media: `media-source/projects/` and `media-source/products/`
- Generated media: `public/media/projects/` and `public/media/products/`

Generated media is rebuilt before every production build. Images are emitted as responsive WebP and AVIF files. Videos are capped at a 1280-pixel width and emitted as MP4 and WebM with a poster frame.

## Static build

```sh
npm run build
```

The command performs four steps:

1. Prepare project media.
2. Build Solid's client and server bundles with Vite.
3. Render `https://lid.top/` through the generated Solid request handler.
4. Validate the static output, required content, media budgets, and written-file rules.

The deployable directory is `dist/client`.

## GitHub Pages

The workflow in `.github/workflows/pages.yml` tests, builds, and deploys the site on pushes to `main`. In `ZackarySantana/lid.top`:

1. Open Settings, then Pages.
2. Select GitHub Actions as the publishing source.
3. Add `lid.top` as the custom domain before changing DNS.
4. Replace the apex parking records with these GitHub Pages A records:

```text
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

5. Optionally point `www` to `zackarysantana.github.io` with a CNAME record.
6. After DNS propagation and certificate issuance, enable Enforce HTTPS.

GitHub ignores repository `CNAME` files for custom Actions deployments, so the custom domain is managed in Pages settings instead.
