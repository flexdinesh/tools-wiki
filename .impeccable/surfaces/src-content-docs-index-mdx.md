---
version: 1
slug: "src-content-docs-index-mdx"
primary_target: "src/content/docs/index.mdx"
related_targets: ["src/styles/global.css", "src/components/Hero.astro"]
---

# Homepage and shared docs

Mode: Read. Reference Atlas is the confirmed replacement direction.
Keep the existing tool content, URLs, native Starlight search, sidebars,
table of contents, theme control, code copy, and Markdown endpoints.

## Direction contract

THESIS: A developer reference that feels like a carefully typeset atlas.
The tool index and examples remain fast to scan during active work.

OWN-WORLD: Warm paper across content and catalog rails, ink headings, and cobalt
wayfinding in light mode; deep blue-green paper and a softer cobalt in dark
mode. Fraunces carries large titles; IBM Plex Sans carries workflow headings
and prose; IBM Plex Mono carries tool names, section names, keys, and code.
Thin rules and square highlights organize dense material.

STORY: Search or scan the tool index, open a tool, find a workflow in the
contents, and copy the example. The home page is a compact directory, not a
marketing splash.

FIRST VIEWPORT: The docs title opens with a breadcrumb and existing page
description, then immediate reference content. A labeled terminal frame
replaces generic window dots. Desktop keeps the catalog and contents rails;
mobile keeps Starlight's native menu and compact contents control. The
homepage shows its directory above the fold on desktop and mobile.

FORM: Code-led build. The Reference Atlas mockup chosen in conversation is
the visual reference. Match its type, palette, page opening, and code frame
while showing each tool's actual content and preserving useful controls.

FINISH: Check desktop and mobile in both themes, preserve keyboard focus and
local scrolling for wide code and tables, and document the shipped system.
