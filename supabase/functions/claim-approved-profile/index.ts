import { handleOptions, jsonResponse } from "../_shared/cors.ts";
import { getServiceClient } from "../_shared/supabase.ts";
import { normalizeEmail } from "../_shared/email.ts";

Deno.serve(async (request) => {
  const options = handleOptions(request);
  if (options) return options;
  if (request.method !== "POST") return jsonResponse({ error: "Method not allowed." }, 405);

  try {
    const serviceClient = getServiceClient();
    const body = await request.json().catch(() => ({}));
    const token = String(body.token || "").trim();
    const email = normalizeEmail(body.email);
    const authUserId = String(body.authUserId || "").trim();

    if (!token) return jsonResponse({ error: "Invitation token is required." }, 400);
    if (!email) return jsonResponse({ error: "Email is required." }, 400);
    if (!authUserId) return jsonResponse({ error: "Auth user id is required." }, 400);

    const tokenHash = await sha256(token);
    const { data: invitation, error: inviteError } = await serviceClient
      .from("account_invitations")
      .select("*")
      .eq("token_hash", tokenHash)
      .maybeSingle();

    if (inviteError) throw inviteError;
    if (!invitation) return jsonResponse({ error: "Invitation link is invalid." }, 404);
    if (invitation.used_at) return jsonResponse({ error: "Invitation link has already been used." }, 409);
    if (new Date(invitation.expires_at).getTime() < Date.now()) {
      return jsonResponse({ error: "Invitation link has expired." }, 410);
    }
    if (normalizeEmail(invitation.email) !== email) {
      return jsonResponse({ error: "Email does not match this invitation." }, 403);
    }

    const { data: authResult, error: userError } = await serviceClient.auth.admin.getUserById(authUserId);
    if (userError) throw userError;
    const authUser = authResult?.user || null;
    if (!authUser) return jsonResponse({ error: "Auth user was not found." }, 404);
    if (normalizeEmail(authUser.email) !== email) {
      return jsonResponse({ error: "Auth user email does not match this invitation." }, 403);
    }

    const profile = await loadApprovedProfile(serviceClient, invitation, email);
    if (!profile) return jsonResponse({ error: "Approved profile was not found for this email." }, 404);
    if (profile.status !== "approved") return jsonResponse({ error: "Profile is not approved." }, 403);
    if (profile.role !== invitation.role) return jsonResponse({ error: "Profile role does not match this invitation." }, 403);
    if (profile.auth_user_id && profile.auth_user_id !== authUserId) {
      return jsonResponse({ error: "Profile is already linked to another login." }, 409);
    }

    const { data: updatedProfile, error: updateError } = await serviceClient
      .from("profiles")
      .update({ auth_user_id: authUserId })
      .eq("id", profile.id)
      .select("*")
      .single();
    if (updateError) throw updateError;

    await ensureRoleProfile(serviceClient, updatedProfile.role, updatedProfile.id);
    await serviceClient
      .from("applications")
      .update({ auth_user_id: authUserId, profile_id: updatedProfile.id })
      .eq("id", invitation.application_id);
    await serviceClient
      .from("account_invitations")
      .update({ used_at: new Date().toISOString() })
      .eq("id", invitation.id);

    return jsonResponse({
      ok: true,
      profile: {
        id: updatedProfile.id,
        email: updatedProfile.email,
        role: updatedProfile.role,
        status: updatedProfile.status
      },
      portalUrl: portalUrlForRole(updatedProfile.role)
    });
  } catch (error) {
    return jsonResponse({ error: error.message || "Account provisioning failed." }, 500);
  }
});

async function loadApprovedProfile(serviceClient, invitation, email) {
  if (invitation.profile_id) {
    const { data, error } = await serviceClient
      .from("profiles")
      .select("*")
      .eq("id", invitation.profile_id)
      .maybeSingle();
    if (error) throw error;
    if (data) return data;
  }

  const { data, error } = await serviceClient
    .from("profiles")
    .select("*")
    .ilike("email", email)
    .eq("role", invitation.role)
    .eq("status", "approved")
    .order("created_at", { ascending: false })
    .limit(1);
  if (error) throw error;
  return data?.[0] || null;
}

async function ensureRoleProfile(serviceClient, role, profileId) {
  if (role === "customer") {
    await serviceClient.from("customer_profiles").upsert({ profile_id: profileId }, { onConflict: "profile_id" });
  }
  if (role === "partner") {
    await serviceClient.from("partner_profiles").upsert({ profile_id: profileId }, { onConflict: "profile_id" });
  }
  if (role === "investor") {
    await serviceClient.from("investor_profiles").upsert({ profile_id: profileId }, { onConflict: "profile_id" });
  }
}

async function sha256(value) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function portalUrlForRole(role) {
  const map = {
    customer: Deno.env.get("CUSTOMER_PORTAL_URL"),
    partner: Deno.env.get("PARTNER_PORTAL_URL"),
    investor: Deno.env.get("INVESTOR_PORTAL_URL"),
    engineer: Deno.env.get("MAIN_WEBSITE_URL")
  };
  return map[role] || Deno.env.get("APP_BASE_URL") || Deno.env.get("MAIN_WEBSITE_URL") || "";
}
