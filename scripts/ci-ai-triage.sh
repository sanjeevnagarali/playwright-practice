#!/usr/bin/env bash
# Optional, read-only Claude triage in CI after-script. Never changes the build result.
set -u
if [ -z "${ANTHROPIC_API_KEY:-}" ] || [ ! -f test-results/ai-triage/failures.md ]; then
  echo "AI triage skipped (no key or no failures)."; exit 0
fi
npm install -g @anthropic-ai/claude-code >/dev/null 2>&1 || { echo "claude CLI install failed; skipping"; exit 0; }
mkdir -p test-results/ai-triage
claude -p "Use the failure-triage skill on test-results/ai-triage/failures.md. Classify each failure as product defect, script issue, data/env issue or flaky. Output markdown only." \
  --allowedTools "Read,Grep,Glob" > "test-results/ai-triage/triage-${BITBUCKET_BUILD_NUMBER:-local}.md" 2>/dev/null || true
exit 0
