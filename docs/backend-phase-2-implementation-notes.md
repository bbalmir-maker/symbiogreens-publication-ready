# Backend Phase 2 Implementation Notes

Date: 2026-06-18

Scope: safe optional Supabase frontend integration for public forms, buyer survey submissions, and product interest capture. This is not an authentication cutover and not an admin dashboard implementation.

## What Is Now Wired

New frontend service:

- `assets/js/backend-service.js`
- Exposes `window.SymbioGreensBackend`
- Exposes:
  - `isBackendEnabled()`
  - `saveContactMessage(payload)`
  - `saveBuyerSurvey(payload)`
  - `saveProductInterest(payload)`
  - `saveInvestorPrequalification(payload)`
  - `getCurrentUser()`

Updated app wiring:

- `index.html` loads `assets/js/backend-service.js` before `app.js`.
- `app.js` still writes all current localStorage records first.
- When `SymbioGreensBackend.isBackendEnabled()` is true, the app also attempts Supabase inserts.

Wired flows:

- Public contact form -> `contact_messages`
- Product interest modal -> `product_interest`
- Buyer survey submit category/all -> `survey_responses` plus `product_interest`
- Investor prequalification -> `investor_prequalification`
- Strategic partner submission -> `partner_submissions`

## Static Fallback Behavior

The site still works without Supabase:

- No Supabase config is loaded by default.
- `assets/js/supabase-config.example.js` remains an example only.
- If config is missing, disabled, invalid, or placeholder-based, no Supabase network call is attempted.
- If Supabase is configured but insert fails, the existing localStorage save remains and the user sees a non-technical local-save message.
- Buyer demo login, dashboard, manager dashboard, language logic, catalog, modals, and investor placeholders remain unchanged.

## Runtime Config Pattern

Do not edit `supabase-config.example.js` with real values in committed code. For a real deployment, create a separate runtime config file that is not committed and load it before `backend-service.js`:

```html
<script src="assets/js/supabase-config.js"></script>
<script src="assets/js/backend-service.js"></script>
```

The runtime file should define:

```js
window.SYMBIOGREENS_SUPABASE_CONFIG = {
  SUPABASE_URL: "SUPABASE_URL",
  SUPABASE_ANON_KEY: "SUPABASE_ANON_KEY",
  enabled: true
};
```

Use the real public anon key only after RLS policies are reviewed and tested. Never expose a service-role key in frontend code.

## Supabase Client Loading

`backend-service.js` dynamically loads `@supabase/supabase-js` from jsDelivr only when:

- `enabled` is true.
- URL and anon key are non-placeholder values.
- The URL matches a Supabase project URL shape.
- A `window.supabase` client is not already present.

If a deployment wants to provide the Supabase client script itself, load it before `backend-service.js`.

## Payload Fields

Product interest payloads include:

- `product_id`
- `product_name`
- `category_id`
- `category`
- `interest_level`
- `quantity_estimate`
- `estimated_quantity`
- `delivery_frequency`
- `preferred_delivery_frequency`
- `sample_request`
- `sample_requested`
- `packaging_preference`
- `packaging_preferences`
- `notes`
- `language`
- `source_page`
- `created_at`
- `metadata`

Survey payloads include survey scope, category, response JSON, language, source page, submitted timestamp, and local prototype IDs inside metadata.

## What Still Requires Supabase Configuration

- Applying `docs/supabase-schema-draft.sql` or a reviewed migration equivalent.
- Verifying RLS in a Supabase branch/project.
- Creating a non-committed runtime config file.
- Testing anon public inserts for contact, survey, product interest, investor, and partner tables.
- Adding production email notifications through an Edge Function or external provider.

## What Remains For Backend Phase 3

- Supabase Auth for real buyer accounts.
- Replacement of demo buyer registration/login/password reset.
- Admin/manager login through Supabase Auth.
- Admin dashboard queries and status updates from Supabase.
- Buyer profile sync and authenticated buyer ownership policies.
- Private investor auth, approved access checks, private storage, and document access logs.
- Optional catalog/team content management after public data stability is confirmed.
