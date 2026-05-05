# Plan: Agent-friendly raw markdown routes

## Summary

Add a single Astro endpoint (`src/pages/[...path].md.ts`) that serves the raw markdown body (no frontmatter) of every docs content entry at a corresponding `{path}.md` URL. Intended for agents, routed via Cloudflare Worker.

## Implementation

### One new file: `src/pages/[...path].md.ts`

```ts
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const docs = await getCollection('docs');
  return docs
    .filter(doc => doc.id !== 'index')
    .map(doc => ({
      params: { path: doc.id },
      props: { body: doc.body },
    }));
}

export async function GET({ props }: { props: { body: string } }) {
  return new Response(props.body, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
    },
  });
}
```

### No other changes

- No config modifications
- No build scripts
- No existing files touched

## Generated output

| Source file | `entry.id` | `dist/` output | URL |
|---|---|---|---|
| `cheatsheets/docker.md` | `cheatsheets/docker` | `dist/cheatsheets/docker.md` | `/cheatsheets/docker.md` |
| `cheatsheets/git.md` | `cheatsheets/git` | `dist/cheatsheets/git.md` | `/cheatsheets/git.md` |
| `cheatsheets/neovim.md` | `cheatsheets/neovim` | `dist/cheatsheets/neovim.md` | `/cheatsheets/neovim.md` |
| `cheatsheets/ssh.md` | `cheatsheets/ssh` | `dist/cheatsheets/ssh.md` | `/cheatsheets/ssh.md` |
| `cheatsheets/tmux.md` | `cheatsheets/tmux` | `dist/cheatsheets/tmux.md` | `/cheatsheets/tmux.md` |
| `cheatsheets/vscode.md` | `cheatsheets/vscode` | `dist/cheatsheets/vscode.md` | `/cheatsheets/vscode.md` |
| `neovim/grug-far.md` | `neovim/grug-far` | `dist/neovim/grug-far.md` | `/neovim/grug-far.md` |
| `index.mdx` | `index` | _(excluded)_ | — |

## Verification

1. `pnpm dev` → visit `/cheatsheets/git.md` → raw markdown body, no frontmatter
2. `pnpm build` → `dist/cheatsheets/git.md` exists with correct body text
3. `/index.md` → not generated (filtered out)
4. `/nonexistent.md` → 404

## Worker headers

To be set in Cloudflare Worker for `.md` routes:

```
Content-Type: text/markdown; charset=utf-8
Cache-Control: public, max-age=3600, stale-while-revalidate=86400
```

## Decisions

| Decision | Resolution |
|---|---|
| Frontmatter | Stripped — use `entry.body` |
| Content-Type | `text/markdown; charset=utf-8` |
| Routing | Single `[...path].md.ts` catch-all |
| Splash page | Excluded from `.md` routes |
| Double `getCollection` | Eliminated via `props` |
| Custom headers | Set in Cloudflare Worker, not Astro |

## Risks / tradeoffs

- **No frontmatter in output**: Agents won't see `title`/`description`. If agents later need metadata, serve a sidecar JSON or add frontmatter back.