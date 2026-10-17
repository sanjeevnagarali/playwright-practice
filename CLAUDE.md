# Playwright Commerce Framework — rules for Claude

Playwright + TypeScript, Page Object Model + data-driven, for ecommerce/marketplace apps (Adobe Commerce first).
**You author code; Playwright executes it. No AI in the test runtime path.**

## Process (two human gates)
01 Story intake → 02 Test design → **03 Plan approved (Gate 1)** → 04 Page objects → 05 Specs → **06 PR reviewed (Gate 2)** → 07 Execute → 08 Triage.
- Plans live in `test-plans/<TICKET>.md`. **Never write test code until the plan says `Status: Approved`.** Only a human sets that.
- Use `/automate-ticket <ID>` or the skills in `.claude/skills/` (test-design, pom-generator, spec-author, failure-triage).

## Rules (enforced by `npm run ai:check`, lint and the post-edit hook)
- **R-01** Specs never contain raw locators (`page.locator/getBy*`). Locators live in `src/pages` or `src/components`.
- **R-02** Every page class extends `BasePage`; components extend `BaseComponent` or are plain classes under `src/components`.
- **R-03** Locator priority: `getByRole` → `getByLabel` → `getByTestId` → `getByText`. No XPath. No brittle CSS chains. If a stable hook is missing, list the `data-testid` the developers should add.
- **R-04** Web-first assertions only (`expect(locator).toBeVisible()`); never `expect(await x.isVisible())`.
- **R-05** No `waitForTimeout`. Use auto-waiting, `expect.poll`, or `src/utils/wait.ts`.
- **R-06** Every test has tags: `@smoke`, `@regression`, `@api`, `@integration`, `@marketplace`, `@b2b`, `@mobile`, `@cross-browser`, `@prod-safe` (see `src/utils/tags.ts`).
- **R-07** Ticket specs are named `<TICKET>-<slug>.spec.ts`, use `trace('<TICKET>','TC-xx', tags)` and require an approved plan.
- **R-08** Data comes from `src/data/DataFactory`, `test-data/`, or env vars via `config/env.config.ts`. No hard-coded credentials.
- **R-09** No `test.only`. **R-10** Tests are independent: no `describe.serial`, no order dependencies; each test owns its data.
- **R-11** Reuse before create: search `src/` for an existing page/fixture/helper/flow first.
- **R-12** Missing test data or environment info → **stop and flag it**. Never invent SKUs, accounts or expected values.
- **R-13** No Anthropic/AI calls inside `src/` or `tests/`.
- **R-14** `prod` is read-only (`readOnly: true`): only `@prod-safe` tests, no orders, no writes.
- **R-15** Environment and secrets only through `config/env.config.ts`; third-party calls go through `src/integrations` adapters/mocks.
- **R-16** Commit messages: `type(TICKET): summary` (e.g. `test(PROJ-123): back-in-stock PDP`).

## Layout
`config/` env · `src/core` BasePage · `src/components` · `src/pages/{storefront,marketplace}` · `src/flows` · `src/api` (Adobe Commerce REST) · `src/integrations` (payments, email, search, tax, mocks) · `src/data` · `src/fixtures/index.ts` (`test`, `apiTest`, `AuthState`) · `tests/{setup,e2e,integration,api}` · `test-plans/`.

## Commands
`npm run verify` (lint+types+rules) · `npm run test:ticket -- @PROJ-123` · `npm run test:smoke` · `npm run test:regression` · `MOCK_THIRD_PARTY=true npm test` · `cat test-results/ai-triage/failures.md`

## Before you finish any change
1. `npm run verify` is green. 2. Run the affected tests with `--grep @<TICKET>`. 3. Summarise what changed and what a reviewer should check.

## Client specifics (fill in per project)
- Domain terms: …  Environments: …  Extra rules: …
