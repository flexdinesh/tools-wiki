---
title: awk
description: Print fields, filter records, summarize columns, and format text in pipelines.
---

`awk` reads records, splits them into fields, and runs small actions on matching lines. It is especially useful in pipelines and column-oriented text.

## Basics

### Print every line

The default action is to print matching records.

```bash
$ awk '{print}' file.txt
alice 72 admin
bob 95 viewer
```

### Print the first field

Use `$1`, `$2`, and so on to access fields split on whitespace.

```bash
$ awk '{print $1}' file.txt
alice
bob
```

### Print selected fields

Print multiple fields separated by the output field separator.

```bash
$ awk '{print $1, $3}' file.txt
alice admin
bob viewer
```

### Print first records

Use `NR` to filter by record number.

```bash
$ awk 'NR <= 5' file.txt
line 1
line 2
line 3
line 4
line 5
```

## Fields and Delimiters

### Print a CSV field

Use `-F` to choose the input field separator.

```bash
$ awk -F, '{print $1}' users.csv
id
1
2
```

### Skip the header row

Use `NR > 1` to ignore the first record.

```bash
$ awk -F, 'NR > 1 {print $2}' users.csv
alice
bob
```

### Set input and output separators

Set `FS` and `OFS` in `BEGIN` for clearer delimiter control.

```bash
$ awk 'BEGIN {FS=","; OFS="\t"} {print $1, $3}' users.csv
id	role
1	admin
2	viewer
```

## Filtering

### Match lines by regex

A regex pattern keeps only matching records.

```bash
$ awk '/ERROR/' app.log
2026-05-06 ERROR failed to connect
```

### Filter by numeric field

Compare fields numerically in the pattern.

```bash
$ awk '$3 > 90 {print $1, $3}' scores.txt
bob 95
```

### Keep header while filtering

Use `NR == 1` to keep the header with filtered rows.

```bash
$ awk 'NR == 1 || $3 > 90' scores.tsv
name	team	score
bob	blue	95
```

## Calculations and Summaries

### Sum a field

Accumulate values, then print the result in `END`.

```bash
$ awk '{sum += $1} END {print sum}' numbers.txt
42
```

### Average a field

Track both the sum and the count.

```bash
$ awk '{sum += $1; count++} END {print sum / count}' numbers.txt
14
```

### Count by field

Use an associative array to count repeated values.

```bash
$ awk '{count[$1]++} END {for (key in count) print key, count[key]}' users.txt
admin 3
viewer 7
```

## Formatting

### Align columns

Use `printf` for predictable column widths.

```bash
$ awk '{printf "%-10s %5s\n", $1, $2}' scores.txt
alice         72
bob           95
```
