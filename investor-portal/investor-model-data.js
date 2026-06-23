(function () {
  const targetRaise = 2200000;
  const investorEquityPool = 30;
  const founderAllocationPercent = 10;

  window.SYMBIOGREENS_INVESTOR_MODEL = {
    currency: "USD",
    targetRaise,
    investorEquityPool,
    founderAllocationPercent,
    contributionPresets: [50000, 100000, 200000, 250000, 500000, 1000000, 2200000],
    scenarios: [
      {
        id: "conservative",
        label: "Conservative",
        revenuePerHub: 850000,
        ebitdaMargin: 14,
        valuationMultiple: 3.5,
        note: "Illustrative downside-sensitive case focused on disciplined execution."
      },
      {
        id: "base",
        label: "Base Case",
        revenuePerHub: 1400000,
        ebitdaMargin: 24,
        valuationMultiple: 6,
        note: "Illustrative operating case if buyer activation and production execution are validated."
      },
      {
        id: "full",
        label: "Full Potential",
        revenuePerHub: 2200000,
        ebitdaMargin: 32,
        valuationMultiple: 8,
        note: "Illustrative upside case only if execution, market validation, capital, and expansion partnerships align."
      }
    ],
    useOfFunds: [
      ["Greenhouse / site infrastructure", 410000],
      ["Hydroponic systems", 260000],
      ["Microgreens", 85000],
      ["Mushrooms", 125000],
      ["Specialty crops", 110000],
      ["Solar / energy resilience", 210000],
      ["Water / fertigation / automation", 145000],
      ["Cold chain", 135000],
      ["Logistics", 115000],
      ["Working capital", 255000],
      ["Staff / administration", 135000],
      ["Buyer activation", 95000],
      ["Professional services", 105000],
      ["Contingency", 115000],
      ["Founder / platform development allocation", 220000]
    ],
    risks: [
      ["Execution risk", "Complex builds require disciplined phasing, vendor control, and operational leadership.", "Phase implementation, lock critical suppliers, use SOPs, and track milestones."],
      ["Crop risk", "Yield, disease, climate, inputs, and operator discipline can affect production.", "Diversify crop systems, monitor environment, test varieties, and maintain production protocols."],
      ["Buyer concentration", "Large buyers can create dependence if contracts are too concentrated.", "Build a portfolio across resorts, chefs, distributors, retailers, and specialty buyers."],
      ["Energy", "Power costs and reliability affect controlled-environment operations.", "Use renewable-first planning, solar resilience, and efficient systems."],
      ["Water", "Water quality and reliability are fundamental for hydroponics.", "Test water, design filtration, monitor fertigation, and maintain backup capacity."],
      ["Logistics", "Fresh product value depends on cold chain and delivery reliability.", "Plan cold storage, route discipline, and delivery controls."],
      ["Regulatory", "Permits, food safety, land use, and import/export rules can shift.", "Use local counsel, food safety standards, and phased market entry."],
      ["Financing", "Capital timing can delay buildout or expansion.", "Stage capital use, maintain contingency, and match expansion to validated demand."],
      ["Expansion", "Replication may require market-specific adaptation.", "Validate each market through local partners, buyer mapping, and pilot economics."],
      ["Country / market risk", "Island and emerging markets can carry political, currency, and operating risk.", "Diversify market pathways and structure local partnerships carefully."]
    ],
    qa: [
      ["Business model", "Is this just one farm?", "No. The first hub is intended as a proof point for a repeatable controlled-environment agriculture platform. Expansion remains illustrative and subject to execution and market validation.", "Core platform thesis."],
      ["Revenue and margins", "How should investors interpret revenue and margin numbers?", "All model outputs are illustrative, non-binding scenarios. They depend on crop mix, buyer demand, operating discipline, energy, labor, pricing, and financing.", "Treat as planning scenarios, not guarantees."],
      ["Crop risk", "What if yields are lower than expected?", "The operating model should use phased crop trials, production SOPs, diversified categories, and buyer feedback to reduce dependence on a single crop outcome.", "Execution discipline matters."],
      ["Market demand", "What if hotel buyers do not sign contracts?", "The market strategy should diversify buyer channels across resorts, chefs, distributors, villas, retailers, wellness buyers, and food service operators.", "Buyer concentration is a risk to manage."],
      ["Expansion strategy", "Why the Caribbean and Africa?", "Island and import-dependent markets often value freshness, local resilience, and controlled supply. Africa scenarios may fit hospitality zones, mining towns, and import substitution opportunities.", "Expansion is potential, not assured."],
      ["Energy and water", "How do energy and water risks get managed?", "Renewable-first planning, water testing, filtration, monitoring, and controlled fertigation are core design requirements.", "Infrastructure quality is central."],
      ["Legal / structure", "What legal structure is proposed?", "Final structure is subject to counsel, due diligence, securities compliance, tax review, and formal agreements.", "No public offer is being made."],
      ["Exit / liquidity", "How should investors think about exit or liquidity?", "Any liquidity pathway would be subject to future performance, legal structure, market conditions, and negotiated agreements.", "No liquidity outcome is guaranteed."]
    ],
    objections: [
      ["Is this just one farm?", "The Las Terrenas hub is the first proof point. The strategy is to develop a repeatable platform that can adapt to other high-value markets.", "A platform requires validated operations, buyers, training, systems, and local partnerships."],
      ["What if yields are lower than expected?", "The model should not depend on one crop. Crop trials, staged production, climate controls, and diversified categories reduce single-point risk.", "Production discipline and data collection are essential."],
      ["What if hotel buyers do not sign contracts?", "The buyer strategy includes resorts, chefs, restaurants, distributors, retailers, and wellness buyers rather than a single buyer type.", "Demand validation should precede major expansion."],
      ["Why Haiti?", "Haiti scenarios focus on long-term resilience, Cap-Haitien / Labadie hospitality pathways, and local food production potential.", "This is an opportunity pathway, subject to local partners and risk review."],
      ["Why Africa?", "Africa expansion could fit hotel corridors, mining towns, local production hubs, and technical services where import substitution matters.", "Any market entry would require local validation and structure."],
      ["What makes this defensible?", "Defensibility may come from execution quality, buyer relationships, technical know-how, training, crop data, and localized operating playbooks.", "The moat is built through operations, not just equipment."],
      ["How will investor reporting work?", "Future reporting should include production KPIs, buyer pipeline, use of funds, cash flow, milestone tracking, risks, and follow-up priorities.", "Reporting belongs inside the approved investor portal."]
    ],
    documents: [
      "Investor deck",
      "Financial assumptions",
      "Project summary",
      "Risk register",
      "Legal structure",
      "Due diligence package",
      "Expansion plan"
    ],
    interestAreas: [
      "Las Terrenas",
      "Dominican Republic expansion",
      "Haiti",
      "Caribbean",
      "Africa",
      "JV/license model",
      "Technical services",
      "Renewable energy integration",
      "Mushrooms/specialty crops"
    ],
    expansionPathways: [
      ["Las Terrenas proof hub", "Validate premium production, hospitality demand, cold chain, buyer relationships, and operating playbooks."],
      ["Dominican Republic network", "Evaluate Punta Cana, Cap Cana, Puerto Plata, Santo Domingo, and other tourism/food-service corridors."],
      ["Caribbean resilience platform", "Explore island hubs where import substitution, freshness, and local supply resilience can create durable value."],
      ["Africa long-range option", "Assess later-stage technical services, hub partnerships, and food-resilience models in select hospitality and growth markets."]
    ],
    portalModules: [
      ["Approved Access", "Investor-only access after review, approval, account activation, and future Supabase Auth checks."],
      ["Scenario Engine", "Contribution, equity estimate, allocation estimate, expansion assumptions, and saved scenarios."],
      ["Document Room", "Private materials index, future signed URLs, access logs, and request workflow."],
      ["Engagement Intelligence", "Section views, calculator actions, Q&A ratings, comments, objections, and admin follow-up signals."]
    ],
    disclaimer: "All calculator outputs, scenarios, valuation estimates, expansion models, and participation examples are illustrative, non-binding, not guaranteed, not an offer to sell securities, and subject to legal review, due diligence, final agreements, execution risk, market risk, financing risk, regulatory conditions, and operating performance."
  };
})();
