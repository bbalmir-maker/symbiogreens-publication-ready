-- SymbioGreen production RLS policies

drop policy if exists "profiles read own" on public.profiles;
create policy "profiles read own" on public.profiles
for select to authenticated
using (auth_user_id = auth.uid());

drop policy if exists "profiles update own limited" on public.profiles;
create policy "profiles update own limited" on public.profiles
for update to authenticated
using (auth_user_id = auth.uid() and status <> 'suspended')
with check (
  auth_user_id = auth.uid()
  and role = (select role from public.profiles where auth_user_id = auth.uid())
  and status = (select status from public.profiles where auth_user_id = auth.uid())
);

drop policy if exists "profiles admin read all" on public.profiles;
create policy "profiles admin read all" on public.profiles
for select to authenticated
using (public.is_admin());

drop policy if exists "profiles admin update all" on public.profiles;
create policy "profiles admin update all" on public.profiles
for update to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "applications insert own" on public.applications;
create policy "applications insert own" on public.applications
for insert to authenticated
with check (auth_user_id = auth.uid() or auth_user_id is null);

drop policy if exists "applications read own" on public.applications;
create policy "applications read own" on public.applications
for select to authenticated
using (auth_user_id = auth.uid() or profile_id in (select id from public.profiles where auth_user_id = auth.uid()));

drop policy if exists "applications admin read all" on public.applications;
create policy "applications admin read all" on public.applications
for select to authenticated
using (public.is_admin());

drop policy if exists "applications admin update status" on public.applications;
create policy "applications admin update status" on public.applications
for update to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "customer profiles read own approved" on public.customer_profiles;
create policy "customer profiles read own approved" on public.customer_profiles
for select to authenticated
using (
  profile_id in (
    select id from public.profiles
    where auth_user_id = auth.uid()
      and role = 'customer'
      and status = 'approved'
  )
);

drop policy if exists "partner profiles read own approved" on public.partner_profiles;
create policy "partner profiles read own approved" on public.partner_profiles
for select to authenticated
using (
  profile_id in (
    select id from public.profiles
    where auth_user_id = auth.uid()
      and role = 'partner'
      and status = 'approved'
  )
);

drop policy if exists "investor profiles read own approved" on public.investor_profiles;
create policy "investor profiles read own approved" on public.investor_profiles
for select to authenticated
using (
  profile_id in (
    select id from public.profiles
    where auth_user_id = auth.uid()
      and role = 'investor'
      and status = 'approved'
  )
);

drop policy if exists "customer profiles admin all" on public.customer_profiles;
create policy "customer profiles admin all" on public.customer_profiles
for all to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "partner profiles admin all" on public.partner_profiles;
create policy "partner profiles admin all" on public.partner_profiles
for all to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "investor profiles admin all" on public.investor_profiles;
create policy "investor profiles admin all" on public.investor_profiles
for all to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "approval events admin read" on public.approval_events;
create policy "approval events admin read" on public.approval_events
for select to authenticated
using (public.is_admin());

drop policy if exists "approval events own safe read" on public.approval_events;
create policy "approval events own safe read" on public.approval_events
for select to authenticated
using (profile_id in (select id from public.profiles where auth_user_id = auth.uid()));

drop policy if exists "email events admin read" on public.email_events;
create policy "email events admin read" on public.email_events
for select to authenticated
using (public.is_admin());

drop policy if exists "email events own safe read" on public.email_events;
create policy "email events own safe read" on public.email_events
for select to authenticated
using (profile_id in (select id from public.profiles where auth_user_id = auth.uid()));

drop policy if exists "portal access logs admin read" on public.portal_access_logs;
create policy "portal access logs admin read" on public.portal_access_logs
for select to authenticated
using (public.is_admin());

drop policy if exists "documents admin all" on public.documents;
create policy "documents admin all" on public.documents
for all to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "documents own private read" on public.documents;
create policy "documents own private read" on public.documents
for select to authenticated
using (profile_id in (select id from public.profiles where auth_user_id = auth.uid()));
