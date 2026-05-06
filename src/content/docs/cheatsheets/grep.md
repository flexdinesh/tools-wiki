---
title: grep
description: Search files and pipelines by text or regex, show context, recurse, and count matches.
---

`grep` searches text files or standard input for matching lines. Use quotes around patterns so the shell does not interpret special characters.

## Basics

### Search a file

Print lines that contain a string.

```bash
$ grep "error" app.log
error failed to connect
```

### Search ignoring case

Use `-i` to match different casing.

```bash
$ grep -i "error" app.log
ERROR failed to connect
error retrying
```

### Show line numbers

Use `-n` to include matching line numbers.

```bash
$ grep -n "error" app.log
42:error failed to connect
```

### Search standard input

Pipe text into `grep` when the input comes from another command.

```bash
$ printf "info ready\nerror failed\n" | grep "error"
error failed
```

## Match Patterns

### Match whole words

Use `-w` to avoid matching a word inside a longer word.

```bash
$ grep -w "user" app.log
created user alice
```

### Invert matches

Use `-v` to print lines that do not match.

```bash
$ grep -v "debug" app.log
INFO ready
ERROR failed
```

### Use extended regex

Use `-E` for alternation and other extended regex syntax.

```bash
$ grep -E "error|warn" app.log
warn disk almost full
error failed to connect
```

### Search fixed strings

Use `-F` when the pattern should be treated literally.

```bash
$ grep -F "a.b[0]" file.txt
a.b[0]
```

## Context

### Show surrounding context

Use `-C` to show lines before and after each match.

```bash
$ grep -C 2 "panic" app.log
starting worker
loading config
panic: invalid state
shutting down
restart scheduled
```

### Show lines after matches

Use `-A` to include lines after a match.

```bash
$ grep -A 3 "Exception" app.log
Exception: failed request
  at handler.js:12
  at server.js:44
  at main.js:8
```

## Recursive Search

### Search recursively with line numbers

Use `-R -n` to search a directory tree and show match locations.

```bash
$ grep -R -n "TODO" src
src/index.js:12:// TODO: handle empty state
src/api.js:44:// TODO: retry failed requests
```

### Search included files only

Use `--include` to limit recursive search to matching filenames.

```bash
$ grep -R -n --include="*.ts" "fetch(" src
src/api.ts:18:const res = await fetch(url)
```

### Exclude noisy directories

Use `--exclude-dir` to skip generated or dependency directories.

```bash
$ grep -R -n --exclude-dir=.git --exclude-dir=node_modules "password" .
./src/config.js:8:password: process.env.DB_PASSWORD
```

## Counts and Scripting

### Count matching lines

Use `-c` to count matching lines per file.

```bash
$ grep -c "ERROR" app.log
12
```

### Test quietly

Use `-q` when you only need the command's exit status.

```bash
$ grep -q "READY" status.txt
$ echo $?
0
```
