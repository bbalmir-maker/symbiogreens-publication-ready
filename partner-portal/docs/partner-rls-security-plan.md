# Partner RLS Security Plan

Draft policy intent:

- Public users can insert `partner_requests`.
- Public users cannot read partner requests.
- Approved authenticated partners can read and write only their own portal records.
- Approved partners cannot read other partners.
- Admins can manage partner records.
- Admin analytics are admin-only.
- Service-role keys must remain server-side only.

Tables needing RLS:

- partner_requests
- partner_profiles
- partner_invitations
- partner_project_profiles
- partner_land_assessments
- partner_climate_assessments
- partner_water_calculations
- partner_solar_assessments
- partner_crop_scenarios
- partner_revenue_scenarios
- partner_ownership_scenarios
- partner_market_surveys
- partner_buyer_validation
- partner_questions
- partner_question_ratings
- partner_comments
- partner_document_access
- partner_interaction_events
- partner_readiness_scores
- partner_meeting_requests
- admin_notes
