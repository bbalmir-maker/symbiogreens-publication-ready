# Backend Phase 4 - Authentication And Role Model

Authentication is prepared but inactive by default.

## Roles

- `buyer` - customer/buyer account for profiles, surveys, product interests, sample requests.
- `admin` - full backend administrator and role/content manager.
- `manager` - operational dashboard user for queues and buyer demand review.
- `investor` - approved private investor user.
- `partner` - strategic partner reviewer or future private partner user.
- `viewer` - read-only internal reviewer if needed.

## Identity Layer

- Supabase Auth is the identity provider.
- `profiles.id` references `auth.users.id`.
- `profiles.role` is the application role source.
- Client-side flags are not security boundaries; RLS must enforce access.

## Feature Flags

All auth behavior stays disabled unless explicitly configured:

- `SUPABASE_ENABLED`
- `AUTH_ENABLED`
- `ADMIN_ENABLED`
- `BUYER_DASHBOARD_ENABLED`
- `INVESTOR_PORTAL_ENABLED`

## Prepared Service Methods

`assets/js/backend-service.js` exposes inactive auth methods:

- `SymbioGreensBackend.auth.signIn(email, password)`
- `SymbioGreensBackend.auth.signOut()`
- `SymbioGreensBackend.auth.registerBuyerAccount(payload)`
- `SymbioGreensBackend.auth.requestPasswordReset(email, redirectTo)`
- `SymbioGreensBackend.getCurrentUser()`

These return local/skipped responses unless valid Supabase config and `AUTH_ENABLED` are true.

## Current Demo Login

The current buyer demo login and manager passphrase flow remain unchanged in `app.js`. Do not remove localStorage fallback until real Auth, RLS, and rollback have been tested.

## Activation Steps

1. Apply schema.
2. Create admin test user.
3. Enable `SUPABASE_ENABLED`.
4. Enable `AUTH_ENABLED` in staging.
5. Test buyer registration using test accounts.
6. Test password reset URLs.
7. Test role-specific policies.
8. Only then wire `app.js` login/register forms to the auth service.

## Security Notes

- Never trust a role submitted by the browser.
- Do not use service-role keys in frontend code.
- Admin role changes should happen through Supabase dashboard or a secure server-side function.
- Keep demo login available for rollback until production auth is approved.
