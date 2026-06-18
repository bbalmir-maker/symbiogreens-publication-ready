# Supabase Migrations

These SQL files are prepared for review and staged activation. They are not executed by the static website.

## Files

- `001_backend_foundation.sql` - current backend foundation schema, indexes, draft RLS policies, role helper functions, and update triggers.

## Apply Order

1. Create a Supabase project.
2. Open the SQL editor or Supabase CLI migration flow.
3. Apply `001_backend_foundation.sql` in a non-production project first.
4. Confirm all tables are created.
5. Confirm Row Level Security is enabled.
6. Test anon inserts for public forms.
7. Test authenticated buyer/admin/investor policies with test users.

Do not paste service-role keys into frontend files.
