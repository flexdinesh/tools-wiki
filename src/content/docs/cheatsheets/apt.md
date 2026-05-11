---
title: apt
description: Install, update, search, inspect, remove, and clean Debian and Ubuntu packages.
---

`apt` is the package manager for Debian, Ubuntu, and Debian-based Linux distros.

## System

### Update package metadata

Fetch the newest package metadata from configured repositories.

```bash
$ sudo apt update
Hit:1 http://archive.ubuntu.com/ubuntu noble InRelease
Reading package lists... Done
```

### Upgrade system packages

Upgrade installed packages with available updates.

```bash
$ sudo apt upgrade
Reading package lists... Done
Calculating upgrade... Done
```

## Packages

### Install a package

Install a package from configured repositories.

```bash
$ sudo apt install ripgrep
Reading package lists... Done
The following NEW packages will be installed:
  ripgrep
```

### Remove a package

Remove a package while keeping its config files.

```bash
$ sudo apt remove ripgrep
Reading package lists... Done
The following packages will be REMOVED:
  ripgrep
```

### Purge a package

Remove a package and its config files.

```bash
$ sudo apt purge ripgrep
Reading package lists... Done
The following packages will be REMOVED:
  ripgrep*
```

### Search packages

Search available package names and descriptions.

```bash
$ apt search ripgrep
Sorting... Done
ripgrep/noble 14.1.0-1 amd64
  Recursively searches directories for a regex pattern
```

### List available packages

List available packages from configured repositories.

```bash
$ apt list
Listing... Done
bash/noble,now 5.2.21-2ubuntu4 amd64 [installed]
ripgrep/noble 14.1.0-1 amd64
```

### List installed packages

List packages installed on the system.

```bash
$ apt list --installed
Listing... Done
bash/noble,now 5.2.21-2ubuntu4 amd64 [installed]
ripgrep/noble,now 14.1.0-1 amd64 [installed]
```

### Filter installed packages

Filter installed packages by name.

```bash
$ apt list --installed | grep ripgrep
ripgrep/noble,now 14.1.0-1 amd64 [installed]
```

### Show package info

Show metadata for a package.

```bash
$ apt show ripgrep
Package: ripgrep
Version: 14.1.0-1
Description: Recursively searches directories for a regex pattern
```

### List package files

List files installed by a package.

```bash
$ dpkg -L ripgrep
/.
/usr/bin/rg
/usr/share/man/man1/rg.1.gz
```

## Cleanup

### Remove unused dependencies

Remove packages installed as dependencies that are no longer needed.

```bash
$ sudo apt autoremove
Reading package lists... Done
0 upgraded, 0 newly installed, 0 to remove.
```

### Clean package cache

Remove downloaded package files from the local cache.

```bash
$ sudo apt clean
```
