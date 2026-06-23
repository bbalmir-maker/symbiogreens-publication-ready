-- Allow public account/access applications while keeping records private.
-- Public visitors may only insert pending applications. They cannot select the table.

drop policy if exists "applications public insert pending" on public.applications;

create policy "applications public insert pending"
on public.applications
for insert
to anon, authenticated
with check (
  status = 'pending'
  and portal_type in ('customer', 'partner', 'investor', 'engineer', 'general')
  and nullif(trim(full_name), '') is not null
  and nullif(trim(email), '') is not null
);
