---
title: head
description: Print the first lines or bytes of files and limit pipeline output.
---

`head` prints the beginning of files or standard input. It is useful for quick previews and for limiting noisy pipeline output.

## Basics

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

### Print a fixed number of lines

Use `-n` to choose how many lines to print.

```bash
$ head -n 5 file.txt
line 1
line 2
line 3
line 4
line 5
```

### Print a header row

Print only the first line of a CSV or table-like file.

```bash
$ head -n 1 users.csv
id,name,role
```

### Print multiple file starts

When reading multiple files, `head` labels each file's output.

```bash
$ head file1.txt file2.txt
==> file1.txt <==
alpha
beta

==> file2.txt <==
one
two
```

## Bytes

### Print first bytes

Use `-c` to limit by bytes instead of lines.

```bash
$ head -c 100 file.txt
<!doctype html>
<html>
<head><title>Example</title></head>
<body>
```

## Common Pipelines

### Show newest files

Sort a directory by modification time and keep the first few entries.

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

### Preview matching log lines

Limit a noisy grep result to the first matches.

```bash
$ grep "ERROR" app.log | head -n 20
ERROR failed to connect
ERROR retry limit reached
```
