(function () {
  "use strict";

  const labels = {
    pending: "Pending Review",
    approved: "Approved",
    rejected: "Rejected",
    needs_more_information: "Needs More Information",
    suspended: "Suspended",
    unauthenticated: "Login Required",
    no_profile: "Account Setup Required",
    backend_not_configured: "Backend Not Configured"
  };

  const portalCopy = {
    customer: {
      title: "Customer Portal Access Required",
      apply: "Submit Customer Application",
      href: "../main-website/index.html#account",
      note: "Customer dashboard access is available only after customer review and approval."
    },
    partner: {
      title: "Partner Portal Access Required",
      apply: "Submit Partner Application",
      href: "https://bbalmir-maker.github.io/symbiogreens-publication-ready/#account",
      note: "Partner portal access is available only after project review and partner approval."
    },
    investor: {
      title: "Investor Portal Access Required",
      apply: "Request Investor Review",
      href: "https://bbalmir-maker.github.io/symbiogreens-publication-ready/#investors",
      note: "Private investor dashboard access is available only after application review and approval."
    },
    admin: {
      title: "Admin Dashboard",
      apply: "Return to Public Website",
      href: "../main-website/index.html"
    }
  };

  async function getMyPortalStatus() {
    if (!window.SymbioBackend?.isConfigured()) {
      return { backendConfigured: false, allowed: false, status: "backend_not_configured" };
    }
    const result = await window.SymbioBackend.invoke("get-my-portal-status", {}, { method: "GET" });
    if (result.error) {
      return { backendConfigured: true, allowed: false, status: "unauthenticated", message: result.error.message };
    }
    return { backendConfigured: true, ...(result.data || {}) };
  }

  async function guardPortal(portalType) {
    const status = await getMyPortalStatus();
    if (!status.backendConfigured) {
      const result = { ...status, allowed: false, portalType };
      applyVisibility(result);
      showAccessMessage(result);
      return result;
    }

    const role = status.role || status.profile?.role;
    const accountStatus = status.status || status.profile?.status;
    const allowed = accountStatus === "approved" && role === portalType;
    const wrongRole = accountStatus === "approved" && role && role !== portalType;
    const result = { ...status, allowed, wrongRole, portalType };

    applyVisibility(result);
    if (!allowed) showAccessMessage(result);
    return result;
  }

  function isApproved(portalType) {
    const cached = window.SymbioPortalAccessState;
    return Boolean(cached && cached.allowed && (!portalType || cached.portalType === portalType));
  }

  function showAccessMessage(status) {
    const copy = portalCopy[status.portalType] || portalCopy.customer;
    const message = status.wrongRole
      ? "This account does not have access to this portal. Please contact SymbioGreen support if you believe this is an error."
      : status.status === "pending"
      ? "Thank you. Your application has been received and is pending review. Our team will review your information and contact you after approval."
      : status.status === "rejected"
        ? "Your application was not approved at this time. Please contact SymbioGreen for more information."
        : status.status === "backend_not_configured"
          ? "Backend access is not configured for this portal yet. Private dashboard access remains locked until approved login is available."
          : status.status === "needs_more_information"
            ? "We need more information before approving your application. Please check your email for details or contact SymbioGreen support."
            : status.status === "suspended"
              ? "This account is suspended. Please contact SymbioGreen support."
              : status.status === "no_profile"
                ? "Your account exists, but no portal profile has been approved yet. Please submit an application or contact SymbioGreen support."
                : "Please sign in with an approved account to access this portal.";

    let panel = document.getElementById("productionAccessStatus");
    if (!panel) {
      const accessShell = document.querySelector("[data-public-section] .access-panel");
      if (accessShell) {
        panel = accessShell.querySelector("[data-access-message]");
        if (!panel) {
          panel = document.createElement("div");
          panel.id = "productionAccessStatus";
          panel.className = "portal-access-message";
          panel.dataset.accessMessage = "true";
          panel.setAttribute("role", "status");
          panel.setAttribute("aria-live", "polite");
          accessShell.appendChild(panel);
        }
      } else {
        panel = document.createElement("section");
        panel.id = "productionAccessStatus";
        panel.className = "production-access-status";
        panel.setAttribute("role", "status");
        document.body.prepend(panel);
      }
    }
    const shell = panel.closest("[data-public-section]");
    const hasShellForm = Boolean(shell?.querySelector("[data-production-login]"));
    panel.innerHTML = `
      <div class="production-access-card">
        <strong>${copy.title}: ${labels[status.status] || (status.backendConfigured === false ? "Backend Not Configured" : "Access Required")}</strong>
        <p>${message}</p>
        ${status.status === "unauthenticated" && !hasShellForm ? loginForm(copy) : ""}
        ${shell ? "" : `<div class="production-access-actions">
          <a class="production-access-button" href="${copy.href}">${copy.apply}</a>
        </div>`}
      </div>
    `;
    bindLoginForm(shell || panel);
  }

  function loginForm(copy) {
    return `
      <form class="production-login-form" data-production-login>
        <label>Email<input name="email" type="email" autocomplete="email" required></label>
        <label>Password<input name="password" type="password" autocomplete="current-password" required></label>
        <button class="production-access-button primary" type="submit">Login</button>
        <button class="production-access-button" type="button" data-production-reset>Forgot Password</button>
      </form>
      <p class="production-access-note">Private dashboard access is available only after application review and approval.</p>
    `;
  }

  function bindLoginForm(panel) {
    const form = panel.querySelector("[data-production-login]");
    if (!form || form.dataset.bound === "true") return;
    const note = panel.querySelector(".production-access-note") || panel.querySelector("[data-access-message]");
    form.dataset.bound = "true";
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      try {
        const result = await window.SymbioAuthGuard.login(data.email, data.password);
        if (result.error) throw result.error;
        window.location.reload();
      } catch (error) {
        if (note) note.textContent = error.message || "Login failed.";
      }
    });
    panel.querySelector("[data-production-reset]")?.addEventListener("click", async () => {
      const email = form.elements.email.value;
      if (!email) {
        if (note) note.textContent = "Enter your email first.";
        return;
      }
      try {
        await window.SymbioAuthGuard.resetPassword(email, window.location.href);
        if (note) note.textContent = "Password reset email requested.";
      } catch (error) {
        if (note) note.textContent = error.message || "Reset failed.";
      }
    });
  }

  function applyVisibility(status) {
    document.querySelectorAll("[data-private-section]").forEach((element) => {
      element.hidden = !status.allowed;
    });
    document.querySelectorAll("[data-public-section]").forEach((element) => {
      element.hidden = status.allowed;
    });
  }

  async function bootFromBodyAttribute() {
    const portalType = document.body?.dataset?.portalType;
    if (!portalType || portalType === "public") return;
    if (isIntentionalDemo(portalType)) return;
    const result = await guardPortal(portalType);
    window.SymbioPortalAccessState = result;
    window.dispatchEvent(new CustomEvent("symbio:portal-access", { detail: result }));
  }

  function isIntentionalDemo(portalType) {
    try {
      if (document.documentElement.dataset.forceDemo === "true" || document.body?.dataset.forceDemo === "true") return true;
      if (portalType === "partner") {
        return window.SYMBIO_FORCE_PARTNER_DEMO === true
          || window.SYMBIO_PARTNER_PREVIEW_ONLY === true
          || localStorage.getItem("symbioPartnerPortalDemo") === "true";
      }
      if (portalType === "investor") {
        return window.SYMBIO_FORCE_INVESTOR_DEMO === true
          || window.SYMBIO_INVESTOR_PREVIEW_ONLY === true
          || localStorage.getItem("symbioInvestorPortalDemo") === "true";
      }
    } catch (error) {
      return false;
    }
    return false;
  }

  window.SymbioPortalAccess = {
    getMyPortalStatus,
    guardPortal,
    isApproved,
    showAccessMessage
  };

  document.addEventListener("DOMContentLoaded", bootFromBodyAttribute);
})();
