-- One-time account invitations for approved applicants.
-- Tokens are only stored as SHA-256 hashes; the raw token appears only in the approval email link.

create table if not exists public.account_invitations (
  id uuid primary key default gen_random_uuid(),
  application_id uuid references public.applications(id) on delete cascade,
  profile_id uuid references public.profiles(id) on delete cascade,
  email text not null,
  role text not null,
  token_hash text not null unique,
  expires_at timestamptz not null,
  used_at timestamptz,
  created_at timestamptz not null default now(),
  constraint account_invitations_role_check check (role in ('customer', 'partner', 'investor', 'engineer'))
);

create index if not exists account_invitations_email_idx on public.account_invitations (lower(email));
create index if not exists account_invitations_profile_id_idx on public.account_invitations (profile_id);
create index if not exists account_invitations_token_hash_idx on public.account_invitations (token_hash);

alter table public.account_invitations enable row level security;

drop policy if exists "account invitations admin read" on public.account_invitations;
create policy "account invitations admin read" on public.account_invitations
for select to authenticated
using (public.is_admin());
