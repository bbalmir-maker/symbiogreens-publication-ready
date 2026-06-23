# Supabase Deployment Notes

## Public Front-End Keys

Use the Supabase URL and public anon key only after Row Level Security is configured.

Never expose:

- Supabase service role key.
- Database password.
- SMTP credentials.
- Private storage signing secrets.

## Storage Buckets

Recommended buckets:

- `public-images`
- `team-images`
- `product-images`
- `investor-documents-private`

Investor documents should be private and delivered through signed URLs or authenticated server functions.

## Backups

Use scheduled Supabase backups or exports. Keep backup copies separate from the production project.
