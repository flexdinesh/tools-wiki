# Tools Wiki

A searchable collection of cheatsheets and quick-reference guides for developer tools. Built with [Astro Starlight](https://starlight.astro.build).

## Structure

Each tool gets a single Markdown file. Subdirectories map to URL hierarchy:

```
src/content/docs/
├── git.md              →  /git/
├── tmux.md             →  /tmux/
└── neovim/
    └── grug-far.md     →  /neovim/grug-far/
```

## Adding a tool

1. Create `src/content/docs/{tool}.md` (or a subdirectory)
2. Add frontmatter:

   ```yaml
   ---
   title: tool-name
   draft: false
   head: []
   ---
   ```

3. Organize content under `##` sections with fenced code blocks

## Development

```bash
pnpm install
pnpm run dev        # starts at http://localhost:4321
pnpm run build      # outputs to dist/
```

## Docker

```bash
docker build -t tools-wiki .
docker run -p 8080:80 tools-wiki
```