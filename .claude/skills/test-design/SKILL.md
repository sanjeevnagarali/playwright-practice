---
name: test-design
description: Steps 01-03. Turn a Jira/Linear story (and Figma) into a tagged test plan in test-plans/<ID>.md for QA approval. Use before any automation code is written.
model: opus
---
# test-design
**In:** ticket id (and optional Figma link). **Out:** `test-plans/<ID>.md` with `Status: Draft`.

1. Read the story + acceptance criteria via the Jira/Linear MCP (`.mcp.json`); read Figma specs if linked. If you cannot reach them, ask the engineer to paste the story — do not guess.
2. Start from `test-plans/_TEMPLATE.md`. Summarise requirements as AC-1…AC-n.
3. Draft cases: positive, negative, edge (use `references/commerce-test-heuristics.md`: stock, price/tax rounding, coupons, guest vs registered, B2B, multi-seller, payment failure, 3rd-party outage, mobile). Tag each: `@smoke` (few, critical), `@regression`, `@api`, `@integration`, `@marketplace`, `@b2b`.
4. List the test data each case needs. Check `test-data/` and `src/data`. Anything missing goes under "Test data needed" with **CONFIRM** — never invent it (R-12).
5. Keep `Status: Draft`. Ask the engineer for edge cases the story misses and to approve. **Only a human changes the status to Approved (Gate 1).** Revise on feedback.
6. Stop. Do not write page objects or specs.
