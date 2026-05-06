---
title: jq
description: Pretty-print, read, filter, transform, and format JSON from files and APIs.
---

`jq` reads JSON from files or standard input and applies a filter. Use `-r` when you want plain strings instead of JSON-quoted strings.

## Basics

### Pretty-print JSON

Use `.` to format JSON without changing its structure.

```bash
$ jq . data.json
{
  "name": "Alice",
  "active": true
}
```

### Read a field

Select a top-level field by name.

```bash
$ jq '.name' user.json
"Alice"
```

### Print a raw field

Use `-r` to print string values without quotes.

```bash
$ jq -r '.name' user.json
Alice
```

### Iterate an array

Use `[]` to emit each array item separately.

```bash
$ jq '.items[]' data.json
{"id":1,"name":"alpha"}
{"id":2,"name":"beta"}
```

## Filter and Map Arrays

### Extract values from objects

Read one field from every object in an array.

```bash
$ jq '.users[].name' users.json
"Alice"
"Bob"
```

### Filter by boolean field

Use `select()` to keep only matching objects.

```bash
$ jq '.users[] | select(.active)' users.json
{"name":"Alice","active":true,"role":"admin"}
```

### Filter by exact field

Compare a field value inside `select()`.

```bash
$ jq '.users[] | select(.role == "admin")' users.json
{"name":"Alice","active":true,"role":"admin"}
```

### Map array values

Transform an array into another array.

```bash
$ jq '.users | map(.name)' users.json
[
  "Alice",
  "Bob"
]
```

## Objects

### Build a smaller object

Keep only the fields you need.

```bash
$ jq '{id, name}' user.json
{
  "id": 42,
  "name": "Alice"
}
```

### Add a field

Merge a new field into an object.

```bash
$ jq '. + {active: true}' user.json
{
  "id": 42,
  "name": "Alice",
  "active": true
}
```

### Delete a field

Remove fields that should not be printed or passed along.

```bash
$ jq 'del(.password)' user.json
{
  "id": 42,
  "name": "Alice"
}
```

## Formatting Output

### Print compact results

Use `-c` to print each result on one line.

```bash
$ jq -c '.[]' users.json
{"id":1,"name":"Alice"}
{"id":2,"name":"Bob"}
```

### Encode CSV rows

Use `@csv` with `-r` to produce CSV text.

```bash
$ jq -r '.rows[] | @csv' data.json
"alice","admin"
"bob","viewer"
```

### Encode TSV rows

Use `@tsv` for tab-separated output that works well in shell pipelines.

```bash
$ jq -r '.rows[] | @tsv' data.json
alice	admin
bob	viewer
```

## Common Pipelines

### Filter API results

Extract values from API JSON returned by `curl`.

```bash
$ curl -s https://api.example.com/users | jq -r '.items[] | select(.active) | .email'
alice@example.com
bob@example.com
```

### Tabulate Kubernetes pods

Convert Kubernetes JSON into tab-separated rows.

```bash
$ kubectl get pods -A -o json | jq -r '.items[] | [.metadata.namespace, .metadata.name, .status.phase] | @tsv'
default	web-7f9c9d	Running
kube-system	coredns-abc	Running
```
