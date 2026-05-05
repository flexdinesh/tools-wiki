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
- It imports `CardGrid` and `LinkCard` from `@astrojs/starlight/components`.
- The home page cards are maintained manually; when adding a new public tool page, update the relevant CardGrid entry if the tool should appear on the home page.
- The home page Neovim section is for Neovim plugins only; keep the main `neovim` page under Cheatsheets.

## Document Structure

Each `{tool}.md` is organized by high-level usage workflows as `##` sections.
Choose the entry format based on the type of content in that section.

### Simple shortcut docs

Use a tabular structure for plain shortcuts or single-action commands that do not need a multi-step workflow or detailed terminal output.
This is the preferred format for keyboard shortcuts like `neovim.md` and `vscode.md`.

Use columns that fit the tool:

- Keyboard shortcuts: `Key`, `Purpose`, `Result`
- Cross-platform shortcuts: `macOS`, `Windows/Linux`, `Purpose`, `Result`
- Simple commands without meaningful output: `Command`, `Purpose`, `Result`

Example:

```markdown
## Editing

| Key | Purpose | Result |
| --- | --- | --- |
| `dd` | Delete current line. | Current line is cut. |
| `yy` | Yank current line. | Current line is copied. |
```

### Multi-step shortcut and workflow docs

Use headed command entries with fenced examples for CLI commands, multi-step shortcuts, setup flows, or workflows where representative output helps the reader.
This is the preferred format for command-heavy pages like `git.md`.

Examples for `git.md`:

- `## Config`
- `## Commit`
- `## Log`
- `## Push`
- `## Worktree`
- `## Patch`
- `## Diff`
- `## Stacked Rebase`

Under each section, list commands. For each command, provide:

1. **Purpose**: Brief, one-sentence description.
2. **Example command**: The exact command string.
3. **Example output**: Representative output the user sees, when useful.

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
