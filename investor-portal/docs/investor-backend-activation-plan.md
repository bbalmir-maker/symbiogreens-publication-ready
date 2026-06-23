# Investor Backend Activation Plan

## Current State

The portal is backend-ready but not connected to Supabase by default. `assets/js/backend-service.js` writes demo interactions to localStorage so the app can be previewed safely.

## Activation Steps

1. Create Supabase project.
2. Apply reviewed schema from `database/investor-portal-schema-draft.sql`.
3. Implement final RLS policies.
4. Enable Supabase Auth email verification and password reset.
5. Add admin-only approval workflow.
6. Replace local adapter internals with Supabase reads/writes.
7. Add invitation email backend function.
8. Add private Storage buckets and signed URL document access.
9. Deploy the portal with anon key only.

## Never Expose

- Service-role keys.
- Private document bucket paths without authorization.
- Admin-only analytics to investors.
- Investor records to public visitors.

## Runtime Config

Use `assets/js/supabase-config.example.js` only as a placeholder reference. Real runtime config should use `SUPABASE_URL` and `SUPABASE_ANON_KEY` only.
