# Deploy

Deployed to Cloudflare Workers with SST.

## Prerequisites

- Cloudflare account
- Cloudflare API token with Workers access
- For custom domain deploys: Cloudflare DNS edit access for the target zone
- Optional: `CLOUDFLARE_DEFAULT_ACCOUNT_ID`

## Local commands

Set Cloudflare creds in your shell:

```bash
export CLOUDFLARE_API_TOKEN="..."
export CLOUDFLARE_DEFAULT_ACCOUNT_ID="..."
```

See planned infra changes:

```bash
pnpm run diff -- --stage=production
```

> If this is the first deploy for the stage, `sst diff` can fail with `stage not found`. Run deploy once, then diff will work on later changes.

Deploy:

```bash
pnpm run deploy -- --stage=production
```

SST builds the Astro site, uploads `dist/`, and deploys a Cloudflare Worker that serves static assets.

Production also binds the custom domain `toolswiki.deebox.dev`.

## GitHub Actions

Auto-deploy runs on pushes to `main`.

Repo secrets required:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_DEFAULT_ACCOUNT_ID`

Manual trigger is also available in GitHub Actions.
