---
title: pkill
description: Find and signal processes by name, command line, user, parent process, exact match, age, and common signals.
---

`pkill` finds processes that match a pattern and sends them a signal. Preview with `pgrep` first, then run `pkill` with the same match options.

## Preview Matches

Use `pgrep` to confirm which processes will match before signaling them.

### Preview by process name

Show matching process IDs and names.

```bash
$ pgrep -l node
12345 node
23456 node
```

### Preview by full command line

Match against the full command line instead of only the process name.

```bash
$ pgrep -fl "node server.js"
12345 node server.js
```

### Preview an exact process name

Match the complete process name, not a substring.

```bash
$ pgrep -x nginx
4567
4568
```

---

## Match Processes

Terminate processes by name or command-line pattern.

### Terminate by process name

Send the default `TERM` signal to processes whose names match the pattern.

```bash
$ pkill node
```

### Match an exact process name

Use `-x` to avoid matching longer names that contain the same text.

```bash
$ pkill -x nginx
```

### Match the full command line

Use `-f` when the distinguishing text is in the arguments, not the executable name.

```bash
$ pkill -f "node server.js"
```

---

## Send Signals

Choose the signal to send to every matched process.

### Request graceful shutdown

Send `TERM` explicitly to make the shutdown signal clear.

```bash
$ pkill -TERM -x nginx
```

### Reload matching processes

Send `HUP` to programs that use it for reloads or log reopening.

```bash
$ pkill -HUP -x nginx
```

### Force-kill stuck matches

Send `KILL` only when graceful shutdown fails; matched processes cannot clean up after this signal.

```bash
$ pkill -KILL -f "stuck-worker"
```

---

## Scope Matches

Limit matches so unrelated processes are not signaled.

### Match processes for the current user

Restrict matches to processes owned by your effective user ID.

```bash
$ pkill -u "$USER" node
```

### Match processes for a specific user

Signal matching processes owned by a named user.

```bash
$ pkill -u alice -x node
```

### Match children of a parent process

Signal processes whose parent PID matches the given PID.

```bash
$ pkill -P 12345
```

---

## Case and Exact Matching

Control how broadly patterns match.

### Match case-insensitively

Use `-i` when process names may differ by case.

```bash
$ pkill -i chrome
```

### Require an exact process name

Use exact matching for short names that could appear inside unrelated process names.

```bash
$ pkill -x nginx
```

### Match a command-line phrase

Use `-f` to target a specific command invocation.

```bash
$ pkill -f "npm run dev"
```

---

## Newest and Oldest Matches

Target only one matching process by start time where supported.

### Signal the newest match

Send `TERM` to the newest process matching the full command line.

```bash
$ pkill -n -f "npm run dev"
```

### Signal the oldest match

Send `TERM` to the oldest process with an exact name match.

```bash
$ pkill -o -x ssh
```

---

## Safe Workflows

Preview broad matches before using the same criteria with `pkill`.

### Preview then terminate a command

Confirm the matched process, then terminate it with identical match criteria.

```bash
$ pgrep -u "$USER" -fl "node server.js"
12345 node server.js

$ pkill -TERM -u "$USER" -f "node server.js"
```

---

## Popular use cases

Use `pkill` with `pgrep` previews to stop or reload groups of matching processes.

### Stop a dev server safely

Preview matching command lines, then terminate the same match.

```bash
$ pgrep -af "node.*vite"
12345 node ./node_modules/.bin/vite --host 0.0.0.0

$ pkill -TERM -f "node.*vite"
```

### Kill only your matching process

Scope broad command-line matches to the current user.

```bash
$ pkill -TERM -u "$USER" -f "python.*runserver"
```

### Reload matching daemons

Send `HUP` to matching processes that reload configuration on that signal.

```bash
$ pkill -HUP nginx
```

### Kill children of a parent process

Signal only processes whose parent PID matches the given process.

```bash
$ pkill -TERM -P 12345
```

### Force-kill the newest stuck match

Target only the newest matching process when multiple workers exist.

```bash
$ pkill -KILL -n -f "worker"
```
