# Partner Demo Mode And Security

The static preview uses:

```js
localStorage.setItem("symbioPartnerPortalDemo", "true");
```

This unlocks demo tools with mock/local data only.

Not allowed in demo/public mode:

- Real partner data
- Private contracts
- Private documents
- Admin analytics
- Supabase service-role keys
- Unapproved partner records

Production requires Supabase Auth, role/status checks, invitation handling, and RLS.
