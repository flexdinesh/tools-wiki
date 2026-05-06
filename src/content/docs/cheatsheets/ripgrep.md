---
title: ripgrep
description: Search code by text or regex, file type, glob, context, and match counts.
---

`ripgrep` (`rg`) searches directories quickly while respecting ignore files by default. It is usually the fastest way to search a codebase from the terminal.

## Basics

### Search the current tree

Search recursively from the current directory.

```bash
$ rg "TODO"
src/index.ts:12:// TODO: handle empty state
README.md:8:TODO: add setup notes
```

### Search a path

Pass a path to limit the search scope.

```bash
$ rg "TODO" src
src/index.ts:12:// TODO: handle empty state
```

### Ignore case

Use `-i` to match text regardless of case.

```bash
$ rg -i "error"
logs/app.log:42:ERROR failed to connect
logs/app.log:45:error retrying
```

### Search fixed strings

Use `-F` when the pattern should be treated literally.

```bash
$ rg -F "user.name"
src/user.ts:10:return user.name
```

### Match whole words

Use `-w` to avoid matching inside longer words.

```bash
$ rg -w "log"
src/logger.ts:4:export function log(message) {
```

## Regex

### Match alternatives

Use regex alternation to match related patterns.

```bash
$ rg "use(State|Effect)"
src/App.tsx:1:import { useEffect, useState } from "react"
```

### Match class-like error names

Use character classes and word boundaries for structured patterns.

```bash
$ rg "\\b[A-Z][A-Za-z]+Error\\b"
src/errors.ts:3:export class NetworkError extends Error {}
```

## Files and Globs

### Search a file type

Use `-t` to search files of a known type.

```bash
$ rg "fetch" -t ts
src/api.ts:18:const res = await fetch(url)
```

### Search a glob

Use `-g` to include files matching a glob.

```bash
$ rg "fetch" -g "*.ts"
src/api.ts:18:const res = await fetch(url)
```

### Combine include and exclude globs

Add a negated glob to skip matching files.

```bash
$ rg "fetch" -g "*.ts" -g "!*.test.ts"
src/api.ts:18:const res = await fetch(url)
```

### Exclude a directory

Use a negated glob to skip noisy directories.

```bash
$ rg "TODO" --glob "!node_modules/**"
src/index.ts:12:// TODO: handle empty state
```

## File Lists and Counts

### List searchable files

Use `--files` to print files ripgrep would search.

```bash
$ rg --files
README.md
src/index.ts
src/api.ts
```

### List files with matches

Use `-l` when you only need matching filenames.

```bash
$ rg -l "TODO"
README.md
src/index.ts
```

### Count matching lines

Use `-c` to count matching lines per file.

```bash
$ rg -c "TODO"
README.md:1
src/index.ts:2
```

## Context and Output

### Show line numbers

Use `-n` to include line numbers in results.

```bash
$ rg -n "TODO"
src/index.ts:12:// TODO: handle empty state
```

### Show context

Use `-C` to show lines before and after each match.

```bash
$ rg -C 2 "panic!"
src/main.rs-10-    let value = load();
src/main.rs-11-    if value.is_none() {
src/main.rs:12:        panic!("missing value");
src/main.rs-13-    }
```

### Emit JSON

Use `--json` when another tool should parse the search results.

```bash
$ rg --json "TODO"
{"type":"begin","data":{"path":{"text":"src/index.ts"}}}
{"type":"match","data":{"lines":{"text":"// TODO: handle empty state\n"}}}
```
