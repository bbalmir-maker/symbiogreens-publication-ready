-- SymbioGreens standalone investor portal schema compatibility draft.
-- This file mirrors the public website backend foundation table names so the
-- standalone portal can connect to the same Supabase model after approval.
-- Draft only. Review in Supabase before production. Never expose service-role keys.

create table if not exists public.investor_prequalification (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  company text,
  email text not null,
  phone text,
  country_city text,
  website text,
  inquiry_type text not null default 'Investor',
  investor_type text,
  investment_capacity text,
  investment_style text,
  why_interested text,
  review_consent boolean not null default false,
  status text not null default 'new',
  approved_access boolean not null default false,
  source_page text,
  language text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.investor_users (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  prequalification_id uuid references public.investor_prequalification(id) on delete set null,
  access_status text not null default 'pending' check (access_status in ('pending','approved','suspended','revoked')),
  access_level text not null default 'private_review' check (access_level in ('private_review','financial_model','documents','admin_review')),
  nda_completed boolean not null default false,
  approved_by uuid references public.profiles(id) on delete set null,
  approved_at timestamptz,
  invited_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.investor_interest (
  id uuid primary key default gen_random_uuid(),
  investor_user_id uuid references public.investor_users(id) on delete set null,
  prequalification_id uuid references public.investor_prequalification(id) on delete set null,
  opportunity_area text,
  interest_summary text,
  target_region text,
  preferred_structure text,
  status text not null default 'new' check (status in ('new','reviewing','active','closed','archived')),
  language text,
  source_page text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.investor_potential_commitments (
  id uuid primary key default gen_random_uuid(),
  investor_user_id uuid references public.investor_users(id) on delete set null,
  investor_interest_id uuid references public.investor_interest(id) on delete set null,
  amount_min numeric,
  amount_max numeric,
  currency text not null default 'USD',
  commitment_type text,
  non_binding boolean not null default true,
  notes text,
  status text not null default 'draft' check (status in ('draft','submitted','reviewing','withdrawn','archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.investor_calculator_sessions (
  id uuid primary key default gen_random_uuid(),
  investor_user_id uuid references public.investor_users(id) on delete set null,
  scenario_name text,
  inputs jsonb not null default '{}'::jsonb,
  outputs jsonb not null default '{}'::jsonb,
  is_saved boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.investor_document_access (
  id uuid primary key default gen_random_uuid(),
  investor_user_id uuid references public.investor_users(id) on delete set null,
  document_key text not null,
  document_title text,
  access_action text not null check (access_action in ('view','download','request','grant','revoke')),
  ip_address inet,
  user_agent text,
  created_at timestamptz not null default now()
);

create table if not exists public.investor_admin_notes (
  id uuid primary key default gen_random_uuid(),
  investor_user_id uuid references public.investor_users(id) on delete cascade,
  prequalification_id uuid references public.investor_prequalification(id) on delete set null,
  admin_id uuid references public.profiles(id) on delete set null,
  note text not null,
  visibility text not null default 'admin_only' check (visibility in ('admin_only','team')),
  created_at timestamptz not null default now()
);

create table if not exists public.investor_interaction_events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  session_id text not null,
  investor_id uuid references public.investor_users(id) on delete set null,
  investor_email text,
  event_type text not null,
  event_label text,
  event_payload jsonb not null default '{}'::jsonb,
  contribution_amount numeric,
  estimated_equity numeric,
  scenario_name text,
  page_route text,
  source_section text
);

create table if not exists public.investor_engagement_scores (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  session_id text not null,
  investor_id uuid references public.investor_users(id) on delete set null,
  investor_email text,
  total_events integer not null default 0,
  calculator_uses integer not null default 0,
  highest_contribution_tested numeric,
  last_contribution_tested numeric,
  markets_viewed jsonb not null default '[]'::jsonb,
  scenarios_viewed jsonb not null default '[]'::jsonb,
  submitted_interest boolean not null default false,
  document_requests integer not null default 0,
  engagement_score numeric not null default 0
);

-- Optional portal-specific detail tables can be added later if needed, but the
-- current standalone portal should first map questions, comments, objections,
-- ratings, document requests, and call requests into investor_interaction_events
-- plus investor_admin_notes/interest records so it stays congruent with the
-- publication-ready public website backend.

alter table public.investor_prequalification enable row level security;
alter table public.investor_users enable row level security;
alter table public.investor_interest enable row level security;
alter table public.investor_potential_commitments enable row level security;
alter table public.investor_calculator_sessions enable row level security;
alter table public.investor_document_access enable row level security;
alter table public.investor_admin_notes enable row level security;
alter table public.investor_interaction_events enable row level security;
alter table public.investor_engagement_scores enable row level security;

-- RLS direction, matching the public website backend plan:
-- - anon users can insert investor_prequalification only.
-- - approved authenticated investors can read their own investor_users row.
-- - approved authenticated investors can insert/read own interest, commitments,
--   calculator sessions, document access logs, and interaction events.
-- - admin/manager roles can review and update investor workflow records.
-- - public visitors cannot read private investor records or documents.
