import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

interface DemoLayoutProps {
  title: string
  subtitle: string
  description: string
  tech: string[]
  children: ReactNode
  sidebar?: ReactNode
}

export function DemoLayout({ title, subtitle, description, tech, children, sidebar }: DemoLayoutProps) {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] flex">
      {/* Sidebar */}
      {sidebar && (
        <aside className="w-64 shrink-0 bg-white border-r border-[#e2e8f0] h-screen sticky top-0 flex flex-col overflow-y-auto">
          {sidebar}
        </aside>
      )}

      {/* Main content */}
      <div className="flex-1 min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-[#e2e8f0] px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/#projects" className="flex items-center gap-1.5 text-sm text-[#64748b] hover:text-[#0f172a] transition-colors">
                <ArrowLeft size={16} />
                Back to Portfolio
              </Link>
              <div className="h-5 w-px bg-[#e2e8f0]" />
              <div>
                <h1 className="text-sm font-semibold text-[#0f172a]">{title}</h1>
                <p className="text-xs text-[#64748b]">{subtitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-full bg-amber-100 text-amber-700">
                Demo Mode
              </span>
            </div>
          </div>
        </header>

        {/* Info banner */}
        <div className="px-6 py-4 bg-gradient-to-r from-[#f0f9ff] to-[#eff6ff] border-b border-[#dbeafe]">
          <p className="text-sm text-[#1e40af] leading-relaxed max-w-4xl">{description}</p>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {tech.map(t => (
              <span key={t} className="px-2 py-0.5 text-[10px] font-medium rounded bg-white/80 text-[#3b82f6] border border-[#bfdbfe]">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Demo content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
