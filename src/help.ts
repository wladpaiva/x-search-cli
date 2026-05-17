export function getHelpText() {
  return `x-search

Usage:
  x-search <query> [--model grok-4.3] [--from YYYY-MM-DD] [--to YYYY-MM-DD] [--json]
  x-search auth login
  x-search auth status
  x-search auth logout

Examples:
  x-search "What are people saying about xAI on X?"
  x-search "launch reactions" --from 2026-05-01 --to 2026-05-17
  x-search "xAI" --json
`;
}
