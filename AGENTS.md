# Agent Guide: Tools Wiki

This repo contains concise cheatsheets and wiki pages for developer tools. Content is served by Astro Starlight from the native `docs` content collection.

## Content Collection

- Starlight docs live under `src/content/docs/`.
- `src/content.config.ts` defines the collection with `docsLoader()` and `docsSchema()`.
- All docs content must satisfy Starlight's docs schema.
- Use Markdown (`.md`) for normal tool pages.
- Use MDX (`.mdx`) only when a page needs Starlight components, such as the home page CardGrid.

## File Structure

- One file per tool.
- The file name must match the tool name exactly: `{tool}.md`.
- Put general command cheatsheets under `src/content/docs/cheatsheets/{tool}.md` by default.
- Put Neovim plugin pages under `src/content/docs/neovim/{plugin}.md`.
- Only Neovim plugins belong in `src/content/docs/neovim/`; the main Neovim cheatsheet belongs in `src/content/docs/cheatsheets/neovim.md`.
- Subdirectories are allowed and map to URL hierarchy.

Examples:

- `src/content/docs/cheatsheets/git.md` → `/cheatsheets/git/`
- `src/content/docs/cheatsheets/docker.md` → `/cheatsheets/docker/`
- `src/content/docs/cheatsheets/neovim.md` → `/cheatsheets/neovim/`
- `src/content/docs/neovim/grug-far.md` → `/neovim/grug-far/`

## Frontmatter

Every tool doc must include Starlight-compatible frontmatter with `title` and `description`.

```yaml
---
title: git
description: Config, commit, log, push, worktree, patch, diff, and stacked rebase.
---
```

Rules:

- `title` is required and should usually match the tool name.
- `description` is required and should summarize the main workflows or sections in one concise sentence.
- Do not add stale fields from older content, such as `draft: false` or `head: []`.

## Home Page

- `src/content/docs/index.mdx` is the Starlight splash page served at `/`.
- It uses Starlight frontmatter with `template: splash`, `hero`, and actions.
- It imports `Card` and `CardGrid` from `@astrojs/starlight/components`.
- The home page cards are maintained manually; when adding a new public tool page, update the relevant CardGrid entry if the tool should appear on the home page.
- The home page Neovim section is for Neovim plugins only; keep the main `neovim` page under Cheatsheets.

## Document Structure

Each `{tool}.md` is organized by high-level usage workflows as `##` sections.

Examples for `git.md`:

- `## Config`
- `## Commit`
- `## Log`
- `## Push`
- `## Worktree`
- `## Patch`
- `## Diff`
- `## Stacked Rebase`

## Command Entry Format

Under each section, list commands. For each command, provide:

1. **Purpose**: Brief, one-sentence description.
2. **Example command**: The exact command string.
3. **Example output**: Representative output the user sees.

Example:

````markdown
### git status --short

Shows a concise status with file change indicators.

```bash
$ git status --short
 M README.md
A  new-file.md
?? untracked.txt
```
````

## Package Manager

This repo uses **pnpm**. Do not use npm. Run `pnpm install` to install dependencies.

## Agent Workflow

Before writing or porting any documentation, the agent must:

1. Ask the user which tool the doc is for.
2. Propose the target file path, usually `src/content/docs/cheatsheets/{tool}.md`.
3. Propose the Starlight frontmatter: `title` and `description`.
4. Propose high-level sections, organized as usage workflows.
5. Propose which commands go into each section.
6. State whether `src/content/docs/index.mdx` should be updated with a CardGrid entry.
7. Wait for explicit user approval.
8. Only then create or update the tool doc and any approved home page CardGrid entry.
