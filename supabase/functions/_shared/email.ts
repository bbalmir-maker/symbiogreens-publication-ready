const APP_NAME = "SymbioGreens";

export function normalizeEmail(value) {
  return String(value || "").trim().toLowerCase();
}

export function cleanText(value, fallback = "") {
  return String(value || fallback).trim();
}

export function portalRole(portalType, roleRequested) {
  const normalized = cleanText(roleRequested || portalType).toLowerCase();
  if (["customer", "partner", "investor", "engineer"].includes(normalized)) return normalized;
  if (["customer", "partner", "investor", "engineer"].includes(portalType)) return portalType;
  return "customer";
}

export function portalUrl(portalType) {
  const map = {
    customer: Deno.env.get("CUSTOMER_PORTAL_URL"),
    partner: Deno.env.get("PARTNER_PORTAL_URL"),
    investor: Deno.env.get("INVESTOR_PORTAL_URL"),
    engineer: Deno.env.get("MAIN_WEBSITE_URL")
  };
  return map[portalType] || Deno.env.get("APP_BASE_URL") || Deno.env.get("MAIN_WEBSITE_URL") || "";
}

export function emailTemplate(type, application, extra = {}) {
  const portalLabel = cleanText(application.portal_type, "general");
  const name = cleanText(application.full_name, "Applicant");
  const adminUrl = Deno.env.get("ADMIN_PORTAL_URL") || "";
  const targetUrl = extra.portalUrl || portalUrl(application.portal_type);
  const createPasswordUrl = cleanText(extra.createPasswordUrl);
  const notes = cleanText(extra.decisionNotes || extra.requestedInfoMessage || application.review_notes);

  if (type === "admin-new-application") {
    return {
      subject: `New ${title(portalLabel)} Application Pending Approval - ${APP_NAME}`,
      html: `<h2>New ${APP_NAME} application pending approval</h2>
        <p><strong>Status:</strong> Pending</p>
        <p><strong>Application ID:</strong> ${application.id}</p>
        <p><strong>Portal:</strong> ${portalLabel}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Company:</strong> ${cleanText(application.company_name, "Not provided")}</p>
        <p><strong>Email:</strong> ${application.email}</p>
        <p><strong>Phone:</strong> ${cleanText(application.phone, "Not provided")}</p>
        <p><strong>Location:</strong> ${cleanText(application.city)} ${cleanText(application.country)}</p>
        <p><strong>Interest:</strong> ${cleanText(application.interest_type, "Not provided")}</p>
        <p><strong>Message:</strong> ${cleanText(application.message, "No message")}</p>
        <pre>${escapeHtml(JSON.stringify(application.submitted_data || {}, null, 2))}</pre>
        ${adminUrl ? `<p><a href="${adminUrl}">Open admin dashboard</a></p>` : ""}`
    };
  }

  if (type === "user-pending-review") {
    return {
      subject: `Your ${APP_NAME} Application Was Received`,
      html: `<h2>Application received</h2>
        <p>Thank you, ${name}. Your application has been received and is pending review.</p>
        <p>Our team will review your information and contact you after approval. This message does not imply approval or portal access.</p>`
    };
  }

  if (type.endsWith("-approved")) {
    return {
      subject: `Your ${APP_NAME} ${title(portalLabel)} Access Has Been Approved`,
      html: `<h2>Access approved</h2>
        <p>${name}, your ${portalLabel} access has been approved.</p>
        ${createPasswordUrl ? `<p>Create your login credentials here: <a href="${createPasswordUrl}">Create your password</a></p>` : ""}
        ${!createPasswordUrl && targetUrl ? `<p>You can continue here: <a href="${targetUrl}">${targetUrl}</a></p>` : ""}
        ${createPasswordUrl && targetUrl ? `<p>After setup, your portal is: <a href="${targetUrl}">${targetUrl}</a></p>` : ""}
        <p>Final access remains subject to the active account, security, and portal role checks.</p>`
    };
  }

  if (type === "application-rejected") {
    return {
      subject: `Your ${APP_NAME} Application Status`,
      html: `<h2>Application update</h2>
        <p>Thank you for your interest. Your application was not approved at this time.</p>
        ${notes ? `<p><strong>Notes:</strong> ${escapeHtml(notes)}</p>` : ""}`
    };
  }

  if (type === "needs-more-information") {
    return {
      subject: `${APP_NAME} Application - More Information Needed`,
      html: `<h2>More information needed</h2>
        <p>We need more information before approving your application.</p>
        ${notes ? `<p><strong>Request:</strong> ${escapeHtml(notes)}</p>` : ""}
        <p>Please reply with the requested information so the review can continue.</p>`
    };
  }

  return { subject: `${APP_NAME} Application Update`, html: "<p>Your application status has been updated.</p>" };
}

export async function sendEmail({ to, type, application, extra = {}, serviceClient, attachments = [] }) {
  const resendKey = Deno.env.get("RESEND_API_KEY");
  const from = Deno.env.get("RESEND_FROM_EMAIL");
  const template = emailTemplate(type, application, extra);
  let event = {
    application_id: application.id || null,
    profile_id: application.profile_id || null,
    recipient_email: to,
    email_type: type,
    provider: "resend",
    status: "queued"
  };

  if (!resendKey || !from) {
    event.status = "configuration_missing";
    event.error_message = "RESEND_API_KEY or RESEND_FROM_EMAIL is not configured.";
    await serviceClient.from("email_events").insert(event);
    return { ok: false, configured: false, event };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${resendKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ from, to, subject: template.subject, html: template.html, ...(attachments.length ? { attachments } : {}) })
  });

  const result = await response.json().catch(() => ({}));
  event.status = response.ok ? "sent" : "failed";
  event.provider_message_id = result.id || null;
  event.error_message = response.ok ? null : JSON.stringify(result);
  event.sent_at = response.ok ? new Date().toISOString() : null;
  await serviceClient.from("email_events").insert(event);
  return { ok: response.ok, configured: true, result, event };
}

function title(value) {
  return String(value || "").replace(/(^|_|\s)\w/g, (match) => match.toUpperCase()).replace(/_/g, " ");
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
