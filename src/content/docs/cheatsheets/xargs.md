---
title: xargs
description: Build and run commands from standard input with batching, placeholders, null-delimited input, prompts, and parallel execution.
---

`xargs` reads items from standard input and builds command arguments from them. These examples use options that are common on macOS/BSD and GNU/Linux unless noted.

## Basics

Build command arguments from standard input.

### Pass input as arguments

Pass input items as arguments to a command.

```bash
$ printf "README.md\npackage.json\n" | xargs ls -l
-rw-r--r--  1 alice  staff   612 May  3 09:15 README.md
-rw-r--r--  1 alice  staff  1800 May  3 09:16 package.json
```

### Pass paths to a command

Run a command that accepts one or more path arguments.

```bash
$ printf "src\nREADME.md\n" | xargs du -sh
 48K	src
4.0K	README.md
```

### Count simple filenames

Count lines across matching files when filenames are simple and do not contain whitespace.

```bash
$ find . -name "*.log" | xargs wc -l
      18 ./logs/app.log
       7 ./logs/worker.log
      25 total
```

### Collapse input whitespace

Collapse input whitespace and print the resulting arguments.

```bash
$ printf "one two three\n" | xargs echo
one two three
```

---

## Safe Input Handling

Preserve filenames with spaces and special characters.

### Read null-delimited paths

Use null-delimited input so paths with spaces, quotes, or other special characters are handled safely.

```bash
$ find . -name "*.log" -print0 | xargs -0 wc -l
      18 ./logs/app.log
       7 ./logs/worker log.log
      25 total
```

### Read null-separated items

Read null-separated items from any command that can produce them.

```bash
$ printf "%s\0" "file one.txt" "file two.txt" | xargs -0 ls -l
-rw-r--r--  1 alice  staff  12 May  3 09:15 file one.txt
-rw-r--r--  1 alice  staff  18 May  3 09:16 file two.txt
```

### Delete safe path input

Delete matching files while preserving filenames exactly. Preview risky commands first, and note that empty-input behavior differs between implementations.

```bash
$ find . -type f -name "*.tmp" -print0 | xargs -0 rm --
```

### Trace a destructive command

Print the command before running it so you can see exactly what `xargs` will execute.

```bash
$ find . -type f -name "*.tmp" -print0 | xargs -0 -t rm --
rm -- ./tmp/cache.tmp ./tmp/output.tmp
```

---

## Batching

Control how many items each command receives.

### Limit items per command

Limit each command invocation to two input items.

```bash
$ printf "a\nb\nc\nd\n" | xargs -n 2 echo
a b
c d
```

### Add fixed batch arguments

Add fixed arguments before each batch of input items.

```bash
$ printf "1\n2\n3\n4\n5\n" | xargs -n 3 echo batch:
batch: 1 2 3
batch: 4 5
```

### Search in batches

Search files in batches instead of starting one command per file.

```bash
$ find . -type f -print0 | xargs -0 -n 100 grep -H "TODO"
./src/app.js:TODO: handle empty responses
./src/server.js:TODO: add request timeout
```

### Use one line per command

Use one input line per command invocation.

```bash
$ printf "alpha beta\ngamma delta\n" | xargs -L 1 echo line:
line: alpha beta
line: gamma delta
```

---

## Placeholders

Insert each item into command templates.

### Substitute placeholders

Insert each input item wherever the placeholder appears.

```bash
$ printf "app.js\napi.js\n" | xargs -I {} echo "src/{} -> dist/{}"
src/app.js -> dist/app.js
src/api.js -> dist/api.js
```

### Use placeholders with null input

Combine null-delimited input with a placeholder for path-safe templates.

```bash
$ find . -name "*.md" -print0 | xargs -0 -I {} echo "Checking {}"
Checking ./README.md
Checking ./docs/install guide.md
```

### Run a shell snippet per item

Use `sh -c` when each item needs a small shell script. Pass the item as an argument instead of interpolating it into the script string.

```bash
$ find . -name "*.md" -print0 | xargs -0 -I {} sh -c 'echo "== $1 =="; head -n 3 "$1"' sh {}
== ./README.md ==
# Project

Quick start instructions.
```

---

## Preview and Confirmation

Trace, prompt, or dry-run generated commands.

### Trace commands

Trace the generated command before it runs.

```bash
$ find . -name "*.tmp" -print0 | xargs -0 -t rm --
rm -- ./tmp/cache.tmp ./tmp/output.tmp
```

### Prompt before running

Prompt before running the generated command.

```bash
$ find . -name "*.tmp" -print0 | xargs -0 -p rm --
rm -- ./tmp/cache.tmp ./tmp/output.tmp ?...y
```

### Dry-run with echo

Dry-run a destructive command by prefixing it with `echo`.

```bash
$ find . -name "*.bak" -print0 | xargs -0 echo rm --
rm -- ./notes.bak ./archive/report.bak
```

---

## Parallel Execution

Run multiple command invocations concurrently.

### Run jobs in parallel

Run up to three command invocations at the same time.

```bash
$ printf "%s\n" img1.png img2.png img3.png | xargs -n 1 -P 3 echo optimize
optimize img1.png
optimize img2.png
optimize img3.png
```

### Run tests in parallel

Run test files in parallel, one file per command invocation.

```bash
$ find tests -name "*_test.py" -print0 | xargs -0 -n 1 -P 4 pytest
tests/api_test.py ..
tests/ui_test.py ....
```

### Check URLs concurrently

Check multiple URLs concurrently. Output from parallel commands can interleave.

```bash
$ printf "%s\n" https://example.com https://example.org | xargs -n 1 -P 2 curl -I
HTTP/2 200
content-type: text/html
HTTP/2 200
content-type: text/html
```

---

## Portability Notes

Use portable options when scripts must run widely.

### Prefer null delimiters

Use null delimiters for filesystem paths so spaces, quotes, and newlines do not split filenames incorrectly.

```bash
$ find . -type f -print0 | xargs -0 wc -l
      42 ./README.md
      18 ./docs/install guide.md
      60 total
```

### Use option terminators

Pass `--` to commands such as `rm`, `cp`, `mv`, and `grep` so filenames beginning with `-` are treated as operands instead of options.

```bash
$ printf "%s\0" "-weird.tmp" | xargs -0 rm --
```

### Know GNU-specific options

`-0`, `-I`, `-n`, `-L`, `-P`, `-p`, and `-t` are common on macOS/BSD and GNU/Linux. GNU `xargs` also supports options such as `-r` and `-d`, but those are not portable to macOS/BSD.

```bash
$ find . -type f -print0 | xargs -0 echo
./README.md ./package.json ./src/app.js
```

---

## Popular use cases

Use `xargs` to turn streamed lists into command arguments safely and efficiently.

### Search tracked files

Search tracked JavaScript files while preserving filenames exactly.

```bash
$ git ls-files -z "*.js" | xargs -0 grep -n "TODO"
src/app.js:12:TODO: handle empty responses
src/server.js:8:TODO: add request timeout
```

### Count Markdown lines

Find Markdown files safely and pass them to `wc` in batches.

```bash
$ find . -type f -name "*.md" -print0 | xargs -0 wc -l
      42 ./README.md
      18 ./docs/install guide.md
      60 total
```

### Inspect image files one by one

Run `file` once per matching image.

```bash
$ find . -type f -name "*.png" -print0 | xargs -0 -n 1 file
./images/logo.png: PNG image data, 512 x 512, 8-bit/color RGBA
./images/banner.png: PNG image data, 1200 x 630, 8-bit/color RGB
```

### Run tests in parallel

Run one test file per process and allow four jobs at a time.

```bash
$ find tests -name "*_test.py" -print0 | xargs -0 -n 1 -P 4 pytest
```

### Download URLs from a file

Pass one URL at a time to `curl`.

```bash
$ xargs -n 1 curl -O < urls.txt
```
