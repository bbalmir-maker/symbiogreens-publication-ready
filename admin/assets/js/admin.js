(function () {
  "use strict";

  const loginPanel = document.getElementById("loginPanel");
  const adminPanel = document.getElementById("adminPanel");
  const loginForm = document.getElementById("loginForm");
  const logoutButton = document.getElementById("logoutButton");
  const refreshButton = document.getElementById("refreshButton");
  const statusFilter = document.getElementById("statusFilter");
  const portalFilter = document.getElementById("portalFilter");
  const statusMessage = document.getElementById("statusMessage");
  const loginStatusMessage = document.getElementById("loginStatusMessage");
  const list = document.getElementById("applicationsList");

  let currentSession = null;
  let currentProfile = null;

  function log(label, detail) {
    if (detail === undefined) {
      console.log(`[Admin] ${label}`);
    } else {
      console.log(`[Admin] ${label}:`, detail);
    }
  }

  function setMessage(message) {
    const text = message || "";
    statusMessage.textContent = text;
    if (loginStatusMessage) loginStatusMessage.textContent = text;
  }

  function esc(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
    }[char]));
  }

  function client() {
    return window.SymbioBackend?.getClient?.() || null;
  }

  function showLogin(message) {
    loginPanel.hidden = false;
    adminPanel.hidden = true;
    logoutButton.hidden = true;
    if (message) setMessage(message);
  }

  function showDashboard() {
    loginPanel.hidden = true;
    adminPanel.hidden = false;
    logoutButton.hidden = false;
    if (loginStatusMessage) loginStatusMessage.textContent = "";
  }

  async function getSession() {
    const supabase = client();
    if (!supabase) return null;
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.error("[Admin] Session result error:", error);
      return null;
    }
    log("Session result", { hasSession: Boolean(data?.session), userId: data?.session?.user?.id || null });
    return data?.session || null;
  }

  async function getAdminProfile(session) {
    if (!session?.user?.id) return { profile: null, error: new Error("No authenticated session.") };
    const supabase = client();
    let { data, error } = await supabase
      .from("profiles")
      .select("id, auth_user_id, email, role, status, full_name")
      .eq("auth_user_id", session.user.id)
      .maybeSingle();
    if (!data && !error && session.user.email) {
      const fallback = await supabase
        .from("profiles")
        .select("id, auth_user_id, email, role, status, full_name")
        .ilike("email", session.user.email)
        .maybeSingle();
      data = fallback.data;
      error = fallback.error;
      if (data?.role === "admin" && data?.status === "approved" && !data.auth_user_id) {
        const repair = await supabase
          .from("profiles")
          .update({ auth_user_id: session.user.id })
          .eq("id", data.id)
          .select("id, auth_user_id, email, role, status, full_name")
          .single();
        if (!repair.error) data = repair.data;
      }
    }
    if (error) {
      console.error("[Admin] Admin access check error:", error);
      return { profile: null, error };
    }
    const allowed = data?.role === "admin" && data?.status === "approved";
    log("Admin access check result", {
      allowed,
      email: data?.email || session.user.email || null,
      role: data?.role || null,
      status: data?.status || null
    });
    if (!allowed) {
      return {
        profile: data || null,
        error: new Error("This account is not an approved admin. Create or approve a profiles row with role=admin and status=approved.")
      };
    }
    return { profile: data, error: null };
  }

  async function boot() {
    log("Supabase client loaded", Boolean(window.supabase && window.SymbioBackend));
    log("Supabase URL used", window.SymbioBackend?.config?.VITE_SUPABASE_URL || "");

    if (!window.SymbioBackend?.isConfigured?.()) {
      currentSession = null;
      currentProfile = null;
      showLogin("Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to shared/js/supabase-config.js before using the admin dashboard.");
      return;
    }

    currentSession = await getSession();
    if (!currentSession) {
      currentProfile = null;
      showLogin("");
      return;
    }

    const { profile, error } = await getAdminProfile(currentSession);
    if (error) {
      currentProfile = null;
      showLogin(error.message);
      return;
    }

    currentProfile = profile;
    showDashboard();
    await loadApplications();
  }

  async function loadApplications() {
    if (!currentProfile) {
      showLogin("Please sign in with an approved admin account.");
      return;
    }
    setMessage("Loading applications...");
    const supabase = client();
    let query = supabase
      .from("applications")
      .select("*, approval_events(*), email_events(*)")
      .order("created_at", { ascending: false });
    if (statusFilter.value) query = query.eq("status", statusFilter.value);
    if (portalFilter.value) query = query.eq("portal_type", portalFilter.value);
    const { data, error } = await query;
    if (error) {
      console.error("[Admin] Applications fetch error:", error);
      setMessage(`Applications fetch failed: ${error.message}`);
      return;
    }
    log("Applications fetch result", { count: (data || []).length });
    renderApplications(data || []);
    setMessage(`${(data || []).length} application(s) loaded.`);
  }

  function renderApplications(applications) {
    if (!applications.length) {
      list.innerHTML = "<p>No applications match the selected filters.</p>";
      return;
    }
    list.innerHTML = applications.map((application) => `
      <article class="application-card" data-application-id="${esc(application.id)}">
        <div class="card-head">
          <div>
            <h3>${esc(application.full_name)}</h3>
            <p>${esc(application.company_name || "No company")} - ${esc(application.email)}</p>
          </div>
          <span class="badge">${window.SymbioEmailStatus?.label?.(application.status) || esc(application.status)}</span>
        </div>
        <div class="details-grid">
          <span>Portal<strong>${esc(application.portal_type)}</strong></span>
          <span>Type<strong>${esc(application.submission_type)}</strong></span>
          <span>Phone<strong>${esc(application.phone || "Not provided")}</strong></span>
          <span>Country / City<strong>${esc([application.country, application.city].filter(Boolean).join(" / ") || "Not provided")}</strong></span>
          <span>Interest<strong>${esc(application.interest_type || "Not provided")}</strong></span>
          <span>Created<strong>${esc(application.created_at ? new Date(application.created_at).toLocaleString() : "Not provided")}</strong></span>
          <span>Reviewed<strong>${esc(application.reviewed_at ? new Date(application.reviewed_at).toLocaleString() : "Not reviewed")}</strong></span>
          <span>Reviewed by<strong>${esc(application.reviewed_by || "Not assigned")}</strong></span>
        </div>
        <p>${esc(application.message || "No message provided.")}</p>
        ${application.review_notes ? `<p><strong>Review notes:</strong> ${esc(application.review_notes)}</p>` : ""}
        <details>
          <summary>Submitted data</summary>
          <pre>${esc(JSON.stringify(application.submitted_data || application.form_payload || {}, null, 2))}</pre>
        </details>
        <details>
          <summary>Approval events (${(application.approval_events || []).length})</summary>
          ${(application.approval_events || []).length ? `<pre>${esc(JSON.stringify(application.approval_events, null, 2))}</pre>` : "<p>No approval events yet.</p>"}
        </details>
        <details>
          <summary>Email events (${(application.email_events || []).length})</summary>
          ${(application.email_events || []).length ? `<pre>${esc(JSON.stringify(application.email_events, null, 2))}</pre>` : "<p>No email events yet.</p>"}
        </details>
        <div class="decision-box">
          <label>Decision notes<textarea rows="3" data-decision-notes placeholder="Add internal note or applicant-facing request."></textarea></label>
          <div class="decision-actions">
            <button class="button primary" data-decision-status="approved" type="button">Approve</button>
            <button class="button info" data-decision-status="needs_more_information" type="button">Needs More Information</button>
            <button class="button danger" data-decision-status="rejected" type="button">Reject</button>
          </div>
        </div>
      </article>
    `).join("");
  }

  async function submitDecision(button) {
    const card = button.closest("[data-application-id]");
    const applicationId = card?.dataset.applicationId;
    const decisionNotes = card?.querySelector("[data-decision-notes]")?.value || "";
    const status = button.dataset.decisionStatus;
    if (!applicationId || !status) return;
    button.disabled = true;
    setMessage("Submitting decision...");
    const payload = {
      status,
      review_notes: decisionNotes,
      reviewed_at: new Date().toISOString(),
      reviewed_by: currentSession?.user?.id || null
    };
    const { data, error } = await client()
      .from("applications")
      .update(payload)
      .eq("id", applicationId)
      .select()
      .single();
    button.disabled = false;
    if (error) {
      console.error("[Admin] Application decision update failed:", error);
      setMessage(`Decision update failed: ${error.message}`);
      return;
    }
    log("Application decision update result", data);
    setMessage("Decision saved.");
    await loadApplications();
  }

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    setMessage("Signing in...");
    log("Admin login started");
    const data = Object.fromEntries(new FormData(loginForm).entries());
    try {
      if (!window.SymbioBackend?.isConfigured?.()) {
        throw new Error("Supabase is not configured.");
      }
      const result = await window.SymbioAuthGuard.login(data.email, data.password);
      log("Auth response", { userId: result.data?.user?.id || null, hasSession: Boolean(result.data?.session) });
      if (result.error) {
        console.error("[Admin] Auth error:", result.error);
        throw result.error;
      }
      await boot();
    } catch (error) {
      console.error("[Admin] Auth error:", error);
      showLogin(error.message || "Login failed.");
    }
  });

  logoutButton.addEventListener("click", async () => {
    await window.SymbioAuthGuard.logout();
    currentSession = null;
    currentProfile = null;
    showLogin("Logged out.");
  });
  refreshButton.addEventListener("click", loadApplications);
  statusFilter.addEventListener("change", loadApplications);
  portalFilter.addEventListener("change", loadApplications);
  list.addEventListener("click", (event) => {
    const button = event.target.closest("[data-decision-status]");
    if (button) submitDecision(button);
  });

  boot();
})();
