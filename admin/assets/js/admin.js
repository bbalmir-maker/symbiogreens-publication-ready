(function () {
  "use strict";

  console.warn("[Admin] admin/assets/js/admin.js is deprecated. Use admin/app.js for approval decisions.");

  if (window.SYMBIO_ADMIN_APP_LOADED) return;

  const script = document.createElement("script");
  script.src = "app.js";
  script.defer = true;
  document.head.appendChild(script);
})();
