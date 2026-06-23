# Production Deployment

## Recommended Production Architecture

- Frontend: Vercel or Netlify.
- Backend/auth/database/functions: Supabase.
- Email: Resend.
- DNS: Cloudflare or your domain registrar.
- GitHub Pages: static preview only.

GitHub Pages can host public/static previews, but it cannot securely send private transactional email or run server-side approval automation by itself.

## Supabase Setup

1. Create a Supabase project.
2. Copy the project URL and anon key into the frontend runtime configuration.
3. Keep the service-role key server-side only.
4. Run migrations:

```bash
supabase db push
```

or paste the SQL in `supabase/migrations/` into the Supabase SQL editor in order.

5. Confirm RLS is enabled on all production tables.

## Deploy Edge Functions

Deploy:

```bash
supabase functions deploy submit-application
supabase functions deploy approve-application
supabase functions deploy reject-application
supabase functions deploy request-more-info
supabase functions deploy get-admin-applications
supabase functions deploy get-my-portal-status
supabase functions deploy resend-email-event
```

Set function secrets:

```bash
supabase secrets set SUPABASE_URL=...
supabase secrets set SUPABASE_ANON_KEY=...
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=...
supabase secrets set RESEND_API_KEY=...
supabase secrets set RESEND_FROM_EMAIL=...
supabase secrets set ADMIN_EMAIL=bbalmir@gmail.com
supabase secrets set MAIN_WEBSITE_URL=...
supabase secrets set CUSTOMER_PORTAL_URL=...
supabase secrets set PARTNER_PORTAL_URL=...
supabase secrets set INVESTOR_PORTAL_URL=...
supabase secrets set ADMIN_PORTAL_URL=...
```

## Frontend Runtime Config

Only expose:

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`

Do not expose:

- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY`
- SMTP passwords
- private document keys

If using a static host, create a deployment-only runtime config from:

`shared/config/supabase.config.example.js`

Keep the example empty in source control.

## Portal Deployment

- `main-website/index.html` - public site.

## Official Balponics Footer Links

The main website, customer portal, partner portal, investor portal, and admin dashboard include official Balponics footer links:

- Facebook: https://www.facebook.com/hydroponicsaeroponicsaquaponics/
- Instagram: https://www.instagram.com/balponics/
- Website: https://balponics.com/ (currently under construction / maintenance)
- `customer-portal/index.html` - customer portal.
- `partner-portal/index.html` - partner portal.
- `investor-portal/index.html` - investor portal.
- `admin/index.html` - admin dashboard.

For production, do not upload `partner-portal/preview-only/` as the public locked portal. It is a local/demo review helper.

## First Admin

Create the first admin user manually in Supabase Auth, then insert a `profiles` row with:

- `email = bbalmir@gmail.com`
- `role = admin`
- `status = approved`

Do not create a public endpoint that grants admin privileges.

See:

`docs/FIRST_ADMIN_SETUP.md`

## Admin Login Method

The admin dashboard uses Supabase email/password authentication from `admin/index.html`.

Required browser script order:

1. Supabase JS CDN
2. `../shared/js/supabase-config.js`
3. `../shared/js/supabase-client.js`
4. `../shared/js/auth-guard.js`
5. `../shared/js/email-status.js`
6. `assets/js/admin.js`

The admin page does not use a local password gate and does not expose service-role keys. After `supabase.auth.signInWithPassword` succeeds, `admin/assets/js/admin.js` checks the authenticated user's `public.profiles` row. Access requires:

- `role = admin`
- `status = approved`

The dashboard then reads `public.applications` newest first and updates application status directly through Supabase with RLS. If sign-in succeeds but the dashboard does not open, confirm the admin profile row exists and the RLS policies from `supabase/migrations/` have been applied.

## Auth Consistency

All private portals must follow the same rule:

- public application/login area is visible
- private dashboard requires approved login
- wrong-role, pending, rejected, needs-more-information, and suspended users are blocked

See:

`docs/PORTAL_ACCESS_RULES.md`
