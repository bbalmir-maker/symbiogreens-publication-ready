(function () {
  window.SYMBIO_PARTNER_MODEL = {
    appName: "SymbioGreens Partner Portal",
    subtitle: "Regional Project Development Platform",
    demoFlag: "symbioPartnerPortalDemo",
    ownership: {
      partnerTypicalMin: 65,
      partnerTypicalMax: 75,
      symbioTypicalMin: 25,
      symbioTypicalMax: 35,
      symbioPreferredMax: 35,
      options: [25, 30, 35]
    },
    rainwater: {
      formula: "rainfall_mm * catchment_area_m2 * runoff_coefficient",
      example: { rainfallMm: 1200, catchmentAreaM2: 1000, runoffCoefficient: 0.8, litersYear: 960000 }
    },
    revenueScenarios: [
      { id: "pilot", label: "Pilot Hub", areaM2: 500, monthlyRevenueLow: 12000, monthlyRevenueHigh: 28000, staff: "3-5", complexity: "Moderate" },
      { id: "commercial", label: "Commercial Hub", areaM2: 2000, monthlyRevenueLow: 55000, monthlyRevenueHigh: 135000, staff: "10-18", complexity: "High" },
      { id: "hospitality", label: "Hospitality Supply Hub", areaM2: 3500, monthlyRevenueLow: 95000, monthlyRevenueHigh: 240000, staff: "18-30", complexity: "High" },
      { id: "resilience", label: "Island Food-Resilience Hub", areaM2: 5000, monthlyRevenueLow: 140000, monthlyRevenueHigh: 360000, staff: "28-45", complexity: "Advanced" }
    ],
    cropProfiles: {
      lettuce: { label: "Lettuce", yieldPerM2Cycle: 22, cyclesYear: 10, coldChain: "Medium", complexity: "Low-medium" },
      herbs: { label: "Culinary Herbs", yieldPerM2Cycle: 7, cyclesYear: 14, coldChain: "Medium", complexity: "Medium" },
      microgreens: { label: "Microgreens", yieldPerM2Cycle: 4, cyclesYear: 35, coldChain: "High", complexity: "Medium-high" },
      mushrooms: { label: "Gourmet Mushrooms", yieldPerM2Cycle: 12, cyclesYear: 8, coldChain: "High", complexity: "High" },
      flowers: { label: "Edible Flowers", yieldPerM2Cycle: 900, cyclesYear: 12, coldChain: "High", complexity: "High" },
      mixed: { label: "Mixed Crop Model", yieldPerM2Cycle: 12, cyclesYear: 12, coldChain: "Medium-high", complexity: "High" }
    },
    disclaimer: "All outputs are illustrative, non-binding, subject to local validation, financing, permits, market demand, legal structure, and execution."
  };
})();
