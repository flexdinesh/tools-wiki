# Plan: Convert Tools Wiki to Static Site with Astro Starlight

## Summary

Convert this markdown-based cheatsheet repo into a containerized static site using **Astro Starlight**, served by **nginx**, with auto-generated landing page, Pagefind-powered Cmd+K search, and CSS-variable-driven light/dark theming.

---

## Key Implementation Changes

### 1. Initialize Astro + Starlight

```text
New files:
  package.json          # deps: astro, @astrojs/starlight, sharp (for Pagefind images)
  pnpm-lock.yaml
  astro.config.mjs      # Starlight config: title, search, sidebar, theme
  tsconfig.json         # minimal
  .gitignore            # add dist/, node_modules/, .astro/
  .dockerignore         # exclude node_modules, .git
```

`astro.config.mjs` configures:
- Pagefind search (bundled with Starlight)
- Cmd+K search shortcut (configurable via Starlight's `search.provider`)
- Sidebar auto-generated from `src/content/docs/` directory structure
- Custom CSS injection point for theme variables

### 2. Restructure Repo — Move `.md` files

```text
Before:                        After:
  git.md            →            src/content/docs/git.md
  tmux.md           →            src/content/docs/tmux.md
  neovim/                        src/content/docs/neovim/
    grug-far.md     →              grug-far.md
  AGENTS.md         →            AGENTS.md  (stays, updated)
```

### 3. Auto-Generated Landing Page

Create `src/pages/index.astro` that:
- Uses `getCollection('docs')` at build time to scan all `.md` files
- Groups them by parent directory (root-level tools vs. `neovim/` tools)
- Sorts alphabetically within each group
- Renders a clean list: directory heading → linked tool names
- Wraps in Starlight's layout so the search bar (with Cmd+K) is present in the header

```text
New file:
  src/pages/index.astro
```

### 4. Theming — CSS Variables

Define in `src/styles/custom.css`:

```text
:root {
  --color-bg:           #fff;
  --color-text:         #1a1a2e;
  --color-accent:       #4f46e5;
  --color-code-bg:      #f1f5f9;
  --color-border:       #e2e8f0;
  --color-link:         #4f46e5;
}

[data-theme="dark"] {
  --color-bg:           #0f172a;
  --color-text:         #e2e8f0;
  --color-accent:       #818cf8;
  --color-code-bg:      #1e293b;
  --color-border:       #334155;
  --color-link:         #818cf8;
}
```

Fed into Starlight via `astro.config.mjs` → `customCss: ['./src/styles/custom.css']`.

Dark mode toggle is built into Starlight — no code needed.

### 5. Dockerfile — Multi-Stage Build

```text
New file:
  Dockerfile
  nginx.conf            # minimal, serves dist/ with correct cache headers
```

```dockerfile
# Stage 1: Build
FROM node:22-alpine AS builder
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

# Stage 2: Serve
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK CMD wget -q --spider http://localhost:80/ || exit 1
```

### 6. Update AGENTS.md

Change:
> *"No subdirectories, no multiple files per tool."*

To:
> *"Subdirectories are allowed and map to URL hierarchy (e.g., `neovim/grug-far.md` → `/neovim/grug-far/`). No multiple files per tool."*

---

## Files Changed / Created

| File | Action |
|---|---|
| `package.json` | Create |
| `pnpm-lock.yaml` | Create |
| `astro.config.mjs` | Create |
| `tsconfig.json` | Create |
| `.gitignore` | Create / update |
| `.dockerignore` | Create |
| `Dockerfile` | Create |
| `nginx.conf` | Create |
| `src/styles/custom.css` | Create |
| `src/pages/index.astro` | Create |
| `src/content/docs/git.md` | Move from `git.md` |
| `src/content/docs/tmux.md` | Move from `tmux.md` |
| `src/content/docs/neovim/grug-far.md` | Move from `neovim/grug-far.md` |
| `AGENTS.md` | Update (subdirectory rule) |
| `git.md` | Delete (moved) |
| `tmux.md` | Delete (moved) |
| `neovim/grug-far.md` | Delete (moved) |

---

## Verification

1. `pnpm build` produces `dist/` with HTML, CSS, JS, and `pagefind/` search index
2. `pnpm preview` serves the built site locally — confirm:
   - Landing page lists `git`, `tmux` at root level and `neovim/grug-far` under a "neovim" group
   - Each tool page renders with proper headings and code blocks
   - Cmd+K opens search modal, typing finds content across all pages
   - Dark mode toggle works, CSS variables switch correctly
3. `docker build -t tools-wiki . && docker run -p 8080:80 tools-wiki` — confirm site serves correctly from nginx
4. `curl http://localhost:8080/` returns 200
5. `curl http://localhost:8080/pagefind/pagefind.js` returns the Pagefind JS bundle (search works)

---

## Decisions Made

| # | Decision | Choice |
|---|---|---|
| 1 | SSG | Astro Starlight |
| 2 | File organization | Restructure into `src/content/docs/` |
| 3 | Landing page | Auto-generated from directory scan at build time |
| 4 | Package manager | pnpm |
| 5 | Web server | nginx:alpine |
| 6 | CI | Deferred (user handles separately) |
| 7 | AGENTS.md | Updated to allow subdirectories |

---

## Tradeoffs & Risks

- **Restructuring breaks existing file paths** — one-time cost, zero ongoing maintenance. Worth it for idiomatic Starlight setup.
- **Auto-generated landing page** — no manual curation possible without code changes. If you later want a custom intro or featured tools, you'll need to modify `index.astro`.
- **Pagefind search** — indexes the built HTML, not the raw markdown. If code blocks aren't semantically tagged, search results may show raw text. This works fine for your format since descriptions are plain paragraphs.
- **Scalability** — Starlight + Pagefind handle 1,000+ pages without issue. Build time scales linearly.

---

## Execution Guidance

### Deviations from original plan

1. **npm instead of pnpm**: pnpm install timed out (>120s) during initial setup due to network constraints. The Dockerfile was updated to use `npm ci` instead of pnpm. The output is identical; this is only a build-tool change.
2. **Added `head: []` to all content frontmatter**: Starlight 0.34.8 has a bug where `data.head` being `undefined` crashes the head-merge logic during page generation. Adding explicit `head: []` to each tool's frontmatter works around this.
3. **Added `draft: false` to all content frontmatter**: Starlight filters entries in production where `data.draft !== false`. Without this, content pages wouldn't be generated in production builds.

If execution deviates from this plan, the saved plan file must be updated to reflect the latest approved plan and the deviation must be surfaced to the user.