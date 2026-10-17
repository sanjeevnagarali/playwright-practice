# PROJ-123 — Back-in-stock notification on PDP (worked example)

Status: Approved
Approved by: QA Lead · example
Story: <jira link>   Figma: <figma link>

## Requirement summary
- AC-1: An out-of-stock product page shows a "Notify me when this product is in stock" link instead of Add to Cart.
- AC-2: An in-stock product page shows Add to Cart and no Notify link.

## Test data needed
- products.outOfStock (sku OOS-001, url slug `sold-out-item`) — **confirm it exists in the QA environment**
- products.simple (in stock)

## Cases
| ID | Title | Type | Tags | Steps | Expected |
|---|---|---|---|---|---|
| TC-01 | Out-of-stock PDP offers Notify Me | positive | @smoke @regression | Open out-of-stock PDP | Stock shows out of stock; Notify link visible; Add to Cart hidden |
| TC-02 | In-stock PDP has no Notify Me | negative | @regression | Open in-stock PDP | Notify link hidden; Add to Cart visible |

## Out of scope
- Email delivery of the notification (covered by integration suite later).
