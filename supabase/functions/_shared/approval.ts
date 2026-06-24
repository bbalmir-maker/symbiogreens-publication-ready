import { normalizeEmail, portalRole, portalUrl, sendEmail } from "./email.ts";

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
  let accountInvitation = null;
  if (status === "approved") {
    profile = await upsertApprovedProfile(serviceClient, updatedApplication, adminUserId);
    accountInvitation = await createAccountInvitation(serviceClient, updatedApplication, profile);
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
    extra: {
      decisionNotes,
      requestedInfoMessage,
      createPasswordUrl: accountInvitation?.url || "",
      portalUrl: portalUrl(updatedApplication.portal_type)
    },
    serviceClient
  });

  return { ok: true, application: updatedApplication, profile, status };
}

async function upsertApprovedProfile(serviceClient, application, adminUserId) {
  const role = portalRole(application.portal_type, application.role_requested);
  const email = normalizeEmail(application.email);
  const profilePayload = {
    auth_user_id: application.auth_user_id || null,
    email,
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
    const { data: existingProfile } = await serviceClient
      .from("profiles")
      .select("auth_user_id")
      .eq("id", application.profile_id)
      .maybeSingle();

    const { data, error } = await serviceClient
      .from("profiles")
      .update({
        ...profilePayload,
        auth_user_id: application.auth_user_id || existingProfile?.auth_user_id || null
      })
      .eq("id", application.profile_id)
      .select("*")
      .single();
    if (error) throw error;
    profile = data;
  } else {
    const { data: existingProfiles, error: lookupError } = await serviceClient
      .from("profiles")
      .select("*")
      .ilike("email", email)
      .eq("role", role)
      .order("created_at", { ascending: false })
      .limit(1);
    if (lookupError) throw lookupError;

    const existingProfile = existingProfiles?.[0] || null;
    if (existingProfile) {
      const { data, error } = await serviceClient
        .from("profiles")
        .update({
          ...profilePayload,
          auth_user_id: application.auth_user_id || existingProfile.auth_user_id || null
        })
        .eq("id", existingProfile.id)
        .select("*")
        .single();
      if (error) throw error;
      profile = data;
    } else {
      const { data, error } = await serviceClient
        .from("profiles")
        .insert(profilePayload)
        .select("*")
        .single();
      if (error) throw error;
      profile = data;
    }
    await serviceClient.from("applications").update({ profile_id: profile.id }).eq("id", application.id);
  }

  if (role === "customer") await serviceClient.from("customer_profiles").upsert({ profile_id: profile.id }, { onConflict: "profile_id" });
  if (role === "partner") await serviceClient.from("partner_profiles").upsert({ profile_id: profile.id }, { onConflict: "profile_id" });
  if (role === "investor") await serviceClient.from("investor_profiles").upsert({ profile_id: profile.id }, { onConflict: "profile_id" });
  return profile;
}

async function createAccountInvitation(serviceClient, application, profile) {
  const token = randomToken();
  const tokenHash = await sha256(token);
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
  const email = normalizeEmail(profile.email || application.email);
  const role = profile.role || portalRole(application.portal_type, application.role_requested);

  await serviceClient
    .from("account_invitations")
    .update({ used_at: new Date().toISOString() })
    .eq("profile_id", profile.id)
    .is("used_at", null);

  const { error } = await serviceClient.from("account_invitations").insert({
    application_id: application.id,
    profile_id: profile.id,
    email,
    role,
    token_hash: tokenHash,
    expires_at: expiresAt
  });
  if (error) throw error;

  const baseUrl = Deno.env.get("CREATE_PASSWORD_URL")
    || joinUrl(Deno.env.get("APP_BASE_URL") || Deno.env.get("MAIN_WEBSITE_URL") || "", "create-password.html");
  const url = withQuery(baseUrl, { token, email });
  return { url, expiresAt };
}

function randomToken() {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}

async function sha256(value) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function joinUrl(base, path) {
  if (!base) return path;
  return `${String(base).replace(/\/+$/, "")}/${String(path).replace(/^\/+/, "")}`;
}

function withQuery(url, params) {
  if (!url) return "";
  const separator = url.includes("?") ? "&" : "?";
  const query = new URLSearchParams(params);
  return `${url}${separator}${query.toString()}`;
}
