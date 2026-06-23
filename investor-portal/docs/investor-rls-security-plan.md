# Investor RLS Security Plan

## Required Tables

- `investor_users`
- `investor_prequalification`
- `investor_interest`
- `investor_potential_commitments`
- `investor_calculator_sessions`
- `investor_document_access`
- `investor_admin_notes`
- `investor_interaction_events`
- `investor_engagement_scores`

Questions, comments, objections, Q&A ratings, call requests, document requests, and scenario actions should initially map into `investor_interaction_events`, `investor_interest`, `investor_potential_commitments`, `investor_calculator_sessions`, `investor_document_access`, and `investor_admin_notes` so the standalone portal stays congruent with the public website backend foundation.

## RLS Guidance

- Public users may insert prequalification records only.
- Authenticated investors may read only their own approved `investor_users` profile.
- Authenticated investors may insert their own scenarios, comments, questions, ratings, document requests, and call requests through the approved investor tables and interaction/event logs.
- Investors may not read other investors' data.
- Investors may not update approval status.
- Investor admins may read and update investor workflow records.
- Service-role keys must never be exposed in frontend code.

## Private Documents

Documents should be stored in private Supabase Storage buckets. Access should require a signed URL generated only after authentication, approval, and document-level authorization.
