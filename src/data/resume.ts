export const personalInfo = {
  name: "Sebastián Donoso",
  title: "",
  tagline: "8+ years in portfolio management, asset allocation & client relationships, building data science tools for wealth management",
  location: "Santiago, Chile · U.S. Residency in process",
  email: "sdonosopm@gmail.com",
  phone: "+569 7620 3147",
  linkedin: "www.linkedin.com/in/sebasti%C3%A1n-donoso-p%C3%A9rez-55915931",

  summary: `Professional with 8+ years of experience in portfolio management and asset allocation. Proven track record overseeing multi-asset portfolios for UHNW clients, with strong expertise in investment strategy, fund selection, and performance analysis. Highly analytical and disciplined, with a commercial acumen and strong knowledge in AI consulting and implementation for wealth management. Bilingual in English and Spanish. U.S. residency in process.`,
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
      "Designed and implemented an end-to-end investment platform featuring advanced portfolio management, rebalancing, and interactive reporting tools to enhance transparency and client experience. Time-savings by 80%. Awarded 3rd place among 150+ applications in the GenIA BCI contest.",
      "Executed and oversaw global multi-asset investment portfolio strategies, aligned with defined risk and return objectives. Achieved total annual return of 24.3% in US Sectors Portfolio vs 17.9% S&P 500 in 2025.",
      "Co-led portfolio construction, rebalancing and optimization through top-down asset allocation and fund selection. Designed a quantitative fixed-income model to rank sectors and guide portfolio positioning.",
      "Conduct in-depth global markets and sectors analysis to support investment decisions and strategic portfolio adjustments.",
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
      "Led the implementation of house view portfolio strategies through J.P. Morgan and UBS platforms, acting as primary point of contact with global counterparts, managing over USD $50M. The team, over USD $3BN.",
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
      "Built and managed relationships with UHNW clients, contributing to the growth of USD 50MM in AUM.",
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
    items: ["Bloomberg", "Pershing", "Morningstar", "Sebra", "Microsoft Office", "Google Workspace"],
  },
  {
    category: "Data & AI",
    items: ["Software Development & Prompt Engineering for LLMs", "Python", "SQL", "Advanced Excel (VBA/Modeling)"],
  },
  {
    category: "Software Dev",
    items: ["React", "TypeScript", "Next.js", "Tailwind", "Python (FastAPI/Flask/Streamlit)", "Google Apps Script", "Vercel"],
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

export type ProjectCategory = "web-app" | "research" | "data"

export interface Project {
  title: string
  description: string
  tech: string[]
  categories: ProjectCategory[]
  highlights: string[]
  hasDemo: boolean
  demoPath?: string
  // YouTube video ID (the part after v= in the URL). Leave empty until you upload.
  // Example: for https://youtu.be/dQw4w9WgXcQ -> videoId: "dQw4w9WgXcQ"
  videoId?: string
}

export const projects: Project[] = [
  {
    title: "Multi-Family Office Platform",
    description: "White-label reporting platform for Multi-Family Offices and their end clients. Consolidates portfolios across custodians, tracks holdings, calculates performance metrics (TWR, IRR, Sharpe), and delivers role-based dashboards for advisors and clients.",
    tech: ["Wealth Management", "Portfolio Analytics", "Multi-Custodian", "White Label", "Reporting", "Compliance"],
    categories: ["web-app"],
    highlights: ["White-label platform for MFOs and end clients", "Portfolio analytics: TWR, IRR, Sharpe & drawdown", "Dashboards for Admins, Advisors & Clients", "Tax-loss harvesting", "Real assets & direct indexing modules", "Bilingual (English & Spanish) with encrypted client data"],
    hasDemo: false,
    demoPath: "/demos/wealthplat",
    videoId: "",
  },
  {
    title: "International Investment Platform",
    description: "End-to-end investment management platform that consolidates multi-asset portfolios by integrating custody data from Pershing (the custodian of Bank of New York). Unifies portfolio management, rebalancing, and interactive reporting into a single interface.",
    tech: ["Portfolio Management", "Pershing Integration", "Rebalancing", "Interactive Reporting", "Multi-Asset", "Data Automation"],
    categories: ["web-app"],
    highlights: ["Direct integration with Pershing custody data (Bank of New York)", "Advanced portfolio management & automated rebalancing", "Interactive reporting for advisors and clients", "Consolidated multi-asset positions across accounts", "End-to-end workflow from data ingestion to reporting", "Reduced manual processing time by up to 80%"],
    hasDemo: false,
    videoId: "",
  },
  {
    title: "Chilean Investment Fund Platform",
    description: "Monitoring platform for the entire Chilean investment fund industry. Sources daily NAV from CMF (Comisión para el Mercado Financiero) and exchange prices from Bolsa Electrónica de Chile, mapping 149 funds with 790K+ NAV records spanning 30+ years, across ten analytics panels from screening to reporting.",
    tech: ["Fund Analytics", "CMF Data", "Fund Screening", "NAV Tracking", "Peer Analysis", "Reporting"],
    categories: ["web-app"],
    highlights: ["149 Chilean funds mapped from CMF, 790K+ daily NAV records", "Fund Screening panel to filter & rank the fund universe", "Peer Analysis with multi-period returns & subcategory heatmaps", "NAV vs Bolsa Electrónica premium/discount analysis", "Reports, Deals & Opportunities, and order generation", "Asset classification, holdings & data-quality controls"],
    hasDemo: false,
    demoPath: "/demos/moneda-nav",
    videoId: "",
  },
  {
    title: "Autonomous AI Agent",
    description: "Cloud-based autonomous AI agent that understands natural language by voice or chat, plans multi-step tasks, and executes them across connected tools — powered by large language models, with persistent memory, cited research, and a human-in-the-loop confirmation gate before any action that sends, writes, schedules or spends. It reads and acts on email, calendar, files and live market data, and delivers proactive briefings and alerts — a single agent that plugs into any workflow.",
    tech: ["Autonomous Agent", "LLMs", "Voice & Chat", "Agent Orchestration", "Tool Use (MCP)", "Cloud"],
    categories: ["web-app"],
    highlights: ["Understands and acts by voice or chat in natural language", "Plans and runs multi-step tasks across connected tools autonomously", "LLM-powered brain with persistent memory & context", "Reads email, calendar, files & live market data; cited web research", "Proactive briefings and alerts: market, agenda & priorities", "Human-in-the-loop confirmation before it sends, writes, schedules or spends"],
    hasDemo: false,
    videoId: "",
  },
  {
    title: "Real Estate Intelligence Platform",
    description: "All-in-one platform for real estate investment serving both retail and institutional investors: deal sourcing and commercial pipeline, underwriting with cap-rate and CAPEX modeling, investor CRM, property inventory, and auto-generated investment memos — all feeding management dashboards.",
    tech: ["Real Estate", "Retail & Institutional", "Underwriting", "Deal Pipeline", "Investor CRM", "Cap Rate Modeling"],
    categories: ["web-app"],
    highlights: ["Dual solution for retail and institutional investors", "Deal sourcing & commercial pipeline tracking", "Underwriting engine: cap rate, CAPEX, equity & debt assumptions", "Investor CRM with commercial funnel", "Auto-generated investment memos", "Management dashboards with portfolio-level metrics"],
    hasDemo: false,
    videoId: "",
  },
  {
    title: "Pub Plat — Restaurant & Pub Chain Management",
    description: "Centralized operations platform for restaurant and pub chains. Brings menu profitability, inventory & waste, sales and cash reconciliation, purchasing, staff scheduling, and customer loyalty into a single multi-location dashboard with intelligent alerts.",
    tech: ["Restaurant Ops", "Multi-Location", "Menu Profitability", "Inventory & Waste", "POS & Sales", "React/TypeScript"],
    categories: ["web-app"],
    highlights: ["Multi-venue switcher for chain-wide or per-location view", "Menu profitability & food-cost analysis", "Inventory & waste (mermas) control", "Sales, cash reconciliation & purchasing/suppliers", "Staff & shift planning", "Customer loyalty with an intelligent alerts dashboard"],
    hasDemo: false,
    videoId: "",
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

export interface AwardItem {
  place: string
  category: string
  event: string
  project?: string
  scale?: string
  detail?: string
}

// Website-only recognition (not included in the downloadable resume PDF).
export const awards: AwardItem[] = [
  {
    place: "3rd Place",
    category: "Data Analysis",
    event: "GenIA — BCI Generative AI Contest",
    project: "International Investment Platform",
    scale: "150+ applications",
    detail: "Selected among 150+ applications in BCI's GenIA (Generative AI) contest, standing out for impact and innovation. Awarded 3rd place in the Data Analysis category for the International Investment Platform, which integrates custody data from Pershing (the custodian of Bank of New York).",
  },
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

// Aggregated English resume data. The Spanish mirror in resume.es.ts is typed
// as `ResumeData`, so TypeScript enforces an identical shape across languages.
export const resumeEn = {
  personalInfo,
  experience,
  skills,
  projects,
  education,
  certifications,
  awards,
  disciplines,
  otherInterests,
}

export type ResumeData = typeof resumeEn
