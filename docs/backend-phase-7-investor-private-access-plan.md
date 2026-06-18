# Backend Phase 7 - Private Investor Access

Private investor access is prepared but inactive by default. The public investor page remains unchanged.

## Investor Data Scope

- investor prequalification review
- approval workflow
- investor user account
- private investor dashboard
- document access logs
- calculator sessions
- potential commitment tracking
- admin notes

## Prepared Service Methods

`assets/js/backend-service.js` exposes:

- `SymbioGreensBackend.investor.getInvestorDashboard(investorUserId)`
- `SymbioGreensBackend.investor.saveInvestorCalculatorSession(payload)`
- `SymbioGreensBackend.investor.saveInvestorPotentialCommitment(payload)`
- `SymbioGreensBackend.investor.logInvestorDocumentAccess(payload)`

Public investor/partner submission method:

- `SymbioGreensBackend.saveInvestorPrequalification(payload)`

These methods return skipped/local results unless valid Supabase config and `INVESTOR_PORTAL_ENABLED` are true.

## Approval Workflow

1. Public investor submits prequalification.
2. Admin reviews `investor_prequalification`.
3. Admin approves or declines.
4. If approved, admin creates/link Supabase Auth user.
5. Admin creates `investor_users` row.
6. Investor logs in only after approval.
7. Private routes fetch only investor-owned records.
8. Document views/downloads are logged in `investor_document_access`.

## RLS Expectations

- Public users can insert prequalification only.
- Investors can read/write only records linked to their approved `investor_users` row.
- Admin/manager can review and update investor records.
- Confidential documents must use private storage or signed URL flow.

## Activation Steps

1. Apply schema and RLS.
2. Test investor prequalification insert.
3. Test admin approval flow.
4. Enable `AUTH_ENABLED`.
5. Enable `INVESTOR_PORTAL_ENABLED` in staging.
6. Test private route with approved investor.
7. Test rejected/unapproved investor access denial.
8. Test document access logging.

## Non-Negotiables

- Do not publish confidential investor materials in `public/`.
- Do not rely on hash routes alone for protection.
- Do not expose investor documents before approved Auth and RLS are tested.
