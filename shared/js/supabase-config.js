// Frontend-safe runtime config placeholder.
// Production may fill only VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.
// SUPABASE_URL and SUPABASE_ANON_KEY are kept as static-host aliases.
// Never put service-role keys, Resend keys, database passwords, or private secrets here.
{
  const existing = window.SYMBIO_SUPABASE_CONFIG || {};
  window.SYMBIO_SUPABASE_CONFIG = {
    ...existing,
    VITE_SUPABASE_URL: existing.VITE_SUPABASE_URL || existing.SUPABASE_URL || "https://eaoesnwfmhpbfezsyviz.supabase.co",
    VITE_SUPABASE_ANON_KEY: existing.VITE_SUPABASE_ANON_KEY || existing.SUPABASE_ANON_KEY || "sb_publishable_577Ku7UWJnNTP_KJFPj9wQ_QxgeIb0h",
    SUPABASE_URL: existing.SUPABASE_URL || existing.VITE_SUPABASE_URL || "https://eaoesnwfmhpbfezsyviz.supabase.co",
    SUPABASE_ANON_KEY: existing.SUPABASE_ANON_KEY || existing.VITE_SUPABASE_ANON_KEY || "sb_publishable_577Ku7UWJnNTP_KJFPj9wQ_QxgeIb0h"
  };
}
