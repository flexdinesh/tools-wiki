---
title: ls
description: List files and directories with hidden entries, long format, sizes, sorting, and globs.
---

`ls` lists directory contents. Use it for quick file inspection, long listings, hidden files, sorting, and shell glob matches.

## Basics

### List visible entries

List non-hidden entries in the current directory.

```bash
$ ls
README.md
package.json
src
```

### List a path

Pass a directory path to list its contents.

```bash
$ ls src
components
content
pages
```

### Print one entry per line

Use `-1` when output should be easy to pipe or scan line by line.

```bash
$ ls -1
README.md
package.json
src
```

### Show all entries

Use `-a` to include hidden entries plus `.` and `..`.

```bash
$ ls -a
.
..
.git
.env
README.md
```

### Show hidden entries without dot directories

Use `-A` to include hidden entries but omit `.` and `..`.

```bash
$ ls -A
.git
.env
README.md
package.json
src
```

## Long Format

### Show long format

Use `-l` to show permissions, owner, size, timestamp, and name.

```bash
$ ls -l
-rw-r--r--  1 alice  staff   612 May  6 10:15 README.md
drwxr-xr-x  5 alice  staff   160 May  6 10:20 src
```

### Show human-readable sizes

Use `-h` with `-l` to show sizes in units like `K`, `M`, or `G`.

```bash
$ ls -lh
-rw-r--r--  1 alice  staff   612B May  6 10:15 README.md
-rw-r--r--  1 alice  staff   2.4K May  6 10:16 package.json
```

### Show long format with hidden entries

Combine `-l` and `-a` to inspect hidden files with metadata.

```bash
$ ls -la
drwxr-xr-x  8 alice  staff   256 May  6 10:20 .
drwxr-xr-x  5 alice  staff   160 May  6 10:00 ..
-rw-r--r--  1 alice  staff   120 May  6 10:10 .env
-rw-r--r--  1 alice  staff   612 May  6 10:15 README.md
```

### Show directory metadata

Use `-d` with `-l` to show the directory itself, not its contents.

```bash
$ ls -ld src
drwxr-xr-x  5 alice  staff   160 May  6 10:20 src
```

## Sorting

### Sort by newest first

Use `-t` to sort by modification time, newest first.

```bash
$ ls -lt
-rw-r--r--  1 alice  staff   612 May  6 10:20 README.md
drwxr-xr-x  5 alice  staff   160 May  6 10:15 src
```

### Sort by oldest first

Add `-r` to reverse time sorting.

```bash
$ ls -ltr
drwxr-xr-x  5 alice  staff   160 May  6 10:15 src
-rw-r--r--  1 alice  staff   612 May  6 10:20 README.md
```

### Sort by largest first

Use `-S` to sort by size, and `-h` to make sizes readable.

```bash
$ ls -lhS
-rw-r--r--  1 alice  staff   2.4K May  6 10:16 package.json
-rw-r--r--  1 alice  staff   612B May  6 10:15 README.md
```

## Directories and Globs

### List immediate directories

Use the shell glob `*/` with `-d` to list directories themselves.

```bash
$ ls -d */
docs/
src/
tests/
```

### List recursively

Use `-R` to list a directory and its subdirectories.

```bash
$ ls -R src
src:
components
pages

src/components:
Button.js
Card.js
```

### List Markdown files

Use shell globs to list matching filenames.

```bash
$ ls *.md
README.md
CHANGELOG.md
```

### List JavaScript files in a directory

Use a path plus a glob to match files in one directory.

```bash
$ ls src/*.js
src/index.js
src/config.js
```

## Common Pipelines

### Show newest files

Sort by modification time and keep the first entries.

```bash
$ ls -lt | head
total 24
-rw-r--r--  1 alice  staff   612 May  6 10:20 README.md
drwxr-xr-x  5 alice  staff   160 May  6 10:15 src
```

### Show largest entries

Sort by size and keep the largest entries.

```bash
$ ls -lhS | head
total 24
-rw-r--r--  1 alice  staff   2.4K May  6 10:16 package.json
-rw-r--r--  1 alice  staff   612B May  6 10:15 README.md
```
