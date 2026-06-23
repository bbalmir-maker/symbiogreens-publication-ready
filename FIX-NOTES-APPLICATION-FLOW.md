# Fix Notes: Application Submission & Approval Flow

## Problem
Frontend code called the database directly instead of the Supabase Edge Functions,
so no emails were ever sent and approved users never got linked to a real login.

## Fix 1 — `shared/js/application-service.js`
`submitApplication()` now calls `window.SymbioBackend.invoke("submit-application", body)`
instead of `client.from("applications").insert(...)`.
This makes every portal (customer, partner, investor) go through the real
`submit-application` Edge Function, which links `auth_user_id`, inserts the
application, and sends the admin + applicant emails.

No caller changes needed — customer-portal/app.js, partner-portal/app.js, and
investor-portal/app.js all call `SymbioApplicationService.submitApplication(...)`
already; they get the fix automatically.

## Fix 2 — `admin/app.js`
`submitDecision()` now calls one of:
- `approve-application`
- `reject-application`
- `request-more-info`

via `window.SymbioBackend.invoke(functionName, { applicationId, decisionNotes })`
instead of `client.from("applications").update(...)`.
This makes the Approve / Reject / Needs More Info buttons run `applyDecision()`
server-side, which creates/updates the `profiles` row, logs `approval_events`,
and sends the decision email.

## What this does NOT fix (needs live testing against real Supabase project)
- Whether the Edge Functions are actually deployed (`supabase functions deploy`)
- Whether `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_ANON_KEY`, `RESEND_API_KEY` (or
  equivalent) are set in the Supabase project's Edge Function environment
- Whether the admin's own `profiles` row has `role = 'admin'` and `status = 'approved'`
  (required for `requireAdmin()` to pass)
- Actual email delivery/formatting

## Recommended test sequence
1. Submit a test application from the customer portal while logged out.
   Confirm a row appears in `applications` AND both emails arrive.
2. Log into admin, click Approve on that application.
   Confirm `profiles` row is created/updated and the approval email arrives.
3. If the applicant created an account (signed up via Supabase Auth) before
   applying, confirm they can log into customer-portal and see unlocked content
   after approval.

---

# Round 2: Partner / Investor flow + UX fixes

## Fix 1 — Partner & investor portals now send real applications
`partner-portal/app.js`: "Request Partner Meeting", "Request Concept Note",
"Save Partner Inquiry", and the Q&A "Request Follow-Up" button now call a new
`submitPartnerApplication()` helper, which sends a real application through
`SymbioApplicationService.submitApplication` (portalType: "partner") in
addition to the existing local save. Toast message tells the user honestly
whether it reached the team or stayed local-only.

`investor-portal/app.js`: same pattern via new `submitInvestorApplication()`,
wired into "Request a Call" and the "interest" form submit (portalType:
"investor"). Pulls the investor's real name/email from
`window.SymbioPortalAccessState.profile` (populated by `portal-access.js`
after an approved login) — if no approved profile/email is available (e.g.
still in demo mode), it just stays local and says so.

Note: granular calculator saves (rainwater calc, solar score, crop scenario,
etc.) are unchanged and still local-only by design — only the explicit
"talk to a human" actions now reach your admin dashboard. Wiring every
calculator table to Supabase would need new tables/Edge Functions; this was
intentionally out of scope for this pass since it can't be tested live here.

## Fix 2 — Partner portal now uses the real approved partner's info
`partner-portal/app.js`: added `applyApprovedProfile()`, called after
`guardPortal("partner")` succeeds. Previously the portal always used the
hardcoded demo values ("Demo Regional Partner", "partner@example.com") even
for a real logged-in, approved partner — meaning any submitted application
or saved data was tagged with fake contact info. Now it pulls
`full_name`, `company_name`, `email`, `role`, `country`, `city` from the
approved profile and overwrites the demo defaults before unlocking the portal.

## Fix 3 — Customer portal country/city bug
`customer-portal/app.js`: the submit handler was sending `profile.country`
and `profile.city`, but the actual form field is a single combined
`location` input — so both always submitted empty. Now sends
`profile.location` as `city` (no separate country field exists to split it).

## Fix 4 — Customer portal: faster multi-product selection
`customer-portal/app.js` + `styles.css`: added a "Quick-add with default
details" checkbox directly on each product card (no modal), plus a
"Quick-add all shown" button in the product toolbar that adds every
currently-filtered/visible product at once with default interest details.
Buyers can still open "View details" on any product to fine-tune specifics —
quick-add just removes the requirement to open a modal per product for buyers
evaluating a wide catalog.

## Fix 5 — Partner portal: progress indicator
`partner-portal/app.js` + `styles.css`: added a sidebar progress bar
("X% of project profile complete") and a checkmark next to each completed
nav item (Site Assessment, Water & Rainfall, Solar & Energy, Crop Planning,
Revenue Model, Market Validation, Readiness Score), based on whether that
section has any locally saved data yet. Re-renders live right after a save
action on a tracked section. Investor portal already had an engagement
metrics display (events/scenarios/questions/documents counts) in its
Overview section, so no equivalent change was made there.

## What still needs live testing
- Partner/investor "Request Meeting" / "Request a Call" / "Save Inquiry"
  actions: confirm a real row appears in `applications` with
  `portal_type = 'partner'` or `'investor'`, and that the admin notification
  + applicant pending-review emails arrive.
- Confirm `applyApprovedProfile()` actually receives a populated `profile`
  object — this depends on `get-my-portal-status` returning the full profile
  row, which it already does per `supabase/functions/get-my-portal-status/index.ts`.
- Visually check the new quick-add checkboxes and partner sidebar progress
  bar in a real browser — they were built and syntax-checked but not
  visually rendered in this environment.

