---
title: sed
description: Replace, delete, print, and edit text streams or files with simple line-oriented commands.
---

`sed` is a stream editor for transforming text line by line. Use it when you need quick, repeatable text edits from the terminal: replacing strings, deleting matching lines, printing only a range, cleaning command output, or making small scripted changes without opening an editor. It is especially useful in pipelines because it reads from standard input, rewrites the text, and sends the result to standard output.

## Basics

### Print every line

By default, `sed` prints each input line after applying commands.

```bash
$ sed '' file.txt
alpha
beta
```

### Print a line range

Use `-n` to suppress default output, then print only the selected range.

```bash
$ sed -n '1,5p' file.txt
line 1
line 2
line 3
line 4
line 5
```

## Replace Text

### Replace first match on each line

Replace the first matching text on every line.

```bash
$ sed 's/old/new/' file.txt
new value
old value and new value
```

### Replace all matches on each line

Add `g` to replace every match on each line.

```bash
$ sed 's/old/new/g' file.txt
new value
new value and new value
```

### Use a different delimiter

Use another delimiter when replacing paths or URLs so the command is easier to read.

```bash
$ sed 's#/usr/local/bin#/opt/homebrew/bin#g' paths.txt
/opt/homebrew/bin/tool
```

## Delete and Print Lines

### Delete matching lines

Remove lines that match a pattern.

```bash
$ sed '/DEBUG/d' app.log
2026-05-11 INFO started
2026-05-11 ERROR failed to connect
```

### Print matching lines

Use `-n` with `p` to print only matching lines.

```bash
$ sed -n '/ERROR/p' app.log
2026-05-11 ERROR failed to connect
```

## In-Place Editing

### Edit a file on macOS

Use `-i ''` with BSD `sed` on macOS to edit a file in place without creating a backup.

```bash
$ sed -i '' 's/localhost/127.0.0.1/g' config.txt
```

### Edit a file on GNU/Linux

Use `-i` with GNU `sed` to edit a file in place.

```bash
$ sed -i 's/localhost/127.0.0.1/g' config.txt
```

## Popular Pipeline Use Cases

### Filter process output

Print only process lines that match a command name.

```bash
$ ps aux | sed -n '/node/p'
alice  14231   0.0  node server.js
```

### Indent command output

Prefix every line with spaces before showing or pasting output.

```bash
$ git status --short | sed 's/^/  /'
   M src/app.ts
  ?? notes.md
```

### Trim whitespace

Remove leading and trailing whitespace from each line.

```bash
$ printf "  hello  \n" | sed 's/^[[:space:]]*//;s/[[:space:]]*$//'
hello
```

### Normalize URLs before sorting

Remove a common URL prefix, then sort and deduplicate the result.

```bash
$ sed 's#https://##' urls.txt | sort -u
example.com/docs
example.com/pricing
```

### Clean search output

Make search results easier to scan by replacing separators.

```bash
$ rg "TODO" src | sed 's/:/  /'
src/app.ts  12  TODO: handle empty state
```
