# Supabase Integration Plan

## Phase 1 - Setup

1. Create Supabase project.
2. Apply `supabase-schema-draft.sql`.
3. Enable Row Level Security.
4. Create storage buckets.
5. Configure authentication.

## Phase 2 - Authentication

1. Replace localStorage login with Supabase Auth.
2. Add roles: buyer, manager, admin, investor, partner.
3. Protect manager and investor routes.
4. Enable password reset emails.

## Phase 3 - Market Intelligence Data

1. Store buyer profiles.
2. Store survey responses.
3. Store product interests.
4. Store sample requests.
5. Store manager notes and lead scores.

## Phase 4 - Investor Platform

1. Require approved investor profile before access.
2. Store investor inquiries separately.
3. Add private document storage.
4. Log document access.

## Phase 5 - Team Updates

Move executive and operations team profiles into a Supabase `team_members` table for controlled updates.
