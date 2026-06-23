# Product Submission Notes

## Current Readiness

The package is now **PRODUCTION BACKEND READY AFTER ENV SETUP**.

The frontend design and folder structure are preserved, while backend implementation files have been added for Supabase and Resend.

## What Is Active In Source

- Main website includes a central `Create Account / Apply for Access` route for customer, partner, investor, and engineer/technical applications.
- Supabase migration drafts for production tables and RLS.
- Edge Functions for application submission, approval, rejection, needs-more-info, admin listing, portal status, and email retry.
- Shared frontend helpers for Supabase browser client, auth, portal access, application submission, and email/status labels.
- Admin dashboard shell for production review.
- Portal entry pages now load shared helpers.

## What Still Requires Configuration

- Supabase project creation.
- Migration execution.
- Edge Function deployment.
- Edge Function secrets.
- Resend API key and verified sender.
- First admin Auth user and approved admin profile.
- Production URLs for each portal.

## Main Website Account Entry

Public visitors can apply from the main website at:

`main-website/index.html#account`

Each application starts as Pending Review. Approval is required before any private dashboard opens.

## Customer Submission

The customer portal keeps local fallback behavior. When Supabase is configured, customer interest submits through `submit-application` as a pending customer application.

## Partner And Investor Portals

Partner and investor portals remain locked by default. They may unlock for:

- Clearly isolated local founder/demo mode using explicit forced preview flags.
- Approved production partner/investor/admin session after Supabase status check.

They should not unlock from stale browser localStorage, public query strings, or public hash routes in production.

## Production Limitations

- GitHub Pages alone is static preview only.
- Real email requires Resend in Edge Functions.
- Real private access requires Supabase Auth and RLS.
- Private document storage is structured but future file upload UI must use Supabase Storage.
