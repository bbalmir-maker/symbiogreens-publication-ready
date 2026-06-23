-- SymbioGreen production backend schema
-- Run in Supabase SQL editor or via `supabase db push`.

create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  role text not null,
  status text not null default 'pending',
  company_name text,
  phone text,
  country text,
  city text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  approved_at timestamptz,
  approved_by uuid references auth.users(id),
  last_login_at timestamptz,
  metadata jsonb default '{}'::jsonb,
  constraint profiles_role_check check (role in ('admin', 'customer', 'partner', 'investor', 'engineer')),
  constraint profiles_status_check check (status in ('pending', 'approved', 'rejected', 'needs_more_information', 'suspended'))
);

create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  portal_type text not null,
  submission_type text not null,
  status text not null default 'pending',
  auth_user_id uuid references auth.users(id) on delete set null,
  profile_id uuid references public.profiles(id) on delete set null,
  full_name text not null,
  company_name text,
  email text not null,
  phone text,
  country text,
  city text,
  role_requested text,
  interest_type text,
  message text,
  submitted_data jsonb default '{}'::jsonb,
  review_notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  reviewed_at timestamptz,
  reviewed_by uuid references auth.users(id),
  constraint applications_portal_type_check check (portal_type in ('customer', 'partner', 'investor', 'engineer', 'general')),
  constraint applications_status_check check (status in ('pending', 'approved', 'rejected', 'needs_more_information'))
);

create table if not exists public.customer_profiles (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid unique references public.profiles(id) on delete cascade,
  customer_type text,
  product_interest text[],
  estimated_volume text,
  delivery_location text,
  preferred_products text[],
  order_interest text,
  product_use_case text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.partner_profiles (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid unique references public.profiles(id) on delete cascade,
  partner_type text,
  territory text,
  project_interest text,
  existing_infrastructure text,
  company_website text,
  partnership_model text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.investor_profiles (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid unique references public.profiles(id) on delete cascade,
  investor_type text,
  investment_range text,
  investment_interest text,
  preferred_contact_method text,
  document_access_level text default 'basic',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.approval_events (
  id uuid primary key default gen_random_uuid(),
  application_id uuid references public.applications(id) on delete cascade,
  profile_id uuid references public.profiles(id) on delete set null,
  admin_user_id uuid references auth.users(id) on delete set null,
  old_status text,
  new_status text not null,
  decision_notes text,
  created_at timestamptz default now()
);

create table if not exists public.email_events (
  id uuid primary key default gen_random_uuid(),
  application_id uuid references public.applications(id) on delete set null,
  profile_id uuid references public.profiles(id) on delete set null,
  recipient_email text not null,
  email_type text not null,
  provider text default 'resend',
  provider_message_id text,
  status text not null default 'queued',
  error_message text,
  created_at timestamptz default now(),
  sent_at timestamptz
);

create table if not exists public.portal_access_logs (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete set null,
  auth_user_id uuid references auth.users(id) on delete set null,
  portal_type text,
  access_result text,
  ip_address text,
  user_agent text,
  created_at timestamptz default now()
);

create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete set null,
  application_id uuid references public.applications(id) on delete set null,
  portal_type text,
  file_name text not null,
  file_path text not null,
  file_type text,
  visibility text default 'private',
  created_at timestamptz default now(),
  uploaded_by uuid references auth.users(id) on delete set null
);

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists set_applications_updated_at on public.applications;
create trigger set_applications_updated_at before update on public.applications
for each row execute function public.set_updated_at();

drop trigger if exists set_customer_profiles_updated_at on public.customer_profiles;
create trigger set_customer_profiles_updated_at before update on public.customer_profiles
for each row execute function public.set_updated_at();

drop trigger if exists set_partner_profiles_updated_at on public.partner_profiles;
create trigger set_partner_profiles_updated_at before update on public.partner_profiles
for each row execute function public.set_updated_at();

drop trigger if exists set_investor_profiles_updated_at on public.investor_profiles;
create trigger set_investor_profiles_updated_at before update on public.investor_profiles
for each row execute function public.set_updated_at();

create index if not exists profiles_auth_user_id_idx on public.profiles(auth_user_id);
create index if not exists profiles_role_status_idx on public.profiles(role, status);
create index if not exists applications_status_idx on public.applications(status);
create index if not exists applications_portal_status_idx on public.applications(portal_type, status);
create index if not exists applications_email_idx on public.applications(lower(email));
create index if not exists approval_events_application_idx on public.approval_events(application_id);
create index if not exists email_events_application_idx on public.email_events(application_id);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where auth_user_id = auth.uid()
      and role = 'admin'
      and status = 'approved'
  );
$$;

create or replace function public.prevent_profile_privilege_escalation()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is not null
    and old.auth_user_id = auth.uid()
    and not public.is_admin()
    and (
      new.role is distinct from old.role
      or new.status is distinct from old.status
      or new.approved_at is distinct from old.approved_at
      or new.approved_by is distinct from old.approved_by
    )
  then
    raise exception 'Users cannot change their own role or approval status.';
  end if;
  return new;
end;
$$;

drop trigger if exists prevent_profile_privilege_escalation on public.profiles;
create trigger prevent_profile_privilege_escalation before update on public.profiles
for each row execute function public.prevent_profile_privilege_escalation();

alter table public.profiles enable row level security;
alter table public.applications enable row level security;
alter table public.customer_profiles enable row level security;
alter table public.partner_profiles enable row level security;
alter table public.investor_profiles enable row level security;
alter table public.approval_events enable row level security;
alter table public.email_events enable row level security;
alter table public.portal_access_logs enable row level security;
alter table public.documents enable row level security;
