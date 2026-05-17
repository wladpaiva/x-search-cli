import { DEFAULT_MODEL, type ParsedArgs } from "./types.ts";

export function parseArgs(argv: string[]): ParsedArgs {
  if (argv.length === 0 || argv.includes("--help") || argv.includes("-h")) {
    return { command: "help" };
  }

  if (argv.includes("--version") || argv.includes("-v")) {
    return { command: "version" };
  }

  if (argv[0] === "auth") {
    const action = argv[1];
    if (action === "login" || action === "status" || action === "logout") {
      return { command: "auth", action };
    }

    throw new Error("Expected auth action: login, status, or logout.");
  }

  const queryParts: string[] = [];
  let model = DEFAULT_MODEL;
  let json = false;
  let fromDate: string | undefined;
  let toDate: string | undefined;

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === "--json") {
      json = true;
      continue;
    }

    if (arg === "--model") {
      model = readOptionValue(argv, index, "--model");
      index += 1;
      continue;
    }

    if (arg === "--from") {
      fromDate = readOptionValue(argv, index, "--from");
      index += 1;
      continue;
    }

    if (arg === "--to") {
      toDate = readOptionValue(argv, index, "--to");
      index += 1;
      continue;
    }

    if (arg.startsWith("-")) {
      throw new Error(`Unknown option: ${arg}`);
    }

    queryParts.push(arg);
  }

  const query = queryParts.join(" ").trim();
  if (!query) {
    throw new Error("Expected a search query.");
  }

  return { command: "search", query, model, json, fromDate, toDate };
}

function readOptionValue(argv: string[], index: number, optionName: string) {
  const value = argv[index + 1];
  if (!value || value.startsWith("-")) {
    throw new Error(`Expected value after ${optionName}.`);
  }

  return value;
}
