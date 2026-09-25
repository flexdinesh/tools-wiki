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
- Tool pages open with a collection breadcrumb and their existing description.
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
- Approved visual direction: Reference Atlas. A shared paper surface across
  reading and navigation, ink headings, and cobalt wayfinding in light mode;
  blue-green paper and softer cobalt in dark mode. Fraunces titles, IBM
  Plex Sans prose, IBM Plex Mono reference labels and code. Keep the tool
  index dense and scannable.
  Preserve both themes. DESIGN.md records the system.

## Evidence on Hand

- `src/content/docs/`: existing tool references and home page directory.
- `astro.config.mjs`: site identity, navigation, and Starlight integration.
- `src/components/` and `src/styles/global.css`: shipped interface.
- `src/pages/[...path].md.ts` and `src/worker.ts`: Markdown delivery.

## Product Principles

- Prioritize fast lookup and comprehension.
- Pair commands with purpose and useful results.
- Preserve familiar documentation behavior as the visual design evolves.
- Keep references useful to a broad developer audience.
