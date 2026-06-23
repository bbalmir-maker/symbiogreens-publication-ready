# Deployment Readiness Report

Package audited: `C:\Users\bbalm\Downloads\Symbiogreens Complete Latest`

Date: 2026-06-22

Scope: Supabase + GitHub deployment readiness audit for the unified SymbioGreens/Balponics package.

No frontend code, admin logic, portal behavior, or Supabase files were changed during this audit. This report is the only file added.

## 1. Executive Summary

The package is **not yet ready for a simple GitHub Pages repo-root upload** because the package root does not contain `index.html`. The public website entry point is currently:

`main-website/index.html`

That means a direct upload of the whole folder to a GitHub Pages repository root would not open the main website at the repository homepage unless GitHub Pages is configured to serve a subfolder path or a root landing/redirect file is added later.

Supabase frontend configuration is present and public-safe. The package includes Supabase migrations and Edge Function source code, but local source files do not prove that the database, functions, secrets, Auth redirects, or Resend email are deployed in Supabase.

Final recommendation:

**HOLD - FRONTEND ROOT ENTRYPOINT FIX OR UPLOAD STRATEGY REQUIRED**

Backend status:

**BACKEND DEPLOYMENT STATUS UNKNOWN - VERIFY SUPABASE FUNCTIONS, MIGRATIONS, AND SECRETS**

If the user uploads `main-website/` as the public root and preserves sibling paths another way, the frontend may be previewable, but the current unified package does not match the expected GitHub Pages root structure.

## 2. GitHub Frontend Readiness

### Current package structure

Present at package root:

- `admin/`
- `customer-portal/`
- `docs/`
- `investor-portal/`
- `main-website/`
- `partner-portal/`
- `shared/`
- `supabase/`
- `.env.example`
- `README.md`
- audit/fix notes

Missing at package root:

- `index.html`
- root-level `assets/`
- `README-START-HERE.txt`

### Frontend module entry points

These local entry points exist:

- Main website: `main-website/index.html`
- Customer portal: `customer-portal/index.html`
- Investor portal: `investor-portal/index.html`
- Partner portal: `partner-portal/index.html`
- Admin dashboard: `admin/index.html`

### GitHub Pages readiness result

Status: **HOLD - FRONTEND ROOT ENTRYPOINT FIX REQUIRED**

Reason: GitHub Pages normally serves `index.html` from the configured publishing root. This package root does not contain `index.html`. A live upload strategy must choose one of these:

1. Add a root `index.html` that redirects/links to `main-website/index.html`.
2. Move the main website entry to repo root and adjust relative paths.
3. Configure hosting so `main-website/` is the site entry path.
4. Keep the unified package for versioning but deploy each module intentionally.

No code changes were made in this audit.

## 3. Supabase Config Status

Inspected file:

`shared/js/supabase-config.js`

Status: **READY - real public-safe values present**

The file contains:

- Supabase Project URL: present
- Supabase publishable/anon key: present

The URL points to:

`https://eaoesnwfmhpbfezsyviz.supabase.co`

Security result:

- No Supabase service-role key found in frontend config.
- No database password found in frontend config.
- No JWT secret found in frontend config.
- No Resend API key found in frontend config.

Important: the public anon/publishable key can be in browser code. Service-role and email provider secrets must remain server-side only.

## 4. Edge Functions Found

Supabase Edge Function source exists locally under:

`supabase/functions/`

Found functions:

| Function | Exists locally | Called by frontend | Purpose | Requires secrets | Deployment status |
| --- | --- | --- | --- | --- | --- |
| `submit-application` | Yes | `shared/js/application-service.js` | Creates pending application, sends admin notification, sends applicant pending email | `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_ANON_KEY`, `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, admin/site URL vars | Unknown |
| `get-my-portal-status` | Yes | `shared/js/portal-access.js` | Checks authenticated user's profile/status/portal access | `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_ANON_KEY` | Unknown |
| `approve-application` | Yes | Source exists; active `admin/assets/js/admin.js` does not currently call it | Approves application, creates/updates approved profile, sends approval email | Service-role + Resend secrets | Unknown |
| `reject-application` | Yes | Source exists; active `admin/assets/js/admin.js` does not currently call it | Rejects application and sends rejection email | Service-role + Resend secrets | Unknown |
| `request-more-info` | Yes | Source exists; active `admin/assets/js/admin.js` does not currently call it | Marks needs-more-information and sends applicant email | Service-role + Resend secrets | Unknown |
| `get-admin-applications` | Yes | Source exists; active `admin/assets/js/admin.js` reads `applications` table directly | Admin-only list through service client | Service-role + anon auth check | Unknown |
| `resend-email-event` | Yes | Not directly called by current frontend scan | Retries email based on logged email event | Service-role + Resend secrets | Unknown |

Important deployment note:

The active admin script loaded by `admin/index.html` is:

`admin/assets/js/admin.js`

That script reads and updates `public.applications` directly with the browser Supabase client. It does **not** currently use `approve-application`, `reject-application`, or `request-more-info` for decision buttons. Therefore:

- Admin status updates may work if RLS allows approved admins to update `applications`.
- Approval/rejection/request-more-info emails may **not** send from the current admin UI unless admin is later wired to the Edge Functions or database triggers/functions handle email separately.

This is a deployment-readiness risk, not a code change request.

## 5. Migrations Found

Migration folder:

`supabase/migrations/`

### `202606210001_production_backend_schema.sql`

Purpose:

- Creates base backend schema.
- Creates `public.set_updated_at()` trigger function.
- Creates `profiles`.
- Creates `applications`.
- Creates `customer_profiles`.
- Creates `partner_profiles`.
- Creates `investor_profiles`.
- Creates `approval_events`.
- Creates `email_events`.
- Creates `portal_access_logs`.
- Creates `documents`.
- Adds indexes.
- Creates `public.is_admin()`.
- Creates privilege escalation prevention trigger/function for profiles.
- Enables RLS on the main tables.

Tables affected:

- `profiles`
- `applications`
- `customer_profiles`
- `partner_profiles`
- `investor_profiles`
- `approval_events`
- `email_events`
- `portal_access_logs`
- `documents`

Required for:

- applications
- profiles/users
- customer/investor/partner role separation
- admin review
- approval logs
- email logs
- portal access logs
- private document metadata

### `202606210002_production_backend_rls.sql`

Purpose:

- Adds RLS policies for own-profile reads/limited updates.
- Adds admin read/update policies.
- Adds own/admin application read/update policies.
- Adds approved customer/partner/investor profile read policies.
- Adds admin policies for role profile tables.
- Adds admin and owner-safe read policies for approval/email events.
- Adds admin/document policies.

Required for:

- admin dashboard reads/updates
- private portal access checks
- keeping public users from reading all applications
- approved user portal separation

### `202606210003_public_application_insert_policy.sql`

Purpose:

- Allows public visitors to insert pending applications into `public.applications`.
- Keeps records private by not granting public select.

Required for:

- public customer applications
- public investor applications
- public partner applications
- public engineer applications

Important compatibility note:

The current shared frontend application service calls the `submit-application` Edge Function. If that function is deployed, it can insert through the service role. If the function is missing, application submission fails even though this public insert policy exists, unless the frontend is later changed to direct insert fallback.

## 6. Email Implementation Status

Email implementation exists in:

`supabase/functions/_shared/email.ts`

Provider:

- Resend

Required secrets:

- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`

Submission email behavior in `submit-application`:

- Admin notification goes to `Deno.env.get("ADMIN_EMAIL") || "bbalmir@gmail.com"`.
- Applicant confirmation goes to `application.email`.
- Email events are logged in `public.email_events`.
- If Resend is not configured, the function logs `configuration_missing` into `email_events` and does not send.

Approval email behavior in `_shared/approval.ts`:

- Approval/rejection/more-info functions send email to `updatedApplication.email`.
- The email event is logged.

Current frontend/admin risk:

- `shared/js/application-service.js` calls `submit-application`, so applicant/admin submission emails can work if the function and secrets are deployed.
- Active `admin/assets/js/admin.js` updates application status directly and does not call the decision Edge Functions. That means approval/setup/rejection/more-info emails may not send from the current active admin dashboard unless later wired through Edge Functions or handled elsewhere.

UI false-email note:

- The inspected frontend application service returns an error if Supabase/function invocation fails.
- Email send failures are logged server-side in `email_events`; the frontend may still see application submission success even if email configuration is missing, because the application itself inserted successfully and email failure is logged as an event.

## 7. Secrets Required

Set these in Supabase Edge Function secrets or secure server environment only:

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `ADMIN_EMAIL` or `ADMIN_NOTIFICATION_EMAIL`
- `APP_BASE_URL`
- `MAIN_WEBSITE_URL`
- `CUSTOMER_PORTAL_URL`
- `PARTNER_PORTAL_URL`
- `INVESTOR_PORTAL_URL`
- `ADMIN_PORTAL_URL`

Suggested values should use placeholders during documentation. Do not commit real private values.

## 8. What Is Safe To Commit

Safe to commit:

- Static frontend HTML/CSS/JS.
- Public Supabase URL.
- Public Supabase anon/publishable key.
- `shared/js/supabase-config.js` if it contains only frontend-safe values.
- Supabase migration SQL.
- Supabase Edge Function source.
- `.env.example` with blank placeholders.
- Documentation and templates.
- Public assets/logos/images.

## 9. What Must Never Be Committed

Never commit:

- Supabase service-role key.
- Database password.
- JWT secret.
- SMTP password.
- Resend API key.
- Real `.env`.
- `.env.local`.
- Private investor documents.
- Private contracts.
- Database exports.
- `node_modules`.
- ZIP files inside the upload package.
- Any file containing pasted private secret values.

Audit result:

- No real `.env` or `.env.local` files found.
- No nested ZIP files found.
- No `node_modules` folder found.
- No pasted Supabase secret key value found.
- Placeholder references such as `SUPABASE_SERVICE_ROLE_KEY=...` and `RESEND_API_KEY=...` appear in deployment docs only.

## 10. Backend Deployment Steps

Do not place secrets in GitHub Pages frontend.

Required sequence:

1. Install or access Supabase CLI.

2. Login:

```bash
supabase login
```

3. Link local package to project:

```bash
supabase link --project-ref YOUR_PROJECT_REF
```

4. Confirm migrations:

```bash
supabase migration list
```

5. Dry-run migrations if available:

```bash
supabase db push --dry-run
```

6. Apply migrations:

```bash
supabase db push
```

7. Set Edge Function secrets:

```bash
supabase secrets set SUPABASE_URL=...
supabase secrets set SUPABASE_ANON_KEY=...
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=...
supabase secrets set RESEND_API_KEY=...
supabase secrets set RESEND_FROM_EMAIL=...
supabase secrets set ADMIN_EMAIL=bbalmir@gmail.com
supabase secrets set SITE_URL=https://bbalmir-maker.github.io/REPOSITORY-NAME
supabase secrets set MAIN_WEBSITE_URL=https://bbalmir-maker.github.io/REPOSITORY-NAME
supabase secrets set CUSTOMER_PORTAL_URL=https://bbalmir-maker.github.io/REPOSITORY-NAME/customer-portal/
supabase secrets set PARTNER_PORTAL_URL=https://bbalmir-maker.github.io/REPOSITORY-NAME/partner-portal/
supabase secrets set INVESTOR_PORTAL_URL=https://bbalmir-maker.github.io/REPOSITORY-NAME/investor-portal/
supabase secrets set ADMIN_PORTAL_URL=https://bbalmir-maker.github.io/REPOSITORY-NAME/admin/
```

8. Deploy Edge Functions:

```bash
supabase functions deploy submit-application
supabase functions deploy approve-application
supabase functions deploy reject-application
supabase functions deploy request-more-info
supabase functions deploy get-my-portal-status
supabase functions deploy get-admin-applications
supabase functions deploy resend-email-event
```

Or deploy all functions if using a workflow that supports it:

```bash
supabase functions deploy
```

9. Confirm functions exist in Supabase dashboard.

10. Configure Supabase Auth redirect URLs.

Add the GitHub Pages URLs for:

- main website
- admin dashboard
- customer portal
- partner portal
- investor portal
- password reset redirect targets

11. Test function invocation from the live frontend.

12. Check function logs if submission fails.

## 11. Live QA Test Plan

After upload and backend deployment:

1. Open main GitHub Pages URL.
2. Open browser console.
3. Test main navigation.
4. Open customer portal.
5. Submit customer test application.
6. Confirm response:
   - success
   - backend not configured
   - function missing
   - error details
7. Check Supabase table for new customer record.
8. Check admin dashboard for customer record.
9. Open investor portal.
10. Submit investor test application.
11. Check Supabase table and admin dashboard.
12. Open partner portal.
13. Submit partner test application.
14. Check Supabase table and admin dashboard.
15. Approve one test record from admin.
16. Confirm approval status updates.
17. Confirm account setup email behavior.
18. Confirm applicant email goes to applicant.
19. Confirm admin notification goes to `bbalmir@gmail.com`.
20. Confirm no protected portal content leaks before approval/login.

## 12. Error Diagnosis Plan

If live submission fails, collect:

1. Browser console error.
2. Network tab request URL.
3. HTTP status code.
4. Response body.
5. Function name called.
6. Supabase function logs.
7. Whether migration tables exist.
8. Whether secrets are set.
9. Whether CORS error appears.
10. Whether `shared/js/supabase-config.js` has real URL/key.

Common causes:

- Package root has no `index.html`.
- `shared/js/supabase-config.js` still blank in deployed copy.
- Wrong Supabase project URL.
- Wrong anon key.
- Edge Function not deployed.
- Edge Function deployed under different name.
- Missing function secrets.
- Missing database tables.
- Missing RLS policies.
- Function CORS issue.
- Wrong GitHub Pages redirect URL.
- Email provider not configured.
- Admin dashboard directly updates application status without calling decision functions, so email may not send.

## 13. Current Blockers

### Blocker 1: GitHub Pages root entry point

Severity: high

The package root does not contain `index.html`. A standard GitHub Pages upload expects `index.html` at the publishing root.

Decision needed:

- Add root `index.html`, or
- move main website to root, or
- deploy from `main-website/`, or
- use a hosting strategy that supports the current folder structure.

### Blocker 2: Backend deployment status unknown

Severity: high

Migrations and Edge Function source exist locally, but deployment is not confirmed.

Required:

- Confirm migrations applied.
- Confirm Edge Functions deployed.
- Confirm function secrets set.
- Confirm Auth redirects configured.
- Confirm Resend sender is verified.

### Blocker 3: Admin decision email path mismatch

Severity: medium/high

Decision Edge Functions exist and send emails, but the active admin dashboard script currently updates `applications` directly. Direct updates can change status but do not automatically send approval/rejection/more-info emails unless another backend process handles them.

Required before email-flow testing:

- Either wire admin decisions to the deployed Edge Functions, or
- add database-side email workflow, or
- accept that status updates may work before email workflow is complete.

### Blocker 4: Legacy README paths

Severity: low/medium

Some portal README files contain local Windows paths from older preview/upload packages. These are documentation references, not active frontend runtime paths, but they may confuse GitHub upload instructions.

## 14. Final Recommendation

Current final status:

**HOLD - FRONTEND ROOT ENTRYPOINT FIX OR UPLOAD STRATEGY REQUIRED**

Secondary status:

**BACKEND DEPLOYMENT STATUS UNKNOWN - VERIFY SUPABASE FUNCTIONS, MIGRATIONS, AND SECRETS**

Security status:

**NO SECURITY ISSUE FOUND IN FRONTEND CONFIG**

Supabase config status:

**READY - PUBLIC SUPABASE URL + PUBLIC ANON/PUBLISHABLE KEY PRESENT**

Backend source status:

**READY AS SOURCE CODE - DEPLOYMENT NOT VERIFIED**

The safest next step is to decide the GitHub Pages folder strategy first. After that, deploy Supabase migrations/functions/secrets, then test live application submission and admin approval/email behavior.

## Root Entrypoint Fix

Original issue: the upload package root did not contain `index.html`; the public site entrypoint was nested at `main-website/index.html`, which blocks normal GitHub Pages root deployment.

Action taken: the contents of `main-website/` were copied into the clean upload root only, preserving the original working source package. The clean upload root now contains `index.html`, `app.js`, `styles.css`, `platform-data.js`, `assets/`, `public/`, and the sibling portal/shared/admin folders.

Paths checked and adjusted in root `index.html`:

- `../shared/js/supabase-config.js` -> `shared/js/supabase-config.js`
- `../shared/js/supabase-client.js` -> `shared/js/supabase-client.js`
- `../shared/js/auth-guard.js` -> `shared/js/auth-guard.js`
- `../shared/js/application-service.js` -> `shared/js/application-service.js`
- `../customer-portal/index.html` -> `customer-portal/index.html`
- `../partner-portal/index.html` -> `partner-portal/index.html`
- `../investor-portal/index.html` -> `investor-portal/index.html`

Portal/admin paths were preserved because those folders remain siblings of `shared/` and should continue loading `../shared/...` from their subdirectories.

Local QA result: static path scans and JavaScript syntax checks passed in the clean upload folder. Browser-hosted Supabase/backend behavior still requires live deployment verification.

Clean upload folder created: `C:\Users\bbalm\Downloads\SYMBIOGREENS-GITHUB-CLEAN-UPLOAD`

Clean ZIP created: `C:\Users\bbalm\Downloads\SYMBIOGREENS-GITHUB-CLEAN-UPLOAD.zip`

Final decision: READY FOR FRONTEND UPLOAD ONLY - BACKEND DEPLOYMENT STILL REQUIRES VERIFICATION
