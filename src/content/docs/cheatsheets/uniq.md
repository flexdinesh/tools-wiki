---
title: uniq
description: Collapse adjacent duplicates, count repeats, and deduplicate sorted pipeline output.
---

`uniq` filters adjacent matching lines. Sort first when you want to deduplicate across the whole input.

## Basics

### Collapse adjacent duplicates

Print one copy of each adjacent repeated line.

```bash
$ uniq names.txt
alice
bob
alice
```

### Count adjacent repeats

Use `-c` to prefix each adjacent group with its count.

```bash
$ uniq -c names.txt
   2 alice
   1 bob
   1 alice
```

### Print adjacent duplicates only

Use `-d` to print only lines that repeat next to each other.

```bash
$ uniq -d names.txt
alice
```

### Print adjacent unique lines only

Use `-u` to print lines that are not repeated next to themselves.

```bash
$ uniq -u names.txt
bob
alice
```

## Deduplicate Globally

### Deduplicate all lines

Sort first so equal lines become adjacent.

```bash
$ sort names.txt | uniq
alice
bob
```

### Count all distinct lines

Combine `sort`, `uniq -c`, and another sort to rank values by frequency.

```bash
$ sort names.txt | uniq -c | sort -nr
   3 alice
   1 bob
```

### Print global duplicates

Sort first, then use `uniq -d` to show values that appear more than once.

```bash
$ sort names.txt | uniq -d
alice
```

## Common Pipelines

### Count CSV values

Extract one CSV column, count distinct values, and rank them.

```bash
$ cut -d, -f2 users.csv | sort | uniq -c | sort -nr
  42 admin
  18 editor
   7 viewer
```

### Rank shell history

Normalize shell history lines and show the most repeated commands.

```bash
$ history | awk '{$1=""; sub(/^ /, ""); print}' | sort | uniq -c | sort -nr | head -n 10
  84 git status
  51 pnpm exec astro build
  37 ls
```
