# Backend Phase 1 Readiness Audit

Date: 2026-06-18

Source of truth: downloaded GitHub live version unpacked at `symbiogreens-publication-ready-main`.

Scope: Supabase readiness, survey backend, customer/buyer workflow, admin workflow, and investor/backend integration planning. The public website was not redesigned and runtime frontend behavior was not converted in this phase.

## Static Site Status

The current site is a static GitHub Pages-compatible application:

- `index.html` loads `styles.css`, `assets/js/investor-model-data.js`, `platform-data.js`, and `app.js`.
- No Supabase client script is loaded by default.
- `assets/js/supabase-config.example.js` is an example file only and remains disabled.
- The app remains functional through in-browser rendering, static assets, hash routes, static catalog data, and `localStorage` prototype persistence.

## Backend-Touching Frontend Map

| Flow | Current behavior | Files/functions | Supabase target |
| --- | --- | --- | --- |
| Public contact form | Stores messages in `localStorage` under `sg_platform_contact_inquiries`; logs local email preview rows. | `app.js`: `contactCompactPanel`, `contactFullPanel`, `submitContact`, `notifyInternal`, `logEmail` | `contact_messages`, optional email/CRM edge function |
| Buyer/customer survey | Buyer selects product interest drafts by category, then submits category/all survey into local survey/response/sample arrays. | `app.js`: `buyerCatalog`, `productSurveyCard`, `saveDraft`, `submitSurvey` | `survey_responses`, `product_interest`, buyer-owned records |
| Product interest capture | Modal saves one product interest locally as draft; has a safe disabled Supabase insert hook when explicitly enabled. | `app.js`: `productInterestPayload`, `saveProductInterest`, `saveSurveyProductFromModal`, `hasSavedInterest` | `product_interest` |
| Product detail modal | Public product modal is static/catalog driven and routes unauthenticated users to registration before survey. | `app.js`: `openProduct`, `productById`, `productName`, `detailImageFor` | Optional product view analytics later; no required Phase 1 write |
| Survey product modal | Authenticated buyer modal collects interest level, quantity, frequency, packaging, sample request, and notes into local drafts. | `app.js`: `openSurveyProduct`, `saveSurveyProductFromModal`, `removeDraft` | `product_interest`, `survey_responses` |
| Customer login/demo workflow | Demo buyer registration stores password hashes and session in `localStorage`; password reset generates visible local codes. | `app.js`: `registerBuyer`, `loginBuyer`, `requestReset`, `resetPassword`, `passwordMatches`, `hashText` | Supabase Auth, `profiles`, `buyers`, `buyer_profiles` |
| Customer dashboard | Reads current respondent from local session and shows static catalog/survey controls. | `app.js`: `buyerDashboard`, `currentRespondent`, `productsPanel` | Auth session plus buyer-owned records |
| Saved product interests | Uses `sg_platform_drafts` keyed by `respondent_id:product_id`; not shared across devices. | `app.js`: `draftKey`, `getDraft`, `saveDraft`, `removeDraft`, `hasSavedInterest` | `product_interest` rows with draft/submitted status or `survey_responses.responses` JSON |
| Investor prequalification form | Stores investor submissions in `sg_platform_investor_requests`; same submit handler is used for investor and partner tracks. | `app.js`: `investorInterestForm`, `partnerInterestForm`, `submitInvestor` | `investor_prequalification`, `partner_submissions` |
| Investor/partner interest workflow | Track selector is client state; private investor routes are placeholders only. | `app.js`: `investorsPanel`, `investorPrivatePlaceholderPanel`, `investorReviewPanel` | `investor_users`, `investor_interest`, private storage, document access logs |
| Admin/manager placeholders | Manager passphrase is local only; dashboard reads local buyer, survey, sample, email, and investor arrays; exports local CSV/XLS. | `app.js`: `managerRoute`, `managerLoginPanel`, `loginManager`, `managerDashboard`, `managerContent`, `adminStatsPanel`, `usersAdmin`, `manageUser`, `exportCsv`, `exportWorkbook` | Admin Auth/RLS, `admin_notes`, table review queues, role-based dashboard |
| Team/executive data | Founder/executive content is hardcoded in `app.js`; images are static assets. | `app.js`: `FOUNDER_PROFILE`, `executiveLeadershipCards`, `executiveProfiles`, `openExecutiveProfile`; docs: `team-update-guide.md` | `team_members` for controlled content management |
| Product/catalog data | Static catalog is duplicated in `platform-data.js` and `data/products.json` / `data/categories.json`; overrides are local only. | `platform-data.js`, `data/products.json`, `data/categories.json`, `app.js`: `platformData`, `products`, `categories`, `override`, `productOverrides` | Keep static for GitHub Pages now; optional future product/category tables or Supabase Storage/CMS |
| Language/translations | Language preference is saved to `localStorage`; form labels/dashboard strings are defined in `I18N` and runtime translation maps. | `app.js`: `storeKeys.language`, `I18N`, `RUNTIME_TRANSLATIONS`, `t`, `applyRuntimeTranslations`, `translateText` | `profiles.locale`, `buyer_profiles.preferred_language`; keep static translations until CMS phase |

## Existing Store Keys That Need Backend Equivalents

| Store key | Meaning | Backend destination |
| --- | --- | --- |
| `sg_platform_session` | Demo buyer/manager session | Supabase Auth session |
| `sg_platform_language` | Preferred UI language | `profiles.locale`, `buyer_profiles.preferred_language` |
| `sg_platform_respondents` | Buyer contact/person records | `buyers`, `profiles` |
| `sg_platform_businesses` | Buyer business records | `buyers`, `buyer_profiles` |
| `sg_platform_drafts` | Per-product buyer survey drafts | `product_interest` draft rows or `survey_responses.responses` JSON |
| `sg_platform_surveys` | Submitted survey headers | `survey_responses` |
| `sg_platform_product_responses` | Submitted product demand responses | `product_interest`, `survey_responses.responses` |
| `sg_platform_sample_requests` | Sample request subset | `product_interest.sample_requested` and admin workflow status |
| `sg_platform_custom_program_requests` | Reserved custom program flow | Future extension of `survey_responses` or product interest metadata |
| `sg_platform_email_logs` | Local preview email queue | Supabase Edge Function/email provider logs, optional future `email_logs` |
| `sg_platform_lead_notes` | Reserved manager notes | `admin_notes` |
| `sg_platform_password_resets` | Demo reset codes | Supabase Auth password reset |
| `sg_platform_product_overrides` | Local product edits | Future product CMS table or static data review workflow |
| `sg_platform_manager_passphrase_hash` | Local manager login secret | Supabase Auth roles; remove after migration |
| `sg_platform_contact_inquiries` | Public contact form submissions | `contact_messages` |
| `sg_platform_investor_requests` | Investor and partner submissions | `investor_prequalification`, `partner_submissions` |
| `sg_platform_investor_feedback` | Reserved investor feedback | `investor_interest` or `investor_admin_notes` depending ownership |

## Static/Demo Workflows To Preserve Until Cutover

- Public site routes and navigation.
- Product catalog and product detail modals.
- Buyer registration/login prototype.
- Buyer dashboard and product survey.
- Product interest modal persistence through `localStorage`.
- Manager dashboard prototype and exports.
- Investor/partner public forms and private placeholder routes.
- Language toggle and all static translations.

## Supabase-Ready But Not Enabled

- `app.js:saveProductInterest` already checks `window.SYMBIOGREENS_SUPABASE_ENABLED === true` before inserting into `product_interest`.
- `assets/js/supabase-config.example.js` now uses placeholder names only: `SUPABASE_URL` and `SUPABASE_ANON_KEY`.
- `docs/supabase-schema-draft.sql` defines the requested Phase 1 table set and draft RLS policies.

## Risk Notes

- Demo password hashes and manager passphrase are not production authentication.
- Public forms currently rely on local browser data and do not notify a real backend.
- Static private investor routes do not protect confidential materials.
- Product/catalog data is large and static; moving it into Supabase should be a later content-management phase unless live editing is required.
- `INTERNAL_NOTIFICATION_RECIPIENTS` in `app.js` only creates local email log rows; it does not send email.

## Files To Modify In Next Phase

- `index.html` - optionally load Supabase JS and an untracked runtime config only after RLS is applied.
- `app.js` - add a small data adapter, replace auth/demo login flow, persist contact/investor/survey data, and keep `localStorage` fallback.
- `assets/js/supabase-config.example.js` - keep as template; create an ignored local config outside committed code for real projects.
- `docs/supabase-schema-draft.sql` - apply/test in Supabase branch, then split into migrations.
- `database/schema.sql` and `database/rls-policies.sql` - optionally align with Phase 1 schema once reviewed.
- `docs/supabase-integration-plan.md` - update after implementation decisions.
- `docs/investor-access-flow.md` - expand once private document storage/invitations are designed.
- `docs/team-update-guide.md` - update when `team_members` becomes the content source.
