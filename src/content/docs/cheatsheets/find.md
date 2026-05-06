---
title: find
description: Locate files and directories by name, type, size, time, permissions, and run safe actions on matches.
---

`find` walks a directory tree and prints paths that match an expression. These examples avoid GNU-only options where practical and work on common macOS and Linux `find` implementations.

## Basics

Locate files and directories by root, name, type, and depth.

### Search the current tree

List every file and directory under the current directory.

```bash
$ find .
.
./README.md
./src
./src/index.js
```

### Search a directory

Search from a specific directory instead of the current directory.

```bash
$ find src
src
src/components
src/components/Button.js
src/index.js
```

### Match filenames

Match paths by case-sensitive filename pattern.

```bash
$ find . -name "*.md"
./README.md
./docs/install.md
```

### Match names case-insensitively

Match paths by filename pattern without case sensitivity.

```bash
$ find . -iname "*.jpg"
./images/logo.JPG
./images/banner.jpg
```

### List regular files

Show regular files only.

```bash
$ find . -type f
./README.md
./src/index.js
./package.json
```

### List directories

Show directories only.

```bash
$ find . -type d
.
./src
./src/components
./docs
```

### Limit search depth

Limit search depth so deeply nested files are not printed.

```bash
$ find . -maxdepth 2 -type f
./README.md
./package.json
./src/index.js
```

### Search a depth range

Skip shallow matches and show only directories in a depth range.

```bash
$ find . -mindepth 2 -maxdepth 3 -type d
./src/components
./src/components/forms
./docs/reference
```

---

## Match Paths

Match full paths and combine filename patterns.

### Match a full path

Match against the full path instead of just the filename.

```bash
$ find . -path "*/node_modules/*"
./node_modules/.bin
./node_modules/.bin/vite
```

### Exclude a path

Exclude paths with a negated path match. Use `\!` instead of bare `!` so shells with history expansion do not intercept it.

```bash
$ find . \! -path "*/.git/*" -type f
./README.md
./src/index.js
./package.json
```

### Match multiple extensions

Combine name patterns with OR. Escape parentheses so the shell passes them to `find`.

```bash
$ find . \( -name "*.js" -o -name "*.ts" \) -type f
./src/index.js
./src/types.ts
./astro.config.mjs
```

---

## Filter by Metadata

Filter matches by size, time, permissions, and owner.

### Find large files

Find files larger than 10 MiB.

```bash
$ find . -type f -size +10M
./videos/demo.mov
./backup/archive.tar
```

### Find small files

Find files smaller than 100 KiB.

```bash
$ find . -type f -size -100k
./README.md
./src/index.js
```

### Find recently modified files

Find files modified in the last 7 days.

```bash
$ find . -type f -mtime -7
./src/index.js
./docs/changelog.md
```

### Find older files

Find files modified more than 30 days ago.

```bash
$ find . -type f -mtime +30
./old/report.pdf
./archive/notes.txt
```

### Find minute-recent files

Find files modified in the last 60 minutes.

```bash
$ find . -type f -mmin -60
./src/index.js
./test/output.log
```

### Find files newer than a reference

Find files modified more recently than a reference file.

```bash
$ find . -type f -newer package.json
./pnpm-lock.yaml
./src/index.js
```

### Find empty entries

Find empty files and empty directories.

```bash
$ find . -empty
./tmp/empty-file.txt
./tmp/empty-dir
```

### Find executable files

Find files with at least one executable bit set.

```bash
$ find . -type f -perm -111
./scripts/deploy.sh
./node_modules/.bin/astro
```

### Find files by user

Find files owned by a specific user.

```bash
$ find . -user alice
./README.md
./src/index.js
```

### Find files by group

Find files owned by a specific group.

```bash
$ find . -group staff
./shared/report.csv
./shared/notes.md
```

---

## Exclude and Prune

Skip noisy or generated directories while searching.

### Skip node_modules

Skip `node_modules` entirely while printing other files.

```bash
$ find . -name node_modules -prune -o -type f -print
./README.md
./package.json
./src/index.js
```

### Skip the Git directory

Skip the Git metadata directory while printing project files.

```bash
$ find . -name .git -prune -o -type f -print
./README.md
./src/index.js
./package.json
```

### Skip multiple directories

Skip multiple large or generated directories in one expression.

```bash
$ find . \( -name node_modules -o -name dist -o -name .git \) -prune -o -type f -print
./README.md
./package.json
./src/index.js
```

---

## Output

Control how matching paths are printed.

### Print paths

Print one matching path per line. `-print` is the default action, but writing it explicitly helps when combining expressions.

```bash
$ find . -type f -print
./README.md
./src/index.js
./package.json
```

### Print null-delimited paths

Print matches separated by null bytes, which is safe for filenames containing spaces or newlines.

```bash
$ find . -type f -print0 | xargs -0 wc -l
      42 ./README.md
     120 ./src/index.js
     162 total
```

### Print detailed listings

Print detailed file information for each match.

```bash
$ find . -type f -ls
123456  8 -rw-r--r--  1 alice staff  1024 May  6 10:15 ./README.md
123457 16 -rw-r--r--  1 alice staff  4096 May  6 10:16 ./src/index.js
```

---

## Actions

Preview, delete, and run commands on matches.

### Preview matches

Preview files before deleting or changing them.

```bash
$ find . -type f -name "*.tmp" -print
./tmp/build.tmp
./cache/result.tmp
```

### Delete matches

Delete matching files after previewing the same expression with `-print`.

```bash
$ find . -type f -name "*.tmp" -delete
```

### Run one command per match

Run one command per match. This example asks before removing each log file.

```bash
$ find . -type f -name "*.log" -exec rm -i {} \;
remove ./logs/app.log? y
remove ./logs/debug.log? n
```

### Batch matches into one command

Run a command with many matches at once, which is faster than one command per file.

```bash
$ find . -type f -name "*.md" -exec wc -l {} +
   42 ./README.md
   18 ./docs/install.md
   60 total
```

### Pipe paths safely

Pipe null-delimited paths to another command safely.

```bash
$ find . -type f -print0 | xargs -0 grep -n "TODO"
./src/index.js:12:// TODO: handle empty state
./docs/roadmap.md:5:- TODO: add release notes
```

---

## Symlinks

Find symbolic links and decide whether to follow them.

### Find symlinks

Find symbolic links without following them.

```bash
$ find . -type l
./current
./public/assets
```

### Follow symlinks

Follow symbolic links while searching for matching files.

```bash
$ find -L . -type f -name "*.md"
./README.md
./linked-docs/guide.md
```

### Find broken symlinks

Find broken symbolic links. With `-L`, valid links are followed to their targets, while broken links remain type `l`.

```bash
$ find -L . -type l
./broken-link
```

---

## Recipes

Solve common file-search tasks with `find`.

### Count files

Count regular files under the current directory.

```bash
$ find . -type f | wc -l
     128
```

### Find huge files

Find large files that may be worth moving or deleting.

```bash
$ find . -type f -size +100M -print
./backups/database.dump
./videos/walkthrough.mov
```

### Show recently changed files

Show files changed in the last day.

```bash
$ find . -type f -mtime -1 -print
./src/index.js
./README.md
```

### Find executable scripts

Find executable shell scripts.

```bash
$ find . -type f -name "*.sh" -perm -111 -print
./scripts/deploy.sh
./scripts/test.sh
```

### Delete backup files

Delete backup files after first previewing them with `-print`.

```bash
$ find . -type f -name "*.bak" -delete
```

### Search Markdown files

Search Markdown files for matching text.

```bash
$ find . -type f -name "*.md" -exec grep -n "TODO" {} +
./README.md:8:TODO: add setup notes
./docs/roadmap.md:5:TODO: document next release
```

---

## Popular use cases

Use `find` with other commands to inspect, count, search, and safely act on files.

### Find the largest files

Find regular files, measure them with `du`, sort by size, and show the largest results.

```bash
$ find . -type f -print0 | xargs -0 du -k | sort -nr | head
20480	./dist/app.bundle.js
8192	./logs/app.log
1024	./README.md
```

### Search matching files safely

Use null-delimited paths so spaces in filenames do not break the pipeline.

```bash
$ find . -name "*.md" -print0 | xargs -0 grep -n "TODO"
./README.md:8:TODO: add setup notes
./docs/install guide.md:12:TODO: add screenshots
```

### Count files by extension

Extract extensions from found paths, then rank them with `sort` and `uniq`.

```bash
$ find . -type f | awk -F. 'NF > 1 {print $NF}' | sort | uniq -c | sort -nr
  18 js
   9 md
   4 json
```

### Preview then delete temporary files

Print matches first, then run the destructive delete only after checking the list.

```bash
$ find . -type f -name "*.tmp" -print
./cache/session.tmp
./build/output.tmp

$ find . -type f -name "*.tmp" -delete
```

### Feed files to a checker

Find source files and pass them to a project command in safe batches.

```bash
$ find src -name "*.ts" -print0 | xargs -0 pnpm prettier --check
Checking formatting...
All matched files use Prettier code style!
```
