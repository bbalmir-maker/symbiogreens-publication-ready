# SymbioGreens Investor Portal

Standalone GitHub Pages application for the private SymbioGreens investor presentation and review workflow.

This repository is separate from the public SymbioGreens website. The public site should remain investor-intake only. This app defaults to an access-required screen. When founder demo mode is enabled locally, it opens the full SymbioGreens Balponics investor presentation front end with the current investor material, production visuals, financial model, calculators, and review flow.

## Default Behavior

- No Supabase connection is active.
- No real investor data is loaded.
- No investor records, Supabase data, service-role keys, or external private data room files are included.
- The previous PDF downloads were removed because they contained older capitalization numbers; regenerate PDFs only after the corrected $2.2M / $2.0M-$2.5M model is final.
- No service-role keys or secrets are used.
- GitHub Pages can host this as a static site.
- The active portal front end is the SymbioGreens Balponics investor presentation format.
- Production/facility visual assets are included under `assets/`.
- Generated mockup PNGs are kept only as design references under `assets/reference`; they are not rendered as live portal content.
- Backend activation is staged through docs, schema draft, and a local fallback service.

## Founder Demo Mode

Open the browser console on your local machine and run:

```js
localStorage.setItem("symbioInvestorPortalDemo", "true");
location.reload();
```

To disable demo mode:

```js
localStorage.removeItem("symbioInvestorPortalDemo");
location.reload();
```

Demo mode is only a local preview convenience. It is not security. Real private investor access must use authentication, approved investor roles, and Supabase Row Level Security.

## Files

- `index.html` - gated standalone investor presentation portal.
- `styles.css` - retained legacy styling file from the previous component preview; not loaded by the current presentation page.
- `app.js` - retained legacy component preview logic; not loaded by the current presentation page.
- `investor-model-data.js` - illustrative model data and private-review content placeholders.
- `assets/js/backend-service.js` - backend-ready local adapter with required investor workflow methods.
- `assets/js/supabase-config.example.js` - placeholder-only config example.
- `assets/icons/` - local SVG icon system reference.
- `assets/reference/` - generated visual mockups retained for design reference only.
- `database/investor-portal-schema-draft.sql` - Supabase schema/RLS draft.
- `docs/` - architecture, auth, RLS, deployment, workflow, and security planning notes.

## Active Now

- Access-required public/default screen.
- Local founder demo mode.
- Full investor presentation front end.
- Interactive financial model, investor equity calculator, ROI model, tabs, info cards, and modal knowledge cards.
- Print/save support from the corrected HTML presentation.
- Real production/facility imagery from the provided presentation package.
- Backend-ready private portal workflow embedded into the presentation:
  - save current scenario
  - save non-binding interest range and area
  - save investor questions and usefulness rating
  - save comments/objections
  - request follow-up call
  - request locked documents
  - track engagement summary locally in demo mode

## Staged But Inactive

- Supabase Auth.
- Email invitations.
- Approved investor role enforcement.
- RLS-protected investor data.
- Private document signed URLs.
- Real admin dashboard persistence.

## Public URL To Test After Deployment

`https://bbalmir-maker.github.io/symbiogreens-investor-portal/`

The deployed URL should show the access-required screen by default.
