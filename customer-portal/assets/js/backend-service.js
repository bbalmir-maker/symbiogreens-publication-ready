(function () {
  "use strict";

  const disabled = {
    enabled: false,
    reason: "Supabase is not configured for this static customer portal preview."
  };

  function isBackendEnabled() {
    return Boolean(window.SymbioGreensBackendConfig?.SUPABASE_URL && window.SymbioGreensBackendConfig?.SUPABASE_ANON_KEY && window.supabase);
  }

  async function saveCustomerInterest(payload) {
    if (!isBackendEnabled()) return {...disabled, payload};
    try {
      const client = window.supabase.createClient(
        window.SymbioGreensBackendConfig.SUPABASE_URL,
        window.SymbioGreensBackendConfig.SUPABASE_ANON_KEY
      );
      const {error} = await client.from("survey_responses").insert(payload);
      if (error) throw error;
      return {enabled: true, saved: true};
    } catch (error) {
      return {enabled: false, saved: false, error: error.message, payload};
    }
  }

  async function saveProductInterest(payload) {
    if (!isBackendEnabled()) return {...disabled, payload};
    try {
      const client = window.supabase.createClient(
        window.SymbioGreensBackendConfig.SUPABASE_URL,
        window.SymbioGreensBackendConfig.SUPABASE_ANON_KEY
      );
      const {error} = await client.from("product_interest").insert(payload);
      if (error) throw error;
      return {enabled: true, saved: true};
    } catch (error) {
      return {enabled: false, saved: false, error: error.message, payload};
    }
  }

  window.SymbioGreensCustomerBackend = {
    isBackendEnabled,
    saveCustomerInterest,
    saveProductInterest,
    getCurrentUser: () => null
  };
})();
