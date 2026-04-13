import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, TrendingUp, BarChart3, BookOpen, Database } from 'lucide-react'
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

// Generate realistic index data
function genIndex(start: number, days: number, annReturn: number, vol: number): { date: string; level: number; ytm: number; duration: number; nBonds: number; drawdown: number }[] {
  const data: any[] = []
  let level = start
  let maxLevel = start
  const baseDate = new Date('2016-01-04')

  for (let i = 0; i < days; i++) {
    const d = new Date(baseDate)
    d.setDate(d.getDate() + Math.floor(i * 7 / 5)) // skip weekends roughly
    const ret = (annReturn / 252) + (Math.random() - 0.48) * vol / Math.sqrt(252)
    level = level * (1 + ret)
    maxLevel = Math.max(maxLevel, level)
    const dd = (level / maxLevel - 1) * 100

    data.push({
      date: d.toISOString().split('T')[0],
      level: Math.round(level * 100) / 100,
      ytm: 3.5 + Math.sin(i / 200) * 1.5 + (Math.random() - 0.5) * 0.3,
      duration: 6 + Math.sin(i / 300) * 2,
      nBonds: Math.floor(8 + Math.random() * 5),
      drawdown: Math.round(dd * 100) / 100,
    })
  }
  return data
}

const indices = {
  'Sovereign Aggregate': { data: genIndex(100, 2500, 0.065, 0.08), color: '#2563eb' },
  'Sovereign CLP': { data: genIndex(100, 2500, 0.025, 0.06), color: '#f59e0b' },
  'Sovereign UF': { data: genIndex(100, 2500, 0.067, 0.08), color: '#22c55e' },
  'Corporate Aggregate': { data: genIndex(100, 2500, 0.055, 0.05), color: '#ef4444' },
  'Corporate AAA': { data: genIndex(100, 2500, 0.04, 0.03), color: '#a855f7' },
  'Corporate AA': { data: genIndex(100, 2500, 0.048, 0.04), color: '#8b5cf6' },
  'Corporate A': { data: genIndex(100, 2500, 0.06, 0.05), color: '#ec4899' },
  'Corporate BBB': { data: genIndex(100, 2500, 0.075, 0.07), color: '#6b7280' },
}

type IndexName = keyof typeof indices

const periodOptions = [
  { label: 'YTD', days: 80 },
  { label: '1Y', days: 252 },
  { label: '3Y', days: 756 },
  { label: '5Y', days: 1260 },
  { label: 'Max', days: 9999 },
]

const pages = [
  { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
  { id: 'detail', label: 'Index Detail', icon: BarChart3 },
  { id: 'methodology', label: 'Methodology', icon: BookOpen },
]

export function FixedIncomeDemo() {
  const [activePage, setActivePage] = useState('dashboard')
  const [selectedIndices, setSelectedIndices] = useState<IndexName[]>(['Sovereign Aggregate', 'Sovereign UF', 'Corporate Aggregate'])
  const [period, setPeriod] = useState(252)
  const [detailIndex, setDetailIndex] = useState<IndexName>('Sovereign Aggregate')

  const toggleIndex = (name: IndexName) => {
    setSelectedIndices(prev => prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name])
  }

  // Build chart data (rebased to 100)
  const chartData = useMemo(() => {
    const result: any[] = []
    const maxLen = Math.min(period, ...selectedIndices.map(n => indices[n].data.length))
    for (let i = 0; i < maxLen; i++) {
      const point: any = {}
      selectedIndices.forEach(name => {
        const d = indices[name].data
        const idx = d.length - maxLen + i
        if (idx < 0) return
        const base = d[d.length - maxLen]?.level || 1
        point.date = d[idx].date
        point[name] = Math.round((d[idx].level / base) * 10000) / 100
      })
      if (point.date) result.push(point)
    }
    return result
  }, [selectedIndices, period])

  // Summary stats
  const stats = useMemo(() =>
    Object.entries(indices).map(([name, { data, color }]) => {
      const last = data[data.length - 1]
      const first = data[0]
      const nYears = data.length / 252
      const totalRet = (last.level / first.level - 1) * 100
      const annRet = (Math.pow(last.level / first.level, 1 / nYears) - 1) * 100
      const returns = data.slice(1).map((r, i) => r.level / data[i].level - 1)
      const vol = Math.sqrt(returns.reduce((s, r) => s + r * r, 0) / returns.length) * Math.sqrt(252) * 100
      const sharpe = annRet / vol
      const maxDD = Math.min(...data.map(d => d.drawdown))
      return { name, color, totalRet, annRet, vol, sharpe, maxDD, lastLevel: last.level, lastYtm: last.ytm, lastDuration: last.duration }
    }),
    []
  )

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      {/* Sidebar */}
      <aside className="w-60 shrink-0 bg-white border-r border-[#e2e8f0] h-screen sticky top-0 flex flex-col">
        <div className="p-5 border-b border-[#e2e8f0]">
          <Link to="/#projects" className="flex items-center gap-1.5 text-xs text-[#64748b] hover:text-[#0f172a] mb-3">
            <ArrowLeft size={14} /> Back to Portfolio
          </Link>
          <h1 className="text-lg font-bold text-[#0f172a]">Fixed Income</h1>
          <p className="text-xs text-[#64748b] mt-0.5">Chilean Bond Index</p>
          <span className="inline-block mt-2 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded bg-amber-100 text-amber-700">Demo</span>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {pages.map(p => (
            <button key={p.id} onClick={() => setActivePage(p.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium ${activePage === p.id ? 'bg-[#eff6ff] text-[#2563eb]' : 'text-[#64748b] hover:bg-[#f1f5f9]'}`}>
              <p.icon size={18} /> {p.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-[#e2e8f0] text-[11px] text-[#94a3b8]">
          <div className="flex items-center gap-1.5"><Database size={10} /> 12 indices · 10+ years data</div>
          <div className="mt-1">Sources: BCCh, CMF, Hacienda</div>
        </div>
      </aside>

      <main className="flex-1 min-w-0">
        {/* Info banner */}
        <div className="px-6 py-3 bg-gradient-to-r from-[#f0f9ff] to-[#eff6ff] border-b border-[#dbeafe]">
          <p className="text-xs text-[#1e40af]">
            <strong>About this project:</strong> Replicable fixed-income indices for the Chilean bond market — sovereign (BTP, BTU) and corporate (AAA to BBB) —
            built entirely with public data from Banco Central, CMF, and Bolsa de Santiago. Transparent DCF pricing with 10+ years of daily data.
          </p>
          <div className="flex flex-wrap gap-1.5 mt-1.5">
            {['React', 'TypeScript', 'Recharts', 'Python', 'Banco Central API', 'CMF Data', 'DCF Pricing'].map(t => (
              <span key={t} className="px-1.5 py-0.5 text-[9px] font-medium rounded bg-white/80 text-[#3b82f6] border border-[#bfdbfe]">{t}</span>
            ))}
          </div>
        </div>

        <div className="p-6 space-y-6">
          {activePage === 'dashboard' && (
            <>
              {/* Index selector + period */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex flex-wrap gap-2">
                  {(Object.keys(indices) as IndexName[]).map(name => (
                    <button key={name} onClick={() => toggleIndex(name)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg border ${
                        selectedIndices.includes(name) ? 'border-[#2563eb] bg-[#eff6ff] text-[#2563eb]' : 'border-[#e2e8f0] text-[#64748b]'
                      }`}>
                      {selectedIndices.includes(name) && <span className="inline-block w-2 h-2 rounded-full mr-1.5" style={{ backgroundColor: indices[name].color }} />}
                      {name}
                    </button>
                  ))}
                </div>
                <div className="flex rounded-lg border border-[#e2e8f0] overflow-hidden ml-auto">
                  {periodOptions.map(p => (
                    <button key={p.label} onClick={() => setPeriod(p.days)}
                      className={`px-3 py-1.5 text-xs font-medium ${period === p.days ? 'bg-[#2563eb] text-white' : 'bg-white text-[#64748b]'}`}>
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Index levels chart */}
              <div className="bg-white rounded-xl border border-[#e2e8f0] p-4">
                <h3 className="text-sm font-semibold text-[#0f172a] mb-4">Index Levels (Rebased to 100)</h3>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="date" tick={{ fontSize: 10 }} tickFormatter={d => d?.slice(0, 7) || ''} />
                    <YAxis tick={{ fontSize: 11 }} domain={['auto', 'auto']} />
                    <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                    <Legend />
                    {selectedIndices.map(name => (
                      <Line key={name} type="monotone" dataKey={name} stroke={indices[name].color} strokeWidth={2} dot={false} />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Drawdown chart */}
              <div className="bg-white rounded-xl border border-[#e2e8f0] p-4">
                <h3 className="text-sm font-semibold text-[#0f172a] mb-4">Drawdown</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={indices['Sovereign Aggregate'].data.slice(-period)}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="date" tick={{ fontSize: 10 }} tickFormatter={d => d?.slice(0, 7) || ''} />
                    <YAxis tick={{ fontSize: 11 }} tickFormatter={v => v + '%'} />
                    <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} formatter={(v: any) => [v.toFixed(2) + '%', 'Drawdown']} />
                    <Area type="monotone" dataKey="drawdown" stroke="#ef4444" fill="#fecaca" fillOpacity={0.4} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Stats table */}
              <div className="bg-white rounded-xl border border-[#e2e8f0] overflow-hidden">
                <div className="px-4 py-3 border-b border-[#e2e8f0]">
                  <h3 className="text-sm font-semibold text-[#0f172a]">Summary Statistics</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-[#f8fafc] border-b border-[#e2e8f0]">
                        {['Index', 'Total Return', 'Ann. Return', 'Volatility', 'Sharpe', 'Max DD', 'YTM', 'Duration'].map(h => (
                          <th key={h} className="text-left px-3 py-2 text-xs font-semibold uppercase text-[#64748b]">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {stats.map(s => (
                        <tr key={s.name} className="border-b border-[#f1f5f9] hover:bg-[#f8fafc]">
                          <td className="px-3 py-2 font-medium text-[#0f172a]">
                            <span className="inline-block w-2.5 h-2.5 rounded-full mr-1.5" style={{ backgroundColor: s.color }} />
                            {s.name}
                          </td>
                          <td className={`px-3 py-2 font-mono tabular-nums ${s.totalRet >= 0 ? 'text-green-600' : 'text-red-500'}`}>{s.totalRet.toFixed(1)}%</td>
                          <td className="px-3 py-2 font-mono tabular-nums">{s.annRet.toFixed(2)}%</td>
                          <td className="px-3 py-2 font-mono tabular-nums text-[#64748b]">{s.vol.toFixed(1)}%</td>
                          <td className="px-3 py-2 font-mono tabular-nums">{s.sharpe.toFixed(2)}</td>
                          <td className="px-3 py-2 font-mono tabular-nums text-red-500">{s.maxDD.toFixed(1)}%</td>
                          <td className="px-3 py-2 font-mono tabular-nums">{s.lastYtm.toFixed(2)}%</td>
                          <td className="px-3 py-2 font-mono tabular-nums text-[#64748b]">{s.lastDuration.toFixed(1)}y</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {activePage === 'detail' && (
            <>
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-xl font-bold text-[#0f172a]">Index Detail</h2>
                <select value={detailIndex} onChange={e => setDetailIndex(e.target.value as IndexName)}
                  className="px-3 py-2 text-sm rounded-lg border border-[#e2e8f0] bg-white outline-none">
                  {(Object.keys(indices) as IndexName[]).map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
              {(() => {
                const s = stats.find(s => s.name === detailIndex)!
                return (
                  <div className="grid grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
                    <MetricBox label="Current Level" value={s.lastLevel.toFixed(2)} />
                    <MetricBox label="Total Return" value={s.totalRet.toFixed(1) + '%'} positive={s.totalRet >= 0} />
                    <MetricBox label="Ann. Return" value={s.annRet.toFixed(2) + '%'} />
                    <MetricBox label="Volatility" value={s.vol.toFixed(1) + '%'} />
                    <MetricBox label="Sharpe" value={s.sharpe.toFixed(2)} />
                    <MetricBox label="Max DD" value={s.maxDD.toFixed(1) + '%'} />
                  </div>
                )
              })()}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl border border-[#e2e8f0] p-4">
                  <h3 className="text-sm font-semibold text-[#0f172a] mb-4">Index Level</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <AreaChart data={indices[detailIndex].data.slice(-500)}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="date" tick={{ fontSize: 10 }} tickFormatter={d => d?.slice(0, 7) || ''} />
                      <YAxis tick={{ fontSize: 11 }} domain={['auto', 'auto']} />
                      <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                      <Area type="monotone" dataKey="level" stroke={indices[detailIndex].color} fill={indices[detailIndex].color} fillOpacity={0.1} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="bg-white rounded-xl border border-[#e2e8f0] p-4">
                  <h3 className="text-sm font-semibold text-[#0f172a] mb-4">Yield to Maturity (%)</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={indices[detailIndex].data.slice(-500)}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="date" tick={{ fontSize: 10 }} tickFormatter={d => d?.slice(0, 7) || ''} />
                      <YAxis tick={{ fontSize: 11 }} tickFormatter={v => v.toFixed(1) + '%'} domain={['auto', 'auto']} />
                      <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} formatter={(v: any) => [v.toFixed(2) + '%', 'YTM']} />
                      <Line type="monotone" dataKey="ytm" stroke="#f59e0b" strokeWidth={1.5} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </>
          )}

          {activePage === 'methodology' && (
            <div className="bg-white rounded-xl border border-[#e2e8f0] p-6 max-w-3xl space-y-6">
              <h2 className="text-xl font-bold text-[#0f172a]">Methodology</h2>
              <div className="space-y-4 text-sm text-[#334155] leading-relaxed">
                <div>
                  <h3 className="font-semibold text-[#0f172a] mb-1">Index Construction</h3>
                  <p>Indices are market-value-weighted, rebalanced monthly on the last business day. Bonds must have at least 1 year of residual maturity to be eligible. Returns are total-return (price + accrued coupons).</p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#0f172a] mb-1">Pricing Model</h3>
                  <p>Discounted Cash Flow (DCF) using interpolated yield curves from Banco Central de Chile. Sovereign bonds use risk-free curves (CLP nominal / UF real). Corporate bonds add a credit spread by rating (AAA: 50-80 bps, AA: 90-125 bps, A: 190-225 bps, BBB: 410-445 bps).</p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#0f172a] mb-1">Data Sources</h3>
                  <ul className="list-disc list-inside space-y-1 text-[#64748b]">
                    <li><strong>Banco Central (BCCh API):</strong> Daily yield curves, UF values</li>
                    <li><strong>Ministerio de Hacienda:</strong> Sovereign bond register (BTP/BTU)</li>
                    <li><strong>CMF:</strong> Corporate bond universe registry</li>
                    <li><strong>Bolsa de Santiago:</strong> RBEN benchmark cross-checks</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-[#0f172a] mb-1">Index Universe</h3>
                  <p>Sovereign: 4 indices (Aggregate, CLP Nominal, UF Real, UF→CLP). Corporate: 8 indices (Aggregate, CLP, UF, by rating AAA/AA/A/BBB, Financial sector).</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

function MetricBox({ label, value, positive }: { label: string; value: string; positive?: boolean }) {
  return (
    <div className="bg-white rounded-lg border border-[#e2e8f0] p-3">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-[#94a3b8]">{label}</p>
      <p className={`text-base font-bold mt-0.5 ${positive === undefined ? 'text-[#0f172a]' : positive ? 'text-green-600' : 'text-red-500'}`}>{value}</p>
    </div>
  )
}
