---
title: tee
description: Display command output while saving it to files, appending logs, and copying output to the clipboard.
---

`tee` reads from standard input and writes the same output to standard output and one or more files.

## Basics

### Display and save output

Show a directory listing in the terminal and save it to a file.

```bash
$ ls -la | tee directory-listing.txt
```

### Append output to a file

Use `-a` to add output to a file instead of overwriting it.

```bash
$ date | tee -a activity.log
```

### Include error output

Redirect standard error to standard output so both are displayed and saved.

```bash
$ pnpm build 2>&1 | tee build.log
```

## Popular use cases

### Copy command output to the clipboard

Show installation output in the terminal and copy it to the clipboard.

```bash
# macOS only: replace pbcopy with your OS-specific clipboard command on other systems.
$ pnpm i 2>&1 | tee /dev/tty | pbcopy
```

### Start a server and save its output

Show server output in the terminal while overwriting or appending to a log file.

```bash
# Overwrite server.log
$ pnpm dev 2>&1 | tee server.log

# Append to server.log
$ pnpm dev 2>&1 | tee -a server.log
```
