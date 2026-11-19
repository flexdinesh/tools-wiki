# README cover

Source and recorder for `.github/assets/readme-cover.webp` and `readme-cover-dark.webp`: the site in a browser window, `cmd+k`, search `git`, open the git cheatsheet, back home. Built with [stageshow](kit/NOTICE.md) (vendored in `kit/`, MIT).

This is its own pnpm workspace root, so the site's install, CI, and Docker builds never see it.

```bash
pnpm --dir .github/readme-cover install
pnpm --dir .github/readme-cover dev        # live preview at http://127.0.0.1:4410/?theme=light (or dark)
pnpm --dir .github/readme-cover record     # writes both WebPs; `record light` or `record dark` for one
pnpm --dir .github/readme-cover typecheck
```

`record` loads the page under stageshow's virtual clock (`?record=1`) and steps it exactly 1/30s per frame, so every frame renders once at 30fps. It captures one steady-state loop (the second, since the first is a cold start), checks that the loop seam matches, and encodes lossless animated WebP at 1560x900 (a 1040x600 stage at device scale 1.5). It needs Google Chrome installed, or `CHROME_PATH` set.

Scene: `src/cover.tsx` (strings copied from the built site) and `src/cover.css` (roles from `src/styles/global.css` and `DESIGN.md`). Rehearsal notes: `REHEARSAL.md`.
