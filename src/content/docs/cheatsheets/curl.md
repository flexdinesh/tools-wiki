---
title: curl
description: Fetch URLs, inspect headers, send JSON, authenticate, download files, and debug requests.
---

`curl` sends HTTP requests from the terminal. Use it to inspect responses, call APIs, submit data, and download files.

## Basics

### Fetch a response body

Print the response body for a URL.

```bash
$ curl https://example.com
<!doctype html>
<html>
  <head><title>Example Domain</title></head>
```

### Show headers and body

Use `-i` to include response headers before the body.

```bash
$ curl -i https://example.com
HTTP/2 200
content-type: text/html

<!doctype html>
```

### Show headers only

Use `-I` to send a HEAD request and print response headers.

```bash
$ curl -I https://example.com
HTTP/2 200
content-type: text/html
content-length: 1256
```

### Follow redirects

Use `-L` when the server redirects to another URL.

```bash
$ curl -L https://example.com/old-page
<!doctype html>
<html>
```

### Show errors in silent mode

Use `-sS` to hide progress but still print errors.

```bash
$ curl -sS https://api.example.com/status
{"ok":true}
```

## Send Data

### Request JSON

Set an `Accept` header when you want JSON back from an API.

```bash
$ curl -H "Accept: application/json" https://api.example.com/users
[{"id":1,"name":"Alice"}]
```

### Send a JSON body

Set `Content-Type` and pass the JSON request body with `-d`.

```bash
$ curl -H "Content-Type: application/json" \
  -d '{"name":"alice","role":"admin"}' \
  https://api.example.com/users
{"id":42,"name":"alice","role":"admin"}
```

### Encode query parameters

Use `-G --data-urlencode` to build a query string safely.

```bash
$ curl -G --data-urlencode "q=hello world" https://api.example.com/search
{"query":"hello world","results":[]}
```

## Authentication

### Use basic auth

Pass a username and let curl prompt for the password.

```bash
$ curl -u alice https://api.example.com/private
Enter host password for user 'alice':
{"ok":true}
```

### Send a bearer token

Pass API tokens in an `Authorization` header.

```bash
$ curl -H "Authorization: Bearer $TOKEN" https://api.example.com/private
{"ok":true}
```

## Downloads

### Save as a named file

Use `-o` to choose the output filename.

```bash
$ curl -o page.html https://example.com
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
100  1256  100  1256    0     0  12000      0 --:--:-- --:--:-- --:--:-- 12000
```

### Save with the remote filename

Use `-O` to save using the name from the URL.

```bash
$ curl -O https://example.com/archive.tar.gz
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
100 1024k  100 1024k    0     0  5120k      0 --:--:-- --:--:-- --:--:-- 5120k
```

### Follow redirects while saving

Combine `-L` and `-O` for redirected downloads.

```bash
$ curl -L -O https://example.com/file.zip
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
100 2048k  100 2048k    0     0  4096k      0 --:--:-- --:--:-- --:--:-- 4096k
```

## Response Handling and Debugging

### Print the HTTP status code

Use `-w` to print response metadata after the request.

```bash
$ curl -w "%{http_code}\n" -o /dev/null -s https://example.com
200
```

### Fail on HTTP errors

Use `--fail` so HTTP 4xx and 5xx responses make curl exit non-zero.

```bash
$ curl --fail https://api.example.com/health
{"status":"ok"}
```

### Enable verbose output

Use `-v` to inspect request and response details while debugging.

```bash
$ curl -v https://example.com
* Connected to example.com
> GET / HTTP/2
< HTTP/2 200
```

### Set a connection timeout

Use `--connect-timeout` to avoid waiting too long for a connection.

```bash
$ curl --connect-timeout 5 https://example.com
<!doctype html>
<html>
```
