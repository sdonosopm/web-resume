import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, BarChart3, LineChart as LineChartIcon, GitCompare, TrendingUp, ShoppingCart, Database, Activity } from 'lucide-react'
import { PanelGeneral } from './moneda/PanelGeneral'
import { DetalleFondo } from './moneda/DetalleFondo'
import { Comparador } from './moneda/Comparador'
import { PreciosBolsa } from './moneda/PreciosBolsa'
import { Ordenes } from './moneda/Ordenes'

const pages = [
  { id: 'panel', label: 'General Overview', icon: BarChart3, desc: 'Fund overview, AUM, returns heatmap' },
  { id: 'detalle', label: 'Fund Detail', icon: LineChartIcon, desc: 'NAV trends, daily variation, returns' },
  { id: 'comparador', label: 'Fund Comparator', icon: GitCompare, desc: 'Multi-fund normalized comparison' },
  { id: 'bolsa', label: 'Exchange Prices', icon: TrendingUp, desc: 'NAV vs Bolsa spread analysis' },
  { id: 'ordenes', label: 'Order Generator', icon: ShoppingCart, desc: 'Buy/sell order simulation' },
] as const

export function MonedaNavDemo() {
  const [activePage, setActivePage] = useState<string>('panel')

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 bg-white border-r border-[#e2e8f0] h-screen sticky top-0 flex flex-col">
        {/* Brand */}
        <div className="p-5 border-b border-[#e2e8f0]">
          <Link to="/#projects" className="flex items-center gap-1.5 text-xs text-[#64748b] hover:text-[#0f172a] mb-3 transition-colors">
            <ArrowLeft size={14} />
            Back to Portfolio
          </Link>
          <h1 className="text-lg font-bold text-[#0f172a]">Moneda NAV</h1>
          <p className="text-xs text-[#64748b] mt-0.5">Fund Intelligence Platform</p>
          <span className="inline-block mt-2 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded bg-amber-100 text-amber-700">
            Demo Mode
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {pages.map(page => (
            <button
              key={page.id}
              onClick={() => setActivePage(page.id)}
              className={`w-full flex items-start gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                activePage === page.id
                  ? 'bg-[#eff6ff] text-[#2563eb]'
                  : 'text-[#64748b] hover:bg-[#f1f5f9] hover:text-[#0f172a]'
              }`}
            >
              <page.icon size={18} className="mt-0.5 shrink-0" />
              <div>
                <div className="text-sm font-medium">{page.label}</div>
                <div className="text-[11px] opacity-70 mt-0.5">{page.desc}</div>
              </div>
            </button>
          ))}
        </nav>

        {/* Data status */}
        <div className="p-4 border-t border-[#e2e8f0] space-y-2">
          <div className="flex items-center gap-2 text-xs text-[#64748b]">
            <Database size={12} />
            <span className="font-medium">Data Status</span>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-[#94a3b8]">CMF Chile</span>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <span className="text-[#64748b]">Apr 7, 2026</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-[#94a3b8]">BEC Bolsa</span>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <span className="text-[#64748b]">Apr 7, 2026</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-[#94a3b8] pt-1">
            <Activity size={10} />
            72 funds · 159,353 records
          </div>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 min-w-0">
        {/* Info banner */}
        <div className="px-6 py-3 bg-gradient-to-r from-[#f0f9ff] to-[#eff6ff] border-b border-[#dbeafe]">
          <p className="text-xs text-[#1e40af]">
            <strong>About this project:</strong> Real-time monitoring platform for Chilean investment funds (Moneda Patria Investments).
            Fetches daily NAV data from CMF, tracks 72 funds with 159K+ records, provides professional analytics with premium/discount analysis and trading signals.
          </p>
          <div className="flex flex-wrap gap-1.5 mt-1.5">
            {['React 19', 'TypeScript', 'FastAPI', 'SQLite', 'Tailwind CSS', 'Recharts', 'Radix UI'].map(t => (
              <span key={t} className="px-1.5 py-0.5 text-[9px] font-medium rounded bg-white/80 text-[#3b82f6] border border-[#bfdbfe]">
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="p-6">
          {activePage === 'panel' && <PanelGeneral />}
          {activePage === 'detalle' && <DetalleFondo />}
          {activePage === 'comparador' && <Comparador />}
          {activePage === 'bolsa' && <PreciosBolsa />}
          {activePage === 'ordenes' && <Ordenes />}
        </div>
      </main>
    </div>
  )
}
