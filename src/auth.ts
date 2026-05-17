import { rm } from "node:fs/promises";
import { getConfigPath, readConfig, writeConfig } from "./config.ts";
import { DEFAULT_MODEL, type AuthArgs, type CliIO } from "./types.ts";

export async function runAuth(args: AuthArgs, io: CliIO) {
  const configPath = getConfigPath();

  if (args.action === "login") {
    const apiKey = await readSecret("xAI API key: ", io);
    if (!apiKey.trim()) {
      throw new Error("API key cannot be empty.");
    }

    await writeConfig(configPath, {
      apiKey: apiKey.trim(),
      defaultModel: DEFAULT_MODEL,
    });
    io.stdout.write(`Saved local authorization at ${configPath}\n`);
    return;
  }

  if (args.action === "status") {
    const config = await readConfig(configPath);
    io.stdout.write(
      config ? `Local authorization found at ${configPath}\n` : "No local authorization found.\n",
    );
    return;
  }

  await rm(configPath, { force: true });
  io.stdout.write("Removed local authorization.\n");
}

async function readSecret(prompt: string, io: CliIO) {
  if (!io.stdin.isTTY || !io.stdout.isTTY || !io.stdin.setRawMode) {
    throw new Error("Interactive login requires a TTY.");
  }

  io.stdout.write(prompt);
  io.stdin.setRawMode(true);
  io.stdin.resume();
  io.stdin.setEncoding("utf8");

  let value = "";

  return await new Promise<string>((resolve, reject) => {
    const cleanup = () => {
      io.stdin.setRawMode(false);
      io.stdin.pause();
      io.stdin.off("data", onData);
      io.stdout.write("\n");
    };

    const onData = (chunk: string) => {
      for (const char of chunk) {
        if (char === "\u0003") {
          cleanup();
          reject(new Error("Login cancelled."));
          return;
        }

        if (char === "\r" || char === "\n") {
          cleanup();
          resolve(value);
          return;
        }

        if (char === "\u007f" || char === "\b") {
          value = value.slice(0, -1);
          continue;
        }

        value += char;
      }
    };

    io.stdin.on("data", onData);
  });
}
