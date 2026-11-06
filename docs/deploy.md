# Deploy

Deployed to Cloudflare Workers with Workers Builds. `wrangler.jsonc` defines the Worker, its static assets, and the custom domain `toolswiki.deebox.dev`.

## Workers Builds

Pushes to `main` build and deploy automatically. Non-production branch builds are off; the `Check` workflow validates pull requests.

Configured in the Cloudflare dashboard under Worker `tools-wiki` > Settings > Builds:

- Branch: `main`
- Build command: `pnpm run check`
- Deploy command: `pnpm exec wrangler deploy`
- Build variable: `NODE_VERSION=24`

The build command generates `src/md-paths.ts`, which the Worker imports, and stops the deploy if checks fail.

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
