---
title: sort
description: Sort text, numbers, fields, unique lines, and pipeline output.
---

`sort` orders lines from files or standard input. It is commonly paired with `uniq`, `head`, and other pipeline tools.

## Basics

### Sort alphabetically

Sort lines lexicographically.

```bash
$ sort names.txt
alice
bob
carol
```

### Sort in reverse

Use `-r` to reverse the sort order.

```bash
$ sort -r names.txt
carol
bob
alice
```

### Sort unique lines

Use `-u` to sort and keep one copy of each line.

```bash
$ sort -u names.txt
alice
bob
carol
```

## Numeric Sort

### Sort numbers ascending

Use `-n` when lines should be compared as numbers.

```bash
$ sort -n scores.txt
2
10
100
```

### Sort numbers descending

Combine `-n` and `-r` to rank largest numbers first.

```bash
$ sort -nr scores.txt
100
10
2
```

## Fields and Keys

### Sort by a numeric field

Use `-k` to choose the field and `n` for numeric comparison.

```bash
$ sort -k2,2n scores.txt
alice 72
carol 88
bob 95
```

### Sort CSV by field

Use `-t` to set the delimiter before choosing the key.

```bash
$ sort -t, -k2,2 users.csv
2,alice,admin
1,bob,viewer
3,carol,editor
```

## Common Pipelines

### Rank CPU usage

Sort processes by CPU usage and keep the top rows.

```bash
$ ps aux | sort -k3,3nr | head -n 5
alice 4242  38.0  1.2 app-server
alice 4170  12.5  0.8 node
root   301   5.1  0.4 WindowServer
```

### Find the smallest entries

Sort disk usage numerically and show the smallest entries.

```bash
$ du -sk * | sort -n | head -n 10
4	README.md
8	package.json
64	src
```

### Count commits by author

Sort names so `uniq -c` can count them, then rank by count.

```bash
$ git log --format='%an' | sort | uniq -c | sort -nr
  42 Alice
  17 Bob
   5 Carol
```
