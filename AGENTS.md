# Agent Guide: Tools Wiki

This repo contains concise cheatsheets and wiki for tools. Each tool gets a single Markdown file.

## File Structure

- One file per tool.
- Filename must match the tool name exactly: `src/content/docs/{tool}.md` (e.g. `src/content/docs/git.md`, `src/content/docs/docker.md`).
- Subdirectories are allowed and map to URL hierarchy (e.g., `src/content/docs/neovim/grug-far.md` → `/neovim/grug-far/`). No multiple files per tool.

## Document Structure

Each `{tool}.md` is organised by high-level usage workflows as `##` sections.
Examples for `git.md`: `## Status`, `## Stash`, `## Pull`, `## Push`, `## Rebase`.

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

```

## Package Manager

This repo uses **pnpm**. Do not use npm. Run `pnpm install` to install dependencies.

## Agent Workflow

Before writing or porting any documentation, the agent must:

1. Ask the user which tool the doc is for.
2. Propose high-level sections (usage workflows) for that tool.
3. Propose which commands go into each section.
4. Wait for explicit user approval.
5. Only then create or update the `{tool}.md` file.

```
