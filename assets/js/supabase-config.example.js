// SymbioGreens Supabase config example.
// Copy this file to a local, untracked config file only when Supabase is ready.
// Keep the public static site functional when this file is not loaded.
// Never put a service-role key or any secret in frontend code.

window.SYMBIOGREENS_SUPABASE_CONFIG = {
  SUPABASE_URL: "SUPABASE_URL",
  SUPABASE_ANON_KEY: "SUPABASE_ANON_KEY",
  enabled: false,
  features: {
    SUPABASE_ENABLED: false,
    CONTACT_FORM_ENABLED: false,
    BUYER_SURVEY_ENABLED: false,
    PRODUCT_INTEREST_ENABLED: false,
    AUTH_ENABLED: false,
    ADMIN_ENABLED: false,
    BUYER_DASHBOARD_ENABLED: false,
    INVESTOR_PORTAL_ENABLED: false
  }
};

window.SYMBIOGREENS_SUPABASE_ENABLED = false;
