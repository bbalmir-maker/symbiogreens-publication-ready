(function () {
  const app = document.getElementById("app");
  if (!app) return;

  const model = window.SYMBIOGREENS_INVESTOR_MODEL;
  const backend = window.SymbioInvestorPortalBackend;
  const PUBLIC_SITE_URL = "https://bbalmir-maker.github.io/symbiogreens-publication-ready/";
  const DEMO_FLAG = "symbioInvestorPortalDemo";
  const STATE_KEY = "symbio_investor_portal_ui_state";

  function balponicsLinks() {
    return `<footer class="balponics-links" aria-label="Balponics official links"><strong>Balponics</strong><a href="https://www.facebook.com/hydroponicsaeroponicsaquaponics/" target="_blank" rel="noopener noreferrer" aria-label="Balponics Facebook page">Facebook</a><a href="https://www.instagram.com/balponics/" target="_blank" rel="noopener noreferrer" aria-label="Balponics Instagram profile">Instagram</a><a href="https://balponics.com/" target="_blank" rel="noopener noreferrer" aria-label="Balponics website">Website</a></footer>`;
  }

  const iconPaths = {
    greenhouse: ["M4 18V9l8-5 8 5v9", "M8 18v-6h8v6", "M6 9h12"],
    towers: ["M8 19V5h8v14", "M6 8h12", "M6 12h12", "M6 16h12"],
    water: ["M12 3s6 6.1 6 10a6 6 0 0 1-12 0c0-3.9 6-10 6-10z"],
    nutrients: ["M7 4h10", "M9 4v5l-3 6a4 4 0 0 0 4 6h4a4 4 0 0 0 4-6l-3-6V4", "M9 14h6"],
    roi: ["M4 17l5-5 4 4 7-9", "M15 7h5v5"],
    equity: ["M4 19V5", "M4 19h16", "M8 16v-5", "M12 16V8", "M16 16v-8"],
    docs: ["M7 3h7l4 4v14H7z", "M14 3v5h5", "M9 13h6", "M9 17h6"],
    approval: ["M12 21a9 9 0 1 0-9-9 9 9 0 0 0 9 9z", "M8 12l3 3 5-6"],
    email: ["M4 6h16v12H4z", "M4 7l8 6 8-6"],
    access: ["M7 11V8a5 5 0 0 1 10 0v3", "M6 11h12v9H6z"],
    analytics: ["M5 19V5", "M5 19h14", "M9 16v-5", "M13 16V8", "M17 16v-8"],
    qa: ["M5 6h14v10H9l-4 4z", "M10 10h4", "M10 13h7"],
    risk: ["M12 3l9 16H3z", "M12 9v4", "M12 17h.01"],
    solar: ["M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z", "M12 2v3", "M12 19v3", "M4.2 4.2l2.1 2.1", "M17.7 17.7l2.1 2.1", "M2 12h3", "M19 12h3"],
    cold: ["M12 3v18", "M7 6l10 12", "M17 6L7 18", "M5 12h14"],
    mushrooms: ["M5 11a7 7 0 0 1 14 0H5z", "M9 11v8h6v-8"],
    greens: ["M6 18c7 0 12-5 12-12-7 0-12 5-12 12z", "M6 18l9-9"],
    microgreens: ["M6 19V9", "M12 19V7", "M18 19v-8", "M6 9c-2 0-3-1-3-3 3 0 3 3 3 3z", "M12 7c-3 0-4-2-4-4 4 0 4 4 4 4z", "M18 11c2 0 3-1 3-3-3 0-3 3-3 3z"],
    buyers: ["M4 18c1.5-3 4-4 8-4s6.5 1 8 4", "M8 8a4 4 0 1 0 8 0 4 4 0 0 0-8 0z"],
    caribbean: ["M4 15c4-4 7 3 11-1 2-1 3-3 5-5", "M5 19h14", "M8 9l2 2"],
    africa: ["M12 3c4 2 6 6 5 10l-3 6h-4l-3-6c-1-4 1-8 5-10z", "M10 12h4"],
    sustainability: ["M5 15c8 0 13-5 14-11-7 0-13 4-14 11z", "M5 15c2 3 6 5 11 5", "M5 15l9-8"],
    logistics: ["M3 8h11v8H3z", "M14 11h4l3 3v2h-7z", "M7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z", "M17 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"],
    automation: ["M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z", "M12 2v3", "M12 19v3", "M4.9 4.9l2.1 2.1", "M17 17l2.1 2.1", "M2 12h3", "M19 12h3"],
    call: ["M7 4l3 5-2 2c1 2 3 4 5 5l2-2 5 3-2 4c-8 0-15-7-15-15z"],
    save: ["M5 4h12l2 2v14H5z", "M8 4v6h8V4", "M8 18h8"],
    objections: ["M4 5h16v12H8l-4 4z", "M9 9h6", "M9 13h4"],
    comments: ["M5 5h14v10H9l-4 4z", "M9 9h6", "M9 12h8"],
    documents: ["M6 3h9l3 3v15H6z", "M15 3v4h4", "M9 12h6", "M9 16h6"]
  };

  const defaultState = {
    contribution: 250000,
    hubs: 1,
    scenarioId: "base",
    ebitdaMargin: 24,
    valuationMultiple: 6,
    selectedInterests: ["Las Terrenas", "Caribbean"],
    investorRange: "250k-500k",
    questionText: "",
    commentText: "",
    openQa: 0
  };

  let state = loadState();

  function loadState() {
    try {
      return { ...defaultState, ...JSON.parse(localStorage.getItem(STATE_KEY)) };
    } catch {
      return { ...defaultState };
    }
  }

  function saveState() {
    localStorage.setItem(STATE_KEY, JSON.stringify(state));
  }

  function isDemoEnabled() {
    return localStorage.getItem(DEMO_FLAG) === "true";
  }

  function formatCurrency(value) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: model.currency,
      maximumFractionDigits: 0
    }).format(Number.isFinite(Number(value)) ? Number(value) : 0);
  }

  function formatPercent(value, digits = 2) {
    return `${(Number.isFinite(Number(value)) ? Number(value) : 0).toFixed(digits)}%`;
  }

  function formatNumber(value) {
    return new Intl.NumberFormat("en-US").format(Number.isFinite(Number(value)) ? Number(value) : 0);
  }

  function icon(name) {
    const paths = iconPaths[name] || iconPaths.greenhouse;
    return `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${paths.map((d) => `<path d="${d}"></path>`).join("")}</svg>`;
  }

  function activeScenario() {
    return model.scenarios.find((scenario) => scenario.id === state.scenarioId) || model.scenarios[1];
  }

  function calculateInvestor(contribution = state.contribution) {
    const amount = Math.max(0, Number(contribution) || 0);
    const equity = Math.min((amount / model.targetRaise) * model.investorEquityPool, model.investorEquityPool);
    const founderAllocation = amount * (model.founderAllocationPercent / 100);
    const remainingRaise = Math.max(model.targetRaise - amount, 0);
    return { amount, equity, founderAllocation, remainingRaise };
  }

  function calculatePlatform() {
    const scenario = activeScenario();
    const revenue = scenario.revenuePerHub * Math.max(1, Number(state.hubs) || 1);
    const ebitda = revenue * ((Number(state.ebitdaMargin) || scenario.ebitdaMargin) / 100);
    const valuation = ebitda * (Number(state.valuationMultiple) || scenario.valuationMultiple);
    const investor = calculateInvestor();
    const illustrativeValue = valuation * (investor.equity / 100);
    return { scenario, revenue, ebitda, valuation, illustrativeValue, investor };
  }

  function track(eventType, payload = {}) {
    backend.trackInvestorPortalEvent(eventType, {
      source: "standalone_investor_portal",
      demo: isDemoEnabled(),
      ...payload
    });
  }

  function renderAccessRequired() {
    document.body.classList.remove("portal-open");
    app.innerHTML = `
      <main class="access-shell">
        <section class="access-panel" aria-labelledby="access-title">
          <img class="access-logo" src="assets/logos/symbiogreens-balponics-lockup.png" alt="SymbioGreens Investor Portal - Powered by Balponics">
          <p class="eyebrow">SymbioGreens Investor Portal</p>
          <h1 id="access-title">Access required.</h1>
          <p class="access-message">Investor portal access is available only after review, approval, and account activation.</p>
          <p class="muted">Private investor materials and review access are provided only after review and approval.</p>
          <div class="access-actions">
            <a class="button primary" href="${PUBLIC_SITE_URL}">Return to SymbioGreens Public Website</a>
            <a class="button secondary" href="${PUBLIC_SITE_URL}#investors">Request Investor Review</a>
          </div>
          <div class="notice">Local founder preview requires <code>localStorage.setItem("symbioInvestorPortalDemo", "true")</code>. This is not production security.</div>
          ${balponicsLinks()}
        </section>
      </main>
    `;
    track("access_required_view");
  }

  function metric(iconName, label, value, note) {
    return `
      <article class="metric">
        ${icon(iconName)}
        <span>${label}</span>
        <strong>${value}</strong>
        ${note ? `<small>${note}</small>` : ""}
      </article>
    `;
  }

  function disclaimerBlock() {
    return `<p class="disclaimer">${model.disclaimer}</p>`;
  }

  function localCount(collection) {
    return (backend.readLocal(collection, []) || []).length;
  }

  function iconCard(iconName, title, copy) {
    return `
      <article class="icon-card">
        ${icon(iconName)}
        <h3>${title}</h3>
        <p>${copy}</p>
      </article>
    `;
  }

  function briefCard(iconName, label, title, copy) {
    return `
      <article class="brief-card">
        <div class="brief-icon">${icon(iconName)}</div>
        <span>${label}</span>
        <h3>${title}</h3>
        <p>${copy}</p>
      </article>
    `;
  }

  function renderPortal() {
    document.body.classList.add("portal-open");
    const platform = calculatePlatform();
    const investor = platform.investor;
    const ecosystem = [
      ["greenhouse", "Greenhouse production", "Controlled production environment for premium crops."],
      ["towers", "Hydroponic towers", "Efficient vertical growing systems and repeatable SOPs."],
      ["water", "Water conservation", "Closed-loop planning and responsible water management."],
      ["nutrients", "Nutrient monitoring", "Crop data, fertigation discipline, and quality control."],
      ["cold", "Cold chain", "Fresh product handling, storage, and delivery consistency."],
      ["solar", "Solar energy", "Renewable-first resilience and operating cost discipline."],
      ["logistics", "Logistics", "Route planning for resorts, chefs, distributors, and buyers."],
      ["automation", "Automation", "Monitoring, alerts, and operating intelligence over time."],
      ["mushrooms", "Mushrooms", "Specialty category potential with strong buyer education."],
      ["microgreens", "Microgreens", "Premium short-cycle crops for hospitality and wellness buyers."],
      ["buyers", "Buyer demand", "Demand pathways across hotels, chefs, villas, retail, and food service."],
      ["sustainability", "Sustainability", "Local resilience, reduced import dependence, and clean production."]
    ];
    const expansion = [
      ["greenhouse", "Las Terrenas", "First proof hub for operations, buyers, production, and delivery."],
      ["caribbean", "Dominican Republic", "Punta Cana, Cap Cana, Puerto Plata, Santo Domingo, and other demand corridors."],
      ["water", "Haiti", "Long-range resilience opportunity subject to partners, safety, and local validation."],
      ["logistics", "Caribbean", "Island markets where freshness, import substitution, and reliability matter."],
      ["africa", "Africa", "Future optional expansion through technical services, hubs, or partnerships."]
    ];
    const funds = model.useOfFunds.map(([label, amount]) => {
      const lower = label.toLowerCase();
      const iconName = lower.includes("hydro") ? "towers" : lower.includes("micro") ? "microgreens" : lower.includes("mushroom") ? "mushrooms" : lower.includes("solar") || lower.includes("energy") ? "solar" : lower.includes("cold") ? "cold" : lower.includes("logistics") ? "logistics" : lower.includes("water") || lower.includes("automation") ? "automation" : lower.includes("founder") ? "equity" : "greenhouse";
      return [iconName, label, amount];
    });
    const engagement = {
      events: localCount("events"),
      scenarios: localCount("scenarios"),
      questions: localCount("questions"),
      comments: localCount("comments"),
      documents: localCount("document_requests")
    };

    app.innerHTML = `
      <header class="topbar">
        <a class="brand brand-lockup" href="#overview" aria-label="SymbioGreens Investor Portal - Powered by Balponics">
          <img class="brand-logo-sg" src="assets/logos/symbiogreens-logo.png" alt="SymbioGreens">
          <span><strong>Investor Portal</strong><small>Powered by Balponics</small></span>
          <img class="brand-logo-balponics" src="assets/logos/balponics-logo.png" alt="Balponics">
        </a>
        <nav class="desktop-nav" aria-label="Portal sections">
          <a href="#overview" data-portal-page="overview">Overview</a>
          <a href="#calculator">Calculator</a>
          <a href="#ecosystem">Ecosystem</a>
          <a href="#expansion">Expansion</a>
          <a href="#qa">Q&amp;A</a>
          <a href="#actions">Actions</a>
        </nav>
        <button class="icon-button" type="button" data-action="logout">Exit Demo</button>
      </header>

      <div class="demo-banner">Founder Demo Mode &mdash; private investor portal preview. No real investor data is loaded.</div>

      <main>
        <section id="overview" class="hero-section">
          <div class="hero-copy">
            <p class="eyebrow">Approved investor review workspace</p>
            <h1>Private capital review for the SymbioGreens platform model.</h1>
            <p>Explore the first hub, expansion pathway, investment participation, risk controls, questions, objections, and next-step requests.</p>
            <div class="hero-actions">
              <a class="button primary" href="#calculator">${icon("roi")} Explore Calculator</a>
              <a class="button secondary" href="#actions">${icon("comments")} Record Interest</a>
            </div>
          </div>
          <aside class="hero-illustration" aria-label="Platform operating illustration">
            <div class="hero-visual-title">
              <span>Controlled-environment platform</span>
              <strong>Live review workspace</strong>
            </div>
            <div class="greenhouse-line">
              ${icon("greenhouse")}
              ${icon("water")}
              ${icon("solar")}
            </div>
            <div class="growth-rows">
              <span style="--w:82%"></span>
              <span style="--w:64%"></span>
              <span style="--w:46%"></span>
            </div>
            <div class="micro-metrics">
              <b>Buyer demand</b>
              <b>Energy resilience</b>
              <b>Water discipline</b>
            </div>
          </aside>
        </section>

        <section class="kpi-grid">
          ${metric("roi", "Target raise", formatCurrency(model.targetRaise), "First capital plan")}
          ${metric("equity", "Investor equity pool", formatPercent(model.investorEquityPool, 1), "Illustrative maximum pool")}
          ${metric("greenhouse", "First hub", "Dominican Republic", "Las Terrenas validation")}
          ${metric("caribbean", "Expansion pathway", "Caribbean + Africa", "Long-term optionality")}
          ${metric("approval", "Demo status", "Founder preview", "LocalStorage only")}
        </section>

        <section class="brief-grid" aria-label="Investment brief">
          ${briefCard("greenhouse", "01 / First hub", "Validate the operating model", "Las Terrenas is framed as the proof hub for production quality, buyer demand, cold-chain execution, and repeatable SOPs.")}
          ${briefCard("analytics", "02 / Investor engine", "Make participation math clear", "Contribution, equity estimate, allocation estimate, scenario assumptions, and saved intent are presented as real interactive controls.")}
          ${briefCard("caribbean", "03 / Platform pathway", "Explain the larger upside", "The portal shows how a disciplined first hub can support broader Dominican Republic, Caribbean, and later Africa strategy.")}
          ${briefCard("risk", "04 / Diligence posture", "Surface risks honestly", "Risk, objections, document requests, and Q&A are structured for serious investor review, not hype.")}
        </section>

        <section class="section-grid">
          <div>
            <p class="eyebrow">Thesis</p>
            <h2>Not a picture of a dashboard. A real review workspace.</h2>
          </div>
          <div class="copy-stack">
            <p>The first hub is designed to validate production discipline, premium buyer demand, cold-chain delivery, crop mix, and operating data before wider expansion.</p>
            <p>The expansion story is presented as a staged platform pathway, not a guaranteed outcome.</p>
            ${disclaimerBlock()}
          </div>
        </section>

        <section id="ecosystem" class="band">
          <div class="section-heading">
            <p class="eyebrow">Platform ecosystem</p>
            <h2>Real component cards for the operating system behind the opportunity.</h2>
          </div>
          <div class="icon-grid">${ecosystem.map(([i, t, c]) => iconCard(i, t, c)).join("")}</div>
        </section>

        <section id="calculator" class="calculator-section">
          <div class="section-heading">
            <p class="eyebrow">Illustrative financial model</p>
            <h2>Contribution and participation engine</h2>
          </div>
          <div class="calculator-layout">
            <div class="control-panel">
              <label for="contribution">Contribution amount</label>
              <input id="contribution" data-field="contribution" type="number" min="0" max="${model.targetRaise}" step="10000" value="${state.contribution}">
              <div class="preset-row">${model.contributionPresets.map((amount) => `<button type="button" class="preset" data-preset="${amount}">${formatCurrency(amount)}</button>`).join("")}</div>
              <label for="scenario">Scenario</label>
              <select id="scenario" data-field="scenarioId">${model.scenarios.map((scenario) => `<option value="${scenario.id}" ${scenario.id === state.scenarioId ? "selected" : ""}>${scenario.label}</option>`).join("")}</select>
              <label for="hubs">Expansion hubs</label>
              <input id="hubs" data-field="hubs" type="range" min="1" max="8" value="${state.hubs}">
              <output>${formatNumber(state.hubs)} hub${Number(state.hubs) === 1 ? "" : "s"}</output>
              <label for="margin">EBITDA margin</label>
              <input id="margin" data-field="ebitdaMargin" type="range" min="5" max="40" value="${state.ebitdaMargin}">
              <output>${formatPercent(state.ebitdaMargin, 1)}</output>
              <label for="multiple">Valuation multiple</label>
              <input id="multiple" data-field="valuationMultiple" type="range" min="2" max="10" step="0.5" value="${state.valuationMultiple}">
              <output>${state.valuationMultiple}x</output>
            </div>
            <div class="results-panel">
              ${metric("equity", "Estimated equity", formatPercent(investor.equity, 6), "Contribution / target raise x 30%, capped at 30%")}
              ${metric("save", "Founder/platform allocation", formatCurrency(investor.founderAllocation), "10% planning allocation contribution")}
              ${metric("roi", "Remaining target", formatCurrency(investor.remainingRaise), "Against the $2.2M target raise")}
              ${metric("analytics", "Scenario revenue", formatCurrency(platform.revenue), `${formatNumber(state.hubs)} illustrative hub count`)}
              ${metric("analytics", "Scenario EBITDA", formatCurrency(platform.ebitda), `${formatPercent(state.ebitdaMargin, 1)} selected margin`)}
              ${metric("equity", "Illustrative platform value", formatCurrency(platform.valuation), `${state.valuationMultiple}x selected multiple`)}
              <button class="button primary full" type="button" data-action="save-scenario">${icon("save")} Save Scenario Locally</button>
            </div>
          </div>
          ${disclaimerBlock()}
        </section>

        <section id="scenarios" class="band">
          <div class="section-heading">
            <p class="eyebrow">Scenario sensitivity</p>
            <h2>Operating cases for review, not guarantees.</h2>
          </div>
          <div class="card-grid three">
            ${model.scenarios.map((scenario) => `
              <article class="scenario-card ${scenario.id === state.scenarioId ? "selected" : ""}">
                ${icon("analytics")}
                <h3>${scenario.label}</h3>
                <p>${scenario.note}</p>
                <dl>
                  <div><dt>Revenue / hub</dt><dd>${formatCurrency(scenario.revenuePerHub)}</dd></div>
                  <div><dt>EBITDA margin</dt><dd>${formatPercent(scenario.ebitdaMargin, 1)}</dd></div>
                  <div><dt>Multiple</dt><dd>${scenario.valuationMultiple}x</dd></div>
                </dl>
                <button type="button" class="button tertiary" data-scenario="${scenario.id}">Use Case</button>
              </article>
            `).join("")}
          </div>
        </section>

        <section id="expansion" class="section-grid">
          <div>
            <p class="eyebrow">Expansion pathway</p>
            <h2>Las Terrenas to regional platform potential.</h2>
            <p class="muted">The pathway is strategic and illustrative. Each market requires separate validation, partners, legal review, and capital discipline.</p>
          </div>
          <div class="pathway">${expansion.map(([i, t, c]) => `<article>${icon(i)}<h3>${t}</h3><p>${c}</p></article>`).join("")}</div>
        </section>

        <section id="use-of-funds" class="band">
          <div class="section-heading">
            <p class="eyebrow">Use of funds</p>
            <h2>Clean planning allocation grid</h2>
          </div>
          <div class="fund-grid">${funds.map(([i, label, amount]) => iconCard(i, label, formatCurrency(amount))).join("")}</div>
        </section>

        <section id="risks" class="section-grid">
          <div>
            <p class="eyebrow">Risk and mitigation</p>
            <h2>Serious review means naming the risks clearly.</h2>
          </div>
          <div class="risk-list">${model.risks.map(([risk, exposure, mitigation]) => `<article>${icon("risk")}<div><h3>${risk}</h3><p>${exposure}</p><strong>${mitigation}</strong></div></article>`).join("")}</div>
        </section>

        <section id="qa" class="band">
          <div class="section-heading">
            <p class="eyebrow">Interactive Q&amp;A</p>
            <h2>Investor concerns, answers, ratings, and comments.</h2>
          </div>
          <div class="qa-list">
            ${model.qa.map(([category, question, answer, note], index) => `
              <article class="qa-card ${state.openQa === index ? "open" : ""}">
                <button type="button" class="qa-toggle" data-open-qa="${index}">${icon("qa")}<span>${category}</span><strong>${question}</strong></button>
                <div class="qa-answer">
                  <p>${answer}</p>
                  <small>${note}</small>
                  <div class="rating-row">
                    ${["Not helpful", "Somewhat", "Helpful", "Very helpful"].map((label, rating) => `<button type="button" data-qa-rating="${index}:${rating + 1}">${label}</button>`).join("")}
                  </div>
                  <textarea rows="3" placeholder="Add a follow-up comment for this question." data-qa-comment="${index}"></textarea>
                  <button class="button tertiary" type="button" data-save-qa-comment="${index}">Save Comment</button>
                </div>
              </article>
            `).join("")}
          </div>
        </section>

        <section id="objections" class="section-grid">
          <div>
            <p class="eyebrow">Objection handling</p>
            <h2>Common concerns with clear response logic.</h2>
          </div>
          <div class="objection-grid">${model.objections.map(([objection, response, note], index) => `
            <article class="objection-card">
              ${icon("objections")}
              <h3>${objection}</h3>
              <p>${response}</p>
              <small>${note}</small>
              <div class="rating-row">${[1, 2, 3, 4, 5].map((rating) => `<button type="button" data-objection-rating="${index}:${rating}">${rating}</button>`).join("")}</div>
              <button class="button tertiary" type="button" data-objection-followup="${index}">Request Follow-up</button>
            </article>
          `).join("")}</div>
        </section>

        <section id="documents" class="band">
          <div class="section-heading">
            <p class="eyebrow">Document center</p>
            <h2>Locked placeholders for approved release.</h2>
          </div>
          <div class="doc-grid">${model.documents.map((doc) => `
            <article class="doc-card">
              ${icon("documents")}
              <h3>${doc}</h3>
              <p>Available after approval / final document release.</p>
              <button type="button" class="button tertiary" data-doc-request="${doc}">Request Access</button>
            </article>
          `).join("")}</div>
        </section>

        <section id="admin" class="section-grid">
          <div>
            <p class="eyebrow">Admin readiness</p>
            <h2>Approval workflow and engagement intelligence are staged, not public.</h2>
          </div>
          <div class="admin-grid">
            ${metric("analytics", "Events", formatNumber(engagement.events), "Local demo tracking")}
            ${metric("save", "Scenarios", formatNumber(engagement.scenarios), "Saved locally")}
            ${metric("comments", "Questions/comments", formatNumber(engagement.questions + engagement.comments), "Follow-up signal")}
            ${metric("documents", "Document requests", formatNumber(engagement.documents), "No real files")}
            <button class="button primary full" type="button" data-action="queue-invite">${icon("email")} Queue Demo Invitation</button>
          </div>
        </section>

        <section id="actions" class="action-section">
          <div class="section-heading">
            <p class="eyebrow">Action center</p>
            <h2>Record private review intent locally</h2>
          </div>
          <div class="action-layout">
            <form class="action-form" data-form="interest">
              <label for="investorRange">Interest range</label>
              <select id="investorRange" data-field="investorRange">${["50k-100k", "100k-250k", "250k-500k", "500k-1M", "1M+"].map((range) => `<option ${range === state.investorRange ? "selected" : ""}>${range}</option>`).join("")}</select>
              <fieldset>
                <legend>Interest areas</legend>
                ${model.interestAreas.map((area) => `<label class="check-row"><input type="checkbox" value="${area}" data-interest-area ${state.selectedInterests.includes(area) ? "checked" : ""}><span>${area}</span></label>`).join("")}
              </fieldset>
              <button class="button primary" type="submit">${icon("save")} Save Interest Selection</button>
            </form>
            <form class="action-form" data-form="question">
              <label for="questionText">Question or objection</label>
              <textarea id="questionText" data-field="questionText" rows="5" placeholder="Add a diligence question, objection, or topic for follow-up.">${state.questionText}</textarea>
              <label for="commentText">Private comment</label>
              <textarea id="commentText" data-field="commentText" rows="4" placeholder="Add a founder/internal review note.">${state.commentText}</textarea>
              <div class="button-row">
                <button class="button primary" type="submit">${icon("comments")} Save Question</button>
                <button class="button secondary" type="button" data-action="request-call">${icon("call")} Request Call</button>
              </div>
            </form>
          </div>
          <div id="toast" class="toast" role="status" aria-live="polite"></div>
        </section>
        ${balponicsLinks()}
      </main>
    `;
    setupInvestorPageMode();
    track("portal_view", { scenario: state.scenarioId, contribution: state.contribution });
  }

  function resolveInvestorPage(hashValue) {
    const id = String(hashValue || "").replace("#", "") || "overview";
    const groups = {
      overview: ["overview", "kpi-grid", "brief-grid", "thesis"],
      ecosystem: ["ecosystem"],
      calculator: ["calculator", "scenarios"],
      expansion: ["expansion", "use-of-funds", "risks"],
      qa: ["qa", "objections", "documents", "admin"],
      actions: ["actions"]
    };
    const found = Object.entries(groups).find(([, ids]) => ids.includes(id));
    return found ? found[0] : groups[id] ? id : "overview";
  }

  function setupInvestorPageMode() {
    const groups = {
      overview: ["overview"],
      ecosystem: ["ecosystem"],
      calculator: ["calculator", "scenarios"],
      expansion: ["expansion", "use-of-funds", "risks"],
      qa: ["qa", "objections", "documents", "admin"],
      actions: ["actions"]
    };
    const page = resolveInvestorPage(window.location.hash);
    app.querySelectorAll("main > section").forEach((section) => {
      const visible = groups[page]?.includes(section.id) || (page === "overview" && !section.id);
      section.hidden = !visible;
    });
    app.querySelectorAll(".desktop-nav a").forEach((link) => {
      const linkPage = link.dataset.portalPage || resolveInvestorPage(link.getAttribute("href"));
      link.classList.toggle("active", linkPage === page);
      link.addEventListener("click", (event) => {
        event.preventDefault();
        const nextPage = link.dataset.portalPage || resolveInvestorPage(link.getAttribute("href"));
        if (window.location.hash !== `#${nextPage}`) window.location.hash = nextPage;
        else {
          setupInvestorPageMode();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      });
    });
  }

  if (!window.SYMBIO_INVESTOR_PAGE_ROUTER_READY) {
    window.SYMBIO_INVESTOR_PAGE_ROUTER_READY = true;
    window.addEventListener("hashchange", () => {
      if (document.body.classList.contains("portal-open")) {
        setupInvestorPageMode();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  }

  function toast(message) {
    const el = document.getElementById("toast");
    if (!el) return;
    el.textContent = message;
    el.classList.add("show");
    window.setTimeout(() => el.classList.remove("show"), 3200);
  }

  function updateFromField(target) {
    const key = target.dataset.field;
    if (!key) return;
    const value = target.type === "number" || target.type === "range" ? Number(target.value) : target.value;
    state[key] = value;
    if (key === "scenarioId") {
      const scenario = activeScenario();
      state.ebitdaMargin = scenario.ebitdaMargin;
      state.valuationMultiple = scenario.valuationMultiple;
    }
    saveState();
    renderPortal();
  }

  async function submitInvestorApplication(message) {
    if (!window.SymbioApplicationService?.submitApplication) return null;
    const profile = window.SymbioPortalAccessState?.profile;
    const fullName = profile?.full_name || "Approved investor (name not on file)";
    const email = profile?.email || "";
    if (!email) {
      console.warn("Investor application not sent: no approved profile email on file.");
      return { success: false, error: "No approved profile email on file." };
    }
    try {
      return await window.SymbioApplicationService.submitApplication({
        portalType: "investor",
        submissionType: "investor_follow_up",
        fullName,
        email,
        roleRequested: "investor",
        interestType: state.investorRange,
        message,
        submittedData: {
          contribution: state.contribution,
          scenario_id: state.scenarioId,
          selected_interests: state.selectedInterests,
          calculated: calculatePlatform()
        }
      });
    } catch (error) {
      console.warn("Investor production application submission failed; local fallback preserved.", error);
      return { success: false, error: error?.message || String(error) };
    }
  }

  function bindEvents() {
    document.addEventListener("input", (event) => {
      const target = event.target;
      if (target.matches("[data-field]") && !target.matches("textarea")) updateFromField(target);
      if (target.matches("textarea[data-field]")) {
        state[target.dataset.field] = target.value;
        saveState();
      }
    });

    document.addEventListener("change", (event) => {
      const target = event.target;
      if (target.matches("[data-field]") && !target.matches("textarea")) updateFromField(target);
      if (target.matches("[data-interest-area]")) {
        state.selectedInterests = Array.from(document.querySelectorAll("[data-interest-area]:checked")).map((input) => input.value);
        saveState();
      }
    });

    document.addEventListener("click", async (event) => {
      const preset = event.target.closest("[data-preset]");
      if (preset) {
        state.contribution = Number(preset.dataset.preset);
        saveState();
        renderPortal();
        return;
      }

      const scenario = event.target.closest("[data-scenario]");
      if (scenario) {
        state.scenarioId = scenario.dataset.scenario;
        const current = activeScenario();
        state.ebitdaMargin = current.ebitdaMargin;
        state.valuationMultiple = current.valuationMultiple;
        saveState();
        renderPortal();
        return;
      }

      const openQa = event.target.closest("[data-open-qa]");
      if (openQa) {
        state.openQa = Number(openQa.dataset.openQa);
        saveState();
        renderPortal();
        return;
      }

      const qaRating = event.target.closest("[data-qa-rating]");
      if (qaRating) {
        const [questionIndex, rating] = qaRating.dataset.qaRating.split(":");
        const item = model.qa[Number(questionIndex)];
        await backend.saveInvestorQuestionRating({ question: item?.[1], rating: Number(rating) });
        toast("Question rating saved locally.");
        return;
      }

      const qaComment = event.target.closest("[data-save-qa-comment]");
      if (qaComment) {
        const index = qaComment.dataset.saveQaComment;
        const textarea = document.querySelector(`[data-qa-comment="${index}"]`);
        const item = model.qa[Number(index)];
        await backend.saveInvestorComment({ comment: textarea?.value || "", question: item?.[1], source: "qa_module" });
        if (textarea) textarea.value = "";
        toast("Q&A comment saved locally.");
        return;
      }

      const objectionRating = event.target.closest("[data-objection-rating]");
      if (objectionRating) {
        const [objectionIndex, rating] = objectionRating.dataset.objectionRating.split(":");
        const item = model.objections[Number(objectionIndex)];
        await backend.saveInvestorObjectionRating({ objection: item?.[0], rating: Number(rating) });
        toast("Objection rating saved locally.");
        return;
      }

      const objectionFollowup = event.target.closest("[data-objection-followup]");
      if (objectionFollowup) {
        const item = model.objections[Number(objectionFollowup.dataset.objectionFollowup)];
        await backend.saveInvestorObjection({ objection: item?.[0], status: "follow_up_requested" });
        toast("Objection follow-up saved locally.");
        return;
      }

      const doc = event.target.closest("[data-doc-request]");
      if (doc) {
        await backend.requestInvestorDocument({ document_name: doc.dataset.docRequest, status: "requested_demo" });
        toast("Document request saved locally. No file was downloaded.");
        renderPortal();
        return;
      }

      const action = event.target.closest("[data-action]");
      if (!action) return;
      if (action.dataset.action === "save-scenario") {
        await backend.saveInvestorScenario({
          contribution: state.contribution,
          estimated_equity: calculateInvestor().equity,
          founder_platform_allocation: calculateInvestor().founderAllocation,
          scenario_id: state.scenarioId,
          hubs: state.hubs,
          ebitda_margin: state.ebitdaMargin,
          valuation_multiple: state.valuationMultiple,
          calculated: calculatePlatform()
        });
        toast("Scenario saved locally.");
        renderPortal();
      }
      if (action.dataset.action === "request-call") {
        await backend.requestInvestorCall({ interest_range: state.investorRange, selected_interests: state.selectedInterests });
        const result = await submitInvestorApplication("Investor requested a call.");
        toast(result?.success ? "Call request saved, and sent to the SymbioGreens team." : "Call request saved locally. Please also use the public contact form if urgent.");
        return;
      }
      if (action.dataset.action === "queue-invite") {
        await backend.sendInvestorInvitation({ investor_email: "demo.investor@example.com", status: "queued_demo" });
        toast("Demo invitation queued locally.");
      }
      if (action.dataset.action === "logout") {
        await backend.logoutInvestor();
        renderAccessRequired();
      }
    });

    document.addEventListener("submit", async (event) => {
      const form = event.target.closest("form[data-form]");
      if (!form) return;
      event.preventDefault();
      if (form.dataset.form === "interest") {
        await backend.saveInvestorInterestSelection({
          interest_range: state.investorRange,
          selected_interests: state.selectedInterests,
          contribution: state.contribution,
          scenario_id: state.scenarioId
        });
        const result = await submitInvestorApplication("Investor submitted interest selection.");
        toast(result?.success ? "Interest selection saved, and sent to the SymbioGreens team." : "Interest selection saved locally.");
      }
      if (form.dataset.form === "question") {
        if (state.questionText.trim()) await backend.saveInvestorQuestion({ question: state.questionText.trim(), source: "action_center" });
        if (state.commentText.trim()) await backend.saveInvestorComment({ comment: state.commentText.trim(), source: "action_center" });
        state.questionText = "";
        state.commentText = "";
        saveState();
        renderPortal();
        toast("Question and comment saved locally.");
      }
    });
  }

  function boot() {
    bindEvents();
    if (isDemoEnabled()) renderPortal();
    else renderAccessRequired();
  }

  boot();
})();
