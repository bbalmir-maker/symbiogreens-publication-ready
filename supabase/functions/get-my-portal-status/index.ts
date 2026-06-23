import { handleOptions, jsonResponse } from "../_shared/cors.ts";
import { getCallerUser, getServiceClient } from "../_shared/supabase.ts";

Deno.serve(async (request) => {
  const options = handleOptions(request);
  if (options) return options;

  try {
    const user = await getCallerUser(request);
    if (!user) return jsonResponse({ authenticated: false, status: "unauthenticated" }, 401);
    const serviceClient = getServiceClient();
    const { data: profile, error } = await serviceClient
      .from("profiles")
      .select("*")
      .eq("auth_user_id", user.id)
      .maybeSingle();
    if (error) throw error;
    if (!profile) return jsonResponse({ authenticated: true, status: "no_profile", role: null, permittedPortal: null });

    const { data: application } = await serviceClient
      .from("applications")
      .select("id, portal_type, status, review_notes, created_at")
      .eq("profile_id", profile.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    return jsonResponse({
      authenticated: true,
      profile,
      role: profile.role,
      status: profile.status,
      permittedPortal: profile.status === "approved" ? profile.role : null,
      application
    });
  } catch (error) {
    return jsonResponse({ error: error.message || "Unable to load portal status." }, 500);
  }
});
