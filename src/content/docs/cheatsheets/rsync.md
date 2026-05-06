---
title: rsync
description: Copy and sync files locally or over SSH, with archive, dry-run, delete, and progress options.
---

`rsync` copies and syncs files and directories locally or over SSH. After the first run, it only transfers changes.

Trailing slashes matter: `src/` copies the contents of `src`, while `src` copies the directory itself.

## Basics

### Copy a file locally

Copy a file into a local directory.

```bash
$ rsync notes.txt backups/
```

### Copy directory contents locally

Use `-a` for archive mode and `-v` for verbose output.

```bash
$ rsync -av src/ src-backup/
```

### Copy the directory itself

Omit the trailing slash to copy the source directory into the destination.

```bash
$ rsync -av src src-backup/
```

## Remote Sync

### Copy local files to a remote host

Send local files to a remote path over SSH.

```bash
$ rsync -av ./site/ user@example.com:/var/www/site/
```

### Copy remote files locally

Pull files from a remote path to the local machine.

```bash
$ rsync -av user@example.com:/var/log/app/ ./logs/
```

### Use a specific SSH port

Use `-e` to pass SSH options.

```bash
$ rsync -av -e "ssh -p 2222" ./site/ user@example.com:/var/www/site/
```

## Preview and Progress

### Preview changes without copying

Use `-n` for a dry run before copying or deleting files.

```bash
$ rsync -avn src/ src-backup/
```

### Show progress

Use `--progress` for large files.

```bash
$ rsync -av --progress large-file.zip backups/
```

## Delete and Exclude

### Delete files missing from source

Use `--delete` to remove destination files that no longer exist in the source. Preview with `-n` first.

```bash
$ rsync -av --delete src/ mirror/
```

### Exclude files or directories

Use `--exclude` to skip paths or patterns.

```bash
$ rsync -av --exclude node_modules --exclude "*.log" ./ project-backup/
```
