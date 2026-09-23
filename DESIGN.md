---
name: tools wiki
description: Syntax Studio, a compact developer reference with code-editor color.
colors:
  action: "#7052cf"
  action-hover: "#5d3fba"
  action-text: "#ffffff"
  action-light: "#146c60"
  action-hover-light: "#0f564c"
  accent-light: "#146c60"
  accent-dark: "#c0a8ff"
  teal-light: "#18786b"
  teal-dark: "#85d9c3"
  coral-light: "#b64c39"
  coral-dark: "#f5a18d"
  ground-light: "#fafaf6"
  surface-light: "#ffffff"
  border-light: "#d8e3dc"
  soft-light: "#edf4ef"
  active-light: "#dceee5"
  heading-light: "#24332e"
  text-light: "#4b5d55"
  muted-light: "#61736a"
  ground-dark: "#191720"
  surface-dark: "#211e2a"
  border-dark: "#40394e"
  soft-dark: "#2b2539"
  active-dark: "#3b2e55"
  heading-dark: "#f0ebfa"
  text-dark: "#c9c0d6"
  muted-dark: "#afa3c0"
typography:
  display:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "clamp(1.75rem, 4vw, 2.5rem)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.04em"
  page-title:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "clamp(1.75rem, 3vw, 2.25rem)"
    fontWeight: 600
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "1.25rem"
    fontWeight: 600
    letterSpacing: "-0.035em"
  title:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "1rem"
    fontWeight: 600
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.65
  tool-name:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "0.875rem"
    fontWeight: 600
    letterSpacing: "-0.025em"
  description:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.6
  action:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
  code:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "0.8125rem"
    lineHeight: 1.65
  navigation:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "0.75rem"
    lineHeight: 1.7
rounded:
  row: "0"
  inline: "3px"
  navigation: "4px"
  control: "6px"
  dialog: "8px"
spacing:
  tight: "0.25rem"
  compact: "0.5rem"
  small: "0.75rem"
  regular: "1rem"
  inset: "1.25rem"
  roomy: "1.5rem"
  section: "2rem"
components:
  button-primary:
    backgroundColor: "{colors.action-light}"
    textColor: "{colors.action-text}"
    typography: "{typography.action}"
    rounded: "{rounded.control}"
    padding: "0.5rem 0.75rem"
  button-primary-hover:
    backgroundColor: "{colors.action-hover-light}"
  button-minimal:
    typography: "{typography.action}"
    rounded: "{rounded.control}"
    padding: "0.5rem 0.75rem"
  tool-row:
    rounded: "{rounded.row}"
    padding: "0.75rem 0.5rem"
  navigation-active:
    typography: "{typography.navigation}"
    rounded: "{rounded.navigation}"
  search-trigger:
    rounded: "{rounded.control}"
  code-frame:
    typography: "{typography.code}"
    rounded: "{rounded.control}"
  table-cell:
    padding: "0.5rem 0.75rem"
---

# Design System: tools wiki

## Overview

**Creative North Star: "Syntax Studio"**

A compact developer reference with the color vocabulary of a code editor. Mono headings and tool names support quick scanning; quiet prose explains commands and results.

Both themes use flat surfaces, thin dividers and small controls. Native Starlight search, navigation, themes and code controls remain familiar.

**Key Characteristics:**

- Deep teal actions in light mode, violet actions in dark mode; teal names and coral markers in both.
- JetBrains Mono headings/code with Inter prose.
- Continuous tool rows and compact controls.
- Paired light and dark themes with visible keyboard focus.

## Colors

### Primary

Deep teal identifies light-mode actions, links, focus and active navigation. Dark mode retains violet. Filled primary actions retain white text in both themes. The root action/action-hover tokens are dark defaults; action-light/action-hover-light override them in light mode.

### Secondary

Teal identifies tool names, section headings and inline code.

### Tertiary

Coral marks section punctuation and navigation group labels.

### Neutral

Warm-white ground, white reading surfaces and soft mint states pair with the existing deep ink dark theme. Theme-specific borders and quiet text preserve the same hierarchy.

**The Theme Pair Rule.** Use paired theme roles for surfaces, text, accents and filled controls; scope palette overrides to their theme.

## Typography

Self-hosted JetBrains Mono carries headings, names, navigation and code. Self-hosted Inter carries prose, descriptions and actions. Both use regular and semibold weights.

The token hierarchy separates the compact hero and page title from section headings, row names and code. Home section headings use the title scale. Reading prose stays within (72ch).

**The Syntax Voice Rule.** Use mono for reference structure and syntax; use Inter for explanations.

## Layout

Reading width is (48rem), sidebar width (14rem), header height (3.5rem). The homepage directory is always one column. Each desktop row pairs an (8.5rem) name column with a flexible description and trailing arrow. Below (38rem), name and description stack within each row.

At (50rem), hero copy and actions share a horizontal row. Narrower screens wrap actions, enlarge search/theme controls to (2.75rem), and increase sidebar link padding. Tables and code scroll locally when necessary; narrow table descriptions retain (14rem) minimum width.

## Elevation & Depth

**The Flat Reference Rule.** Separate surfaces with tonal contrast and thin borders; rows, code frames, pagination and search dialogs have no shadows.

## Shapes

Tool rows are square and continuous. Inline code and shortcut keys use the smallest radius; navigation, controls and dialogs follow the compact rounded scale. Borders are fine (1px).

## Components

- **Actions:** small semibold controls; violet primary and minimal secondary. Primary hover deepens violet. Hero controls have (2.5rem) minimum height, increasing to (2.75rem) below (50rem).
- **Tool rows:** native LinkCard links presented as flat directory rows. Hover or focus tints the whole row and shifts the arrow (3px). Background and arrow transitions use (160ms) with cubic-bezier(0.16, 1, 0.3, 1); reduced motion disables transitions.
- **Navigation:** compact mono labels; coral groups, soft hover backgrounds, violet active text and tinted active backgrounds. Native mobile menu behavior remains.
- **Search:** native Starlight trigger and dialog; compact rounded boundaries, theme-aware surfaces, and tinted search highlights. Disabled triggers use a wait cursor and (0.65) opacity.
- **References:** teal inline code, quiet bordered code frames and compact tables with alternating ground rows. Native copy and table scrolling remain available.
- **Focus:** visible accent outline (2px) with an offset (3px).

## Do's and Don'ts

### Do:

- **Do** preserve teal/coral light mode and violet/teal/coral dark mode.
- **Do** keep mono hierarchy and quiet Inter prose.
- **Do** retain native controls, visible focus and reduced-motion support.
- **Do** stack row content on narrow screens and scroll wide references locally.

### Don't:

- **Don't** restore spacious chapter cards or the removed homepage Git example panel.
- **Don't** add shadows to flat reference surfaces.
- **Don't** hide table columns or shrink prose to avoid scrolling.
