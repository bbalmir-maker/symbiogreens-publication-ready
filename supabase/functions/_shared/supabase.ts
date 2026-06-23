import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

export function getServiceClient() {
  const url = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !serviceKey) throw new Error("Missing Supabase server environment variables.");
  return createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false }
  });
}

export async function getCallerUser(request) {
  const url = Deno.env.get("SUPABASE_URL");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
  if (!url || !anonKey) return null;
  const authHeader = request.headers.get("Authorization") || "";
  if (!authHeader) return null;
  const client = createClient(url, anonKey, {
    global: { headers: { Authorization: authHeader } },
    auth: { persistSession: false, autoRefreshToken: false }
  });
  const { data, error } = await client.auth.getUser();
  if (error) return null;
  return data.user || null;
}

export async function requireAdmin(request, serviceClient) {
  const user = await getCallerUser(request);
  if (!user) return { ok: false, status: 401, error: "Authentication required." };

  const { data: profile, error } = await serviceClient
    .from("profiles")
    .select("id, auth_user_id, email, role, status")
    .eq("auth_user_id", user.id)
    .maybeSingle();

  if (error) return { ok: false, status: 500, error: error.message };
  if (!profile || profile.role !== "admin" || profile.status !== "approved") {
    return { ok: false, status: 403, error: "Approved admin access required." };
  }

  return { ok: true, user, profile };
}
