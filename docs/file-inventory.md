# File Inventory

## Runtime Files

- `index.html`
- `styles.css`
- `app.js`
- `platform-data.js`
- `public/`

## Publication Support

- `README.md`
- `docs/`
- `assets/js/investor-model-data.js`
- `assets/js/supabase-config.example.js`

## Preserved Project Folders

- `data/`
- `database/`
- `integrations/`

## Images

The approved site currently references assets under `public/...`, so the package preserves that folder structure. Future cleanup can migrate assets into `assets/images/`, but only as a controlled refactor after publication.

## QA Result

At package preparation time, the local asset scan found no missing `public/...` references in the package.
