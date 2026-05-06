---
title: pkill
description: Find and stop processes by name or command line, preview matches with pgrep, and send common signals.
---

`pkill` finds processes that match a pattern and sends them a signal. Preview with `pgrep` first when the match may be broad.

## Basics

### Stop processes by name

Send the default `TERM` signal to processes whose names match `node`.

```bash
$ pkill node
```

### Match an exact process name

Use `-x` to avoid matching longer process names that contain the same text.

```bash
$ pkill -x nginx
```

### Match the full command line

Use `-f` when the identifying text is in the command arguments.

```bash
$ pkill -f "npm run dev"
```

## Preview Matches

### Preview matching process names

Use `pgrep` to list matching PIDs and process names before signaling them.

```bash
$ pgrep -l node
12345 node
23456 node
```

### Preview full command-line matches

Use `-f` to preview matches against the full command line.

```bash
$ pgrep -fl "npm run dev"
12345 npm run dev
```

## Common Signals

### Request graceful shutdown

Send `TERM` explicitly to matching processes.

```bash
$ pkill -TERM -x nginx
```

### Force-kill stuck matches

Send `KILL` only when matching processes cannot be stopped gracefully.

```bash
$ pkill -KILL -f "stuck-worker"
```

### Reload matching processes

Send `HUP` to daemons that use it to reload config or reopen logs.

```bash
$ pkill -HUP nginx
```

## Limit Matches

### Limit matches to your user

Scope broad command-line matches to your user so you do not signal another user's process.

```bash
$ pkill -u "$USER" -f "python.*runserver"
```
