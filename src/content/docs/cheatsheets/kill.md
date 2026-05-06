---
title: kill
description: Stop processes by PID, force-kill stuck processes, reload services, and check process existence.
---

`kill` sends signals to processes by process ID (PID). Start with `TERM` for graceful shutdown; use `KILL` or `-9` only when a process is stuck.

## Basics

### Stop a process gracefully

Send the default `TERM` signal to request normal shutdown.

```bash
$ kill 12345
```

### Send TERM explicitly

Use the signal name when you want the intended shutdown signal to be clear.

```bash
$ kill -TERM 12345
```

### Force-kill a stuck process

Use `-9` only when graceful shutdown does not work.

```bash
$ kill -9 12345
```

## Find the Right PID

### Inspect a process by PID

Check who owns a PID and what command it is running before killing it.

```bash
$ ps -p 12345 -o pid,ppid,user,stat,command
  PID  PPID USER   STAT COMMAND
12345 11223 alice  S    node server.js
```

### Find the process using a port

Use `lsof` to see which process is listening on a port.

```bash
$ lsof -nP -iTCP:3000 -sTCP:LISTEN
COMMAND   PID  USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
node    12345 alice   20u  IPv4 123456      0t0  TCP *:3000 (LISTEN)
```

## Common Signals

### Request normal shutdown

Send `TERM` so the process can handle the signal and clean up.

```bash
$ kill -TERM 12345
```

### Force immediate termination

Send `KILL` when the process cannot be stopped gracefully.

```bash
$ kill -KILL 12345
```

### Reload a process

Send `HUP` to daemons that use it to reload config or reopen logs.

```bash
$ kill -HUP 12345
```

## Check Before Killing

### Check whether a process exists

Use signal `0` to test whether a process exists and is signalable without sending a real signal.

```bash
$ kill -0 12345
```

## Popular use cases

### Kill the process using a port

Find the process listening on a port and request graceful shutdown in one command.

```bash
$ lsof -tiTCP:3000 -sTCP:LISTEN | xargs kill -TERM
```
