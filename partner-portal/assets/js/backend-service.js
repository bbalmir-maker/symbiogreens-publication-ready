(function () {
  "use strict";

  const STORAGE_PREFIX = "symbio_partner_portal_";
  const TABLES = {
    projectProfiles: "partner_project_profiles",
    waterCalculations: "partner_water_calculations",
    solarAssessments: "partner_solar_assessments",
    landAssessments: "partner_land_climate_assessments",
    cropScenarios: "partner_crop_revenue_scenarios",
    revenueScenarios: "partner_revenue_scenarios",
    ownershipScenarios: "partner_ownership_scenarios",
    marketSurveys: "partner_market_surveys",
    buyerValidations: "partner_buyer_validations",
    readinessScores: "partner_readiness_scores",
    questions: "partner_questions",
    questionRatings: "partner_question_ratings",
    comments: "partner_comments",
    inquiries: "partner_inquiries",
    meetingRequests: "partner_meeting_requests",
    documentRequests: "partner_document_requests",
    events: "partner_interaction_events"
  };

  function readLocal(key, fallback) {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_PREFIX + key)) ?? fallback;
    } catch {
      return fallback;
    }
  }

  function writeLocal(key, value) {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
  }

  function uid(prefix) {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  }

  function isBackendConfigured() {
    return Boolean(window.SymbioBackend?.isConfigured?.());
  }

  function getClient() {
    if (!isBackendConfigured()) return null;
    return window.SymbioBackend.getClient?.() || null;
  }

  async function insertRemote(collection, row) {
    const table = TABLES[collection];
    const client = getClient();
    if (!table || !client?.from) return { skipped: true };
    const { error, data } = await client.from(table).insert(row).select().maybeSingle();
    if (error) throw error;
    return { skipped: false, data };
  }

  async function appendLocal(collection, payload) {
    const rows = readLocal(collection, []);
    const row = {
      id: uid(collection),
      created_at: new Date().toISOString(),
      ...(payload || {})
    };
    rows.push(row);
    writeLocal(collection, rows);

    try {
      const remote = await insertRemote(collection, row);
      return { ok: true, backend: remote.skipped ? "local" : "supabase", data: remote.data || row };
    } catch (error) {
      console.warn("Partner portal remote save skipped; local save preserved.", error);
      return { ok: true, backend: "local", remote_error: error?.message || String(error), data: row };
    }
  }

  async function getCurrentPartner() {
    if (localStorage.getItem("symbioPartnerPortalDemo") === "true") {
      return { ok: true, backend: "local", partner: { id: "demo_partner", status: "approved", role: "approved_partner" } };
    }
    return { ok: false, backend: "local", partner: null, skipped: true };
  }

  async function requireApprovedPartner() {
    const current = await getCurrentPartner();
    return { ...current, approved: current.partner?.status === "approved" || current.partner?.status === "active" };
  }

  function savePartnerProjectProfile(payload) { return appendLocal("projectProfiles", payload); }
  function saveRainwaterCalculation(payload) { return appendLocal("waterCalculations", payload); }
  function saveSolarAssessment(payload) { return appendLocal("solarAssessments", payload); }
  function saveLandClimateAssessment(payload) { return appendLocal("landAssessments", payload); }
  function saveCropRevenueScenario(payload) { return appendLocal("cropScenarios", payload); }
  function saveRevenueScenario(payload) { return appendLocal("revenueScenarios", payload); }
  function saveOwnershipScenario(payload) { return appendLocal("ownershipScenarios", payload); }
  function saveMarketSurvey(payload) { return appendLocal("marketSurveys", payload); }
  function saveBuyerValidation(payload) { return appendLocal("buyerValidations", payload); }
  function saveReadinessScore(payload) { return appendLocal("readinessScores", payload); }
  function savePartnerQuestion(payload) { return appendLocal("questions", payload); }
  function savePartnerQuestionRating(payload) { return appendLocal("questionRatings", payload); }
  function savePartnerComment(payload) { return appendLocal("comments", payload); }
  function savePartnerInquiry(payload) { return appendLocal("inquiries", payload); }
  function requestPartnerMeeting(payload) { return appendLocal("meetingRequests", payload); }
  function requestPartnerDocument(payload) { return appendLocal("documentRequests", payload); }
  function trackPartnerPortalEvent(eventType, payload) {
    return appendLocal("events", { event_type: eventType, event_payload: payload || {} });
  }
  function trackPartnerEvent(eventType, payload) { return trackPartnerPortalEvent(eventType, payload); }

  async function getPartnerEngagementSummary() {
    return {
      ok: true,
      backend: "local",
      data: {
        events: readLocal("events", []).length,
        project_profiles: readLocal("projectProfiles", []).length,
        water_calculations: readLocal("waterCalculations", []).length,
        solar_assessments: readLocal("solarAssessments", []).length,
        land_assessments: readLocal("landAssessments", []).length,
        crop_scenarios: readLocal("cropScenarios", []).length,
        revenue_scenarios: readLocal("revenueScenarios", []).length,
        market_surveys: readLocal("marketSurveys", []).length,
        readiness_scores: readLocal("readinessScores", []).length,
        backend_configured: isBackendConfigured()
      }
    };
  }

  async function logoutPartner() {
    localStorage.removeItem("symbioPartnerPortalDemo");
    return { ok: true, backend: "local" };
  }

  window.SymbioPartnerPortalBackend = {
    getCurrentPartner,
    requireApprovedPartner,
    savePartnerProjectProfile,
    saveRainwaterCalculation,
    saveSolarAssessment,
    saveLandClimateAssessment,
    saveCropRevenueScenario,
    saveRevenueScenario,
    saveOwnershipScenario,
    saveMarketSurvey,
    saveBuyerValidation,
    saveReadinessScore,
    savePartnerQuestion,
    savePartnerQuestionRating,
    savePartnerComment,
    savePartnerInquiry,
    requestPartnerMeeting,
    requestPartnerDocument,
    trackPartnerPortalEvent,
    trackPartnerEvent,
    getPartnerEngagementSummary,
    logoutPartner,
    isBackendConfigured,
    tables: TABLES,
    readLocal,
    writeLocal
  };

  window.SymbioGreensBackend = window.SymbioGreensBackend || {};
  window.SymbioGreensBackend.partner = {
    getPartnerDashboard: () => getPartnerEngagementSummary(),
    savePartnerProjectProfile,
    saveRainwaterCalculation,
    saveSolarAssessment,
    saveLandClimateAssessment,
    saveCropRevenueScenario,
    saveRevenueScenario,
    saveOwnershipScenario,
    saveMarketSurvey,
    saveBuyerValidation,
    saveReadinessScore,
    savePartnerInquiry,
    requestPartnerMeeting,
    requestPartnerDocument,
    getPartnerInteractionEvents: () => Promise.resolve({ ok: true, backend: "local", data: readLocal("events", []) })
  };
  window.SymbioGreensBackend.trackPartnerEvent = trackPartnerEvent;
})();
