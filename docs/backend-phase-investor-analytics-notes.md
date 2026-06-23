# Backend Phase - Investor Analytics Notes

## New Tables

- `investor_interaction_events`
- `investor_engagement_scores`

Existing investor tables remain:

- `investor_prequalification`
- `investor_interest`
- `investor_potential_commitments`
- `investor_calculator_sessions`
- `investor_document_access`
- `investor_admin_notes`

## Backend Service Methods

- `trackInvestorEvent(eventType, payload)`
- `saveInvestorEngagementSnapshot(payload)`
- `saveInvestorInterest(payload)`
- `SymbioGreensBackend.investor.getInvestorCalculatorSessions()`
- `SymbioGreensBackend.investor.getInvestorInterestSubmissions()`
- `SymbioGreensBackend.investor.getInvestorInteractionEvents()`
- `SymbioGreensBackend.investor.getInvestorEngagementScores()`
- `SymbioGreensBackend.investor.getInvestorEngagementBySession(sessionId)`
- `SymbioGreensBackend.investor.updateInvestorAdminNotes()`

Admin retrieval methods require `ADMIN_ENABLED` and should remain admin-only.
