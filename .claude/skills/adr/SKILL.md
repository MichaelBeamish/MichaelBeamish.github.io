---
name: adr
description: Record an architecture decision as a short ADR in docs/decisions/ after it has been discussed with the owner. Use when a significant technical choice is made or changed.
---

# Write an ADR

1. Confirm the decision was actually discussed and agreed with the owner. If not, present options and tradeoffs first and wait.
2. Find the next number in `docs/decisions/` (`NNNN-kebab-title.md`).
3. Write it using this template (keep under ~20 lines):
   ```
   # NNNN — Title
   - **Status:** Proposed | Accepted | Superseded by NNNN
   - **Date:** YYYY-MM-DD
   ## Context
   ## Decision
   ## Consequences   (➕ benefits, ➖ costs, alternatives considered, when to revisit)
   ```
4. If it replaces an earlier ADR, mark the old one `Superseded by NNNN`.
5. Update `CLAUDE.md` or `docs/architecture/overview.md` if the decision changes rules or structure.
