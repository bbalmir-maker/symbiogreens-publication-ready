# Investor Authentication And Approval Workflow

## Intended Flow

1. Visitor submits investor review request on the public SymbioGreens website.
2. Admin reviews the submission.
3. Approved investor record is created or activated.
4. Invitation email is sent with account setup link.
5. Investor authenticates through Supabase Auth.
6. Portal checks approved investor status before rendering private content.
7. All private records are filtered through Row Level Security.

## Roles

- `public`: may request review only.
- `pending_investor`: submitted interest but not approved.
- `approved_investor`: may access private investor portal content assigned to them.
- `investor_admin`: may review submissions, activate access, add notes, and manage document access.

## Current Phase

The app uses only:

```js
localStorage.setItem("symbioInvestorPortalDemo", "true")
```

This is not security. It is a local preview convenience only.
