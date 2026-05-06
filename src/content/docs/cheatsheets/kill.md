---
title: kill
description: Send signals to processes by PID, check process existence, reload services, stop and resume jobs, and terminate process groups safely.
---

`kill` sends signals to processes by process ID (PID). Use `TERM` first for normal shutdown, reserve `KILL` for stuck processes, and inspect the PID before signaling when possible.

## Basics

Send signals to one or more process IDs.

### List available signals

Show signal names supported by your system.

```bash
$ kill -l
HUP INT QUIT ILL TRAP ABRT EMT FPE KILL BUS SEGV SYS PIPE ALRM TERM ...
```

### Terminate one process

Send the default `TERM` signal to request graceful shutdown.

```bash
$ kill 12345
```

### Send TERM explicitly

Use the signal name to make the intended shutdown signal clear.

```bash
$ kill -TERM 12345
```

### Signal multiple processes

Send the same signal to more than one PID.

```bash
$ kill -TERM 12345 23456
```

---

## Inspect Before Signaling

Confirm what a PID belongs to before sending a signal.

### Inspect a process by PID

Show process details for a specific PID.

```bash
$ ps -p 12345 -o pid,ppid,user,stat,command
  PID  PPID USER   STAT COMMAND
12345 11223 alice  S    node server.js
```

### Check whether a process exists

Use signal `0` to check whether the process exists and is signalable without sending a real signal.

```bash
$ kill -0 12345
```

If the process does not exist, `kill` reports an error.

```bash
$ kill -0 99999
kill: 99999: No such process
```

---

## Common Signals

Choose signals based on how forceful the action should be.

### Reload or reopen configuration

Send `HUP` to processes that use it for reloads, log reopening, or terminal hangup handling.

```bash
$ kill -HUP 12345
```

### Interrupt a foreground-style process

Send `INT`, similar to pressing `Ctrl+C` in a terminal.

```bash
$ kill -INT 12345
```

### Force-kill a stuck process

Send `KILL` only when graceful shutdown fails; the process cannot catch or clean up after this signal.

```bash
$ kill -KILL 12345
```

### Use the numeric KILL signal

`-9` is the numeric form of `KILL`.

```bash
$ kill -9 12345
```

---

## Suspend and Resume

Pause and continue processes without terminating them.

### Stop a process

Suspend a process with `STOP`; it cannot catch or ignore this signal.

```bash
$ kill -STOP 12345
```

### Continue a stopped process

Resume a process that was stopped with `STOP` or terminal job control.

```bash
$ kill -CONT 12345
```

---

## Process Groups and Jobs

Signal shell jobs or every process in a process group.

### List shell jobs with PIDs

Show job numbers and PIDs in the current shell.

```bash
$ jobs -l
[1]+ 12345 Running                 node server.js &
```

### Terminate a shell job

Use a job spec such as `%1` with your shell's `kill` builtin.

```bash
$ kill -TERM %1
```

### Terminate a process group

Use a negative process group ID to signal every process in that group.

```bash
$ kill -TERM -12345
```

---

## Troubleshooting

Handle common permission and lifecycle errors.

### Signal a process owned by another user

Use `sudo` only when you intentionally need elevated permissions.

```bash
$ sudo kill -TERM 12345
```

### Diagnose a permission error

If you do not own the process and are not root, the signal is rejected.

```bash
$ kill -TERM 12345
kill: 12345: Operation not permitted
```

### Check for a zombie process

A zombie process is already dead but still waiting for its parent to reap it; killing the zombie itself will not remove it.

```bash
$ ps -p 12345 -o pid,ppid,stat,command
  PID  PPID STAT COMMAND
12345 11223 Z    [worker] <defunct>
```

---

## Popular use cases

Use `kill` with process-inspection tools to stop, reload, or diagnose real processes safely.

### Stop the process using a port

Find the PID listening on a port with `lsof`, then request graceful shutdown.

```bash
$ lsof -nP -iTCP:3000 -sTCP:LISTEN
COMMAND   PID  USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
node    12345 alice   20u  IPv4 123456      0t0  TCP *:3000 (LISTEN)

$ kill -TERM 12345
```

### Inspect before terminating

Check what a PID belongs to before sending a signal.

```bash
$ ps -p 12345 -o pid,ppid,user,stat,command
  PID  PPID USER   STAT COMMAND
12345 11223 alice  S    node server.js

$ kill -TERM 12345
```

### Force-kill a stuck process

Use `KILL` only after a graceful `TERM` does not stop the process.

```bash
$ kill -TERM 12345
$ kill -KILL 12345
```

### Reload a service from a PID file

Send `HUP` to a process whose PID is stored in a service pidfile.

```bash
$ kill -HUP "$(cat /run/nginx.pid)"
```

### Terminate a process group

Signal every process in a process group by using a negative process group ID.

```bash
$ kill -TERM -12345
```
