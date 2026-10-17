---
name: failure-triage
description: Step 08. Read the failure digest, traces and logs; classify each failure (product defect, script issue, data/env, flaky); propose fixes and draft the ticket comment.
model: opus
---
# failure-triage
**In:** `test-results/ai-triage/failures.md|json`, `playwright-report/`, traces, screenshots. **Out:** triage report + proposed fixes + ticket comment draft.

1. Read the digest first; open attachments/traces only for failures that need them. Group by root cause.
2. Classify: **Product defect** (app behaves wrongly vs the approved plan/AC) · **Script issue** (locator/timing/data) · **Data/Env** (missing seed, outage, 3rd party) · **Flaky** (passes on retry with no cause found).
3. For script issues propose the smallest fix in a page object/spec (respect R-01…R-16). Do not apply it without the engineer's go-ahead; fixes go through a PR.
4. For product defects draft a Jira/Linear defect: title, steps, expected vs actual, evidence paths, TC id from the `trace` annotation.
5. Draft a short ticket comment: run summary, pass/fail by TC, defects, next step. The engineer confirms defects (never auto-file).
