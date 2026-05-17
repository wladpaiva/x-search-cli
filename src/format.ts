import termMd from "term-md";
import type { CliIO } from "./types.ts";

export function formatMarkdown(markdown: string, io: CliIO) {
  const trimmed = markdown.trim();

  if (!io.stdout.isTTY) {
    return trimmed;
  }

  return termMd(trimmed, {
    reflowText: true,
    showSectionPrefix: false,
    width: Math.min(io.stdout.columns || 80, 100),
  }).trimEnd();
}
