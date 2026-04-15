export const personalInfo = {
  name: "Sebastián Donoso",
  title: "Senior Investment Professional",
  tagline: "8+ years in portfolio management & asset allocation, building data-driven tools for wealth management",
  location: "Santiago, Chile · U.S. Residency in process",
  email: "sdonosopm@gmail.com",
  phone: "+569 7620 3147",
  linkedin: "www.linkedin.com/in/sebasti%C3%A1n-donoso-p%C3%A9rez-55915931",

  summary: `Senior investment professional with 8+ years of experience in portfolio management and asset allocation. Proven track record overseeing multi-asset portfolios for UHNW clients, with strong expertise in investment strategy, fund selection, and performance analysis. Highly analytical and disciplined, with a commercial acumen and strong interest in artificial intelligence implementation for wealth management. Bilingual in English and Spanish. U.S. residency in process.`,
}

export interface Experience {
  title: string
  company: string
  companyDetail?: string
  period: string
  location: string
  bullets: string[]
}

export const experience: Experience[] = [
  {
    title: "Senior Portfolio Analyst",
    company: "Banco Crédito Inversiones (BCI)",
    companyDetail: "City National Bank of Florida",
    period: "Mar 2023 — Present",
    location: "Santiago, Chile",
    bullets: [
      "Executed and oversaw global multi-asset investment portfolio strategies, aligned with defined risk and return objectives. Achieved total annual return of 24.3% in US Sectors Portfolio vs 17.9% S&P 500 in 2025.",
      "Co-led portfolio construction, rebalancing and optimization through top-down asset allocation and fund selection. Designed a quantitative fixed-income model to rank sectors and guide portfolio positioning.",
      "Conduct in-depth global markets and sectors analysis to support investment decisions and strategic portfolio adjustments.",
      "Designed and implemented internal reporting and rebalancing tools, improving efficiency, transparency, and decision-making. Automated tasks, reducing execution time by 50–70%.",
      "Prepared and presented portfolio reviews and market outlooks to internal teams and clients. Authored over 40 high-value investment proposals in 2025.",
    ],
  },
  {
    title: "Senior Portfolio Analyst",
    company: "Moneda Patria Investments",
    companyDetail: "NASDAQ: PAX · Global Latin America Asset Manager",
    period: "Jun 2021 — Mar 2023",
    location: "Santiago, Chile",
    bullets: [
      "Led the implementation of house view portfolio strategies through J.P. Morgan and UBS platforms, acting as primary point of contact with global counterparts, managing over USD $50M. The team, over USD $2BN.",
      "Member of the investment committee on global strategy definition, and multi-asset product approval.",
      "Managed the design and development of portfolios across operational, strategic, and commercial dimensions.",
      "Developed platform-level P&L, asset consolidation processes, and alternative assets reporting.",
      "Coordinated internal communication of investment strategies and market views across teams.",
    ],
  },
  {
    title: "Investment Advisor (Private Banker)",
    company: "LarrainVial",
    companyDetail: "Leading financial services firm in Latin America",
    period: "Oct 2019 — Jun 2021",
    location: "Santiago, Chile",
    bullets: [
      "Managed client investment portfolios, covering multi-asset and alternative strategies with a ROE of 1.5%.",
      "Executed and analyzed investments in funds, equities, ETFs, FX, structured notes, bonds, and derivatives.",
      "Built and managed relationships with UHNW clients, contributing to the growth of USD 60MM in AUM.",
      "Provided strategic investment advice supported by macroeconomic and market analysis.",
    ],
  },
  {
    title: "Investment Advisor (Private Banker)",
    company: "EuroAmerica S.A.",
    period: "Mar 2018 — Oct 2019",
    location: "Santiago, Chile",
    bullets: [
      "Entry level Investment Advisor for an important financial institution in Chile. Built and managed relationships with UHNW clients, contributing to the growth of USD 10MM in AUM with a ROE of 2%.",
    ],
  },
]

export interface Skill {
  category: string
  items: string[]
}

export const skills: Skill[] = [
  {
    category: "Financial Systems",
    items: ["Bloomberg", "Bloomberg BQuant", "Pershing", "Morningstar", "Sebra", "J.P. Morgan Platform", "UBS Platform", "Microsoft Office (Advanced)", "Google Workspace (Advanced)"],
  },
  {
    category: "Data & AI",
    items: ["Python (Advanced)", "SQL", "Advanced Excel (VBA/Modeling)", "Prompt Engineering", "LLMs & Software Development"],
  },
  {
    category: "Programming & Frameworks",
    items: ["Python", "React", "TypeScript", "Tailwind CSS", "Next.js", "Vite", "Flask", "FastAPI", "Streamlit", "VS Code", "Google Apps Script", "Google Colab"],
  },
  {
    category: "Investment Expertise",
    items: ["Portfolio Management", "Asset Allocation", "Fund Selection", "Top-Down Analysis", "Derivatives", "Multi-Asset Strategy", "Performance Analysis"],
  },
  {
    category: "Client & Communication",
    items: ["UHNW Client Advisory", "Portfolio Reviews & Presentations", "Investment Proposal Writing", "Global Counterpart Coordination", "Cross-Team Communication", "Bilingual (English & Spanish)"],
  },
]

export interface Project {
  title: string
  description: string
  tech: string[]
  category: "web-app" | "research" | "data"
  highlights: string[]
  hasDemo: boolean
  demoPath?: string
  // YouTube video ID (the part after v= in the URL). Leave empty until you upload.
  // Example: for https://youtu.be/dQw4w9WgXcQ -> videoId: "dQw4w9WgXcQ"
  videoId?: string
}

export const projects: Project[] = [
  {
    title: "WealthPlat — Multi-Family Office Platform",
    description: "White-label reporting platform for Multi-Family Offices and their end clients. Consolidates portfolios across custodians, tracks holdings, calculates performance metrics (TWR, IRR, Sharpe), and delivers role-based dashboards for advisors and clients.",
    tech: ["React 18", "TypeScript", "Flask", "PostgreSQL", "Tailwind CSS", "shadcn/ui", "Recharts", "Docker"],
    category: "web-app",
    highlights: ["White-label platform for MFOs and end clients", "Portfolio analytics: TWR, IRR, Sharpe & drawdown", "Dashboards for Admins, Advisors & Clients", "Rebalancing engine & tax-loss harvesting", "Real assets, structured notes & direct indexing modules", "Bilingual (English & Spanish) with encrypted client data"],
    hasDemo: true,
    demoPath: "/demos/wealthplat",
    videoId: "", // TODO: Paste YouTube video ID here once uploaded
  },
  {
    title: "Chilean Investment Funds Universe",
    description: "Monitoring platform for the Chilean investment fund market. Sources daily NAV data from CMF (Comisión para el Mercado Financiero) and exchange prices from Bolsa Electrónica de Chile, covering 72 funds with 159K+ records and professional analytics dashboards.",
    tech: ["React 19", "TypeScript", "FastAPI", "SQLite", "Tailwind CSS", "Recharts", "Radix UI"],
    category: "web-app",
    highlights: ["72 funds tracked with daily NAV data from CMF", "NAV vs Bolsa Electrónica premium/discount analysis", "Bollinger bands, moving averages & trading signals", "Fund comparison with base-100 normalization", "Order generation with limit prices & email drafts", "159K+ historical records across all funds"],
    hasDemo: true,
    demoPath: "/demos/moneda-nav",
    videoId: "", // TODO: Paste YouTube video ID here once uploaded
  },
  {
    title: "Chilean Fixed Income Index",
    description: "Replicable fixed-income indices for the Chilean bond market — sovereign (BTP, BTU) and corporate (AAA to BBB) — constructed entirely with public data from Banco Central, CMF, and Bolsa de Santiago.",
    tech: ["React", "TypeScript", "Recharts", "Python", "Banco Central API", "CMF Data"],
    category: "research",
    highlights: ["12 indices covering sovereign & corporate bonds by rating", "Transparent pricing methodology with public data", "10+ years of daily data from Banco Central & CMF", "Yield curve construction & duration analysis", "Drawdown tracking & risk metrics by credit rating", "Benchmark tool for Chilean fixed income portfolios"],
    hasDemo: true,
    demoPath: "/demos/fixed-income",
    videoId: "", // TODO: Paste YouTube video ID here once uploaded
  },
]

export interface Education {
  degree: string
  institution: string
  period: string
  details?: string
}

export const education: Education[] = [
  {
    degree: "Business Administration",
    institution: "Universidad del Desarrollo",
    period: "December 2017",
    details: "Graduated with Honors. Exchange student programs: Australia, New Zealand. Professional Internship: SODIMAC Global Sourcing China, Shanghai.",
  },
]

export interface Certification {
  name: string
  detail?: string
}

export const certifications: Certification[] = [
  {
    name: "CAMV — Operators & Research Directors",
    detail: "Securities Market Knowledge Accreditation (Comité de Acreditación de Conocimientos en el Mercado de Valores). Chile's equivalent to FINRA Series 7 & Series 86/87.",
  },

  { name: "Python Certificate — University of Pennsylvania" },
]

export interface Race {
  name: string
  date: string
  location: string
  distance?: string
}

export interface Discipline {
  label: string
  icon: "spartan" | "mtb" | "triathlon" | "running" | "tennis" | "piano" | "surfing"
  races: Race[]
}

export interface Interest {
  label: string
  detail?: string
  icon: "marathon" | "triathlon" | "enduro" | "tennis" | "piano" | "surfing"
}

// Endurance sports signal discipline, goal-setting, and grit —
// highly valued in US finance industry hiring.
export const disciplines: Discipline[] = [
  {
    label: "Spartan Race — Trifecta",
    icon: "spartan",
    races: [
      { name: "Spartan Sprint", date: "2018", location: "Santiago, Chile", distance: "7 km / 23 obstacles" },
      { name: "Spartan Super", date: "2019", location: "Santiago, Chile", distance: "10 km / 26 obstacles" },
      { name: "Spartan Beast", date: "2022", location: "Santiago, Chile", distance: "21 km / 30 obstacles" },
    ],
  },
  {
    label: "MTB Enduro",
    icon: "mtb",
    races: [
      { name: "BICE Enduro Farellones", date: "Oct 2021", location: "Farellones, Chile" },
      { name: "BICE Enduro La Parva", date: "Nov 2021", location: "La Parva, Chile" },
      { name: "Citroën Enduro Lo Barnechea", date: "Sep 2023", location: "Lo Barnechea, Chile" },
    ],
  },
  {
    label: "Triathlons",
    icon: "triathlon",
    races: [
      { name: "TOPMAN Triathlon Papudo", date: "Apr 2024", location: "Papudo, Chile", distance: "0.8 km swim · 32 km bike · 8 km run" },
      { name: "Scotiabank Triathlon Zapallar", date: "Dec 2024", location: "Zapallar, Chile", distance: "1.6 km swim · 40 km bike · 10 km run" },
    ],
  },
  {
    label: "Running",
    icon: "running",
    races: [
      { name: "Half Marathon Viña del Mar", date: "Apr 2024", location: "Viña del Mar, Chile", distance: "21 km" },
      { name: "Santiago Marathon", date: "May 2025", location: "Santiago, Chile", distance: "42 km" },
    ],
  },
]

export const otherInterests: Interest[] = [
  { label: "Tennis", icon: "tennis" },
  { label: "Piano & Guitar", icon: "piano" },
  { label: "Surfing", icon: "surfing" },
]
