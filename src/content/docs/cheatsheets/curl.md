---
title: curl
description: Send HTTP requests, inspect responses, pass headers and auth, submit data, download files, debug connections, and script API calls.
---

`curl` transfers data to and from URLs. These examples focus on common HTTP and API workflows.

## Basics

Fetch URLs and inspect basic HTTP responses.

### Fetch response body

Fetch a URL and print the response body to standard output.

```bash
$ curl https://example.com
<!doctype html>
<html>
<head><title>Example Domain</title></head>
<body>Example Domain</body>
</html>
```

### Show headers and body

Show response headers followed by the response body.

```bash
$ curl -i https://example.com
HTTP/2 200
content-type: text/html; charset=UTF-8
content-length: 1256

<!doctype html>
<html>...</html>
```

### Show headers only

Send a `HEAD` request and show response headers only.

```bash
$ curl -I https://example.com
HTTP/2 200
content-type: text/html; charset=UTF-8
content-length: 1256
```

### Follow redirects

Follow HTTP redirects until the final response is reached.

```bash
$ curl -L https://example.com/old-page
<!doctype html>
<html>
<head><title>New Page</title></head>
<body>Moved content</body>
</html>
```

### Hide progress meter

Use silent mode to hide the progress meter.

```bash
$ curl -s https://example.com
<!doctype html>
<html>...</html>
```

### Show errors in silent mode

Use silent mode but still show errors when the request fails.

```bash
$ curl -sS https://api.example.com/status
{"status":"ok"}
```

---

## HTTP Methods

Send explicit HTTP verbs for API resources.

### Read a resource

Send an explicit `GET` request to read a resource.

```bash
$ curl -X GET https://api.example.com/users
[{"id":1,"name":"alice"},{"id":2,"name":"bob"}]
```

### Create a resource

Send a `POST` request to create a resource.

```bash
$ curl -X POST https://api.example.com/users
{"id":3,"created":true}
```

### Replace a resource

Send a `PUT` request to replace a resource.

```bash
$ curl -X PUT https://api.example.com/users/42
{"id":42,"updated":true}
```

### Update part of a resource

Send a `PATCH` request to update part of a resource.

```bash
$ curl -X PATCH https://api.example.com/users/42
{"id":42,"updated":true}
```

### Delete a resource

Send a `DELETE` request to remove a resource.

```bash
$ curl -X DELETE https://api.example.com/users/42
{"id":42,"deleted":true}
```

---

## Headers

Add request headers for content negotiation and metadata.

### Request JSON

Ask the server to return a JSON response.

```bash
$ curl -H "Accept: application/json" https://api.example.com/users
[{"id":1,"name":"alice"}]
```

### Set content type

Set the request body content type, usually when sending JSON.

```bash
$ curl -H "Content-Type: application/json" \
  -d '{"name":"alice"}' \
  https://api.example.com/users
{"id":1,"name":"alice"}
```

### Send bearer token

Pass a bearer token in the `Authorization` header.

```bash
$ curl -H "Authorization: Bearer $TOKEN" https://api.example.com/me
{"id":1,"name":"alice"}
```

### Set user agent

Set a custom `User-Agent` header.

```bash
$ curl -A "my-client/1.0" https://api.example.com/status
{"status":"ok"}
```

### Set referrer

Set the `Referer` header for requests that need a referring page.

```bash
$ curl -e https://referrer.example.com https://example.com
<!doctype html>
<html>...</html>
```

---

## Request Body

Send form, JSON, file, and query payloads.

### Send form data

Send URL-encoded form data in the request body.

```bash
$ curl -d "name=alice&role=admin" https://api.example.com/users
{"id":1,"name":"alice","role":"admin"}
```

### Send JSON body

Send a JSON request body.

```bash
$ curl -H "Content-Type: application/json" \
  -d '{"name":"alice"}' \
  https://api.example.com/users
{"id":1,"name":"alice"}
```

### Send body from file

Send a request body from a file without altering newlines or special characters.

```bash
$ curl --data-binary @payload.json https://api.example.com/users
{"id":1,"created":true}
```

### Upload multipart file

Upload a file as multipart form data.

```bash
$ curl -F "avatar=@avatar.png" https://api.example.com/profile
{"uploaded":true,"filename":"avatar.png"}
```

### Encode query parameters

Build a query string with URL-encoded parameters.

```bash
$ curl -G --data-urlencode "q=hello world" https://api.example.com/search
{"query":"hello world","results":[]}
```

---

## Authentication

Authenticate requests with common HTTP credential styles.

### Use basic auth

Send HTTP Basic authentication credentials.

```bash
$ curl -u alice:secret https://api.example.com/private
{"authenticated":true}
```

### Prompt for password

Prompt for the password instead of putting it in shell history.

```bash
$ curl -u alice https://api.example.com/private
Enter host password for user 'alice':
{"authenticated":true}
```

### Use bearer token header

Authenticate with a bearer token header.

```bash
$ curl -H "Authorization: Bearer $TOKEN" https://api.example.com/private
{"authenticated":true}
```

### Use OAuth bearer option

Use curl's OAuth 2 bearer token option instead of writing the header manually.

```bash
$ curl --oauth2-bearer "$TOKEN" https://api.example.com/private
{"authenticated":true}
```

### Use netrc credentials

Read credentials from `~/.netrc` for hosts configured there.

```bash
$ curl --netrc https://api.example.com/private
{"authenticated":true}
```

---

## Response Handling

Save, inspect, and fail based on response details.

### Save as named file

Save the response body to a named file.

```bash
$ curl -o page.html https://example.com
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  1256  100  1256    0     0  12560      0 --:--:-- --:--:-- --:--:-- 12560
```

### Save with remote filename

Save the response body using the remote filename.

```bash
$ curl -O https://example.com/archive.tar.gz
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
100 10.0M  100 10.0M    0     0  20.0M      0 --:--:-- --:--:-- --:--:-- 20.0M
```

### Use server filename

Save using the filename from the server's `Content-Disposition` header.

```bash
$ curl -OJ https://example.com/download
```

### Save response headers

Write response headers to a file while printing the body normally.

```bash
$ curl -D headers.txt https://example.com
<!doctype html>
<html>...</html>
```

### Print status code

Print only the HTTP status code.

```bash
$ curl -w "%{http_code}\n" -o /dev/null -s https://example.com
200
```

### Fail on HTTP errors

Treat HTTP 4xx and 5xx responses as command failures.

```bash
$ curl --fail https://api.example.com/health
{"status":"ok"}
```

---

## Downloads

Download files reliably and control transfer behavior.

### Follow redirects while saving

Follow redirects and save a remote file with its original filename.

```bash
$ curl -L -O https://example.com/file.zip
```

### Resume download

Resume an interrupted download.

```bash
$ curl -C - -O https://example.com/file.zip
** Resuming transfer from byte position 1048576
```

### Limit download speed

Limit download speed to avoid saturating a connection.

```bash
$ curl --limit-rate 1M -O https://example.com/file.zip
```

### Retry downloads

Retry transient download failures.

```bash
$ curl --retry 3 -O https://example.com/file.zip
```

### Create output directories

Create destination directories before saving a file.

```bash
$ curl --create-dirs -o downloads/file.zip https://example.com/file.zip
```

---

## Cookies and Sessions

Send and persist cookies across requests.

### Send a cookie

Send a cookie with the request.

```bash
$ curl -b "session=abc123" https://example.com/account
<!doctype html>
<html>Account</html>
```

### Save cookies

Save response cookies to a cookie jar file.

```bash
$ curl -c cookies.txt https://example.com/login
<!doctype html>
<html>Login</html>
```

### Load cookies

Load cookies from a cookie jar file.

```bash
$ curl -b cookies.txt https://example.com/account
<!doctype html>
<html>Account</html>
```

### Update a cookie jar

Load cookies from a cookie jar and write updated cookies back to the same file.

```bash
$ curl -b cookies.txt -c cookies.txt https://example.com/account
<!doctype html>
<html>Account</html>
```

---

## Debugging

Inspect requests, timing, and TLS behavior.

### Enable verbose output

Print verbose request and response details to debug a request.

```bash
$ curl -v https://example.com
* Connected to example.com (93.184.216.34) port 443
> GET / HTTP/2
> Host: example.com
< HTTP/2 200
< content-type: text/html; charset=UTF-8
<!doctype html>
<html>...</html>
```

### Write request trace

Write a detailed request and response trace to a file.

```bash
$ curl --trace-ascii trace.txt https://example.com
<!doctype html>
<html>...</html>
```

### Set connection timeout

Fail if the TCP connection cannot be established within the timeout.

```bash
$ curl --connect-timeout 5 https://example.com
<!doctype html>
<html>...</html>
```

### Set total timeout

Set a maximum total time for the whole request.

```bash
$ curl --max-time 10 https://api.example.com/slow
curl: (28) Operation timed out after 10001 milliseconds with 0 bytes received
```

### Skip TLS verification

Skip TLS certificate verification for local or temporary test endpoints.

```bash
$ curl -k https://localhost:8443
{"status":"ok"}
```

---

## TLS, DNS, and Proxies

Customize trust, name resolution, and network routing.

### Trust a custom CA

Trust a custom certificate authority for a request.

```bash
$ curl --cacert ca.pem https://internal.example.com
{"status":"ok"}
```

### Use client certificate

Use a client certificate and private key for mutual TLS.

```bash
$ curl --cert client.pem --key client-key.pem https://api.example.com
{"authenticated":true}
```

### Override DNS

Override DNS for one request while still using the original hostname for TLS and HTTP.

```bash
$ curl --resolve example.com:443:127.0.0.1 https://example.com
<!doctype html>
<html>...</html>
```

### Use HTTP proxy

Send a request through an HTTP proxy.

```bash
$ curl -x http://proxy.example.com:8080 https://example.com
<!doctype html>
<html>...</html>
```

### Bypass proxies

Bypass configured proxies for matching hosts.

```bash
$ curl --noproxy localhost,127.0.0.1 https://localhost:3000
{"status":"ok"}
```

---

## Scripting

Use curl predictably in shell scripts.

### Fail quietly in scripts

Fail on HTTP errors, stay quiet on success, and still show errors.

```bash
$ curl -fsS https://api.example.com/health
{"status":"ok"}
```

### Save body and status

Save the response body to a file and print the HTTP status code for script logic.

```bash
$ curl -fsS -o response.json -w "%{http_code}\n" https://api.example.com/users
200
```

### Pipe JSON to jq

Pipe JSON to `jq` for readable output or filtering.

```bash
$ curl -s https://api.example.com/users | jq '.[0]'
{
  "id": 1,
  "name": "alice"
}
```

### Retry flaky endpoint

Retry a flaky endpoint with a delay and fail on HTTP error responses.

```bash
$ curl --retry 5 --retry-delay 2 --fail https://api.example.com/job
{"status":"complete"}
```

### Send idempotency key

Send an idempotency key with a write request so retries do not create duplicate work.

```bash
$ curl -H "Idempotency-Key: payment-abc123" \
  -H "Content-Type: application/json" \
  -d @payload.json \
  https://api.example.com/payments
{"id":"pay_123","status":"created"}
```

---

## Popular use cases

Use `curl` with other Unix tools to inspect APIs, filter responses, and stream downloads.

### Fetch JSON and filter it with jq

Fetch an API response silently and extract the fields you need.

```bash
$ curl -s https://api.example.com/users | jq -r '.[] | [.id, .name] | @tsv'
1	alice
2	bob
```

### Check a response header

Fetch only headers and filter for the header you care about.

```bash
$ curl -sI https://example.com | grep -i "^content-type:"
content-type: text/html; charset=UTF-8
```

### Download and extract an archive

Stream a compressed archive directly into `tar`.

```bash
$ curl -fsSL https://example.com/archive.tar.gz | tar -xz -C /tmp
```

### Filter remote logs

Stream a remote log file and keep the latest matching error lines.

```bash
$ curl -s https://example.com/app.log | grep "ERROR" | tail -n 20
2026-05-06 10:14:22 ERROR database connection failed
2026-05-06 10:15:03 ERROR retry limit reached
```

### Save and filter at the same time

Use `tee` to save a response while continuing to process it.

```bash
$ curl -s https://example.com/robots.txt | tee robots.txt | grep "Disallow"
Disallow: /admin
Disallow: /private
```

### Download URLs from JSON

Extract file URLs from an API response and download each one.

```bash
$ curl -s https://api.example.com/files | jq -r '.files[].url' | xargs -n1 curl -O
```
