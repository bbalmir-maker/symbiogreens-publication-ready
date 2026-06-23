SYMBIOGREENS CUSTOMER PORTAL - START HERE

Open first:
C:\Users\bbalm\Downloads\SYMBIOGREENS-CUSTOMER-PORTAL\preview\index.html

What this is:
This is the standalone SymbioGreens Customer Portal for buyer-facing product discovery, product interest, buyer survey, volume/frequency planning, delivery/location details, sample requests, customer profile, review, and local submission.

This is NOT the investor portal.
This is NOT the partner portal.

Upload-ready GitHub files:
C:\Users\bbalm\Downloads\SYMBIOGREENS-CUSTOMER-PORTAL\upload-ready

Suggested GitHub deployment:
Upload the contents of upload-ready to the customer portal repository root. Keep this as a separate standalone app or repo from the main public website unless you intentionally decide to merge later.

Do not upload:
.env
.env.local
service-role keys
private data
unrelated zip files
node_modules
private contracts
database exports
backup folders

What works now:
- Product catalog displays using the existing SymbioGreens product dataset.
- Product detail panel opens.
- Product interest can be saved to localStorage.
- Buyer type selection works.
- Guided survey pages work page-by-page.
- Volume, delivery, sample request, and profile forms save locally.
- Review step validates name, contact method, buyer type, and at least one product interest.
- Submit saves a backend-ready customer interest object locally.
- Supabase is optional and inactive unless intentionally configured later.

Backend note:
No real Supabase credentials are included. The included backend adapter is safe and falls back to local/static behavior when no Supabase config is present.

Suggested commit message:
Build customer portal from main website product survey engine
