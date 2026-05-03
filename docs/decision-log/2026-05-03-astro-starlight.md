---
title: Convert tools-wiki to static site with Astro Starlight
description: Replaced raw markdown repo with an Astro Starlight static site featuring auto-generated landing page, Pagefind search, CSS-variable theming, and Docker deployment.
date: 2026-05-03
slug: astro-starlight-static-site
status: implemented
tags:
  - static-site
  - astro
  - starlight
  - docker
related_paths:
  - src/content/docs/
  - src/pages/index.astro
  - astro.config.mjs
  - Dockerfile
---

## Why

The repo contained raw markdown cheatsheets with no way to browse or search them. The goal was a static site where each tool gets a page, all pages are searchable (Cmd+K), and the site is containerized for k8s deployment.

## What

Converted the repo into an Astro Starlight static site with:

- **File-based routing**: `src/content/docs/git.md` → `/git/`, subdirectories map to URL hierarchy
- **Auto-generated landing page**: `src/pages/index.astro` scans the docs collection at build time, groups tools by parent directory, sorts alphabetically
- **Pagefind search**: client-side, indexed post-build, Cmd+K shortcut via Starlight
- **CSS variables**: light/dark mode via `[data-theme="dark"]`, custom properties in `src/styles/custom.css`
- **Docker**: multi-stage build (node → nginx:alpine), ~16 MB image

## How

- Chose **Astro Starlight** over VitePress — leaner output (zero-JS pages), Pagefind search, flatter CSS token model
- **Restructured repo** — moved `.md` files from repo root into `src/content/docs/` for idiomatic Starlight layout
- **npm instead of pnpm** — pnpm install timed out during setup; adapted Dockerfile to `npm ci`
- **Frontmatter required**: every tool file needs `title`, `draft: false` (production filter), and `head: []` (workaround for Starlight 0.34.8 bug where undefined head data crashes page generation)
- **Updated AGENTS.md** — removed "no subdirectories" rule, documented URL hierarchy mapping

## Risks

- **Starlight 0.34.8 head-merge bug**: if `head` is omitted from frontmatter, page generation crashes. Fixed with explicit `head: []`. This may be resolved in a future Starlight release.
- **Restructured file paths**: one-time migration cost. New content convention is `src/content/docs/{tool}.md` with required frontmatter.