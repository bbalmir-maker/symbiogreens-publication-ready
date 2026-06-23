# Backend Phase 6 - Buyer Dashboard Persistence

Buyer dashboard persistence is prepared but inactive by default.

## Buyer Data Scope

Future Supabase-backed buyer dashboard records:

- buyer profile
- company/buyer information
- saved product interests
- survey history
- sample requests
- preferred delivery frequency
- packaging preferences
- notes

## Prepared Service Methods

`assets/js/backend-service.js` exposes:

- `SymbioGreensBackend.buyer.saveBuyerProfile(payload)`
- `SymbioGreensBackend.buyer.getBuyerProductInterests(profileId)`
- `SymbioGreensBackend.buyer.getBuyerSurveyHistory(profileId)`

These methods return skipped/local results unless valid Supabase config and `BUYER_DASHBOARD_ENABLED` are true.

## Current Behavior

- Current demo buyer registration/login remains localStorage-based.
- Current dashboard continues using local state.
- Product interest and survey submissions still preserve local fallback.

## Migration Strategy

1. Keep localStorage as fallback.
2. After Auth is enabled, map authenticated user id to `profiles.id`.
3. Create or update `buyers` and `buyer_profiles`.
4. Sync local product-interest drafts only after the buyer confirms.
5. Store submitted survey envelopes in `survey_responses`.
6. Store product-level signals in `product_interest`.
7. Mark locally synced records to avoid duplicates.

## Activation Steps

1. Enable Auth in staging.
2. Enable `BUYER_DASHBOARD_ENABLED`.
3. Test fetching empty dashboard state.
4. Test saving profile updates.
5. Test product interest and survey history reads.
6. Only then replace dashboard localStorage reads.

## Rollback

- Disable `BUYER_DASHBOARD_ENABLED`.
- Keep localStorage dashboard working.
- Preserve Supabase records for later reconciliation.
