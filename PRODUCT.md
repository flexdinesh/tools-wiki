# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Developers broadly, looking up commands, shortcuts, and workflows while working.

## Product Purpose

A searchable collection of concise, example-led cheatsheets for developer tools.
Success means finding a relevant command or shortcut, understanding its result,
and returning to work quickly.

## Operating Context

- Search commands with Ctrl+K or Cmd+K, browse tools, or follow a direct page URL.
- Read CLI examples with representative output, or scan shortcut tables.
- General cheatsheets and Neovim plugins have separate collections.
- Tool pages also have Markdown endpoints; the deployment worker serves Markdown
  to requests that explicitly prefer it or match supported agent user agents.

## Capabilities and Constraints

- Preserve Astro Starlight features and conventions through design changes.
- Preserve existing tool URLs and the searchable reference workflow.
- Use Starlight's native docs collection and schema, Markdown tool pages, and MDX
  where components are needed.
- Keep one page per tool; follow AGENTS.md for content structure and approvals.
- Use pnpm. The existing stack is Astro, Starlight, and Tailwind CSS.
- Keep the home page directory aligned with the published tool pages.

## Brand Commitments

- Product name: tools wiki.
- Voice: concise, practical, developer-facing.
- Requested direction: a more modern, visually pleasing website with better
  colors. Substantial design changes are welcome within Starlight's constraints.
- Approved visual direction: Syntax Studio. Light mode uses warm-white surfaces,
  deep teal actions, and coral markers; dark mode keeps violet, teal, and coral.
  JetBrains Mono headings/code, Inter prose, compact tool rows and controls.
  Preserve both light and dark themes. DESIGN.md records the system.

## Evidence on Hand

- `src/content/docs/`: existing tool references and home page directory.
- `astro.config.mjs`: site identity, navigation, and Starlight integration.
- `src/components/` and `src/styles/global.css`: incumbent interface.
- `src/pages/[...path].md.ts` and `src/worker.ts`: Markdown delivery.

## Product Principles

- Prioritize fast lookup and comprehension.
- Pair commands with purpose and useful results.
- Preserve familiar documentation behavior as the visual design evolves.
- Keep references useful to a broad developer audience.
