# Plan: Migrate to Starlight-Native Content Collection

**Date**: 2026-05-04

## Summary

Replace the custom `src/pages/index.astro` with a standard `src/content/docs/index.mdx` splash page using Card/CardGrid. Clean up frontmatter in all content files to use Starlight's schema (`title` + `description`), remove stale fields (`head: []`, `draft: false`), and add `docsSchema()` to `content.config.ts`.

## Files Changed

| # | File | Action | Details |
|---|------|--------|---------|
| 1 | `src/pages/index.astro` | Delete | No longer needed — Starlight serves `src/content/docs/index.mdx` as `/` |
| 2 | `src/content/docs/index.mdx` | Create | Splash with hero + CardGrid for cheatsheets and neovim sections |
| 3 | `src/content.config.ts` | Edit | Add `docsSchema()` import and usage |
| 4 | `src/content/docs/cheatsheets/git.md` | Edit | Replace frontmatter: `title` + `description`, remove `draft`/`head` |
| 5 | `src/content/docs/cheatsheets/ssh.md` | Edit | Same |
| 6 | `src/content/docs/cheatsheets/tmux.md` | Edit | Same |
| 7 | `src/content/docs/neovim/grug-far.md` | Edit | Same |

## Decisions

1. **Splash template** — home page without sidebar, hero section with actions
2. **CardGrid layout** — two sections (Cheatsheets + Neovim), brief one-liner per card
3. **`description` frontmatter** — added to all 4 files, listing section names
4. **`docsSchema()`** — added to content.config.ts for type safety

## Tradeoffs

- Adding new tools requires updating the CardGrid in `index.mdx` manually (not auto-generated from the content collection). This is by design since CardGrid was chosen over a programmatic solution.