# Partner Auth And Approval Workflow

Target flow:

1. Partner submits public inquiry on the SymbioGreens website.
2. Admin reviews the request.
3. Admin requests more information, rejects, or approves.
4. Approved partner receives an invitation email.
5. Partner activates account and verifies email.
6. Partner signs in to the standalone partner portal.
7. Portal verifies approved partner status before loading private tools.

Invitation emails must be sent server-side or through secure Supabase-supported flows. Do not expose service-role keys in frontend code.
