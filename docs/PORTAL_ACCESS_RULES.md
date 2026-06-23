# Portal Access Rules

All private portals use shared logic from:

- `shared/js/supabase-client.js`
- `shared/js/auth-guard.js`
- `shared/js/portal-access.js`

## Public vs Private

Public application/login areas may be visible without login.
The main website is the central public entry point for account creation and applications at `#account`.

Private dashboards, documents, records, and private tools require:

- active Supabase session
- profile row
- approved status
- matching role

## Role Mapping

- `customer-portal` requires `role = customer`
- `partner-portal` requires `role = partner`
- `investor-portal` requires `role = investor`
- `admin` requires `role = admin`

Approved admin users may access admin functions. Admin access must also pass server-side Edge Function checks.

## Status Behavior

No session:

- show login/apply screen
- hide private dashboard

No profile:

- show account setup / pending review message
- hide private dashboard

`pending`:

- show Pending Review
- hide private dashboard

`rejected`:

- show Rejected / Contact Support
- hide private dashboard

`needs_more_information`:

- show Needs More Information
- hide private dashboard

`suspended`:

- show Account Suspended
- hide private dashboard

Wrong role:

- show Wrong Portal / Access Denied
- hide private dashboard

Approved matching role:

- show private dashboard

## Demo / Preview Behavior

Production partner and investor pages no longer unlock from stale query strings, hash values, or ordinary localStorage flags.

Local/developer demo access must be clearly isolated through explicit preview-only files or forced preview flags, such as:

- `window.SYMBIO_FORCE_PARTNER_DEMO = true`
- `window.SYMBIO_PARTNER_PREVIEW_ONLY = true`
- `window.SYMBIO_FORCE_INVESTOR_DEMO = true`
- `window.SYMBIO_INVESTOR_PREVIEW_ONLY = true`

These flags are preview conveniences only. They are not security.
