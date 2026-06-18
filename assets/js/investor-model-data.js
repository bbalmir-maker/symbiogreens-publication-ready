window.SYMBIOGREENS_INVESTOR_MODEL = {
  raiseTarget: 2200000,
  maxInvestorEquityPercent: 30,
  founderDevelopmentAllocation: 220000,
  founderDevelopmentAllocationPercent: 10,
  currency: 'USD',
  examples: [100000, 200000, 250000, 500000, 1000000, 2200000].map((contribution) => {
    const contributionShare = contribution / 2200000;
    return {
      contribution,
      shareOfRaisePercent: contributionShare * 100,
      indicativeInvestorEquityPercent: contributionShare * 30,
      founderDevelopmentAllocationReleased: contributionShare * 220000
    };
  }),
  capex: [
    ['Land / site control / legal / closing / lease-option reserve', 200000],
    ['Greenhouse structures, grading, drainage, water reservoirs and site prep', 220000],
    ['Hydroponic towers, NFT, DWC and Dutch Bucket infrastructure', 230000],
    ['Microgreens facility and controlled racks', 90000],
    ['Mushroom production rooms and environmental controls', 110000],
    ['Specialty substrate crops and medicinal / wellness plant systems', 100000],
    ['Solar-led energy, battery support and electrical resilience', 150000],
    ['Water filtration, fertigation, monitoring, pH/EC systems and automation', 120000],
    ['Cold storage, packing line, labeling and quality-control systems', 120000],
    ['Drying, value-added processing and packaging setup', 75000],
    ['Refrigerated delivery truck and logistics vehicles', 120000],
    ['Staff facilities, manager office, secure storage and operations control', 90000],
    ['Buyer activation, chef sampling, marketing, website/platform and sales launch', 75000],
    ['Professional services, permits, legal, accounting and compliance', 65000],
    ['Working capital reserve', 120000],
    ['Contingency', 95000],
    ['Founder development / platform formation allocation', 220000]
  ]
};
window.SYMBIOGREENS_INVESTOR_MODEL.capexTotal = window.SYMBIOGREENS_INVESTOR_MODEL.capex.reduce((sum, item) => sum + item[1], 0);
