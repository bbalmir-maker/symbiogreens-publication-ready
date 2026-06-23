(function () {
  "use strict";

  const storeKeys = {
    draft: "sg_customer_portal_draft",
    submissions: "sg_customer_portal_submissions",
    productInterest: "sg_customer_portal_product_interest"
  };

  const categoryImages = {
    "premium-lettuces": "assets/images/products/premium-product-assortment.png",
    "baby-greens": "assets/images/hero/home-symbiogreens-product-family.png",
    "microgreens": "assets/images/products/premium-product-assortment.png",
    "premium-specialty-herbs": "assets/images/hero/home-symbiogreens-product-family.png",
    "edible-flowers": "assets/images/products/premium-product-assortment.png",
    "gourmet-mushrooms": "assets/images/buyers/packaging-quality-control.png",
    "wellness-mushrooms": "assets/images/buyers/packaging-quality-control.png",
    "specialty-vegetables": "assets/images/hero/home-symbiogreens-product-family.png",
    default: "assets/images/products/premium-product-assortment.png"
  };

  const specialtyImageFallbacks = [
    ["swiss chard", "public/catalog/baby-greens/images/webp/baby-swiss-chard.webp"],
    ["red vein sorrel", "public/catalog/premium-specialty-herbs/images/webp/sorrel-red-veined.webp"],
    ["french sorrel", "public/catalog/premium-specialty-herbs/images/webp/sorrel-green.webp"],
    ["fennel", "public/catalog/premium-specialty-herbs/images/webp/fennel-fronds.webp"],
    ["radish", "public/catalog/microgreens/images/webp/radish-microgreens.webp"],
    ["bok choy", "public/catalog/baby-greens/images/webp/pak-choi-baby-bok-choy.webp"],
    ["tatsoi", "public/catalog/baby-greens/images/webp/tatsoi.webp"],
    ["mizuna", "public/catalog/baby-greens/images/webp/mizuna.webp"]
  ];

  const buyerTypes = [
    ["chef", "Chef / Restaurant", "Flavor, presentation, specialty crops, and reliable weekly supply."],
    ["hotel", "Hotel / Resort", "Freshness, consistency, delivery reliability, and premium presentation."],
    ["supermarket", "Supermarket / Grocery", "Shelf life, clean packaging, visual freshness, and recurring availability."],
    ["distributor", "Distributor", "Predictable categories, volume planning, logistics, and buyer aggregation."],
    ["catering", "Catering Company", "Event-based planning, quality consistency, and flexible product mix."],
    ["institution", "Institution", "Dependable supply planning, food safety discipline, and clear communication."],
    ["wellness", "Wellness / Specialty Shop", "Premium greens, herbs, mushrooms, and differentiated fresh products."],
    ["home", "Home Consumer", "Fresh local options for personal use, subject to availability."],
    ["other", "Other", "Tell us what you need so we can evaluate fit."]
  ];

  const requestTypes = [
    ["sample_box", "Sample box", "Evaluate product quality, freshness, and fit when samples become available."],
    ["product_list", "Product list", "Request a current or planned product list for buyer review."],
    ["team_call", "Call with team", "Discuss your buyer needs, location, volume, and timing."],
    ["pricing", "Pricing discussion", "Review pricing when production planning and availability are ready."],
    ["chef_tasting", "Chef tasting", "Plan a culinary evaluation for chefs, resorts, or hospitality groups."],
    ["custom_crop", "Custom crop discussion", "Share specialty crop requests for future planning."]
  ];

  const pages = [
    ["overview", "Overview", "sprout"],
    ["products", "Products", "basket"],
    ["buyer", "Buyer Type", "people"],
    ["survey", "Survey", "check"],
    ["volume", "Volume", "chart"],
    ["delivery", "Delivery", "truck"],
    ["samples", "Samples", "box"],
    ["profile", "Profile", "user"],
    ["review", "Review", "doc"],
    ["faq", "FAQ", "help"],
    ["contact", "Next Steps", "leaf"]
  ];

  function balponicsLinks() {
    return `<div class="balponics-links" aria-label="Balponics official links"><strong>Balponics</strong><a href="https://www.facebook.com/hydroponicsaeroponicsaquaponics/" target="_blank" rel="noopener noreferrer" aria-label="Balponics Facebook page">Facebook</a><a href="https://www.instagram.com/balponics/" target="_blank" rel="noopener noreferrer" aria-label="Balponics Instagram profile">Instagram</a><a href="https://balponics.com/" target="_blank" rel="noopener noreferrer" aria-label="Balponics website">Website</a></div>`;
  }

  const state = {
    page: pageFromHash(),
    category: "all",
    selectedProduct: null,
    faq: null,
    draft: normalizeDraft(readStore(storeKeys.draft, defaultDraft())),
    submitted: false,
    status: ""
  };

  function defaultDraft() {
    return {
      customer_profile: {},
      buyer_type: "",
      product_interests: [],
      volume_frequency: {},
      delivery_location: {},
      sample_request: [],
      survey_answers: {},
      submission_status: "draft",
      created_at: new Date().toISOString()
    };
  }

  function normalizeDraft(saved) {
    const draft = {...defaultDraft(), ...(saved || {})};
    draft.customer_profile = draft.customer_profile && typeof draft.customer_profile === "object" ? draft.customer_profile : {};
    draft.volume_frequency = draft.volume_frequency && typeof draft.volume_frequency === "object" ? draft.volume_frequency : {};
    draft.delivery_location = draft.delivery_location && typeof draft.delivery_location === "object" ? draft.delivery_location : {};
    draft.survey_answers = draft.survey_answers && typeof draft.survey_answers === "object" ? draft.survey_answers : {};
    draft.product_interests = Array.isArray(draft.product_interests) ? draft.product_interests : [];
    draft.sample_request = Array.isArray(draft.sample_request) ? draft.sample_request : [];
    return draft;
  }

  function products() {
    return Array.isArray(window.SYMBIO_CUSTOMER_PRODUCTS) ? window.SYMBIO_CUSTOMER_PRODUCTS.filter(p => p.active !== false) : [];
  }

  function categories() {
    const seen = new Map();
    products().forEach(p => {
      if (!seen.has(p.category_id)) seen.set(p.category_id, p.category_name || titleize(p.category_id));
    });
    return [...seen.entries()].map(([id, name]) => ({id, name}));
  }

  function titleize(value) {
    return String(value || "").replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
  }

  function pageFromHash() {
    const id = (location.hash || "#overview").replace("#", "");
    return pages.some(([key]) => key === id) ? id : "overview";
  }

  function setPage(page) {
    state.page = pages.some(([key]) => key === page) ? page : "overview";
    history.replaceState(null, "", `#${state.page}`);
    render();
    window.scrollTo({top: 0, behavior: "smooth"});
  }

  function saveDraft() {
    writeStore(storeKeys.draft, state.draft);
  }

  function readStore(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (error) {
      return fallback;
    }
  }

  function writeStore(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      state.status = "Draft could not be saved in this browser, but you can continue.";
    }
  }

  function esc(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
    }[char]));
  }

  function icon(name) {
    const common = `width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"`;
    const paths = {
      sprout: `<path d="M12 21V10"/><path d="M12 10C7 10 5 7 5 3c4 0 7 2 7 7Z"/><path d="M12 12c5 0 7-3 7-7-4 0-7 2-7 7Z"/>`,
      basket: `<path d="m6 10 2-5"/><path d="m18 10-2-5"/><path d="M4 10h16l-1.5 10h-13L4 10Z"/><path d="M8 14h8"/><path d="M9 17h6"/>`,
      people: `<path d="M16 21v-2a4 4 0 0 0-8 0v2"/><circle cx="12" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>`,
      check: `<path d="M20 6 9 17l-5-5"/><path d="M21 12a9 9 0 1 1-4-7.5"/>`,
      chart: `<path d="M4 19V5"/><path d="M4 19h16"/><path d="M8 16v-5"/><path d="M12 16V8"/><path d="M16 16v-3"/>`,
      truck: `<path d="M3 7h11v10H3z"/><path d="M14 10h4l3 3v4h-7z"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>`,
      box: `<path d="m21 8-9-5-9 5 9 5 9-5Z"/><path d="M3 8v8l9 5 9-5V8"/><path d="M12 13v8"/>`,
      user: `<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>`,
      doc: `<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/><path d="M8 13h8"/><path d="M8 17h6"/>`,
      help: `<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 1 1 5.8 1c0 2-3 2-3 4"/><path d="M12 17h.01"/>`,
      leaf: `<path d="M20 4C9 4 4 9 4 20c11 0 16-5 16-16Z"/><path d="M4 20 15 9"/>`
    };
    return `<svg ${common}>${paths[name] || paths.leaf}</svg>`;
  }

  function productImage(product) {
    if (product?.category_id === "specialty-vegetables") {
      const name = String(product.product_name || "").toLowerCase();
      const match = specialtyImageFallbacks.find(([needle]) => name.includes(needle));
      if (match) return match[1];
      return categoryImages["specialty-vegetables"];
    }
    return product?.images?.webp || product?.images?.png || product?.images?.thumbnail || categoryImages[product?.category_id] || categoryImages.default;
  }

  function productImgTag(product, className = "product-image") {
    const fallback = categoryImages[product?.category_id] || categoryImages.default;
    return `<img class="${esc(className)}" src="${esc(productImage(product))}" alt="${esc(product.product_name)}" loading="lazy" decoding="async" onerror="this.onerror=null;this.src='${esc(fallback)}';">`;
  }

  function selectedProducts() {
    const ids = new Set(state.draft.product_interests.map(item => item.product_id));
    return products().filter(product => ids.has(product.id));
  }

  function productInterest(productId) {
    return state.draft.product_interests.find(item => item.product_id === productId);
  }

  function upsertProductInterest(product, details = {}) {
    const existing = productInterest(product.id);
    const row = {
      product_id: product.id,
      product_name: product.product_name,
      category_id: product.category_id,
      category_name: product.category_name,
      interest_level: details.interest_level || existing?.interest_level || "medium",
      quantity_estimate: details.quantity_estimate || existing?.quantity_estimate || state.draft.volume_frequency.weekly_quantity || "",
      delivery_frequency: details.delivery_frequency || existing?.delivery_frequency || state.draft.volume_frequency.delivery_frequency || "",
      sample_request: details.sample_request || existing?.sample_request || false,
      packaging_preference: details.packaging_preference || existing?.packaging_preference || state.draft.survey_answers.packaging || "",
      notes: details.notes || existing?.notes || "",
      language: "en",
      source_page: location.hash || "#products",
      created_at: existing?.created_at || new Date().toISOString()
    };
    state.draft.product_interests = existing
      ? state.draft.product_interests.map(item => item.product_id === product.id ? row : item)
      : [...state.draft.product_interests, row];
    saveDraft();
    return row;
  }

  function removeProductInterest(productId) {
    state.draft.product_interests = state.draft.product_interests.filter(item => item.product_id !== productId);
    saveDraft();
  }

  function render() {
    const app = document.getElementById("app");
    app.innerHTML = `
      <aside class="sidebar">
        <div class="brand-card">
          <img class="brand-lockup" src="assets/logos/symbiogreens-balponics-lockup.png" alt="SymbioGreens and Balponics">
          <div class="brand-title">SymbioGreens Customer Portal</div>
          <p class="brand-subtitle">Powered by Balponics production know-how</p>
        </div>
        <nav class="nav" aria-label="Customer portal pages">
          ${pages.map(([key, label, iconName]) => `<button type="button" class="${state.page === key ? "active" : ""}" data-page="${key}"><span class="nav-icon">${icon(iconName)}</span><span>${label}</span></button>`).join("")}
        </nav>
        <div class="sidebar-help">
          <strong>Buyer demand matters.</strong>
          <p>Your product selections help SymbioGreens prioritize crop planning, samples, and market validation.</p>
          <button type="button" class="secondary-btn" data-page="review">Review Draft</button>
        </div>
      </aside>
      <main class="main">
        <div class="topbar">
          <div>
            <div class="eyebrow">Fresh local production planning</div>
            <h2>${pageTitle()}</h2>
          </div>
          <div class="status-pill">${state.draft.product_interests.length} product interest${state.draft.product_interests.length === 1 ? "" : "s"} saved locally</div>
        </div>
        ${state.status ? `<div class="alert ${state.statusType || ""}" role="status">${esc(state.status)}</div>` : ""}
        ${renderPage()}
        ${balponicsLinks()}
      </main>
    `;
  }

  function pageTitle() {
    return pages.find(([key]) => key === state.page)?.[1] || "Overview";
  }

  function renderPage() {
    const map = {
      overview: overviewPage,
      products: productsPage,
      buyer: buyerPage,
      survey: surveyPage,
      volume: volumePage,
      delivery: deliveryPage,
      samples: samplesPage,
      profile: profilePage,
      review: reviewPage,
      faq: faqPage,
      contact: contactPage
    };
    return `<section class="page active">${(map[state.page] || overviewPage)()}</section>`;
  }

  function overviewPage() {
    const benefits = [
      ["Fresher Local Supply", "Reduce dependence on long-distance supply chains and access fresher produce grown closer to your market.", "sprout"],
      ["Consistent Quality", "Controlled production helps improve consistency, cleanliness, and planning.", "check"],
      ["Premium Product Mix", "Leafy greens, herbs, microgreens, mushrooms, and specialty crops for higher-value menus and shelves.", "basket"],
      ["Buyer-Driven Production", "Your survey responses help guide what we grow, when we grow it, and how we prioritize demand.", "chart"],
      ["Hospitality and Retail Ready", "Designed for chefs, resorts, supermarkets, distributors, and institutions that need reliability.", "people"],
      ["Sustainable Direction", "Efficient water use, local production, and reduced import dependency support a more resilient food system.", "leaf"]
    ];
    return `
      <section class="hero" style="--hero-image:url('assets/images/hero/homepage-hero-greenhouse.png')">
        <div class="hero-content">
          <div class="eyebrow">SymbioGreens Customer Portal</div>
          <h1>Fresh, Premium Local Produce for Chefs, Resorts, Retailers, and Serious Buyers</h1>
          <p>Tell us what you need, how often you need it, and how SymbioGreens can support your kitchen, shelves, menu, or supply program with cleaner, fresher, locally grown products.</p>
          <p>Fresh, premium, locally grown produce - closer to your kitchen, your shelves, and your customers.</p>
          <div class="actions">
            <button type="button" class="primary-btn" data-page="products">Explore Products</button>
            <button type="button" class="secondary-btn" data-page="buyer">Start Buyer Survey</button>
            <button type="button" class="secondary-btn" data-page="samples">Request Supply Discussion</button>
          </div>
        </div>
      </section>
      <div class="section-head">
        <div>
          <div class="eyebrow">Why this portal exists</div>
          <h2>Product planning starts with real buyer demand.</h2>
          <p>SymbioGreens is developing controlled-environment production for premium greens, herbs, microgreens, mushrooms, and specialty crops. This portal helps buyers tell us what they need, how often they need it, and how we can serve their market.</p>
        </div>
      </div>
      <div class="grid three">${benefits.map(([title, body, iconName]) => card(title, body, iconName)).join("")}</div>
      <div class="section-head"><div><div class="eyebrow">Visual supply journey</div><h2>From crop planning to buyer-ready product.</h2></div></div>
      <div class="grid three">
        ${mediaCard("Premium product mix", "A curated mix of lettuces, greens, herbs, microgreens, mushrooms, and specialty crops for serious buyers.", "assets/images/hero/home-symbiogreens-product-family.png")}
        ${mediaCard("Harvest and delivery discipline", "Requests help guide harvest windows, packing expectations, delivery frequency, and market readiness.", "assets/images/buyers/harvest-delivery-operations.png")}
        ${mediaCard("Quality and packaging", "Buyer feedback helps shape packaging, sample discussions, and quality requirements before production scales.", "assets/images/buyers/packaging-quality-control.png")}
      </div>
    `;
  }

  function card(title, body, iconName) {
    return `<article class="card"><div class="card-icon">${icon(iconName)}</div><h3>${esc(title)}</h3><p>${esc(body)}</p></article>`;
  }

  function mediaCard(title, body, image) {
    return `<article class="card media-card"><img src="${esc(image)}" alt="${esc(title)}"><div class="card-body"><h3>${esc(title)}</h3><p>${esc(body)}</p></div></article>`;
  }

  function productsPage() {
    const cats = categories();
    const visible = products()
      .filter(product => state.category === "all" || product.category_id === state.category)
      .slice(0, state.category === "all" ? 36 : 48);
    const total = products().filter(product => state.category === "all" || product.category_id === state.category).length;
    return `
      <div class="section-head">
        <div>
          <div class="eyebrow">Product catalog</div>
          <h2>Premium produce categories for chefs, resorts, retailers, and distributors.</h2>
          <p>Browse available and planned products. Interest selections are saved to your local draft and can be reviewed before submission. Choose a category to see deeper product options.</p>
        </div>
        <button type="button" class="primary-btn" data-page="survey">Continue to Survey</button>
      </div>
      <div class="product-toolbar">
        <div class="chip-row">
          <button type="button" class="chip ${state.category === "all" ? "active" : ""}" data-category="all">All</button>
          ${cats.map(cat => `<button type="button" class="chip ${state.category === cat.id ? "active" : ""}" data-category="${esc(cat.id)}">${esc(shortCategory(cat.name))}</button>`).join("")}
        </div>
        <button type="button" class="ghost-btn" data-quick-add-visible>Quick-add all shown</button>
      </div>
      <p class="catalog-note">Showing ${visible.length} of ${total} products${state.category === "all" ? ". Use category filters for the full catalog." : "."} Use the checkbox to quick-add with default details, or "View details" to set specifics.</p>
      <div class="product-grid">${visible.map(productCard).join("")}</div>
    `;
  }

  function shortCategory(name) {
    return String(name || "").replace("Premium ", "").replace("Hydroponic ", "");
  }

  function productCard(product) {
    const saved = productInterest(product.id);
    return `
      <article class="card product-card">
        <figure class="product-card-media">${productImgTag(product)}</figure>
        <div class="product-card-body">
          <div class="product-meta">
            <span class="tag">${esc(shortCategory(product.category_name || product.category_id))}</span>
            <span class="tag ${saved ? "blue" : "gold"}">${saved ? "Interest saved" : availabilityFor(product)}</span>
          </div>
          <h3>${esc(product.product_name)}</h3>
          <p class="product-copy">${esc(product.flavor_profile || "Premium controlled-environment product candidate for buyer validation.")}</p>
          <label class="quick-add-row"><input type="checkbox" data-quick-add="${esc(product.id)}" ${saved ? "checked" : ""}> Quick-add with default details</label>
          <div class="product-card-footer">
            <button type="button" class="ghost-btn" data-product-detail="${esc(product.id)}">View details</button>
            <button type="button" class="primary-btn" data-add-product="${esc(product.id)}">${saved ? "Update interest" : "Add to survey"}</button>
          </div>
        </div>
      </article>
    `;
  }

  function availabilityFor(product) {
    if (product.category_id === "gourmet-mushrooms" || product.category_id === "wellness-mushrooms") return "By request";
    if (product.category_id === "edible-flowers") return "Pilot";
    if (product.custom_program_eligible) return "Planned";
    return "Available";
  }

  function buyerPage() {
    return `
      <div class="split-panel">
        <div class="card">
          <div class="eyebrow">Buyer type</div>
          <h2>Tell us who you are buying for.</h2>
          <p>Your buyer type helps us understand product mix, packaging, supply expectations, and follow-up priorities.</p>
          <div class="grid two">${buyerTypes.map(([id, label, body]) => `<button type="button" class="buyer-card ${state.draft.buyer_type === id ? "active" : ""}" data-buyer-type="${id}"><div class="card-icon">${icon(id === "hotel" ? "people" : "basket")}</div><h3>${esc(label)}</h3><p>${esc(body)}</p></button>`).join("")}</div>
        </div>
        <img src="assets/images/buyers/contact-hero-buyer-project-coordination.png" alt="Buyer coordination">
      </div>
      <div class="form-actions"><button type="button" class="ghost-btn" data-page="products">Back to Products</button><button type="button" class="primary-btn" data-page="survey">Continue</button></div>
    `;
  }

  function surveyPage() {
    const selected = selectedProducts();
    return `
      ${stepper(4)}
      <div class="card form-panel">
        <div class="eyebrow">Product interest survey</div>
        <h2>Shape production around what buyers actually want.</h2>
        <p>Select products on the Products page, then answer the demand questions below. This is not a guarantee of availability; requests are reviewed for planning.</p>
        ${selected.length ? `<div class="chip-row">${selected.map(p => `<span class="tag blue">${esc(p.product_name)}</span>`).join("")}</div>` : `<div class="alert">No products selected yet. Add at least one product interest before final submission.</div>`}
        <form data-form="survey" novalidate>
          <div class="field-grid">
            ${selectField("readiness", "Readiness to buy", ["Exploring", "Ready when available", "Need samples first", "Planning recurring supply", "Custom crop interest"])}
            ${selectField("supplier_challenges", "Current supplier challenge", ["Long-distance supply", "Inconsistent quality", "Availability gaps", "Price volatility", "Packaging or shelf life", "Other"])}
            ${selectField("packaging", "Desired packaging", ["Living product", "Clamshell", "Bulk case", "Chef pack", "Retail-ready", "To be discussed"])}
            ${selectField("quality", "Quality requirement", ["Premium visual quality", "Foodservice consistency", "Retail shelf presentation", "Specialty chef use", "Clean standard pack"])}
            <label><span>Custom crop requests</span><input name="custom_crops" value="${esc(state.draft.survey_answers.custom_crops || "")}" placeholder="Example: basil, edible flowers, oyster mushrooms"></label>
            <label><span>Notes / comments</span><textarea name="notes" placeholder="Tell us what matters most.">${esc(state.draft.survey_answers.notes || "")}</textarea></label>
          </div>
          <div class="form-actions"><button type="submit" class="primary-btn">Save & Continue to Volume</button></div>
        </form>
      </div>
    `;
  }

  function volumePage() {
    const v = state.draft.volume_frequency;
    return `
      ${stepper(5)}
      <div class="split-panel">
        <div class="card form-panel">
          <div class="eyebrow">Volume and frequency</div>
          <h2>Make quantity and delivery expectations easy to understand.</h2>
          <form data-form="volume" novalidate>
            <div class="field-grid">
              ${selectField("weekly_quantity", "Weekly quantity estimate", ["Small weekly order", "Medium recurring order", "Large hospitality/retail order", "Distributor-level inquiry", "To be discussed"], v.weekly_quantity)}
              ${selectField("delivery_frequency", "Preferred delivery frequency", ["Weekly", "Twice per week", "Bi-weekly", "Monthly", "Event-based", "To be discussed"], v.delivery_frequency)}
              <label><span>Preferred delivery days</span><input name="delivery_days" value="${esc(v.delivery_days || "")}" placeholder="Example: Monday / Thursday"></label>
              <label><span>Expected start date</span><input name="start_date" value="${esc(v.start_date || "")}" placeholder="Example: Q4 2026 or when available"></label>
              ${selectField("backup_supply", "Backup/emergency supply need", ["No", "Occasionally", "Yes, important", "To be discussed"], v.backup_supply)}
              ${selectField("seasonality", "Seasonal changes", ["Stable year-round", "High season spikes", "Event-based changes", "Not sure"], v.seasonality)}
            </div>
            <div class="form-actions"><button type="submit" class="primary-btn">Save & Continue to Delivery</button></div>
          </form>
        </div>
        <img src="assets/images/buyers/harvest-delivery-operations.png" alt="Harvest and delivery planning">
      </div>
    `;
  }

  function deliveryPage() {
    const d = state.draft.delivery_location;
    return `
      ${stepper(6)}
      <div class="card form-panel">
        <div class="eyebrow">Delivery and location</div>
        <h2>Keep location details useful and privacy-conscious.</h2>
        <form data-form="delivery" novalidate>
          <div class="field-grid">
            <label><span>Business name</span><input name="business_name" value="${esc(d.business_name || "")}" placeholder="Company, kitchen, hotel, or store"></label>
            <label><span>City / area</span><input name="city_area" value="${esc(d.city_area || "")}" placeholder="City or general area"></label>
            <label><span>Country / region</span><input name="country" value="${esc(d.country || "")}" placeholder="Dominican Republic, Caribbean, etc."></label>
            ${selectField("preferred_contact", "Preferred contact method", ["Email", "Phone", "WhatsApp", "Any"], d.preferred_contact)}
            <label><span>Receiving hours</span><input name="receiving_hours" value="${esc(d.receiving_hours || "")}" placeholder="Example: 8 AM - 2 PM"></label>
            ${selectField("cold_chain", "Cold-chain requirement", ["Yes", "No", "Not sure", "To be discussed"], d.cold_chain)}
            <label><span>Delivery constraints</span><textarea name="constraints" placeholder="Security gate, loading dock, resort receiving, etc.">${esc(d.constraints || "")}</textarea></label>
          </div>
          <div class="form-actions"><button type="submit" class="primary-btn">Save & Continue to Samples</button></div>
        </form>
      </div>
    `;
  }

  function samplesPage() {
    return `
      ${stepper(7)}
      <div class="split-panel">
        <div class="card">
          <div class="eyebrow">Samples and supply request</div>
          <h2>Tell us what kind of follow-up is useful.</h2>
          <p>Requests are non-binding and subject to production planning, buyer validation, harvest schedule, and availability.</p>
          <div class="grid two">${requestTypes.map(([id, label, body]) => `<button type="button" class="request-card ${state.draft.sample_request.includes(id) ? "active" : ""}" data-request-type="${id}"><div class="card-icon">${icon("box")}</div><h3>${esc(label)}</h3><p>${esc(body)}</p></button>`).join("")}</div>
          <div class="form-actions"><button type="button" class="primary-btn" data-page="profile">Continue to Profile</button></div>
        </div>
        <img src="assets/images/buyers/packaging-quality-control.png" alt="Quality and packaging">
      </div>
    `;
  }

  function profilePage() {
    const p = state.draft.customer_profile;
    return `
      ${stepper(8)}
      <div class="card form-panel">
        <div class="eyebrow">Customer profile</div>
        <h2>Who should SymbioGreens follow up with?</h2>
        <form data-form="profile" novalidate>
          <div class="field-grid">
            <label><span>Name *</span><input required name="name" value="${esc(p.name || "")}" placeholder="Full name"></label>
            <label><span>Company</span><input name="company" value="${esc(p.company || "")}" placeholder="Company or buyer group"></label>
            <label><span>Role</span><input name="role" value="${esc(p.role || "")}" placeholder="Chef, owner, purchasing, manager"></label>
            <label><span>Email</span><input type="email" name="email" value="${esc(p.email || "")}" placeholder="name@example.com"></label>
            <label><span>Phone / WhatsApp</span><input name="phone" value="${esc(p.phone || "")}" placeholder="+1 ..."></label>
            <label><span>Country / city</span><input name="location" value="${esc(p.location || "")}" placeholder="Country / city"></label>
            <label><span>Notes</span><textarea name="notes" placeholder="Anything else we should know?">${esc(p.notes || "")}</textarea></label>
          </div>
          <div class="form-actions"><button type="submit" class="primary-btn">Save & Review Request</button></div>
        </form>
      </div>
    `;
  }

  function reviewPage() {
    const errors = validationErrors();
    const summary = [
      ["Buyer type", buyerTypes.find(([id]) => id === state.draft.buyer_type)?.[1] || "Not selected"],
      ["Selected products", selectedProducts().map(p => p.product_name).join(", ") || "None selected"],
      ["Estimated volume", state.draft.volume_frequency.weekly_quantity || "Not provided"],
      ["Delivery frequency", state.draft.volume_frequency.delivery_frequency || "Not provided"],
      ["Location", [state.draft.delivery_location.city_area, state.draft.delivery_location.country].filter(Boolean).join(", ") || "Not provided"],
      ["Sample/supply request", state.draft.sample_request.map(id => requestTypes.find(([key]) => key === id)?.[1] || id).join(", ") || "Not selected"],
      ["Contact", [state.draft.customer_profile.name, state.draft.customer_profile.email || state.draft.customer_profile.phone].filter(Boolean).join(" - ") || "Not provided"]
    ];
    return `
      ${stepper(9)}
      <div class="card form-panel">
        <div class="eyebrow">Review and submit</div>
        <h2>Check your customer interest before sending.</h2>
        <div class="summary-list">${summary.map(([label, value]) => `<div class="summary-row"><strong>${esc(label)}</strong><span>${esc(value)}</span></div>`).join("")}</div>
        ${errors.length ? `<div class="alert"><strong>Before submitting:</strong><ul>${errors.map(error => `<li>${esc(error)}</li>`).join("")}</ul></div>` : ""}
        ${state.submitted ? `<div class="alert success">Thank you. Your product interest has been recorded for review. SymbioGreens will use this information to evaluate demand, prioritize production planning, and follow up where appropriate.</div>` : ""}
        <div class="form-actions">
          <button type="button" class="primary-btn" data-submit-interest ${errors.length || state.submitted ? "disabled" : ""}>${state.submitted ? "Submitted" : "Submit Customer Interest"}</button>
          <button type="button" class="ghost-btn" data-page="products">Add More Products</button>
          ${state.submitted ? `<button type="button" class="ghost-btn" data-new-draft>Start New Draft</button>` : ""}
        </div>
      </div>
    `;
  }

  function faqPage() {
    const faqs = [
      ["What does controlled-environment production mean?", "It means crops are grown with managed water, nutrients, light, and climate conditions to improve consistency and reduce outside variability."],
      ["Why does local production matter?", "Local production can reduce long-distance dependency and support fresher supply planning for nearby kitchens, shelves, and customers."],
      ["What products will be available first?", "Initial priorities depend on production planning and buyer validation. Lettuces, greens, herbs, microgreens, mushrooms, and specialty crops are under review."],
      ["Can chefs request custom crops?", "Yes. Custom crop requests can be submitted for review, but availability is subject to production planning and feasibility."],
      ["Can resorts or supermarkets request recurring supply?", "Yes. Recurring supply requests are useful demand signals, but volumes are reviewed before any commitment is made."],
      ["Are volumes guaranteed?", "No. Survey responses support planning only. Supply is subject to availability, harvest schedule, and production readiness."],
      ["How are prices determined?", "Pricing depends on product type, volume, packaging, delivery expectations, and production planning."],
      ["Can I request samples?", "Yes. Sample requests can be submitted and reviewed when products are available for evaluation."]
    ];
    return `
      <div class="section-head"><div><div class="eyebrow">Buyer education</div><h2>Clear answers without overpromising.</h2><p>Use this section to understand the production model, request process, and current planning status.</p></div></div>
      <div class="grid two">
        <div class="card">${faqs.map(([q, a], index) => `<div class="faq-item ${state.faq === index ? "open" : ""}"><button type="button" data-faq="${index}">${esc(q)}</button><p>${esc(a)}</p></div>`).join("")}</div>
        ${mediaCard("Freshness, quality, and planning", "The portal gathers buyer demand before production scales so the team can prioritize real market needs.", "assets/images/hero/home-symbiogreens-product-family.png")}
      </div>
    `;
  }

  function contactPage() {
    return `
      <div class="hero" style="--hero-image:url('assets/images/buyers/contact-hero-buyer-project-coordination.png')">
        <div class="hero-content">
          <div class="eyebrow">Next steps</div>
          <h1>Request a product, sample, or supply discussion.</h1>
          <p>Customer submissions help SymbioGreens evaluate demand, product priorities, packaging needs, delivery frequency, and market opportunities before production is scaled.</p>
          <div class="actions">
            <button type="button" class="primary-btn" data-page="review">Review Your Request</button>
            <button type="button" class="secondary-btn" data-page="products">Explore Products</button>
          </div>
        </div>
      </div>
      <div class="grid three" style="margin-top:18px">
        ${card("No guarantees yet", "Availability, pricing, delivery, and volume are subject to production planning and review.", "help")}
        ${card("Buyer validation first", "Your input helps identify where demand is strongest and what products should be prioritized.", "chart")}
        ${card("Follow-up when appropriate", "Qualified requests may move to a call, sample discussion, or future supply review.", "check")}
      </div>
    `;
  }

  function stepper(step) {
    const labels = ["Buyer", "Survey", "Volume", "Delivery", "Samples", "Profile", "Review"];
    const pct = Math.min(100, Math.max(10, Math.round((step / 9) * 100)));
    return `<div class="stepper"><div class="progress-track"><div class="progress-fill" style="--progress:${pct}%"></div></div><div class="step-labels">${labels.map(label => `<span>${esc(label)}</span>`).join("")}</div></div>`;
  }

  function selectField(name, label, options, value) {
    const selected = value ?? state.draft.survey_answers[name] ?? "";
    return `<label><span>${esc(label)}</span><select name="${esc(name)}"><option value="">Select...</option>${options.map(option => `<option value="${esc(option)}" ${selected === option ? "selected" : ""}>${esc(option)}</option>`).join("")}</select></label>`;
  }

  function validationErrors() {
    const errors = [];
    const profile = state.draft.customer_profile;
    if (!profile.name) errors.push("Name is required.");
    if (!profile.email && !profile.phone) errors.push("Provide at least one contact method: email or phone/WhatsApp.");
    if (profile.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) errors.push("Enter a valid email address or use phone/WhatsApp as the contact method.");
    if (!state.draft.buyer_type) errors.push("Select a buyer type.");
    if (!state.draft.product_interests.length) errors.push("Select at least one product interest.");
    return errors;
  }

  async function submitInterest() {
    const errors = validationErrors();
    if (errors.length) {
      state.status = errors.join(" ");
      state.statusType = "";
      render();
      return;
    }
    const now = new Date().toISOString();
    const payload = {
      ...state.draft,
      submission_status: "submitted",
      submitted_at: now,
      source_page: location.hash || "#review",
      language: "en",
      backend_ready_shape: {
        customer_profile: state.draft.customer_profile,
        buyer_type: state.draft.buyer_type,
        product_interests: state.draft.product_interests,
        volume_frequency: state.draft.volume_frequency,
        delivery_location: state.draft.delivery_location,
        sample_request: state.draft.sample_request,
        survey_answers: state.draft.survey_answers,
        created_at: state.draft.created_at
      }
    };
    const submissions = readStore(storeKeys.submissions, []);
    writeStore(storeKeys.submissions, [...submissions, payload]);
    writeStore(storeKeys.productInterest, [...readStore(storeKeys.productInterest, []), ...state.draft.product_interests.map(item => ({...item, submitted_at: now}))]);
    if (window.SymbioGreensCustomerBackend?.saveCustomerInterest) {
      window.SymbioGreensCustomerBackend.saveCustomerInterest(payload);
      state.draft.product_interests.forEach(item => window.SymbioGreensCustomerBackend.saveProductInterest?.(item));
    }
    if (window.SymbioApplicationService?.submitApplication) {
      const profile = state.draft.customer_profile;
      try {
        const productionResult = await window.SymbioApplicationService.submitApplication({
          portalType: "customer",
          submissionType: "customer_interest",
          fullName: profile.name,
          companyName: profile.company,
          email: profile.email,
          phone: profile.phone,
          country: "",
          city: profile.location,
          roleRequested: "customer",
          interestType: state.draft.buyer_type,
          message: profile.notes,
          submittedData: payload
        });
        if (productionResult?.success) {
          payload.production_application_id = productionResult.applicationId;
        }
      } catch (error) {
        console.warn("Production application submission failed; local fallback preserved.", error);
      }
    }
    state.submitted = true;
    state.draft.submission_status = "submitted";
    state.status = "Customer interest submitted locally for review. Supabase is still optional and inactive unless configured.";
    state.statusType = "success";
    saveDraft();
    render();
  }

  function startNewDraft() {
    state.draft = defaultDraft();
    state.submitted = false;
    state.status = "New customer draft started.";
    state.statusType = "success";
    saveDraft();
    setPage("overview");
  }

  function openProductModal(productId) {
    const product = products().find(item => item.id === productId);
    if (!product) return;
    const root = document.getElementById("modalRoot");
    const saved = productInterest(product.id);
    root.innerHTML = `
      <div class="modal-backdrop" data-close-modal></div>
      <article class="modal-card">
        <button type="button" class="ghost-btn modal-close" data-close-modal>Close</button>
        <div class="modal-layout">
          <figure class="modal-media">${productImgTag(product, "modal-product-image")}</figure>
          <div class="modal-body">
            <div class="eyebrow">${esc(product.category_name || titleize(product.category_id))}</div>
            <h2>${esc(product.product_name)}</h2>
            <p>${esc(product.flavor_profile || "Premium product candidate for buyer validation.")}</p>
            <div class="grid two">
              ${card("Ideal uses", (product.culinary_uses || ["Menus", "Retail", "Hospitality"]).join(", "), "basket")}
              ${card("Availability", `${availabilityFor(product)} - subject to production planning and harvest schedule.`, "check")}
            </div>
            <form data-form="modalInterest" data-product="${esc(product.id)}" novalidate>
              <div class="field-grid">
                ${selectField("interest_level", "Interest level", ["High", "Medium", "Low", "Exploring"], saved?.interest_level)}
                ${selectField("quantity_estimate", "Quantity estimate", ["Small weekly order", "Medium recurring order", "Large hospitality/retail order", "Distributor-level inquiry"], saved?.quantity_estimate)}
                ${selectField("delivery_frequency", "Delivery frequency", ["Weekly", "Twice per week", "Bi-weekly", "Monthly", "Event-based", "To be discussed"], saved?.delivery_frequency)}
                <label><span>Packaging preference</span><input name="packaging_preference" value="${esc(saved?.packaging_preference || "")}" placeholder="Living, bulk, clamshell, chef pack"></label>
                <label><span>Notes</span><textarea name="notes" placeholder="What do you need this product for?">${esc(saved?.notes || "")}</textarea></label>
              </div>
              <label><span><input type="checkbox" name="sample_request" ${saved?.sample_request ? "checked" : ""}> Request sample/discussion when available</span></label>
              <div class="form-actions">
                <button type="submit" class="primary-btn">${saved ? "Update interest" : "Add to survey"}</button>
                ${saved ? `<button type="button" class="ghost-btn" data-remove-product="${esc(product.id)}">Remove</button>` : ""}
              </div>
            </form>
          </div>
        </div>
      </article>
    `;
    root.classList.add("open");
    root.setAttribute("aria-hidden", "false");
  }

  function closeModal() {
    const root = document.getElementById("modalRoot");
    root.innerHTML = "";
    root.classList.remove("open");
    root.setAttribute("aria-hidden", "true");
  }

  function formObject(form) {
    return Object.fromEntries(new FormData(form).entries());
  }

  document.addEventListener("click", event => {
    const page = event.target.closest("[data-page]");
    if (page) {
      event.preventDefault();
      setPage(page.dataset.page);
      return;
    }
    const category = event.target.closest("[data-category]");
    if (category) {
      event.preventDefault();
      state.category = category.dataset.category;
      render();
      return;
    }
    const productDetail = event.target.closest("[data-product-detail]");
    if (productDetail) {
      event.preventDefault();
      openProductModal(productDetail.dataset.productDetail);
      return;
    }
    const addProduct = event.target.closest("[data-add-product]");
    if (addProduct) {
      event.preventDefault();
      openProductModal(addProduct.dataset.addProduct);
      return;
    }
    const quickAddVisible = event.target.closest("[data-quick-add-visible]");
    if (quickAddVisible) {
      event.preventDefault();
      const visible = products().filter(product => state.category === "all" || product.category_id === state.category).slice(0, state.category === "all" ? 36 : 48);
      visible.forEach(product => upsertProductInterest(product, {}));
      state.status = `${visible.length} product${visible.length === 1 ? "" : "s"} quick-added with default details. Refine any of them from the Products page or Survey.`;
      state.statusType = "success";
      render();
      return;
    }
    const buyer = event.target.closest("[data-buyer-type]");
    if (buyer) {
      event.preventDefault();
      state.draft.buyer_type = buyer.dataset.buyerType;
      saveDraft();
      render();
      return;
    }
    const request = event.target.closest("[data-request-type]");
    if (request) {
      event.preventDefault();
      const id = request.dataset.requestType;
      state.draft.sample_request = state.draft.sample_request.includes(id)
        ? state.draft.sample_request.filter(item => item !== id)
        : [...state.draft.sample_request, id];
      saveDraft();
      render();
      return;
    }
    const close = event.target.closest("[data-close-modal]");
    if (close) {
      event.preventDefault();
      closeModal();
      return;
    }
    const remove = event.target.closest("[data-remove-product]");
    if (remove) {
      event.preventDefault();
      removeProductInterest(remove.dataset.removeProduct);
      closeModal();
      render();
      return;
    }
    const faq = event.target.closest("[data-faq]");
    if (faq) {
      event.preventDefault();
      const index = Number(faq.dataset.faq);
      state.faq = state.faq === index ? null : index;
      render();
      return;
    }
    const submit = event.target.closest("[data-submit-interest]");
    if (submit) {
      event.preventDefault();
      submitInterest();
      return;
    }
    const newDraft = event.target.closest("[data-new-draft]");
    if (newDraft) {
      event.preventDefault();
      startNewDraft();
    }
  });

  document.addEventListener("change", event => {
    const quickAdd = event.target.closest("[data-quick-add]");
    if (!quickAdd) return;
    const productId = quickAdd.dataset.quickAdd;
    const product = products().find(item => item.id === productId);
    if (!product) return;
    if (quickAdd.checked) {
      upsertProductInterest(product, {});
      state.status = `${product.product_name} added to your interest list with default details.`;
    } else {
      removeProductInterest(productId);
      state.status = `${product.product_name} removed from your interest list.`;
    }
    state.statusType = "success";
    render();
  });

  document.addEventListener("submit", event => {
    const form = event.target.closest("form[data-form]");
    if (!form) return;
    event.preventDefault();
    const data = formObject(form);
    if (form.dataset.form === "survey") {
      state.draft.survey_answers = {...state.draft.survey_answers, ...data};
      saveDraft();
      state.status = "Survey answers saved.";
      state.statusType = "success";
      setPage("volume");
    }
    if (form.dataset.form === "volume") {
      state.draft.volume_frequency = {...state.draft.volume_frequency, ...data};
      syncProductInterestsFromVolume();
      saveDraft();
      state.status = "Volume and frequency saved.";
      state.statusType = "success";
      setPage("delivery");
    }
    if (form.dataset.form === "delivery") {
      state.draft.delivery_location = {...state.draft.delivery_location, ...data};
      saveDraft();
      state.status = "Delivery details saved.";
      state.statusType = "success";
      setPage("samples");
    }
    if (form.dataset.form === "profile") {
      state.draft.customer_profile = {...state.draft.customer_profile, ...data};
      saveDraft();
      state.status = "Customer profile saved.";
      state.statusType = "success";
      setPage("review");
    }
    if (form.dataset.form === "modalInterest") {
      const product = products().find(item => item.id === form.dataset.product);
      if (!product) return;
      upsertProductInterest(product, {...data, sample_request: Boolean(form.querySelector("[name='sample_request']")?.checked)});
      state.status = `${product.product_name} added to your interest list.`;
      state.statusType = "success";
      closeModal();
      render();
    }
  });

  function syncProductInterestsFromVolume() {
    state.draft.product_interests = state.draft.product_interests.map(item => ({
      ...item,
      quantity_estimate: item.quantity_estimate || state.draft.volume_frequency.weekly_quantity || "",
      delivery_frequency: item.delivery_frequency || state.draft.volume_frequency.delivery_frequency || ""
    }));
  }

  window.addEventListener("hashchange", () => {
    state.page = pageFromHash();
    render();
  });

  render();
})();
