# Public Site Cross-Check Notes

Compared against `symbiogreens-publication-ready-main.zip`.

## Confirmed Alignment

- Public website keeps detailed investor model data disabled in `assets/js/investor-model-data.js`.
- Public investor page is intake/prequalification only.
- Public placeholders do not expose calculators, valuation tools, due diligence materials, private documents, or approved-investor workflows.
- Public investor model reference uses:
  - raise target: `2,200,000`
  - maximum investor equity reference: `30 percent`
  - founder/platform development allocation: `220,000`
  - allocation reference: `10 percent`
- Standalone portal uses the same `2.2M` planning target and `30%` investor equity pool.
- Standalone portal remains locked by default and opens only through local founder demo mode until real authentication is implemented.

## Corrections Made

- Replaced the standalone schema draft's temporary `investor_accounts` naming with the public backend's `investor_users`.
- Mapped portal workflow concepts to the public backend tables:
  - `investor_prequalification`
  - `investor_users`
  - `investor_interest`
  - `investor_potential_commitments`
  - `investor_calculator_sessions`
  - `investor_document_access`
  - `investor_admin_notes`
  - `investor_interaction_events`
  - `investor_engagement_scores`
- Removed stale PDF download references that used the older `$1.145M` model.
- Kept generated mockup PNGs as reference-only assets, not live portal content.

## Still Pending For Production

- Supabase Auth activation.
- Approved investor invitation flow.
- Real `investor_users.access_status = 'approved'` enforcement.
- RLS testing with public, pending investor, approved investor, admin, and revoked/suspended accounts.
- Regenerated investor PDF package using the corrected `$2.2M / $2.0M-$2.5M` model.
