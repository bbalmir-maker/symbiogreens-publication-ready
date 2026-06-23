# Partner Portal Architecture

The SymbioGreens Partner Portal is a standalone GitHub Pages-ready application for qualified regional partners.

Application layers:

- Public SymbioGreens website: marketing, products, public investor/partner intake only.
- Investor portal: approved investor private review application.
- Partner portal: approved partner project-development application.

The partner portal is gated by default. The full demo renders only when:

```js
localStorage.setItem("symbioPartnerPortalDemo", "true");
```

This is preview convenience only, not production security.

Production architecture should use Supabase Auth, approved partner status, invitation records, and RLS before exposing private partner data or documents.
