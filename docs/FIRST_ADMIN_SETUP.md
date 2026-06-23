# First Admin Setup

Admin email:

`bbalmir@gmail.com`

The first admin must be created manually. Do not create a public endpoint or public page that grants admin access.

## Steps

1. Create a Supabase Auth user manually for:

   `bbalmir@gmail.com`

2. Confirm the email if your Supabase Auth settings require confirmation.

3. Run the project migrations in `supabase/migrations/`.

4. Open the Supabase SQL Editor and run this SQL.

```sql
insert into public.profiles (
  auth_user_id,
  email,
  full_name,
  role,
  status,
  approved_at,
  metadata
)
select
  id,
  email,
  'Bernard Balmir',
  'admin',
  'approved',
  now(),
  jsonb_build_object('created_by', 'manual_first_admin_setup')
from auth.users
where email = 'bbalmir@gmail.com'
on conflict (auth_user_id)
do update set
  role = 'admin',
  status = 'approved',
  full_name = 'Bernard Balmir',
  approved_at = now(),
  updated_at = now(),
  metadata = public.profiles.metadata || jsonb_build_object('updated_by', 'manual_first_admin_setup');
```

This SQL matches the production schema because `profiles.auth_user_id` is unique.

## Verification Query

```sql
select
  p.id,
  p.auth_user_id,
  p.email,
  p.full_name,
  p.role,
  p.status,
  p.approved_at
from public.profiles p
where p.email = 'bbalmir@gmail.com';
```

Expected:

- `role = admin`
- `status = approved`
- `approved_at` is not empty

After this, log in through:

`admin/index.html`
