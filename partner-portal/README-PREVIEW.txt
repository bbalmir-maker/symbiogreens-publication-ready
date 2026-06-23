SYMBIOGREENS PARTNER PORTAL PREVIEW

To open the Partner Portal founder demo:

1. Open:
   C:\Users\bbalm\Downloads\SYMBIOGREENS-PARTNER-PORTAL\preview\START-FOUNDER-DEMO.html

2. Click:
   Open Demo Portal

If that does not work, open directly:

C:\Users\bbalm\Downloads\SYMBIOGREENS-PARTNER-PORTAL\preview\index.html?demo=1

Or open:

C:\Users\bbalm\Downloads\SYMBIOGREENS-PARTNER-PORTAL\preview\OPEN-DEMO-DIRECT.html

To turn demo off:

Open index.html normally with no ?demo=1.

Or run in console:

localStorage.removeItem("symbioPartnerPortalDemo");
location.href = "index.html";

Expected default behavior:

Opening index.html with no demo parameter should show the locked Access Required screen.

Notes:
- No Supabase is active.
- No real partner data is included.
- No service-role keys or secrets are included.
- All tool outputs are illustrative and non-binding.
- Founder demo mode is not security.
- Real partner access later requires Supabase Auth, approved partner roles, invitations, and RLS policies.
