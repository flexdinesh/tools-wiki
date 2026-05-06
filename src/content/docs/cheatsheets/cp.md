---
title: cp
description: Copy files and directories, with recursive and safety options.
---

`cp` copies files and directories. Existing destination files may be overwritten unless safety options are used.

## Basics

### Copy a file

Copy a file to a new path.

```bash
$ cp notes.txt notes-backup.txt
```

### Copy a file into a directory

Copy a file into an existing directory.

```bash
$ cp notes.txt backups/
```

### Copy multiple files into a directory

Pass multiple source files followed by the destination directory.

```bash
$ cp index.html styles.css public/
```

## Directories

### Copy a directory recursively

Use `-r` to copy a directory and everything inside it.

```bash
$ cp -r src src-backup
```

## Safety Options

### Prompt before overwriting

Use `-i` to confirm before replacing an existing destination file.

```bash
$ cp -i config.json config.backup.json
```

### Do not overwrite existing files

Use `-n` to skip files that already exist at the destination.

```bash
$ cp -n config.json backups/
```
