---
title: awk
description: Scan, filter, split, transform, summarize, and format text records from files and Unix pipelines.
---

`awk` reads input as records, splits each record into fields, and runs small pattern-action programs. It is useful for extracting columns, filtering rows, calculating summaries, and formatting text in Unix pipelines.

## Basics

Run simple `awk` programs that print records and fields.

### Print every line

Print every input line.

```bash
$ awk '{print}' file.txt
Alice admin 91
Bob member 72
Carol admin 98
```

### Print the first field

Print the first whitespace-separated field from each line.

```bash
$ awk '{print $1}' file.txt
Alice
Bob
Carol
```

### Print selected fields

Print selected fields separated by a space.

```bash
$ awk '{print $1, $3}' file.txt
Alice 91
Bob 72
Carol 98
```

### Print first records

Print the first five records. `NR` is the current record number.

```bash
$ awk 'NR <= 5' file.txt
line 1
line 2
line 3
line 4
line 5
```

### Skip empty records

Print only non-empty records. `NF` is the number of fields on the current record.

```bash
$ awk 'NF {print}' file.txt
Alice admin 91
Bob member 72
```

---

## Fields and Delimiters

Control how `awk` splits input into fields.

### Print a CSV field

Use a comma as the input field separator and print the first field.

```bash
$ awk -F, '{print $1}' users.csv
id
1
2
3
```

### Skip the header row

Skip the header row and print the second CSV field.

```bash
$ awk -F, 'NR > 1 {print $2}' users.csv
Alice
Bob
Carol
```

### Print selected CSV fields

Read comma-separated fields and print selected values with spaces between them.

```bash
$ awk -F, '{print $1, $3}' users.csv
id role
1 admin
2 member
3 owner
```

### Set input and output separators

Set input and output separators in a `BEGIN` block before processing records.

```bash
$ awk 'BEGIN {FS=","; OFS="\t"} {print $1, $3}' users.csv
id	role
1	admin
2	member
3	owner
```

---

## Filtering

Print only records that match patterns or conditions.

### Match lines by regex

Print lines that match a regular expression.

```bash
$ awk '/ERROR/' app.log
2026-05-06 10:14:22 ERROR database connection failed
2026-05-06 10:15:03 ERROR retry limit reached
```

### Filter by numeric field

Print records where the third field is greater than 90.

```bash
$ awk '$3 > 90 {print $1, $3}' scores.txt
Alice 91
Carol 98
```

### Keep header while filtering

Keep the header row and print records that match a numeric condition.

```bash
$ awk 'NR == 1 || $3 > 90' scores.tsv
name	team	score
Alice	api	91
Carol	design	98
```

### Match a field by regex

Print records whose fifth field matches a regular expression.

```bash
$ awk '$5 ~ /failed/ {print}' app.log
2026-05-06 10:14:22 ERROR job failed retrying
```

---

## Calculations and Summaries

Accumulate values while scanning records once.

### Sum a field

Add the first field from every record and print the total at the end.

```bash
$ awk '{sum += $1} END {print sum}' numbers.txt
42
```

### Average a field

Calculate the average of the first field.

```bash
$ awk '{sum += $1; count++} END {print sum / count}' numbers.txt
14
```

### Count by field

Count records by the first field using an associative array.

```bash
$ awk '{count[$1]++} END {for (key in count) print key, count[key]}' users.txt
admin 3
member 7
owner 1
```

### Find minimum and maximum

Track minimum and maximum values while scanning the file once.

```bash
$ awk 'NR == 1 {min = max = $1} {if ($1 < min) min = $1; if ($1 > max) max = $1} END {print min, max}' numbers.txt
2 100
```

---

## Formatting

Shape `awk` output with alignment and separators.

### Align columns

Use `printf` to align columns.

```bash
$ awk '{printf "%-10s %5s\n", $1, $2}' scores.txt
Alice         91
Bob           72
Carol         98
```

### Emit CSV output

Print a header and format output as comma-separated text.

```bash
$ awk 'BEGIN {print "name,total"} {print $1 "," $2}' scores.txt
name,total
Alice,91
Bob,72
Carol,98
```

---

## Popular use cases

Use `awk` with other commands to reshape, filter, and summarize text streams.

### Show high-CPU processes

Keep the process table header and show only processes using more than 10% CPU.

```bash
$ ps aux | awk 'NR == 1 || $3 > 10 {print $1, $2, $3, $11}'
USER PID %CPU COMMAND
alice 4242 38.0 app-server
alice 4170 12.5 node
```

### Alert on full disks

Filter `df` output for filesystems whose use percentage is above 80%.

```bash
$ df -h | awk '$5+0 > 80 {print $0}'
/dev/disk3s1   228Gi  205Gi   23Gi    90%    /
```

### Extract fields from error logs

Use `grep` to narrow log lines, then print only the fields you need.

```bash
$ grep "ERROR" app.log | awk '{print $1, $2, $NF}'
2026-05-06 10:14:22 failed
2026-05-06 10:15:03 reached
```

### Rank commits by author

Count commit authors and sort the result as a ranking.

```bash
$ git log --format='%an' | awk '{count[$0]++} END {for (name in count) print count[name], name}' | sort -nr
42 Alice
17 Bob
9 Carol
```

### Rank client IPs from remote logs

Download access logs, extract IP addresses, and show the busiest clients.

```bash
$ curl -s https://example.com/access.log | awk '{print $1}' | sort | uniq -c | sort -nr | head
  42 203.0.113.10
  17 198.51.100.23
   9 192.0.2.44
```
