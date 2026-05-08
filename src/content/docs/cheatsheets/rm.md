---
title: rm
description: Remove files and directories, with common safety options.
---

`rm` removes files and directories. Preview paths before using globs or recursive removal because deleted files are not usually recoverable from the terminal.

## Basics

### Remove a file

Remove a single file.

```bash
$ rm old.txt
```

### Remove multiple files

Pass multiple paths to remove them in one command.

```bash
$ rm old.txt temp.log
```

### Remove matching files

Use a shell glob to remove matching files.

```bash
$ rm *.tmp
```

### List removed files

Use `-v` to print each file as it is removed.

```bash
$ rm -v old.txt
removed 'old.txt'
```

## Directories

### Remove a directory and its contents

Use `-r` to remove a directory recursively. This removes the directory and everything inside it.

```bash
$ rm -r old-folder
```

### Force remove a directory and its contents

Use `-rf` to remove a directory recursively without prompts. Double-check the path before running this.

```bash
$ rm -rf old-folder
```

## Safety Options

### Prompt before removing

Use `-i` to confirm each removal.

```bash
$ rm -i important.txt
remove important.txt? y
```

### Ignore missing files

Use `-f` when missing files should not print errors or fail scripts.

```bash
$ rm -f missing.txt
```

## Popular Use Cases

### Remove all .DS_Store files recursively

Find `.DS_Store` files under the current directory and remove them from all nested directories.

```bash
$ find . -type f -name ".DS_Store" -exec rm -fv {} +
```
