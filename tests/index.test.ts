import { expect, test } from "vite-plus/test";
import { getConfigPath, parseArgs } from "../src/index.ts";

test("parses root search command", () => {
  expect(parseArgs(["What are people saying about xAI on X?"])).toEqual({
    command: "search",
    query: "What are people saying about xAI on X?",
    model: "grok-4.3",
    json: false,
    fromDate: undefined,
    toDate: undefined,
  });
});

test("parses search flags", () => {
  expect(
    parseArgs(["launch reactions", "--from", "2026-05-01", "--to", "2026-05-17", "--json"]),
  ).toEqual({
    command: "search",
    query: "launch reactions",
    model: "grok-4.3",
    json: true,
    fromDate: "2026-05-01",
    toDate: "2026-05-17",
  });
});

test("parses auth commands", () => {
  expect(parseArgs(["auth", "login"])).toEqual({
    command: "auth",
    action: "login",
  });
});

test("uses xdg config home when present", () => {
  expect(getConfigPath({ XDG_CONFIG_HOME: "/tmp/config" }, "/home/user")).toBe(
    "/tmp/config/x-search-cli/config.json",
  );
});
