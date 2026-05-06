---
title: mv
description: Move and rename files and directories, with common safety options.
---

`mv` moves or renames files and directories. Moving within the same filesystem is usually a rename; moving across filesystems copies the item then removes the source.

## Basics

### Rename a file

Rename a file in the same directory.

```bash
$ mv old-name.txt new-name.txt
```

### Move a file into a directory

Move a file into an existing directory.

```bash
$ mv report.pdf archive/
```

### Move multiple files into a directory

Pass multiple source files followed by the destination directory.

```bash
$ mv app.log error.log logs/
```

## Directories

### Rename a directory

Rename a directory in the same parent directory.

```bash
$ mv old-folder new-folder
```

### Move a directory

Move a directory into another directory.

```bash
$ mv project archive/
```

## Safety Options

### Prompt before overwriting

Use `-i` to confirm before replacing an existing destination file.

```bash
$ mv -i config.json backups/config.json
```

### Do not overwrite existing files

Use `-n` to skip files that already exist at the destination.

```bash
$ mv -n config.json backups/
```
