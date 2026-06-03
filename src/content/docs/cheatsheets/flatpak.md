---
title: flatpak
description: Install, search, run, update, list, inspect, remove, and clean Flatpak apps.
---

Install: Arch Linux `sudo pacman -S flatpak`; Ubuntu `sudo apt install flatpak`.

## flatpak search

Find apps by name or description.

```bash
$ flatpak search firefox
Name     Description                    Application ID
Firefox  Fast, private web browser      org.mozilla.firefox
```

## flatpak install

Install an app from a remote.

```bash
$ flatpak install flathub org.mozilla.firefox
Looking for matches...
Installation complete.
```

## flatpak run

Start an installed app by application ID.

```bash
$ flatpak run org.mozilla.firefox
```

## flatpak update

Update installed apps and runtimes.

```bash
$ flatpak update
Looking for updates...
Updates complete.
```

## flatpak list

List installed apps and runtimes.

```bash
$ flatpak list
Name     Application ID        Version
Firefox  org.mozilla.firefox   145.0
```

## flatpak info

Show metadata for an installed app.

```bash
$ flatpak info org.mozilla.firefox
Firefox - Fast, private web browser
ID: org.mozilla.firefox
```

## flatpak uninstall

Remove an installed app.

```bash
$ flatpak uninstall org.mozilla.firefox
Uninstalled.
```

### Remove unused runtimes

Remove runtimes no longer used by installed apps.

```bash
$ flatpak uninstall --unused
Uninstalled.
```
