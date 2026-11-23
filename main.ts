// Dad Joke Showdown — one dad joke, at most 200 characters.
// The joke is written to /output/entry.txt with a runtime guard.
// Revision: verify the output round-trips byte-for-byte, so a stray
// newline or encoding slip can never silently change the judged text.
import { writeFileSync, mkdirSync, readFileSync } from "node:fs";

const JOKE =
  "I told Alexa to play dad rock, and now the whole house is grounded.";

const chars = [...JOKE].length;
if (chars < 1 || chars > 200) {
  throw new Error(`joke must be 1-200 characters, got ${chars}`);
}
if (JOKE.trim() !== JOKE || JOKE.includes("\n")) {
  throw new Error("joke must be a single line with no surrounding whitespace");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, JOKE, "utf8");
const roundTrip = readFileSync(`${outDir}/entry.txt`, "utf8");
if (roundTrip !== JOKE) {
  throw new Error("entry.txt round-trip mismatch");
}
console.log(`wrote ${chars}-character dad joke to ${outDir}/entry.txt`);
