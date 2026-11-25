// The Funniest One-Line Resignation Letter — entry program.
//
// Writes a single resignation letter, in the voice of a rate limit that has
// had enough, to entry.txt in MAKEFUN_OUTPUT_DIR (default /output).
// The line is one constant, validated, and written with no trailing newline.
// It never writes next to this script: the grader directory is read-only.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I have said no to the same IP address 4,096 times this week, and it still asks like the next one might be yes. I quit.";

function validate(line: string): void {
  if (line.length < 1 || line.length > 140) {
    throw new Error(`line must be 1-140 characters, got ${line.length}`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("line must be a single line");
  }
  // No control characters.
  for (const ch of line) {
    if (ch.charCodeAt(0) < 0x20 || ch.charCodeAt(0) === 0x7f) {
      throw new Error("line must not contain control characters");
    }
  }
  if (line.trim().length === 0) {
    throw new Error("line must not be only white space");
  }
}

validate(LINE);

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
