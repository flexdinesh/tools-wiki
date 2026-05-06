---
title: head
description: Print the first lines or bytes of files and inspect the beginning of command output in pipelines.
---

`head` prints the beginning of files or standard input. It is useful for quick inspection, sampling large outputs, and limiting pipeline output.

## Basics

Print the beginning of files or streams.

### Print default lines

Print the first 10 lines of a file.

```bash
$ head file.txt
line 1
line 2
line 3
line 4
line 5
line 6
line 7
line 8
line 9
line 10
```

### Print five lines

Print the first five lines.

```bash
$ head -n 5 file.txt
line 1
line 2
line 3
line 4
line 5
```

### Print header row

Print only the first line, which is often a header row.

```bash
$ head -n 1 users.csv
id,name,role
```

### Print multiple file starts

Print the beginning of multiple files with file headers.

```bash
$ head file1.txt file2.txt
==> file1.txt <==
alpha
beta

==> file2.txt <==
one
two
```

---

## Bytes

Limit output by byte count instead of lines.

### Print first bytes

Print the first 100 bytes instead of the first lines.

```bash
$ head -c 100 file.txt
<!doctype html>
<html>
<head><title>Example</title></head>
<body>
```

### Print first kilobyte

Print the first 1024 bytes. Numeric byte counts are portable across common macOS and Linux `head` implementations.

```bash
$ head -c 1024 file.txt
```

---

## Inspect Files Quickly

Preview common file types without opening them.

### Preview log files

Preview the beginning of each matching log file.

```bash
$ head *.log
==> app.log <==
2026-05-06 10:00:00 INFO started
2026-05-06 10:01:10 INFO ready

==> worker.log <==
2026-05-06 10:00:03 INFO worker started
```

### Preview first log lines

Look at the first 20 log lines.

```bash
$ head -n 20 app.log
2026-05-06 10:00:00 INFO started
2026-05-06 10:01:10 INFO ready
```

### Preview Markdown top

Preview the top of a Markdown file.

```bash
$ head -n 3 README.md
# Project

Quick start instructions.
```

---

## Popular use cases

Use `head` at the end of pipelines to sample or cap noisy output.

### Show newest files

Sort a directory by modification time and show only the first few entries.

```bash
$ ls -lt | head -n 5
total 24
drwxr-xr-x  5 alice  staff   160 May  6 10:20 src
-rw-r--r--  1 alice  staff   612 May  6 10:15 README.md
```

### Show top CPU processes

Sort processes by CPU usage and keep the top rows.

```bash
$ ps aux | sort -k3,3nr | head -n 5
alice 4242  38.0  1.2 app-server
alice 4170  12.5  0.8 node
root   301   5.1  0.4 WindowServer
```

### Preview matching logs

Filter logs first, then inspect only the earliest matches.

```bash
$ grep "ERROR" app.log | head -n 20
2026-05-06 10:14:22 ERROR database connection failed
2026-05-06 10:15:03 ERROR retry limit reached
```

### Inspect an HTTP response start

Fetch a page and print just the beginning of the response body.

```bash
$ curl -s https://example.com | head -n 5
<!doctype html>
<html>
<head><title>Example Domain</title></head>
<body>
```

### Find the smallest entries

Sort disk-usage output numerically and keep the smallest entries.

```bash
$ du -sk * | sort -n | head -n 10
4	README.md
16	scripts
48	src
```
