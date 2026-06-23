# Supabase Integration Plan

Backend Phase 1 prepares the current static GitHub Pages site for Supabase without converting the public frontend yet.

## Phase 1 - Readiness And Review

Completed in this working version:

1. Audit all static/local/demo workflows that need backend connections.
2. Expand the Supabase schema draft for buyer, survey, contact, investor, partner, team, and admin-note data.
3. Add a safe config example using placeholders only.
4. Document RLS guidance for public inserts, authenticated buyers, admin/manager access, investor-private access, and team/admin content management.
5. Preserve static site behavior when Supabase is not configured.

Primary files:

- `docs/backend-phase-1-readiness-audit.md`
- `docs/supabase-schema-draft.sql`
- `docs/auth-role-model-plan.md`
- `docs/admin-dashboard-implementation-plan.md`
- `docs/buyer-survey-product-interest-plan.md`
- `docs/investor-private-access-plan.md`
- `assets/js/supabase-config.example.js`

## Phase 2 - Safe Frontend Adapter

Implemented as an optional adapter while keeping localStorage fallback:

1. Added `assets/js/backend-service.js`.
2. Added `window.SymbioGreensBackend.isBackendEnabled()`.
3. Wired public contact, product interest, buyer survey, investor prequalification, and partner submission inserts when Supabase is configured.
4. Preserved current UI, routes, navigation, modals, catalog, translations, demo buyer login, and manager dashboard.
5. Kept localStorage writes as the primary fallback.
6. Did not add real credentials or service-role keys.

Current adapter functions:

- `isBackendEnabled()`
- `saveContactMessage(payload)`
- `saveBuyerSurvey(payload)`
- `saveProductInterest(payload)`
- `saveInvestorPrequalification(payload)`
- `getCurrentUser()`

Not implemented yet:

- Supabase Auth.
- Buyer account conversion.
- Admin/manager dashboard conversion.
- Private investor access.
- Production email notifications.

## Phase 3 - Supabase Auth Cutover

1. Enable Supabase Auth with email/password.
2. Create `profiles` row after signup or invitation.
3. Replace local buyer login with Supabase Auth.
4. Move buyer registration into `profiles`, `buyers`, and `buyer_profiles`.
5. Replace local reset codes with Supabase password reset.
6. Keep local fallback disabled only after production testing passes.

See also:

- `backend-phase-3-supabase-activation.md`
- `backend-phase-4-auth-plan.md`
- `backend-phase-8-production-activation-checklist.md`

## Phase 4 - Buyer Demand Persistence

1. Persist product modal interests into `product_interest`.
2. Submit category/all surveys into `survey_responses`.
3. Link submitted product-interest rows to `survey_response_id`.
4. Preserve static catalog IDs as stable product references.
5. Add admin review status for sample requests and high-interest products.

## Phase 5 - Admin Dashboard

1. Replace local manager passphrase with Supabase Auth.
2. Restrict manager/admin routes through RLS-backed role checks.
3. Read dashboard tabs from Supabase:
   - buyers
   - product interest
   - survey responses
   - contact messages
   - investor prequalification
   - partner submissions
   - admin notes
4. Keep export buttons, sourcing export rows from Supabase query results.
5. Add status updates and internal notes.

## Phase 6 - Investor Private Access

1. Store public investor submissions in `investor_prequalification`.
2. Store partner submissions in `partner_submissions`.
3. Add admin approval workflow for `investor_users`.
4. Protect private investor routes with Supabase Auth and approved access checks.
5. Move confidential documents to private Supabase Storage.
6. Log views/downloads in `investor_document_access`.
7. Persist investor calculator sessions and non-binding commitments only for authenticated approved investors.

## Phase 7 - Team/Admin Content Management

1. Keep current static team/executive content for launch stability.
2. Migrate approved team records into `team_members`.
3. Allow active team records to be publicly readable through RLS.
4. Restrict edits to admin/manager/team roles.
5. Keep static image assets unless a storage/CMS workflow is explicitly needed.

## Prepared But Inactive Modules

`assets/js/backend-service.js` includes dormant namespaces for future activation:

- `auth`
- `admin`
- `buyer`
- `investor`

Each namespace checks feature flags and valid Supabase configuration before any backend work. Missing config returns skipped/local results and does not break the public site.

## RLS Summary

- Public anonymous users: insert-only for `contact_messages`, `investor_prequalification`, and `partner_submissions`.
- Buyers: read/write only their own `buyers`, `buyer_profiles`, `survey_responses`, and `product_interest` records.
- Admins/managers: operational read/write access to queues, notes, team content, and review tables.
- Investors: read/write only their own approved private investor records.
- Team/admin content management: public can read active `team_members`; admin/manager/team roles handle writes.

## Static Deployment Guardrails

- Do not add service-role keys to frontend code.
- Do not commit real Supabase URL/anon key unless project policy explicitly allows public anon keys after RLS is tested.
- Do not remove current localStorage behavior until backend cutover is approved.
- Do not move catalog/team/investor public content into the database during Phase 1.
- Keep GitHub Pages compatible: no build step required.
