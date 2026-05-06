---
title: sort
description: Sort lines by text, numbers, fields, reverse order, uniqueness, and pipeline-friendly output.
---

`sort` reads lines from files or standard input, orders them, and writes the result to standard output. These examples use options that are common on macOS/BSD and GNU/Linux unless noted.

## Basics

Order lines alphabetically and control duplicates.

### Sort alphabetically

Sort lines alphabetically.

```bash
$ sort names.txt
Alice
Bob
Carol
alice
```

### Sort in reverse

Sort lines in reverse order.

```bash
$ sort -r names.txt
alice
Carol
Bob
Alice
```

### Fold case while sorting

Fold lowercase and uppercase together while sorting.

```bash
$ sort -f names.txt
Alice
alice
Bob
Carol
```

### Sort unique lines

Sort lines and print only one copy of each duplicate line.

```bash
$ sort -u names.txt
Alice
Bob
Carol
```

### Write back to the same file

Write sorted output back to the same file.

```bash
$ sort -o names.txt names.txt
```

---

## Numeric Sort

Compare fields as numbers instead of plain text.

### Sort numbers ascending

Sort by numeric value instead of text order.

```bash
$ sort -n scores.txt
2
9
10
100
```

### Sort numbers descending

Sort numbers from largest to smallest.

```bash
$ sort -nr scores.txt
100
10
9
2
```

### Sort by numeric field

Sort by the second whitespace-separated field as a number.

```bash
$ sort -k2,2n scores.txt
bob 72
alice 91
carol 98
```

### Sort by descending numeric field

Sort by the third whitespace-separated field as a descending number.

```bash
$ sort -k3,3nr data.tsv
carol design 98
alice api 91
bob web 72
```

---

## Fields and Keys

Sort by selected fields and delimiters.

### Sort CSV by field

Use a comma as the field delimiter and sort by the second field.

```bash
$ sort -t, -k2,2 users.csv
2,Alice,admin
3,Bob,member
1,Carol,member
```

### Sort CSV by descending field

Sort comma-separated rows by the third field as a descending number.

```bash
$ sort -t, -k3,3nr users.csv
carol,design,98
alice,api,91
bob,web,72
```

### Sort with a tie-breaker

Sort by a primary key, then use another field as a tie-breaker.

```bash
$ sort -k2,2 -k1,1 names.txt
Alice admin
Carol admin
Bob member
Dave member
```

### Ignore leading blanks

Ignore leading blanks when comparing lines.

```bash
$ sort -b names.txt
  Alice
 Bob
Carol
```

---

## Check Sorted Input

Validate sorted input without rewriting it.

### Check sorted order

Check whether a file is already sorted. Sorted input produces no output and exits successfully.

```bash
$ sort -c names.txt
```

### Check sorted unique input

Check whether input is sorted and has no duplicate lines.

```bash
$ sort -cu names.txt
```

---

## Popular use cases

Use `sort` in pipelines to rank, deduplicate, and stabilize command output.

### Rank CPU usage

Sort `ps` output by CPU percentage and show the busiest processes.

```bash
$ ps aux | sort -k3,3nr | head -n 5
alice  4242  38.0  1.2  app-server
alice  4170  12.5  0.8  node
root    301   5.1  0.4  WindowServer
```

### Find the smallest entries

Sort disk-usage output numerically before limiting it with `head`.

```bash
$ du -sk * | sort -n | head -n 10
4	README.md
16	scripts
48	src
```

### Count commits by author

Sort author names before `uniq -c`, then sort the counts descending.

```bash
$ git log --format='%an' | sort | uniq -c | sort -nr
  42 Alice
  17 Bob
   9 Carol
```

### Extract distinct CSV values

Extract a CSV field and print each distinct value once.

```bash
$ cut -d, -f2 users.csv | sort -u
admin
member
owner
```

### Stabilize file listings

Make `find` output deterministic before passing paths to another tool.

```bash
$ find . -type f -name "*.log" | sort
./logs/app.log
./logs/worker.log
./test/output.log
```
