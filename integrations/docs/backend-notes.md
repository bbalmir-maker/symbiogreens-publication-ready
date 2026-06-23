# Backend Notes

## Current State

The current website stores prototype buyer, manager, password reset, survey, and product-interest data in browser `localStorage`.

## Limitations

- Data stays on one browser/device.
- Data can be cleared by users.
- Local data is not secure for production.
- There is no server-side validation.
- There is no audit trail.
- There is no live email delivery.

## Recommended Backend

Supabase is recommended for the first production backend because it provides PostgreSQL, authentication, Row Level Security, storage, API access, and backups on paid plans.

## Required Before Real Accounts

- Supabase Auth or equivalent.
- Role-based access for buyer, manager, admin, investor, and partner users.
- Database tables for buyers, surveys, product interests, investor inquiries, and manager notes.
- Server-side password reset.
- Private storage for protected investor materials.
- Backups and monitoring.
