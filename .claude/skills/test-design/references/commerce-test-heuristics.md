# Commerce test heuristics (extend with client risks)
- Catalog/search: zero results, special characters, pagination, sort, filters, out-of-stock display, indexing delay.
- PDP: configurable options, qty limits (0, negative, > stock), price display, tier prices.
- Cart: add/update/remove, persistence after login, coupon valid/expired/stacking, rounding.
- Checkout: guest vs registered, address validation, shipping methods, tax by region, payment success/decline/3DS, double-submit, session expiry.
- Order: confirmation page, email, order history, cancel/refund.
- Marketplace: seller product create/approve, multi-seller split orders, commission, fulfilment, seller isolation (can't see others' data).
- B2B: company accounts, roles, quotes, requisition lists, credit limits.
- Integrations: payment gateway, tax, shipping, fraud, search, email — success, timeout, 5xx.
- Cross-cutting: mobile viewport, a11y basics (roles/labels), cross-browser smoke, prod read-only safety.
