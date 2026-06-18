(function () {
  const PLACEHOLDER_VALUES = new Set([
    "",
    "SUPABASE_URL",
    "SUPABASE_ANON_KEY",
    "YOUR_SUPABASE_URL",
    "YOUR_SUPABASE_ANON_KEY",
    "https://YOUR_PROJECT.supabase.co",
    "YOUR_PUBLIC_ANON_KEY"
  ]);

  let clientPromise = null;

  const DEFAULT_FEATURE_FLAGS = {
    SUPABASE_ENABLED: false,
    CONTACT_FORM_ENABLED: false,
    BUYER_SURVEY_ENABLED: false,
    PRODUCT_INTEREST_ENABLED: false,
    AUTH_ENABLED: false,
    ADMIN_ENABLED: false,
    BUYER_DASHBOARD_ENABLED: false,
    INVESTOR_PORTAL_ENABLED: false
  };

  const TABLE_COLUMNS = {
    contact_messages: [
      "name", "email", "phone", "company", "region", "inquiry_type", "organization_type",
      "message", "status", "language", "source_page", "metadata", "created_at"
    ],
    survey_responses: [
      "buyer_id", "profile_id", "category_id", "category_label", "response_scope", "responses",
      "status", "submitted_at", "language", "source_page", "metadata", "created_at"
    ],
    buyer_profiles: [
      "buyer_id", "profile_id", "sourcing_needs", "delivery_region", "delivery_frequency",
      "preferred_language", "preferred_contact_method", "packaging_preferences",
      "sample_program_interest", "custom_program_interest", "metadata", "created_at"
    ],
    product_interest: [
      "buyer_id", "profile_id", "survey_response_id", "product_id", "product_name", "category_id",
      "category", "interest_level", "quantity_estimate", "estimated_quantity", "delivery_frequency",
      "preferred_delivery_frequency", "sample_request", "sample_requested", "packaging_preference",
      "packaging_preferences", "notes", "source", "language", "source_page", "metadata", "created_at"
    ],
    investor_prequalification: [
      "full_name", "company", "email", "phone", "country_city", "website", "inquiry_type",
      "investor_type", "investment_area", "investment_capacity", "investment_style",
      "sector_background", "why_interested", "expectations", "resources_relationships",
      "review_consent", "status", "approved_access", "language", "source_page", "metadata", "created_at"
    ],
    partner_submissions: [
      "full_name", "organization", "email", "phone", "partner_type", "target_market",
      "local_opportunity", "buyers", "contributions", "capital_readiness", "timeline",
      "partnership_vision", "role_in_project", "strategic_alignment", "review_consent",
      "status", "language", "source_page", "metadata", "created_at"
    ],
    admin_notes: [
      "related_table", "related_id", "admin_id", "note", "note_type", "created_at"
    ],
    investor_potential_commitments: [
      "investor_user_id", "investor_interest_id", "amount_min", "amount_max", "currency",
      "commitment_type", "non_binding", "notes", "status", "created_at"
    ],
    investor_calculator_sessions: [
      "investor_user_id", "scenario_name", "inputs", "outputs", "is_saved", "created_at"
    ],
    investor_document_access: [
      "investor_user_id", "document_key", "document_title", "access_action", "ip_address",
      "user_agent", "created_at"
    ]
  };

  function normalizeConfig() {
    const config = window.SYMBIOGREENS_SUPABASE_CONFIG || {};
    const url = config.SUPABASE_URL || config.supabaseUrl || window.SUPABASE_URL || "";
    const anonKey = config.SUPABASE_ANON_KEY || config.supabaseAnonKey || window.SUPABASE_ANON_KEY || "";
    const features = {
      ...DEFAULT_FEATURE_FLAGS,
      ...(config.features || {}),
      ...(window.SYMBIOGREENS_BACKEND_FEATURES || {})
    };
    const enabled = config.enabled === true || features.SUPABASE_ENABLED === true || window.SYMBIOGREENS_SUPABASE_ENABLED === true;
    return { url: String(url).trim(), anonKey: String(anonKey).trim(), enabled, features };
  }

  function hasValidConfig() {
    const { url, anonKey, enabled } = normalizeConfig();
    return Boolean(
      enabled &&
      url &&
      anonKey &&
      !PLACEHOLDER_VALUES.has(url) &&
      !PLACEHOLDER_VALUES.has(anonKey) &&
      /^https:\/\/[a-z0-9.-]+\.supabase\.co$/i.test(url)
    );
  }

  function isBackendEnabled() {
    return hasValidConfig();
  }

  function isFeatureEnabled(name) {
    const { features } = normalizeConfig();
    if (!hasValidConfig()) return false;
    return features[name] === true;
  }

  function loadSupabaseScript() {
    if (window.supabase?.createClient) return Promise.resolve(window.supabase);
    if (window.SYMBIOGREENS_SUPABASE_CONFIG?.loadClient === false) return Promise.resolve(null);
    return new Promise((resolve) => {
      const existing = document.querySelector('script[data-symbiogreens-supabase-client]');
      if (existing) {
        existing.addEventListener("load", () => resolve(window.supabase || null), { once: true });
        existing.addEventListener("error", () => resolve(null), { once: true });
        return;
      }
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
      script.async = true;
      script.defer = true;
      script.setAttribute("data-symbiogreens-supabase-client", "true");
      script.onload = () => resolve(window.supabase || null);
      script.onerror = () => resolve(null);
      document.head.appendChild(script);
    });
  }

  async function getClient() {
    if (!hasValidConfig()) return null;
    if (window.supabaseClient?.from) return window.supabaseClient;
    if (clientPromise) return clientPromise;
    clientPromise = (async () => {
      const library = await loadSupabaseScript();
      if (!library?.createClient) return null;
      const { url, anonKey } = normalizeConfig();
      const client = library.createClient(url, anonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true
        }
      });
      window.supabaseClient = client;
      return client;
    })();
    return clientPromise;
  }

  function cleanPayload(payload) {
    return Object.fromEntries(
      Object.entries(payload || {}).filter(([, value]) => value !== undefined)
    );
  }

  function normalizeBoolean(value) {
    if (typeof value === "boolean") return value;
    return ["yes", "true", "1", "on"].includes(String(value || "").toLowerCase());
  }

  function normalizeStatus(value, fallback = "new") {
    return String(value || fallback).trim().toLowerCase().replace(/\s+/g, "_");
  }

  function normalizeTablePayload(table, payload) {
    const row = cleanPayload(payload);
    if (table === "contact_messages") {
      row.status = normalizeStatus(row.status, "new");
    }
    if (table === "investor_prequalification") {
      row.review_consent = normalizeBoolean(row.review_consent);
      row.approved_access = normalizeBoolean(row.approved_access);
      row.status = normalizeStatus(row.status, "new");
    }
    if (table === "partner_submissions") {
      row.organization = row.organization || row.company;
      row.review_consent = normalizeBoolean(row.review_consent);
      row.status = normalizeStatus(row.status, "new");
    }
    if (table === "product_interest") {
      row.sample_request = normalizeBoolean(row.sample_request);
      row.sample_requested = normalizeBoolean(row.sample_requested);
      row.source = row.source || "product_interest";
    }
    if (table === "buyer_profiles") {
      row.sample_program_interest = normalizeBoolean(row.sample_program_interest);
      row.custom_program_interest = normalizeBoolean(row.custom_program_interest);
    }
    if (table === "investor_potential_commitments") {
      row.non_binding = row.non_binding === undefined ? true : normalizeBoolean(row.non_binding);
      row.status = normalizeStatus(row.status, "draft");
    }
    if (table === "investor_calculator_sessions") {
      row.is_saved = normalizeBoolean(row.is_saved);
    }
    const allowed = TABLE_COLUMNS[table];
    if (!allowed) return row;
    return Object.fromEntries(Object.entries(row).filter(([key]) => allowed.includes(key)));
  }

  async function insertRow(table, payload) {
    const client = await getClient();
    if (!client?.from) {
      return { ok: false, backend: "local", data: null, error: null, skipped: true };
    }
    try {
      const { data, error } = await client.from(table).insert([normalizeTablePayload(table, payload)]);
      if (error) return { ok: false, backend: "supabase", data: null, error };
      return { ok: true, backend: "supabase", data, error: null };
    } catch (error) {
      return { ok: false, backend: "supabase", data: null, error };
    }
  }

  async function selectRows(table, options = {}) {
    const client = await getClient();
    if (!client?.from) {
      return { ok: false, backend: "local", data: [], error: null, skipped: true };
    }
    try {
      let query = client.from(table).select(options.columns || "*");
      if (options.eq) {
        Object.entries(options.eq).forEach(([column, value]) => {
          query = query.eq(column, value);
        });
      }
      if (options.order) query = query.order(options.order.column, { ascending: options.order.ascending !== false });
      if (options.limit) query = query.limit(options.limit);
      const { data, error } = await query;
      if (error) return { ok: false, backend: "supabase", data: [], error };
      return { ok: true, backend: "supabase", data: data || [], error: null };
    } catch (error) {
      return { ok: false, backend: "supabase", data: [], error };
    }
  }

  async function updateRows(table, match, patch) {
    const client = await getClient();
    if (!client?.from) {
      return { ok: false, backend: "local", data: null, error: null, skipped: true };
    }
    try {
      let query = client.from(table).update(cleanPayload(patch));
      Object.entries(match || {}).forEach(([column, value]) => {
        query = query.eq(column, value);
      });
      const { data, error } = await query;
      if (error) return { ok: false, backend: "supabase", data: null, error };
      return { ok: true, backend: "supabase", data, error: null };
    } catch (error) {
      return { ok: false, backend: "supabase", data: null, error };
    }
  }

  function currentLanguage() {
    return document.documentElement.lang || window.localStorage?.getItem("sg_platform_language")?.replaceAll('"', "") || "en";
  }

  function withDefaults(payload, source) {
    return cleanPayload({
      ...payload,
      language: payload?.language || currentLanguage(),
      source_page: payload?.source_page || window.location.hash || "#home",
      created_at: payload?.created_at || new Date().toISOString(),
      metadata: payload?.metadata
    });
  }

  function saveContactMessage(payload) {
    if (!isFeatureEnabled("CONTACT_FORM_ENABLED")) return Promise.resolve({ ok: false, backend: "local", data: null, error: null, skipped: true });
    return insertRow("contact_messages", withDefaults(payload, "contact"));
  }

  function saveBuyerSurvey(payload) {
    if (!isFeatureEnabled("BUYER_SURVEY_ENABLED")) return Promise.resolve({ ok: false, backend: "local", data: null, error: null, skipped: true });
    return insertRow("survey_responses", withDefaults(payload, "buyer_survey"));
  }

  function saveProductInterest(payload) {
    if (!isFeatureEnabled("PRODUCT_INTEREST_ENABLED")) return Promise.resolve({ ok: false, backend: "local", data: null, error: null, skipped: true });
    return insertRow("product_interest", withDefaults(payload, "product_interest"));
  }

  function saveInvestorPrequalification(payload) {
    if (!isFeatureEnabled("INVESTOR_PORTAL_ENABLED")) return Promise.resolve({ ok: false, backend: "local", data: null, error: null, skipped: true });
    const table = payload?.inquiry_type === "Strategic Partner" ? "partner_submissions" : "investor_prequalification";
    return insertRow(table, withDefaults(payload, "investor_prequalification"));
  }

  async function getCurrentUser() {
    const client = await getClient();
    if (!client?.auth?.getUser) return { user: null, backend: "local" };
    try {
      const { data, error } = await client.auth.getUser();
      return { user: data?.user || null, error: error || null, backend: "supabase" };
    } catch (error) {
      return { user: null, error, backend: "supabase" };
    }
  }

  async function signIn(email, password) {
    if (!isFeatureEnabled("AUTH_ENABLED")) return { ok: false, backend: "local", user: null, skipped: true };
    const client = await getClient();
    if (!client?.auth?.signInWithPassword) return { ok: false, backend: "local", user: null, skipped: true };
    try {
      const { data, error } = await client.auth.signInWithPassword({ email, password });
      if (error) return { ok: false, backend: "supabase", user: null, error };
      return { ok: true, backend: "supabase", user: data?.user || null, session: data?.session || null, error: null };
    } catch (error) {
      return { ok: false, backend: "supabase", user: null, error };
    }
  }

  async function registerBuyerAccount(payload) {
    if (!isFeatureEnabled("AUTH_ENABLED")) return { ok: false, backend: "local", user: null, skipped: true };
    const client = await getClient();
    if (!client?.auth?.signUp) return { ok: false, backend: "local", user: null, skipped: true };
    try {
      const { data, error } = await client.auth.signUp({
        email: payload.email,
        password: payload.password,
        options: { data: { role: "buyer", full_name: payload.full_name || "" } }
      });
      if (error) return { ok: false, backend: "supabase", user: null, error };
      return { ok: true, backend: "supabase", user: data?.user || null, session: data?.session || null, error: null };
    } catch (error) {
      return { ok: false, backend: "supabase", user: null, error };
    }
  }

  async function signOut() {
    if (!isFeatureEnabled("AUTH_ENABLED")) return { ok: false, backend: "local", skipped: true };
    const client = await getClient();
    if (!client?.auth?.signOut) return { ok: false, backend: "local", skipped: true };
    try {
      const { error } = await client.auth.signOut();
      if (error) return { ok: false, backend: "supabase", error };
      return { ok: true, backend: "supabase", error: null };
    } catch (error) {
      return { ok: false, backend: "supabase", error };
    }
  }

  async function requestPasswordReset(email, redirectTo) {
    if (!isFeatureEnabled("AUTH_ENABLED")) return { ok: false, backend: "local", skipped: true };
    const client = await getClient();
    if (!client?.auth?.resetPasswordForEmail) return { ok: false, backend: "local", skipped: true };
    try {
      const { error } = await client.auth.resetPasswordForEmail(email, redirectTo ? { redirectTo } : undefined);
      if (error) return { ok: false, backend: "supabase", error };
      return { ok: true, backend: "supabase", error: null };
    } catch (error) {
      return { ok: false, backend: "supabase", error };
    }
  }

  function listAdminQueue(kind, options = {}) {
    if (!isFeatureEnabled("ADMIN_ENABLED")) return Promise.resolve({ ok: false, backend: "local", data: [], skipped: true });
    const tableMap = {
      contacts: "contact_messages",
      surveys: "survey_responses",
      productInterest: "product_interest",
      investors: "investor_prequalification",
      partners: "partner_submissions",
      notes: "admin_notes",
      team: "team_members",
      documentAccess: "investor_document_access"
    };
    const table = tableMap[kind];
    if (!table) return Promise.resolve({ ok: false, backend: "local", data: [], error: new Error("Unknown admin queue"), skipped: true });
    return selectRows(table, { order: { column: options.orderBy || "created_at", ascending: false }, limit: options.limit || 100 });
  }

  function updateAdminStatus(table, id, patch) {
    if (!isFeatureEnabled("ADMIN_ENABLED")) return Promise.resolve({ ok: false, backend: "local", skipped: true });
    return updateRows(table, { id }, patch);
  }

  function createAdminNote(payload) {
    if (!isFeatureEnabled("ADMIN_ENABLED")) return Promise.resolve({ ok: false, backend: "local", skipped: true });
    return insertRow("admin_notes", withDefaults(payload, "admin_note"));
  }

  function saveBuyerProfile(payload) {
    if (!isFeatureEnabled("BUYER_DASHBOARD_ENABLED")) return Promise.resolve({ ok: false, backend: "local", skipped: true });
    return insertRow("buyer_profiles", withDefaults(payload, "buyer_profile"));
  }

  function getBuyerProductInterests(profileId) {
    if (!isFeatureEnabled("BUYER_DASHBOARD_ENABLED")) return Promise.resolve({ ok: false, backend: "local", data: [], skipped: true });
    return selectRows("product_interest", { eq: { profile_id: profileId }, order: { column: "created_at", ascending: false } });
  }

  function getBuyerSurveyHistory(profileId) {
    if (!isFeatureEnabled("BUYER_DASHBOARD_ENABLED")) return Promise.resolve({ ok: false, backend: "local", data: [], skipped: true });
    return selectRows("survey_responses", { eq: { profile_id: profileId }, order: { column: "created_at", ascending: false } });
  }

  function getInvestorDashboard(investorUserId) {
    if (!isFeatureEnabled("INVESTOR_PORTAL_ENABLED")) return Promise.resolve({ ok: false, backend: "local", data: null, skipped: true });
    return Promise.all([
      selectRows("investor_interest", { eq: { investor_user_id: investorUserId } }),
      selectRows("investor_potential_commitments", { eq: { investor_user_id: investorUserId } }),
      selectRows("investor_calculator_sessions", { eq: { investor_user_id: investorUserId } }),
      selectRows("investor_document_access", { eq: { investor_user_id: investorUserId }, order: { column: "created_at", ascending: false } })
    ]).then(([interest, commitments, calculatorSessions, documentAccess]) => ({
      ok: [interest, commitments, calculatorSessions, documentAccess].every(result => result.ok),
      backend: "supabase",
      data: {
        interest: interest.data || [],
        commitments: commitments.data || [],
        calculatorSessions: calculatorSessions.data || [],
        documentAccess: documentAccess.data || []
      },
      error: interest.error || commitments.error || calculatorSessions.error || documentAccess.error || null
    }));
  }

  function saveInvestorCalculatorSession(payload) {
    if (!isFeatureEnabled("INVESTOR_PORTAL_ENABLED")) return Promise.resolve({ ok: false, backend: "local", skipped: true });
    return insertRow("investor_calculator_sessions", withDefaults(payload, "investor_calculator"));
  }

  function saveInvestorPotentialCommitment(payload) {
    if (!isFeatureEnabled("INVESTOR_PORTAL_ENABLED")) return Promise.resolve({ ok: false, backend: "local", skipped: true });
    return insertRow("investor_potential_commitments", withDefaults(payload, "investor_commitment"));
  }

  function logInvestorDocumentAccess(payload) {
    if (!isFeatureEnabled("INVESTOR_PORTAL_ENABLED")) return Promise.resolve({ ok: false, backend: "local", skipped: true });
    return insertRow("investor_document_access", withDefaults(payload, "investor_document_access"));
  }

  window.SymbioGreensBackend = {
    isBackendEnabled,
    isFeatureEnabled,
    getCurrentUser,
    saveContactMessage,
    saveBuyerSurvey,
    saveProductInterest,
    saveInvestorPrequalification,
    auth: {
      signIn,
      signOut,
      registerBuyerAccount,
      requestPasswordReset
    },
    admin: {
      listAdminQueue,
      updateAdminStatus,
      createAdminNote
    },
    buyer: {
      saveBuyerProfile,
      getBuyerProductInterests,
      getBuyerSurveyHistory
    },
    investor: {
      getInvestorDashboard,
      saveInvestorCalculatorSession,
      saveInvestorPotentialCommitment,
      logInvestorDocumentAccess
    }
  };
})();
