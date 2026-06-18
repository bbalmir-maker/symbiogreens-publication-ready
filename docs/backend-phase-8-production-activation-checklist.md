# Backend Phase 8 - Production Activation And QA Checklist

Activate backend modules one at a time. The static site must remain usable if a module is disabled.

## Activation Order

1. Supabase project created.
2. Schema applied.
3. RLS enabled and tested.
4. Contact form activated.
5. Buyer survey activated.
6. Product interest activated.
7. Admin login activated.
8. Admin dashboard activated.
9. Buyer accounts activated.
10. Investor private access activated.
11. Email notifications activated later if needed.

## Module Flags

Enable only the module being tested:

- `SUPABASE_ENABLED`
- `CONTACT_FORM_ENABLED`
- `BUYER_SURVEY_ENABLED`
- `PRODUCT_INTEREST_ENABLED`
- `AUTH_ENABLED`
- `ADMIN_ENABLED`
- `BUYER_DASHBOARD_ENABLED`
- `INVESTOR_PORTAL_ENABLED`

## Rollback Steps

1. Disable the module flag.
2. If needed, set `SUPABASE_ENABLED: false`.
3. Remove runtime config script from deployed HTML.
4. Restore previous static deployment artifact.
5. Keep database records; export before destructive cleanup.

## Testing Checklist

- Static homepage loads.
- Product catalog loads.
- Product modal opens.
- Buyer survey modal opens for demo buyer.
- Contact form submits locally with backend disabled.
- Investor/partner forms submit locally with backend disabled.
- Contact insert works when only `CONTACT_FORM_ENABLED` is true.
- Survey insert works when only buyer survey/product interest flags are true.
- Admin queues are inaccessible to public users.
- Buyer records are owner-restricted.
- Investor private records are owner-restricted.

## Security Checklist

- RLS enabled on every application table.
- Public policies are insert-only where intended.
- Admin policies require `admin` or `manager`.
- Investor policies require approved investor ownership.
- Service-role key is not in frontend code.
- Redirect URLs are exact and reviewed.
- Private documents are not in the public folder.

## No-Secrets Checklist

- No real service-role key committed.
- No real `.env` committed.
- Public anon key appears only in deployment runtime config after RLS testing.
- `assets/js/supabase-config.example.js` remains placeholders only.
- GitHub Pages repo does not contain private investor documents.

## GitHub Pages Checklist

- No build step required.
- Static paths remain relative.
- `index.html` loads without Supabase config.
- Backend service fails closed to local/static behavior.
- Large assets are still referenced from existing public paths.

## Backup And Export Guidance

- Export schema before production changes.
- Enable Supabase backups on the appropriate plan.
- Export public-form and investor queues before policy changes.
- Keep a copy of the last static ZIP deployment.

## Final Live QA

- Desktop and mobile smoke test.
- Contact form.
- Buyer demo login.
- Buyer survey modal.
- Product interest save.
- Investor form.
- Partner form.
- Admin login only after flag enablement.
- Error/rollback test by disabling flags.
