# SymbioGreens Customer Portal

Standalone buyer-facing portal for product discovery, buyer survey, product interest, sample requests, and supply discussion intake.

This portal uses the existing SymbioGreens product dataset and preserves static/localStorage behavior. Supabase is not required for the portal to load or submit locally.

## Current Behavior

- Public product browsing is open.
- Product interest is saved locally.
- Buyer type and survey steps are saved locally.
- Review and submit creates a backend-ready customer interest payload in localStorage.
- Supabase remains optional and inactive unless a safe public anon configuration is intentionally added later.

## Backend-Ready Payload Areas

- `customer_profile`
- `buyer_type`
- `product_interests`
- `volume_frequency`
- `delivery_location`
- `sample_request`
- `survey_answers`
- `submission_status`
- `created_at`

## Safety

No real Supabase keys, service-role keys, private documents, or private buyer data are included.
