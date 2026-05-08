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

Use `--ignore-case` or `-i` to match text regardless of case.

```bash
$ rg --ignore-case "error"
logs/app.log:42:ERROR failed to connect
logs/app.log:45:error retrying

$ rg -i "error"
logs/app.log:42:ERROR failed to connect
logs/app.log:45:error retrying
```

### Force case-sensitive search

Use `--case-sensitive` or `-s` to force exact case matching, especially when aliases or config enable ignore-case or smart-case behavior.

```bash
$ rg --case-sensitive "Error"
src/errors.ts:3:export class NetworkError extends Error {}

$ rg -s "Error"
src/errors.ts:3:export class NetworkError extends Error {}
```

### Search fixed strings

Use `--fixed-strings` or `-F` when the pattern should be treated literally.

```bash
$ rg --fixed-strings "user.name"
src/user.ts:10:return user.name

$ rg -F "user.name"
src/user.ts:10:return user.name
```

### Match whole words

Use `--word-regexp` or `-w` to avoid matching inside longer words.

```bash
$ rg --word-regexp "log"
src/logger.ts:4:export function log(message) {

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

Use `--type` or `-t` to search files of a known type.

```bash
$ rg "fetch" --type ts
src/api.ts:18:const res = await fetch(url)

$ rg "fetch" -t ts
src/api.ts:18:const res = await fetch(url)
```

### Search a glob

Use `--glob` or `-g` to include files matching a glob.

```bash
$ rg "fetch" --glob "*.ts"
src/api.ts:18:const res = await fetch(url)

$ rg "fetch" -g "*.ts"
src/api.ts:18:const res = await fetch(url)
```

### Search multiple file types with one glob

Use brace expansion in `--glob` or `-g` to include multiple file extensions.

```bash
$ rg "TODO" --glob "*.{md,css,ts}"
README.md:8:TODO: add setup notes
src/styles.css:4:/* TODO: theme tokens */
src/index.ts:12:// TODO: handle empty state

$ rg "TODO" -g "*.{md,css,ts}"
README.md:8:TODO: add setup notes
src/styles.css:4:/* TODO: theme tokens */
src/index.ts:12:// TODO: handle empty state
```

### Exclude multiple file types with one glob

Prefix a brace glob with `!` in `--glob` or `-g` to exclude multiple file extensions.

```bash
$ rg "TODO" --glob "!*.{md,css,ts}"
src/index.html:6:<!-- TODO: add meta tags -->

$ rg "TODO" -g "!*.{md,css,ts}"
src/index.html:6:<!-- TODO: add meta tags -->
```

### Combine include and exclude globs

Add a negated glob to skip matching files with `--glob` or `-g`.

```bash
$ rg "fetch" --glob "*.ts" --glob "!*.test.ts"
src/api.ts:18:const res = await fetch(url)

$ rg "fetch" -g "*.ts" -g "!*.test.ts"
src/api.ts:18:const res = await fetch(url)
```

### Exclude a directory

Use a negated glob with `--glob` or `-g` to skip noisy directories.

```bash
$ rg "TODO" --glob "!node_modules/**"
src/index.ts:12:// TODO: handle empty state

$ rg "TODO" -g "!node_modules/**"
src/index.ts:12:// TODO: handle empty state
```

### Search ignored files

Use `--no-ignore` or `-u` to search files normally skipped by ignore files such as `.gitignore`, `.ignore`, or `.rgignore`.

```bash
$ rg --no-ignore "generated client"
dist/client.js:1:// generated client

$ rg -u "generated client"
dist/client.js:1:// generated client
```

### Search ignored and hidden files

Use `--no-ignore --hidden` or `-uu` to search ignored files and hidden files or directories.

```bash
$ rg --no-ignore --hidden "API_KEY"
.env:1:API_KEY=example
dist/config.js:2:const API_KEY = "example"

$ rg -uu "API_KEY"
.env:1:API_KEY=example
dist/config.js:2:const API_KEY = "example"
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

Use `--files-with-matches` or `-l` when you only need matching filenames.

```bash
$ rg --files-with-matches "TODO"
README.md
src/index.ts

$ rg -l "TODO"
README.md
src/index.ts
```

### Count matching lines

Use `--count` or `-c` to count matching lines per file.

```bash
$ rg --count "TODO"
README.md:1
src/index.ts:2

$ rg -c "TODO"
README.md:1
src/index.ts:2
```

## Context and Output

### Show line numbers

Use `--line-number` or `-n` to include line numbers in results.

```bash
$ rg --line-number "TODO"
src/index.ts:12:// TODO: handle empty state

$ rg -n "TODO"
src/index.ts:12:// TODO: handle empty state
```

### Show context

Use `--context` or `-C` to show lines before and after each match.

```bash
$ rg --context 2 "panic!"
src/main.rs-10-    let value = load();
src/main.rs-11-    if value.is_none() {
src/main.rs:12:        panic!("missing value");
src/main.rs-13-    }

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
