---
title: pacman
description: Install, update, search, inspect, remove, and clean Arch Linux packages.
---

`pacman` is the package manager for Arch Linux and Arch-based distros only.

## System

### Update system packages

Sync package databases and upgrade installed packages.

```bash
$ sudo pacman -Syu
:: Synchronizing package databases...
 core is up to date
 extra is up to date
:: Starting full system upgrade...
```

## Packages

### Install a package

Install a package from the configured repositories.

```bash
$ sudo pacman -S ripgrep
resolving dependencies...
looking for conflicting packages...
```

### Remove a package

Remove a package, unused dependencies, and config files tracked by `pacman`.

```bash
$ sudo pacman -Rns ripgrep
checking dependencies...
Packages (1) ripgrep-14.1.1-1
```

### Search packages

Search available package names and descriptions.

```bash
$ pacman -Ss ripgrep
extra/ripgrep 14.1.1-1
    A search tool that combines grep with the usability of The Silver Searcher
```

### List available packages

List available packages from enabled repositories.

```bash
$ pacman -Sl
core bash 5.2.037-2 [installed]
extra ripgrep 14.1.1-1
```

### List installed packages

List packages installed on the system.

```bash
$ pacman -Q
bash 5.2.037-2
ripgrep 14.1.1-1
```

### Filter installed packages

Filter installed packages by name.

```bash
$ pacman -Q | grep ripgrep
ripgrep 14.1.1-1
```

### Show package info

Show metadata for an installed package.

```bash
$ pacman -Qi ripgrep
Name            : ripgrep
Version         : 14.1.1-1
Description     : A search tool that combines grep with the usability of The Silver Searcher
```

### List package files

List files installed by a package.

```bash
$ pacman -Ql ripgrep
ripgrep /usr/
ripgrep /usr/bin/rg
```

## Cleanup

### Clean package cache

Remove old packages from the package cache.

```bash
$ sudo pacman -Sc
Packages to keep:
  All locally installed packages
```

### Remove orphan packages

Remove packages installed as dependencies that are no longer needed.

```bash
$ sudo pacman -Rns $(pacman -Qtdq)
checking dependencies...
```
