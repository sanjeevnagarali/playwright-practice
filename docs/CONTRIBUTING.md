# Contributing
1. Branch from `develop`: `feature/<TICKET>-<slug>`.
2. Follow `CLAUDE.md` rules. Run `npm run verify` and the ticket's tests (`npm run test:ticket -- @<TICKET>`).
3. Commit as `type(TICKET): summary`. Open a PR to `develop` (squash). ≥1 approval required.
4. Never commit `.env`, `.auth/`, or secrets. Never merge a ticket spec whose plan is not Approved.
