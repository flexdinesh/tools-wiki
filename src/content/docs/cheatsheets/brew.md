---
title: brew
description: Install Homebrew, install packages, update, search, inspect, remove, and clean packages.
---

`brew` can be used on macOS, Linux, and WSL, but it is mostly used on macOS.

## Install Homebrew

### Install Homebrew

Install Homebrew with the official installer.

```bash
$ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
==> Checking for `sudo` access...
==> This script will install:
/opt/homebrew/bin/brew
```

### Check Homebrew version

Print the installed Homebrew version.

```bash
$ brew --version
Homebrew 4.6.0
```

## Packages

### Install a package

Install a package formula.

```bash
$ brew install ripgrep
==> Downloading ripgrep
==> Pouring ripgrep--14.1.1.arm64_sequoia.bottle.tar.gz
```

### Remove a package

Uninstall an installed package formula.

```bash
$ brew uninstall ripgrep
Uninstalling /opt/homebrew/Cellar/ripgrep/14.1.1... (14 files)
```

### Search packages

Search available formulae and casks.

```bash
$ brew search ripgrep
==> Formulae
ripgrep
```

### List available packages

List available package formulae.

```bash
$ brew search
a2ps
ack
ripgrep
```

### List installed packages

List installed package formulae.

```bash
$ brew list
bash
ripgrep
```

### Filter installed packages

Filter installed packages by name.

```bash
$ brew list | grep ripgrep
ripgrep
```

### Show package info

Show metadata for a package formula.

```bash
$ brew info ripgrep
==> ripgrep: stable 14.1.1
Search tool like grep and The Silver Searcher
```

### List package files

List files installed by a package formula.

```bash
$ brew list ripgrep
/opt/homebrew/Cellar/ripgrep/14.1.1/bin/rg
/opt/homebrew/Cellar/ripgrep/14.1.1/share/man/man1/rg.1
```

## Updates

### Update Homebrew metadata

Fetch the newest formula and cask metadata.

```bash
$ brew update
Updated 2 taps (homebrew/core and homebrew/cask).
```

### Upgrade packages

Upgrade installed packages with available updates.

```bash
$ brew upgrade
==> Upgrading 1 outdated package:
ripgrep 14.1.0 -> 14.1.1
```

### Show outdated packages

List installed packages with available updates.

```bash
$ brew outdated
ripgrep (14.1.0) < 14.1.1
```

## Cleanup

### Clean old downloads

Remove stale downloads and old package versions.

```bash
$ brew cleanup
Removing: /Users/dinesh/Library/Caches/Homebrew/ripgrep--14.1.0... (2.1MB)
```

### Remove unused dependencies

Uninstall dependencies that are no longer needed.

```bash
$ brew autoremove
Uninstalling /opt/homebrew/Cellar/pcre2/10.44... (238 files)
```
