# Rehearsal

## Gold copied

`examples/linear` (wide hero: realistic product window, inset top and sides, off the bottom, Cmd+K command surface over a list). Motion borrowed from `hero-demo` (named targets, cursor parked on empty surface between beats).

## What changed from the previous cover

- 30fps from stageshow's virtual clock (was 20fps with deduped holds).
- Lossless WebP (was lossy q92, 4:2:0 chroma on blue links and mono text). Lossless measured smaller than mixed q90 here: 1.06 MB light, 1.13 MB dark.
- Home to git page: the outgoing page leaves in 100ms, then the new one rises in (no double exposure).
- Cmd+K presses the header's own key cap; no floating keycap over the table.
- Cursor at real size, resting on empty surface; it fades when idle, so the loop seam is invisible.
- No gray plate: the stage ground is GitHub's page color in each theme.
- Dark variant, served with `<picture>` and `prefers-color-scheme`.
- Ruled sheet lines drawn with kit `Divider` so sections are rules, not padded cards.
- Results drawer uses `height: auto` with `interpolate-size`, not kit `Collapse`: under the stepped clock Chrome resolved Collapse's `0fr`-`1fr` grid transition to a box taller than its row, which left a blank band for a few frames.

## Captured

- Width: 1040 (the shipped stage size), both themes, `film.mjs --gate`: `rehearsal passed` on both.
- Results open filmed at `--slow 6`; virtual-clock frames stepped and inspected around the drawer opening.
- Encoded loop: 347 frames, 11.57s, seam diff 0.000% in both themes.

## Remaining film candidates, judged

- `clipped` excerpt: the real Pagefind excerpt is one line with an ellipsis.
- `near aligned` brand vs home title (16px vs 24px inset): the real site's header cell and content gutter.
- `touching` directory counts: zoomed, the count column has clear space; detector false positive.

## Not checked

- No `compact` design: the output is a fixed image that GitHub scales; there is no phone column to lay out for.
- Reduced motion and host-page playback: not applicable to a pre-rendered WebP.
- The site's real hero text renders "tools.Use" with no space (Hero.astro whitespace); the cover shows "tools. Use".
