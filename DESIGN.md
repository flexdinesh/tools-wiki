---
name: tools wiki
description: Timetable, a developer reference ruled onto one dense sheet.
colors:
  route-blue-light: "#0a4fd0"
  route-blue-hover-light: "#083fa6"
  route-blue-dark: "#86abff"
  route-blue-hover-dark: "#adc6ff"
  neovim-line-light: "#0b7a5e"
  neovim-line-dark: "#4cc7a4"
  ground-light: "#f2f3f5"
  paper-light: "#ffffff"
  line-light: "#dadde3"
  line-strong-light: "#b9bfca"
  active-light: "#e8effd"
  ink-light: "#12151b"
  text-light: "#454c59"
  muted-light: "#646c7a"
  ground-dark: "#0e1115"
  paper-dark: "#13171c"
  line-dark: "#262b33"
  line-strong-dark: "#3b424e"
  active-dark: "#1b2843"
  ink-dark: "#eff1f4"
  text-dark: "#b6bcc6"
  muted-dark: "#8d95a3"
typography:
  display:
    fontFamily: "Geist Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "2.125rem"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  page-title:
    fontFamily: "Geist Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  section-title:
    fontFamily: "Geist Mono Variable, ui-monospace, monospace"
    fontSize: "0.9375rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "0em"
  entry-title:
    fontFamily: "Geist Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: "0em"
  directory-title:
    fontFamily: "Geist Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "Geist Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.84375rem"
    fontWeight: 400
    lineHeight: 1.5
  compact:
    fontFamily: "Geist Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.78125rem"
    fontWeight: 400
    lineHeight: 1.45
  table-head:
    fontFamily: "Geist Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.71875rem"
    fontWeight: 500
    lineHeight: 1.45
  rail-head:
    fontFamily: "Geist Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1
  rail-row:
    fontFamily: "Geist Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.3
  index-row:
    fontFamily: "Geist Mono Variable, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: "1.5rem"
  tool-name:
    fontFamily: "Geist Mono Variable, ui-monospace, monospace"
    fontSize: "0.78125rem"
    fontWeight: 600
    lineHeight: 1.4
  count:
    fontFamily: "Geist Mono Variable, ui-monospace, monospace"
    fontSize: "0.6875rem"
    fontWeight: 400
    lineHeight: 1
  key:
    fontFamily: "Geist Mono Variable, ui-monospace, monospace"
    fontSize: "0.6875rem"
    fontWeight: 500
    lineHeight: "1.0625rem"
  code:
    fontFamily: "Geist Mono Variable, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.55
rounded:
  square: "0"
spacing:
  cell-block: "0.3125rem"
  section-top: "0.75rem"
  entry-top: "0.625rem"
  cell-inline: "0.75rem"
  rail-inline: "0.875rem"
  gutter-mobile: "1rem"
  gutter: "1.125rem"
  target: "2.75rem"
components:
  button-primary-light:
    backgroundColor: "{colors.route-blue-light}"
    textColor: "{colors.paper-light}"
    rounded: "{rounded.square}"
    padding: "0 0.6875rem"
    height: "1.875rem"
  button-primary-light-hover:
    backgroundColor: "{colors.route-blue-hover-light}"
  button-primary-dark:
    backgroundColor: "{colors.route-blue-dark}"
    textColor: "{colors.ground-dark}"
    rounded: "{rounded.square}"
    padding: "0 0.6875rem"
    height: "1.875rem"
  button-primary-dark-hover:
    backgroundColor: "{colors.route-blue-hover-dark}"
  header:
    height: "{spacing.target}"
    rounded: "{rounded.square}"
  index-row:
    typography: "{typography.index-row}"
    rounded: "{rounded.square}"
    padding: "0 0.875rem"
  contents-row:
    typography: "{typography.rail-row}"
    rounded: "{rounded.square}"
    padding: "0.125rem 0.875rem"
    height: "1.5625rem"
  current-row-light:
    backgroundColor: "{colors.active-light}"
    textColor: "{colors.route-blue-light}"
  current-row-dark:
    backgroundColor: "{colors.active-dark}"
    textColor: "{colors.route-blue-dark}"
  tool-row:
    typography: "{typography.compact}"
    rounded: "{rounded.square}"
    height: "1.625rem"
  table-cell:
    typography: "{typography.compact}"
    padding: "0.3125rem 0.75rem"
  table-head-light:
    backgroundColor: "{colors.ground-light}"
    textColor: "{colors.muted-light}"
    typography: "{typography.table-head}"
    padding: "0.3125rem 0.75rem"
  table-head-dark:
    backgroundColor: "{colors.ground-dark}"
    textColor: "{colors.muted-dark}"
    typography: "{typography.table-head}"
    padding: "0.3125rem 0.75rem"
  code-frame-light:
    backgroundColor: "{colors.ground-light}"
    textColor: "{colors.ink-light}"
    typography: "{typography.code}"
    rounded: "{rounded.square}"
    padding: "0.5rem 0.75rem"
  code-frame-dark:
    backgroundColor: "{colors.ground-dark}"
    textColor: "{colors.ink-dark}"
    typography: "{typography.code}"
    rounded: "{rounded.square}"
    padding: "0.5rem 0.75rem"
  key-cap:
    typography: "{typography.key}"
    rounded: "{rounded.square}"
    padding: "0 0.25rem"
---

# Design System: tools wiki

## Overview

**Creative North Star: "The Railway Timetable"**

A developer reference ruled like a railway timetable. Everything sits on one sheet, so more entries fit per screen, and a reader mid-task can search or scan, open a tool, find a section by name and size, read each entry top to bottom, and copy the command.

The sheet is white paper on cool grey in light mode and blue-black in dark mode. Mild 1px rules in two weights divide it; there is no radius and no shadow. One route blue does the wayfinding, and green marks the Neovim line. Geist sets prose and titles; Geist Mono sets reference labels and code.

The system refuses the airy docs page of floating cards and large display titles. Native Starlight behavior stays: search, sidebars, contents, theme control, and code copy are restyled, not replaced.

**Key Characteristics:**

- One ruled sheet, with rules running edge to edge across the reading column.
- Paired light and dark themes built from the same roles.
- Section and entry counts drawn from the content, in the directory and the contents rail.
- Vertical entries for command pages; ruled tables for shortcut pages.
- Monochrome code with a route blue prompt, ink commands, and muted output.

## Colors

Cool neutrals carry the sheet; color appears only as wayfinding. Theme roles live on the root element as the project's `--wiki-*` properties, where route blue is the accent role and the Neovim green is the line role.

### Primary

- **Route Blue** (#0a4fd0 light, #86abff dark): links, directory tool names, inline code, current rows, the shell prompt, focus outlines, and the primary action fill.
- **Route Blue Hover** (#083fa6 light, #adc6ff dark): hover fill on the primary action. Text on that fill is white in light mode and Ground in dark mode.

### Secondary

- **Neovim Green** (#0b7a5e light, #4cc7a4 dark): the square mark for the Neovim Plugins collection, in the left index and the collection key.

### Neutral

- **Paper** (#ffffff light, #13171c dark): header, rails, and reading column, all one surface.
- **Ground** (#f2f3f5 light, #0e1115 dark): the second surface. Code frames, table heads, rail heads, inline code, and key caps.
- **Mild Rule** (#dadde3 light, #262b33 dark): the default 1px rule between rows, cells, entries, and rail columns.
- **Strong Rule** (#b9bfca light, #3b424e dark): the heavier 1px rule above sections and tables, under the home title strip, and around the search dialog.
- **Route Tint** (#e8effd light, #1b2843 dark): current rows, row hover, search result hover, and text selection.
- **Ink** (#12151b light, #eff1f4 dark): titles, headings, and shell commands.
- **Text** (#454c59 light, #b6bcc6 dark): prose, table cells, and rail rows.
- **Muted** (#646c7a light, #8d95a3 dark): counts, table heads, section purpose lines, breadcrumb separators, and shell output.

**The One Route Rule.** Route blue is the only wayfinding color. Links, current state, focus, and prompts all use it, in both themes.

**The Neovim Line Rule.** Green only marks the Neovim collection with a square. It never sets text, links, or focus.

**The Paired Theme Rule.** Apply a theme's roles together. Every new surface must work in light and dark before it ships.

## Typography

**Display Font:** Geist, from `@fontsource-variable/geist` (with ui-sans-serif, system-ui fallback)
**Body Font:** Geist (same stack)
**Label/Mono Font:** Geist Mono, from `@fontsource-variable/geist-mono` (with ui-monospace fallback)

**Character:** A plain sans for reading and a matching mono for anything a reader would look up or type. Sizes stay small and close together, so weight and face carry the hierarchy. Numerals are tabular across the site so counts align.

### Hierarchy

- **Display** (600, 2.125rem, 1.1, -0.025em): the home title only.
- **Page Title** (600, 1.875rem, 1.1, -0.025em): tool page titles.
- **Section Title** (Geist Mono, 600, 0.9375rem, 1.3): `##` section names on tool pages.
- **Entry Title** (600, 0.8125rem, 1.35): `###` entry names on tool pages.
- **Directory Title** (600, 0.8125rem, 1.3): collection headings on the home page, in Geist.
- **Body** (400, 0.84375rem, 1.5; 0.875rem below 50rem): prose and tool summaries, capped at 72ch.
- **Compact** (400, 0.78125rem, 1.45): entry purpose lines, section purpose lines, table cells, and directory rows.
- **Table Head** (500, 0.71875rem): table and directory column heads.
- **Rail Head** (600, 0.75rem, 1): collection group labels and the contents heading.
- **Rail Row** (400, 0.75rem, 1.3): contents rail rows, in Geist.
- **Index Row** (Geist Mono, 400, 0.75rem, 1.5rem): tool names in the left index.
- **Tool Name** (Geist Mono, 600, 0.78125rem, 1.4): tool names in the home directory and search results.
- **Count** (Geist Mono, 400, 0.6875rem to 0.75rem): rail counts at the small end, section entry counts at 0.71875rem, directory counts at 0.75rem.
- **Key** (Geist Mono, 500, 0.6875rem): keyboard hints.
- **Code** (Geist Mono, 0.75rem, 1.55): commands at 500, output at 400. Inline code is 0.92em, and 0.75rem at 500 inside tables.

**The Reference Mono Rule.** Geist Mono sets tool names, section names on tool pages, keys, counts, and code. It never sets running text: prose, purpose lines, summaries, and table prose stay in Geist.

**The Compact Title Rule.** Titles stop at 2.125rem. Density comes first; the sheet does not open on a display headline.

## Layout

A fixed frame of ruled columns under a 2.75rem header. From 50rem the header splits into cells: brand over the 13rem index, full-width search, then icon and theme control cells. Tool pages run the 13rem left index, a fluid reading column capped at 80rem, and from 72rem a 13.5rem contents rail. Below 72rem the rail folds into Starlight's contents toggle above the column.

The reading gutter is 1.125rem from 50rem and 1rem below. Section and entry rules, and tables, cancel that gutter to reach the column edges. Rhythm is tight: 0.75rem above a section title, 0.625rem above an entry title, and 0.3125rem by 0.75rem in table cells.

Tool pages open with crumb, title, and summary, then ruled entries or tables. On wide screens the home page fills the viewport: a title strip with the action at right, a 2rem collection key, then a directory of 1.625rem rows in five columns (8rem name, fluid description, 4.5rem sections, 4.5rem entries, 2.25rem arrow).

Below 50rem the sheet is one column and the left index moves behind the menu. Header search and menu, the theme select, index rows and group heads, the home action, and the collection key all hold a 2.75rem minimum. Directory rows stack: name, entry count, and arrow, then the description beneath. The sections count and column head drop out.

**The One Sheet Rule.** Rules run edge to edge and sections sit flush. No gaps, gutters, or margins separate entries into floating blocks.

**The Shared Columns Rule.** From 60rem, Markdown tables use a fixed layout so column rules line up from one section's table to the next. Tables use a 13rem first column and a 34% second. Four-column tables use 9.5rem for the first two (11rem from 72rem) and 30% for the third.

**The Local Scroll Rule.** Wide code and tables scroll inside themselves; the page never scrolls sideways. Below 50rem, table columns after the first keep a 14rem minimum and the first column does not wrap.

## Elevation & Depth

The system is flat, with no shadow anywhere, including the search dialog and mobile dropdowns. Depth is only tone and rule: Ground against Paper, Mild Rule against Strong Rule. The search dialog separates with a Strong Rule edge and a flat dark scrim with no blur.

**The Flat Sheet Rule.** Nothing lifts. If a surface needs separation, give it a rule or a tone.

## Shapes

Every corner is square (0): controls, dialogs, key caps, code frames, current rows. The only recurring silhouette is the 0.5rem square route mark beside a collection name. The mobile menu is two 2px strokes that rotate into an X.

**The Square Corner Rule.** No radius on any new element, in either theme.

## Components

### Header

Compact and cellular. Each region is divided by a Mild Rule, and the bottom edge is a Mild Rule across the full width. Icon and theme cells tint on hover where they link out. Below 50rem search collapses to a 2.75rem icon and the menu to a 2.75rem ruled cell that takes the tint and route blue when open.

### Search

Native Starlight search and dialog. The trigger is transparent and fills with Ground on hover, with a Ground key cap. In the dialog, the 2.75rem input sits on a bottom rule and results are ruled rows, with tool names in Tool Name and excerpts in Muted. Hover and focus use Route Tint.

### Left index

Collections have a 1.75rem Ground head with route mark, Rail Head label, and a page count at right. Rows are flush mono names at 1.5rem. Hover and current rows use Route Tint with Route Blue text; current is also semibold.

### Contents rail

Lists `##` sections only, each with its entry count at right, under a Ground head carrying the page total. Rows are at least 1.5625rem. The current row is a plain tint: Route Tint with Route Blue semibold text, and nothing else.

**The Plain Tint Rule.** Current state is a tint and a text color. No bar, border, dot, or marker.

**The Drawn Count Rule.** Section and entry counts come from the page content at build time, never typed by hand.

### Page opening

Breadcrumb (0.75rem, Muted, with a medium Route Blue collection link), title, then the page's own frontmatter description in Body. A Strong Rule starts the first section.

### Entries

Each `##` section has a Strong Rule above, a mono title, the entry count at right, and a Muted purpose line. Each `###` entry has a Mild Rule above (Strong for the first in a section) and stacks title, purpose line, then example down the column. Anchor links reveal on hover where the device hovers.

**The Vertical Entry Rule.** Entries flow top to bottom in a single column. Don't arrange them in side-by-side columns or grids.

### Code

Ground frame with a 1px Mild Rule, padded 0.5rem by 0.75rem, no window frame or title bar. The native copy control is always visible, borderless on Ground, tinting to Mild Rule with Ink on hover. Inline code is Route Blue on Ground; in table cells it drops the fill.

**The Terminal Voices Rule.** Code is monochrome. In shell blocks the `$` is Route Blue, commands are Ink at 500, and output is Muted at 400. No syntax hues, in any language.

### Tables

Markdown tables stay ruled tables and are not reflowed into entries. A Strong Rule sits above a Ground head row, cells are divided by Mild Rules in both directions, and the first column aligns to the reading gutter.

### Home directory

The first collection heading is visually hidden because the key labels it. Native links read as continuous ruled rows under a Ground column head: Tool Name in Route Blue, description in Compact (truncated on one line from 50rem), sections and entry counts right-aligned in mono, then an arrow. Hover and focus tint the row and move the arrow 3px over 160ms with cubic-bezier(0.16, 1, 0.3, 1). Reduced motion removes the transition.

### Collection key

A ruled strip of cells linking to each collection: square route mark, semibold name, Muted count. Hover uses Route Tint. On mobile the cells share the row equally.

### Primary action

Square Route Blue fill with a 1.875rem height (2.75rem below 50rem), medium 0.78125rem label, and a trailing arrow. Hover moves to Route Blue Hover. The home page uses one action, at the right of the title strip.

### Pagination

Previous and next links sit in one ruled box split by a Mild Rule, flat with a Route Tint hover.

### Focus

A 2px Route Blue outline with 2px offset, drawn inset (-2px) on flush rows and cells so rules never clip it.

## Do's and Don'ts

### Do:

- **Do** apply light and dark roles together, and check every surface in both.
- **Do** divide with the two 1px rule weights: Mild Rule between rows and entries, Strong Rule above sections and tables.
- **Do** keep Geist for prose and titles, and Geist Mono for reference labels and code.
- **Do** derive counts from page content.
- **Do** keep native Starlight search, sidebars, contents, theme control, and code copy.
- **Do** hold 2.75rem targets on navigation and controls below 50rem, and scroll wide code and tables locally.
- **Do** keep visible focus and reduced motion support on anything that moves.

### Don't:

- **Don't** add shadows, blur, or radius to any surface.
- **Don't** float directory rows or entries as spaced cards, or open a page on a large display title.
- **Don't** set prose, purpose lines, or summaries in Geist Mono.
- **Don't** add syntax colors to code.
- **Don't** add `###` entries to the contents rail or a bar or marker to its current row.
- **Don't** use Neovim green for text, links, or focus.
- **Don't** hide Markdown table columns to fit narrow screens.
