import { expect, test } from "vite-plus/test";
import { formatMarkdown } from "../src/format.ts";
import type { CliIO } from "../src/types.ts";

const ttyOutput = {
  isTTY: true,
  columns: 80,
  write: () => true,
} as unknown as NodeJS.WriteStream;

const io = {
  stdout: ttyOutput,
  stderr: ttyOutput,
  stdin: { isTTY: true } as NodeJS.ReadStream,
} satisfies CliIO;

test("renders markdown for terminal output", () => {
  const rendered = formatMarkdown("## Title\n\n- **One**\n- `Two`", io);

  expect(rendered).toContain("Title");
  expect(rendered).toContain("One");
  expect(rendered).toContain("Two");
  expect(rendered).not.toContain("## Title");
  expect(rendered).not.toContain("**One**");
});
