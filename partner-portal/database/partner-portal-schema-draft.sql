-- SymbioGreens Partner Portal schema draft.
-- Draft only. Review in Supabase before production. Never expose service-role keys.

create table if not exists partner_requests (
  id uuid primary key default gen_random_uuid(),
  full_name text,
  email text,
  phone text,
  country text,
  region text,
  inquiry_type text default 'partner',
  status text default 'pending_review',
  consent_acknowledged boolean default false,
  source_page text,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

create table if not exists partner_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  partner_request_id uuid references partner_requests(id),
  full_name text,
  email text,
  country text,
  region text,
  role text default 'approved_partner',
  status text default 'pending',
  approved_at timestamptz,
  created_at timestamptz default now()
);

create table if not exists partner_invitations (
  id uuid primary key default gen_random_uuid(),
  partner_request_id uuid references partner_requests(id),
  email text not null,
  token_hash text,
  status text default 'queued',
  sent_at timestamptz,
  expires_at timestamptz,
  created_at timestamptz default now()
);

create table if not exists partner_project_profiles (
  id uuid primary key default gen_random_uuid(),
  partner_user_id uuid,
  country text,
  region text,
  latitude numeric,
  longitude numeric,
  altitude numeric,
  land_size_m2 numeric,
  greenhouse_area_m2 numeric,
  channel text,
  project_size text,
  notes text,
  created_at timestamptz default now()
);

create table if not exists partner_land_assessments (
  id uuid primary key default gen_random_uuid(),
  partner_user_id uuid,
  project_profile_id uuid,
  land_size_m2 numeric,
  usable_percent numeric,
  greenhouse_area_m2 numeric,
  footprint jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

create table if not exists partner_climate_assessments (
  id uuid primary key default gen_random_uuid(),
  partner_user_id uuid,
  latitude numeric,
  longitude numeric,
  rainfall_mm numeric,
  sun_hours numeric,
  average_temperature text,
  altitude numeric,
  climate_payload jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

create table if not exists partner_water_calculations (
  id uuid primary key default gen_random_uuid(),
  partner_user_id uuid,
  rainfall_mm numeric,
  catchment_area_m2 numeric,
  runoff_coefficient numeric,
  liters_year numeric,
  storage_target_liters numeric,
  payload jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

create table if not exists partner_solar_assessments (
  id uuid primary key default gen_random_uuid(),
  partner_user_id uuid,
  sun_hours numeric,
  electricity_cost numeric,
  electricity_reliability text,
  solar_area_m2 numeric,
  suitability_score numeric,
  strategy text,
  payload jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

create table if not exists partner_crop_scenarios (
  id uuid primary key default gen_random_uuid(),
  partner_user_id uuid,
  crop_model text,
  greenhouse_area_m2 numeric,
  cycles_year numeric,
  estimated_volume numeric,
  estimated_revenue numeric,
  payload jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

create table if not exists partner_revenue_scenarios (
  id uuid primary key default gen_random_uuid(),
  partner_user_id uuid,
  scenario_name text,
  revenue_low numeric,
  revenue_high numeric,
  payload jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

create table if not exists partner_ownership_scenarios (
  id uuid primary key default gen_random_uuid(),
  partner_user_id uuid,
  estimated_investment numeric,
  partner_contribution numeric,
  partner_ownership_percent numeric,
  symbio_ownership_percent numeric,
  payload jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

create table if not exists partner_market_surveys (
  id uuid primary key default gen_random_uuid(),
  partner_user_id uuid,
  buyer_count numeric,
  weekly_demand numeric,
  channels jsonb default '[]'::jsonb,
  readiness_score numeric,
  payload jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

create table if not exists partner_buyer_validation (
  id uuid primary key default gen_random_uuid(),
  partner_user_id uuid,
  buyer_name text,
  buyer_type text,
  weekly_demand numeric,
  price_range text,
  contract_interest text,
  payment_terms text,
  delivery_requirements text,
  created_at timestamptz default now()
);

create table if not exists partner_questions (
  id uuid primary key default gen_random_uuid(),
  partner_user_id uuid,
  category text,
  question text,
  prepared_answer text,
  comment text,
  created_at timestamptz default now()
);

create table if not exists partner_question_ratings (
  id uuid primary key default gen_random_uuid(),
  partner_user_id uuid,
  question text,
  rating integer,
  created_at timestamptz default now()
);

create table if not exists partner_comments (
  id uuid primary key default gen_random_uuid(),
  partner_user_id uuid,
  comment_type text,
  body text,
  payload jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

create table if not exists partner_document_access (
  id uuid primary key default gen_random_uuid(),
  partner_user_id uuid,
  document_title text,
  access_action text,
  created_at timestamptz default now()
);

create table if not exists partner_interaction_events (
  id uuid primary key default gen_random_uuid(),
  partner_user_id uuid,
  event_type text,
  event_payload jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

create table if not exists partner_readiness_scores (
  id uuid primary key default gen_random_uuid(),
  partner_user_id uuid,
  readiness_score numeric,
  readiness_label text,
  payload jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

create table if not exists partner_meeting_requests (
  id uuid primary key default gen_random_uuid(),
  partner_user_id uuid,
  request_type text,
  notes text,
  status text default 'requested',
  created_at timestamptz default now()
);

create table if not exists admin_notes (
  id uuid primary key default gen_random_uuid(),
  related_table text,
  related_id uuid,
  note text,
  created_by uuid,
  created_at timestamptz default now()
);
