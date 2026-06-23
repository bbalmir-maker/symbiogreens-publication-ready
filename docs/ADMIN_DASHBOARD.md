# Admin Dashboard

Admin dashboard folder:

`admin/`

Required production files:

- `admin/index.html`
- `admin/assets/css/admin.css`
- `admin/assets/js/admin.js`

Legacy synced copies also remain:

- `admin/styles.css`
- `admin/app.js`

## Access Rules

The admin dashboard requires:

- Supabase Auth session
- `profiles.role = admin`
- `profiles.status = approved`
- frontend runtime config loaded from `shared/js/supabase-config.js`

The dashboard uses Supabase email/password auth, checks the logged-in user's `profiles` row, then reads and updates `public.applications` directly. Row Level Security must allow approved admins to select and update applications.

## Runtime Flow

1. `admin/index.html` loads Supabase JS.
2. It loads `../shared/js/supabase-config.js`.
3. It loads `../shared/js/supabase-client.js`.
4. It loads `../shared/js/auth-guard.js`.
5. `admin/assets/js/admin.js` calls `supabase.auth.signInWithPassword`.
6. After login, it checks `public.profiles` for `role = admin` and `status = approved`.
7. Approved admins can read `public.applications` newest first and update review status.

## Troubleshooting

- If login says Supabase is not configured, confirm `shared/js/supabase-config.js` contains only the public `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
- The admin page also loads `shared/config/supabase.config.example.js` for compatibility with older upload packages. The shared client accepts `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `SUPABASE_URL`, and `SUPABASE_ANON_KEY`.
- Login/config/admin-profile failures are shown directly under the admin login form and logged safely in the browser console.
- If login succeeds but access is denied, run `docs/FIRST_ADMIN_SETUP.md` to create or repair the approved admin profile row.
- If applications do not load, confirm migrations and RLS policies are applied, especially admin read/update policies for `public.applications`.
- Do not use service-role keys in frontend config.

## Admin Can View

- application ID
- portal type
- submission type
- status
- full name
- company name
- email
- phone
- country
- city
- interest type
- message
- created date
- reviewed date
- reviewed by
- review notes
- submitted JSON
- approval events
- email events

## Decisions

Approve:

- updates application to `approved`
- creates/updates profile
- assigns role based on portal/application
- sets profile status to `approved`
- creates customer/partner/investor profile record where needed
- sends approval email
- logs approval and email events

Reject:

- updates application/profile to `rejected`
- sends rejection email
- logs approval and email events

Needs More Information:

- updates application/profile to `needs_more_information`
- sends request email
- logs approval and email events
