# x-search-cli

A small CLI for querying X through xAI's X Search tool.

## Install

```bash
npm install -g x-search-cli
```

For local development:

```bash
pnpm install
pnpm build
npm install -g .
```

## Authorize

```bash
x-search auth login
```

The API key is stored at:

```text
~/.config/x-search-cli/config.json
```

Check or remove the saved local authorization:

```bash
x-search auth status
x-search auth logout
```

## Search

```bash
x-search "What are people saying about xAI on X?"
```

By default, `x-search` shows a progress indicator while searching and prints
only the natural-language answer, with Markdown rendered for the terminal.

Use JSON output when you need raw Markdown and sources:

```bash
x-search "What are people saying about xAI on X?" --json
```

Restrict the X Search date range:

```bash
x-search "launch reactions" --from 2026-05-01 --to 2026-05-17
```

Use another xAI Responses model:

```bash
x-search "What are people saying about xAI on X?" --model grok-4.3
```
