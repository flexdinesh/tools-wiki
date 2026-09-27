# tools wiki

A searchable collection of cheatsheets and quick-reference guides for developer tools. Built with [Astro Starlight](https://starlight.astro.build).

## Structure

Each tool gets a single Markdown file. Subdirectories map to URL hierarchy:

```
src/content/docs/
├── cheatsheets/
│   ├── git.md          →  /cheatsheets/git/
│   └── tmux.md         →  /cheatsheets/tmux/
└── neovim/
    └── grug-far.md     →  /neovim/grug-far/
```

## Adding a tool

1. Follow [AGENTS.md](AGENTS.md) for content approval and structure.
2. Create `src/content/docs/cheatsheets/{tool}.md`, or `src/content/docs/neovim/{plugin}.md` for a Neovim plugin.
3. Add frontmatter:

   ```yaml
   ---
   title: tool-name
   description: Concise summary of the tool's workflows.
   ---
   ```

4. Organize commands under `##` sections; use tables for simple shortcuts.
5. Add an approved home page CardGrid entry in `src/content/docs/index.mdx`.

## Development

Use Node.js 24 and pnpm 11.5.0, from the repository root.

```bash
pnpm install
pnpm run dev        # starts at http://localhost:4321
pnpm run build      # outputs to dist/
pnpm run check      # build, typecheck, worker tests, directory validation
```

`check` builds first to generate the worker's Markdown path manifest. After a build,
`pnpm run typecheck` and `pnpm run test` can run independently. Typechecking covers
the site, worker, and tests; SST configuration depends on generated platform types
and is validated by `sst diff` during deployment.

Stop the development server with Ctrl+C. Astro dev and preview serve static pages;
Markdown negotiation runs in the Cloudflare Worker. See [deployment](docs/deploy.md)
for Cloudflare prerequisites and commands.

## Docker

```bash
docker build -t tools-wiki .
docker run -p 8080:80 tools-wiki
```

Docker serves static HTML and `.md` files with nginx. Automatic Markdown negotiation
is available on the Cloudflare deployment.
