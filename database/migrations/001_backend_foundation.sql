-- SymbioGreens / Balponics Backend Phase 1 Supabase schema draft.
-- Source of truth prepared from the current live GitHub static version.
-- Review in a Supabase branch/project before production. Do not paste service-role keys into frontend code.

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
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'buyer' check (role in ('buyer','admin','manager','investor','partner','viewer','team')),
  email text,
  full_name text,
  organization text,
  phone text,
  country text,
  city text,
  locale text not null default 'en' check (locale in ('en','es','fr')),
  status text not null default 'pending' check (status in ('pending','active','inactive','blocked')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.buyers (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete set null,
  business_name text not null,
  business_type text,
  buyer_type text,
  contact_first_name text,
  contact_last_name text,
  email text not null,
  phone text,
  city text,
  country text,
  weekly_budget text,
  notes text,
  account_status text not null default 'active' check (account_status in ('pending','active','inactive','blocked')),
  source text not null default 'public_registration',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.buyer_profiles (
  id uuid primary key default gen_random_uuid(),
  buyer_id uuid not null references public.buyers(id) on delete cascade,
  profile_id uuid references public.profiles(id) on delete set null,
  sourcing_needs text,
  delivery_region text,
  delivery_frequency text,
  preferred_language text default 'en' check (preferred_language in ('en','es','fr')),
  preferred_contact_method text,
  packaging_preferences text,
  sample_program_interest boolean not null default false,
  custom_program_interest boolean not null default false,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (buyer_id)
);

create table if not exists public.survey_responses (
  id uuid primary key default gen_random_uuid(),
  buyer_id uuid references public.buyers(id) on delete set null,
  profile_id uuid references public.profiles(id) on delete set null,
  category_id text,
  category_label text,
  response_scope text not null default 'category' check (response_scope in ('category','all_categories','product_modal')),
  responses jsonb not null default '[]'::jsonb,
  status text not null default 'submitted' check (status in ('draft','submitted','reviewed','archived')),
  submitted_at timestamptz not null default now(),
  language text not null default 'en' check (language in ('en','es','fr')),
  source_page text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.product_interest (
  id uuid primary key default gen_random_uuid(),
  buyer_id uuid references public.buyers(id) on delete set null,
  profile_id uuid references public.profiles(id) on delete set null,
  survey_response_id uuid references public.survey_responses(id) on delete set null,
  product_id text not null,
  product_name text,
  category_id text,
  category text,
  interest_level text,
  quantity_estimate text,
  estimated_quantity text,
  delivery_frequency text,
  preferred_delivery_frequency text,
  sample_request boolean not null default false,
  sample_requested boolean not null default false,
  packaging_preference text,
  packaging_preferences text,
  notes text,
  source text not null default 'buyer_survey',
  language text not null default 'en' check (language in ('en','es','fr')),
  source_page text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  company text,
  region text,
  inquiry_type text,
  organization_type text,
  message text not null,
  status text not null default 'new' check (status in ('new','triaged','responded','archived')),
  assigned_to uuid references public.profiles(id) on delete set null,
  language text not null default 'en' check (language in ('en','es','fr')),
  source_page text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

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
  investment_area text,
  investment_capacity text,
  investment_style text,
  sector_background text,
  why_interested text,
  expectations text,
  resources_relationships text,
  review_consent boolean not null default false,
  status text not null default 'new' check (status in ('new','reviewing','qualified','declined','invited','archived')),
  approved_access boolean not null default false,
  language text not null default 'en' check (language in ('en','es','fr')),
  source_page text,
  metadata jsonb not null default '{}'::jsonb,
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
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (profile_id)
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
  metadata jsonb not null default '{}'::jsonb,
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
  source_section text,
  language text not null default 'en' check (language in ('en','es','fr')),
  user_agent text,
  referrer text,
  backend_enabled boolean not null default false,
  notes text
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
  requested_review boolean not null default false,
  engagement_score numeric not null default 0,
  engagement_level text not null default 'cold' check (engagement_level in ('cold','warm','qualified','high_intent')),
  recommended_follow_up text,
  admin_notes text
);

create table if not exists public.partner_submissions (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  organization text,
  email text not null,
  phone text,
  partner_type text,
  target_market text,
  local_opportunity text,
  buyers text,
  contributions text,
  capital_readiness text,
  timeline text,
  partnership_vision text,
  role_in_project text,
  strategic_alignment text,
  review_consent boolean not null default false,
  status text not null default 'new' check (status in ('new','reviewing','qualified','declined','archived')),
  language text not null default 'en' check (language in ('en','es','fr')),
  source_page text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.team_members (
  id uuid primary key default gen_random_uuid(),
  display_order integer not null default 100,
  full_name text not null,
  title text not null,
  subtitle text,
  biography text,
  image_path text,
  profile_type text not null default 'executive' check (profile_type in ('founder','executive','operations','advisor','partner')),
  language text not null default 'en' check (language in ('en','es','fr')),
  is_active boolean not null default true,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.admin_notes (
  id uuid primary key default gen_random_uuid(),
  related_table text not null,
  related_id uuid,
  admin_id uuid references public.profiles(id) on delete set null,
  note text not null,
  note_type text not null default 'general',
  created_at timestamptz not null default now()
);

create index if not exists idx_profiles_role_status on public.profiles(role, status);
create index if not exists idx_buyers_email on public.buyers(lower(email));
create index if not exists idx_product_interest_buyer on public.product_interest(buyer_id);
create index if not exists idx_product_interest_product on public.product_interest(product_id);
create index if not exists idx_contact_messages_status on public.contact_messages(status, created_at desc);
create index if not exists idx_investor_prequalification_status on public.investor_prequalification(status, created_at desc);
create index if not exists idx_investor_interaction_events_session on public.investor_interaction_events(session_id, created_at desc);
create index if not exists idx_investor_interaction_events_type on public.investor_interaction_events(event_type, created_at desc);
create index if not exists idx_investor_engagement_scores_level on public.investor_engagement_scores(engagement_level, updated_at desc);
create index if not exists idx_partner_submissions_status on public.partner_submissions(status, created_at desc);
create index if not exists idx_team_members_active_order on public.team_members(is_active, display_order);

do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'profiles',
    'buyers',
    'buyer_profiles',
    'survey_responses',
    'product_interest',
    'contact_messages',
    'investor_prequalification',
    'investor_users',
    'investor_interest',
    'investor_potential_commitments',
    'investor_calculator_sessions',
    'investor_document_access',
    'investor_admin_notes',
    'investor_interaction_events',
    'investor_engagement_scores',
    'partner_submissions',
    'team_members',
    'admin_notes'
  ]
  loop
    execute format('alter table public.%I enable row level security', table_name);
  end loop;
end $$;

create or replace function public.current_user_role()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select role from public.profiles where id = auth.uid()
$$;

create or replace function public.is_admin_or_manager()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(public.current_user_role() in ('admin','manager'), false)
$$;

create or replace function public.is_investor()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(public.current_user_role() = 'investor', false)
$$;

-- RLS draft guidance policies. Tighten and test before production.
drop policy if exists "profiles read own or admin" on public.profiles;
drop policy if exists "profiles update own or admin" on public.profiles;
drop policy if exists "public contact insert" on public.contact_messages;
drop policy if exists "admin contact manage" on public.contact_messages;
drop policy if exists "public investor prequalification insert" on public.investor_prequalification;
drop policy if exists "admin investor prequalification manage" on public.investor_prequalification;
drop policy if exists "public partner submission insert" on public.partner_submissions;
drop policy if exists "admin partner submission manage" on public.partner_submissions;
drop policy if exists "buyers own select" on public.buyers;
drop policy if exists "buyers own update" on public.buyers;
drop policy if exists "buyers authenticated insert" on public.buyers;
drop policy if exists "buyer profiles own manage" on public.buyer_profiles;
drop policy if exists "survey own manage" on public.survey_responses;
drop policy if exists "product interest own manage" on public.product_interest;
drop policy if exists "investor users own read" on public.investor_users;
drop policy if exists "admin investor users manage" on public.investor_users;
drop policy if exists "investor private own interest" on public.investor_interest;
drop policy if exists "investor private own commitments" on public.investor_potential_commitments;
drop policy if exists "investor own calculator sessions" on public.investor_calculator_sessions;
drop policy if exists "investor document access read own or admin" on public.investor_document_access;
drop policy if exists "investor document access insert own or admin" on public.investor_document_access;
drop policy if exists "admin investor notes manage" on public.investor_admin_notes;
drop policy if exists "public investor event insert" on public.investor_interaction_events;
drop policy if exists "admin investor event read" on public.investor_interaction_events;
drop policy if exists "public investor engagement insert" on public.investor_engagement_scores;
drop policy if exists "admin investor engagement manage" on public.investor_engagement_scores;
drop policy if exists "team members public read active" on public.team_members;
drop policy if exists "team members admin manage" on public.team_members;
drop policy if exists "admin notes manage" on public.admin_notes;

create policy "profiles read own or admin" on public.profiles
  for select using (auth.uid() = id or public.is_admin_or_manager());
create policy "profiles update own or admin" on public.profiles
  for update using (auth.uid() = id or public.is_admin_or_manager());

create policy "public contact insert" on public.contact_messages
  for insert to anon, authenticated with check (true);
create policy "admin contact manage" on public.contact_messages
  for all to authenticated using (public.is_admin_or_manager()) with check (public.is_admin_or_manager());

create policy "public investor prequalification insert" on public.investor_prequalification
  for insert to anon, authenticated with check (true);
create policy "admin investor prequalification manage" on public.investor_prequalification
  for all to authenticated using (public.is_admin_or_manager()) with check (public.is_admin_or_manager());

create policy "public partner submission insert" on public.partner_submissions
  for insert to anon, authenticated with check (true);
create policy "admin partner submission manage" on public.partner_submissions
  for all to authenticated using (public.is_admin_or_manager()) with check (public.is_admin_or_manager());

create policy "buyers own select" on public.buyers
  for select to authenticated using (profile_id = auth.uid() or public.is_admin_or_manager());
create policy "buyers own update" on public.buyers
  for update to authenticated using (profile_id = auth.uid() or public.is_admin_or_manager());
create policy "buyers authenticated insert" on public.buyers
  for insert to authenticated with check (profile_id = auth.uid() or public.is_admin_or_manager());

create policy "buyer profiles own manage" on public.buyer_profiles
  for all to authenticated using (profile_id = auth.uid() or public.is_admin_or_manager()) with check (profile_id = auth.uid() or public.is_admin_or_manager());

create policy "survey own manage" on public.survey_responses
  for all to authenticated using (profile_id = auth.uid() or public.is_admin_or_manager()) with check (profile_id = auth.uid() or public.is_admin_or_manager());

create policy "product interest own manage" on public.product_interest
  for all to authenticated using (profile_id = auth.uid() or public.is_admin_or_manager()) with check (profile_id = auth.uid() or public.is_admin_or_manager());

create policy "investor users own read" on public.investor_users
  for select to authenticated using (profile_id = auth.uid() or public.is_admin_or_manager());
create policy "admin investor users manage" on public.investor_users
  for all to authenticated using (public.is_admin_or_manager()) with check (public.is_admin_or_manager());

create policy "investor private own interest" on public.investor_interest
  for all to authenticated using (
    investor_user_id in (select id from public.investor_users where profile_id = auth.uid())
    or public.is_admin_or_manager()
  ) with check (
    investor_user_id in (select id from public.investor_users where profile_id = auth.uid())
    or public.is_admin_or_manager()
  );

create policy "investor private own commitments" on public.investor_potential_commitments
  for all to authenticated using (
    investor_user_id in (select id from public.investor_users where profile_id = auth.uid())
    or public.is_admin_or_manager()
  ) with check (
    investor_user_id in (select id from public.investor_users where profile_id = auth.uid())
    or public.is_admin_or_manager()
  );

create policy "investor own calculator sessions" on public.investor_calculator_sessions
  for all to authenticated using (
    investor_user_id in (select id from public.investor_users where profile_id = auth.uid())
    or public.is_admin_or_manager()
  ) with check (
    investor_user_id in (select id from public.investor_users where profile_id = auth.uid())
    or public.is_admin_or_manager()
  );

create policy "investor document access read own or admin" on public.investor_document_access
  for select to authenticated using (
    investor_user_id in (select id from public.investor_users where profile_id = auth.uid())
    or public.is_admin_or_manager()
  );
create policy "investor document access insert own or admin" on public.investor_document_access
  for insert to authenticated with check (
    investor_user_id in (select id from public.investor_users where profile_id = auth.uid())
    or public.is_admin_or_manager()
  );

create policy "admin investor notes manage" on public.investor_admin_notes
  for all to authenticated using (public.is_admin_or_manager()) with check (public.is_admin_or_manager());

create policy "public investor event insert" on public.investor_interaction_events
  for insert to anon, authenticated with check (true);
create policy "admin investor event read" on public.investor_interaction_events
  for select to authenticated using (public.is_admin_or_manager());

create policy "public investor engagement insert" on public.investor_engagement_scores
  for insert to anon, authenticated with check (true);
create policy "admin investor engagement manage" on public.investor_engagement_scores
  for all to authenticated using (public.is_admin_or_manager()) with check (public.is_admin_or_manager());

create policy "team members public read active" on public.team_members
  for select to anon, authenticated using (is_active = true);
create policy "team members admin manage" on public.team_members
  for all to authenticated using (public.is_admin_or_manager()) with check (public.is_admin_or_manager());

create policy "admin notes manage" on public.admin_notes
  for all to authenticated using (public.is_admin_or_manager()) with check (public.is_admin_or_manager());

drop trigger if exists set_profiles_updated_at on public.profiles;
drop trigger if exists set_buyers_updated_at on public.buyers;
drop trigger if exists set_buyer_profiles_updated_at on public.buyer_profiles;
drop trigger if exists set_survey_responses_updated_at on public.survey_responses;
drop trigger if exists set_product_interest_updated_at on public.product_interest;
drop trigger if exists set_contact_messages_updated_at on public.contact_messages;
drop trigger if exists set_investor_prequalification_updated_at on public.investor_prequalification;
drop trigger if exists set_investor_users_updated_at on public.investor_users;
drop trigger if exists set_investor_interest_updated_at on public.investor_interest;
drop trigger if exists set_investor_potential_commitments_updated_at on public.investor_potential_commitments;
drop trigger if exists set_investor_calculator_sessions_updated_at on public.investor_calculator_sessions;
drop trigger if exists set_investor_engagement_scores_updated_at on public.investor_engagement_scores;
drop trigger if exists set_partner_submissions_updated_at on public.partner_submissions;
drop trigger if exists set_team_members_updated_at on public.team_members;

create trigger set_profiles_updated_at before update on public.profiles for each row execute function public.set_updated_at();
create trigger set_buyers_updated_at before update on public.buyers for each row execute function public.set_updated_at();
create trigger set_buyer_profiles_updated_at before update on public.buyer_profiles for each row execute function public.set_updated_at();
create trigger set_survey_responses_updated_at before update on public.survey_responses for each row execute function public.set_updated_at();
create trigger set_product_interest_updated_at before update on public.product_interest for each row execute function public.set_updated_at();
create trigger set_contact_messages_updated_at before update on public.contact_messages for each row execute function public.set_updated_at();
create trigger set_investor_prequalification_updated_at before update on public.investor_prequalification for each row execute function public.set_updated_at();
create trigger set_investor_users_updated_at before update on public.investor_users for each row execute function public.set_updated_at();
create trigger set_investor_interest_updated_at before update on public.investor_interest for each row execute function public.set_updated_at();
create trigger set_investor_potential_commitments_updated_at before update on public.investor_potential_commitments for each row execute function public.set_updated_at();
create trigger set_investor_calculator_sessions_updated_at before update on public.investor_calculator_sessions for each row execute function public.set_updated_at();
create trigger set_investor_engagement_scores_updated_at before update on public.investor_engagement_scores for each row execute function public.set_updated_at();
create trigger set_partner_submissions_updated_at before update on public.partner_submissions for each row execute function public.set_updated_at();
create trigger set_team_members_updated_at before update on public.team_members for each row execute function public.set_updated_at();
