# Backend Phase - Investor Calculator Notes

## Frontend

The investor calculator is rendered by `investorAnalysisPanel()` in `app.js` and uses `window.SYMBIOGREENS_INVESTOR_MODEL`.

## Persistence

When backend flags are disabled:

- calculator works
- investor events are stored in `localStorage`
- non-binding interest is stored in local fallback records

When backend flags are enabled later:

- calculator sessions can be saved to `investor_calculator_sessions`
- non-binding interest can be saved to `investor_interest`
- investor events can be saved to `investor_interaction_events`
- engagement snapshots can be saved to `investor_engagement_scores`

## Feature Flags

Investor backend behavior requires valid Supabase config and `INVESTOR_PORTAL_ENABLED: true`.
