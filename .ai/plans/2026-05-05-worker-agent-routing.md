# Plan: Worker agent routing to .md files

## Summary

Update the Cloudflare Worker to detect agent requests (User-Agent + Accept header) and serve `.md` files instead of HTML, with agent-friendly response headers. Path discovery is handled by a build-time manifest generated from the `dist/` directory.

## Files changed

| File | Action |
|---|---|
| `scripts/generate-md-manifest.mjs` | New — scans `dist/` for `.md` paths |
| `package.json` | Update `build` script to chain manifest generation |
| `.gitignore` | Add `src/md-paths.ts` |
| `src/worker.ts` | Rewrite — import manifest, agent detection, URL rewrite, headers |

## Agent detection

Combined OR logic:

1. **Accept header**: contains `text/markdown` → agent
2. **User-Agent**: matches `/bot|crawler|claude|gptbot|chatgpt|curl|wget|python-requests|go-http-client|node-fetch|aiohttp|axios|opencode|pi/i` → agent

## URL rewriting

- Incoming path normalized (strip trailing slashes)
- Check if normalized path is in `MD_PATHS` Set
- If yes → append `.md` and serve with agent headers
- If `.md` returns non-200 → fall back to original HTML
- If not in Set → pass through unchanged

## Headers

```
Content-Type: text/markdown; charset=utf-8
Cache-Control: public, max-age=3600, stale-while-revalidate=86400
```

## Architecture

```
pnpm build
  ├─ astro build        → generates dist/ with .md files
  └─ generate manifest  → scans dist/ → writes src/md-paths.ts
                                ↓
SST deploy
  └─ bundles worker     → imports src/md-paths.ts → MD_PATHS baked in
  └─ deploys assets     → dist/ → Cloudflare
```

## Decisions

| Decision | Resolution |
|---|---|
| Path discovery | Build-time manifest, statically baked into worker bundle |
| Agent detection | UA regex + Accept header (OR logic) |
| UA patterns | bot, crawler, claude, gptbot, chatgpt, curl, wget, python-requests, go-http-client, node-fetch, aiohttp, axios, opencode, pi |
| Headers | `text/markdown`, `Cache-Control` — only on `.md` responses |
| Fallback | `.md` not in Set or non-200 → pass through to normal HTML |