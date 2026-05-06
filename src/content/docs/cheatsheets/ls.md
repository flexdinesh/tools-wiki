---
title: ls
description: List files and directories with hidden files, long format, sorting, sizes, recursion, globs, and color output.
---

`ls` prints directory entries. These examples use options that are common on macOS/BSD and GNU/Linux unless noted.

## Basics

List directory entries in common forms.

### List visible entries

List visible files and directories in the current directory.

```bash
$ ls
README.md  package.json  src  tests
```

### List a path

List entries from a specific directory or file path.

```bash
$ ls src
components  content  styles
```

### Print one per line

Print one entry per line, which is useful for scripts or piping to other commands.

```bash
$ ls -1
README.md
package.json
src
tests
```

### Show all entries

Show all entries, including dotfiles and the `.` and `..` directory entries.

```bash
$ ls -a
.  ..  .git  .gitignore  README.md  src
```

### Show hidden entries only

Show hidden entries without printing `.` and `..`.

```bash
$ ls -A
.git  .gitignore  README.md  src
```

---

## Long Format

Show metadata such as permissions, owners, size, and time.

### Show long format

Show permissions, link count, owner, group, size, modification time, and name.

```bash
$ ls -l
total 16
-rw-r--r--  1 alice  staff   612 May  3 09:15 README.md
drwxr-xr-x  5 alice  staff   160 May  3 09:20 src
```

### Show human-readable sizes

Show long format with human-readable file sizes.

```bash
$ ls -lh
total 16
-rw-r--r--  1 alice  staff   612B May  3 09:15 README.md
-rw-r--r--  1 alice  staff   1.8K May  3 09:16 package.json
```

### Show long format with hidden entries

Combine long format with hidden entries.

```bash
$ ls -la
total 24
drwxr-xr-x   7 alice  staff   224 May  3 09:20 .
drwxr-xr-x  12 alice  staff   384 May  3 09:00 ..
-rw-r--r--   1 alice  staff    42 May  3 09:10 .gitignore
-rw-r--r--   1 alice  staff   612 May  3 09:15 README.md
```

### Show directory metadata

Show information about a directory itself instead of listing its contents.

```bash
$ ls -ld src
drwxr-xr-x  5 alice  staff  160 May  3 09:20 src
```

### Show numeric owners

Show numeric user and group IDs instead of names in long format.

```bash
$ ls -n
-rw-r--r--  1 501  20  612 May  3 09:15 README.md
```

---

## Sort and Time

Order listings by time, size, or extension.

### Sort by newest first

Sort by modification time, newest first.

```bash
$ ls -lt
total 24
drwxr-xr-x  5 alice  staff   160 May  3 09:20 src
-rw-r--r--  1 alice  staff   612 May  3 09:15 README.md
-rw-r--r--  1 alice  staff  1800 May  2 18:30 package.json
```

### Sort by oldest first

Sort by modification time in reverse order, oldest first.

```bash
$ ls -ltr
total 24
-rw-r--r--  1 alice  staff  1800 May  2 18:30 package.json
-rw-r--r--  1 alice  staff   612 May  3 09:15 README.md
drwxr-xr-x  5 alice  staff   160 May  3 09:20 src
```

### Sort by largest first

Sort by file size, largest first.

```bash
$ ls -S
package.json  README.md  src
```

### Sort by smallest first

Sort by file size in reverse order, smallest first.

```bash
$ ls -Sr
src  README.md  package.json
```

### Sort by extension

Sort by file extension on GNU/Linux. This option is not available in BSD/macOS `ls`.

```bash
$ ls -X
README.md  notes.md  app.js  index.js  logo.png
```

---

## Directories and Recursion

List directories themselves or walk directory trees.

### List immediate directories

List matching directories themselves instead of listing their contents.

```bash
$ ls -d */
docs/  src/  tests/
```

### List recursively

List subdirectories recursively from the current directory.

```bash
$ ls -R
README.md  src

./src:
index.js  utils.js
```

### List a tree recursively

List a specific directory tree recursively.

```bash
$ ls -R src
src:
components  index.js

src/components:
Button.js  Card.js
```

### List subdirectory contents

Show long-format listings for each immediate subdirectory.

```bash
$ ls -l */
docs/:
total 8
-rw-r--r--  1 alice  staff  420 May  3 09:12 guide.md

src/:
total 8
-rw-r--r--  1 alice  staff  210 May  3 09:20 index.js
```

---

## Patterns

Use shell globs to choose entries before `ls` runs.

### List Markdown files

List Markdown files in the current directory. The shell expands the glob before `ls` runs.

```bash
$ ls *.md
README.md  CHANGELOG.md
```

### List JavaScript files

List JavaScript files directly under `src`.

```bash
$ ls src/*.js
src/index.js  src/utils.js
```

### Match one character

Match exactly one character with `?`.

```bash
$ ls file?.txt
file1.txt  fileA.txt
```

### Match uppercase names

List entries that start with an uppercase letter.

```bash
$ ls [[:upper:]]*
CHANGELOG.md  README.md
```

---

## Display Hints

Add indicators, inode data, block counts, or colors.

### Append file-type indicators

Append indicators to names, such as `/` for directories and `*` for executables.

```bash
$ ls -F
README.md  scripts/  deploy*
```

### Mark directories

Append `/` to directory names without marking other file types.

```bash
$ ls -p
README.md  scripts/  src/
```

### Show inode numbers

Show each entry's inode number.

```bash
$ ls -i
123456 README.md  123457 src
```

### Show block counts

Show the allocated block count for each entry.

```bash
$ ls -s
total 16
8 README.md  8 package.json  0 src
```

### Enable macOS color

Enable color output on macOS/BSD. In GNU `ls`, `-G` means omit group names in long format.

```bash
$ ls -G
README.md  package.json  src  tests
```

### Enable GNU color

Enable color output on GNU/Linux when output is a terminal.

```bash
$ ls --color=auto
README.md  package.json  src  tests
```

---

## Popular use cases

Use `ls` with sorting and pipes for quick directory inspection.

### Show newest files

Sort by modification time and show the newest entries first.

```bash
$ ls -lt | head
total 24
drwxr-xr-x  5 alice  staff   160 May  6 10:20 src
-rw-r--r--  1 alice  staff   612 May  6 10:15 README.md
```

### Show largest entries

Sort by size in long, human-readable format and keep the top entries.

```bash
$ ls -lhS | head
-rw-r--r--  1 alice  staff   12M May  6 10:15 app.log
-rw-r--r--  1 alice  staff  1.2M May  6 10:10 bundle.js
```

### List hidden config files

Show all entries and filter hidden dotfiles.

```bash
$ ls -1a | grep "^\."
.env.example
.gitignore
```

### Count lines in log files

Print one matching file per line and pass the list to `wc`.

```bash
$ ls -1 *.log | xargs wc -l
  120 app.log
   45 worker.log
  165 total
```

### Mark entry types

Use file-type indicators for quick visual scanning.

```bash
$ ls -F
README.md  scripts/  app*  archive.tar.gz
```
