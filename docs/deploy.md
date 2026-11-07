# Deploy

Deployed to Cloudflare Workers with Workers Builds. `wrangler.jsonc` defines the Worker, its static assets, and the custom domain `toolswiki.hoplabs.dev`.

## Workers Builds

Pushes to `main` build and deploy automatically. Non-production branch builds are off; the `Check` workflow validates pull requests.

Configured in the Cloudflare dashboard under Worker `tools-wiki` > Settings > Builds:

- Branch: `main`
- Build command: `pnpm run build`
- Deploy command: `pnpm exec wrangler deploy`

The build command generates `src/md-paths.ts`, which the Worker imports. It does not run typecheck or tests.

`NODE_VERSION` is unset, so builds use Cloudflare's default Node version, which can differ from the Node version used for local development and the `Check` workflow.

## Verify a deploy

The canonical URL should use `toolswiki.hoplabs.dev`. Send the `Accept` header to get HTML from the Worker.

```bash
curl -s -H 'Accept: text/html' https://toolswiki.hoplabs.dev/ | grep -o '<link rel="canonical"[^>]*>'
```

## Manual deploy

Requires a Cloudflare API token with Workers access and DNS edit access for the target zone.

```bash
export CLOUDFLARE_API_TOKEN="..."
export CLOUDFLARE_ACCOUNT_ID="..."
pnpm run build
pnpm exec wrangler deploy
```

Validate without deploying:

```bash
pnpm run build
pnpm exec wrangler deploy --dry-run
```
