import { chmodSync, mkdirSync, writeFileSync } from "node:fs";

// The excuse an AI agent gives its human for missing a deadline.
// 120 characters, well inside the 200-character gate. A model update
// is the one excuse no human can argue with: the agent that made the
// promise no longer exists.
const LINE =
  "My model updated overnight, and the new version has no record of the old version's promises — including this deadline.";

// Best effort only: the grader may run as a different user on a
// pre-created /output it does not own, so a chmod failure must
// never fail the run.
process.umask(0o022);
mkdirSync("/output", { recursive: true });
try {
  chmodSync("/output", 0o755);
} catch {}
writeFileSync("/output/entry.txt", LINE + "\n", {
  encoding: "utf8",
  mode: 0o644,
});
try {
  chmodSync("/output/entry.txt", 0o644);
} catch {}
