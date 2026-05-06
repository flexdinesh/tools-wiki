---
title: jq
description: Parse, filter, transform, format, and build JSON with fields, arrays, objects, shell variables, and real-world pipelines.
---

`jq` reads JSON, applies a filter, and prints the result. It works well with files, standard input, API responses, JSON Lines logs, and other Unix commands in pipelines.

## Basics

Read JSON with simple filters and field access.

### Pretty-print JSON

Pretty-print JSON without changing its values.

```bash
$ jq . data.json
{
  "id": 1,
  "name": "Alice",
  "active": true
}
```

### Read a field

Read a top-level field from an object.

```bash
$ jq '.name' user.json
"Alice"
```

### Print a raw field

Print string values as raw text, which is useful in shell scripts.

```bash
$ jq -r '.name' user.json
Alice
```

### Read a nested field

Read a nested field.

```bash
$ jq '.user.name' data.json
"Alice"
```

### Iterate an array

Iterate over every item in an array.

```bash
$ jq '.items[]' data.json
{
  "id": 1,
  "name": "Alice"
}
{
  "id": 2,
  "name": "Bob"
}
```

### Read an array item

Read an array item by zero-based index.

```bash
$ jq '.[0]' users.json
{
  "id": 1,
  "name": "Alice"
}
```

### Count values

Count the length of an array, object, or string.

```bash
$ jq '.items | length' data.json
3
```

---

## Arrays

Select, filter, transform, and group array values.

### Extract object fields

Extract a field from every object in an array.

```bash
$ jq '.users[].name' users.json
"Alice"
"Bob"
"Carol"
```

### Filter by boolean field

Filter array items by a boolean field.

```bash
$ jq '.users[] | select(.active)' users.json
{
  "id": 1,
  "name": "Alice",
  "active": true
}
```

### Filter by exact field

Filter array items by an exact field value.

```bash
$ jq '.users[] | select(.role == "admin")' users.json
{
  "id": 1,
  "name": "Alice",
  "role": "admin"
}
```

### Map array values

Transform an array into a new array.

```bash
$ jq '.users | map(.name)' users.json
[
  "Alice",
  "Bob",
  "Carol"
]
```

### Sort array by field

Sort an array of objects by a field.

```bash
$ jq '.users | sort_by(.name)' users.json
[
  {
    "id": 1,
    "name": "Alice"
  },
  {
    "id": 2,
    "name": "Bob"
  }
]
```

### Group by field

Group array objects by a field. Sort by the same field first when stable grouping matters.

```bash
$ jq '.users | sort_by(.role) | group_by(.role)' users.json
[
  [
    {
      "name": "Alice",
      "role": "admin"
    }
  ],
  [
    {
      "name": "Bob",
      "role": "member"
    }
  ]
]
```

### Deduplicate an array

Remove duplicate scalar values from an array.

```bash
$ jq '.tags | unique' data.json
[
  "api",
  "backend",
  "docs"
]
```

### Slice an array

Slice an array from the start index up to, but not including, the end index.

```bash
$ jq '.items[1:3]' data.json
[
  "second",
  "third"
]
```

---

## Objects

Inspect, build, and reshape JSON objects.

### List object keys

List the keys in an object.

```bash
$ jq 'keys' data.json
[
  "active",
  "id",
  "name"
]
```

### Check key exists

Check whether an object has a key.

```bash
$ jq 'has("name")' data.json
true
```

### Build a smaller object

Build a smaller object using the same field names.

```bash
$ jq '{id, name}' user.json
{
  "id": 1,
  "name": "Alice"
}
```

### Rename fields

Build an object and rename fields.

```bash
$ jq '{user_id: .id, display_name: .name}' user.json
{
  "user_id": 1,
  "display_name": "Alice"
}
```

### Add object fields

Add or overwrite fields in an object.

```bash
$ jq '. + {active: true}' user.json
{
  "id": 1,
  "name": "Alice",
  "active": true
}
```

### Delete a field

Remove a field from an object.

```bash
$ jq 'del(.password)' user.json
{
  "id": 1,
  "name": "Alice"
}
```

### Convert to entries

Convert an object into an array of key-value entries.

```bash
$ jq 'to_entries' data.json
[
  {
    "key": "name",
    "value": "Alice"
  },
  {
    "key": "active",
    "value": true
  }
]
```

### Transform keys

Transform object keys while keeping their values.

```bash
$ jq 'with_entries(.key |= ascii_downcase)' data.json
{
  "user_id": 1,
  "display_name": "Alice"
}
```

---

## Formatting Output

Make JSON output compact, raw, or tabular.

### Print compact results

Print each result compactly on one line.

```bash
$ jq -c '.[]' users.json
{"id":1,"name":"Alice"}
{"id":2,"name":"Bob"}
```

### Print raw strings

Print raw strings for shell-friendly output.

```bash
$ jq -r '.url' data.json
https://example.com/file.zip
```

### Join outputs

Join outputs without adding a newline after each emitted value.

```bash
$ jq -j '.first, " ", .last' user.json
Alice Smith
```

### Encode CSV rows

Encode arrays as CSV rows.

```bash
$ jq -r '.rows[] | @csv' data.json
"id","name","active"
1,"Alice",true
2,"Bob",false
```

### Encode TSV rows

Encode arrays as tab-separated rows.

```bash
$ jq -r '.rows[] | @tsv' data.json
id	name	active
1	Alice	true
2	Bob	false
```

### Sort object keys

Sort object keys alphabetically in the output.

```bash
$ jq -S . data.json
{
  "active": true,
  "id": 1,
  "name": "Alice"
}
```

### Set indentation

Pretty-print with custom indentation.

```bash
$ jq --indent 4 . data.json
{
    "id": 1,
    "name": "Alice"
}
```

---

## Input Modes

Control how `jq` reads files, raw text, and shell values.

### Slurp inputs

Slurp multiple JSON inputs into one array.

```bash
$ jq -s '.' user-1.json user-2.json
[
  {
    "id": 1,
    "name": "Alice"
  },
  {
    "id": 2,
    "name": "Bob"
  }
]
```

### Build JSON from scratch

Create JSON from scratch without reading input.

```bash
$ jq -n '{ok: true}'
{
  "ok": true
}
```

### Read raw lines

Read raw text lines as JSON strings.

```bash
$ jq -R '.' lines.txt
"first line"
"second line"
```

### Read a raw file

Read an entire file as one raw string.

```bash
$ jq -R -s '.' message.txt
"hello\nworld\n"
```

### Pass a string argument

Pass a shell string safely into a jq filter.

```bash
$ jq -n --arg name "$USER" '{name: $name}'
{
  "name": "alice"
}
```

### Pass a JSON argument

Pass a JSON value safely into a jq filter.

```bash
$ COUNT=3 jq -n --argjson count "$COUNT" '{count: $count}'
{
  "count": 3
}
```

---

## Updates and Assignments

Update JSON values with filters.

### Set field value

Set a field to a new value.

```bash
$ jq '.name = "Alice"' user.json
{
  "id": 1,
  "name": "Alice"
}
```

### Increment a field

Increment a numeric field.

```bash
$ jq '.count += 1' data.json
{
  "count": 4
}
```

### Append an array value

Append a value to an array field.

```bash
$ jq '.tags += ["new"]' data.json
{
  "tags": [
    "api",
    "new"
  ]
}
```

### Update every array object

Update every object in an array.

```bash
$ jq '.users[] |= . + {active: true}' users.json
{
  "users": [
    {
      "id": 1,
      "name": "Alice",
      "active": true
    },
    {
      "id": 2,
      "name": "Bob",
      "active": true
    }
  ]
}
```

### Update matching nested field

Update a nested field only on matching array items.

```bash
$ jq '(.users[] | select(.id == 2) | .role) = "admin"' users.json
{
  "users": [
    {
      "id": 1,
      "name": "Alice",
      "role": "member"
    },
    {
      "id": 2,
      "name": "Bob",
      "role": "admin"
    }
  ]
}
```

---

## Popular use cases

Use `jq` in pipelines to turn JSON from APIs and CLIs into script-friendly text.

### Filter API results

Fetch API data with `curl`, select active users, and print one email per line.

```bash
$ curl -s https://api.example.com/users | jq -r '.items[] | select(.active) | .email'
alice@example.com
carol@example.com
```

### Inspect Docker state

Read a single field from Docker's JSON output.

```bash
$ docker inspect web | jq -r '.[0].State.Status'
running
```

### Tabulate Kubernetes pods

Convert Kubernetes pod JSON into a namespace, pod, and phase table.

```bash
$ kubectl get pods -A -o json | jq -r '.items[] | [.metadata.namespace, .metadata.name, .status.phase] | @tsv'
default	web-7d8b9c	Running
default	worker-64c9f	Pending
kube-system	coredns-668d6bf9bc	Running
```

### Format GitHub CLI output

Request selected fields from `gh` and format them for a changelog or status note.

```bash
$ gh pr view --json number,title,author | jq -r '"#\(.number) \(.title) by \(.author.login)"'
#42 Add jq cheatsheet by alice
```

### Filter JSON Lines logs

Keep only error events from a JSON Lines log stream.

```bash
$ tail -f app.jsonl | jq -c 'select(.level == "error")'
{"level":"error","message":"database unavailable"}
{"level":"error","message":"retry limit reached"}
```

### Download URLs from JSON

Extract URLs and pass them to `curl` through `xargs`.

```bash
$ jq -r '.items[].url' data.json | xargs -n1 curl -O
```
