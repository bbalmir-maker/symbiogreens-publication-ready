# Investor Q&A And Comments Workflow

## Current Demo Behavior

Questions, comments, Q&A ratings, and objection ratings are saved to localStorage through `assets/js/backend-service.js`.

## Future Backend Behavior

Investors should be able to:

- Save questions tied to their investor account.
- Rate the usefulness of answers.
- Flag objections for follow-up.
- Request a call.
- Request document access.

Admins should be able to:

- View investor questions.
- Mark follow-up status.
- Add internal notes.
- Identify repeated objections.
- Export discussion history for diligence follow-up.

All records must be investor-scoped and protected by RLS.
