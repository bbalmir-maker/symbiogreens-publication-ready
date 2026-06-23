# Buyer Survey And Product Interest Persistence Plan

## Current Flow

1. Buyer registers with `registerBuyer`.
2. Buyer login/session is stored in `sg_platform_session`.
3. Product modal and survey card state is stored as drafts in `sg_platform_drafts`.
4. `submitSurvey` creates local survey, response, and sample request rows.
5. `saveProductInterest` can insert into Supabase only if a client is manually provided and `SYMBIOGREENS_SUPABASE_ENABLED` is true.

## Target Data Mapping

| Current local object | Supabase table |
| --- | --- |
| Business object from `registerBuyer` | `buyers` |
| Respondent object from `registerBuyer` | `profiles`, `buyers`, `buyer_profiles` |
| Draft interest from `saveDraft` | `product_interest` with `source = 'buyer_survey_draft'` or local fallback |
| Submitted survey header | `survey_responses` |
| Submitted product response | `product_interest` and/or `survey_responses.responses` JSON |
| Sample request | `product_interest.sample_requested = true` plus admin status in metadata or later sample table |

## Persistence Strategy

Phase 2 should keep drafts local until login is stable, then sync:

1. On buyer login, fetch buyer profile and existing product interests.
2. Preserve local drafts if Supabase is unavailable.
3. When Supabase is enabled, save modal interests to `product_interest`.
4. On `submitSurvey`, create one `survey_responses` row and link product interests with `survey_response_id`.
5. Keep product IDs from static `platform-data.js` as stable foreign-reference text values.
6. Do not move catalog data to the database in the first live backend cutover.

## Fallback Rules

- If Supabase insert fails, keep local draft and show the existing success message only if local save succeeded.
- Add non-blocking sync status later; do not interrupt buyer browsing.
- Keep `localStorage` export/admin prototype available until admin queries are fully implemented.

## Prepared Phase 6 Service Methods

`assets/js/backend-service.js` now includes inactive buyer dashboard helpers:

- `SymbioGreensBackend.buyer.saveBuyerProfile(payload)`
- `SymbioGreensBackend.buyer.getBuyerProductInterests(profileId)`
- `SymbioGreensBackend.buyer.getBuyerSurveyHistory(profileId)`

These methods require valid Supabase config plus `BUYER_DASHBOARD_ENABLED: true`. The current demo dashboard remains unchanged.
