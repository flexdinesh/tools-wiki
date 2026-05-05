# Plan: Reformat tmux cheatsheet with tables and bash examples

## Summary

Update `src/content/docs/cheatsheets/tmux.md` so each section starts with tabular simple shortcuts/commands, followed by headed bash-example blocks for multi-step workflows, CLI examples, output examples, and preview-mode flows.

## Target file

`src/content/docs/cheatsheets/tmux.md`

## Frontmatter

Keep unchanged:

```yaml
---
title: tmux
description: Sessions, windows, panes, copy mode, buffers, configuration, status bar, and scripting.
---
```

## Home page

No update to `src/content/docs/index.mdx` because `tmux` is already listed in the CardGrid.

## Key implementation changes

- Convert simple shortcuts to tables with `Key`, `Purpose`, `Result`.
- Convert simple commands where useful to tables with `Command`, `Purpose`, `Result`.
- Keep multi-command workflows as `###` entries with explanatory text and fenced examples.
- Use `bash` fences for all multi-step examples, including keyboard-only preview flows.
- Use `#` comments inside bash fences for instruction-only lines.
- Move all preview/chooser examples to the end of their sections.

## Section plan

### Sessions

Add a shortcuts table for detach, chooser/list, previous/next session, preview, and rename. Keep bash examples for start, attach, list, detach other clients, and kill commands. Move preview/switch and preview/kill workflows to the end.

### Windows

Add a shortcuts table for creating, navigating, choosing, menu, renaming, closing, and converting pane to window. Keep bash examples for named windows, reordering, moving, and renumbering. Move preview/switch and preview/kill workflows to the end.

### Panes

Add a shortcuts table for splitting, navigation, pane numbering, resizing, moving, layout, zoom, close, and menu. Keep bash examples for split commands, join-pane, and synchronize-panes.

### Copy Mode

Add a shortcuts table for entering/exiting, navigation, search, selection, copy, and paste.

### Buffers

Add a command table for buffer commands. Keep bash examples with output for list/show buffers. Move choose-buffer workflow to the end.

### Configuration

Add a command table for simple config commands. Keep bash examples for rebind-prefix and base-index workflows.

### Status Bar

Add a command table for toggles and styles. Keep bash example for multi-command customization.

### Scripting

Keep headed bash examples for scripting workflows.

### Help

Add a shortcuts table for key help, command mode, and `:list-keys`. Keep bash examples for list-keys, info, and version.

## Verification

- Review rendered markdown structure manually.
- Run `pnpm build` to validate Astro/Starlight content schema and markdown rendering.

## Decisions made

- Tool/page: `tmux`.
- Target path: `src/content/docs/cheatsheets/tmux.md`.
- Keep existing frontmatter.
- Use mixed format: tables for simple shortcuts/commands, bash examples for workflows.
- Move all preview/chooser examples to the end of their sections.
- Add missing preview/chooser examples where the doc already references chooser/preview behavior.
- Use `bash` fences even for keyboard-only examples.
- Use `#` comments inside bash fences for instruction-only lines.
- Do not update the home page.

## Tradeoffs and risks

- `bash` fences for keyboard-only examples are not semantically perfect, but match the requested visual style.
- Tables improve scanability, but some existing prose is condensed.
- Preview examples may duplicate table entries slightly, but they are clearer as end-of-section workflows.

## Execution guidance

If execution deviates from this plan, update this saved plan file to reflect the latest approved plan and surface the deviation to the user before continuing.
