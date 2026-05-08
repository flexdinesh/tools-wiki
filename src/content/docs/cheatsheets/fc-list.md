---
title: fc-list
description: List installed font families and font names with sorted, deduplicated output.
---

`fc-list` lists fonts known to Fontconfig. It is common on Linux, and on macOS it is available after installing Fontconfig, for example with `brew install fontconfig`.

## Availability

### Check that fc-list is installed

Print the installed `fc-list` version.

```bash
$ fc-list --version
fontconfig version 2.15.0
```

## Font Names

### List font families

Print available font families, sorted and deduplicated.

```bash
$ fc-list : family | sort -u
Fira Code
Helvetica
Menlo
SF Mono
```

### List clean font family names

Split comma-separated family aliases, trim whitespace, then sort and deduplicate.

```bash
$ fc-list : family | tr ',' '\n' | sed 's/^[[:space:]]*//;s/[[:space:]]*$//' | sort -u
Fira Code
Helvetica
Menlo
SF Mono
```
