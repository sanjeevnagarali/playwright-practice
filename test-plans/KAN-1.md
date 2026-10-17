# KAN-1 — Test Login Page

Status: Draft            <!-- Draft | Approved (set by the QA engineer only: Gate 1) -->
Approved by: <name> · <date>
Story: https://sanjeevnagarali-123.atlassian.net/browse/KAN-1   Figma: none
App under test: https://practicetestautomation.com/practice-test-login/ (`qa` baseUrl)

## Requirement summary
- AC-1 (story): A user who enters Username `student` and Password `Password123` and clicks Submit is logged in successfully.
- AC-1 success criteria. The story only says "login successfully", so these come from the test cases published on the practice page itself:
  - the URL contains `practicetestautomation.com/logged-in-successfully/`
  - the page shows the text "Congratulations" or "successfully logged in"
  - a **Log out** button is displayed
- AC-2 (proposed, **not in story**, from the practice page): an invalid username shows the error "Your username is invalid!" and the user stays logged out.
- AC-3 (proposed, **not in story**, from the practice page): an invalid password shows the error "Your password is invalid!" and the user stays logged out.

## Test data needed
- Valid credentials `student` / `Password123`. Under R-08 they go in env vars, not code: `PRACTICE_USERNAME` and `PRACTICE_PASSWORD` in `.env` (and in the CI variables) — **CONFIRM** those names and add them (Claude cannot read or write `.env`).
- Invalid username `incorrectUser` and invalid password `incorrectPassword`. These come from the practice page's own test cases and aren't secrets, so they go in `test-data/json/practice-login.json` — **CONFIRM**.

## Cases
| ID | Title | Type | Tags | Steps (business language) | Expected |
|---|---|---|---|---|---|
| TC-01 | Valid user logs in successfully | positive | @smoke @regression | Open the login page; enter the valid username and password; submit | URL contains `/logged-in-successfully/`; "Congratulations" or "successfully logged in" text visible; Log out button visible |
| TC-02 | Invalid username is rejected | negative | @regression | Open the login page; enter `incorrectUser` with the valid password; submit | Error "Your username is invalid!" visible; URL is still the login page |
| TC-03 | Invalid password is rejected | negative | @regression | Open the login page; enter the valid username with `incorrectPassword`; submit | Error "Your password is invalid!" visible; URL is still the login page |
| TC-04 | Logged-in user can log out | positive | @regression | Log in with valid credentials; click Log out | Back on the login page; Username field visible |

## Open questions for the engineer
1. **Scope:** the story only covers TC-01. Do you want TC-02, TC-03 and TC-04 included (proposed from the practice page), or should we stick to TC-01?
2. **Where to run it:** the existing `storefront-chromium` project depends on `tests/setup/auth.setup.ts`, which logs in to the Adobe Commerce storefront and will fail against this site. Proposal: a new `practice` project in `playwright.config.ts` (Desktop Chrome, `testDir: ./tests/e2e/practice`, no `storageState`, no setup dependency). Spec: `tests/e2e/practice/KAN-1-login.spec.ts`.
3. **Reuse (R-11):** the existing `src/pages/storefront/LoginPage.ts` is for the Commerce customer login (Email field, "Sign In" button, different URL), so it can't be reused. Proposal: new `src/pages/practice/PracticeLoginPage.ts` and `LoggedInSuccessfullyPage.ts`, both extending `BasePage`.

## Out of scope / assumptions
- Empty-field validation, lockout, password masking, remember-me and accessibility checks: neither the story nor the practice page defines expected behaviour for these.
- The site is a public practice site with no test-id hooks. Locators will use role/label (textbox "Username", textbox "Password", button "Submit", button "Log out"), which the page exposes.
Status: Approved
Approved by: Sanjeev · 2026-10-17
