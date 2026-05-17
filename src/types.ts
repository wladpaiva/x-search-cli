export const DEFAULT_MODEL = "grok-4.3";

export type Config = {
  apiKey: string;
  defaultModel: string;
};

export type SearchArgs = {
  command: "search";
  query: string;
  model: string;
  json: boolean;
  fromDate?: string;
  toDate?: string;
};

export type AuthArgs = {
  command: "auth";
  action: "login" | "status" | "logout";
};

export type HelpArgs = {
  command: "help";
};

export type VersionArgs = {
  command: "version";
};

export type ParsedArgs = SearchArgs | AuthArgs | HelpArgs | VersionArgs;

export type CliIO = {
  stdout: NodeJS.WriteStream;
  stderr: NodeJS.WriteStream;
  stdin: NodeJS.ReadStream;
};
