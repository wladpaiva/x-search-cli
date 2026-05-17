import { mkdir, readFile, writeFile } from "node:fs/promises";
import { homedir } from "node:os";
import { dirname, join } from "node:path";
import process from "node:process";
import { DEFAULT_MODEL, type Config } from "./types.ts";

const CONFIG_DIR_NAME = "x-search-cli";
const CONFIG_FILE_NAME = "config.json";

export function getConfigPath(env = process.env, home = homedir()) {
  const configHome = env.XDG_CONFIG_HOME ?? join(home, ".config");
  return join(configHome, CONFIG_DIR_NAME, CONFIG_FILE_NAME);
}

export async function readConfig(configPath: string): Promise<Config | undefined> {
  try {
    const rawConfig = await readFile(configPath, "utf8");
    const config = JSON.parse(rawConfig) as Partial<Config>;

    if (typeof config.apiKey !== "string" || !config.apiKey.trim()) {
      return undefined;
    }

    return {
      apiKey: config.apiKey,
      defaultModel:
        typeof config.defaultModel === "string" && config.defaultModel
          ? config.defaultModel
          : DEFAULT_MODEL,
    };
  } catch (error) {
    if (isNodeError(error) && error.code === "ENOENT") {
      return undefined;
    }

    throw error;
  }
}

export async function writeConfig(configPath: string, config: Config) {
  await mkdir(dirname(configPath), { recursive: true, mode: 0o700 });
  await writeFile(configPath, `${JSON.stringify(config, null, 2)}\n`, {
    mode: 0o600,
  });
}

function isNodeError(error: unknown): error is NodeJS.ErrnoException {
  return error instanceof Error && "code" in error;
}
