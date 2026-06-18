# SymbioGreens Publication Ready Package

This folder contains the static SymbioGreens / Balponics public website and market intelligence prototype prepared for upload to static hosting.

## Current Status

- Static HTML, CSS, and JavaScript site.
- Public pages, product catalog, buyer registration/login prototype, customer survey flow, manager dashboard prototype, investor/partnership pages, and legal pages are included.
- Data is stored locally in browser `localStorage` for prototype use.
- No live database, secure authentication, email system, or payment system is connected yet.

## Main Files

- `index.html` - application shell and script loading.
- `styles.css` - approved site styling.
- `app.js` - route rendering, interactions, login prototype, survey flow, modals, dashboards.
- `platform-data.js` - catalog, public content, and reference data.
- `public/` - active website images and brand assets.
- `assets/js/investor-model-data.js` - investor model reference data.
- `assets/js/supabase-config.example.js` - safe Supabase configuration placeholder.
- `docs/` - deployment, backend, Supabase, investor, and team update notes.

## Run Locally

Open `index.html` directly in a browser, or serve the folder with any static file server.

Example:

```bash
npx serve .
```

Then open the local URL shown by the server.

## Publish

Upload the contents of this folder to a static host such as GitHub Pages, Netlify, Vercel static hosting, cPanel, Hostinger, GoDaddy hosting, or similar.

Do not publish test credentials, private Supabase service keys, or internal documents.

## Backend Required Before Production

Before accepting real users, connect:

- Supabase or another database.
- Secure authentication with role checks.
- Server-side password reset and email delivery.
- Protected investor access.
- Secure file/image storage.
- Backups and monitoring.

See the `docs/` folder for the recommended production plan.
