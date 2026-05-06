---
title: open
description: Open files, folders, URLs, and apps from the terminal.
---

`open` opens files, folders, URLs, and apps from the terminal on macOS. On Linux, `xdg-open` is the common equivalent.

## Basics

### Open a file

Open a file with its default app.

```bash
$ open report.pdf
```

### Open a folder

Open a folder in Finder.

```bash
$ open ~/Downloads
```

### Open the current directory

Open the current directory in Finder.

```bash
$ open .
```

### Open a URL

Open a URL in the default browser.

```bash
$ open https://example.com
```

## Apps

### Open an app

Use `-a` to open an application by name.

```bash
$ open -a "Visual Studio Code"
```

### Open a file with a specific app

Pass a file with `-a` to choose the app that opens it.

```bash
$ open -a "Preview" image.png
```
