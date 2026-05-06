---
title: uniq
description: Collapse adjacent duplicate lines, count repeats, find duplicates, print unique lines, and compose deduplication pipelines.
---

`uniq` reads lines from a file or standard input and compares each line with the previous line. Because it only removes adjacent duplicates, it is commonly used after `sort` when you want global deduplication.

## Basics

Compare adjacent lines and collapse repeats.

### Collapse adjacent duplicates

Collapse adjacent duplicate lines into one line.

```bash
$ uniq names.txt
Alice
Bob
Alice
Carol
```

### Count adjacent repeats

Prefix each output line with the number of adjacent repeats.

```bash
$ uniq -c names.txt
   2 Alice
   3 Bob
   1 Carol
```

### Print adjacent duplicates

Print only lines that are repeated next to each other.

```bash
$ uniq -d names.txt
Alice
Bob
```

### Print adjacent unique lines

Print only lines that are not repeated next to each other.

```bash
$ uniq -u names.txt
Carol
```

### Ignore case while comparing

Compare lines without case sensitivity.

```bash
$ uniq -i names.txt
Alice
Bob
Carol
```

---

## Deduplicate Globally

Sort before `uniq` to compare all duplicates.

### Deduplicate all lines

Sort first so duplicate lines become adjacent, then collapse them.

```bash
$ sort names.txt | uniq
Alice
Bob
Carol
```

### Count all distinct lines

Count how many times each distinct line appears.

```bash
$ sort names.txt | uniq -c
   2 Alice
   3 Bob
   1 Carol
```

### Print global duplicates

Print values that appear more than once anywhere in the input.

```bash
$ sort names.txt | uniq -d
Alice
Bob
```

### Print globally unique lines

Print values that appear exactly once in the input.

```bash
$ sort names.txt | uniq -u
Carol
```

---

## Ignore Parts of Lines

Skip fields or characters before comparing lines.

### Skip fields

Skip the first whitespace-separated field before comparing lines.

```bash
$ uniq -f 1 events.txt
INFO started
ERROR failed
INFO stopped
```

### Skip characters

Skip the first 11 characters before comparing lines.

```bash
$ uniq -s 11 events.txt
10:00:00 started
10:00:02 failed
10:00:04 stopped
```

---

## Popular use cases

Use `uniq` after sorting input to count repeated values and find duplicates.

### Count CSV values

Extract a CSV field, group equal values, and rank the counts.

```bash
$ cut -d, -f2 users.csv | sort | uniq -c | sort -nr
  12 member
   3 admin
   1 owner
```

### Count repeated log endings

Extract the final word from matching log lines and rank the repeated values.

```bash
$ grep "ERROR" app.log | awk '{print $NF}' | sort | uniq -c | sort -nr
   8 timeout
   3 failed
   2 refused
```

### Count commits by author email

Pipe Git author emails through `sort` and `uniq -c` to find frequent contributors.

```bash
$ git log --format='%ae' | sort | uniq -c | sort -nr
  42 alice@example.com
  17 bob@example.com
```

### Find duplicate basenames

Find JavaScript files with the same basename in different directories.

```bash
$ find . -type f -name "*.js" | awk -F/ '{print $NF}' | sort | uniq -d
index.js
utils.js
```

### Rank shell history

Remove history numbers, group repeated commands, and show the most common commands.

```bash
$ history | awk '{$1=""; sub(/^ /, ""); print}' | sort | uniq -c | sort -nr | head -n 10
  28 git status
  14 pnpm build
  11 ls -la
```
