SYMBIOGREENS INVESTOR PORTAL PREVIEW

Local preview folder:
C:\Users\bbalm\Downloads\symbiogreens-investor-portal-preview

Open:
C:\Users\bbalm\Downloads\symbiogreens-investor-portal-preview\index.html

Default behavior:
The app shows:
"Access required. Investor portal access is available only after review, approval, and account activation."

Fast local sample preview:
Open:
C:\Users\bbalm\Downloads\symbiogreens-investor-portal-preview\START-FOUNDER-DEMO.html

That preview-only launcher sets the local demo flag and redirects to index.html, opening the full SymbioGreens Balponics investor presentation portal.
It is not included as a production security feature.

Enable founder demo mode on your local machine:
1. Open the browser developer console.
2. Run:
   localStorage.setItem("symbioInvestorPortalDemo", "true");
   location.reload();

Disable founder demo mode:
1. Open the browser developer console.
2. Run:
   localStorage.removeItem("symbioInvestorPortalDemo");
   location.reload();

Important:
- Demo mode is not real security.
- Demo mode is only a founder/developer preview convenience.
- No Supabase is activated.
- No real investor data is loaded.
- No investor records, Supabase data, service-role keys, or external private data room files are included.
- The previous PDF downloads were removed because they contained older capitalization numbers; regenerate PDFs only after the corrected $2.2M / $2.0M-$2.5M model is final.
- No real secrets or service-role keys are included.
- Generated mockup PNGs are reference-only and are not displayed as live portal content.
- The active portal uses the provided SymbioGreens presentation format and production/facility images.
- Backend-ready workflow actions are active in demo mode and save to localStorage only.
- All calculator outputs are illustrative, non-binding, not guaranteed, and not a securities offer.
