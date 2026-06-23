# Investor Private Portal Plan

## Portal Areas

- Welcome and thesis.
- First hub validation pathway.
- Expansion story.
- Contribution calculator.
- Scenario and sensitivity review.
- Platform operating model.
- Use of funds.
- Risk matrix.
- Investor Q&A.
- Objection center.
- Action center.
- Document request placeholders.
- Saved scenarios.
- Comments, questions, and interest selection.
- Backend-ready localStorage demo actions embedded into the presentation shell.

## Backend-Ready Methods

- `getCurrentInvestor`
- `requireApprovedInvestor`
- `saveInvestorScenario`
- `saveInvestorQuestion`
- `saveInvestorQuestionRating`
- `saveInvestorObjection`
- `saveInvestorObjectionRating`
- `saveInvestorComment`
- `saveInvestorInterestSelection`
- `requestInvestorCall`
- `requestInvestorDocument`
- `trackInvestorPortalEvent`
- `logoutInvestor`

## Next Implementation Phase

Replace localStorage writes inside `assets/js/backend-service.js` with authenticated Supabase inserts and selects. The public website backend foundation uses `investor_users`, `investor_interest`, `investor_potential_commitments`, `investor_calculator_sessions`, `investor_document_access`, `investor_admin_notes`, `investor_interaction_events`, and `investor_engagement_scores`; the standalone portal should map to those table names first. Keep graceful fallback for local founder preview.
