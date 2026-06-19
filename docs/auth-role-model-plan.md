# Authentication And Role Model Plan

## Roles

- `buyer` - authenticated customer/buyer account; owns buyer profile, survey responses, product interests, and sample requests.
- `manager` - operational dashboard user; can review buyers, demand, samples, contact messages, and investor/partner queues.
- `admin` - full operational administrator; can manage team content, roles, notes, investor approvals, and dashboard data.
- `investor` - approved private investor user; can access only approved private investor materials and their own calculator/session records.
- `partner` - future authenticated strategic partner role; public submissions remain open, private partner access can be added later.
- `viewer` - optional read-only internal reviewer.
- `team` - optional content-management role for team/profile updates, if separated from `admin`.

## Auth Flow

1. Keep current localStorage demo mode until Supabase is explicitly enabled.
2. Add Supabase Auth for buyer accounts first.
3. On signup/login, create or update `profiles`, `buyers`, and `buyer_profiles`.
4. Replace local reset-code flow with Supabase password reset emails.
5. Add admin-created manager/admin accounts in Supabase, not public self-registration.
6. Add investor accounts only after prequalification approval and invitation.

## Role Storage

Use `public.profiles.role` as the application role source in Phase 1. Avoid relying only on client-provided role flags. If role claims are later mirrored into JWT app metadata, keep `profiles` as the auditable database source and update claims through a trusted backend function.

## Access Rules

- Public anonymous users may insert contact messages, investor prequalification forms, and partner submissions only.
- Buyers may read/update only records tied to their authenticated `profile_id`.
- Managers/admins may read and manage operational queues.
- Investors may read/write only their own approved investor private records.
- Team/admin content management should require `admin`, `manager`, or a narrow `team` role depending final governance.

## Frontend Fallback

Every Supabase adapter call should degrade to the existing localStorage behavior when:

- Supabase script is not loaded.
- `window.SYMBIOGREENS_SUPABASE_ENABLED !== true`.
- `SUPABASE_URL` or `SUPABASE_ANON_KEY` still contains placeholders.
- The network request fails in static hosting preview.

## Prepared Phase 4 Service Methods

`assets/js/backend-service.js` now exposes inactive auth placeholders:

- `SymbioGreensBackend.auth.signIn(email, password)`
- `SymbioGreensBackend.auth.signOut()`
- `SymbioGreensBackend.auth.registerBuyerAccount(payload)`
- `SymbioGreensBackend.auth.requestPasswordReset(email, redirectTo)`
- `SymbioGreensBackend.getCurrentUser()`

These methods require valid Supabase config plus `AUTH_ENABLED: true`. Current demo login remains the active fallback.
