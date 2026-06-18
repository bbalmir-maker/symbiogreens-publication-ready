-- SymbioGreens / Balponics Supabase schema draft.
-- Review and adapt before production.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'buyer' check (role in ('buyer','manager','admin','investor','partner')),
  full_name text,
  organization text,
  phone text,
  country text,
  city text,
  status text not null default 'active' check (status in ('active','inactive','pending')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.buyer_surveys (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  organization text,
  buyer_type text,
  budget_range text,
  delivery_region text,
  notes text,
  status text not null default 'submitted',
  created_at timestamptz not null default now()
);

create table if not exists public.product_interests (
  id uuid primary key default gen_random_uuid(),
  survey_id uuid references public.buyer_surveys(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  product_id text not null,
  product_name text,
  category text,
  estimated_volume text,
  delivery_frequency text,
  sample_requested boolean not null default false,
  custom_program_requested boolean not null default false,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.investor_inquiries (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  organization text,
  email text not null,
  phone text,
  country text,
  investor_type text,
  area_of_interest text,
  investment_capacity text,
  message text,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

create table if not exists public.partner_inquiries (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  organization text,
  email text not null,
  phone text,
  country text,
  target_market text,
  contribution_summary text,
  message text,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

create table if not exists public.team_members (
  id uuid primary key default gen_random_uuid(),
  display_order integer not null default 100,
  full_name text not null,
  title text not null,
  subtitle text,
  biography text,
  image_path text,
  profile_type text not null default 'executive' check (profile_type in ('executive','operations','advisor')),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.manager_notes (
  id uuid primary key default gen_random_uuid(),
  related_table text not null,
  related_id uuid not null,
  manager_id uuid references auth.users(id) on delete set null,
  note text not null,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.buyer_surveys enable row level security;
alter table public.product_interests enable row level security;
alter table public.investor_inquiries enable row level security;
alter table public.partner_inquiries enable row level security;
alter table public.team_members enable row level security;
alter table public.manager_notes enable row level security;

create policy "profiles read own" on public.profiles for select using (auth.uid() = id);
create policy "profiles update own" on public.profiles for update using (auth.uid() = id);
create policy "team members public read active" on public.team_members for select using (is_active = true);
