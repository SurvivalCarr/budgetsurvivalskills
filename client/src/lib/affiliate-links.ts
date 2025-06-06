export interface AffiliateLink {
  name: string;
  description: string;
  url: string;
  category: 'banking' | 'investing' | 'insurance' | 'comparison' | 'budgeting';
  featured: boolean;
  logo?: string;
}

export interface RegionAffiliates {
  banking: AffiliateLink[];
  investing: AffiliateLink[];
  insurance: AffiliateLink[];
  comparison: AffiliateLink[];
  budgeting: AffiliateLink[];
}

export const affiliateLinks: Record<string, RegionAffiliates> = {
  US: {
    banking: [
      {
        name: "Chase Bank",
        description: "America's largest bank with comprehensive checking and savings accounts",
        url: "https://www.chase.com",
        category: "banking",
        featured: true
      },
      {
        name: "Capital One",
        description: "High-yield savings accounts and innovative banking solutions",
        url: "https://www.capitalone.com",
        category: "banking",
        featured: true
      }
    ],
    investing: [
      {
        name: "Robinhood",
        description: "Commission-free stock trading and investing platform",
        url: "https://robinhood.com",
        category: "investing",
        featured: true
      }
    ],
    insurance: [
      {
        name: "Progressive",
        description: "Auto, home, and life insurance with competitive rates",
        url: "https://www.progressive.com",
        category: "insurance",
        featured: false
      }
    ],
    comparison: [
      {
        name: "Credit Karma",
        description: "Free credit scores, reports, and financial product comparisons",
        url: "https://www.creditkarma.com",
        category: "comparison",
        featured: true
      }
    ],
    budgeting: [
      {
        name: "Mint",
        description: "Free budgeting and expense tracking with bank integration",
        url: "https://mint.intuit.com",
        category: "budgeting",
        featured: true
      },
      {
        name: "Replit",
        description: "Learn to code for free and build financial tools",
        url: "https://replit.com/refer/survivalcarr",
        category: "budgeting",
        featured: true
      }
    ]
  },
  UK: {
    banking: [
      {
        name: "Monzo",
        description: "Digital bank with smart budgeting tools and instant notifications",
        url: "https://monzo.com",
        category: "banking",
        featured: true
      },
      {
        name: "Starling Bank",
        description: "Award-winning digital bank with built-in savings goals",
        url: "https://www.starlingbank.com",
        category: "banking",
        featured: true
      },
      {
        name: "Nationwide",
        description: "UK's largest building society with competitive savings rates",
        url: "https://www.nationwide.co.uk",
        category: "banking",
        featured: false
      }
    ],
    investing: [
      {
        name: "Hargreaves Lansdown",
        description: "UK's leading investment platform with ISAs and SIPPs",
        url: "https://www.hl.co.uk",
        category: "investing",
        featured: true
      }
    ],
    insurance: [
      {
        name: "Aviva",
        description: "Comprehensive insurance solutions for home, car, and life",
        url: "https://www.aviva.co.uk",
        category: "insurance",
        featured: false
      }
    ],
    comparison: [
      {
        name: "Compare the Market",
        description: "Compare insurance, energy, broadband, and financial products",
        url: "https://www.comparethemarket.com",
        category: "comparison",
        featured: true
      }
    ],
    budgeting: [
      {
        name: "Smarty Mobile",
        description: "Flexible mobile plans to reduce your monthly expenses",
        url: "https://i.smarty.co.uk/EotHmHx",
        category: "budgeting",
        featured: true
      },
      {
        name: "Replit",
        description: "Learn to code for free and build financial tools",
        url: "https://replit.com/refer/survivalcarr",
        category: "budgeting",
        featured: true
      }
    ]
  },
  AU: {
    banking: [
      {
        name: "CommBank",
        description: "Australia's leading bank with NetBank and mobile banking",
        url: "https://www.commbank.com.au",
        category: "banking",
        featured: true
      },
      {
        name: "ING Direct",
        description: "High interest savings accounts with no monthly fees",
        url: "https://www.ing.com.au",
        category: "banking",
        featured: true
      }
    ],
    investing: [
      {
        name: "Stake",
        description: "Commission-free investing in Australian and US markets",
        url: "https://stake.com.au",
        category: "investing",
        featured: true
      }
    ],
    insurance: [
      {
        name: "RACV",
        description: "Comprehensive insurance and roadside assistance",
        url: "https://www.racv.com.au",
        category: "insurance",
        featured: false
      }
    ],
    comparison: [
      {
        name: "Finder.com.au",
        description: "Compare credit cards, home loans, insurance, and more",
        url: "https://www.finder.com.au",
        category: "comparison",
        featured: true
      }
    ],
    budgeting: [
      {
        name: "Pocketbook",
        description: "Australian budgeting app with bank account integration",
        url: "https://getpocketbook.com",
        category: "budgeting",
        featured: true
      },
      {
        name: "Replit",
        description: "Learn to code for free and build financial tools",
        url: "https://replit.com/refer/survivalcarr",
        category: "budgeting",
        featured: true
      }
    ]
  },
  CA: {
    banking: [
      {
        name: "Tangerine",
        description: "No-fee banking with high-interest savings accounts",
        url: "https://www.tangerine.ca",
        category: "banking",
        featured: true
      },
      {
        name: "RBC",
        description: "Royal Bank of Canada with comprehensive banking services",
        url: "https://www.rbc.com",
        category: "banking",
        featured: true
      },
      {
        name: "TD Bank",
        description: "Canada's trusted bank with innovative digital services",
        url: "https://www.td.com",
        category: "banking",
        featured: false
      }
    ],
    investing: [
      {
        name: "Questrade",
        description: "Self-directed investing with low-cost ETFs and stocks",
        url: "https://www.questrade.com",
        category: "investing",
        featured: true
      }
    ],
    insurance: [
      {
        name: "Sun Life",
        description: "Life, health, and disability insurance solutions",
        url: "https://www.sunlife.ca",
        category: "insurance",
        featured: false
      }
    ],
    comparison: [
      {
        name: "Ratehub.ca",
        description: "Compare mortgages, insurance, and financial products",
        url: "https://www.ratehub.ca",
        category: "comparison",
        featured: true
      }
    ],
    budgeting: [
      {
        name: "Mint",
        description: "Free budgeting and expense tracking (Canadian version)",
        url: "https://mint.intuit.com",
        category: "budgeting",
        featured: true
      },
      {
        name: "Replit",
        description: "Learn to code for free and build financial tools",
        url: "https://replit.com/refer/survivalcarr",
        category: "budgeting",
        featured: true
      }
    ]
  }
};

export function getAffiliatesByRegion(region: string): RegionAffiliates {
  const regionKey = region.toUpperCase();
  return affiliateLinks[regionKey] || affiliateLinks.US;
}

export function getFeaturedAffiliates(region: string): AffiliateLink[] {
  const regionAffiliates = getAffiliatesByRegion(region);
  const allAffiliates = [
    ...regionAffiliates.banking,
    ...regionAffiliates.investing,
    ...regionAffiliates.insurance,
    ...regionAffiliates.comparison,
    ...regionAffiliates.budgeting
  ];
  return allAffiliates.filter(affiliate => affiliate.featured);
}

export function getAffiliatesByCategory(region: string, category: string): AffiliateLink[] {
  const regionAffiliates = getAffiliatesByRegion(region);
  return regionAffiliates[category as keyof RegionAffiliates] || [];
}