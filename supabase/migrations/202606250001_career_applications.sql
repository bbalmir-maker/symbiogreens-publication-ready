-- Allow the careers page to reuse the existing applications workflow.
alter table public.applications
  drop constraint if exists applications_portal_type_check;

alter table public.applications
  add constraint applications_portal_type_check
  check (portal_type in ('customer', 'partner', 'investor', 'engineer', 'career', 'general'));

-- Public forms submit through the Edge Function with service-role insertion, but this keeps
-- direct anon inserts aligned with the active static form if needed.
drop policy if exists "Public career application insert" on public.applications;
create policy "Public career application insert"
  on public.applications
  for insert
  to anon
  with check (portal_type = 'career' and status = 'pending');