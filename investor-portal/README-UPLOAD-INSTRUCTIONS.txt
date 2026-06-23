SYMBIOGREENS INVESTOR PORTAL UPLOAD INSTRUCTIONS

1. Exact GitHub folder to open

Create or open the GitHub repository:
symbiogreens-investor-portal

Upload everything to the repository root.

2. Exact local upload folder to use

C:\Users\bbalm\Downloads\symbiogreens-investor-portal-upload-ready

3. Exact files included

Root:
- index.html
- app.js
- styles.css
- investor-model-data.js
- README.md
- README-PREVIEW.txt
- README-DEPLOYMENT.txt
- README-UPLOAD-INSTRUCTIONS.txt
- .nojekyll

Assets:
- assets/brand/symbiogreens-balponics-logo.svg
- assets/commercial-rack.png
- assets/founder-bernard-balmir.png
- assets/greenhouse-vines.png
- assets/leafy-varieties.png
- assets/microgreens-rack.png
- assets/microgreens-room.png
- assets/mushroom-room.png
- assets/nft-herbs.png
- assets/product-showroom.png
- assets/resort-products.png
- assets/tower-aisle.png
- assets/tower-close.png
- assets/js/backend-service.js
- assets/js/supabase-config.example.js
- assets/icons/symbio-icons.svg
- assets/reference/a_high_resolution_ui_ux_dashboard_mockup_collage.png
- assets/reference/a_wide_high_resolution_mockup_presentation_image.png
- assets/reference/eco_friendly_platform_ecosystem_overview.png
- assets/reference/investor_portal_dashboard_for_agritech_growth.png
- assets/reference/saas_investor_dashboard_with_growth_insights.png

Docs:
- docs/admin-approval-workflow.md
- docs/github-pages-deployment.md
- docs/investor-backend-activation-plan.md
- docs/investor-auth-approval-workflow.md
- docs/investor-demo-mode-and-security.md
- docs/investor-email-invitation-flow.md
- docs/investor-expansion-story-private-content.md
- docs/investor-portal-architecture.md
- docs/investor-private-portal-plan.md
- docs/public-site-crosscheck-notes.md
- docs/investor-qa-comments-workflow.md
- docs/investor-rls-security-plan.md

Database:
- database/investor-portal-schema-draft.sql

4. Suggested commit message

Add standalone SymbioGreens investor portal preview

5. Files not to upload

Do not upload:
- ZIP packages
- .env
- .env.local
- real supabase-config.js
- service-role keys
- node_modules
- private investor documents
- database exports
- private contracts
- backup folders
- old versions
- generated mockup screenshots as live website content
- stale PDFs with the older $1.145M model

6. Final live URLs to test

Investor portal:
https://bbalmir-maker.github.io/symbiogreens-investor-portal/

Expected public result:
The page shows the access-required message and does not reveal private portal content.

Founder demo mode:
Open browser console and run:
localStorage.setItem("symbioInvestorPortalDemo", "true");
location.reload();

Disable founder demo mode:
localStorage.removeItem("symbioInvestorPortalDemo");
location.reload();

Reminder:
Demo mode is not real security. Real investor access requires authentication, approval status, and Row Level Security before any private data or documents are connected.
