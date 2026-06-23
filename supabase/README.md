# Supabase Backend

## Contents

- `migrations/202606210001_production_backend_schema.sql`
- `migrations/202606210002_production_backend_rls.sql`
- `functions/submit-application`
- `functions/approve-application`
- `functions/reject-application`
- `functions/request-more-info`
- `functions/get-admin-applications`
- `functions/get-my-portal-status`
- `functions/resend-email-event`

## Run Migrations

```bash
supabase db push
```

or paste migrations into the Supabase SQL editor in filename order.

## Deploy Functions

```bash
supabase functions deploy submit-application
supabase functions deploy approve-application
supabase functions deploy reject-application
supabase functions deploy request-more-info
supabase functions deploy get-admin-applications
supabase functions deploy get-my-portal-status
supabase functions deploy resend-email-event
```

## Required Secrets

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `ADMIN_EMAIL`
- `MAIN_WEBSITE_URL`
- `CUSTOMER_PORTAL_URL`
- `PARTNER_PORTAL_URL`
- `INVESTOR_PORTAL_URL`
- `ADMIN_PORTAL_URL`
