# Investor Prequalification And Private Access Plan

## Current Flow

- Public investor and strategic partner tracks are rendered by `investorsPanel`.
- `investorInterestForm` and `partnerInterestForm` both submit through `submitInvestor`.
- Submissions are stored in `sg_platform_investor_requests`.
- Private routes (`#investor-access`, `#investor-login`, `#investor-dashboard`, `#investor-model`, `#investor-documents`) are placeholders and do not expose confidential materials.

## Target Tables

- Investor public form: `investor_prequalification`
- Partner public form: `partner_submissions`
- Approved investor account: `investor_users`
- Investor opportunity tracking: `investor_interest`
- Non-binding commitments: `investor_potential_commitments`
- Calculator saves: `investor_calculator_sessions`
- Private document logs: `investor_document_access`
- Internal review notes: `investor_admin_notes`

## Approval Flow

1. Anonymous investor submits prequalification.
2. Manager/admin reviews in admin dashboard.
3. If qualified, admin creates or links a Supabase Auth user.
4. Admin creates `investor_users` row with `access_status = 'approved'`.
5. Investor receives password setup/invite email through Supabase Auth or an Edge Function.
6. Investor private routes check authenticated session plus approved `investor_users` access.
7. Document views/downloads are served from private Supabase Storage or signed URLs and logged in `investor_document_access`.

## Investor Model Data

`assets/js/investor-model-data.js` remains static in Phase 1. Do not publish confidential model details until:

- Investor auth is active.
- Approved access checks are enforced server-side/RLS-side.
- Document and model access is logged.
- Legal review confirms public/private material boundaries.

## Partner Workflow

Partner submissions should remain separate from investor prequalification because the fields and review criteria differ. If a partner later becomes an investor, create linked admin notes rather than merging submissions automatically.

## Prepared Phase 7 Service Methods

`assets/js/backend-service.js` now includes inactive investor helpers:

- `SymbioGreensBackend.investor.getInvestorDashboard(investorUserId)`
- `SymbioGreensBackend.investor.saveInvestorCalculatorSession(payload)`
- `SymbioGreensBackend.investor.saveInvestorPotentialCommitment(payload)`
- `SymbioGreensBackend.investor.logInvestorDocumentAccess(payload)`

These methods require valid Supabase config plus `INVESTOR_PORTAL_ENABLED: true`. The public investor page and private placeholders remain unchanged.
