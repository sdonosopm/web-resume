import type { ResumeData } from './resume'

// Spanish mirror of resumeEn. Typed as ResumeData so the shape is enforced.
export const resumeEs: ResumeData = {
  personalInfo: {
    name: "Sebastián Donoso",
    title: "",
    tagline: "8+ años en gestión de portafolios, asignación de activos y relación con clientes, creando herramientas de data science para wealth management",
    location: "Santiago, Chile · Residencia en EE.UU. en trámite",
    email: "sdonosopm@gmail.com",
    phone: "+569 7620 3147",
    linkedin: "www.linkedin.com/in/sebasti%C3%A1n-donoso-p%C3%A9rez-55915931",
    summary: `Profesional con más de 8 años de experiencia en gestión de portafolios y asignación de activos. Trayectoria comprobada supervisando portafolios multiactivos para clientes UHNW, con sólida experiencia en estrategia de inversión, selección de fondos y análisis de desempeño. Altamente disciplinado, con visión estratégica y sólido conocimiento en la implementación de soluciones centralizadas con inteligencia artificial para wealth management. Bilingüe en inglés y español. Residencia estadounidense en trámite.`,
  },

  experience: [
    {
      title: "Analista Senior de Portafolios",
      company: "Banco Crédito Inversiones (BCI)",
      companyDetail: "City National Bank of Florida",
      period: "Mar 2023 — Presente",
      location: "Santiago, Chile",
      bullets: [
        "Diseñé e implementé una plataforma de inversión integral (end-to-end) con herramientas avanzadas de gestión de portafolios, rebalanceo y reportería interactiva para mejorar la transparencia y la experiencia del cliente. Ahorro de tiempo del 80%. 3er lugar entre más de 150 postulaciones en el concurso GenIA de BCI.",
        "Ejecuté y supervisé estrategias globales de inversión multiactivo, alineadas con objetivos definidos de riesgo y retorno. Alcanzamos un retorno anual total de 24,3% en el Portafolio de Sectores US vs 17,9% del S&P 500 en 2025.",
        "Co-lideré la construcción, rebalanceo y optimización de portafolios mediante asignación de activos top-down y selección de fondos. Diseñé un modelo cuantitativo de renta fija para rankear sectores y guiar el posicionamiento del portafolio.",
        "Realizo análisis en profundidad de mercados y sectores globales para respaldar decisiones de inversión y ajustes estratégicos de portafolio.",
        "Preparé y presenté revisiones de portafolio y perspectivas de mercado a equipos internos y clientes. Redacté más de 40 propuestas de inversión de alto valor en 2025.",
      ],
    },
    {
      title: "Analista Senior de Portafolios",
      company: "Moneda Patria Investments",
      companyDetail: "NASDAQ: PAX · Gestora de Activos Global de Latinoamérica",
      period: "Jun 2021 — Mar 2023",
      location: "Santiago, Chile",
      bullets: [
        "Lideré la implementación de estrategias house view de portafolio a través de las plataformas de J.P. Morgan y UBS, actuando como punto de contacto principal con contrapartes globales, gestionando más de USD $50M. El equipo, más de USD $3BN.",
        "Miembro del comité de inversiones en la definición de estrategia global y aprobación de productos multiactivo.",
        "Gestioné el diseño y desarrollo de portafolios en dimensiones operativas, estratégicas y comerciales.",
        "Desarrollé P&L a nivel de plataforma, procesos de consolidación de activos y reportería de activos alternativos.",
        "Coordiné la comunicación interna de estrategias de inversión y visiones de mercado entre equipos.",
      ],
    },
    {
      title: "Asesor de Inversiones (Banquero Privado)",
      company: "LarrainVial",
      companyDetail: "Firma líder de servicios financieros en Latinoamérica",
      period: "Oct 2019 — Jun 2021",
      location: "Santiago, Chile",
      bullets: [
        "Gestioné portafolios de inversión de clientes, cubriendo estrategias multiactivo y alternativas con un ROE de 1,5%.",
        "Ejecuté y analicé inversiones en fondos, acciones, ETFs, FX, notas estructuradas, bonos y derivados.",
        "Construí y gestioné relaciones con clientes UHNW, contribuyendo al crecimiento de USD 50MM en AUM.",
        "Brindé asesoría estratégica de inversión respaldada por análisis macroeconómico y de mercado.",
      ],
    },
    {
      title: "Asesor de Inversiones (Banquero Privado)",
      company: "EuroAmerica S.A.",
      period: "Mar 2018 — Oct 2019",
      location: "Santiago, Chile",
      bullets: [
        "Asesor de Inversiones de nivel inicial para una importante institución financiera en Chile. Construí y gestioné relaciones con clientes UHNW, contribuyendo al crecimiento de USD 10MM en AUM con un ROE de 2%.",
      ],
    },
  ],

  skills: [
    { category: "Sistemas Financieros", items: ["Bloomberg", "Pershing", "Morningstar", "Sebra", "Microsoft Office", "Google Workspace"] },
    { category: "Data & IA", items: ["Desarrollo de Software & Prompt Engineering para LLMs", "Python", "SQL", "Excel Avanzado (VBA/Modelamiento)"] },
    { category: "Desarrollo de Software", items: ["React", "TypeScript", "Next.js", "Tailwind", "Python (FastAPI/Flask/Streamlit)", "Google Apps Script", "Vercel"] },
    { category: "Expertise en Inversiones", items: ["Gestión de Portafolios", "Asignación de Activos", "Selección de Fondos", "Análisis Top-Down", "Derivados", "Estrategia Multiactivo", "Análisis de Desempeño"] },
    { category: "Cliente & Comunicación", items: ["Asesoría a Clientes UHNW", "Revisiones y Presentaciones de Portafolio", "Redacción de Propuestas de Inversión", "Coordinación con Contrapartes Globales", "Comunicación entre Equipos", "Bilingüe (Inglés y Español)"] },
  ],

  projects: [
    {
      title: "Plataforma para Multi-Family Offices",
      description: "Plataforma de reportería white-label para Multi-Family Offices y sus clientes finales. Consolida portafolios entre custodios, monitorea posiciones, calcula métricas de desempeño (TWR, IRR, Sharpe) y entrega dashboards por rol para asesores y clientes.",
      tech: ["Wealth Management", "Analítica de Portafolios", "Multi-Custodio", "White Label", "Reportería", "Compliance"],
      categories: ["web-app"],
      highlights: ["Plataforma white-label para MFOs y clientes finales", "Analítica de portafolios: TWR, IRR, Sharpe y drawdown", "Dashboards para Admins, Asesores y Clientes", "Tax-loss harvesting", "Módulos de activos reales e indexación directa", "Bilingüe (inglés y español) con datos de cliente encriptados"],
      hasDemo: false,
      demoPath: "/demos/wealthplat",
      videoId: "",
    },
    {
      title: "International Investment Platform",
      description: "Plataforma de gestión de inversiones integral (end-to-end) que consolida portafolios multiactivo integrando los datos de custodia de Pershing (el custodio de Bank of New York). Unifica gestión de portafolios, rebalanceo y reportería interactiva en una sola interfaz.",
      tech: ["Gestión de Portafolios", "Integración Pershing", "Rebalanceo", "Reportería Interactiva", "Multiactivo", "Automatización de Datos"],
      categories: ["web-app"],
      highlights: ["Integración directa con datos de custodia de Pershing (Bank of New York)", "Gestión avanzada de portafolios y rebalanceo automatizado", "Reportería interactiva para asesores y clientes", "Posiciones multiactivo consolidadas entre cuentas", "Flujo end-to-end desde la ingesta de datos hasta la reportería", "Reducción del tiempo de procesamiento manual hasta en 80%"],
      hasDemo: false,
      videoId: "",
    },
    {
      title: "Plataforma de Fondos de Inversión Chilenos",
      description: "Plataforma de monitoreo de toda la industria de fondos de inversión chilena. Obtiene valor cuota (NAV) diario desde la CMF (Comisión para el Mercado Financiero) y precios de la Bolsa Electrónica de Chile, mapeando 149 fondos con más de 790K registros de NAV (30+ años), en diez paneles analíticos que van del screening a la reportería.",
      tech: ["Analítica de Fondos", "Datos CMF", "Screening de Fondos", "Seguimiento NAV", "Peer Analysis", "Reportería"],
      categories: ["web-app"],
      highlights: ["149 fondos chilenos mapeados desde la CMF, 790K+ registros de NAV diario", "Panel de Screening para filtrar y rankear el universo de fondos", "Peer Analysis con retornos multi-período y heatmaps por subcategoría", "Análisis de premio/descuento NAV vs Bolsa Electrónica", "Reportería, Negocios y Oportunidades, y generación de órdenes", "Clasificación de activos, holdings y controles de calidad de datos"],
      hasDemo: false,
      demoPath: "/demos/moneda-nav",
      videoId: "",
    },
    {
      title: "Agente de IA Autónomo",
      description: "Agente de IA autónomo en la nube que entiende lenguaje natural por voz o chat, planifica tareas de varios pasos y las ejecuta a través de herramientas conectadas — impulsado por modelos de lenguaje (LLMs), con memoria persistente, research con fuentes citadas y confirmación con supervisión humana antes de cualquier acción que envíe, escriba, agende o gaste. Lee y actúa sobre correo, calendario, archivos y market data en vivo, y entrega briefings y alertas proactivas — un solo agente que se integra a cualquier flujo de trabajo.",
      tech: ["Agente Autónomo", "LLMs", "Voz y Chat", "Orquestación de Agentes", "Uso de Herramientas (MCP)", "Nube"],
      categories: ["web-app"],
      highlights: ["Entiende y actúa por voz o chat en lenguaje natural", "Planifica y ejecuta tareas de varios pasos entre herramientas conectadas de forma autónoma", "Cerebro basado en LLMs con memoria persistente y contexto", "Lee correo, calendario, archivos y market data en vivo; research web con citas", "Briefings y alertas proactivas: mercado, agenda y prioridades", "Confirmación con supervisión humana antes de enviar, escribir, agendar o gastar"],
      hasDemo: false,
      videoId: "",
    },
    {
      title: "Plataforma de Inteligencia Inmobiliaria",
      description: "Plataforma integral para inversión inmobiliaria que sirve tanto a inversionistas retail como institucionales: originación de deals y pipeline comercial, underwriting con modelamiento de cap rate y CAPEX, CRM de inversionistas, inventario de propiedades y memos de inversión autogenerados — todo alimentando dashboards de management.",
      tech: ["Inmobiliario", "Retail e Institucional", "Underwriting", "Pipeline de Deals", "CRM de Inversionistas", "Modelamiento de Cap Rate"],
      categories: ["web-app"],
      highlights: ["Solución dual para inversionistas retail e institucionales", "Originación de deals y seguimiento de pipeline comercial", "Motor de underwriting: cap rate, CAPEX, supuestos de equity y deuda", "CRM de inversionistas con funnel comercial", "Memos de inversión autogenerados", "Dashboards de management con métricas a nivel de portafolio"],
      hasDemo: false,
      videoId: "",
    },
    {
      title: "Pub Plat — Gestión de Cadenas de Restaurantes y Pubs",
      description: "Plataforma de operaciones centralizada para cadenas de restaurantes y pubs. Reúne rentabilidad de menú, inventario y mermas, ventas y cuadre de caja, compras, gestión de turnos y fidelización de clientes en un único dashboard multi-local con alertas inteligentes.",
      tech: ["Operaciones Gastronómicas", "Multi-Local", "Rentabilidad de Menú", "Inventario y Mermas", "POS y Ventas", "React/TypeScript"],
      categories: ["web-app"],
      highlights: ["Selector multi-local para vista por sucursal o de toda la cadena", "Rentabilidad de menú y análisis de food cost", "Control de inventario y mermas", "Ventas, cuadre de caja y compras/proveedores", "Planificación de personal y turnos", "Fidelización de clientes con dashboard de alertas inteligentes"],
      hasDemo: false,
      videoId: "",
    },
  ],

  education: [
    {
      degree: "Ingeniería Comercial",
      institution: "Universidad del Desarrollo",
      period: "Diciembre 2017",
      details: "Graduado con Honores. Programas de intercambio: Australia, Nueva Zelanda. Práctica Profesional: SODIMAC Global Sourcing China, Shanghái.",
    },
  ],

  certifications: [
    {
      name: "CAMV — Operadores y Directores de Estudio",
      detail: "Acreditación de Conocimientos en el Mercado de Valores (Comité de Acreditación de Conocimientos en el Mercado de Valores). Equivalente chileno a FINRA Series 7 y Series 86/87.",
    },
    { name: "Certificado de Python — University of Pennsylvania" },
  ],

  awards: [
    {
      place: "3er Lugar",
      category: "Análisis de Datos",
      event: "GenIA — Concurso de IA Generativa de BCI",
      project: "International Investment Platform",
      scale: "150+ postulaciones",
      detail: "Seleccionado entre más de 150 postulaciones en el concurso GenIA (IA Generativa) de BCI, destacando por su impacto e innovación. 3er lugar en la categoría Análisis de Datos por la International Investment Platform, que integra los datos de custodia de Pershing (el custodio de Bank of New York).",
    },
  ],

  disciplines: [
    {
      label: "Spartan Race — Trifecta",
      icon: "spartan",
      races: [
        { name: "Spartan Sprint", date: "2018", location: "Santiago, Chile", distance: "7 km / 23 obstáculos" },
        { name: "Spartan Super", date: "2019", location: "Santiago, Chile", distance: "10 km / 26 obstáculos" },
        { name: "Spartan Beast", date: "2022", location: "Santiago, Chile", distance: "21 km / 30 obstáculos" },
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
      label: "Triatlones",
      icon: "triathlon",
      races: [
        { name: "TOPMAN Triathlon Papudo", date: "Abr 2024", location: "Papudo, Chile", distance: "0,8 km nado · 32 km bici · 8 km trote" },
        { name: "Scotiabank Triathlon Zapallar", date: "Dic 2024", location: "Zapallar, Chile", distance: "1,6 km nado · 40 km bici · 10 km trote" },
      ],
    },
    {
      label: "Running",
      icon: "running",
      races: [
        { name: "Media Maratón Viña del Mar", date: "Abr 2024", location: "Viña del Mar, Chile", distance: "21 km" },
        { name: "Maratón de Santiago", date: "May 2025", location: "Santiago, Chile", distance: "42 km" },
      ],
    },
  ],

  otherInterests: [
    { label: "Tenis", icon: "tennis" },
    { label: "Piano y Guitarra", icon: "piano" },
    { label: "Surf", icon: "surfing" },
  ],
}
