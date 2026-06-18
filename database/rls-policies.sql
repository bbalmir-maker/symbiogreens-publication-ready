alter table users enable row level security;
alter table businesses enable row level security;
alter table respondents enable row level security;
alter table surveys enable row level security;
alter table product_responses enable row level security;
alter table sample_requests enable row level security;
alter table custom_program_requests enable row level security;
alter table email_logs enable row level security;

-- Managers can read and update all market intelligence records.
-- Buyers can read/update records tied to their own auth user.
-- Replace app_metadata.role logic with your Supabase Auth claim strategy.
create policy manager_all_businesses on businesses for all using (auth.jwt()->'app_metadata'->>'role' = 'manager');
create policy manager_all_respondents on respondents for all using (auth.jwt()->'app_metadata'->>'role' = 'manager');
create policy manager_all_surveys on surveys for all using (auth.jwt()->'app_metadata'->>'role' = 'manager');
create policy manager_all_product_responses on product_responses for all using (auth.jwt()->'app_metadata'->>'role' = 'manager');
create policy manager_all_samples on sample_requests for all using (auth.jwt()->'app_metadata'->>'role' = 'manager');
create policy manager_all_custom on custom_program_requests for all using (auth.jwt()->'app_metadata'->>'role' = 'manager');

create policy buyer_own_user on users for select using (auth.uid() = auth_user_id);
create policy buyer_own_respondent on respondents for all using (user_id in (select id from users where auth_user_id = auth.uid()));
create policy buyer_own_business on businesses for all using (id in (select business_id from respondents where user_id in (select id from users where auth_user_id = auth.uid())));
create policy buyer_own_surveys on surveys for all using (respondent_id in (select id from respondents where user_id in (select id from users where auth_user_id = auth.uid())));
create policy buyer_own_product_responses on product_responses for all using (respondent_id in (select id from respondents where user_id in (select id from users where auth_user_id = auth.uid())));
create policy buyer_own_samples on sample_requests for all using (respondent_id in (select id from respondents where user_id in (select id from users where auth_user_id = auth.uid())));
create policy buyer_own_custom on custom_program_requests for all using (respondent_id in (select id from respondents where user_id in (select id from users where auth_user_id = auth.uid())));
