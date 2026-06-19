# Investor Engagement Scoring Model

Investor engagement scoring is backend-readiness only and must not be exposed publicly.

The public static site may record minimal professional events such as investor interest submitted, partner inquiry submitted, and review request clicked. It must not display or publish scores, thresholds, internal prioritization logic, admin analytics, or private investor activity data.

Future scoring rules should be defined and reviewed inside the approved admin/private backend implementation, protected by authentication, authorization, Supabase RLS, and appropriate admin-only access controls.
