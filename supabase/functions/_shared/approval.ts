import { portalRole, sendEmail } from "./email.ts";

export async function applyDecision({ serviceClient, adminUserId, applicationId, status, decisionNotes, requestedInfoMessage }) {
  const { data: application, error: loadError } = await serviceClient
    .from("applications")
    .select("*")
    .eq("id", applicationId)
    .maybeSingle();

  if (loadError) throw loadError;
  if (!application) return { ok: false, status: 404, error: "Application not found." };

  const oldStatus = application.status;
  const reviewNotes = requestedInfoMessage || decisionNotes || null;
  const { data: updatedApplication, error: updateError } = await serviceClient
    .from("applications")
    .update({
      status,
      review_notes: reviewNotes,
      reviewed_at: new Date().toISOString(),
      reviewed_by: adminUserId
    })
    .eq("id", applicationId)
    .select("*")
    .single();

  if (updateError) throw updateError;

  let profile = null;
  if (status === "approved") {
    profile = await upsertApprovedProfile(serviceClient, updatedApplication, adminUserId);
  } else if (updatedApplication.profile_id) {
    const { data } = await serviceClient
      .from("profiles")
      .update({ status })
      .eq("id", updatedApplication.profile_id)
      .select("*")
      .maybeSingle();
    profile = data;
  }

  await serviceClient.from("approval_events").insert({
    application_id: applicationId,
    profile_id: profile?.id || updatedApplication.profile_id || null,
    admin_user_id: adminUserId,
    old_status: oldStatus,
    new_status: status,
    decision_notes: reviewNotes
  });

  const emailType = status === "approved"
    ? `${portalRole(updatedApplication.portal_type, updatedApplication.role_requested)}-approved`
    : status === "rejected"
      ? "application-rejected"
      : "needs-more-information";

  await sendEmail({
    to: updatedApplication.email,
    type: emailType,
    application: { ...updatedApplication, profile_id: profile?.id || updatedApplication.profile_id },
    extra: { decisionNotes, requestedInfoMessage },
    serviceClient
  });

  return { ok: true, application: updatedApplication, profile, status };
}

async function upsertApprovedProfile(serviceClient, application, adminUserId) {
  const role = portalRole(application.portal_type, application.role_requested);
  const profilePayload = {
    auth_user_id: application.auth_user_id,
    email: application.email,
    full_name: application.full_name,
    role,
    status: "approved",
    company_name: application.company_name,
    phone: application.phone,
    country: application.country,
    city: application.city,
    approved_at: new Date().toISOString(),
    approved_by: adminUserId,
    metadata: application.submitted_data || {}
  };

  let profile = null;
  if (application.profile_id) {
    const { data, error } = await serviceClient
      .from("profiles")
      .update(profilePayload)
      .eq("id", application.profile_id)
      .select("*")
      .single();
    if (error) throw error;
    profile = data;
  } else {
    const { data, error } = await serviceClient
      .from("profiles")
      .upsert(profilePayload, { onConflict: "auth_user_id" })
      .select("*")
      .single();
    if (error) throw error;
    profile = data;
    await serviceClient.from("applications").update({ profile_id: profile.id }).eq("id", application.id);
  }

  if (role === "customer") await serviceClient.from("customer_profiles").upsert({ profile_id: profile.id }, { onConflict: "profile_id" });
  if (role === "partner") await serviceClient.from("partner_profiles").upsert({ profile_id: profile.id }, { onConflict: "profile_id" });
  if (role === "investor") await serviceClient.from("investor_profiles").upsert({ profile_id: profile.id }, { onConflict: "profile_id" });
  return profile;
}
