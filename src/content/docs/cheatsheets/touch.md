---
title: touch
description: Create files and update file timestamps.
---

`touch` creates empty files and updates file access or modification times. It is often used before editing a new file or when a timestamp needs to change.

## Basics

### Create an empty file

Create a file if it does not already exist.

```bash
$ touch notes.txt
```

### Create multiple files

Pass multiple filenames to create them in one command.

```bash
$ touch index.html styles.css script.js
```

### Update a file timestamp

Run `touch` on an existing file to update its timestamp to now.

```bash
$ touch app.log
```

## Timestamps

### Do not create a missing file

Use `-c` to update a file only if it already exists.

```bash
$ touch -c missing.txt
```

### Set a specific timestamp

Use `-t` with `[[CC]YY]MMDDhhmm[.ss]` format.

```bash
$ touch -t 202605061230 file.txt
```
