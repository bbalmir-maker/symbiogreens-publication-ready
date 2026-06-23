(function () {
  const STORAGE_PREFIX = "symbio_investor_portal_";
  const TABLES = {
    prequalification: "investor_prequalification",
    accounts: "investor_users",
    events: "investor_interaction_events",
    scores: "investor_engagement_scores",
    questions: "investor_interaction_events",
    comments: "investor_interaction_events",
    interestSelections: "investor_interest",
    potentialCommitments: "investor_potential_commitments",
    calculatorSessions: "investor_calculator_sessions",
    adminNotes: "investor_admin_notes",
    documents: "investor_document_access"
  };

  const demoRequests = [
    {
      id: "demo_request_1",
      created_at: "2026-06-01T13:00:00.000Z",
      full_name: "Founder Demo Investor",
      email: "demo.investor@example.com",
      country: "Dominican Republic / US",
      investor_type: "Strategic investor",
      investment_range: "250k-500k",
      status: "pending",
      score: 82,
      notes: "Interested in Las Terrenas validation and Caribbean expansion."
    },
    {
      id: "demo_request_2",
      created_at: "2026-06-03T16:30:00.000Z",
      full_name: "Regional Partner Demo",
      email: "partner@example.com",
      country: "Caribbean",
      investor_type: "Strategic partner",
      investment_range: "500k-1M",
      status: "more_info_requested",
      score: 74,
      notes: "Asked about hub replication, hotel buyer demand, and operating controls."
    }
  ];

  function readStore(key, fallback) {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_PREFIX + key)) ?? fallback;
    } catch {
      return fallback;
    }
  }

  function writeStore(key, value) {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
  }

  function uid(prefix) {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  }

  function isBackendConfigured() {
    const config = window.SYMBIO_SUPABASE_CONFIG || null;
    return Boolean(
      window.supabase &&
      config &&
      config.SUPABASE_URL &&
      config.SUPABASE_ANON_KEY &&
      !String(config.SUPABASE_URL).includes("SUPABASE_URL") &&
      !String(config.SUPABASE_ANON_KEY).includes("SUPABASE_ANON_KEY")
    );
  }

  function appendLocal(collection, payload) {
    const rows = readStore(collection, []);
    const row = { id: uid(collection), created_at: new Date().toISOString(), ...payload };
    rows.push(row);
    writeStore(collection, rows);
    return Promise.resolve({ ok: true, backend: "local", data: row });
  }

  async function getCurrentInvestor() {
    if (localStorage.getItem("symbioInvestorPortalDemo") === "true") {
      return { ok: true, backend: "local", investor: { id: "demo_investor", status: "approved", role: "approved_investor" } };
    }
    return { ok: false, backend: "local", investor: null, skipped: true };
  }

  async function requireApprovedInvestor() {
    const current = await getCurrentInvestor();
    return { ...current, approved: current.investor?.status === "approved" || current.investor?.status === "active" };
  }

  function saveInvestorScenario(payload) { return appendLocal("scenarios", payload); }
  function saveInvestorQuestion(payload) { return appendLocal("questions", payload); }
  function saveInvestorQuestionRating(payload) { return appendLocal("question_ratings", payload); }
  function saveInvestorObjection(payload) { return appendLocal("objections", payload); }
  function saveInvestorObjectionRating(payload) { return appendLocal("objection_ratings", payload); }
  function saveInvestorComment(payload) { return appendLocal("comments", payload); }
  function saveInvestorInterestSelection(payload) { return appendLocal("interest_selections", payload); }
  function saveInvestorInterest(payload) { return appendLocal("interest", payload); }
  function saveInvestorPotentialCommitment(payload) { return appendLocal("potential_commitments", payload); }
  function saveInvestorCalculatorSession(payload) { return appendLocal("calculator_sessions", payload); }
  function logInvestorDocumentAccess(payload) { return appendLocal("document_access_logs", payload); }
  function requestInvestorCall(payload) { return appendLocal("call_requests", payload); }
  function requestInvestorDocument(payload) { return appendLocal("document_requests", payload); }
  function trackInvestorPortalEvent(eventType, payload) { return appendLocal("events", { event_type: eventType, event_payload: payload || {} }); }
  function trackInvestorEvent(eventType, payload) { return trackInvestorPortalEvent(eventType, payload); }
  function saveInvestorEngagementSnapshot(payload) { return appendLocal("engagement_scores", payload); }
  function saveInvestorPrequalification(payload) { return appendLocal("prequalification", payload); }
  function saveAdminNote(payload) { return appendLocal("admin_notes", payload); }
  function sendInvestorInvitation(payload) { return appendLocal("invitations", { status: "queued_demo", ...payload }); }

  async function updateInvestorApprovalStatus(payload) {
    const statusUpdate = { updated_at: new Date().toISOString(), ...payload };
    return appendLocal("approval_status_updates", statusUpdate);
  }

  async function getInvestorRequests() {
    const stored = readStore("prequalification", []);
    return { ok: true, backend: "local", data: [...demoRequests, ...stored] };
  }

  async function getInvestorEngagementSummary() {
    const events = readStore("events", []);
    const scenarios = readStore("scenarios", []);
    const questions = readStore("questions", []);
    const comments = readStore("comments", []);
    const interestSelections = readStore("interest_selections", []);
    const documentRequests = readStore("document_requests", []);
    return {
      ok: true,
      backend: "local",
      data: {
        events: events.length,
        saved_scenarios: scenarios.length,
        questions: questions.length,
        comments: comments.length,
        interest_selections: interestSelections.length,
        document_requests: documentRequests.length,
        backend_configured: isBackendConfigured()
      }
    };
  }

  async function logoutInvestor() {
    localStorage.removeItem("symbioInvestorPortalDemo");
    return { ok: true, backend: "local" };
  }

  window.SymbioInvestorPortalBackend = {
    getCurrentInvestor,
    requireApprovedInvestor,
    saveInvestorScenario,
    saveInvestorQuestion,
    saveInvestorQuestionRating,
    saveInvestorObjection,
    saveInvestorObjectionRating,
    saveInvestorComment,
    saveInvestorInterestSelection,
    saveInvestorInterest,
    saveInvestorPotentialCommitment,
    saveInvestorCalculatorSession,
    logInvestorDocumentAccess,
    requestInvestorCall,
    requestInvestorDocument,
    trackInvestorPortalEvent,
    trackInvestorEvent,
    saveInvestorEngagementSnapshot,
    saveInvestorPrequalification,
    getInvestorRequests,
    getInvestorEngagementSummary,
    updateInvestorApprovalStatus,
    saveAdminNote,
    sendInvestorInvitation,
    logoutInvestor,
    isBackendConfigured,
    tables: TABLES,
    readLocal: readStore
  };

  window.SymbioGreensBackend = window.SymbioGreensBackend || {};
  window.SymbioGreensBackend.investor = {
    getInvestorDashboard: () => getInvestorEngagementSummary(),
    saveInvestorCalculatorSession,
    saveInvestorPotentialCommitment,
    logInvestorDocumentAccess,
    saveInvestorInterest,
    getInvestorInteractionEvents: () => Promise.resolve({ ok: true, backend: "local", data: readStore("events", []) }),
    getInvestorEngagementScores: () => Promise.resolve({ ok: true, backend: "local", data: readStore("engagement_scores", []) })
  };
  window.SymbioGreensBackend.trackInvestorEvent = trackInvestorEvent;
  window.SymbioGreensBackend.saveInvestorPrequalification = saveInvestorPrequalification;
  window.SymbioGreensBackend.saveInvestorEngagementSnapshot = saveInvestorEngagementSnapshot;
})();
