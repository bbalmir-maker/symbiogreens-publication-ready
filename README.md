# SymbioGreens Publication Ready Package

This folder contains the static SymbioGreens / Balponics public website and market intelligence prototype prepared for upload to static hosting.

## Current Status

- Static HTML, CSS, and JavaScript site.
- Public pages, product catalog, buyer registration/login prototype, customer survey flow, manager dashboard prototype, investor/partnership pages, and legal pages are included.
- Data is stored locally in browser `localStorage` for prototype use.
- No live database, secure authentication, email system, or payment system is connected yet.

## Main Files

- `index.html` - application shell and script loading.
- `styles.css` - approved site styling.
- `app.js` - route rendering, interactions, login prototype, survey flow, modals, dashboards.
- `platform-data.js` - catalog, public content, and reference data.
- `public/` - active website images and brand assets.
- `assets/js/investor-model-data.js` - investor model reference data.
- `assets/js/supabase-config.example.js` - safe Supabase configuration placeholder.
- `docs/` - deployment, backend, Supabase, investor, and team update notes.

## Run Locally

Open `index.html` directly in a browser, or serve the folder with any static file server.

Example:

```bash
npx serve .
```

Then open the local URL shown by the server.

## Publish

Upload the contents of this folder to a static host such as GitHub Pages, Netlify, Vercel static hosting, cPanel, Hostinger, GoDaddy hosting, or similar.

Do not publish test credentials, private Supabase service keys, or internal documents.

## Backend Required Before Production

Before accepting real users, connect:

- Supabase or another database.
- Secure authentication with role checks.
- Server-side password reset and email delivery.
- Protected investor access.
- Secure file/image storage.
- Backups and monitoring.

See the `docs/` folder for the recommended production plan.

## Backend Phase 1 Readiness

This package now includes a backend-readiness working version based on the downloaded live GitHub export.

Added or updated:

- `docs/backend-phase-1-readiness-audit.md`
- `docs/supabase-schema-draft.sql`
- `database/supabase-backend-phase-1-schema.sql`
- `docs/supabase-integration-plan.md`
- `docs/auth-role-model-plan.md`
- `docs/admin-dashboard-implementation-plan.md`
- `docs/buyer-survey-product-interest-plan.md`
- `docs/investor-private-access-plan.md`
- `assets/js/supabase-config.example.js`

What remains static:

- Public website pages, navigation, product catalog, modals, investor page, language logic, buyer demo workflow, manager prototype, and GitHub Pages deployment behavior.

What is Supabase-ready:

- Schema draft for profiles, buyers, buyer profiles, product interest, survey responses, contact messages, investor access, partner submissions, team members, and admin notes.
- RLS guidance for public inserts, authenticated buyers, admin/manager access, investor-only private access, and team/admin content management.
- Safe placeholder config using `SUPABASE_URL` and `SUPABASE_ANON_KEY` only.

Next implementation phase:

- Add a reversible Supabase adapter in `app.js`.
- Keep localStorage fallback until Supabase Auth, RLS, and dashboard queries are tested.
- Do not add real Supabase credentials or service-role keys to committed frontend files.

## Backend Phase 2 Optional Persistence

The site now includes `assets/js/backend-service.js`, an optional Supabase adapter for public persistence. It is loaded by `index.html` but stays inactive unless a separate runtime config provides a valid Supabase URL, public anon key, and `enabled: true`.

Wired when configured:

- Contact form -> `contact_messages`
- Buyer survey submit -> `survey_responses`
- Product interest modal/survey products -> `product_interest`
- Investor prequalification -> `investor_prequalification`
- Strategic partner submission -> `partner_submissions`

Still unchanged:

- Static public website loading.
- Product catalog and modals.
- Demo buyer login and dashboard.
- Manager/admin prototype.
- Language and translation logic.
- GitHub Pages compatibility.

## Backend Phases 3-8 Prepared

The backend architecture is now staged in inactive modules and documentation:

- Phase 3 Supabase activation: `docs/backend-phase-3-supabase-activation.md`
- Phase 4 Auth plan: `docs/backend-phase-4-auth-plan.md`
- Phase 5 Admin dashboard backend plan: `docs/backend-phase-5-admin-dashboard-plan.md`
- Phase 6 Buyer dashboard persistence plan: `docs/backend-phase-6-buyer-dashboard-plan.md`
- Phase 7 Private investor access plan: `docs/backend-phase-7-investor-private-access-plan.md`
- Phase 8 Production activation checklist: `docs/backend-phase-8-production-activation-checklist.md`
- Migration package: `database/migrations/001_backend_foundation.sql`

Prepared but inactive service namespaces:

- `SymbioGreensBackend.auth`
- `SymbioGreensBackend.admin`
- `SymbioGreensBackend.buyer`
- `SymbioGreensBackend.investor`

Activation order:

1. Supabase project created.
2. Schema applied.
3. RLS enabled.
4. Contact form activated.
5. Buyer survey activated.
6. Product interest activated.
7. Admin login activated.
8. Admin dashboard activated.
9. Buyer accounts activated.
10. Investor private access activated.
11. Email notifications activated later if needed.

Everything remains disabled unless valid Supabase config and module feature flags are explicitly set.

## Investor Analysis And Interaction Intelligence

The Investor page now includes a static, backend-ready Investor Analysis module:

- Investment participation calculator
- First-hub economics scenarios
- Platform expansion and multi-hub simulator
- Valuation sensitivity inputs
- Use of funds
- Risk and mitigation panel
- Non-binding investor interest / review request actions

Current investment model:

- Target raise: USD 2,200,000
- Investor equity pool: 30%
- Founder/platform allocation: USD 220,000
- Founder/platform allocation estimate: contribution x 10%
- Estimated equity: contribution / 2,200,000 x 30%, capped at 30%

Investor interaction intelligence is fallback-safe:

- With no backend, events and engagement snapshots are stored locally.
- With Supabase configured later, events can be inserted into `investor_interaction_events` and snapshots into `investor_engagement_scores`.
- Internal scores are not shown to public investors.
- Admin retrieval methods remain inactive/admin-only unless configured.

See:

- `docs/investor-interactive-application-plan.md`
- `docs/investor-calculator-assumptions.md`
- `docs/investor-interaction-intelligence-plan.md`
- `docs/investor-engagement-scoring-model.md`
- `docs/privacy-and-investor-data-notes.md`
