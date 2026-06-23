# Customer Portal Implementation Notes

## Source Alignment

The portal uses the existing public website product dataset from `data/products.json` and keeps buyer/product survey behavior compatible with the main site's localStorage-first model.

## Pages

- Overview
- Products
- Buyer Type
- Product Interest Survey
- Volume & Frequency
- Delivery / Location
- Samples / Supply Request
- Customer Profile
- Review & Submit
- Product Education / FAQ
- Contact / Next Steps

Each page renders as an app panel rather than one continuous scroll page.

## Local Persistence

Local keys:

- `sg_customer_portal_draft`
- `sg_customer_portal_submissions`
- `sg_customer_portal_product_interest`

## Audit Fixes

- Product cards now use catalog thumbnails first.
- Specialty vegetable products use the closest available catalog thumbnail fallback so no product card starts with a broken image.
- Form "continue" actions now save the current page before moving forward.
- Drafts are normalized on load so older localStorage data does not break arrays or objects.
- Review validation now checks buyer type, product interest, contact method, required name, and email format when email is provided.
- Submitted requests are protected from duplicate click submission and can be followed by a new draft.

## Backend Readiness

The safe backend adapter is `assets/js/backend-service.js`.

It exposes:

- `SymbioGreensCustomerBackend.isBackendEnabled()`
- `SymbioGreensCustomerBackend.saveCustomerInterest(payload)`
- `SymbioGreensCustomerBackend.saveProductInterest(payload)`
- `SymbioGreensCustomerBackend.getCurrentUser()`

If Supabase is not configured, calls safely return disabled fallback results and the portal continues working locally.

## Future Phase

Next recommended phase:

1. Decide whether this portal gets its own Supabase project or shares the main SymbioGreens backend.
2. Add a public anon-only Supabase config file outside this package when ready.
3. Map submissions to `survey_responses`.
4. Map product rows to `product_interest`.
5. Add optional returning buyer accounts only after auth/RLS is reviewed.
6. Build an admin view for customer submissions after data persistence is active.
