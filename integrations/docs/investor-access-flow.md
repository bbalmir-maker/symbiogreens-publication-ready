# Investor Access Flow

## Recommended Flow

1. Visitor opens Investors & Partnerships.
2. Visitor selects Investor or Strategic Partner.
3. Visitor submits pre-qualification details.
4. Internal team reviews fit and readiness.
5. Approved prospects receive private access.
6. Investor authenticates through Supabase Auth.
7. Investor dashboard shows approved materials only.
8. Document views and model interactions are logged.

## Access Rules

- Public page: overview and inquiry forms.
- Protected investor page: financial model, documents, deck downloads, and non-binding interest forms.
- Manager/admin page: review queue, access status, notes, and approvals.

## Static Mode Warning

Current static mode cannot safely protect investor documents. Use private storage and role-based access before uploading confidential materials.
