SYMBIOGREENS GITHUB PAGES CLEAN UPLOAD

This folder is the clean GitHub Pages upload package.

UPLOAD INSTRUCTIONS

Upload the CONTENTS of this folder to the GitHub repository root.
Do not upload the parent folder itself.

Expected root files/folders after upload:

index.html
app.js
styles.css
platform-data.js
assets/
public/
shared/
admin/
customer-portal/
investor-portal/
partner-portal/
supabase/
MASTER-INTEGRITY-AUDIT.md
MASTER-INTEGRITY-FIXES.md
DEPLOYMENT-READINESS-REPORT.md

GitHub Pages should serve index.html from the repository root.

EXPECTED LIVE PATHS

Main site:
https://bbalmir-maker.github.io/REPOSITORY-NAME/

Customer Portal:
https://bbalmir-maker.github.io/REPOSITORY-NAME/customer-portal/

Investor Portal:
https://bbalmir-maker.github.io/REPOSITORY-NAME/investor-portal/

Partner Portal:
https://bbalmir-maker.github.io/REPOSITORY-NAME/partner-portal/

Admin:
https://bbalmir-maker.github.io/REPOSITORY-NAME/admin/

DO NOT UPLOAD

.env
.env.local
node_modules
old ZIPs
backup folders
private documents
private contracts
private customer data
private investor data
private partner data
Supabase service-role keys
Resend API keys
database passwords
JWT secrets
SMTP passwords

IMPORTANT STATUS

This package is ready for frontend GitHub Pages upload testing only.
Supabase backend deployment, migrations, Edge Functions, Auth redirects, and email delivery still require separate verification.
