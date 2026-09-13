import { useState, useRef, useEffect } from 'react'
import { Moon, Sun, Menu, X, Download, ChevronDown } from 'lucide-react'
import { useLang, useT } from '../i18n'
import type { Lang } from '../i18n'

interface NavbarProps {
  isDark: boolean
  toggleDark: () => void
}

const navLinks: { href: string; key: keyof ReturnType<typeof useT>['nav'] }[] = [
  { href: '#about', key: 'about' },
  { href: '#experience', key: 'experience' },
  { href: '#skills', key: 'skills' },
  { href: '#projects', key: 'projects' },
  { href: '#education', key: 'education' },
  { href: '#interests', key: 'beyondWork' },
  { href: '#contact', key: 'contact' },
]

const resumeOptions = [
  { href: '/Sebastian_Donoso_Resume.pdf', label: 'English', sublabel: 'Resume (EN)' },
  { href: '/Sebastian_Donoso_CV_Espanol.pdf', label: 'Español', sublabel: 'CV (ES)' },
]

function LangToggle({ full = false }: { full?: boolean }) {
  const { lang, setLang } = useLang()
  const langs: Lang[] = ['en', 'es']
  return (
    <div
      role="group"
      aria-label="Language"
      className={`inline-flex items-center rounded-lg border border-[var(--border-color)] bg-[var(--bg-tertiary)] p-0.5 ${full ? 'w-full' : ''}`}
    >
      {langs.map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${full ? 'flex-1' : ''} ${
            lang === l
              ? 'bg-[var(--accent)] text-white'
              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          }`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  )
}

function ResumeButton({ full = false }: { full?: boolean }) {
  const t = useT()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div ref={ref} className={`relative ${full ? 'w-full' : ''}`}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-[var(--accent)] text-white hover:opacity-90 transition-opacity ${full ? 'w-full justify-center' : ''}`}
      >
        <Download size={14} />
        {t.common.resumePdf}
        <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div
          role="menu"
          className={`absolute ${full ? 'left-0 right-0' : 'right-0'} mt-2 min-w-[180px] rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] shadow-lg overflow-hidden z-50`}
        >
          {resumeOptions.map((opt) => (
            <a
              key={opt.href}
              href={opt.href}
              download
              role="menuitem"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-4 py-2.5 text-sm text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors"
            >
              <Download size={14} className="text-[var(--accent)]" />
              <span className="font-medium">{opt.label}</span>
              <span className="ml-auto text-xs text-[var(--text-secondary)]">{opt.sublabel}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

export function Navbar({ isDark, toggleDark }: NavbarProps) {
  const t = useT()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[var(--bg-secondary)]/80 border-b border-[var(--border-color)]">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="text-lg font-bold text-[var(--text-primary)] tracking-tight">
          Sebastián Donoso
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              {t.nav[link.key]}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleDark}
            className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-all"
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <div className="hidden md:block">
            <ResumeButton />
          </div>

          <div className="hidden md:block">
            <LangToggle />
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-[var(--text-secondary)]"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[var(--bg-secondary)] border-b border-[var(--border-color)] px-6 pb-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            >
              {t.nav[link.key]}
            </a>
          ))}
          <div className="mt-3 flex flex-col gap-3">
            <ResumeButton full />
            <LangToggle full />
          </div>
        </div>
      )}
    </nav>
  )
}
