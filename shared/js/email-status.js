(function () {
  "use strict";

  const statusLabels = {
    pending: "Pending Review",
    approved: "Approved",
    rejected: "Rejected",
    needs_more_information: "Needs More Information",
    suspended: "Suspended",
    configuration_missing: "Email Provider Not Configured",
    sent: "Email Sent",
    failed: "Email Failed"
  };

  function label(value) {
    return statusLabels[value] || String(value || "Unknown");
  }

  function render(target, value, detail) {
    const element = typeof target === "string" ? document.querySelector(target) : target;
    if (!element) return;
    element.innerHTML = `<strong>${label(value)}</strong>${detail ? `<span>${detail}</span>` : ""}`;
  }

  window.SymbioEmailStatus = { label, render };
})();
