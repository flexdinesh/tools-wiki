---
title: find
description: Find files by name, type, size, date, exclude directories, and run commands on matches.
---

`find` walks a directory tree and prints paths that match an expression. Preview matches before deleting or changing files.

## Basics

### Search the current directory tree

Print every file and directory under the current directory.

```bash
$ find .
.
./README.md
./src
./src/index.js
```

### Search a specific directory

Start the search from a specific directory instead of `.`.

```bash
$ find src
src
src/components
src/index.js
```

### Match filenames by pattern

Use `-name` for case-sensitive filename matches.

```bash
$ find . -name "*.md"
./README.md
./docs/install.md
```

### Match filenames case-insensitively

Use `-iname` when filename case may vary.

```bash
$ find . -iname "*.jpg"
./images/logo.JPG
./images/banner.jpg
```

## File Types and Depth

### Find regular files

Use `-type f` to print files only.

```bash
$ find . -type f
./README.md
./src/index.js
./package.json
```

### Find directories

Use `-type d` to print directories only.

```bash
$ find . -type d
.
./src
./src/components
```

### Limit search depth

Use `-maxdepth` to avoid searching too deeply.

```bash
$ find . -maxdepth 2 -type f
./README.md
./package.json
./src/index.js
```

## Size and Time

### Find large files

Find files larger than 10 MiB.

```bash
$ find . -type f -size +10M
./videos/demo.mov
./backup/archive.tar
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

## Exclude Directories

### Skip node_modules

Prune `node_modules` so `find` does not descend into it.

```bash
$ find . -name node_modules -prune -o -type f -print
./README.md
./package.json
./src/index.js
```

### Skip common generated directories

Prune common noisy directories while printing other files.

```bash
$ find . \( -name node_modules -o -name dist -o -name .git \) -prune -o -type f -print
./README.md
./package.json
./src/index.js
```

## Run Commands on Matches

### Preview temporary files

Print matches before deleting or changing them.

```bash
$ find . -type f -name "*.tmp" -print
./cache/session.tmp
./build/output.tmp
```

### Delete temporary files

Delete matching files after previewing the same expression.

```bash
$ find . -type f -name "*.tmp" -delete
```

### Run a command on matching files

Use `-exec ... {} +` to batch many matches into one command.

```bash
$ find . -type f -name "*.md" -exec wc -l {} +
   42 ./README.md
   18 ./docs/install.md
   60 total
```

### Pipe paths safely

Use null-delimited paths so spaces in filenames do not break the pipeline.

```bash
$ find . -type f -print0 | xargs -0 grep -n "TODO"
./src/index.js:12:// TODO: handle empty state
./docs/roadmap.md:5:- TODO: add release notes
```
