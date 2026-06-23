# Portal Map

## Public Website

Folder:

`main-website/`

Purpose:

- Public company content.
- Product/company/investor overview.
- Intake links to customer, partner, and investor workflows.
- Central `Create Account / Apply for Access` flow at `#account`.
- Public role selection for Customer / Buyer, Strategic Partner, Investor, and Engineer / Technical applications.

Production private account logic should not be placed directly in the public website.
Applications submitted from the main website must create `applications.status = pending` through the `submit-application` Edge Function when Supabase is configured.

## Customer Portal

Folder:

`customer-portal/`

Portal type:

`customer`

Production access:

- Unauthenticated users can submit interest/application flows.
- Pending users see Pending Review messaging.
- Approved customer users can access customer-specific private features.
- Wrong-role users are blocked by frontend helper and Supabase RLS.

## Partner Portal

Folder:

`partner-portal/`

Portal type:

`partner`

Production access:

- Locked by default.
- Founder demo still works locally.
- Approved partner/admin sessions can unlock production portal access after Supabase status check.
- Wrong-role users are blocked.

## Investor Portal

Folder:

`investor-portal/`

Portal type:

`investor`

Production access:

- Locked by default.
- Founder demo still works locally.
- Approved investor/admin sessions can unlock private review access after Supabase status check.
- Private materials remain controlled and should use authenticated storage before real documents are added.

## Admin Dashboard

Folder:

`admin/`

Portal type:

`admin`

Production access:

- Requires Supabase Auth login.
- Requires `profiles.role = 'admin'`.
- Requires `profiles.status = 'approved'`.
- Can list/filter applications and submit approve/reject/more-info decisions through Edge Functions.
