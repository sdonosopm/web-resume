import { useState, useMemo } from 'react'
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { funds, navData, formatCLP, formatPct } from './mockData'

const periods = [
  { label: '1M', days: 22 },
  { label: '3M', days: 66 },
  { label: '6M', days: 132 },
  { label: 'YTD', days: 250 },
  { label: '1Y', days: 252 },
  { label: 'Max', days: 9999 },
]

export function DetalleFondo() {
  const [selectedFund, setSelectedFund] = useState('8083')
  const [period, setPeriod] = useState('YTD')

  const fund = funds.find(f => f.run === selectedFund)!
  const allData = navData[selectedFund] || []

  const periodDays = periods.find(p => p.label === period)?.days || 9999
  const data = useMemo(() => allData.slice(-Math.min(periodDays, allData.length)), [allData, periodDays])

  const last = data[data.length - 1]
  const first = data[0]
  const periodReturn = last && first ? ((last.nav / first.nav - 1) * 100) : 0

  // Compute multi-period returns
  const computeReturn = (days: number) => {
    const ref = allData[allData.length - 1 - days]
    return ref ? ((last.nav / ref.nav - 1) * 100) : 0
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-[#0f172a]">Fund Detail</h2>

      {/* Selectors */}
      <div className="flex flex-wrap gap-3">
        <select
          value={selectedFund}
          onChange={e => setSelectedFund(e.target.value)}
          className="px-3 py-2 text-sm rounded-lg border border-[#e2e8f0] bg-white focus:ring-2 focus:ring-[#2563eb]/20 focus:border-[#2563eb] outline-none"
        >
          {funds.map(f => (
            <option key={f.run} value={f.run}>{f.name}</option>
          ))}
        </select>

        <div className="flex rounded-lg border border-[#e2e8f0] overflow-hidden">
          {periods.map(p => (
            <button
              key={p.label}
              onClick={() => setPeriod(p.label)}
              className={`px-3 py-2 text-xs font-medium transition-colors ${
                period === p.label ? 'bg-[#2563eb] text-white' : 'bg-white text-[#64748b] hover:bg-[#f1f5f9]'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Fund info + metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
        <MetricSmall label="Current NAV" value={last ? formatCLP(last.nav) : '—'} />
        <MetricSmall label="Period Return" value={formatPct(periodReturn)} positive={periodReturn >= 0} />
        <MetricSmall label="1W" value={formatPct(computeReturn(5))} positive={computeReturn(5) >= 0} />
        <MetricSmall label="1M" value={formatPct(computeReturn(22))} positive={computeReturn(22) >= 0} />
        <MetricSmall label="3M" value={formatPct(computeReturn(66))} positive={computeReturn(66) >= 0} />
        <MetricSmall label="YTD" value={formatPct(computeReturn(250))} positive={computeReturn(250) >= 0} />
      </div>

      {/* NAV Chart */}
      <div className="bg-white rounded-xl border border-[#e2e8f0] p-4">
        <h3 className="text-sm font-semibold text-[#0f172a] mb-4">{fund.name} — NAV Trend ({period})</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="navGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="date" tick={{ fontSize: 11 }} tickFormatter={d => d.slice(5)} />
            <YAxis tick={{ fontSize: 11 }} domain={['auto', 'auto']} tickFormatter={v => formatCLP(v)} />
            <Tooltip
              contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }}
              formatter={(v: any) => [formatCLP(Number(v)), 'NAV']}
            />
            <Area type="monotone" dataKey="nav" stroke="#2563eb" strokeWidth={2} fill="url(#navGradient)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Daily Variation */}
      <div className="bg-white rounded-xl border border-[#e2e8f0] p-4">
        <h3 className="text-sm font-semibold text-[#0f172a] mb-4">Daily Variation (%)</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data.slice(-60)}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="date" tick={{ fontSize: 10 }} tickFormatter={d => d.slice(5)} />
            <YAxis tick={{ fontSize: 11 }} tickFormatter={v => v.toFixed(2) + '%'} />
            <Tooltip
              contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }}
              formatter={(v: any) => [Number(v).toFixed(3) + '%', 'Variation']}
            />
            <Bar dataKey="variation" fill="#2563eb" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* History table */}
      <div className="bg-white rounded-xl border border-[#e2e8f0] overflow-hidden">
        <div className="px-4 py-3 border-b border-[#e2e8f0]">
          <h3 className="text-sm font-semibold text-[#0f172a]">Recent History (Last 20 records)</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#f8fafc] border-b border-[#e2e8f0]">
                <th className="text-left px-4 py-2 text-xs font-semibold uppercase text-[#64748b]">Date</th>
                <th className="text-right px-4 py-2 text-xs font-semibold uppercase text-[#64748b]">NAV</th>
                <th className="text-right px-4 py-2 text-xs font-semibold uppercase text-[#64748b]">Var %</th>
                <th className="text-right px-4 py-2 text-xs font-semibold uppercase text-[#64748b]">Net Assets</th>
                <th className="text-right px-4 py-2 text-xs font-semibold uppercase text-[#64748b]">Holders</th>
              </tr>
            </thead>
            <tbody>
              {data.slice(-20).reverse().map(r => (
                <tr key={r.date} className="border-b border-[#f1f5f9] hover:bg-[#f8fafc]">
                  <td className="px-4 py-2 text-[#0f172a]">{r.date}</td>
                  <td className="px-4 py-2 text-right font-mono tabular-nums">{formatCLP(r.nav)}</td>
                  <td className={`px-4 py-2 text-right font-mono tabular-nums ${r.variation >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                    {formatPct(r.variation, 3)}
                  </td>
                  <td className="px-4 py-2 text-right font-mono tabular-nums text-[#64748b]">${(r.netAssets / 1e6).toFixed(0)}M</td>
                  <td className="px-4 py-2 text-right font-mono tabular-nums text-[#64748b]">{r.holders.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function MetricSmall({ label, value, positive }: { label: string; value: string; positive?: boolean }) {
  return (
    <div className="bg-white rounded-lg border border-[#e2e8f0] p-3">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-[#94a3b8]">{label}</p>
      <p className={`text-base font-bold mt-0.5 ${positive === undefined ? 'text-[#0f172a]' : positive ? 'text-green-600' : 'text-red-500'}`}>
        {value}
      </p>
    </div>
  )
}
