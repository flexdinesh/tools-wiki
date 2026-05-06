---
title: xargs
description: Build commands from standard input, batch arguments, use null-delimited paths, placeholders, and parallel jobs.
---

`xargs` reads items from standard input and appends them as arguments to another command. Use null-delimited input for file paths when possible.

## Basics

### Pass input as command arguments

Turn input lines into arguments for another command.

```bash
$ printf "README.md\npackage.json\n" | xargs ls -l
-rw-r--r--  1 alice  staff   512 May  6 10:00 README.md
-rw-r--r--  1 alice  staff   824 May  6 10:01 package.json
```

### Collapse input whitespace

By default, `xargs` treats whitespace as separators and builds one argument list.

```bash
$ printf "one two three\n" | xargs echo
one two three
```

## Safe Path Input

### Read null-delimited paths

Pair `find -print0` with `xargs -0` so spaces in filenames are handled safely.

```bash
$ find . -name "*.log" -print0 | xargs -0 wc -l
      12 ./logs/app.log
       8 ./logs/debug log.log
      20 total
```

### Delete path matches safely

Use `--` before paths so filenames beginning with `-` are not treated as options.

```bash
$ find . -type f -name "*.tmp" -print0 | xargs -0 rm --
```

## Batching and Placeholders

### Limit items per command

Use `-n` to control how many input items go into each command invocation.

```bash
$ printf "a\nb\nc\nd\n" | xargs -n 2 echo
a b
c d
```

### Substitute placeholders

Use `-I` when each item needs to appear in a specific position.

```bash
$ printf "app.js\napi.js\n" | xargs -I {} echo "src/{} -> dist/{}"
src/app.js -> dist/app.js
src/api.js -> dist/api.js
```

## Preview and Parallel Jobs

### Trace commands before they run

Use `-t` to print the command that `xargs` is about to execute.

```bash
$ find . -name "*.tmp" -print0 | xargs -0 -t rm --
rm -- ./cache/session.tmp ./build/output.tmp
```

### Run jobs in parallel

Use `-P` with small batches to run independent work concurrently.

```bash
$ find tests -name "*_test.py" -print0 | xargs -0 -n 1 -P 4 pytest
============================= test session starts =============================
2 passed in 0.42s
```
