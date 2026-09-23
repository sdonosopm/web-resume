import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { resumeEn, type ResumeData } from './data/resume'
import { resumeEs } from './data/resume.es'

export type Lang = 'en' | 'es'

// ---- UI (chrome) strings ------------------------------------------------
const enStrings = {
  nav: { about: 'About', experience: 'Experience', skills: 'Skills', projects: 'Projects', education: 'Education', beyondWork: 'Beyond Work', contact: 'Contact' },
  common: { resumePdf: 'Resume PDF', backToTop: 'Back to top' },
  hero: { jumpToSection: 'Jump to section', viewProjects: 'View Projects', getInTouch: 'Get in Touch' },
  about: {
    kicker: 'About',
    title: 'Profile Summary',
    highlights: [
      { label: 'Investment Analysis', desc: 'Portfolio management & Top-Down research' },
      { label: 'Market Research', desc: 'Equity, Fixed Income & Macro analysis' },
      { label: 'Tech & AI Development', desc: 'Full-stack apps, data pipelines & LLM integration' },
      { label: 'Client Relationship', desc: 'UHNW advisory, portfolio reviews & strategic communication' },
    ],
  },
  experience: { kicker: 'Experience', title: 'Professional Background' },
  skills: { kicker: 'Skills', title: 'Technical & Domain Expertise' },
  projects: {
    kicker: 'Portfolio',
    title: 'Featured Projects',
    intro: "A selection of platforms I've built across finance, real estate, and other industries.",
    filterAll: 'All Projects',
    catWebApp: 'Web Application',
    catResearch: 'Research',
    catData: 'Data Analysis',
    demoSoon: 'Demo Soon',
    videoDemo: 'Video Demo',
    watchDemo: 'Watch Demo',
  },
  education: { kicker: 'Education, Certifications & Awards', title: 'Academic Background', eduSubhead: 'Education', certsSubhead: 'Certifications', awardsTitle: 'Awards & Recognition', projectLabel: 'Project:' },
  interests: {
    kicker: 'Beyond Work',
    title: 'Endurance & Interests',
    event: 'event',
    events: 'events',
  },
  contact: {
    kicker: 'Contact',
    title: "Let's Connect",
    intro: "Interested in discussing finance, technology, or potential collaboration? I'd love to hear from you.",
    emailLabel: 'Email',
    phoneLabel: 'Phone',
    linkedinLabel: 'LinkedIn',
    profileValue: 'Profile',
    sendMessage: 'Send a Message',
    yourName: 'Your Name',
    yourEmail: 'Your Email',
    subjectLabel: 'Subject',
    messageLabel: 'Message',
    sendBtn: 'Send via Email Client',
    formNote: 'This will open your default email client with the message pre-filled.',
    defaultSubject: 'Contact from Portfolio',
    namePh: 'John Smith',
    emailPh: 'john@example.com',
    subjectPh: 'Opportunity / Collaboration / Question',
    messagePh: "Hi Sebastián, I'd like to discuss...",
  },
  footer: { rights: 'All rights reserved.' },
}

export type UIStrings = typeof enStrings

const esStrings: UIStrings = {
  nav: { about: 'Perfil', experience: 'Experiencia', skills: 'Habilidades', projects: 'Proyectos', education: 'Educación', beyondWork: 'Más allá del trabajo', contact: 'Contacto' },
  common: { resumePdf: 'CV PDF', backToTop: 'Volver arriba' },
  hero: { jumpToSection: 'Ir a la sección', viewProjects: 'Ver Proyectos', getInTouch: 'Contáctame' },
  about: {
    kicker: 'Perfil',
    title: 'Resumen Profesional',
    highlights: [
      { label: 'Análisis de Inversiones', desc: 'Gestión de portafolios y análisis Top-Down' },
      { label: 'Research de Mercado', desc: 'Análisis de renta variable, renta fija y macro' },
      { label: 'Desarrollo Tech & IA', desc: 'Apps full-stack, pipelines de datos e integración de LLMs' },
      { label: 'Relación con Clientes', desc: 'Asesoría UHNW, revisiones de portafolio y comunicación estratégica' },
    ],
  },
  experience: { kicker: 'Experiencia', title: 'Trayectoria Profesional' },
  skills: { kicker: 'Habilidades', title: 'Expertise Técnico y de Dominio' },
  projects: {
    kicker: 'Portafolio',
    title: 'Proyectos Destacados',
    intro: 'Una selección de plataformas que he construido en finanzas, inmobiliario y otras industrias.',
    filterAll: 'Todos los Proyectos',
    catWebApp: 'Aplicación Web',
    catResearch: 'Investigación',
    catData: 'Análisis de Datos',
    demoSoon: 'Demo Pronto',
    videoDemo: 'Demo en Video',
    watchDemo: 'Ver Demo',
  },
  education: { kicker: 'Educación, Certificaciones y Premios', title: 'Formación Académica', eduSubhead: 'Educación', certsSubhead: 'Certificaciones', awardsTitle: 'Premios y Reconocimientos', projectLabel: 'Proyecto:' },
  interests: {
    kicker: 'Más allá del trabajo',
    title: 'Deporte e Intereses',
    event: 'evento',
    events: 'eventos',
  },
  contact: {
    kicker: 'Contacto',
    title: 'Conectemos',
    intro: '¿Te interesa conversar sobre finanzas, tecnología o una posible colaboración? Me encantaría saber de ti.',
    emailLabel: 'Email',
    phoneLabel: 'Teléfono',
    linkedinLabel: 'LinkedIn',
    profileValue: 'Perfil',
    sendMessage: 'Enviar un Mensaje',
    yourName: 'Tu Nombre',
    yourEmail: 'Tu Email',
    subjectLabel: 'Asunto',
    messageLabel: 'Mensaje',
    sendBtn: 'Enviar por Cliente de Correo',
    formNote: 'Esto abrirá tu cliente de correo predeterminado con el mensaje ya escrito.',
    defaultSubject: 'Contacto desde el Portafolio',
    namePh: 'Juan Pérez',
    emailPh: 'juan@ejemplo.com',
    subjectPh: 'Oportunidad / Colaboración / Consulta',
    messagePh: 'Hola Sebastián, me gustaría conversar sobre...',
  },
  footer: { rights: 'Todos los derechos reservados.' },
}

const strings: Record<Lang, UIStrings> = { en: enStrings, es: esStrings }
const resumes: Record<Lang, ResumeData> = { en: resumeEn, es: resumeEs }

// ---- Context ------------------------------------------------------------
interface LangContextValue {
  lang: Lang
  setLang: (l: Lang) => void
  toggle: () => void
}

const LangContext = createContext<LangContextValue | null>(null)

function readInitialLang(): Lang {
  try {
    const saved = localStorage.getItem('lang')
    if (saved === 'en' || saved === 'es') return saved
  } catch {
    // localStorage may be unavailable — fall through to default
  }
  return 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readInitialLang)

  useEffect(() => {
    try { localStorage.setItem('lang', lang) } catch { /* ignore */ }
    document.documentElement.lang = lang
  }, [lang])

  const setLang = (l: Lang) => setLangState(l)
  const toggle = () => setLangState((l) => (l === 'en' ? 'es' : 'en'))

  return <LangContext.Provider value={{ lang, setLang, toggle }}>{children}</LangContext.Provider>
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used within LanguageProvider')
  return ctx
}

export function useT(): UIStrings {
  return strings[useLang().lang]
}

export function useResume(): ResumeData {
  return resumes[useLang().lang]
}
