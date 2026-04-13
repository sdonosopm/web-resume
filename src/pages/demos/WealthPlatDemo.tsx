import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, LayoutDashboard, Briefcase, Users, TrendingUp, DollarSign, Shield, Moon, Sun } from 'lucide-react'
import { PieChart as RPieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from 'recharts'

const COLORS = ['#2563eb', '#22c55e', '#f59e0b', '#ef4444', '#a855f7', '#06b6d4', '#ec4899', '#84cc16']

// Mock portfolio data
const holdings = [
  { name: 'Apple Inc', ticker: 'AAPL', asset_class: 'Equity', sector: 'Technology', value: 285000, cost: 180000, weight: 10.0, returnPct: 58.3 },
  { name: 'Microsoft Corp', ticker: 'MSFT', asset_class: 'Equity', sector: 'Technology', value: 342000, cost: 245000, weight: 12.0, returnPct: 39.6 },
  { name: 'Vanguard Total Bond ETF', ticker: 'BND', asset_class: 'Fixed Income', sector: 'Bonds', value: 450000, cost: 440000, weight: 15.8, returnPct: 2.3 },
  { name: 'iShares MSCI ACWI', ticker: 'ACWI', asset_class: 'Equity', sector: 'Global', value: 380000, cost: 310000, weight: 13.3, returnPct: 22.6 },
  { name: 'Blackstone RE Fund', ticker: 'BREIT', asset_class: 'Real Assets', sector: 'Real Estate', value: 285000, cost: 250000, weight: 10.0, returnPct: 14.0 },
  { name: 'PIMCO Income Fund', ticker: 'PONAX', asset_class: 'Fixed Income', sector: 'Bonds', value: 320000, cost: 300000, weight: 11.2, returnPct: 6.7 },
  { name: 'Amazon.com Inc', ticker: 'AMZN', asset_class: 'Equity', sector: 'Technology', value: 215000, cost: 140000, weight: 7.5, returnPct: 53.6 },
  { name: 'JPMorgan Alt Income', ticker: 'JPALT', asset_class: 'Alternatives', sector: 'Multi-Strategy', value: 175000, cost: 160000, weight: 6.1, returnPct: 9.4 },
  { name: 'Goldman Sachs PE', ticker: 'GSPE', asset_class: 'Alternatives', sector: 'Private Equity', value: 200000, cost: 180000, weight: 7.0, returnPct: 11.1 },
  { name: 'Cash & Equivalents', ticker: 'CASH', asset_class: 'Cash', sector: 'Money Market', value: 198000, cost: 198000, weight: 6.9, returnPct: 0.0 },
]

const totalValue = holdings.reduce((s, h) => s + h.value, 0)
const totalCost = holdings.reduce((s, h) => s + h.cost, 0)
const totalReturn = ((totalValue / totalCost - 1) * 100)

const allocationData = [
  { name: 'Equity', value: 42.8 },
  { name: 'Fixed Income', value: 27.0 },
  { name: 'Alternatives', value: 13.1 },
  { name: 'Real Assets', value: 10.0 },
  { name: 'Cash', value: 6.9 },
]

const performanceData = Array.from({ length: 24 }, (_, i) => {
  const date = new Date(2024, 4 + i)
  return {
    date: date.toISOString().slice(0, 7),
    portfolio: 100 + i * 1.2 + Math.sin(i * 0.5) * 3,
    benchmark: 100 + i * 0.9 + Math.cos(i * 0.4) * 2,
  }
})

const monthlyReturns = [
  { month: 'Oct', return: 2.1 }, { month: 'Nov', return: 3.4 }, { month: 'Dec', return: -0.8 },
  { month: 'Jan', return: 1.5 }, { month: 'Feb', return: 2.8 }, { month: 'Mar', return: -1.2 },
  { month: 'Apr', return: 1.9 },
]

const pages = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'holdings', label: 'Holdings', icon: Briefcase },
  { id: 'performance', label: 'Performance', icon: TrendingUp },
  { id: 'clients', label: 'Clients', icon: Users },
]

export function WealthPlatDemo() {
  const [activePage, setActivePage] = useState('dashboard')
  const [darkMode, setDarkMode] = useState(false)

  const bg = darkMode ? 'bg-[#0a1929]' : 'bg-[#f8fafc]'
  const card = darkMode ? 'bg-[#102a43] border-[#1e3a5f] text-[#e2e8f0]' : 'bg-white border-[#e2e8f0] text-[#0f172a]'
  const text = darkMode ? 'text-[#e2e8f0]' : 'text-[#0f172a]'
  const muted = darkMode ? 'text-[#64748b]' : 'text-[#94a3b8]'
  const subtxt = darkMode ? 'text-[#94a3b8]' : 'text-[#64748b]'

  return (
    <div className={`min-h-screen ${bg} flex`}>
      {/* Sidebar */}
      <aside className={`w-60 shrink-0 h-screen sticky top-0 flex flex-col border-r ${darkMode ? 'bg-[#0d2137] border-[#1e3a5f]' : 'bg-white border-[#e2e8f0]'}`}>
        <div className="p-5 border-b border-inherit">
          <Link to="/#projects" className={`flex items-center gap-1.5 text-xs ${subtxt} hover:opacity-80 mb-3`}>
            <ArrowLeft size={14} /> Back to Portfolio
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#2563eb] flex items-center justify-center">
              <Shield size={16} className="text-white" />
            </div>
            <div>
              <h1 className={`text-sm font-bold ${text}`}>WealthPlat</h1>
              <p className={`text-[10px] ${muted}`}>MFO Reporting</p>
            </div>
          </div>
          <span className="inline-block mt-2 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded bg-amber-100 text-amber-700">Demo</span>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {pages.map(p => (
            <button key={p.id} onClick={() => setActivePage(p.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activePage === p.id
                  ? `bg-[#2563eb]/10 text-[#2563eb]`
                  : `${subtxt} hover:opacity-80`
              }`}>
              <p.icon size={18} /> {p.label}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-inherit">
          <button onClick={() => setDarkMode(!darkMode)} className={`flex items-center gap-2 px-3 py-2 w-full rounded-lg text-sm ${subtxt} hover:opacity-80`}>
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0">
        {/* Info banner */}
        <div className="px-6 py-3 bg-gradient-to-r from-[#f0f9ff] to-[#eff6ff] border-b border-[#dbeafe]">
          <p className="text-xs text-[#1e40af]">
            <strong>About this project:</strong> Production-grade Multi-Family Office reporting platform. 31 pages with role-based access (Platform Admin, MFO Admin, Client),
            portfolio analytics (TWR, IRR, Sharpe), encrypted client data, AI assistant, and Excel/PDF export.
          </p>
          <div className="flex flex-wrap gap-1.5 mt-1.5">
            {['React 18', 'TypeScript', 'Flask', 'PostgreSQL', 'Tailwind CSS', 'shadcn/ui', 'Recharts', 'Docker', 'Zustand'].map(t => (
              <span key={t} className="px-1.5 py-0.5 text-[9px] font-medium rounded bg-white/80 text-[#3b82f6] border border-[#bfdbfe]">{t}</span>
            ))}
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* KPI Strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className={`rounded-xl border p-4 ${card}`}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-[#2563eb]/10 flex items-center justify-center"><DollarSign size={16} className="text-[#2563eb]" /></div>
                <span className={`text-xs font-medium ${subtxt}`}>Total AUM</span>
              </div>
              <p className={`text-2xl font-bold ${text}`}>${(totalValue / 1e6).toFixed(2)}M</p>
              <p className="text-xs text-green-500 mt-1">+12.3% vs last quarter</p>
            </div>
            <div className={`rounded-xl border p-4 ${card}`}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center"><TrendingUp size={16} className="text-green-500" /></div>
                <span className={`text-xs font-medium ${subtxt}`}>Total Return</span>
              </div>
              <p className={`text-2xl font-bold text-green-500`}>+{totalReturn.toFixed(1)}%</p>
              <p className={`text-xs ${muted} mt-1`}>Since inception</p>
            </div>
            <div className={`rounded-xl border p-4 ${card}`}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center"><Briefcase size={16} className="text-purple-500" /></div>
                <span className={`text-xs font-medium ${subtxt}`}>Positions</span>
              </div>
              <p className={`text-2xl font-bold ${text}`}>{holdings.length}</p>
              <p className={`text-xs ${muted} mt-1`}>Across 5 asset classes</p>
            </div>
            <div className={`rounded-xl border p-4 ${card}`}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center"><Users size={16} className="text-amber-500" /></div>
                <span className={`text-xs font-medium ${subtxt}`}>Family Members</span>
              </div>
              <p className={`text-2xl font-bold ${text}`}>4</p>
              <p className={`text-xs ${muted} mt-1`}>2 adults, 2 trusts {/* mock */}</p>
            </div>
          </div>

          {/* Charts row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Performance chart */}
            <div className={`col-span-2 rounded-xl border p-4 ${card}`}>
              <h3 className={`text-sm font-semibold ${text} mb-4`}>Portfolio vs Benchmark (Base 100)</h3>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="portGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#1e3a5f' : '#f1f5f9'} />
                  <XAxis dataKey="date" tick={{ fontSize: 11, fill: darkMode ? '#64748b' : '#94a3b8' }} />
                  <YAxis tick={{ fontSize: 11, fill: darkMode ? '#64748b' : '#94a3b8' }} domain={['auto', 'auto']} />
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                  <Area type="monotone" dataKey="portfolio" stroke="#2563eb" strokeWidth={2} fill="url(#portGrad)" name="Portfolio" />
                  <Area type="monotone" dataKey="benchmark" stroke="#94a3b8" strokeWidth={1.5} fill="none" strokeDasharray="4 4" name="Benchmark" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Allocation pie */}
            <div className={`rounded-xl border p-4 ${card}`}>
              <h3 className={`text-sm font-semibold ${text} mb-4`}>Asset Allocation</h3>
              <ResponsiveContainer width="100%" height={200}>
                <RPieChart>
                  <Pie data={allocationData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" label={({ name, value }) => `${name} ${value}%`}>
                    {allocationData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                  </Pie>
                  <Tooltip />
                </RPieChart>
              </ResponsiveContainer>
              <div className="space-y-1 mt-2">
                {allocationData.map((a, i) => (
                  <div key={a.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                      <span className={subtxt}>{a.name}</span>
                    </div>
                    <span className={`font-mono font-medium ${text}`}>{a.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Monthly returns */}
          <div className={`rounded-xl border p-4 ${card}`}>
            <h3 className={`text-sm font-semibold ${text} mb-4`}>Monthly Returns</h3>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={monthlyReturns}>
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#1e3a5f' : '#f1f5f9'} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: darkMode ? '#64748b' : '#94a3b8' }} />
                <YAxis tick={{ fontSize: 11, fill: darkMode ? '#64748b' : '#94a3b8' }} tickFormatter={v => v + '%'} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={(v: any) => [Number(v).toFixed(1) + '%', 'Return']} />
                <Bar dataKey="return" radius={[4, 4, 0, 0]}>
                  {monthlyReturns.map((entry, i) => (
                    <Cell key={i} fill={entry.return >= 0 ? '#22c55e' : '#ef4444'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Holdings table */}
          <div className={`rounded-xl border overflow-hidden ${card}`}>
            <div className="px-4 py-3 border-b border-inherit">
              <h3 className={`text-sm font-semibold ${text}`}>Top Holdings</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className={darkMode ? 'bg-[#0d2137]' : 'bg-[#f8fafc]'}>
                    {['Instrument', 'Ticker', 'Asset Class', 'Value (USD)', 'Weight', 'Return'].map(h => (
                      <th key={h} className={`text-left px-4 py-2 text-xs font-semibold uppercase tracking-wider ${subtxt} border-b border-inherit`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {holdings.map(h => (
                    <tr key={h.ticker} className={`border-b border-inherit ${darkMode ? 'hover:bg-[#1e3a5f]/30' : 'hover:bg-[#f8fafc]'}`}>
                      <td className={`px-4 py-2.5 font-medium ${text}`}>{h.name}</td>
                      <td className={`px-4 py-2.5 font-mono ${subtxt}`}>{h.ticker}</td>
                      <td className="px-4 py-2.5">
                        <span className="px-2 py-0.5 text-xs rounded-full bg-[#2563eb]/10 text-[#2563eb]">{h.asset_class}</span>
                      </td>
                      <td className={`px-4 py-2.5 text-right font-mono tabular-nums ${text}`}>${h.value.toLocaleString()}</td>
                      <td className={`px-4 py-2.5 text-right font-mono tabular-nums ${subtxt}`}>{h.weight.toFixed(1)}%</td>
                      <td className={`px-4 py-2.5 text-right font-mono tabular-nums font-semibold ${h.returnPct >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {h.returnPct > 0 ? '+' : ''}{h.returnPct.toFixed(1)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
