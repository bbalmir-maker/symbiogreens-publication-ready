# QA Checklist

## Static Loading

- [ ] `main-website/index.html` loads.
- [ ] Main website `#account` route loads.
- [ ] Header, hero, investor/partner area, and footer expose Create Account / Apply for Access CTAs.
- [ ] `customer-portal/index.html` loads without Supabase configured.
- [ ] `partner-portal/index.html` shows locked access without demo flag.
- [ ] `investor-portal/index.html` shows locked access without demo flag.
- [ ] `admin/index.html` shows admin login/configuration state.

## Backend Setup

- [ ] Supabase migrations run successfully.
- [ ] RLS is enabled on all production tables.
- [ ] First admin profile exists for `bbalmir@gmail.com`.
- [ ] Edge Functions are deployed.
- [ ] Supabase function secrets are configured.
- [ ] Resend sender domain/email is verified.

## Approval Flow

- [ ] Main website customer application creates `applications.status = pending`.
- [ ] Main website partner application creates `applications.status = pending`.
- [ ] Main website investor application creates `applications.status = pending`.
- [ ] Main website engineer application creates `applications.status = pending`.
- [ ] Customer application creates `applications.status = pending`.
- [ ] Partner application creates `applications.status = pending`.
- [ ] Investor application creates `applications.status = pending`.
- [ ] Admin receives new-application email at `bbalmir@gmail.com`.
- [ ] Applicant receives Pending Review email.
- [ ] Admin can approve an application.
- [ ] Admin can reject an application.
- [ ] Admin can request more information.
- [ ] `approval_events` records each status change.
- [ ] `email_events` records each attempted email.

## Access Control

- [ ] Customer unauthenticated visitor sees login/apply area, not a blank blocked page.
- [ ] Partner unauthenticated visitor sees login/apply area, not private dashboard data.
- [ ] Investor unauthenticated visitor sees login/apply area, not private dashboard data.
- [ ] Pending user cannot see private dashboard data.
- [ ] Rejected user sees rejected status.
- [ ] Needs-more-information user sees more-info status.
- [ ] Suspended user sees suspended status.
- [ ] Approved customer cannot access partner/investor portal data.
- [ ] Approved partner cannot access customer/investor portal data.
- [ ] Approved investor cannot access customer/partner portal data.
- [ ] Non-admin cannot access admin dashboard functions.
- [ ] Approved admin can access `admin/index.html`.
- [ ] Partner/investor production pages do not unlock from stale localStorage/query/hash demo values.

## Security

- [ ] No `.env` or `.env.local` committed.
- [ ] No service-role key in frontend code.
- [ ] No Resend key in frontend code.
- [ ] No private API keys committed.
- [ ] Public users cannot read private tables.
- [ ] Wrong-role access is denied by RLS, not only frontend checks.

## Browser Checks

- [ ] No console errors after production config.
- [ ] Portal links still work.
- [ ] Home/logo links still return to public homepage.
- [ ] Mobile layouts remain usable.
