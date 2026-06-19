window.SYMBIOGREENS_INVESTOR_MODEL = {
  version: "2026-06-18-investor-analysis",
  currency: "USD",
  raiseTarget: 2200000,
  investorEquityPoolPercent: 30,
  maxInvestorEquityPercent: 30,
  founderDevelopmentAllocation: 220000,
  founderDevelopmentAllocationPercent: 10,
  contributionPresets: [50000, 100000, 200000, 250000, 500000, 1000000, 2200000],
  investorTypes: ["Individual", "Strategic partner", "Family office", "Institution", "Other"],
  participationTypes: ["Equity", "Strategic partnership", "Phased participation", "Discussion only"],
  interestLevels: ["Exploratory", "Interested", "Strong interest", "Ready for review"],
  disclaimer: "This investor analysis tool is illustrative, non-binding, and discussion-only. It is not an offer to sell securities, not guaranteed return information, and not a promise of valuation or exit. Outputs are subject to legal review, due diligence, final agreements, execution risk, market risk, financing risk, regulatory conditions, and operating performance.",
  complianceLanguage: [
    "The Las Terrenas / Northeast Dominican Republic hub is the first reference model.",
    "Platform expansion scenarios are illustrative only and depend on successful execution.",
    "No scenario represents guaranteed returns, assured valuation, or a securities offer.",
    "Use outputs only for preliminary discussion and review."
  ],
  firstHubScenarios: [
    {
      id: "conservative",
      label: "Conservative",
      annualRevenue: 850000,
      ebitdaMargin: 0.16,
      distributableProfit: 90000,
      paybackRange: "longer-term / execution dependent",
      roiMultiple: 1.0,
      notes: "Assumes cautious ramp, slower buyer conversion, and disciplined cost control."
    },
    {
      id: "base",
      label: "Base",
      annualRevenue: 1400000,
      ebitdaMargin: 0.24,
      distributableProfit: 220000,
      paybackRange: "medium-term / performance dependent",
      roiMultiple: 1.8,
      notes: "Assumes the first hub reaches stable hospitality, specialty buyer, and recurring supply channels."
    },
    {
      id: "fullPotential",
      label: "Full-potential",
      annualRevenue: 2200000,
      ebitdaMargin: 0.32,
      distributableProfit: 460000,
      paybackRange: "accelerated only if execution is strong",
      roiMultiple: 3.0,
      notes: "Assumes successful first-hub execution, stronger utilization, and premium buyer depth."
    }
  ],
  expansionStages: [
    ["Stage 1", "Las Terrenas / Northeast Dominican Republic hub"],
    ["Stage 2", "Dominican Republic expansion: Punta Cana, Cap Cana, North Coast, Santo Domingo supply corridors"],
    ["Stage 3", "Haiti / Cap-Haitien / Labadie supply opportunity where appropriate"],
    ["Stage 4", "Caribbean island replication: Bahamas, Bermuda, Martinique, Guadeloupe, Eastern Caribbean"],
    ["Stage 5", "Regional platform, licensing, JV, management, and technical services model"]
  ],
  hubAssumptions: {
    defaultHubCount: 3,
    defaultRevenuePerHub: 1400000,
    defaultEbitdaMargin: 0.24,
    defaultValuationMultiple: 6,
    defaultTimelineYears: 5,
    hubPresets: [1, 3, 5, 10]
  },
  valuationSensitivity: {
    revenuePerHubOptions: [850000, 1400000, 2200000],
    marginOptions: [0.16, 0.24, 0.32],
    multipleOptions: [4, 6, 8],
    hubOptions: [1, 3, 5, 10]
  },
  useOfFunds: [
    ["Land / site / legal / lease-option reserve", 200000],
    ["Greenhouse structures and site preparation", 220000],
    ["Hydroponic systems", 230000],
    ["Microgreens facility", 90000],
    ["Mushroom rooms", 110000],
    ["Specialty crops", 100000],
    ["Solar / energy resilience", 150000],
    ["Water / fertigation / automation", 120000],
    ["Cold chain and quality systems", 120000],
    ["Vehicles / logistics", 120000],
    ["Staff / admin facilities", 90000],
    ["Buyer activation / marketing", 75000],
    ["Professional services", 65000],
    ["Working capital", 120000],
    ["Contingency", 95000],
    ["Founder development / platform formation allocation", 220000]
  ],
  risks: [
    ["Execution risk", "Phased rollout, operating discipline, and technical planning."],
    ["Crop risk", "Crop diversification, controlled-environment monitoring, and SOPs."],
    ["Buyer concentration risk", "Buyer validation across resorts, restaurants, distributors, retailers, and wellness buyers."],
    ["Energy risk", "Renewable-first planning, efficient systems, and resilience budgeting."],
    ["Water risk", "Water filtration, fertigation controls, monitoring, and redundancy."],
    ["Logistics risk", "Cold chain discipline, route planning, and delivery procedures."],
    ["Regulatory risk", "Local partnerships, permits, legal review, and compliance planning."],
    ["Financing risk", "Conservative scenario planning and staged capital deployment."],
    ["Expansion risk", "Treat replication as illustrative until the first hub is successfully executed."]
  ],
  engagementScoring: {
    weights: {
      investor_page_opened: 1,
      investor_calculator_opened: 5,
      contribution_amount_entered: 5,
      contribution_above_50000: 5,
      contribution_above_100000: 10,
      contribution_above_250000: 15,
      platform_expansion_viewed: 10,
      use_of_funds_viewed: 8,
      risk_section_viewed: 5,
      prequalification_started: 15,
      prequalification_submitted: 30,
      investor_review_requested: 40,
      non_binding_interest_submitted: 50
    },
    levels: [
      { level: "cold", min: 0, max: 14, followUp: "No immediate action or nurture follow-up." },
      { level: "warm", min: 15, max: 39, followUp: "Send investor overview." },
      { level: "qualified", min: 40, max: 79, followUp: "Request call / send investor deck." },
      { level: "high_intent", min: 80, max: 999, followUp: "Direct founder follow-up / formal review." }
    ]
  }
};

window.SYMBIOGREENS_INVESTOR_MODEL.useOfFundsTotal = window.SYMBIOGREENS_INVESTOR_MODEL.useOfFunds.reduce((sum, item) => sum + item[1], 0);
window.SYMBIOGREENS_INVESTOR_MODEL.examples = window.SYMBIOGREENS_INVESTOR_MODEL.contributionPresets.map((contribution) => {
  const shareOfRaise = Math.min(contribution / window.SYMBIOGREENS_INVESTOR_MODEL.raiseTarget, 1);
  return {
    contribution,
    shareOfRaisePercent: shareOfRaise * 100,
    indicativeInvestorEquityPercent: Math.min(shareOfRaise * window.SYMBIOGREENS_INVESTOR_MODEL.investorEquityPoolPercent, window.SYMBIOGREENS_INVESTOR_MODEL.maxInvestorEquityPercent),
    founderDevelopmentAllocationReleased: contribution * window.SYMBIOGREENS_INVESTOR_MODEL.founderDevelopmentAllocationPercent / 100,
    remainingRaise: Math.max(window.SYMBIOGREENS_INVESTOR_MODEL.raiseTarget - contribution, 0)
  };
});
