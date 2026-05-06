---
title: rmdir
description: Remove empty directories and empty parent paths.
---

`rmdir` removes empty directories. Use `rm -r` when a directory contains files or other directories.

## Basics

### Remove an empty directory

Remove a directory only if it is empty.

```bash
$ rmdir empty-folder
```

### Remove multiple empty directories

Pass multiple directory paths to remove them in one command.

```bash
$ rmdir dir1 dir2
```

## Parent Directories

### Remove empty parent directories

Use `-p` to remove a nested directory and any empty parent directories.

```bash
$ rmdir -p project/tmp/cache
```
