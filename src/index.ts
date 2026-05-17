#!/usr/bin/env node
import process from "node:process";
import { parseArgs } from "./args.ts";
import { runAuth } from "./auth.ts";
import { getConfigPath } from "./config.ts";
import { getHelpText } from "./help.ts";
import { runSearch } from "./search.ts";
import type { CliIO, ParsedArgs } from "./types.ts";

export { getConfigPath, parseArgs };
export type { ParsedArgs };

export async function runCli(argv: string[], io: CliIO = process) {
  const args = parseArgs(argv);

  if (args.command === "help") {
    io.stdout.write(getHelpText());
    return;
  }

  if (args.command === "version") {
    io.stdout.write("x-search-cli 0.0.0\n");
    return;
  }

  if (args.command === "auth") {
    await runAuth(args, io);
    return;
  }

  await runSearch(args, io);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  runCli(process.argv.slice(2)).catch((error: unknown) => {
    const message = error instanceof Error ? error.message : String(error);
    process.stderr.write(`${message}\n`);
    process.exitCode = 1;
  });
}
