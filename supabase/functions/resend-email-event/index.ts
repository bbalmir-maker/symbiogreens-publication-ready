import { handleOptions, jsonResponse } from "../_shared/cors.ts";
import { getServiceClient, requireAdmin } from "../_shared/supabase.ts";
import { sendEmail } from "../_shared/email.ts";

Deno.serve(async (request) => {
  const options = handleOptions(request);
  if (options) return options;
  if (request.method !== "POST") return jsonResponse({ error: "Method not allowed." }, 405);

  try {
    const serviceClient = getServiceClient();
    const admin = await requireAdmin(request, serviceClient);
    if (!admin.ok) return jsonResponse({ error: admin.error }, admin.status);
    const body = await request.json().catch(() => ({}));
    if (!body.emailEventId) return jsonResponse({ error: "emailEventId is required." }, 400);

    const { data: event, error: eventError } = await serviceClient
      .from("email_events")
      .select("*, applications(*)")
      .eq("id", body.emailEventId)
      .maybeSingle();
    if (eventError) throw eventError;
    if (!event || !event.applications) return jsonResponse({ error: "Email event or application not found." }, 404);

    const result = await sendEmail({
      to: event.recipient_email,
      type: event.email_type,
      application: event.applications,
      serviceClient
    });
    return jsonResponse({ success: result.ok, result });
  } catch (error) {
    return jsonResponse({ error: error.message || "Email retry failed." }, 500);
  }
});
