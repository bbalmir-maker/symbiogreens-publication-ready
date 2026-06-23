const model = window.SYMBIO_PARTNER_MODEL;
const backend = window.SymbioPartnerPortalBackend;

function safeGetStorage(key) {
  try {
    return window.localStorage ? localStorage.getItem(key) : null;
  } catch (error) {
    console.warn("localStorage read unavailable:", error);
    return null;
  }
}

function safeSetStorage(key, value) {
  try {
    if (window.localStorage) localStorage.setItem(key, value);
    return true;
  } catch (error) {
    console.warn("localStorage write unavailable:", error);
    return false;
  }
}

function safeRemoveStorage(key) {
  try {
    if (window.localStorage) localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.warn("localStorage remove unavailable:", error);
    return false;
  }
}

function isPartnerDemoEnabled() {
  const demoFlag =
    (window.partnerPortalModel && window.partnerPortalModel.demoFlag) ||
    (window.PARTNER_PORTAL_MODEL && window.PARTNER_PORTAL_MODEL.demoFlag) ||
    model?.demoFlag ||
    "symbioPartnerPortalDemo";

  const forcedDemo =
    window.SYMBIO_FORCE_PARTNER_DEMO === true ||
    window.SYMBIO_PARTNER_PREVIEW_ONLY === true ||
    document.documentElement.dataset.forceDemo === "true" ||
    document.body?.dataset.forceDemo === "true";

  if (forcedDemo) {
    safeSetStorage(demoFlag, "true");
  }

  const enabled =
    forcedDemo;

  return enabled;
}

const demoFlag = model?.demoFlag || "symbioPartnerPortalDemo";
const demoEnabled = isPartnerDemoEnabled();
const accessGate = document.getElementById("accessGate");
const portalShell = document.getElementById("portalShell");
const app = document.getElementById("app");

const state = {
  country: "Dominican Republic",
  region: "Northeast corridor",
  partnerName: "Demo Regional Partner",
  company: "Caribbean Food Systems Group",
  contact: "partner@example.com",
  role: "Project sponsor / operating partner",
  latitude: 19.30,
  longitude: -69.55,
  altitude: 35,
  averageTemp: 27,
  landSize: 12000,
  usablePercent: 45,
  greenhouseArea: 2500,
  supportArea: 620,
  coldChainArea: 240,
  expansionReserve: 3200,
  catchmentArea: 1000,
  rainfall: 1200,
  runoff: 0.8,
  storageDays: 30,
  sunHours: 5.4,
  electricityCost: 0.22,
  electricityReliability: "medium",
  backupPower: "generator-ready",
  waterSource: "well + rainwater capture",
  solarArea: 750,
  crop: "mixed",
  towers: 420,
  cycles: 12,
  price: 3.75,
  waste: 12,
  channel: "Hospitality / resort supply",
  projectSize: "Commercial Hub",
  investment: 1800000,
  partnerContribution: 1170000,
  symbioShare: 30,
  buyers: 28,
  weeklyDemand: 1400,
  priceRange: "Premium local replacement",
  contractWillingness: 62,
  deliveryFrequency: "2-3 deliveries/week",
  paymentQuality: 70,
  deliveryComplexity: 42,
  landReady: 78,
  waterReady: 70,
  energyReady: 62,
  buyerReady: 68,
  financeReady: 55,
  capabilityReady: 72,
  regulatoryReady: 60,
  marketReady: 74,
  logisticsReady: 64
};

const pageRoutes = [
  ["overview", "Overview", "icon-overview"],
  ["partner-model", "Partner Model", "icon-partner-model"],
  ["site-assessment", "Site Assessment", "icon-land"],
  ["water-rainfall", "Water & Rainfall", "icon-rainwater"],
  ["solar-energy", "Solar & Energy", "icon-solar"],
  ["crop-planning", "Crop Planning", "icon-crops"],
  ["revenue-model", "Revenue Model", "icon-revenue"],
  ["market-validation", "Market Validation", "icon-validation"],
  ["financing-pathways", "Financing Pathways", "icon-finance"],
  ["readiness-score", "Readiness Score", "icon-score"],
  ["qa-center", "Q&A Center", "icon-qa"],
  ["action-center", "Action Center", "icon-action"],
  ["documents", "Documents", "icon-docs"]
];

function normalizePage(page) {
  const clean = String(page || "").replace(/^#/, "");
  const aliases = {
    top: "overview",
    model: "partner-model",
    feasibility: "site-assessment",
    rainwater: "water-rainfall",
    production: "crop-planning",
    revenue: "revenue-model",
    market: "market-validation",
    financing: "financing-pathways",
    readiness: "readiness-score",
    qa: "qa-center",
    action: "action-center"
  };
  const resolved = aliases[clean] || clean || "overview";
  return pageRoutes.some(([id]) => id === resolved) ? resolved : "overview";
}

let activePage = normalizePage(window.location.hash);

const qaItems = [
  ["Partnership model", "Is this a franchise?", "No. This is a partnership-based project development model. Local partners typically retain majority ownership while SymbioGreens/Balponics contributes the technical platform, training, installation support, operating playbooks, and long-term supervision."],
  ["Ownership", "Why does SymbioGreens/Balponics keep 25%-35%?", "The minority participation reflects technical know-how, system design, crop model, installation support, training, brand/platform knowledge, project development, and ongoing technical supervision. Final terms depend on project structure and legal agreements."],
  ["Land", "What if I have land but no financing?", "That can still be useful. The next step would be land/water/energy review, market validation, and a financing pathway assessment before any project structure is discussed."],
  ["Market demand", "How do we validate the market before building?", "The portal uses buyer lists, weekly demand estimates, price validation, delivery requirements, willingness to contract, and import-substitution checks to decide whether the project is ready for a concept note."],
  ["Technology", "Who trains the team?", "SymbioGreens/Balponics would provide training structures, operating playbooks, technical supervision, crop protocols, and quality routines. The local partner still needs a reliable operating team."],
  ["Country risk", "Can this work in Africa or another Caribbean market?", "Potentially, but the model must be adapted to local water, climate, energy, buyers, financing, logistics, permits, and operating capability. No country is assumed viable without local validation."],
  ["Pilot", "Can we start with a pilot?", "Yes. A pilot can validate crops, buyers, labor, water, energy, and pricing before a full commercial hub. Pilot terms are still subject to budget, site, and legal review."],
  ["Operations", "What happens if the first crop underperforms?", "The mitigation plan includes staged production, crop trials, training, quality controls, buyer feedback, backup crop plans, and operating adjustments before expansion."]
];

function applyApprovedProfile(profile) {
  if (!profile) return;
  if (profile.full_name) state.partnerName = profile.full_name;
  if (profile.company_name) state.company = profile.company_name;
  if (profile.email) state.contact = profile.email;
  if (profile.role) state.role = profile.role;
  if (profile.country) state.country = profile.country;
  if (profile.city) state.region = profile.city;
}

function unlockPortal(source) {
  accessGate.hidden = true;
  portalShell.hidden = false;
  render();
  window.SYMBIO_PARTNER_DEMO_RENDERED = true;
  const demoError = document.getElementById("demoError");
  if (demoError) demoError.hidden = true;
  backend.trackPartnerPortalEvent("partner_portal_loaded", { source });
}

async function bootPortalAccess() {
  if (demoEnabled) {
    unlockPortal("founder_demo");
    return;
  }
  accessGate.hidden = false;
  portalShell.hidden = true;
  if (window.SymbioPortalAccess?.guardPortal && window.SymbioBackend?.isConfigured()) {
    const access = await window.SymbioPortalAccess.guardPortal("partner");
    if (access.allowed) {
      applyApprovedProfile(access.profile);
      unlockPortal("approved_partner");
    }
  }
}

bootPortalAccess();


document.getElementById("exitDemo")?.addEventListener("click", async () => {
  try {
    await backend.logoutPartner();
  } catch (error) {
    console.warn("Backend logout skipped:", error);
  }
  safeRemoveStorage(demoFlag);
  window.location.href = "index.html";
});

function icon(id) {
  return `<span class="icon"><svg><use href="assets/icons/partner-icons.svg#${id}"></use></svg></span>`;
}

function assetIcon(path, alt = "") {
  return `<span class="icon asset-icon"><img src="assets/icons/${path}" alt="${alt}" loading="lazy"></span>`;
}

function balponicsLinks() {
  return `<footer class="balponics-links" aria-label="Balponics official links"><strong>Balponics</strong><a href="https://www.facebook.com/hydroponicsaeroponicsaquaponics/" target="_blank" rel="noopener noreferrer" aria-label="Balponics Facebook page">Facebook</a><a href="https://www.instagram.com/balponics/" target="_blank" rel="noopener noreferrer" aria-label="Balponics Instagram profile">Instagram</a><a href="https://balponics.com/" target="_blank" rel="noopener noreferrer" aria-label="Balponics website">Website</a></footer>`;
}

function money(value) {
  return Number(value || 0).toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

function number(value, digits = 0) {
  return Number(value || 0).toLocaleString("en-US", { maximumFractionDigits: digits });
}

function pct(value) {
  return `${Math.round(Number(value || 0))}%`;
}

function clamp(value, min = 0, max = 100) {
  return Math.max(min, Math.min(max, Number(value || 0)));
}

function rainwater() {
  const litersYear = state.rainfall * state.catchmentArea * state.runoff;
  const litersMonth = litersYear / 12;
  const litersDay = litersYear / 365;
  const storageLiters = litersDay * state.storageDays;
  return { litersYear, litersMonth, litersDay, storageLiters };
}

function solarScore() {
  const sun = clamp((state.sunHours / 7) * 55, 0, 55);
  const cost = clamp((state.electricityCost / 0.45) * 25, 0, 25);
  const reliability = { low: 20, medium: 12, high: 5 }[state.electricityReliability] || 12;
  const score = clamp(sun + cost + reliability);
  const strategy = score >= 76 ? "Hybrid solar + battery-ready backup" : score >= 58 ? "Solar-assisted grid strategy" : score >= 42 ? "Grid-first with backup readiness" : "Pilot energy audit required";
  return { score, strategy };
}

function footprint() {
  const usable = state.landSize * (state.usablePercent / 100);
  const greenhouse = Math.min(state.greenhouseArea, usable * 0.72);
  const support = greenhouse * 0.22;
  const reserve = Math.max(0, usable - greenhouse - support);
  const scale = greenhouse >= 3500 ? "Regional hub" : greenhouse >= 1500 ? "Commercial hub" : "Pilot hub";
  return { usable, greenhouse, support, reserve, scale };
}

function cropScenario() {
  const crop = model.cropProfiles[state.crop] || model.cropProfiles.mixed;
  const production = state.greenhouseArea * crop.yieldPerM2Cycle * state.cycles * (1 - state.waste / 100);
  const annualRevenue = production * state.price;
  return { crop, production, monthlyVolume: production / 12, annualRevenue, monthlyRevenue: annualRevenue / 12 };
}

function revenueScenario() {
  const crop = cropScenario();
  const low = crop.annualRevenue * 0.82;
  const high = crop.annualRevenue * 1.24;
  return { low, high, monthlyLow: low / 12, monthlyHigh: high / 12 };
}

function ownership() {
  const symbio = clamp(state.symbioShare, 25, 35);
  const partner = 100 - symbio;
  return {
    symbio,
    partner,
    symbioCapital: state.investment * (symbio / 100),
    partnerCapital: state.investment * (partner / 100),
    partnerContributionCoverage: state.partnerContribution / Math.max(1, state.investment)
  };
}

function buyerReadiness() {
  const buyerCount = clamp((state.buyers / 40) * 25, 0, 25);
  const demand = clamp((state.weeklyDemand / 2200) * 25, 0, 25);
  const contracts = clamp(state.contractWillingness * 0.25, 0, 25);
  const terms = clamp(state.paymentQuality * 0.15, 0, 15);
  const logistics = clamp((100 - state.deliveryComplexity) * 0.10, 0, 10);
  const score = clamp(buyerCount + demand + contracts + terms + logistics);
  const next = score >= 76 ? "Prepare buyer-backed concept note" : score >= 58 ? "Validate prices and contract interest" : score >= 40 ? "Run structured buyer interviews" : "Build target buyer list first";
  return { score, next };
}

function readinessScore() {
  const keys = ["landReady", "waterReady", "energyReady", "buyerReady", "financeReady", "capabilityReady", "regulatoryReady", "marketReady", "logisticsReady"];
  const score = keys.reduce((sum, key) => sum + Number(state[key] || 0), 0) / keys.length;
  const label = score >= 76 ? "Ready for concept note" : score >= 62 ? "Needs targeted validation" : score >= 45 ? "Needs land, market, or financing review" : "Not ready yet";
  return { score, label };
}

function feasibilityScore() {
  const rain = rainwater();
  const solar = solarScore();
  const foot = footprint();
  const waterScore = clamp((rain.litersYear / 900000) * 24, 0, 24);
  const energyScore = clamp(solar.score * 0.22, 0, 22);
  const landScore = clamp((foot.greenhouse / 2500) * 20, 0, 20);
  const marketScore = clamp(buyerReadiness().score * 0.22, 0, 22);
  const climateScore = clamp(20 - Math.abs(Number(state.averageTemp || 27) - 25) * 2, 5, 20) * 0.6;
  const score = clamp(waterScore + energyScore + landScore + marketScore + climateScore);
  const flags = [];
  if (rain.litersYear < 500000) flags.push("Water storage/capture needs review");
  if (solar.score < 55) flags.push("Energy reliability needs mitigation");
  if (buyerReadiness().score < 60) flags.push("Buyer validation should happen before design");
  if (state.greenhouseArea > foot.usable * 0.8) flags.push("Greenhouse footprint may be aggressive for usable land");
  if (!flags.length) flags.push("Good candidate for concept-note preparation");
  const next = score >= 76 ? "Prepare concept note and site review" : score >= 60 ? "Run targeted land, buyer, and financing validation" : score >= 42 ? "Complete feasibility information before budgeting" : "Pause until land/water/buyer basics improve";
  return {
    score,
    flags,
    next,
    water: clamp((waterScore / 24) * 100),
    energy: solar.score,
    land: clamp((landScore / 20) * 100),
    buyer: buyerReadiness().score,
    climate: clamp((climateScore / 12) * 100)
  };
}

function updateStateFromInputs(root = document) {
  root.querySelectorAll("[data-field]").forEach((input) => {
    const key = input.dataset.field;
    if (input.type === "number" || input.type === "range") state[key] = Number(input.value || 0);
    else state[key] = input.value;
  });
}

function input(label, field, type = "number", attrs = "") {
  const value = state[field];
  const unit = unitForField(field);
  return `<label><span class="field-label">${label}${unit ? `<small>${unit}</small>` : ""}</span><input data-field="${field}" type="${type}" value="${value}" ${attrs}></label>`;
}

function select(label, field, options) {
  return `<label>${label}<select data-field="${field}">${options.map((option) => `<option value="${option.value}" ${String(state[field]) === String(option.value) ? "selected" : ""}>${option.label}</option>`).join("")}</select></label>`;
}

function unitForField(field) {
  const units = {
    latitude: "degrees",
    longitude: "degrees",
    altitude: "meters",
    landSize: "m2",
    usablePercent: "%",
    greenhouseArea: "m2",
    supportArea: "m2",
    coldChainArea: "m2",
    rainfall: "mm/year",
    catchmentArea: "m2",
    runoff: "0-1 coefficient",
    storageDays: "days",
    sunHours: "hours/day",
    electricityCost: "USD/kWh",
    solarArea: "m2",
    towers: "units",
    cycles: "cycles/year",
    price: "USD per unit/kg",
    waste: "%",
    investment: "USD",
    partnerContribution: "USD",
    buyers: "buyers",
    weeklyDemand: "units/week",
    contractWillingness: "%",
    paymentQuality: "%",
    deliveryComplexity: "%"
  };
  return units[field] || "";
}

function renderPreservingUserPosition(fieldName = "") {
  const main = app.querySelector(".hub-main");
  const mainScrollTop = main ? main.scrollTop : 0;
  const windowX = window.scrollX;
  const windowY = window.scrollY;
  const active = document.activeElement;
  const field = fieldName || active?.dataset?.field || "";
  const selectionStart = typeof active?.selectionStart === "number" ? active.selectionStart : null;
  const selectionEnd = typeof active?.selectionEnd === "number" ? active.selectionEnd : null;

  render();

  const nextMain = app.querySelector(".hub-main");
  if (nextMain) nextMain.scrollTop = mainScrollTop;
  window.scrollTo(windowX, windowY);

  if (field) {
    const escapedField = window.CSS && typeof window.CSS.escape === "function"
      ? window.CSS.escape(field)
      : String(field).replace(/["\\]/g, "\\$&");
    const nextInput = app.querySelector(`[data-field="${escapedField}"]`);
    if (nextInput) {
      nextInput.focus({ preventScroll: true });
      if (selectionStart !== null && typeof nextInput.setSelectionRange === "function") {
        try {
          nextInput.setSelectionRange(selectionStart, selectionEnd);
        } catch (error) {
          // Numeric inputs do not support selection ranges in every browser.
        }
      }
    }
  }
}

const sectionCompletionKeys = {
  "partner-model": null,
  "site-assessment": "landAssessments",
  "water-rainfall": "waterCalculations",
  "solar-energy": "solarAssessments",
  "crop-planning": "cropScenarios",
  "revenue-model": "revenueScenarios",
  "market-validation": "marketSurveys",
  "financing-pathways": null,
  "readiness-score": "readinessScores"
};

function isSectionComplete(pageId) {
  const key = sectionCompletionKeys[pageId];
  if (!key) return false;
  return (backend.readLocal(key, []) || []).length > 0;
}

function trackedSectionIds() {
  return Object.keys(sectionCompletionKeys).filter((id) => sectionCompletionKeys[id]);
}

function overallCompletionPct() {
  const ids = trackedSectionIds();
  if (!ids.length) return 0;
  const done = ids.filter(isSectionComplete).length;
  return Math.round((done / ids.length) * 100);
}

function sectionHead(eyebrow, title, body) {
  return `<div class="section-head"><div><span class="eyebrow">${eyebrow}</span><h2>${title}</h2><p>${body}</p></div></div>`;
}

function sidebarNav() {
  const completionPct = overallCompletionPct();
  return `<aside class="hub-sidebar">
    <a class="hub-brand brand-lockup" href="#overview" data-nav-page="overview" aria-label="SymbioGreens Partner Portal - Powered by Balponics">
      <img class="brand-symbio" src="assets/logos/symbiogreens-logo.png" alt="SymbioGreens">
      <span>Partner Portal</span>
      <small>Powered by Balponics</small>
      <img class="brand-balponics" src="assets/logos/balponics-logo.png" alt="Balponics">
    </a>
    <div class="sidebar-progress" aria-label="Project profile completion">
      <div class="sidebar-progress-bar"><div class="sidebar-progress-fill" style="--progress:${completionPct}%"></div></div>
      <span>${completionPct}% of project profile complete</span>
    </div>
    <nav>${pageRoutes.map(([href, label, iconId]) => `<a class="${href === activePage ? "active" : ""}" href="#${href}" data-nav-page="${href}">${icon(iconId)}<span>${label}</span>${isSectionComplete(href) ? `<span class="nav-complete" aria-label="Completed">&#10003;</span>` : ""}</a>`).join("")}</nav>
    <div class="sidebar-help"><strong>Need Help?</strong><span>Contact our partner team</span><button class="button primary" data-action="requestMeeting" type="button">Request Support</button><button class="button" data-action="exitDemo" type="button">Exit Demo</button></div>
  </aside>`;
}

function ownershipOption(label, partner, symbio, note) {
  return `<article class="card ownership-option">
    <span class="eyebrow">${label}</span>
    <div class="ownership-bar" style="--partner:${partner}%;--symbio:${symbio}%"><span class="partner-share">Partner ${partner}%</span><span class="symbio-share">Platform ${symbio}%</span></div>
    <strong>${note}</strong>
    <p class="muted">Indicative and negotiable. Subject to contribution, risk, territory, financing, operating role, and final agreements.</p>
  </article>`;
}

function wizardStep(num, title, body, iconId) {
  return `<article class="wizard-step"><span>${num}</span>${icon(iconId)}<strong>${title}</strong><p>${body}</p></article>`;
}

function metricCard(title, value, iconId, body) {
  return `<article class="card metric-card">${icon(iconId)}<strong>${pct(value)}</strong><span>${title}</span><p class="muted">${body}</p><div class="score-meter" style="--value:${value}%"><span></span></div></article>`;
}

function scenarioImage(id) {
  const images = {
    pilot: "assets/images/systems/hydroponic-tower-production.png",
    commercial: "assets/images/hero/partner-hub-hero.png",
    hospitality: "assets/images/produce/premium-produce-display.png",
    resilience: "assets/images/water-energy/solar-integrated-greenhouse.png",
    mushroom_microgreen: "assets/images/produce/premium-produce-display.png",
    full_cea_hub: "assets/images/systems/dutch-bucket-fruiting-crops.png"
  };
  return images[id] || "assets/images/hero/partner-hub-hero.png";
}

function visualCard(title, body, image, iconId) {
  return `<article class="visual-card">
    <img src="${image}" alt="${title}" loading="lazy">
    <div>
      ${icon(iconId)}
      <h3>${title}</h3>
      <p>${body}</p>
    </div>
  </article>`;
}

function graphicCard(title, body, graphic, iconId) {
  return `<article class="card graphic-card">${icon(iconId)}
    <div><h3>${title}</h3><p class="muted">${body}</p></div>
    <img src="${graphic}" alt="${title}" loading="lazy">
  </article>`;
}

function benefitCard(title, body, iconPath) {
  return `<article class="card benefit-card">
    ${assetIcon(iconPath, title)}
    <h3>${title}</h3>
    <p>${body}</p>
    <details><summary>Why it matters</summary><p>This turns a local asset or market gap into a clearer project-development advantage before capital, equipment, or legal work begins.</p></details>
  </article>`;
}

function partnerStorySection() {
  const benefits = [
    ["Import substitution", "Produce more fresh food locally and reduce dependency on distant suppliers.", "bold/regional-expansion.svg"],
    ["Higher-value production", "Use controlled systems to grow premium leafy greens, herbs, microgreens, mushrooms, and specialty crops in efficient footprints.", "bold/premium-produce.svg"],
    ["Water and resource efficiency", "Hydroponic systems can use water more efficiently than traditional open-field models when properly designed and managed.", "bold/water-capture.svg"],
    ["Market-ready consistency", "Hotels, resorts, chefs, supermarkets, and institutions need reliable quality, delivery, and supply.", "market/hotel-resort.svg"],
    ["A path into a new sector", "Partners can reconvert land, relationships, and local market access into a modern agribusiness platform.", "bold/ownership-structure.svg"]
  ];
  return `<section class="story-section">
    <div class="story-grid">
      <div class="story-copy">
        <span class="eyebrow">Strategic operating partnership</span>
        <h2>This is not just farming. It is a regional food platform opportunity.</h2>
        <p>Across the Caribbean, island markets, Africa, and other regions, fresh produce is often imported, expensive, inconsistent, or exposed to supply-chain disruption. SymbioGreens/Balponics is building a partner-driven model to help qualified local partners develop controlled-environment agriculture hubs adapted to their land, climate, water, buyers, and financing reality.</p>
        <p>This is not a simple franchise and it is not just a consulting service. It is a strategic operating partnership. The local partner brings land, territory access, relationships, buyer knowledge, and a financing pathway. SymbioGreens/Balponics brings the hydroponic know-how, system design, installation support, training, production planning, operating playbooks, technology guidance, and long-term technical supervision.</p>
        <p>The goal is to make modern food production more accessible, more disciplined, and more scalable, allowing local partners to enter a fast-growing field where agriculture, technology, sustainability, premium produce, and food resilience come together.</p>
        <div class="hero-actions"><a class="button primary" href="#site-assessment" data-nav-page="site-assessment">Start Site Assessment</a><a class="button" href="#partner-model" data-nav-page="partner-model">Review Partner Roles</a></div>
      </div>
      <div class="story-proof">
        <img src="assets/images/training/partner-training-and-technical-support.png" alt="Partner team reviewing controlled-environment agriculture systems" loading="lazy">
        <div class="proof-callout"><strong>Platform support</strong><span>Design, training, crop planning, market validation, installation support, and operating playbooks.</span></div>
      </div>
    </div>
    <div class="section-head"><div><span class="eyebrow">Why this opportunity matters</span><h2>Local partners can build more than a farm.</h2><p>They can develop a modern agriculture hub connected to premium buyers, resource planning, and repeatable operating discipline.</p></div></div>
    <div class="grid five benefit-grid">${benefits.map(([title, body, iconPath]) => benefitCard(title, body, iconPath)).join("")}</div>
  </section>`;
}

function brandCredibilitySection() {
  return `<section class="brand-credibility">
    <div class="brand-card"><img src="assets/logos/symbiogreens-logo.png" alt="SymbioGreens"><div><strong>SymbioGreens</strong><span>Market-facing farm and platform brand focused on premium local hydroponic production.</span></div></div>
    <div class="brand-plus">+</div>
    <div class="brand-card"><img src="assets/logos/balponics-logo.png" alt="Balponics"><div><strong>Balponics</strong><span>Hydroponic solutions provider and technical backbone for systems, training, and operating support.</span></div></div>
    <div class="brand-powered">SymbioGreens Partner Portal - Powered by Balponics</div>
  </section>`;
}

function technologyModelSection() {
  const items = [
    ["Hydroponic towers", "High-density greens and herbs production.", "bold/hydroponic-towers.svg"],
    ["NFT channels", "Consistent channel-based leafy green systems.", "bold/nft-systems.svg"],
    ["Dutch buckets", "Fruiting crops with controlled nutrient delivery.", "bold/dutch-bucket-systems.svg"],
    ["Microgreens", "Fast-cycle premium crop modules.", "bold/premium-produce.svg"],
    ["Water capture", "Rainfall, catchment, storage, and resilience planning.", "bold/water-capture.svg"],
    ["Solar planning", "Energy strategy and backup-readiness review.", "bold/solar-energy.svg"],
    ["Cold chain", "Post-harvest quality, delivery, and buyer standards.", "risk/post-harvest.svg"],
    ["Market validation", "Buyer demand, price, delivery, and payment evidence.", "market/supermarket.svg"],
    ["Operating playbooks", "Training, SOPs, quality routines, and supervision.", "bold/operations-management.svg"]
  ];
  return `<section class="technology-section">${sectionHead("Technology Behind The Model", "A practical system, not guesswork", "The platform combines production methods, resource planning, buyer validation, and operating discipline so partners do not have to invent the technical system from scratch.")}
    <div class="technology-layout">
      <img src="assets/images/systems/hydroponic-tower-production.png" alt="Hydroponic tower production" loading="lazy">
      <div class="technology-grid">${items.map(([title, body, iconPath]) => `<article>${assetIcon(iconPath, title)}<strong>${title}</strong><span>${body}</span></article>`).join("")}</div>
    </div>
  </section>`;
}

function pitchPanel(title, body, cta, page) {
  return `<section class="pitch-panel">
    <div>${icon("icon-score")}<h3>${title}</h3><p>${body}</p></div>
    <a class="button primary" href="#${page}" data-nav-page="${page}">${cta}</a>
  </section>`;
}

function pageShell(id, title, eyebrow, body, visual, content) {
  return `<article class="portal-page ${id === activePage ? "active" : ""}" id="${id}" data-page="${id}" aria-labelledby="${id}-title">
    <div class="page-title">
      <div><span class="eyebrow">${eyebrow}</span><h2 id="${id}-title">${title}</h2><p>${body}</p></div>
      ${visual || ""}
    </div>
    ${content}
  </article>`;
}

function ecosystemSection() {
  const items = [
    ["Land Assessment", "Site control, access, terrain, drainage, and expansion reserve.", "bold/land-assessment.svg"],
    ["Greenhouse Development", "Concept design for controlled-environment agriculture hubs.", "bold/greenhouse-development.svg"],
    ["Hydroponic Towers", "High-density vertical systems for greens, herbs, and specialty crops.", "bold/hydroponic-towers.svg"],
    ["NFT Systems", "Channel-based production for consistent leafy green programs.", "bold/nft-systems.svg"],
    ["Dutch Bucket Systems", "Irrigated fruiting crop systems for tomatoes, peppers, and cucumbers.", "bold/dutch-bucket-systems.svg"],
    ["Rainfall Analysis", "Local rainfall inputs translated into capture and storage assumptions.", "bold/rainfall-analysis.svg"],
    ["Water Capture", "Catchment, runoff, filtration, storage, and backup planning.", "bold/water-capture.svg"],
    ["Solar Energy", "Solar-assisted energy strategy and backup readiness.", "bold/solar-energy.svg"],
    ["Crop Planning", "Crop mix, cycles, waste, cold chain, and buyer validation.", "bold/premium-produce.svg"],
    ["Premium Produce", "Market-ready leafy greens, herbs, cucumbers, peppers, and microgreens.", "bold/premium-produce.svg"],
    ["Market Survey", "Buyer interviews, prices, delivery rhythm, and payment terms.", "market/supermarket.svg"],
    ["Buyer Demand", "Anchor buyer lists and weekly demand validation.", "market/hotel-resort.svg"],
    ["Financing Pathways", "Bank, DFI, climate, food-security, and equipment routes to explore.", "bold/financing-pathway.svg"],
    ["Ownership Structure", "Majority local ownership with negotiated platform participation.", "bold/ownership-structure.svg"],
    ["Training Support", "Installation support, SOPs, crop protocols, and technical supervision.", "bold/training-support.svg"],
    ["Operations Management", "Operating playbooks for production, quality, and staffing routines.", "bold/operations-management.svg"],
    ["Cold Chain", "Post-harvest handling, storage, delivery, and buyer quality standards.", "risk/post-harvest.svg"],
    ["Logistics", "Delivery frequency, routes, service levels, and distribution realities.", "market/distributor-truck.svg"],
    ["Quality Control", "Production checks, traceability routines, and buyer feedback loops.", "risk/quality-control.svg"],
    ["Automation", "Future sensor, reporting, and operating intelligence structure.", "bold/analytics-dashboard.svg"],
    ["Secure Documents", "Private materials remain controlled and released by approval.", "documents/locked-document.svg"],
    ["Partner Access", "Approved partner workflows for project review and next steps.", "bold/request-meeting.svg"],
    ["Regional Expansion", "Repeatable hub development across qualified territories.", "bold/regional-expansion.svg"],
    ["Sustainability", "Water, energy, local food supply, and resilient agriculture planning.", "bold/sustainability.svg"]
  ];
  return `<section id="ecosystem" class="ecosystem-section">${sectionHead("Platform Ecosystem", "Partner Platform Ecosystem", "Everything needed to turn local land and market access into a controlled-environment agriculture hub.")}
    <div class="ecosystem-grid">${items.map(([title, body, iconPath]) => `<article class="ecosystem-card">${assetIcon(iconPath, title)}<h3>${title}</h3><p>${body}</p><details><summary>Learn more</summary><p>Use this capability to reduce uncertainty, prepare stronger project evidence, and move from interest to a practical development pathway.</p></details></article>`).join("")}</div>
  </section>`;
}

function gallerySection() {
  const cards = [
    ["Vertical Tower Production", "High-density vertical production for leafy greens, herbs, and specialty crops.", "assets/images/systems/hydroponic-tower-production.png", "icon-hydroponics"],
    ["NFT Lettuce Production", "Clean channel-based systems for consistent greens production.", "assets/images/hero/partner-hub-hero.png", "icon-crops"],
    ["Dutch Bucket Fruiting Crops", "Fruiting crops using controlled irrigation and nutrient delivery.", "assets/images/systems/dutch-bucket-fruiting-crops.png", "icon-water"],
    ["Solar-Integrated Greenhouse", "Energy planning for resilient regional operations.", "assets/images/water-energy/solar-integrated-greenhouse.png", "icon-solar"],
    ["Premium Produce", "Market-ready greens, herbs, cucumbers, peppers, tomatoes, and microgreens.", "assets/images/produce/premium-produce-display.png", "icon-market"],
    ["Training & Technical Support", "Installation, training, SOPs, and long-term technical supervision.", "assets/images/training/partner-training-and-technical-support.png", "icon-support"]
  ];
  return `<section id="systems-gallery" class="gallery-section">${sectionHead("Systems Gallery", "Systems & Produce Gallery", "Bright visual references for the production systems, produce quality, energy planning, and technical-support experience behind the partner platform.")}
    <div class="photo-gallery">${cards.map(([title, body, image, iconId]) => visualCard(title, body, image, iconId)).join("")}</div>
  </section>`;
}

function howItWorksSection() {
  const steps = [
    ["01", "Territory/site", "Partner submits country, region, land and site context.", "icon-territory"],
    ["02", "Land, water, solar", "The platform reviews climate, capture, energy and footprint.", "icon-solar"],
    ["03", "Market validation", "Buyer demand, price, delivery and payment evidence are gathered.", "icon-survey"],
    ["04", "Crop and revenue", "Crop mix, production potential and revenue scenarios are modeled.", "icon-crops"],
    ["05", "Financing pathway", "Potential funding routes and contribution capacity are assessed.", "icon-finance"],
    ["06", "JV structure", "Ownership, roles, risk and legal path are prepared for review.", "icon-ownership"],
    ["07", "Concept note", "Qualified projects move into budget, design and documentation.", "icon-docs"],
    ["08", "Build + operate", "Installation, training, pilot production and expansion follow.", "icon-installation"]
  ];
  return `<section class="pathway-section" id="pathway">${sectionHead("How This Works", "A Guided Path From Territory to Operating Hub", "The portal reduces uncertainty before money is committed, documents are prepared, or equipment is specified.")}
    <div class="pathway">${steps.map(([num, title, body, iconId]) => `<article><span>${num}</span>${icon(iconId)}<strong>${title}</strong><p>${body}</p><details><summary>Learn more</summary><p>Why it matters: this step turns interest into evidence the partner can use for the next development decision.</p></details></article>`).join("")}</div>
  </section>`;
}

function qualificationSection() {
  return `<section id="qualification">${sectionHead("Partner Qualification", "Project Profile Before Any Build Decision", "This profile turns the partner opportunity into a serious project-development record: who is leading, what site is available, what market exists, and what financing pathway is realistic.")}
    <div class="wizard-rail">
      ${wizardStep("01", "Partner identity", "Country, company, lead contact and operating role.", "icon-territory")}
      ${wizardStep("02", "Land/site", "Land control, access, usable area and expansion reserve.", "icon-land")}
      ${wizardStep("03", "Water + energy", "Water source, rainfall, grid reliability and backup strategy.", "icon-water")}
      ${wizardStep("04", "Market + buyers", "Hotels, resorts, distributors, institutions and buyer readiness.", "icon-buyers")}
      ${wizardStep("05", "Finance readiness", "Contribution capacity and financing pathway realism.", "icon-finance")}
      ${wizardStep("06", "Concept note", "Save profile and request structured review.", "icon-docs")}
    </div>
    <div class="tool-grid guided-tool">
      <div class="card">
        <h3>Partner Identity</h3>
        <div class="form-grid">
          ${input("Name / lead", "partnerName", "text")}
          ${input("Company / group", "company", "text")}
          ${input("Contact", "contact", "text")}
          ${input("Role", "role", "text")}
          ${input("Country", "country", "text")}
          ${input("Region / city", "region", "text")}
        </div>
        <h3>Land, Site, Market and Finance</h3>
        <div class="grid three qualification-grid">
          <article class="card">${icon("icon-land")}<strong>Land/site</strong><span class="muted">${number(state.landSize)} m2, ${state.ownershipStatus || "Owned"} status, road and service access to validate.</span></article>
          <article class="card">${icon("icon-water")}<strong>Water/electricity</strong><span class="muted">${state.waterSource}; grid reliability ${state.electricityReliability}; backup ${state.backupPower}.</span></article>
          <article class="card">${icon("icon-buyers")}<strong>Market</strong><span class="muted">${state.buyers} potential buyers, ${state.channel}, ${state.deliveryFrequency}.</span></article>
          <article class="card">${icon("icon-finance")}<strong>Finance</strong><span class="muted">${money(state.partnerContribution)} partner contribution pathway against ${money(state.investment)} project estimate.</span></article>
          <article class="card">${icon("icon-government")}<strong>Institutional support</strong><span class="muted">Permits, incentives, food-resilience programs, and government/NGO routes to validate.</span></article>
          <article class="card">${icon("icon-score")}<strong>Qualification status</strong><span class="muted">${readinessScore().label}. Save profile before requesting concept note.</span></article>
        </div>
        <button class="button primary" data-action="saveQualification">Save Qualification Profile</button>
      </div>
      <div class="result-panel">
        <h3>${state.company}</h3>
        <strong class="big-number">${pct(feasibilityScore().score)}</strong>
        <span>Preliminary feasibility signal</span>
        <div class="score-meter" style="--value:${feasibilityScore().score}%"><span></span></div>
        <p>${feasibilityScore().next}</p>
      </div>
    </div>
  </section>`;
}

function waterPage(rain) {
  return `<section class="tool-page-section" id="rainwater">
    <div class="tool-grid">
      <div class="card tool-card">
        ${icon("icon-rainfall")}
        <h3>Rainwater Capture Calculator</h3>
        <div class="form-grid">
          ${input("Rainfall mm/year", "rainfall")}
          ${input("Catchment area m2", "catchmentArea")}
          ${input("Runoff coefficient", "runoff", "number", "step='0.05' min='0' max='1'")}
          ${input("Storage target days", "storageDays")}
        </div>
        <button class="button primary" data-action="saveRainwater">Save Water Calculation</button>
      </div>
      <div class="result-panel water-result">
        <span class="eyebrow">Water output</span>
        <strong class="big-number">${number(rain.litersYear)} L</strong>
        <span>per year capture estimate</span>
        <div class="grid three">
          <article class="card kpi">${icon("icon-water")}<span>Monthly</span><strong>${number(rain.litersMonth)} L/mo</strong></article>
          <article class="card kpi">${icon("icon-rainwater")}<span>Daily</span><strong>${number(rain.litersDay)} L/day</strong></article>
          <article class="card kpi">${icon("icon-score")}<span>Suggested storage</span><strong>${number(rain.storageLiters)} L</strong></article>
        </div>
        <p><strong>Formula:</strong> rainfall mm x catchment area m2 x runoff coefficient. Final design still requires engineering and water-quality review.</p>
      </div>
    </div>
    <div class="page-photo-band"><img src="assets/images/water-energy/solar-integrated-greenhouse.png" alt="Greenhouse with renewable infrastructure" loading="lazy"><div><h3>Water resilience supports commercial reliability</h3><p>Capture, storage, backup source, filtration, and operating discipline are part of the feasibility review.</p></div></div>
  </section>`;
}

function solarPage(solar) {
  return `<section class="tool-page-section" id="solar-energy-tool">
    <div class="tool-grid">
      <div class="card tool-card">
        ${icon("icon-solar")}
        <h3>Solar / Energy Potential</h3>
        <div class="form-grid">
          ${input("Sun hours/day", "sunHours", "number", "step='0.1'")}
          ${input("Electricity cost/kWh", "electricityCost", "number", "step='0.01'")}
          ${input("Solar area m2", "solarArea")}
          ${select("Grid reliability", "electricityReliability", [{value:"low", label:"Low"}, {value:"medium", label:"Medium"}, {value:"high", label:"High"}])}
          ${select("Backup power", "backupPower", [{value:"none", label:"No backup"}, {value:"generator-ready", label:"Generator-ready"}, {value:"battery-ready", label:"Battery-ready"}, {value:"hybrid", label:"Hybrid planned"}])}
        </div>
        <button class="button primary" data-action="saveSolar">Save Energy Assessment</button>
      </div>
      <div class="result-panel">
        <span class="eyebrow">Energy output</span>
        <strong class="big-number">${pct(solar.score)}</strong>
        <span>solar suitability score</span>
        <div class="score-meter" style="--value:${solar.score}%"><span></span></div>
        <h3>${solar.strategy}</h3>
        <p>Energy recommendations are planning signals only. Final design requires load modeling, equipment specification, backup review, and site-specific engineering.</p>
      </div>
    </div>
    <div class="grid three">
      ${metricCard("Sun Hours", clamp((state.sunHours / 7) * 100), "icon-solar", `${state.sunHours} hours/day entered`)}
      ${metricCard("Grid Pressure", state.electricityReliability === "low" ? 82 : state.electricityReliability === "medium" ? 58 : 34, "icon-electricity", `${state.electricityReliability} reliability selected`)}
      ${metricCard("Backup Readiness", state.backupPower === "hybrid" ? 88 : state.backupPower === "battery-ready" ? 74 : state.backupPower === "generator-ready" ? 62 : 28, "icon-score", `${state.backupPower} backup status`)}
    </div>
  </section>`;
}

function render() {
  const rain = rainwater();
  const solar = solarScore();
  const foot = footprint();
  const crop = cropScenario();
  const rev = revenueScenario();
  const own = ownership();
  const buyers = buyerReadiness();
  const ready = readinessScore();
  const feasible = feasibilityScore();

  app.innerHTML = `<div class="hub-layout">
    ${sidebarNav()}
    <div class="hub-main app-pages">
      ${pageShell("overview", "Build a Controlled-Environment Agriculture Hub in Your Territory", "Bring the land. Bring the territory. Build with our platform.", "Bring the land, local relationships, buyers, and financing pathway. SymbioGreens/Balponics brings the design, technical system, training, installation support, and operating platform.", "", `
        <section class="hero premium-hero">
          <div class="hero-copy">
            <span class="eyebrow">Regional partner platform</span>
            <h1>Build a Controlled-Environment Agriculture Hub in Your Territory</h1>
            <p>Bring the land, local relationships, buyers, and financing pathway. SymbioGreens/Balponics brings the technical platform, training, design, installation support, and operating system.</p>
            <div class="hero-actions">
              <a class="button primary" href="#site-assessment" data-nav-page="site-assessment">Start Site Assessment</a>
              <a class="button" href="#partner-model" data-nav-page="partner-model">Review Partner Model</a>
            </div>
          </div>
          <div class="hero-visual photo-hero" aria-label="Bright hydroponic greenhouse rows">
            <img src="assets/images/hero/partner-hub-hero.png" alt="Bright hydroponic greenhouse rows" loading="eager">
            <div class="hero-compass">${icon("icon-territory")}<strong>${state.country}</strong><span>${state.region}</span></div>
            <div class="greenhouse-card">${icon("icon-greenhouse")}<strong>${number(foot.greenhouse)} m2</strong><span>${foot.scale} footprint</span></div>
            <div class="water-card">${icon("icon-water")}<strong>${number(rain.litersYear)} L/yr</strong><span>Rainwater capture estimate</span></div>
            <div class="solar-card">${icon("icon-solar")}<strong>${pct(feasible.score)}</strong><span>Preliminary feasibility</span></div>
          </div>
        </section>
        ${brandCredibilitySection()}
        ${partnerStorySection()}
        <section class="snapshot-band compact-section">${sectionHead("Dashboard", "Partner Project Snapshot", "A focused first look at ownership, platform contribution, tools, and next-step readiness.")}
          <div class="grid four dashboard-grid">
            <article class="card kpi">${icon("icon-ownership")}<span>Partner ownership</span><strong>65%-75%</strong><p class="muted">Majority local participation keeps the territory partner economically aligned.</p></article>
            <article class="card kpi">${icon("icon-support")}<span>Platform participation</span><strong>25%-35%</strong><p class="muted">Reflects technical know-how, operating playbooks, design, training, and supervision.</p></article>
            <article class="card kpi">${icon("icon-greenhouse")}<span>Hub footprint</span><strong>${number(foot.greenhouse)} m2</strong><p class="muted">A disciplined footprint can test production, buyers, staff, and expansion logic.</p></article>
            <article class="card kpi">${icon("icon-survey")}<span>Tools</span><strong>Land + Water + Solar + Buyers</strong><p class="muted">The model connects site reality to market demand before construction.</p></article>
          </div>
        </section>
        ${technologyModelSection()}
        ${ecosystemSection()}
        ${howItWorksSection()}
      `)}

      ${pageShell("partner-model", "Partnership & Ownership Model", "Partner Model", "Local partners typically retain majority ownership while SymbioGreens/Balponics contributes technical platform, system design, training, and long-term operating support.", graphicCard("Ownership split", "Three indicative structures: 75/25, 70/30, and 65/35. Final terms are negotiated.", "assets/section-graphics/svg/ownership-split-65-35.svg", "icon-ownership"), `
        ${pitchPanel("Build with platform support, not from zero", "The partner brings land, relationships, territory knowledge, buyers, and financing pathways. SymbioGreens/Balponics brings the controlled-environment agriculture system, training, project discipline, and long-term technical support.", "Start site profile", "site-assessment")}
        <section>${sectionHead("Ownership", "Majority Local Ownership, Platform-Level Support", "Local partners typically retain 65%-75%. SymbioGreens/Balponics typically retains a negotiated 25%-35% minority participation.")}
          <div class="grid two">
            <article class="card contribution-card">${icon("icon-land")}<h3>Local Partner Brings</h3><p>Land or site access, territory access, permits, buyer relationships, local market knowledge, operating team, financing pathway, and government or institutional relationships where available.</p></article>
            <article class="card contribution-card with-photo"><img src="assets/images/training/partner-training-and-technical-support.png" alt="Partner training in greenhouse" loading="lazy"><div>${icon("icon-hydroponics")}<h3>SymbioGreens/Balponics Brings</h3><p>Hydroponic know-how, crop model, system design, installation support, training, production planning, quality control, market survey methodology, and long-term technical supervision.</p></div></article>
          </div>
          <div class="grid three ownership-options">
            ${ownershipOption("Option A", 75, 25, "Light platform participation")}
            ${ownershipOption("Option B", 70, 30, "Balanced project-development model")}
            ${ownershipOption("Option C", 65, 35, "Preferred maximum platform participation")}
          </div>
        </section>
        ${ownershipSection(own)}
      `)}

      ${pageShell("site-assessment", "Site Assessment & Feasibility Cockpit", "Site Assessment", "Define country, region, land, channels, and feasibility before any project build decision.", graphicCard("Feasibility cockpit", "Land, water, solar, climate, buyers, and next-step readiness in one decision view.", "assets/section-graphics/svg/site-feasibility-cockpit.svg", "icon-land"), `
        ${pitchPanel("The land becomes a decision system", "A serious project begins with the territory: water, energy, access, buyers, operating capability, and financing reality. This page turns local context into a structured project profile.", "Review water resilience", "water-rainfall")}
        <section class="page-photo-band"><img src="assets/images/systems/hydroponic-tower-production.png" alt="Vertical hydroponic production system" loading="lazy"><div><h3>Turn local context into a project profile</h3><p>Use this page to define the territory, site, land area, ownership status, and preliminary feasibility signal.</p></div></section>
        ${qualificationSection()}
        ${territorySection()}
        ${feasibilitySection(rain, solar, foot, feasible)}
      `)}

      ${pageShell("water-rainfall", "Water & Rainfall Resilience", "Water Capture", "Estimate annual capture, monthly supply, daily availability, and storage requirements from rainfall and catchment assumptions.", graphicCard("Water capture diagram", "Annual water capture = rainfall mm x catchment area m2 x runoff coefficient.", "assets/section-graphics/svg/water-capture-diagram.svg", "icon-rainwater"), `${pitchPanel("Water planning protects the opportunity", "Controlled production needs disciplined water thinking. Rainfall, catchment, storage, source reliability, and treatment shape whether the hub can operate consistently.", "Review energy path", "solar-energy")}${waterPage(rain)}`)}

      ${pageShell("solar-energy", "Solar & Energy Planning", "Solar & Energy", "Review sun hours, grid reliability, electricity cost, backup power, and solar suitability for resilient operations.", visualCard("Solar-integrated greenhouse", "Energy planning for resilient regional operations.", "assets/images/water-energy/solar-integrated-greenhouse.png", "icon-solar"), `${pitchPanel("Energy strategy makes the hub more resilient", "Solar, grid reliability, electricity cost, batteries, and generator readiness influence operating cost and production confidence in island and regional markets.", "Plan crops", "crop-planning")}${solarPage(solar)}`)}

      ${pageShell("crop-planning", "Crop Planning & Production Systems", "Crop Planning", "Explore hydroponic towers, NFT-style greens, Dutch buckets, microgreens, mushrooms, and market-ready produce models.", visualCard("Premium produce systems", "Crop planning connects production systems to real buyer demand.", "assets/images/produce/premium-produce-display.png", "icon-crops"), `
        ${pitchPanel("The crop mix is the commercial strategy", "The best system is not the biggest system. It is the one matched to buyers, delivery rhythm, price points, cold chain, labor, and production discipline.", "Compare revenue scenarios", "revenue-model")}
        ${productionSection(crop, rev)}
        ${gallerySection()}
      `)}

      ${pageShell("revenue-model", "Revenue Model Scenarios", "Revenue Model", "Compare illustrative project scales without treating any scenario as a guaranteed financial outcome.", graphicCard("Scenario planning", "Revenue ranges require buyer validation, budget design, operating plan, and legal review.", "assets/section-graphics/svg/partner-process-flow.svg", "icon-revenue"), `${pitchPanel("Revenue follows validation, not hope", "Scenario cards help the partner understand project scale, staffing, complexity, and buyer evidence needed before a budget or financing path is treated seriously.", "Validate buyers", "market-validation")}${revenueModelSection()}`)}

      ${pageShell("market-validation", "Market Validation Toolkit", "Buyer Demand", "Validate real buyer categories, weekly demand, pricing, delivery rhythm, and payment quality before construction.", visualCard("Market-ready produce", "Premium produce quality must connect to validated buyer demand.", "assets/images/produce/premium-produce-display.png", "icon-buyers"), `
        ${pitchPanel("The market must pull the project forward", "Hotels, resorts, chefs, supermarkets, distributors, institutions, and food-resilience buyers need consistency. The portal helps convert interest into evidence.", "Explore financing", "financing-pathways")}
        ${marketSection(buyers)}
        ${buyerDemandSection(buyers)}
      `)}

      ${pageShell("financing-pathways", "Financing Pathways", "Potential Pathways", "Explore financing routes carefully. Nothing here guarantees capital, grants, lender approval, or program eligibility.", graphicCard("Financing pathway map", "Potential routes depend on country, documentation, offtakers, eligibility, and project readiness.", "assets/section-graphics/svg/financing-pathway-map.svg", "icon-finance"), `
        ${pitchPanel("Financing needs a credible project story", "A stronger project package connects land, water, energy, buyers, crop plan, budget discipline, offtaker evidence, and operating capability. Financing is explored, never guaranteed.", "Check readiness", "readiness-score")}
        ${financingSection()}
        ${roadmapSection()}
      `)}

      ${pageShell("readiness-score", "Readiness Score & Risk Review", "Diagnostic Result", "Score the partner profile across land, water, energy, buyer, finance, capability, regulatory, market, and logistics readiness.", graphicCard("Risk mitigation", "Surface hard questions early before budget, financing, or legal structuring.", "assets/section-graphics/svg/risk-mitigation-matrix.svg", "icon-risk"), `
        ${pitchPanel("Readiness is the bridge from interest to action", "This diagnostic shows where the opportunity is strong and where more evidence is needed. A serious partner can use it to prepare the next conversation.", "Ask questions", "qa-center")}
        ${readinessSection(ready)}
        ${riskSection()}
      `)}

      ${pageShell("qa-center", "Q&A Center", "Support", "Answer real partner objections, rate answers, save comments, and request follow-up.", visualCard("Training and technical support", "Installation, SOPs, crop protocols, and technical supervision are part of the platform support model.", "assets/images/training/partner-training-and-technical-support.png", "icon-qa"), `${pitchPanel("The best partners ask the hard questions early", "This page handles objections before they become expensive mistakes: market risk, water risk, operating risk, financing risk, training, and scalability.", "Move to action center", "action-center")}${qaSection()}`)}

      ${pageShell("action-center", "Action Center", "Next Steps", "Save project actions, request a concept note, request technical review, and capture preferred ownership or financing status.", visualCard("Ready to build together", "Turn a territory into a structured project-development conversation.", "assets/images/systems/dutch-bucket-fruiting-crops.png", "icon-action"), `${pitchPanel("Turn the territory into a reviewed project", "The next step is not a blind build. It is a structured review: project profile, feasibility evidence, buyer validation, financing status, and concept-note readiness.", "Review documents", "documents")}${actionSection()}`)}

      ${pageShell("documents", "Private Document Room", "Documents", "No private documents are included in this static build. Document access is available after review and final release.", graphicCard("Secure document room", "Locked material cards show the future document workflow without exposing private files.", "assets/section-graphics/svg/secure-document-room.svg", "icon-docs"), `${pitchPanel("Private materials come after review", "The portal shows the future document workflow without exposing private files. Real materials should be released only after approval, authentication, and proper access controls.", "Return to overview", "overview")}${documentSection()}`)}

      <section class="disclaimer"><strong>Compliance note:</strong> ${model.disclaimer} No financing, profitability, government support, buyer contracts, project approval, or fixed ownership terms are guaranteed.</section>
      ${balponicsLinks()}
    </div>
  </div>`;

  app.querySelectorAll("[data-field]").forEach((inputEl) => {
    inputEl.addEventListener("input", () => {
      updateStateFromInputs(app);
      backend.trackPartnerPortalEvent("tool_input_changed", { field: inputEl.dataset.field });
    });
    inputEl.addEventListener("change", () => {
      updateStateFromInputs(app);
      backend.trackPartnerPortalEvent("tool_field_committed", { field: inputEl.dataset.field });
    });
  });
  setupPageNavigation();
  bindActions();
}

function setupPageNavigation() {
  app.querySelectorAll("[data-nav-page]").forEach((link) => {
    link.addEventListener("click", (event) => {
      const page = normalizePage(link.dataset.navPage || link.getAttribute("href"));
      if (window.location.hash !== `#${page}`) {
        window.location.hash = page;
      } else {
        activePage = page;
        render();
        scrollActivePageToTop();
      }
      event.preventDefault();
    });
  });
}

function scrollActivePageToTop() {
  const main = app.querySelector(".hub-main");
  if (main) main.scrollTo({ top: 0, behavior: "smooth" });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

if (!window.SYMBIO_PARTNER_HASH_ROUTER_READY) {
  window.SYMBIO_PARTNER_HASH_ROUTER_READY = true;
  window.addEventListener("hashchange", () => {
    const nextPage = normalizePage(window.location.hash);
    if (nextPage !== activePage) {
      activePage = nextPage;
      render();
      scrollActivePageToTop();
    }
  });
}

function territorySection() {
  return `<section id="territory">${sectionHead("Country / Territory Profile", "Define the Local Project Context", "Start with manual territory inputs. Later this can connect to climate and solar APIs by latitude and longitude.")}
    <div class="tool-grid">
      <div class="card form-grid">
        ${input("Country", "country", "text")}
        ${input("Region / city", "region", "text")}
        ${input("Latitude", "latitude", "number", "step='0.01'")}
        ${input("Longitude", "longitude", "number", "step='0.01'")}
        ${input("Altitude, meters", "altitude")}
        ${input("Land size, m2", "landSize")}
        ${select("Ownership status", "ownershipStatus", [{value:"Owned", label:"Owned"}, {value:"Optioned", label:"Optioned"}, {value:"Negotiating", label:"Negotiating"}, {value:"Needs site", label:"Needs site"}])}
        ${select("Target channels", "channel", [{value:"Hospitality / resort supply", label:"Hospitality / resort supply"}, {value:"Retail + distributors", label:"Retail + distributors"}, {value:"Food security / institutions", label:"Food security / institutions"}, {value:"Mixed channels", label:"Mixed channels"}])}
      </div>
      <div class="result-panel">
        <h3>${state.country} / ${state.region}</h3>
        <p>Project context is ready for preliminary site, water, energy, buyer, financing, and operating capability assessment.</p>
        <div class="grid two">
          <article class="card"><strong>${number(state.landSize)} m2</strong><span class="muted">land under review</span></article>
          <article class="card"><strong>${state.channel}</strong><span class="muted">primary market channel</span></article>
        </div>
        <button class="button primary" data-action="saveProjectProfile">Save Territory Profile</button>
      </div>
    </div>
  </section>`;
}

function feasibilitySection(rain, solar, foot, feasible) {
  return `<section id="feasibility" class="cockpit-section">${sectionHead("Feasibility Cockpit", "Water, Solar, Land, Buyers and Climate in One Decision View", "Manual first version. Future versions can connect latitude/longitude to NASA POWER, Open-Meteo, or other climate/solar data sources.")}
    <div class="result-panel feasibility-summary cockpit-summary">
      <div>
        <span class="eyebrow">Feasibility Score</span>
        <strong class="big-number">${pct(feasible.score)}</strong>
        <div class="score-meter" style="--value:${feasible.score}%"><span></span></div>
      </div>
      <div>
        <h3>${feasible.next}</h3>
        <div class="chip-row">${feasible.flags.map((flag) => `<span class="chip">${flag}</span>`).join("")}</div>
      </div>
    </div>
    <div class="grid five cockpit-metrics">
      ${metricCard("Water", feasible.water, "icon-water", "Capture and storage signal")}
      ${metricCard("Solar", feasible.energy, "icon-solar", "Energy pathway signal")}
      ${metricCard("Land", feasible.land, "icon-land", "Usable footprint signal")}
      ${metricCard("Buyers", feasible.buyer, "icon-buyers", "Market validation signal")}
      ${metricCard("Climate", feasible.climate, "icon-climate", "Temperature fit signal")}
    </div>
    <div class="grid three">
      <article class="card" id="rainwater">${icon("icon-rainfall")}<h3>Rainwater Capture</h3><div class="form-grid">${input("Rainfall mm/year", "rainfall")}${input("Catchment area m2", "catchmentArea")}${input("Runoff coefficient", "runoff", "number", "step='0.05' min='0' max='1'")}${input("Storage target days", "storageDays")}</div><div class="result-panel"><strong class="big-number">${number(rain.litersYear)}</strong><span>L/year capture estimate</span><span>${number(rain.litersMonth)} L/month | suggested storage ${number(rain.storageLiters)} L</span><strong>Formula: rainfall x catchment x runoff</strong><button class="button primary" data-action="saveRainwater">Save Water Calculation</button></div></article>
      <article class="card" id="solar-energy">${icon("icon-solar")}<h3>Solar / Energy Potential</h3><div class="form-grid">${input("Sun hours/day", "sunHours", "number", "step='0.1'")}${input("Electricity cost/kWh", "electricityCost", "number", "step='0.01'")}${input("Solar area m2", "solarArea")}${select("Grid reliability", "electricityReliability", [{value:"low", label:"Low"}, {value:"medium", label:"Medium"}, {value:"high", label:"High"}])}${select("Backup power", "backupPower", [{value:"none", label:"No backup"}, {value:"generator-ready", label:"Generator-ready"}, {value:"battery-ready", label:"Battery-ready"}, {value:"hybrid", label:"Hybrid planned"}])}</div><div class="result-panel"><strong class="big-number">${pct(solar.score)}</strong><span>Solar suitability score</span><div class="score-meter" style="--value:${solar.score}%"><span></span></div><strong>${solar.strategy}</strong><button class="button primary" data-action="saveSolar">Save Energy Assessment</button></div></article>
      <article class="card">${icon("icon-greenhouse")}<h3>Greenhouse Footprint Planner</h3><div class="form-grid">${input("Usable land %", "usablePercent", "number", "min='1' max='100'")}${input("Greenhouse footprint m2", "greenhouseArea")}${input("Nursery/support m2", "supportArea")}${input("Cold chain/logistics m2", "coldChainArea")}</div><div class="result-panel"><strong class="big-number">${number(foot.greenhouse)}</strong><span>m2 recommended production footprint</span><span>Support: ${number(foot.support)} m2 | reserve: ${number(foot.reserve)} m2</span><strong>${foot.scale}</strong><button class="button primary" data-action="saveLandClimate">Save Land Assessment</button></div></article>
    </div>
  </section>`;
}

function revenueModelSection() {
  return `<section id="revenue">${sectionHead("Revenue Model Simulator", "Scenario Cards for Different Hub Types", "These are illustrative planning ranges. Each scenario still requires buyer validation, budget design, operating plan, and legal review.")}
    <div class="grid three scenario-grid">
      ${model.revenueScenarios.map((scenario) => `<article class="card scenario-card">
        <img class="scenario-thumb" src="${scenarioImage(scenario.id)}" alt="${scenario.label}" loading="lazy">
        ${icon(scenario.id === "pilot" ? "icon-greenhouse" : scenario.id === "commercial" ? "icon-hydroponics" : scenario.id === "hospitality" ? "icon-hotel" : "icon-market")}
        <span class="eyebrow">${scenario.complexity}</span>
        <h3>${scenario.label}</h3>
        <strong>${money(scenario.monthlyRevenueLow)}-${money(scenario.monthlyRevenueHigh)}/mo</strong>
        <p class="muted">Area: ${number(scenario.areaM2)} m2 | Staff: ${scenario.staff} | Buyer validation required before design.</p>
        <button class="button" data-action="saveRevenueScenario" data-scenario="${scenario.id}" type="button">Save Scenario</button>
      </article>`).join("")}
      <article class="card scenario-card"><img class="scenario-thumb" src="${scenarioImage("mushroom_microgreen")}" alt="Mushroom and microgreen module" loading="lazy">${icon("icon-mushrooms")}<span class="eyebrow">Module</span><h3>Mushroom + Microgreen Module</h3><strong>$18,000-$65,000/mo</strong><p class="muted">High-value controlled modules with stronger cold-chain and buyer education needs.</p><button class="button" data-action="saveRevenueScenario" data-scenario="mushroom_microgreen" type="button">Save Scenario</button></article>
      <article class="card scenario-card"><img class="scenario-thumb" src="${scenarioImage("full_cea_hub")}" alt="Full controlled-environment hub" loading="lazy">${icon("icon-crops")}<span class="eyebrow">Advanced</span><h3>Full Controlled-Environment Hub</h3><strong>$180,000-$480,000/mo</strong><p class="muted">Illustrative multi-crop, multi-channel hub. Requires phased financing and disciplined operations.</p><button class="button" data-action="saveRevenueScenario" data-scenario="full_cea_hub" type="button">Save Scenario</button></article>
    </div>
  </section>`;
}

function productionSection(crop, rev) {
  return `<section id="production">${sectionHead("Crop & Revenue Simulator", "Illustrative Production and Revenue Ranges", "Estimate annual output and revenue using simple manual assumptions. Validate with real buyers before building.")}
    <div class="tool-grid">
      <div class="card form-grid">
        ${select("Crop model", "crop", Object.entries(model.cropProfiles).map(([value, item]) => ({ value, label: item.label })))}
        ${input("Greenhouse area m2", "greenhouseArea")}
        ${input("Towers / growing units", "towers")}
        ${input("Cycles per year", "cycles")}
        ${input("Price per unit/kg", "price", "number", "step='0.25'")}
        ${input("Loss / waste %", "waste", "number", "min='0' max='80'")}
      </div>
      <div class="result-panel">
        <strong class="big-number">${money(crop.annualRevenue)}</strong>
        <span>Illustrative annual revenue from ${crop.crop.label}</span>
        <div class="grid three">
          <article class="card"><strong>${number(crop.production)}</strong><span class="muted">annual volume units/kg</span></article>
          <article class="card"><strong>${money(rev.monthlyLow)}-${money(rev.monthlyHigh)}</strong><span class="muted">monthly revenue range</span></article>
          <article class="card"><strong>${crop.crop.complexity}</strong><span class="muted">complexity | cold chain ${crop.crop.coldChain}</span></article>
        </div>
        <button class="button primary" data-action="saveCropScenario">Save Production Scenario</button>
      </div>
    </div>
  </section>`;
}

function ownershipSection(own) {
  return `<section id="ownership">${sectionHead("JV / Ownership Simulator", "Model Indicative Local Partner and Platform Participation", "Ownership options are illustrative and negotiable. The preferred maximum SymbioGreens/Balponics participation is 35%.")}
    <div class="tool-grid">
      <div class="card form-grid">
        ${input("Estimated investment USD", "investment")}
        ${input("Partner contribution USD", "partnerContribution")}
        ${select("SymbioGreens/Balponics participation", "symbioShare", model.ownership.options.map((value) => ({ value, label: `${value}%` })))}
        ${select("Project size", "projectSize", [{value:"Pilot Hub", label:"Pilot Hub"}, {value:"Commercial Hub", label:"Commercial Hub"}, {value:"Regional Hub", label:"Regional Hub"}])}
      </div>
      <div class="result-panel">
        <div class="ownership-bar" style="--partner:${own.partner}%;--symbio:${own.symbio}%"><span class="partner-share">Partner ${own.partner}%</span><span class="symbio-share">SymbioGreens/Balponics ${own.symbio}%</span></div>
        <div class="grid three">
          <article class="card"><strong>${money(own.partnerCapital)}</strong><span class="muted">partner-side indicative value</span></article>
          <article class="card"><strong>${money(own.symbioCapital)}</strong><span class="muted">platform-side indicative value</span></article>
          <article class="card"><strong>${pct(own.partnerContributionCoverage * 100)}</strong><span class="muted">partner contribution coverage</span></article>
        </div>
        <p>Example structure: SymbioGreens/Balponics ${own.symbio}% / local partner ${own.partner}%, subject to final agreements.</p>
        <button class="button primary" data-action="saveOwnership">Save Ownership Scenario</button>
      </div>
    </div>
  </section>`;
}

function marketSection(buyers) {
  const channels = ["Hotels / resorts", "Restaurants / chefs", "Supermarkets", "Distributors", "Hospitals", "Schools", "Mining camps", "Government buyers", "NGOs / food security programs"];
  return `<section id="market">${sectionHead("Market Survey Toolkit", "Validate Buyers Before Building", "Use this toolkit to structure partner market validation and buyer demand discovery.")}
    <div class="tool-grid">
      <div class="card">
        <h3>Buyer Demand Validation</h3>
        <div class="form-grid">${input("Potential buyers", "buyers")}${input("Estimated weekly demand", "weeklyDemand")}${input("Willingness to contract %", "contractWillingness")}${input("Payment quality %", "paymentQuality")}${input("Delivery complexity %", "deliveryComplexity")}</div>
        <h3>Target Channels</h3>
        <div class="grid three">${channels.map((channel) => `<article class="card">${icon("icon-buyers")}<strong>${channel}</strong><span class="muted">Interview, price, volume, terms, cold-chain needs</span><details><summary>Learn more</summary><p>Partner prepares buyer names, target crops, weekly demand, delivery expectations, price ranges, and payment terms.</p></details></article>`).join("")}</div>
      </div>
      <div class="result-panel">
        <strong class="big-number">${pct(buyers.score)}</strong>
        <span>Buyer readiness score</span>
        <div class="score-meter" style="--value:${buyers.score}%"><span></span></div>
        <strong>${buyers.next}</strong>
        <p>Generated checklist: buyer interview list, crop demand survey, price validation sheet, import-substitution review, cold-chain assessment, and buyer readiness scoring.</p>
        <button class="button primary" data-action="saveMarketSurvey">Save Market Survey</button>
      </div>
    </div>
  </section>`;
}

function buyerDemandSection(buyers) {
  const priority = buyers.score >= 75 ? "Hotels/resorts plus premium distributors" : buyers.score >= 55 ? "Anchor buyers and chef/restaurants first" : "Build target buyer list and interview pipeline";
  return `<section id="buyer-demand">${sectionHead("Buyer Demand Validation", "Turn Interest Into Evidence", "Demand validation must happen before construction. This tool turns buyer count, weekly demand, pricing, contract interest, delivery rhythm, and payment terms into a readiness signal.")}
    <div class="tool-grid">
      <div class="card form-grid">
        ${input("Number of target buyers", "buyers")}
        ${input("Estimated weekly demand", "weeklyDemand")}
        ${input("Price range / positioning", "priceRange", "text")}
        ${input("Willingness to contract %", "contractWillingness")}
        ${select("Delivery frequency", "deliveryFrequency", [{value:"1 delivery/week", label:"1 delivery/week"}, {value:"2-3 deliveries/week", label:"2-3 deliveries/week"}, {value:"Daily delivery", label:"Daily delivery"}, {value:"Buyer pickup", label:"Buyer pickup"}])}
        ${input("Payment terms quality %", "paymentQuality")}
      </div>
      <div class="result-panel">
        <strong class="big-number">${pct(buyers.score)}</strong>
        <span>Buyer readiness score</span>
        <div class="score-meter" style="--value:${buyers.score}%"><span></span></div>
        <h3>${priority}</h3>
        <p>${buyers.next}. Validate volumes, willingness to contract, delivery requirements, cold chain, and import substitution opportunity.</p>
        <button class="button primary" data-action="saveBuyerValidation">Save Buyer Validation</button>
      </div>
    </div>
  </section>`;
}

function readinessSection(ready) {
  const items = [
    ["Land", "landReady"], ["Water", "waterReady"], ["Energy", "energyReady"], ["Buyer", "buyerReady"], ["Financing", "financeReady"],
    ["Capability", "capabilityReady"], ["Regulatory", "regulatoryReady"], ["Market", "marketReady"], ["Logistics", "logisticsReady"]
  ];
  return `<section id="readiness">${sectionHead("Partner Readiness Score", "Decide the Next Best Step", "Readiness is not approval. It helps decide whether to prepare a concept note, run more validation, or pause.")}
    <div class="tool-grid">
      <div class="card form-grid">${items.map(([label, field]) => `<label>${label} readiness<input data-field="${field}" type="range" min="0" max="100" value="${state[field]}"><strong>${pct(state[field])}</strong></label>`).join("")}</div>
      <div class="result-panel">
        <strong class="big-number">${pct(ready.score)}</strong>
        <span>Overall partner readiness</span>
        <div class="score-meter" style="--value:${ready.score}%"><span></span></div>
        <h3>${ready.label}</h3>
        <button class="button primary" data-action="saveReadiness">Save Readiness Score</button>
      </div>
    </div>
  </section>`;
}

function financingSection() {
  const items = ["Local bank financing", "Development finance", "Government agriculture programs", "Climate resilience grants", "Food security programs", "Impact investment", "Hotel/offtaker-backed financing", "Diaspora investment", "Equipment financing", "Renewable energy financing"];
  return `<section id="financing">${sectionHead("Financing Pathway Assistant", "Potential Pathways to Explore", "No financing is guaranteed. Options depend on country, eligibility, documentation, lender/program requirements, offtakers, and project readiness.")}
    <div class="grid five">${items.map((item) => `<article class="card">${icon("icon-finance")}<h3>${item}</h3><p class="muted">Potential pathway to explore after site, buyer, budget, and legal review.</p><details><summary>Learn more</summary><p>Not guaranteed. The partner should prepare site evidence, buyer validation, contribution capacity, concept note, budget assumptions, and local eligibility requirements.</p></details></article>`).join("")}</div>
  </section>`;
}

function roadmapSection() {
  const steps = ["Partner inquiry", "Land/site review", "Climate/water/energy assessment", "Market survey", "Concept note", "Budget and design", "Financing pathway", "Legal/JV structure", "Installation", "Training", "Pilot production", "Commercial operation", "Expansion"];
  return `<section id="roadmap">${sectionHead("Implementation Roadmap", "From Inquiry to Regional Hub", "A structured path for serious regional project development.")}
    <div class="timeline">${steps.map((step, index) => `<article><span>${String(index + 1).padStart(2, "0")}</span><h3>${step}</h3></article>`).join("")}</div>
  </section>`;
}

function riskSection() {
  const risks = [
    ["Land risk", "Confirm ownership, access, zoning, terrain, drainage, and expansion reserve."],
    ["Water risk", "Review source reliability, storage, treatment, capture, and backup strategy."],
    ["Energy risk", "Assess grid reliability, solar potential, backup generation, and operating cost."],
    ["Buyer risk", "Validate volume, pricing, contract interest, payment terms, and delivery needs."],
    ["Financing risk", "Prepare phased budgets, lender documents, offtaker evidence, and grant/DFI routes."],
    ["Regulatory risk", "Map permits, food safety, labor, import, tax, and local agriculture requirements."],
    ["Execution risk", "Use training, pilot production, operating playbooks, and technical supervision."]
  ];
  return `<section id="risk">${sectionHead("Risk & Mitigation Matrix", "Review the Risks Before the Build", "The portal is designed to make hard questions visible early.")}
    <div class="grid three">${risks.map(([title, body]) => `<article class="card risk-card">${icon("icon-risk")}<h3>${title}</h3><p>${body}</p><details><summary>Mitigation detail</summary><p>Check this before construction so the project can move forward with clearer assumptions, stronger documentation, and fewer surprises.</p></details></article>`).join("")}</div>
  </section>`;
}

function qaSection() {
  return `<section id="qa">${sectionHead("Partner Q&A / Objection Center", "Answer the Real Questions", "Rate answers, leave comments, and request follow-up. Saved locally in demo mode.")}
    <div class="card">${qaItems.map(([category, question, answer], index) => `<details class="qa-item"><summary>${question}<span class="muted"> | ${category}</span></summary><p>${answer}</p><div class="rating-row">${[1,2,3,4,5].map((rating) => `<button data-action="rateQuestion" data-question="${index}" data-rating="${rating}" type="button">${rating}</button>`).join("")}</div><textarea data-question-comment="${index}" placeholder="Optional comment or objection"></textarea><div class="action-row"><button class="button primary" data-action="saveQuestionComment" data-question="${index}" type="button">Save Comment</button><button class="button" data-action="requestFollowUp" data-question="${index}" type="button">Request Follow-Up</button></div></details>`).join("")}</div>
  </section>`;
}

function actionSection() {
  return `<section id="action">${sectionHead("Partner Action Center", "Save Demo Requests and Next Steps", "Demo requests are stored locally only. Future backend tables can persist these after approval and authentication.")}
    <div class="tool-grid">
      <div class="card form-grid">
        <label>Preferred ownership structure<select id="actionOwnership"><option>SymbioGreens/Balponics 25% / Partner 75%</option><option selected>SymbioGreens/Balponics 30% / Partner 70%</option><option>SymbioGreens/Balponics 35% / Partner 65%</option></select></label>
        <label>Financing status<select id="actionFinance"><option>Exploring financing</option><option>Local bank discussion started</option><option>Land available, financing needed</option><option>Buyer-backed financing possible</option></select></label>
        <label>Desired timeline<select id="actionTimeline"><option>0-6 months</option><option selected>6-12 months</option><option>12-24 months</option></select></label>
        <label>Request type<select id="actionRequest"><option>Request technical review</option><option>Request concept note</option><option>Request meeting</option><option>Submit buyer list</option></select></label>
        <label style="grid-column:1/-1">Project notes<textarea id="actionNotes" placeholder="Land profile, buyer list, project questions, financing status, or preferred next step"></textarea></label>
      </div>
      <div class="result-panel">
        <h3>Next recommended action</h3>
        <p>Save the territory profile, run feasibility, validate buyers, then request a concept note if the partner readiness score is strong enough.</p>
        <div class="action-row">
          <button class="button primary" data-action="requestMeeting">Request Partner Meeting</button>
          <button class="button" data-action="requestConceptNote">Request Concept Note</button>
          <button class="button" data-action="savePartnerInquiry">Save Partner Inquiry</button>
        </div>
      </div>
    </div>
  </section>`;
}

function documentSection() {
  const docs = ["Partner guide", "Feasibility checklist", "Market survey template", "Technical concept note", "JV structure guide", "Training plan", "Implementation roadmap", "Financing checklist"];
  return `<section id="documents">${sectionHead("Document Center Placeholder", "Private Materials Stay Locked", "No private documents are included in this static build.")}
    <div class="grid four">${docs.map((doc) => `<article class="card document-card">${assetIcon("documents/locked-document.svg", doc)}<h3>${doc}</h3><p class="muted">Available after partner review / final document release.</p><details><summary>Access rules</summary><p>Private materials should be released only after approval, authentication, role checks, and final document readiness.</p></details><button class="button" data-action="requestDocument" data-document="${doc}" type="button">Request Access</button></article>`).join("")}</div>
  </section>`;
}

function bindActions() {
  app.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", async (event) => {
      event.preventDefault();
      updateStateFromInputs(app);
      const action = button.dataset.action;
      const payload = snapshot(action);
      if (action === "exitDemo") {
        safeRemoveStorage(demoFlag);
        window.location.href = "index.html";
        return;
      }
      let productionResult = null;
      if (action === "saveQualification") await backend.savePartnerProjectProfile({ ...payload, qualification: readinessScore(), feasibility: feasibilityScore() });
      if (action === "saveProjectProfile") await backend.savePartnerProjectProfile(payload);
      if (action === "saveRainwater") await backend.saveRainwaterCalculation({ ...payload, rainwater: rainwater() });
      if (action === "saveSolar") await backend.saveSolarAssessment({ ...payload, solar: solarScore() });
      if (action === "saveLandClimate") await backend.saveLandClimateAssessment({ ...payload, footprint: footprint() });
      if (action === "saveCropScenario") await backend.saveCropRevenueScenario({ ...payload, crop: cropScenario(), revenue: revenueScenario() });
      if (action === "saveRevenueScenario") await backend.saveRevenueScenario({ ...payload, scenario_id: button.dataset.scenario, revenue: revenueScenario() });
      if (action === "saveOwnership") await backend.saveOwnershipScenario({ ...payload, ownership: ownership() });
      if (action === "saveMarketSurvey") await backend.saveMarketSurvey({ ...payload, buyer_readiness: buyerReadiness() });
      if (action === "saveBuyerValidation") await backend.saveBuyerValidation({ ...payload, buyer_readiness: buyerReadiness() });
      if (action === "saveReadiness") await backend.saveReadinessScore({ ...payload, readiness: readinessScore() });
      if (action === "rateQuestion") await backend.savePartnerQuestionRating({ question: qaItems[button.dataset.question][1], rating: Number(button.dataset.rating) });
      if (action === "saveQuestionComment") await saveQuestionComment(button);
      if (action === "requestFollowUp") {
        await backend.requestPartnerMeeting({ ...payload, reason: `Follow-up requested for: ${qaItems[button.dataset.question][1]}` });
        productionResult = await submitPartnerApplication(`Follow-up requested for: ${qaItems[button.dataset.question][1]}`);
      }
      if (action === "requestMeeting") {
        await backend.requestPartnerMeeting({ ...payload, request: "Partner meeting requested" });
        productionResult = await submitPartnerApplication("Partner meeting requested.");
      }
      if (action === "requestConceptNote") {
        await backend.savePartnerComment({ ...payload, request: "Concept note requested" });
        productionResult = await submitPartnerApplication("Concept note requested.");
      }
      if (action === "savePartnerInquiry") {
        await backend.savePartnerInquiry(payload);
        productionResult = await submitPartnerApplication("Partner inquiry saved from action center.");
      }
      if (action === "requestDocument") await backend.requestPartnerDocument({ document_title: button.dataset.document, access_action: "requested" });
      await backend.trackPartnerPortalEvent(action, payload);
      if (sectionCompletionKeys[activePage]) {
        renderPreservingUserPosition();
      }
      if (productionResult?.success) {
        toast("Saved locally, and sent to the SymbioGreens team for review.");
      } else if (productionResult && !productionResult.success) {
        toast("Saved locally. Could not reach the team yet — please also use Request Support.");
      } else {
        toast("Saved locally in founder demo mode.");
      }
    });
  });
}

async function submitPartnerApplication(message) {
  if (!window.SymbioApplicationService?.submitApplication) return null;
  try {
    return await window.SymbioApplicationService.submitApplication({
      portalType: "partner",
      submissionType: "partner_project_inquiry",
      fullName: state.partnerName,
      companyName: state.company,
      email: state.contact,
      roleRequested: "partner",
      interestType: state.role,
      country: state.country,
      city: state.region,
      message,
      submittedData: {
        ...snapshot("partner_application"),
        feasibility: feasibilityScore(),
        readiness: readinessScore(),
        buyer_readiness: buyerReadiness(),
        ownership: ownership()
      }
    });
  } catch (error) {
    console.warn("Partner production application submission failed; local fallback preserved.", error);
    return { success: false, error: error?.message || String(error) };
  }
}

async function saveQuestionComment(button) {
  const index = button.dataset.question;
  const textarea = app.querySelector(`[data-question-comment="${index}"]`);
  await backend.savePartnerQuestion({
    category: qaItems[index][0],
    question: qaItems[index][1],
    prepared_answer: qaItems[index][2],
    comment: textarea?.value || ""
  });
}

function snapshot(action) {
  return {
    action,
    country: state.country,
    region: state.region,
    latitude: state.latitude,
    longitude: state.longitude,
    partner_name: state.partnerName,
    company: state.company,
    contact: state.contact,
    role: state.role,
    land_size_m2: state.landSize,
    greenhouse_area_m2: state.greenhouseArea,
    water_source: state.waterSource,
    electricity_reliability: state.electricityReliability,
    channel: state.channel,
    project_size: state.projectSize,
    feasibility: feasibilityScore(),
    readiness: readinessScore(),
    notes: document.getElementById("actionNotes")?.value || "",
    preferred_ownership: document.getElementById("actionOwnership")?.value || "",
    financing_status: document.getElementById("actionFinance")?.value || "",
    desired_timeline: document.getElementById("actionTimeline")?.value || "",
    request_type: document.getElementById("actionRequest")?.value || "",
    disclaimer: model.disclaimer
  };
}

function toast(message) {
  document.querySelector(".toast")?.remove();
  const node = document.createElement("div");
  node.className = "toast";
  node.textContent = message;
  document.body.appendChild(node);
  setTimeout(() => node.remove(), 2600);
}
