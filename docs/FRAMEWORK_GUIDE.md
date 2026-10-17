# Framework guide

## Layers
- **Config**: `config/env.config.ts` loads `config/environments/<TEST_ENV>.json`; secrets via `.env` / CI variables.
- **API**: `src/api` wraps the Adobe Commerce REST API (`/rest/V1`): tokens, guest carts, products, orders. Swap services for other platforms (SFCC, commercetools, Shopify, Mirakl).
- **Fixtures**: `test` (pages injected, auto 3rd-party mocks when `MOCK_THIRD_PARTY=true`) and `apiTest` (services).
- **Pages/components**: locators + actions. Default selectors target the Luma theme; customised themes → subclass or edit the page object only.
- **Flows**: multi-page business flows (`CheckoutFlow`).
- **Integrations**: payment adapters (Stripe/Adyen/Braintree/PayPal, picked by `paymentProvider`), Mailosaur email, search indexing check, tax helper, mocks.
- **Data**: `DataFactory` (unique per test), `TestData` (+ `DataReader` json/csv).
- **Reporting**: HTML, JUnit, and `AiTriageReporter` → `test-results/ai-triage/failures.{json,md}`.

## Projects (playwright.config.ts)
`setup` (auth) → `storefront-chromium` (+ firefox/webkit for `@cross-browser`, mobile for `@mobile`), `marketplace`, `integration`, `api`.

## Known placeholders to replace per client
- Environment URLs in `config/environments/*.json` are `example-store.com`.
- SKUs in `test-data/json/products.json` (and `sold-out-item` slug) must exist in the QA environment.
- Marketplace page objects are generic; adapt to the seller portal (Mirakl, custom, …).
- `test.fixme` multi-seller test and the env-gated seller-fulfilment / email tests need seed data.
- Excel data reader is stubbed (install `xlsx` if required).
- MCP URLs in `.mcp.json` are the vendors' hosted endpoints; confirm them against your org's current setup.
