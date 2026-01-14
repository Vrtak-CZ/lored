# Lored

A lightweight URL redirect service built with [Bun](https://bun.sh).

## What it does

Lored redirects incoming requests based on the URL path. It parses the path to extract the target domain, port, and path, then issues a 302 redirect.

### URL Format

```
/<domain>/<path>
/<domain>:<port>/<path>
/http:<domain>/<path>
/https:<domain>/<path>
```

### Examples

| Request | Redirects to |
|---------|--------------|
| `/example.com` | `http://example.com/` |
| `/example.com/path` | `http://example.com/path` |
| `/example.com:8080/path` | `http://example.com:8080/path` |
| `/https:example.com/path` | `https://example.com/path` |
| `/example.com/path?foo=bar` | `http://example.com/path?foo=bar` |

## Docker

### Build the image

```bash
docker build -t lored .
```

### Run the container

```bash
docker run -p 8080:8080 lored
```

### Custom port

```bash
docker run -p 3000:3000 -e PORT=3000 lored
```

## Local Development

### Install dependencies

```bash
bun install
```

### Run the server

```bash
bun run dev
```

### Run tests

```bash
bun test
```
