# Admin Dashboard Implementation Plan

## Current Prototype

The current manager/admin experience is local-only:

- `managerLoginPanel` creates or validates a local passphrase hash.
- `managerDashboard` renders tabs for overview, users, demand, samples, investors, and exports.
- `managerContent` reads localStorage arrays.
- `usersAdmin` activates/deactivates/reset users locally.
- `exportCsv` and `exportWorkbook` export local browser data.

## Phase 2 Backend Adapter

Add a small data-access layer in `app.js` before replacing UI:

- `backend.isEnabled()`
- `backend.auth.signInBuyer(email, password)`
- `backend.auth.signOut()`
- `backend.buyers.createProfile(payload)`
- `backend.surveys.saveProductInterest(payload)`
- `backend.surveys.submitSurvey(payload)`
- `backend.contact.submit(payload)`
- `backend.investors.submitPrequalification(payload)`
- `backend.partners.submit(payload)`
- `backend.admin.listQueue(kind)`
- `backend.admin.updateStatus(table, id, patch)`
- `backend.admin.createNote(payload)`

Each method should use Supabase only when configured, otherwise call the current localStorage implementation.

## Prepared Phase 5 Service Methods

`assets/js/backend-service.js` now includes inactive admin helpers:

- `SymbioGreensBackend.admin.listAdminQueue(kind, options)`
- `SymbioGreensBackend.admin.updateAdminStatus(table, id, patch)`
- `SymbioGreensBackend.admin.createAdminNote(payload)`

These methods require valid Supabase config plus `ADMIN_ENABLED: true`. The existing manager dashboard remains localStorage-based until explicitly wired in a later phase.

## Admin Views

1. Overview: counts from `buyers`, `survey_responses`, `product_interest`, `contact_messages`, `investor_prequalification`, and `partner_submissions`.
2. Buyers: buyer profile list, account status, preferred language, notes, and survey history.
3. Demand: product interest table with filters for category, interest level, sample requested, buyer, and date.
4. Samples: product interests where `sample_requested = true`, with review status and follow-up notes.
5. Contact: public contact messages and assignment/status.
6. Investors: prequalification queue, investor user approval, document-access status, commitments, calculator sessions.
7. Partners: strategic partner submissions and review status.
8. Team: active/inactive `team_members` records, order, profile type, image path.
9. Notes: `admin_notes` attached to buyer, contact, investor, partner, or product-interest records.

## Implementation Order

1. Replace manager passphrase with Supabase Auth and role checks.
2. Keep tab layout and visual styling.
3. Swap local reads with admin query methods.
4. Add status updates and notes.
5. Keep exports, but generate from Supabase query results.
6. Add empty/error/loading states without changing public pages.

## Security Rules

- Never expose service-role keys.
- Admin write operations must rely on RLS, authenticated sessions, and optionally Edge Functions for privileged operations.
- Do not use client-side role checks as the only protection.
