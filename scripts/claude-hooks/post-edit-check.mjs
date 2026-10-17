#!/usr/bin/env node
// PostToolUse hook: after Claude edits a .ts file, run the rule check on it and feed violations back.
import { execFileSync } from 'child_process';

let raw = '';
process.stdin.on('data', (d) => (raw += d));
process.stdin.on('end', () => {
  let file = '';
  try { file = JSON.parse(raw)?.tool_input?.file_path ?? ''; } catch { /* ignore */ }
  if (!file.endsWith('.ts')) process.exit(0);
  try {
    execFileSync('node', ['scripts/ai-check.mjs', file], { stdio: 'pipe' });
  } catch (e) {
    process.stderr.write(String(e.stderr ?? e.stdout ?? 'ai-check failed'));
    process.exit(2); // exit 2 = show stderr to Claude
  }
});
