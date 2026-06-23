import { handleOptions, jsonResponse } from "../_shared/cors.ts";
import { getCallerUser, getServiceClient } from "../_shared/supabase.ts";
import { cleanText, normalizeEmail, portalRole, sendEmail } from "../_shared/email.ts";

Deno.serve(async (request) => {
  const options = handleOptions(request);
  if (options) return options;
  if (request.method !== "POST") return jsonResponse({ error: "Method not allowed." }, 405);

  try {
    const serviceClient = getServiceClient();
    const user = await getCallerUser(request);
    const body = await request.json().catch(() => ({}));
    const portalType = normalizePortal(body.portalType);
    const email = normalizeEmail(body.email);
    const fullName = cleanText(body.fullName);

    if (!fullName || !email || !portalType) {
      return jsonResponse({ error: "Full name, email, and portal type are required." }, 400);
    }

    let profileId = null;
    if (user) {
      const role = portalRole(portalType, body.roleRequested);
      const { data: profile, error: profileError } = await serviceClient
        .from("profiles")
        .upsert({
          auth_user_id: user.id,
          email,
          full_name: fullName,
          role,
          status: "pending",
          company_name: cleanText(body.companyName) || null,
          phone: cleanText(body.phone) || null,
          country: cleanText(body.country) || null,
          city: cleanText(body.city) || null,
          metadata: body.submittedData || {}
        }, { onConflict: "auth_user_id" })
        .select("id")
        .single();
      if (profileError) throw profileError;
      profileId = profile.id;
    }

    const { data: application, error } = await serviceClient
      .from("applications")
      .insert({
        portal_type: portalType,
        submission_type: cleanText(body.submissionType, "application"),
        status: "pending",
        auth_user_id: user?.id || null,
        profile_id: profileId,
        full_name: fullName,
        company_name: cleanText(body.companyName) || null,
        email,
        phone: cleanText(body.phone) || null,
        country: cleanText(body.country) || null,
        city: cleanText(body.city) || null,
        role_requested: cleanText(body.roleRequested) || portalRole(portalType),
        interest_type: cleanText(body.interestType) || null,
        message: cleanText(body.message) || null,
        submitted_data: body.submittedData || {}
      })
      .select("*")
      .single();

    if (error) throw error;

    await sendEmail({
      to: Deno.env.get("ADMIN_EMAIL") || "bbalmir@gmail.com",
      type: "admin-new-application",
      application,
      serviceClient
    });

    await sendEmail({
      to: application.email,
      type: "user-pending-review",
      application,
      serviceClient
    });

    return jsonResponse({ success: true, applicationId: application.id, status: "pending" });
  } catch (error) {
    return jsonResponse({ error: error.message || "Application submission failed." }, 500);
  }
});

function normalizePortal(value) {
  const normalized = cleanText(value).toLowerCase().replaceAll("-", "_");
  if (["customer", "partner", "investor", "engineer", "general"].includes(normalized)) return normalized;
  return "";
}
