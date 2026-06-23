# Investor Portal Architecture

The investor portal is a standalone static GitHub Pages application. It is intentionally separated from the public SymbioGreens website so the public site can remain a safe investor-intake and public information channel.

## Current Phase

- Static presentation-based investor portal.
- Access-required default screen.
- Founder demo mode gated by localStorage.
- Local-only backend adapter.
- No Supabase activation.
- No real investor data.
- No external private data room files.
- Public website remains intake-only; private model details live only in this standalone portal.

## Runtime Layers

1. `index.html` contains the gated SymbioGreens Balponics investor presentation front end.
2. The default public view shows only the access-required panel.
3. Founder demo mode unlocks the presentation with `localStorage.setItem("symbioInvestorPortalDemo", "true")`.
4. `assets/js/backend-service.js` exposes backend-ready methods using localStorage in this phase.
5. `database/investor-portal-schema-draft.sql` mirrors the public website backend foundation table names.
6. `app.js`, `styles.css`, and `investor-model-data.js` are retained as legacy/support artifacts and should not override `index.html` as the current active front end.

## Future Backend Layer

The current backend service API is designed to be replaced internally by a Supabase implementation without changing most UI calls. Future work should add Supabase Auth, `investor_users.access_status = 'approved'` checks, RLS-protected data access, document access logs, and admin review tools.
