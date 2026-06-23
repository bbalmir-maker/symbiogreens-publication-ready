import { handleOptions, jsonResponse } from "../_shared/cors.ts";
import { getServiceClient, requireAdmin } from "../_shared/supabase.ts";

Deno.serve(async (request) => {
  const options = handleOptions(request);
  if (options) return options;

  try {
    const serviceClient = getServiceClient();
    const admin = await requireAdmin(request, serviceClient);
    if (!admin.ok) return jsonResponse({ error: admin.error }, admin.status);
    const url = new URL(request.url);
    const body = request.method === "POST" ? await request.json().catch(() => ({})) : {};
    const status = body.status || url.searchParams.get("status");
    const portalType = body.portalType || url.searchParams.get("portalType");

    let query = serviceClient
      .from("applications")
      .select("*, profiles(id, email, role, status), approval_events(*), email_events(*)")
      .order("created_at", { ascending: false });

    if (status) query = query.eq("status", status);
    if (portalType) query = query.eq("portal_type", portalType);

    const { data, error } = await query;
    if (error) throw error;
    return jsonResponse({ success: true, applications: data || [] });
  } catch (error) {
    return jsonResponse({ error: error.message || "Unable to load applications." }, 500);
  }
});
