SYMBIOGREENS INVESTOR PORTAL DEPLOYMENT

New GitHub repository:
symbiogreens-investor-portal

Local upload folder:
C:\Users\bbalm\Downloads\symbiogreens-investor-portal-upload-ready

Upload instructions:
1. Create or open GitHub repo:
   symbiogreens-investor-portal
2. Upload the full contents of:
   C:\Users\bbalm\Downloads\symbiogreens-investor-portal-upload-ready
3. Commit message:
   Add standalone SymbioGreens investor portal preview
4. Enable GitHub Pages:
   Settings > Pages > Deploy from branch > main > /root
5. Test:
   https://bbalmir-maker.github.io/symbiogreens-investor-portal/

Required post-deploy checks:
- Public URL shows the access-required screen by default.
- Public URL does not expose private portal content to normal visitors.
- No public navigation exposes private review screens from the public SymbioGreens site.
- Founder demo mode is only enabled by manually setting localStorage.
- No Supabase is activated.
- No real Supabase keys are present.
- No service-role keys are present.
- No investor records, Supabase data, service-role keys, or external private data room files are present.
- The previous PDF downloads were removed because they contained older capitalization numbers; regenerate PDFs only after the corrected $2.2M / $2.0M-$2.5M model is final.
- Generated mockup PNGs are reference-only and are not rendered as live portal content.
- The approved/demo portal uses the SymbioGreens Balponics presentation front end, production imagery, financial model, and investor calculator.
- Private workflow actions are embedded but save locally until Supabase Auth, RLS, and persistence are activated.
- Admin approval and engagement panels remain demo/local until Supabase Auth and RLS are activated.

Founder demo mode after deployment:
1. Open browser console at the deployed portal URL.
2. Run:
   localStorage.setItem("symbioInvestorPortalDemo", "true");
   location.reload();
3. Disable when finished:
   localStorage.removeItem("symbioInvestorPortalDemo");
   location.reload();

Reminder:
This demo gate is not production security. Real investor access requires Supabase Auth, approved investor records, role checks, and Row Level Security before any private information or documents are connected.
