# Backend Phase 5 - Admin Dashboard Backend Structure

Admin backend methods are prepared but inactive by default. The public UI is not exposed or redesigned in this phase.

## Admin Data Scope

The future admin dashboard should manage:

- `contact_messages`
- `survey_responses`
- `product_interest`
- `investor_prequalification`
- `partner_submissions`
- `admin_notes`
- `team_members`
- product/catalog review workflow
- `investor_document_access`

## Prepared Service Methods

`assets/js/backend-service.js` exposes:

- `SymbioGreensBackend.admin.listAdminQueue(kind, options)`
- `SymbioGreensBackend.admin.updateAdminStatus(table, id, patch)`
- `SymbioGreensBackend.admin.createAdminNote(payload)`

Supported queue kinds:

- `contacts`
- `surveys`
- `productInterest`
- `investors`
- `partners`
- `notes`
- `team`
- `documentAccess`

These methods return skipped/local results unless valid Supabase config and `ADMIN_ENABLED` are true.

## RLS Expectations

- Admin/manager reads and writes must be enforced by RLS policies.
- Public users must not read admin queues.
- Client-side `ADMIN_ENABLED` only controls UI/service activation, not database security.

## Activation Steps

1. Confirm first admin user exists in `profiles`.
2. Enable `SUPABASE_ENABLED`, `AUTH_ENABLED`, and `ADMIN_ENABLED` in staging.
3. Login as admin.
4. Test each queue query.
5. Test status update on non-sensitive sample rows.
6. Test `admin_notes`.
7. Add admin UI wiring only after query security is verified.

## What Remains UI Work

- Replace local manager passphrase with Supabase Auth.
- Swap dashboard localStorage reads for admin service queries.
- Add loading/empty/error states.
- Add role-aware route guard.
- Keep hidden from public navigation unless enabled.
