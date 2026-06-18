# Backend Phase 3 - Supabase Activation Package

This phase prepares Supabase activation without turning it on automatically.

## Current Status

- Static website remains GitHub Pages compatible.
- Supabase is not required for page load.
- `assets/js/supabase-config.example.js` contains placeholders only.
- `assets/js/backend-service.js` is dormant unless valid config and feature flags are enabled.
- Schema draft is available at `docs/supabase-schema-draft.sql`.
- Migration copy is available at `database/migrations/001_backend_foundation.sql`.

## Supabase Project Setup

1. Create a new Supabase project.
2. Save the project URL and public anon key in a private deployment note or hosting secret store.
3. Do not copy the service-role key into the website repo.
4. In Authentication settings, configure the site URL and redirect URLs for the final domain and local test URLs.
5. In API settings, confirm the public anon key is used only after RLS is enabled and tested.

## Apply Schema

Recommended first pass:

1. Open Supabase SQL editor in a non-production project.
2. Paste and run `database/migrations/001_backend_foundation.sql`.
3. Confirm all required tables exist:
   - `profiles`
   - `buyers`
   - `buyer_profiles`
   - `product_interest`
   - `survey_responses`
   - `contact_messages`
   - `investor_prequalification`
   - `investor_users`
   - `investor_interest`
   - `investor_potential_commitments`
   - `investor_calculator_sessions`
   - `investor_document_access`
   - `investor_admin_notes`
   - `partner_submissions`
   - `team_members`
   - `admin_notes`
4. Confirm RLS is enabled for all application tables.
5. Confirm helper functions exist:
   - `public.current_user_role()`
   - `public.is_admin_or_manager()`
   - `public.is_investor()`

## First Admin User

1. Create an admin user in Supabase Auth manually.
2. Insert a matching `profiles` row:

```sql
insert into public.profiles (id, role, email, full_name, status)
values ('AUTH_USER_UUID', 'admin', 'admin@example.com', 'Admin User', 'active');
```

3. Replace `AUTH_USER_UUID` with the Supabase Auth user id.
4. Use a test admin account first. Do not use shared passwords.

## Allowed Domains And Redirect URLs

Configure these in Supabase Auth before enabling auth features:

- Production GitHub Pages/custom domain.
- Local preview domain if used.
- Any staging host.
- Password reset redirect URL.
- Email confirmation redirect URL.

Do not allow broad wildcard redirects unless there is a reviewed deployment reason.

## Runtime Config For Later Activation

Keep `assets/js/supabase-config.example.js` unchanged. For activation, create an untracked runtime config such as `assets/js/supabase-config.js`:

```js
window.SYMBIOGREENS_SUPABASE_CONFIG = {
  SUPABASE_URL: "SUPABASE_URL",
  SUPABASE_ANON_KEY: "SUPABASE_ANON_KEY",
  enabled: true,
  features: {
    SUPABASE_ENABLED: true,
    CONTACT_FORM_ENABLED: true,
    BUYER_SURVEY_ENABLED: false,
    PRODUCT_INTEREST_ENABLED: false,
    AUTH_ENABLED: false,
    ADMIN_ENABLED: false,
    BUYER_DASHBOARD_ENABLED: false,
    INVESTOR_PORTAL_ENABLED: false
  }
};
```

Then load it before `backend-service.js` in the deployed HTML only after review:

```html
<script src="assets/js/supabase-config.js"></script>
<script src="assets/js/backend-service.js"></script>
```

## Activation Checklist

- Schema applied in test Supabase project.
- RLS enabled.
- Public insert policies tested.
- Admin user created.
- Auth redirect URLs configured.
- No service-role key in frontend files.
- Runtime config stored outside the committed repo.
- Start with `CONTACT_FORM_ENABLED` only.
- Enable later modules one at a time after testing.

## Rollback

- Set all feature flags to `false`.
- Remove runtime config script from deployed HTML.
- Keep static/localStorage fallback active.
- Do not delete data until exports/backups are complete.
