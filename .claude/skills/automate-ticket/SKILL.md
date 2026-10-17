---
name: automate-ticket
description: /automate-ticket <ID> runs the full 8-step process (design → build → run → triage) for one ticket, stopping at both human gates.
model: sonnet
---
# automate-ticket
Argument: ticket id, e.g. `PROJ-456`.

1. Run **test-design** for the ticket. Present the draft plan. **Stop and wait for the engineer to set `Status: Approved`** (Gate 1).
2. When approved, run **pom-generator**, then **spec-author** (includes verify + local run).
3. Present the change summary and PR text. **Stop for human PR review** (Gate 2). Do not merge.
4. After CI, if the engineer provides artifacts or asks, run **failure-triage** and draft the ticket update.
Never skip a gate, never invent test data, and never alter an approved plan without telling the engineer.
