---
name: x-search-cli
description: Search posts on X (Twitter). Use when user wants to search X, find tweets, check what people are saying on X, look up X posts, or query social media trends.
---

# x-search — Search X

`x-search` searches X (formerly Twitter) and returns a natural-language answer.

## Prerequisites

1. Verify that `x-search` is installed:

```bash
x-search --version
```

If the command is not found, install it:

```bash
npm install -g x-search-cli
```

2. Verify that `x-search` is authenticated:

```bash
x-search auth status
```

If not authenticated, ask the user to run:

```bash
x-search auth login
```

## Search

```bash
x-search "What are people saying about xAI on X?"
```

### Options

| Flag                | Description                                           |
| ------------------- | ----------------------------------------------------- |
| `--from YYYY-MM-DD` | Restrict results to posts on or after this date       |
| `--to YYYY-MM-DD`   | Restrict results to posts on or before this date      |
| `--model <name>`    | Use a different xAI model (default: `grok-4.3`)       |
| `--json`            | Output structured JSON with Markdown text and sources |
| `--help`, `-h`      | Show usage help                                       |
| `--version`, `-v`   | Show version                                          |

### Examples

Search with a date range:

```bash
x-search "launch reactions" --from 2026-05-01 --to 2026-05-17
```

Get structured output:

```bash
x-search "xAI" --json
```

Use a specific model:

```bash
x-search "latest AI news" --model grok-4.3
```

### Output

- By default, outputs a Markdown-formatted answer.
- `--json` outputs structured JSON with no decorative output, suitable for programmatic consumption.
