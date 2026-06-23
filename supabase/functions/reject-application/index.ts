import { handleOptions, jsonResponse } from "../_shared/cors.ts";
import { getServiceClient, requireAdmin } from "../_shared/supabase.ts";
import { applyDecision } from "../_shared/approval.ts";

Deno.serve(async (request) => {
  const options = handleOptions(request);
  if (options) return options;
  if (request.method !== "POST") return jsonResponse({ error: "Method not allowed." }, 405);

  try {
    const serviceClient = getServiceClient();
    const admin = await requireAdmin(request, serviceClient);
    if (!admin.ok) return jsonResponse({ error: admin.error }, admin.status);
    const body = await request.json().catch(() => ({}));
    if (!body.applicationId) return jsonResponse({ error: "applicationId is required." }, 400);
    const result = await applyDecision({
      serviceClient,
      adminUserId: admin.user.id,
      applicationId: body.applicationId,
      status: "rejected",
      decisionNotes: body.decisionNotes || ""
    });
    return jsonResponse(result, result.ok === false ? result.status || 400 : 200);
  } catch (error) {
    return jsonResponse({ error: error.message || "Rejection failed." }, 500);
  }
});
