# Master Integrity Audit

Package audited: `C:\Users\bbalm\Downloads\Symbiogreens Complete Latest`

Date: 2026-06-22

## 1. Executive Summary

The complete SymbioGreens system was audited across the main public website, customer portal, investor portal, partner portal, shared backend modules, and admin dashboard. The package is structurally consistent: each audience has a separate module, private portal areas remain gated, the admin dashboard keeps direct Supabase email/password validation, and the public website remains the central entry point for applications.

Three safe fixes were applied:

- Customer portal now loads the frontend-safe Supabase runtime config before the shared Supabase client.
- Partner portal now loads the frontend-safe Supabase runtime config before the shared Supabase client.
- Investor portal now loads the frontend-safe Supabase runtime config before the shared Supabase client.
- Partner preview-only demo now resolves parent-folder assets/scripts correctly when opened from `partner-portal/preview-only`.

No redesign, broad refactor, authentication rewrite, data model replacement, or admin behavior rewrite was performed.

## 2. Main Website Findings

| Severity | Location | Finding | Result |
| --- | --- | --- | --- |
| Low | `main-website/index.html` | Public navigation and footer route users to customer, partner, investor, account, contact, legal, and login paths. | No change needed. |
| Low | `main-website/app.js` | Create Account / Apply for Access supports customer, partner, investor, and engineer roles with pending review behavior. | No change needed. |
| Low | `main-website/app.js` | Investor and partner public forms insert through `SymbioApplicationService.submitApplication` before success handling. | No change needed. |
| Low | `main-website/app.js` | Legal copy includes non-binding, no-guarantee, no-investment-solicitation language. | No change needed. |
| Low | `main-website/index.html` | Footer includes Balponics Facebook, Instagram, and website links with `target="_blank"` and `rel="noopener noreferrer"`. | No change needed. |

Test result: main website JS syntax check passed.

## 3. Customer Portal Findings

| Severity | Location | Finding | Result |
| --- | --- | --- | --- |
| Medium | `customer-portal/index.html` | Portal loaded only `shared/config/supabase.config.example.js`, so backend-enabled deployments could remain in local/static mode even when `shared/js/supabase-config.js` exists. | Fixed by loading `../shared/js/supabase-config.js` before `supabase-client.js`. |
| Low | `customer-portal/app.js` | Product interest, survey, volume, delivery, sample, and profile flows are page-based and preserve localStorage fallback. | No change needed. |
| Low | `customer-portal/app.js` | Required validation exists for buyer type, product interest, organization/contact, email, city/country, and selected products before final submit. | No change needed. |
| Low | `customer-portal/app.js` | Customer submission attempts `SymbioApplicationService.submitApplication` when available and keeps local save behavior. | No change needed. |
| Low | `customer-portal/app.js` | No investor or partner-only dashboard language was found as the primary customer flow. | No change needed. |

Expected data flow: product interest -> buyer type -> volume/frequency -> delivery/contact -> review -> submit -> localStorage and optional Supabase application record.

Test result: customer portal JS syntax checks passed.

## 4. Investor Portal Findings

| Severity | Location | Finding | Result |
| --- | --- | --- | --- |
| Medium | `investor-portal/index.html` | Portal loaded only the example Supabase config before the shared client. Approved-investor backend checks and investor persistence could remain inactive even when public config exists. | Fixed by loading `../shared/js/supabase-config.js` before `supabase-client.js`. |
| Low | `investor-portal/index.html` | Locked state displays approved/private access messaging. Demo mode is explicitly labeled as founder demo and no real investor data is loaded. | No change needed. |
| Low | `investor-portal/index.html` and `investor-model-data.js` | Investor model uses the updated `$2.0M-$2.5M` capitalization range, `$2.2M` planning target, 30% investor pool, and 10% founder/platform allocation examples. | No change needed. |
| Low | `investor-portal/index.html` | Compliance language marks figures as illustrative, non-binding, subject to due diligence, legal review, and final agreements. | No change needed. |
| Low | `investor-portal/index.html` | Private documents are request/logging placeholders, not exposed files. | No change needed. |

Expected information flow: investor access request -> approval/login -> private review -> calculator/documents/questions/interest -> admin review/follow-up.

Test result: investor portal JS syntax checks passed.

## 5. Partner Portal Findings

| Severity | Location | Finding | Result |
| --- | --- | --- | --- |
| Medium | `partner-portal/index.html` | Portal loaded only the example Supabase config before the shared client. Partner backend calls could remain local-only even when public config exists. | Fixed by loading `../shared/js/supabase-config.js` before `supabase-client.js`. |
| High | `partner-portal/preview-only/DEMO-PARTNER-PORTAL.html` | Preview-only demo file lived in a subfolder but referenced parent assets/scripts as if they were local siblings. This could recreate the "file not found" demo issue. | Fixed by adding `<base href="../">`. |
| Medium | `partner-portal/preview-only/START-FOUNDER-DEMO.html` | "Open Locked View" pointed to `preview-only/index.html`, which does not exist in the complete package. | Fixed to `../index.html`. |
| Low | `partner-portal/app.js` | Demo mode, locked index, sidebar page navigation, page-by-page routing, calculators, action center, document locking, and localStorage fallback are preserved. | No change needed. |
| Low | `partner-portal/partner-model-data.js` and `partner-portal/app.js` | Ownership logic matches intended 65%-75% local partner and 25%-35% SymbioGreens/Balponics participation. | No change needed. |
| Low | `partner-portal/app.js` | Form controls use button types and state updates without intentional page reloads. | No change needed. |

Expected information flow: partner interest/access -> site feasibility inputs -> water/rainfall -> solar/energy -> crop/revenue planning -> ownership/financing/readiness -> concept/action center -> admin follow-up.

Test result: partner portal JS syntax checks passed.

## 6. Admin Dashboard Findings

| Severity | Location | Finding | Result |
| --- | --- | --- | --- |
| Low | `admin/index.html` | Admin loads `shared/js/supabase-config.js`, shared Supabase client, auth guard, email status helper, and admin JS in the correct order. | No change needed. |
| Low | `admin/assets/js/admin.js` | Admin login uses Supabase `signInWithPassword` and checks `profiles.role = admin` and `profiles.status = approved`. | Preserved. |
| Low | `admin/assets/js/admin.js` | Dashboard fetches `public.applications` with approval/email event joins and supports status/portal filtering. | Preserved. |
| Low | `admin/assets/js/admin.js` | Approve / needs more information / reject updates write back to `public.applications`. | Preserved. |
| Low | `admin/index.html` | Admin footer includes Balponics official links. | No change needed. |

Test result: admin JS syntax check passed.

## 7. Cross-Portal Navigation Findings

| Severity | Location | Finding | Result |
| --- | --- | --- | --- |
| Low | `main-website/index.html` | Main site links to customer, partner, and investor portal folders using relative sibling paths. | No change needed for packaged folder structure. |
| Low | `customer-portal/app.js` | Customer portal includes "Back to public website" link to the published GitHub Pages site. | No change needed. |
| Low | `partner-portal/index.html` | Locked partner view returns to public site and request discussion path. | No change needed. |
| Low | `investor-portal/index.html` | Locked investor view returns to public site and investor review request path. | No change needed. |
| Medium | `partner-portal/preview-only/*` | Preview-only files needed relative correction because they are intentionally in a subfolder. | Fixed. |

## 8. Authentication / Access Findings

| Severity | Location | Finding | Result |
| --- | --- | --- | --- |
| Low | `shared/js/portal-access.js` | Approved role/status checks are centralized through `get-my-portal-status` when backend is configured. | No change needed. |
| Low | `investor-portal/index.html` | Investor portal content stays hidden until demo flag or approved guard unlocks it. | No change needed. |
| Low | `partner-portal/app.js` | Partner portal content stays hidden unless forced demo or approved guard unlocks it. | No change needed. |
| Low | `admin/assets/js/admin.js` | Admin access remains separate from public application flow. | No change needed. |

Note: real security still depends on Supabase Auth, approved profile rows, RLS policies, and deployed Edge Functions. Demo flags are preview conveniences only.

## 9. Form Validation Findings

| Form | Required Fields / Rules | Destination | Result |
| --- | --- | --- | --- |
| Main contact inquiry | name, email, inquiry/message fields depending on route | localStorage + optional backend mirror | Works/fallback preserved. |
| Main account application | role, full name/name, email, message/interest fields | `public.applications` through `SymbioApplicationService` | Works/fallback preserved. |
| Main investor form | full name, email, message, consent checkbox | `public.applications`; optional investor prequalification mirror | Works/fallback preserved. |
| Main partner form | full name, email, target market, message | `public.applications` | Works/fallback preserved. |
| Customer survey | product interest, buyer type, organization/contact, location | localStorage + optional application/backend service | Works/fallback preserved. |
| Partner tools | feasibility, water, solar, crop, ownership, readiness/action inputs | localStorage/demo backend service | Works/fallback preserved. |
| Investor portal actions | interest, questions, document requests | localStorage/demo backend service; Supabase-ready | Works/fallback preserved. |
| Admin login | email, password | Supabase Auth + profiles check | Preserved. |

## 10. Backend / Supabase Findings

| Severity | Location | Finding | Result |
| --- | --- | --- | --- |
| Medium | Customer / investor / partner portal HTML | Some portals were not loading `shared/js/supabase-config.js`, creating inconsistent backend readiness. | Fixed. |
| Low | `shared/js/supabase-config.js` | Frontend contains only public-safe Supabase URL and publishable/anon key. | No change needed. |
| Low | `shared/js/application-service.js` | Application insert uses `.from("applications").insert(...).select().single()` and returns failure before success behavior. | No change needed. |
| Low | `supabase/migrations/202606210003_public_application_insert_policy.sql` | Public application insert policy is included. | No change needed. |
| Low | Package scan | No `.env`, `.env.local`, ZIP files inside package, or `node_modules` found. | Passed. |
| Low | Secret scan | No pasted Supabase secret key value was found. Service-role and Resend names appear only in docs/server-side Edge Function environment references. | Passed with expected server-side references. |

## 11. Branding / Content Findings

| Severity | Location | Finding | Result |
| --- | --- | --- | --- |
| Low | Global scan | No incorrect brand-name variants found outside audit documentation. | Passed. |
| Low | Global scan | No lorem ipsum found. | Passed. |
| Low | Investor docs | Old `$1.145M` text appears only in notes saying stale references were removed. | No change needed. |
| Low | Main / customer / investor / partner | SymbioGreens, Balponics, and SymbioGreens/Balponics positioning is consistent. | No change needed. |

## 12. Upload-Ready Findings

| Severity | Location | Finding | Result |
| --- | --- | --- | --- |
| Low | Complete package root | Full modules are present: main website, customer portal, investor portal, partner portal, admin, shared, docs, and Supabase assets. | Passed. |
| Low | Package scan | No nested ZIPs, real `.env`, `.env.local`, or `node_modules` found. | Passed. |
| Low | GitHub Pages compatibility | Static HTML/JS/CSS relative paths are mostly package-relative. Preview-only partner path was corrected. | Passed after fix. |
| Low | Supabase functions | Server-only secrets are referenced through `Deno.env.get(...)`, not hardcoded. | Passed. |

## 13. Critical Bugs Fixed

No critical bugs were found during static audit. The highest-impact issue was the partner preview-only path problem, which was fixed because it could break demo opening from the complete package.

## 14. Issues Not Fixed Yet

- Browser click-through QA was not performed in this pass. The audit used file inspection, static reference checks, syntax checks, and security scans.
- Live Supabase insert/read/update behavior still depends on the deployed Supabase project, migrations, RLS policies, Auth users, and approved `profiles` rows.
- Service-role and Resend variables appear in Supabase Edge Function code and deployment docs as environment variable names. This is expected and safe as long as real values are never committed.

## 15. Recommended Next Steps

1. Upload the rebuilt `Symbiogreens Complete Latest` package to the intended test host.
2. Test the main website account application for all four roles: customer, partner, investor, engineer.
3. Confirm rows appear in `public.applications` immediately after successful form submission.
4. Confirm admin login with an approved admin profile.
5. Confirm admin can approve, reject, and request more information.
6. Confirm customer portal submission creates local fallback data and, when configured, backend records.
7. Confirm investor and partner portals remain locked publicly, while approved/demo access works as intended.
8. Rotate any Supabase secret key that was pasted into chat, even though it was not written into this package.
