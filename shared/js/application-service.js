(function () {
  "use strict";

  function normalizeApplication(payload = {}) {
    return {
      portalType: payload.portalType || payload.portal_type || "general",
      submissionType: payload.submissionType || payload.submission_type || "application",
      fullName: payload.fullName || payload.full_name || "",
      companyName: payload.companyName || payload.company_name || "",
      email: payload.email || "",
      phone: payload.phone || "",
      country: payload.country || "",
      city: payload.city || "",
      roleRequested: payload.roleRequested || payload.role_requested || payload.portalType || "",
      interestType: payload.interestType || payload.interest_type || "",
      message: payload.message || payload.notes || "",
      submittedData: payload.submittedData || payload.submitted_data || payload
    };
  }

  function normalizePortalType(value) {
    return ["customer", "partner", "investor", "engineer", "career", "general"].includes(value) ? value : "general";
  }

  function toApplicationRow(payload = {}) {
    const application = normalizeApplication(payload);
    const submittedData = application.submittedData && typeof application.submittedData === "object"
      ? application.submittedData
      : { value: application.submittedData };
    return {
      portal_type: normalizePortalType(application.portalType),
      submission_type: application.submissionType || "application",
      status: "pending",
      full_name: application.fullName,
      company_name: application.companyName || null,
      email: application.email,
      phone: application.phone || null,
      country: application.country || null,
      city: application.city || null,
      role_requested: application.roleRequested || application.portalType || null,
      interest_type: application.interestType || null,
      message: application.message || null,
      submitted_data: {
        ...submittedData,
        form_payload: payload
      }
    };
  }

  async function submitApplication(payload) {
    if (!window.SymbioBackend?.isConfigured?.()) {
      const error = new Error("Supabase is not configured. Application was not submitted.");
      console.error("Application submission failed:", error);
      return { success: false, disabled: true, error: error.message };
    }
    const application = normalizeApplication(payload);
    const body = {
      portalType: normalizePortalType(application.portalType),
      submissionType: application.submissionType || "application",
      fullName: application.fullName,
      companyName: application.companyName || null,
      email: application.email,
      phone: application.phone || null,
      country: application.country || null,
      city: application.city || null,
      roleRequested: application.roleRequested || application.portalType || null,
      interestType: application.interestType || null,
      message: application.message || null,
      resumeFileName: payload.resumeFileName || payload.resume_file_name || null,
      resumeFileBase64: payload.resumeFileBase64 || payload.resume_file_base64 || null,
      submittedData: application.submittedData && typeof application.submittedData === "object"
        ? { ...application.submittedData, form_payload: payload }
        : { value: application.submittedData, form_payload: payload }
    };
    const { data, error } = await window.SymbioBackend.invoke("submit-application", body);
    if (error) {
      console.error("Application submission failed:", error);
      return { success: false, error: error.message || String(error), details: error };
    }
    if (data?.error) {
      console.error("Application submission failed:", data.error);
      return { success: false, error: data.error };
    }
    console.log("Application submitted:", data);
    return { success: true, applicationId: data.applicationId, status: data.status, data };
  }

  window.SymbioApplicationService = {
    normalizeApplication,
    toApplicationRow,
    submitApplication
  };
})();
