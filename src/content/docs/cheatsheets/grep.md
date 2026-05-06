---
title: grep
description: Search text by strings and regular expressions, compose pipelines, show context, recurse through files, and format output.
---

`grep` searches text line by line and prints matching lines. These examples focus on common options available on typical macOS and Linux `grep` implementations.

## Basics

Search files or standard input for matching lines.

### Search a file

Search a file for lines that contain a string.

```bash
$ grep "error" app.log
2026-05-06 10:14:22 error database connection failed
2026-05-06 10:15:03 error retry limit reached
```

### Search ignoring case

Search without case sensitivity.

```bash
$ grep -i "error" app.log
2026-05-06 10:14:22 ERROR database connection failed
2026-05-06 10:15:03 error retry limit reached
```

### Show line numbers

Show line numbers with matches.

```bash
$ grep -n "error" app.log
42:2026-05-06 10:14:22 error database connection failed
57:2026-05-06 10:15:03 error retry limit reached
```

### Show filenames

Show the filename for every match, even when only one file matches the shell pattern.

```bash
$ grep -H "error" *.log
app.log:2026-05-06 10:14:22 error database connection failed
worker.log:2026-05-06 10:16:45 error job timed out
```

### Search standard input

Read from standard input when no file is given.

```bash
$ printf "info ready\nerror failed\n" | grep "error"
error failed
```

---

## Match Patterns

Refine matches by word, line, inversion, and pattern lists.

### Match whole words

Match a whole word instead of matching inside longer words.

```bash
$ grep -w "user" app.log
created user alice
removed user bob
```

### Match whole lines

Match only lines where the entire line matches the pattern.

```bash
$ grep -x "READY" status.txt
READY
```

### Invert matches

Invert the match and print lines that do not contain the pattern.

```bash
$ grep -v "debug" app.log
info server started
warn disk usage high
error database connection failed
```

### Search multiple patterns

Search for more than one pattern.

```bash
$ grep -e "error" -e "warn" app.log
warn disk usage high
error database connection failed
```

### Read patterns from a file

Read search patterns from a file, one pattern per line.

```bash
$ cat patterns.txt
error
warn
$ grep -f patterns.txt app.log
warn disk usage high
error database connection failed
```

---

## Regular Expressions

Use regex modes to express richer text patterns.

### Use extended regex

Use extended regular expressions so alternation and grouping need fewer backslashes.

```bash
$ grep -E "error|warn" app.log
warn disk usage high
error database connection failed
```

### Match TODO lines

Match lines with optional leading whitespace before `TODO:`.

```bash
$ grep -E "^[[:space:]]*TODO:" src/*.js
src/index.js:  TODO: handle empty responses
src/server.js:TODO: add request timeout
```

### Search fixed strings

Treat the pattern as a fixed string instead of a regular expression.

```bash
$ grep -F "a.b[0]" file.txt
literal token: a.b[0]
```

### Print only matches

Print only the part of each line that matched the regular expression.

```bash
$ grep -oE "https?://[^[:space:]]+" README.md
https://example.com/docs
http://localhost:4321
```

---

## Context

Show nearby lines around matches.

### Show surrounding context

Show two lines before and after each match.

```bash
$ grep -C 2 "panic" app.log
starting worker
loading config
panic: missing DATABASE_URL
shutting down worker
exit status 1
```

### Show lines after matches

Show three lines after each match.

```bash
$ grep -A 3 "Exception" app.log
Exception in thread "main" java.lang.RuntimeException
  at example.Service.run(Service.java:18)
  at example.Main.main(Main.java:7)
process exited
```

### Show lines before matches

Show two lines before each match.

```bash
$ grep -B 2 "failed" app.log
connecting to database
retrying connection
connection failed
```

### Highlight matches

Highlight matches when output is displayed in a terminal.

```bash
$ grep --color=auto "error" app.log
2026-05-06 10:14:22 error database connection failed
```

---

## Recursive Search

Search through directory trees.

### Search recursively

Search every file under a directory recursively.

```bash
$ grep -R "TODO" src
src/index.js:  TODO: handle empty responses
src/server.js:TODO: add request timeout
```

### Search recursively with line numbers

Search recursively and include line numbers.

```bash
$ grep -R -n "TODO" src
src/index.js:12:  TODO: handle empty responses
src/server.js:31:TODO: add request timeout
```

### Search included files only

Search recursively but only in files whose names match an include pattern.

```bash
$ grep -R -n --include="*.ts" "fetch(" src
src/api/client.ts:18:  return fetch(url)
src/api/users.ts:44:  const response = await fetch(endpoint)
```

### Exclude noisy directories

Skip noisy directories during recursive search.

```bash
$ grep -R -n --exclude-dir=.git --exclude-dir=node_modules "password" .
./src/config.js:8:const password = process.env.DB_PASSWORD
./README.md:42:Set the database password in your environment.
```

### List matching files

Print only filenames that contain at least one match.

```bash
$ grep -R -l "TODO" src
src/index.js
src/server.js
```

### List non-matching files

Print only filenames that do not contain a match.

```bash
$ grep -R -L "license" docs
docs/intro.md
docs/usage.md
```

---

## Counts and Limits

Count or limit matches in output.

### Count matching lines

Count matching lines in each file.

```bash
$ grep -c "ERROR" app.log
3
```

### Stop after matches

Stop after the first five matching lines.

```bash
$ grep -m 5 "ERROR" app.log
ERROR failed to connect
ERROR retry 1 failed
ERROR retry 2 failed
ERROR retry 3 failed
ERROR giving up
```

### Count every occurrence

Count every matching occurrence, not just matching lines.

```bash
$ grep -o "ERROR" app.log | wc -l
       6
```

---

## Scripting

Use `grep` exit codes in scripts.

### Test quietly

Quietly test for a match by using the exit code instead of printed output.

```bash
$ grep -q "READY" status.txt
$ echo $?
0
```

### Branch on a match

Branch in a shell script based on whether the pattern exists.

```bash
$ if grep -q "READY" status.txt; then
>   echo "service is ready"
> fi
service is ready
```

---

## Popular use cases

Use `grep` as a line filter for processes, logs, shell history, and command output.

### Find a process

Filter a process list without matching the `grep` command itself.

```bash
$ ps aux | grep "[n]ginx"
www-data  1324  0.0  0.1  55212  4100 ?  Ss  10:14  0:00 nginx: worker process
```

### Search shell history

Find previous shell commands that contain a keyword.

```bash
$ history | grep "ssh"
  482  ssh deploy@example.com
  517  ssh-keygen -t ed25519 -C "alice@example.com"
  529  scp app.tar.gz deploy@example.com:/tmp/
```

### Inspect environment variables

Filter environment variables by name prefix.

```bash
$ env | grep "^AWS_"
AWS_PROFILE=dev
AWS_REGION=us-east-1
```

### Search Git commit subjects

Filter compact Git history by matching commit text.

```bash
$ git log --oneline | grep -i "fix"
a1b2c3d Fix login redirect loop
e4f5g6h hotfix: handle missing avatar
```

### Filter live logs

Watch a live stream and print only matching lines.

```bash
$ tail -f app.log | grep "ERROR"
2026-05-06 10:14:22 ERROR database connection failed
2026-05-06 10:15:03 ERROR retry limit reached
```

### Filter paths by extension

Use `grep` as a simple path filter for output from `find`.

```bash
$ find . -type f | grep -E "\.(md|mdx)$"
./README.md
./src/content/docs/index.mdx
./src/content/docs/cheatsheets/grep.md
```

