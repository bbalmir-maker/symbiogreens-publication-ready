-- SymbioGreens / Balponics Master Market Intelligence Platform v1.0
create extension if not exists pgcrypto;

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique,
  role text not null check (role in ('buyer','manager')),
  email text not null unique,
  created_at timestamptz default now()
);
create table if not exists businesses (
  id uuid primary key default gen_random_uuid(),
  business_name text not null,
  business_type text,
  country text,
  city text,
  address text,
  website text,
  instagram text,
  weekly_budget text,
  created_at timestamptz default now()
);
create table if not exists respondents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  business_id uuid references businesses(id),
  first_name text,
  last_name text,
  job_title text,
  buyer_type text,
  email text not null,
  phone text,
  whatsapp text,
  notes text,
  lead_status text default 'New',
  follow_up_date date,
  sales_priority text,
  created_at timestamptz default now()
);
create table if not exists product_categories (
  id text primary key,
  name text not null,
  block text,
  sort_order int,
  status text default 'active',
  custom_program text
);
create table if not exists products (
  id text primary key,
  category_id text references product_categories(id),
  product_name text not null,
  scientific_name text,
  flavor_profile text,
  texture text,
  culinary_uses text,
  nutrition_highlights text,
  production_method text,
  shelf_life text,
  priority_score int,
  active boolean default true,
  sort_order int
);
create table if not exists product_images (
  id uuid primary key default gen_random_uuid(),
  product_id text references products(id),
  image_type text check (image_type in ('png','webp','thumbnail')),
  storage_path text not null,
  created_at timestamptz default now()
);
create table if not exists surveys (
  id uuid primary key default gen_random_uuid(),
  respondent_id uuid references respondents(id),
  business_id uuid references businesses(id),
  category_id text references product_categories(id),
  completed boolean default false,
  submitted_at timestamptz,
  created_at timestamptz default now()
);
create table if not exists product_responses (
  id uuid primary key default gen_random_uuid(),
  survey_id uuid references surveys(id),
  respondent_id uuid references respondents(id),
  business_id uuid references businesses(id),
  product_id text references products(id),
  interest_level text,
  current_usage text,
  estimated_weekly_volume text,
  quantity_unit text,
  delivery_frequency text,
  packaging text,
  sample_request boolean default false,
  comments text,
  created_at timestamptz default now()
);
create table if not exists sample_requests (
  id uuid primary key default gen_random_uuid(),
  survey_id uuid references surveys(id),
  respondent_id uuid references respondents(id),
  business_id uuid references businesses(id),
  product_id text references products(id),
  status text default 'Requested',
  follow_up_notes text,
  created_at timestamptz default now()
);
create table if not exists custom_program_requests (
  id uuid primary key default gen_random_uuid(),
  respondent_id uuid references respondents(id),
  business_id uuid references businesses(id),
  category_id text references product_categories(id),
  program_name text,
  selected_product_ids text[],
  notes text,
  created_at timestamptz default now()
);
create table if not exists application_tags (id uuid primary key default gen_random_uuid(), name text unique not null);
create table if not exists response_application_tags (
  response_id uuid references product_responses(id),
  application_tag_id uuid references application_tags(id),
  primary key (response_id, application_tag_id)
);
create table if not exists manager_users (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  access_level text default 'manager'
);
create table if not exists email_logs (
  id uuid primary key default gen_random_uuid(),
  recipient text,
  template text,
  subject text,
  provider_message_id text,
  status text,
  payload jsonb,
  created_at timestamptz default now()
);
create table if not exists analytics_snapshots (
  id uuid primary key default gen_random_uuid(),
  snapshot_type text,
  data jsonb,
  created_at timestamptz default now()
);
