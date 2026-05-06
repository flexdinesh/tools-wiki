---
title: ripgrep
description: Search text by pattern, file type, glob, context, replacements, and machine-readable output.
---

`ripgrep` searches files recursively with the `rg` command. It respects `.gitignore` by default, skips hidden files and binary files by default, and is optimized for fast project-wide searches.

## Basics

Search projects with common `rg` options.

### Search the current tree

Search recursively from the current directory for a pattern.

```bash
$ rg "TODO"
src/index.ts:12:// TODO: validate input
README.md:8:TODO: document setup
```

### Search a path

Search only under a specific path.

```bash
$ rg "TODO" src
src/index.ts:12:// TODO: validate input
src/App.tsx:34:// TODO: split component
```

### Ignore case

Search without case sensitivity.

```bash
$ rg -i "error"
src/logger.ts:7:export function error(message: string) {
src/api.ts:22:throw new Error("Request failed")
```

### Search fixed strings

Search for a fixed string instead of interpreting the pattern as a regex.

```bash
$ rg -F "user.name"
config/app.toml:3:user.name = "alice"
```

### Match whole words

Match only whole words.

```bash
$ rg -w "log"
src/logger.ts:1:export const log = console.log
```

---

## Regex

Use regex features for richer matching.

### Match alternatives

Match one of several alternatives with a regex group.

```bash
$ rg "use(State|Effect)"
src/App.tsx:1:import { useEffect, useState } from "react";
src/App.tsx:6:const [count, setCount] = useState(0);
```

### Match class names

Find error-like class names with word boundaries.

```bash
$ rg "\\b[A-Z][A-Za-z]+Error\\b"
src/errors.ts:1:export class ValidationError extends Error {}
src/api.ts:22:throw new NetworkError("Request failed")
```

### Use PCRE2 lookbehind

Use PCRE2 features such as lookbehind when the default regex engine is not enough.

```bash
$ rg -P "(?<=token=)[A-Za-z0-9]+"
.env.example:1:API_URL=https://example.com?token=abc123
```

### Match across lines

Allow a regex match to span multiple lines.

```bash
$ rg -U "start[\\s\\S]*end"
docs/block.txt:1:start
docs/block.txt:2:middle
docs/block.txt:3:end
```

---

## Files and Globs

Scope searches by type, glob, and ignore rules.

### Search a file type

Search only files matching a built-in file type.

```bash
$ rg "fetch" -t ts
src/api.ts:10:const response = await fetch(url);
```

### Search a glob

Search files matching a glob.

```bash
$ rg "fetch" -g "*.ts"
src/api.ts:10:const response = await fetch(url);
```

### Search multiple extensions

Search multiple file extensions with one brace-expanded glob expression.

```bash
$ rg "TODO" -g '**/*.{js,ts,tsx,md}'
src/index.ts:12:// TODO: validate input
src/App.tsx:34:// TODO: split component
README.md:8:TODO: document setup
```

### Combine include and exclude globs

Combine include and exclude globs.

```bash
$ rg "fetch" -g "*.ts" -g "!*.test.ts"
src/api.ts:10:const response = await fetch(url);
```

### Include hidden files

Include hidden files and directories, while still respecting ignore files.

```bash
$ rg "secret" --hidden
.env.example:2:SECRET_KEY=change-me
```

### Ignore ignore files

Search files that would normally be skipped by `.gitignore`, `.ignore`, or other ignore files.

```bash
$ rg "generated" --no-ignore
dist/index.js:1:// generated file
```

### Exclude a directory

Exclude a directory or path pattern explicitly.

```bash
$ rg "TODO" --glob "!node_modules/**"
src/index.ts:12:// TODO: validate input
README.md:8:TODO: document setup
```

---

## File Lists and Counts

List searchable files and count matches.

### List searchable files

List files that ripgrep would search.

```bash
$ rg --files
README.md
package.json
src/index.ts
```

### List files by glob

List searchable files matching a glob.

```bash
$ rg --files -g "*.md"
README.md
docs/install.md
```

### List files with matches

Print only files that contain at least one match.

```bash
$ rg -l "TODO"
README.md
src/index.ts
src/App.tsx
```

### List files without matches

Print only files that do not contain a match.

```bash
$ rg --files-without-match "TODO"
package.json
src/logger.ts
```

### Count matching lines

Print the number of matching lines per file.

```bash
$ rg -c "TODO"
README.md:1
src/index.ts:1
src/App.tsx:1
```

### Count all matches

Print the number of individual matches per file.

```bash
$ rg --count-matches "TODO"
README.md:1
src/index.ts:2
src/App.tsx:1
```

---

## Context and Output

Shape match output for people, editors, and scripts.

### Show line numbers

Show line numbers with matches. This is enabled by default when output goes to a terminal, but useful in scripts.

```bash
$ rg -n "TODO"
src/index.ts:12:// TODO: validate input
README.md:8:TODO: document setup
```

### Show context

Show two lines of context before and after each match.

```bash
$ rg -C 2 "panic!"
src/main.rs-8-    if config.invalid {
src/main.rs:9:        panic!("invalid config");
src/main.rs-10-    }
```

### Show asymmetric context

Show a custom number of lines after and before each match.

```bash
$ rg -A 3 -B 1 "error"
src/api.ts-21-if (!response.ok) {
src/api.ts:22:  throw new Error("Request failed");
src/api.ts-23-}
src/api.ts-24-return response.json();
```

### Group by file

Group matches by file with headings and line numbers.

```bash
$ rg --heading --line-number "TODO"
src/index.ts
12:// TODO: validate input

README.md
8:TODO: document setup
```

### Emit vimgrep format

Print matches in `file:line:column:text` format for editors and quickfix lists.

```bash
$ rg --vimgrep "TODO"
src/index.ts:12:4:// TODO: validate input
README.md:8:1:TODO: document setup
```

### Emit JSON

Emit structured JSON events for scripts and tools.

```bash
$ rg --json "TODO"
{"type":"begin","data":{"path":{"text":"src/index.ts"}}}
{"type":"match","data":{"path":{"text":"src/index.ts"},"lines":{"text":"// TODO: validate input\n"},"line_number":12}}
{"type":"end","data":{"path":{"text":"src/index.ts"},"stats":{"matches":1}}}
```

---

## Replace Preview

Preview replacements and matching fragments.

### Preview replacement output

Preview replacements in matching output. `rg --replace` does not edit files.

```bash
$ rg 'http://([^ ]+)' -r 'https://$1'
README.md:Visit https://example.com for docs.
```

### Print only matches

Print only the matching part of each line.

```bash
$ rg -o 'TODO\([^)]*\)'
src/index.ts:TODO(validate input)
src/App.tsx:TODO(split component)
```

### Print null-delimited paths

Print matching file paths separated by NUL bytes for safe piping to tools that support `-0`.

```bash
$ rg -l "TODO" -0
README.md\0src/index.ts\0src/App.tsx\0
```

---

## Types and Debugging

Inspect file types and debug search behavior.

### List file types

List built-in file types and the globs they match.

```bash
$ rg --type-list
rust: *.rs
terraform: *.tf, *.tfvars
typescript: *.ts, *.tsx
```

### Search Rust files

Search only Rust files.

```bash
$ rg "main" -t rust
src/main.rs:1:fn main() {
```

### Exclude Markdown type

Exclude Markdown files by type.

```bash
$ rg "TODO" -T md
src/index.ts:12:// TODO: validate input
src/App.tsx:34:// TODO: split component
```

### Add a custom type

Define a custom file type for a single command and search it.

```bash
$ rg --type-add 'astro:*.astro' -t astro "TODO"
src/pages/index.astro:5:<!-- TODO: add metadata -->
```

### Debug search behavior

Explain how ripgrep walks files, applies ignore rules, and chooses search behavior.

```bash
$ rg --debug "TODO"
DEBUG|rg::flags::parse|crates/core/flags/parse.rs:97: no extra arguments found from configuration file
DEBUG|ignore::walk|crates/ignore/src/walk.rs:1799: ignoring ./node_modules: Ignore(IgnoreMatch(Gitignore(Glob { from: Some("./.gitignore"), original: "node_modules/", actual: "**/node_modules", is_whitelist: false, is_only_dir: true })))
src/index.ts:12:// TODO: validate input
```

---

## Popular use cases

Use `rg` with Git, selectors, and JSON output to search codebases quickly.

### Search TODOs and choose one interactively

Pipe line-numbered matches into `fzf` for quick navigation.

```bash
$ rg -n "TODO|FIXME" | fzf
src/app.ts:12:TODO: handle empty responses
```

### Count TODOs by file

Extract filenames from matches, group them, and rank the busiest files.

```bash
$ rg -n "TODO" | cut -d: -f1 | sort | uniq -c | sort -nr
   5 src/app.ts
   2 src/config.ts
```

### Search tracked files only

Use Git to list tracked TypeScript files, then search them with `rg`.

```bash
$ git ls-files "*.ts" | xargs rg -n "useEffect"
src/app.ts:18:useEffect(() => {
```

### Filter machine-readable matches with jq

Emit JSON events and extract matching paths with `jq`.

```bash
$ rg --json "error" logs | jq -r 'select(.type == "match") | .data.path.text' | sort -u
logs/app.log
logs/worker.log
```

### Preview files before a bulk change

List files containing a symbol before running a replacement tool.

```bash
$ rg -l "oldName" src
src/app.ts
src/components/profile.tsx
```
