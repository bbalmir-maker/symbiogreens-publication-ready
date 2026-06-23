# Investor Demo Mode And Security

Founder demo mode is controlled by:

```js
localStorage.setItem("symbioInvestorPortalDemo", "true")
```

This is not authentication and not production security.

## What Demo Mode Does

- Shows mock/private review interface.
- Uses illustrative data only.
- Saves interactions to localStorage only.
- Displays a visible founder demo banner.

## What Demo Mode Must Not Do

- Load real investor data.
- Load real private documents.
- Use Supabase service-role keys.
- Bypass future authentication.
- Expose admin analytics.
- Expose engagement scoring to public visitors.

## Production Requirement

Before real investor use, implement Supabase Auth, approved investor records, role checks, Row Level Security, document authorization, audit logs, and admin review workflows.
