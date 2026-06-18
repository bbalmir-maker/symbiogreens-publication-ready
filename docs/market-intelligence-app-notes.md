# Market Intelligence App Notes

## Purpose

The market intelligence layer collects buyer demand signals to support product assortment, sample coordination, and production planning.

## Current Prototype Features

- Buyer registration.
- Buyer login.
- Product catalog browsing.
- Product detail modals.
- Survey/product interest workflow.
- Sample request signals.
- Manager dashboard prototype.
- Buyer lead scoring logic.

## Current Storage

All customer and survey data is currently stored in browser `localStorage`.

## Production Upgrade

Move buyer profiles, survey responses, product interests, sample requests, manager notes, and lead scoring outputs into Supabase tables protected by Row Level Security.
