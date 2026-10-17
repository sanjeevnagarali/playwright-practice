# AI-integrated automation process

Claude authors; Playwright executes. Two human gates. Plans are stored by ticket id so any engineer can resume.

| Phase | Step | Claude | QA engineer | Output |
|---|---|---|---|---|
| Design | 01 Story intake | Reads story, ACs, Figma via MCP | Picks ticket, adds context/data | Requirement summary |
| | 02 Test design | Drafts tagged cases | Adds domain edge cases | Draft plan |
| | **03 Approve plan** | Revises | **Sets `Status: Approved` (Gate 1)** | `test-plans/<ID>.md` |
| Build | 04 Page objects | Explores app via Playwright MCP | Confirms locator strategy | `src/pages/**` |
| | 05 Specs | Writes traced specs | Checks readability | `tests/**` |
| | **06 Review & merge** | verify + local run, PR text | **Approves PR (Gate 2)** | Merged code |
| Run | 07 Execute | `--grep @<ID>` locally | CI shards | Report, traces |
| | 08 Triage | Classifies, proposes fixes, drafts comment | Confirms defects | Defect log, ticket update |

## Enforcement
- `CLAUDE.md` rules R-01…R-16 loaded every session.
- `scripts/ai-check.mjs` checks them (also on CI, on every PR). R-07 fails a ticket spec if its plan is not Approved.
- `.claude/settings.json` hook runs the check after each edit and feeds violations back to Claude.
- Secrets and `.env` are denied to Claude; `curl`/`wget`/force-push are denied.

## Model routing
`test-design` and `failure-triage` use opus (judgement); `pom-generator`, `spec-author`, `automate-ticket` use sonnet.

## Maintenance loop
When the UI changes and locators break, run failure-triage; it proposes page-object updates that go through normal PR review.
