---
version: 1
slug: "src-content-docs-index-mdx"
primary_target: "src/content/docs/index.mdx"
related_targets: ["src/styles/global.css","src/components/Hero.astro","src/components/PageTitle.astro","src/components/LinkCard.astro","src/components/ToolIndex.astro"]
---

# Homepage and shared docs

Mode: Read. Keep the existing tool content, URLs, native Starlight search,
sidebars, table of contents, theme control, code copy, and Markdown endpoints.

Visitor: a developer mid-task looking up a command or shortcut, then returning
to work. Inspiration named by the user: px0.ai and zed.dev; dense layout, mild
border colors, sharp borders.

## Direction contract

THESIS: A developer reference ruled like a railway timetable: everything sits on
one ruled sheet, so more entries fit per screen. It refuses the airy docs page of
floating cards and large display titles.

OWN-WORLD: Cool grey ground and white paper; dark mode is blue-black. Mild 1px
rules in two weights, no radius, no shadows. One route blue for wayfinding, with
green marking the Neovim line. Geist for prose and titles, Geist Mono for tool
names, section names, keys, counts, and code.

STORY: Search or scan the ruled index, open a tool, find a section in the contents
rail by name and size, read each entry top to bottom, copy the command.

FIRST VIEWPORT: 48px header split into brand, full-width search, and control
cells. Tool page: 14.5rem index, crumb, 34px title, summary, ruled entries in the
column, 16rem contents rail with counts and a tinted current row. Home: compact
title strip with the git action at right, collection key, then a table-ruled
directory filling the viewport. Signature: section and entry counts drawn from
the content, with shell output muted against ink commands and a blue prompt.

FORM: Timetable, position 4 on the ordered list, code-led build, seed:6a8649b0ee8d5293. User changes: entries flow vertically (existing tables stay tables); current contents row is a plain tint.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
