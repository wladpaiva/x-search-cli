import type { CliIO } from "./types.ts";

const SPINNER_FRAMES = ["-", "\\", "|", "/"];

export function startSpinner(label: string, io: CliIO, enabled: boolean) {
  if (!enabled || !io.stderr.isTTY) {
    return () => {};
  }

  let frameIndex = 0;
  io.stderr.write(`${SPINNER_FRAMES[frameIndex]} ${label}...`);

  const timer = setInterval(() => {
    frameIndex = (frameIndex + 1) % SPINNER_FRAMES.length;
    io.stderr.write(`\r${SPINNER_FRAMES[frameIndex]} ${label}...`);
  }, 120);

  return () => {
    clearInterval(timer);
    io.stderr.write(`\r${" ".repeat(label.length + 6)}\r`);
  };
}
