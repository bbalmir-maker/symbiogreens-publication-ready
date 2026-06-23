(function () {
  "use strict";

  const STATUSES = Object.freeze({
    PENDING: "Pending",
    APPROVED: "Approved",
    REJECTED: "Rejected",
    NEEDS_MORE_INFORMATION: "Needs More Information"
  });

  const PORTAL_TYPES = Object.freeze({
    MAIN_WEBSITE: "main-website",
    CUSTOMER: "customer-portal",
    PARTNER: "partner-portal",
    INVESTOR: "investor-portal",
    TECHNICAL: "technical-engineering"
  });

  function createSubmissionEnvelope(payload) {
    const now = new Date().toISOString();
    return {
      submissionId: payload.submissionId || `sg-${Date.now()}`,
      portalType: payload.portalType || PORTAL_TYPES.MAIN_WEBSITE,
      submissionType: payload.submissionType || "general-inquiry",
      status: payload.status || STATUSES.PENDING,
      createdAt: payload.createdAt || now,
      updatedAt: payload.updatedAt || now,
      ...payload
    };
  }

  window.SymbioGreenApproval = {
    STATUSES,
    PORTAL_TYPES,
    createSubmissionEnvelope
  };
})();
