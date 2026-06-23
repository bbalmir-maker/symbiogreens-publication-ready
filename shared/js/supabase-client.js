(function () {
  "use strict";

  function readConfig() {
    const config = window.SYMBIO_SUPABASE_CONFIG || {};
    const env = window.__ENV__ || {};
    const url = config.VITE_SUPABASE_URL
      || config.SUPABASE_URL
      || config.supabaseUrl
      || window.VITE_SUPABASE_URL
      || window.SUPABASE_URL
      || env.VITE_SUPABASE_URL
      || env.SUPABASE_URL
      || "";
    const anonKey = config.VITE_SUPABASE_ANON_KEY
      || config.SUPABASE_ANON_KEY
      || config.supabaseAnonKey
      || window.VITE_SUPABASE_ANON_KEY
      || window.SUPABASE_ANON_KEY
      || env.VITE_SUPABASE_ANON_KEY
      || env.SUPABASE_ANON_KEY
      || "";
    return { url, anonKey };
  }

  function isConfigured() {
    const { url, anonKey } = readConfig();
    return Boolean(url && anonKey && window.supabase && typeof window.supabase.createClient === "function");
  }

  function getClient() {
    if (!isConfigured()) return null;
    const { url, anonKey } = readConfig();
    if (!window.SymbioSupabaseClient) {
      window.SymbioSupabaseClient = window.supabase.createClient(url, anonKey, {
        auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
      });
    }
    return window.SymbioSupabaseClient;
  }

  async function invoke(functionName, payload, options = {}) {
    const client = getClient();
    if (!client) return { data: null, error: new Error("Supabase is not configured."), disabled: true };
    return client.functions.invoke(functionName, {
      body: payload,
      method: options.method || "POST"
    });
  }

  window.SymbioBackend = {
    isConfigured,
    getClient,
    invoke,
    getConfig: readConfig,
    config: {
      get VITE_SUPABASE_URL() { return readConfig().url; },
      get VITE_SUPABASE_ANON_KEY() { return readConfig().anonKey ? "[configured]" : ""; }
    }
  };
})();
