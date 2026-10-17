# Playwright Commerce Framework — with Claude AI

Hybrid (**Page Object Model + Data-Driven**) Playwright + TypeScript framework for **ecommerce (B2C/B2B)** and
**marketplace** applications with **3rd-party integrations**, extended with an **AI-accelerated creation process**:
Claude AI drafts test plans, page objects, specs and failure triage, while QA engineers approve the plan and review
every change. Claude **authors** code; Playwright **executes** it deterministically — no AI in the test runtime path.

> The framework stays the standard; Claude AI makes following it faster.

| Framework layer | Responsibility | Claude AI contribution |
|---|---|---|
| Configuration — `config/`, `playwright.config.ts` | Environments, projects, browsers | Proposes projects/devices to match the SOW |
| Utilities & API — `src/api`, `src/data`, `src/utils` | API clients, data builders, readers | Generates API services and data rows from specs |
| Fixtures — `src/fixtures` | Pages/services injection, auth state | Reuses existing fixtures; drafts new ones only when needed |
| Page objects — `src/pages`, `src/components` | Locators and actions | Builds/updates classes from the live app (Playwright MCP) and Figma |
| Integrations — `src/integrations` | Payment, tax, search, email, mocks | Applies the right adapter/mock for 3rd-party scenarios |
| Test specs — `tests/` | Business-readable scenarios | Writes specs from the **approved** test plan, traced to TC ids |
| Reporting & CI — `src/reporters`, `bitbucket-pipelines.yml` | Reports, traces, sharded runs | Triages failures from the AI digest; drafts the ticket update |

Docs: **[AI integrated process](docs/AI_INTEGRATED_PROCESS.md)** · **[Framework guide](docs/FRAMEWORK_GUIDE.md)** ·
**[Contributing](docs/CONTRIBUTING.md)** · **[CLAUDE.md](CLAUDE.md)** (rules Claude follows every session)

---

## Folder structure (★ = new for the Claude AI process)

```
playwright-commerce-framework/
├── CLAUDE.md                      ★ framework rules R-01…R-16, process, gates, commands — loaded every session
├── .mcp.json                      ★ Playwright MCP, Atlassian (Jira), Linear, Figma
├── .claude/
│   ├── settings.json              ★ permissions (allow/ask/deny) + PostToolUse hook → rule check on every edit
│   └── skills/                    ★ one narrow skill per task
│       ├── test-design/           ★ steps 01–03 story → approved plan        (model: opus)
│       ├── pom-generator/         ★ step 04 page objects from live app/Figma (model: sonnet)
│       ├── spec-author/           ★ steps 05–07 specs, self-check, local run (model: sonnet)
│       ├── failure-triage/        ★ step 08 root cause, fix/defect, comment  (model: opus)
│       └── automate-ticket/       ★ /automate-ticket <ID> — runs all 8 steps with both gates
├── test-plans/                    ★ approved plans by ticket id (shared state for hand-offs)
│   ├── _TEMPLATE.md
│   └── PROJ-123.md                ★ worked example (approved)
├── scripts/
│   ├── ai-check.mjs               ★ executable CLAUDE.md: POM, waits, tags, data, traceability rules
│   ├── ci-ai-triage.sh            ★ optional read-only Claude triage in CI after-script
│   └── claude-hooks/post-edit-check.mjs ★ feeds rule violations back to Claude instantly
├── bitbucket-pipelines.yml        PR: lint+types+ai:check+smoke · develop: 4 shards · manual/nightly/cross-browser/prod
├── playwright.config.ts           projects: setup, storefront x4, marketplace, integration, api (+ AI triage reporter)
├── package.json / tsconfig.json / eslint.config.mjs / .prettierrc / .env.example
├── config/
│   ├── env.config.ts
│   └── environments/              dev.json, qa.json, staging.json, prod.json (readOnly)
├── src/
│   ├── core/                      BasePage, BaseComponent
│   ├── components/                Header (+MiniCart), ProductCard, AddressForm
│   ├── pages/storefront/          Home, Login, Registration, SearchResults, PDP, Cart, Checkout, OrderConfirmation
│   ├── pages/marketplace/         SellerLogin, SellerDashboard, SellerProduct, SellerOrders
│   ├── flows/                     CheckoutFlow
│   ├── api/                       ApiClient + Auth/Cart/Product/Order services
│   ├── integrations/              payments (Stripe/Adyen/Braintree/PayPal), email, search, tax, mocks
│   ├── data/                      DataReader (json/csv/excel), DataFactory, TestData, models
│   ├── fixtures/index.ts          test/expect, AuthState, apiTest
│   ├── reporters/                 ★ AiTriageReporter → test-results/ai-triage/failures*.json|md
│   └── utils/                     tags, ★ traceability (trace()), price, wait, logger
├── test-data/                     json, csv, excel, mocks
├── tests/
│   ├── setup/                     auth.setup.ts
│   ├── e2e/storefront/            search, cart, checkout, registration, ★ PROJ-123-back-in-stock
│   ├── e2e/marketplace/           seller product, multi-seller checkout, fulfilment
│   ├── integration/               payment gateway, 3rd-party resilience, order email
│   └── api/                       cart API
└── docs/                          AI_INTEGRATED_PROCESS.md ★, FRAMEWORK_GUIDE.md, CONTRIBUTING.md
```

---

## Part 1 – Prerequisites

1. **Node.js 20 or 22 LTS**, **Git**, **VS Code** (Playwright Test, ESLint, Prettier extensions).
2. **Bitbucket Cloud** access with SSH key (`ssh-keygen -t ed25519`, add under *Personal settings → SSH keys*) or an Atlassian API token for HTTPS.
3. ★ **Claude Code** — `npm install -g @anthropic-ai/claude-code`, then run `claude` in the repo and sign in with your Claude account (Team/Enterprise seat) or an Anthropic API key. Docs: https://docs.claude.com/en/docs/claude-code/overview
4. ★ Access to **Jira or Linear** and **Figma** for the project (the MCP servers sign in with your own account).

## Part 2 – Create the Bitbucket repository

1. Workspace → **Projects** → open/create e.g. `QA Automation`.
2. **Create → Repository**: name `playwright-commerce-framework`, **Private**, no README, no .gitignore, default branch `main`.
3. Copy the SSH clone URL.

## Part 3 – Local setup

```bash
unzip playwright-commerce-framework.zip && cd playwright-commerce-framework
npm ci
npx playwright install --with-deps
cp .env.example .env                       # TEST_ENV, credentials, PAYMENT_PROVIDER, inbox keys
# edit config/environments/qa.json         # baseUrl, apiUrl, sellerPortalUrl, paymentProvider, features

npm run verify                             # lint + typecheck + framework rules (ai:check)
npx playwright test --list
npm run test:smoke && npm run report
```

## Part 4 – ★ Connect Claude AI (one time per engineer)

```bash
claude                                     # start Claude Code in the repo root
```
Inside Claude Code:
1. **Trust the project** when prompted — this enables `CLAUDE.md`, `.claude/settings.json` (permissions + hook) and the project MCP servers from `.mcp.json`.
2. Run `/mcp` → authenticate **atlassian** (or **linear**) and **figma** with your own account. **playwright** starts locally via `npx`.
3. Check the skills are listed (`/` then type `test-`, `pom-`, `spec-`, `failure-`, `automate-`).
4. Smoke-test the setup on the example ticket:
   ```
   > Run node scripts/ai-check.mjs and summarise the result
   > Explain test-plans/PROJ-123.md and how tests/e2e/storefront/PROJ-123-back-in-stock.spec.ts traces to it
   ```
Personal overrides go in `.claude/settings.local.json` (git-ignored). Don't loosen the shared `deny` rules.

## Part 5 – Push to Bitbucket

```bash
git init -b main
git add .
git commit -m "chore(QA-1): Playwright commerce framework with Claude AI integration"
git remote add origin git@bitbucket.org:<workspace>/playwright-commerce-framework.git
git push -u origin main
git checkout -b develop && git push -u origin develop
```

## Part 6 – Configure the repository in Bitbucket

1. **Branching model** (*Repository settings → Branching model*): development `develop`, production `main`; prefixes `feature/`, `bugfix/`, `hotfix/`, `release/`.
2. **Branch restrictions** for `main` and `develop`: no direct writes, merge via PR only, no deletion, no force push.
3. **Merge checks**: ≥1 approval (2 for `main`), ≥1 successful build and no failed builds, tasks resolved, reset approvals on new commits (some checks need Bitbucket Premium).
4. **Default reviewers**: QA leads. **Merge strategy**: squash into `develop`; merge commit for `release/*` and `hotfix/*` into `main`.
5. **Enable Pipelines** (*Repository settings → Pipelines → Settings*).
6. **Repository variables** (tick **Secured** for secrets):

| Variable | Purpose | Secured |
|---|---|---|
| `TEST_ENV` | default environment | no |
| `CUSTOMER_EMAIL` / `CUSTOMER_PASSWORD` | shopper | yes |
| `B2B_BUYER_EMAIL` / `B2B_BUYER_PASSWORD` | B2B buyer | yes |
| `SELLER_EMAIL` / `SELLER_PASSWORD` | marketplace seller | yes |
| `API_CLIENT_ID` / `API_CLIENT_SECRET` | backend API | yes |
| `PAYMENT_PROVIDER` | stripe / adyen / braintree | no |
| `PAYPAL_SANDBOX_EMAIL` / `PAYPAL_SANDBOX_PASSWORD` | PayPal sandbox | yes |
| `MAILOSAUR_API_KEY` / `MAILOSAUR_SERVER_ID` | test inbox | yes |
| ★ `ANTHROPIC_API_KEY` | **optional** – enables read-only AI triage of failed CI steps | yes |

7. **Schedules**: `develop` → `custom: nightly-regression`, daily.
8. **Reports**: JUnit appears on each step's *Tests* tab; download `playwright-report/` and ★ `test-results/ai-triage/` from *Artifacts*.

## Part 7 – ★ The integrated automation process

Eight steps, three phases, **two human gates** — full detail in [docs/AI_INTEGRATED_PROCESS.md](docs/AI_INTEGRATED_PROCESS.md).

| Phase | Step | Claude AI | QA engineer | Output |
|---|---|---|---|---|
| Design | 01 Story intake | Reads story, ACs, Figma via MCP | Picks ticket, adds context/data | Requirement summary |
| | 02 Test design | Drafts tagged positive/negative/edge cases | Adds domain edge cases | Draft plan |
| | **03 Approve plan** | Revises from feedback | **Approves before any code (Gate 1)** | `test-plans/<ID>.md` approved |
| Build | 04 Page objects | Explores app via Playwright MCP; extends BasePage | Confirms locator strategy | `src/pages/**` |
| | 05 Author specs | Writes traced specs using fixtures & data builders | Checks business readability | `tests/**` |
| | **06 Review & merge** | `npm run verify` + local run, prepares PR | **Reviews and approves PR (Gate 2)** | Merged code |
| Run & maintain | 07 Execute | Runs `--grep @<ID>` before push | CI runs sharded suite | Report, traces, digest |
| | 08 Triage & report | Classifies failures, proposes fixes, drafts comment | Confirms defects, approves fixes | Defect log, ticket update |

Start a ticket in Claude Code:
```
/automate-ticket PROJ-456
```
or step by step: *"Use test-design for PROJ-456"* → approve → *"Use pom-generator for PROJ-456"* → *"Use spec-author for PROJ-456"* → after CI *"Use failure-triage on the downloaded artifacts"*.

## Part 8 – What the pipeline does

| Trigger | Runs |
|---|---|
| Every PR | Lint + types + ★ `ai:check` (CLAUDE.md rules, incl. "plan approved") → `@smoke` on QA with 3rd parties mocked |
| Push to `develop` | Full `@regression` on 4 parallel shards + merged HTML report |
| Push to `main` | `@smoke` on staging |
| `custom: run-tests` | Choose `TEST_ENV`, `TAGS`, `PROJECT`, `MOCK_THIRD_PARTY`, ★ `TICKET` (runs only `@<TICKET>` tests) |
| `custom: nightly-regression` / `cross-browser` / `prod-smoke` | Scheduled / multi-browser / read-only prod |
| ★ Any failed test step | `AiTriageReporter` digest always; Claude triage report (`triage-*.md`) when `ANTHROPIC_API_KEY` is set — read-only, never changes the build result |

Keep `mcr.microsoft.com/playwright:v1.63.0-noble` in sync with `@playwright/test` in `package.json`.

## Part 9 – Onboarding a new client project

1. Clone/fork into the client's Bitbucket project; fill `config/environments/*.json`.
2. Ask developers for `data-testid` on key elements (the `pom-generator` skill lists missing ones per ticket).
3. Adjust locators only inside page objects; subclass pages for heavily customised markup.
4. Pick/add a payment adapter; point `src/api/services/*` at the platform API (SFCC, commercetools, Shopify, Adobe Commerce, Mirakl…).
5. Replace products, scenarios and mocks in `test-data/`.
6. ★ Add client specifics to `CLAUDE.md` (domain terms, environments, extra rules) and extend `test-design/references/commerce-test-heuristics.md` with client risks.
7. ★ Point `.mcp.json` at the client's Jira/Linear and Figma; pilot `/automate-ticket` on one module and measure cycle time.

## Useful commands

| Command | Purpose |
|---|---|
| `npm run verify` | lint + typecheck + framework rules |
| `npm run ai:check` / `ai:check:json` | framework rules only (human / machine output) |
| `npm run test:ticket -- @PROJ-123` | run one ticket's tests |
| `npm run test:smoke` / `test:regression` | by tag |
| `npm run test:storefront` / `test:marketplace` / `test:integration` / `test:api` | by suite |
| `MOCK_THIRD_PARTY=true npm test` | stub tax / shipping / fraud |
| `npm run test:ui` / `test:debug` / `codegen` | interactive tools |
| `cat test-results/ai-triage/failures.md` | failure digest after any run |
