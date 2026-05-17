import { xai } from "@ai-sdk/xai";
import { generateText } from "ai";
import process from "node:process";
import { getConfigPath, readConfig } from "./config.ts";
import { formatMarkdown } from "./format.ts";
import { startSpinner } from "./spinner.ts";
import type { CliIO, SearchArgs } from "./types.ts";

export async function runSearch(args: SearchArgs, io: CliIO) {
  const config = await readConfig(getConfigPath());

  if (!config) {
    throw new Error(`No local authorization found.

Run:
  x-search auth login`);
  }

  process.env.XAI_API_KEY = config.apiKey;

  const stopSpinner = startSpinner("Searching X", io, !args.json);

  let text = "";
  let sources: unknown;
  try {
    const result = await generateText({
      model: xai.responses(args.model || config.defaultModel),
      prompt: args.query,
      tools: {
        x_search: xai.tools.xSearch({
          fromDate: args.fromDate,
          toDate: args.toDate,
        }),
      },
    });

    text = result.text;
    sources = result.sources;
  } finally {
    stopSpinner();
  }

  if (args.json) {
    io.stdout.write(`${JSON.stringify({ text, sources }, null, 2)}\n`);
    return;
  }

  io.stdout.write(`\n${formatMarkdown(text, io)}\n`);
}
