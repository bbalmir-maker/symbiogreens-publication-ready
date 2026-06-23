(function () {
  "use strict";

  function backend() {
    return window.SymbioBackend;
  }

  async function getSession() {
    const client = backend()?.getClient();
    if (!client) return null;
    const { data } = await client.auth.getSession();
    return data.session || null;
  }

  async function getCurrentUser() {
    const client = backend()?.getClient();
    if (!client) return null;
    const { data } = await client.auth.getUser();
    return data.user || null;
  }

  async function signUp(email, password, metadata = {}) {
    const client = backend()?.getClient();
    if (!client) throw new Error("Supabase is not configured.");
    return client.auth.signUp({ email, password, options: { data: metadata } });
  }

  async function login(email, password) {
    const client = backend()?.getClient();
    if (!client) throw new Error("Supabase is not configured.");
    return client.auth.signInWithPassword({ email, password });
  }

  async function logout(redirectTo) {
    const client = backend()?.getClient();
    if (client) await client.auth.signOut();
    if (redirectTo) window.location.href = redirectTo;
  }

  async function resetPassword(email, redirectTo) {
    const client = backend()?.getClient();
    if (!client) throw new Error("Supabase is not configured.");
    return client.auth.resetPasswordForEmail(email, { redirectTo });
  }

  async function requireLogin(redirectTo) {
    const session = await getSession();
    if (!session && redirectTo) window.location.href = redirectTo;
    return Boolean(session);
  }

  window.SymbioAuthGuard = {
    getSession,
    getCurrentUser,
    signUp,
    login,
    logout,
    resetPassword,
    requireLogin
  };
})();
