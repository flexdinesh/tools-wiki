---
name: tools wiki
description: Reference Atlas, a carefully typeset developer reference.
colors:
  ground-dark: "#171f22"
  paper-dark: "#1e282a"
  sidebar-dark: "#1e282a"
  line-dark: "#3b4b4d"
  soft-dark: "#273439"
  active-dark: "#2a3d5b"
  ink-dark: "#eef2ee"
  text-dark: "#c5d0cd"
  muted-dark: "#aabbb9"
  cobalt-dark: "#b6c8ff"
  cobalt-hover-dark: "#d0dbff"
  ground-light: "#f8f6ee"
  paper-light: "#fffefa"
  sidebar-light: "#fffefa"
  line-light: "#d4d9d3"
  soft-light: "#eef1ed"
  active-light: "#e4ebfa"
  ink-light: "#203036"
  text-light: "#4d6064"
  muted-light: "#5c6e72"
  cobalt-light: "#3159b6"
  cobalt-hover-light: "#254696"
typography:
  display:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(3.5rem, 7vw, 5.5rem)"
    fontWeight: 600
    lineHeight: 1.03
    letterSpacing: "-0.035em"
  page-title:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(3.5rem, 5.5vw, 5rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.035em"
  section:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "1.7rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.035em"
  command-heading:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "1.35rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.025em"
  body:
    fontFamily: "IBM Plex Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
  summary:
    fontFamily: "IBM Plex Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.04rem"
    lineHeight: 1.6
  breadcrumb:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontSize: "0.7rem"
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: "0.08em"
  tool-name:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontSize: "0.9rem"
    fontWeight: 600
    lineHeight: 1.4
  navigation:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontSize: "0.81rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontSize: "0.68rem"
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: "0.11em"
  code:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontSize: "0.82rem"
    lineHeight: 1.65
  terminal-label:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontSize: "0.65rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0.04em"
rounded:
  square: "0"
  small: "2px"
  dialog: "4px"
spacing:
  compact: "0.5rem"
  row-block: "0.85rem"
  regular: "1rem"
  row-gap: "1.25rem"
  panel: "1.65rem"
  section: "2.5rem"
components:
  button-primary-light:
    backgroundColor: "{colors.cobalt-light}"
    textColor: "#ffffff"
    rounded: "{rounded.small}"
    padding: "0.5rem 0.85rem"
  button-primary-dark:
    backgroundColor: "{colors.cobalt-dark}"
    textColor: "{colors.ground-dark}"
    rounded: "{rounded.small}"
    padding: "0.5rem 0.85rem"
  button-minimal:
    rounded: "{rounded.small}"
    padding: "0.5rem 0.85rem"
  tool-row:
    rounded: "{rounded.square}"
    padding: "0.85rem 0.5rem"
  navigation-active:
    rounded: "{rounded.square}"
  search-trigger:
    rounded: "{rounded.square}"
  breadcrumb:
    typography: "{typography.breadcrumb}"
  page-opening:
    typography: "{typography.page-title}"
  code-frame:
    typography: "{typography.code}"
    rounded: "{rounded.square}"
  table-cell:
    padding: "0.55rem 0.75rem"
---

# Design System: tools wiki

## Overview

**Creative North Star: "Reference Atlas"**

A carefully typeset reference for developers working in the middle of a task. The reading pane and navigation share one paper surface; thin rules define the catalog rails, while cobalt shows the path through them. The same structure turns deep blue-green in dark mode.

Fraunces gives page titles, sections, and command headings an editorial voice. IBM Plex Sans keeps explanations readable; IBM Plex Mono marks commands, tool names, section labels, and keys. Thin rules and square highlights organize dense information without adding visual weight.

**Key Characteristics:**

- Paired warm-paper and blue-green themes with cobalt wayfinding.
- Serif titles and command headings, sans prose, and mono labels and syntax.
- Flat directory rows, compact controls, and visible keyboard focus.

## Colors

### Primary

**Catalog Cobalt** is the link, action, focus, and active-navigation accent. The light theme uses a deeper cobalt; the dark theme uses a softer one. Each has a distinct hover color. Active backgrounds tint the surrounding paper instead of adding elevation.

### Neutral

**Paper and catalog rails** share one surface color in each theme; thin lines separate the navigation from the reading pane. **Ink** carries titles, **text** carries prose, and **muted** carries supporting labels. **Soft** fills code and table headers.

**The Paired Theme Rule.** Apply the matching light or dark roles together. Keep link and focus treatment cobalt in both.

## Typography

**Display Font:** Fraunces (Georgia fallback). **Body Font:** IBM Plex Sans (system sans fallback). **Reference Font:** IBM Plex Mono (system mono fallback).

### Hierarchy

- **Display:** large homepage title; semibold with tight tracking.
- **Page title:** large Fraunces heading; tool pages use a smaller mobile clamp.
- **Section and command heading:** Fraunces organizes workflows and individual examples.
- **Body:** IBM Plex Sans with generous leading for commands and explanations.
- **Summary:** slightly larger sans text under each tool title.
- **Breadcrumb:** small uppercase mono links to the home directory section.
- **Tool name, navigation, and label:** IBM Plex Mono; small uppercase labels have extra tracking.
- **Code:** IBM Plex Mono in inline syntax and framed examples.
- **Terminal label:** small mono header text above terminal examples.

**The Three Voice Rule.** Use serif for major headings, sans for explanation and controls, mono for reference structure and syntax.

## Layout

The reading column is capped at (49rem), with a (15rem) left sidebar and a (3.75rem) header. The home directory is one column. Each row pairs a (9rem) tool-name column with a flexible description and arrow; below (38rem), name and description stack.

At (50rem), the homepage hero can place copy and actions side by side; the header places search between the site title and theme controls. Below that width, controls gain a (2.75rem) minimum height and sidebar links gain room to tap. Wide code and tables scroll locally; narrow table descriptions keep a (14rem) minimum width.

From (40rem) through widths below (50rem), content and header navigation use a (2.75rem) horizontal inset. At a (390px) phone width, both retain the compact (1rem) inset.

## Elevation & Depth

**The Flat Reference Rule.** Use tonal surfaces and thin (1px) borders. Directory rows and pagination have no shadow. Terminal examples alone use a hard, unblurred (4px) offset in the active tint.

## Shapes

Directory rows, navigation highlights, search triggers, the mobile menu and table-of-contents triggers, code frames, and pagination are square. Inline code, keycaps, and hero actions use the small (2px) radius; the search dialog uses (4px).

## Components

- **Hero actions:** compact, semibold controls with a cobalt primary action and quiet minimal action. Primary hover changes to the theme's hover cobalt; focus keeps the global visible outline.
- **Header:** serif site title with a small REFERENCE ATLAS mono label; desktop search is right-aligned in the central header slot. On narrow phones, search and menu use matching (2.75rem) square tap targets and (1rem) icons; search expands to a labeled control at tablet widths.
- **Page opening:** tool pages start with a collection breadcrumb, large Fraunces title, and the page's existing frontmatter description. The breadcrumb links back to the matching home directory section.
- **Tool directory:** native LinkCard links read as continuous rows. Hover or focus tints the row and shifts the arrow (3px). Both changes transition for (160ms) with cubic-bezier(0.16, 1, 0.3, 1); reduced motion removes the transitions.
- **Navigation:** left index and right contents rail match the reading surface; thin rules define the columns. Compact mono links and square cobalt active highlights provide wayfinding. Mobile sidebar links are at least (2.75rem) tall. The outlined mobile menu trigger matches search; two strokes form an X when open.
- **Search:** native Starlight trigger and dialog with theme-aware surfaces and tinted highlights. A disabled trigger uses a wait cursor and (0.65) opacity.
- **References:** cobalt inline code, square bordered code frames, compact tables with alternating ground rows, native code copy, and local scrolling. Terminal frames use a labeled header with a visible COPY control; code text is neutral ink except the first command token in cobalt.
- **Focus:** cobalt outline (2px) with (3px) offset.

## Do's and Don'ts

### Do:

- **Do** pair each theme's paper, ink, line, and cobalt tokens.
- **Do** keep Fraunces headings, sans reading text, and mono reference labels.
- **Do** preserve native controls, visible focus, and reduced-motion support.
- **Do** stack directory content on narrow screens and scroll wide references locally.

### Don't:

- **Don't** add diffuse shadows to reference surfaces or window dots to terminal headers.
- **Don't** turn the compact directory into spacious promotional cards.
- **Don't** hide table columns or shrink prose to avoid scrolling.
