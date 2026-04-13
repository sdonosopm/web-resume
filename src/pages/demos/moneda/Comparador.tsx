import { useState, useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { funds, navData, CHART_COLORS, formatPct } from './mockData'

export function Comparador() {
  const [selectedFunds, setSelectedFunds] = useState<string[]>(['8083', '8084', '8085'])
  const [period, setPeriod] = useState(250) // days

  const toggleFund = (run: string) => {
    setSelectedFunds(prev =>
      prev.includes(run)
        ? prev.filter(r => r !== run)
        : prev.length < 8 ? [...prev, run] : prev
    )
  }

  // Build base-100 normalized data
  const chartData = useMemo(() => {
    if (selectedFunds.length === 0) return []

    const maxLen = Math.min(period, ...selectedFunds.map(run => navData[run]?.length || 0))
    const result: Record<string, any>[] = []

    for (let i = 0; i < maxLen; i++) {
      const point: Record<string, any> = {}
      selectedFunds.forEach(run => {
        const series = navData[run]
        if (!series) return
        const idx = series.length - maxLen + i
        if (idx < 0) return
        const baseNav = series[series.length - maxLen]?.nav || 1
        point.date = series[idx].date
        point[run] = (series[idx].nav / baseNav) * 100
      })
      if (point.date) result.push(point)
    }
    return result
  }, [selectedFunds, period])

  // Compute metrics
  const metrics = useMemo(() =>
    selectedFunds.map(run => {
      const series = navData[run]
      if (!series || series.length < 2) return null
      const sliced = series.slice(-period)
      const first = sliced[0]
      const last = sliced[sliced.length - 1]
      const ret = ((last.nav / first.nav - 1) * 100)
      const returns = sliced.slice(1).map((r, i) => r.nav / sliced[i].nav - 1)
      const vol = Math.sqrt(returns.reduce((s, r) => s + r * r, 0) / returns.length) * Math.sqrt(252) * 100
      return { run, name: funds.find(f => f.run === run)?.name || run, ret, vol, lastNav: last.nav }
    }).filter(Boolean),
    [selectedFunds, period]
  )

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-[#0f172a]">Fund Comparator</h2>

      {/* Period selector */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-[#64748b]">Period:</span>
        {[{ label: '1M', d: 22 }, { label: '3M', d: 66 }, { label: '6M', d: 132 }, { label: 'YTD', d: 250 }, { label: '1Y', d: 252 }].map(p => (
          <button key={p.label} onClick={() => setPeriod(p.d)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg ${period === p.d ? 'bg-[#2563eb] text-white' : 'bg-[#f1f5f9] text-[#64748b]'}`}>
            {p.label}
          </button>
        ))}
      </div>

      {/* Fund selector */}
      <div className="bg-white rounded-xl border border-[#e2e8f0] p-4">
        <p className="text-sm font-medium text-[#0f172a] mb-3">Select funds to compare (max 8):</p>
        <div className="flex flex-wrap gap-2">
          {funds.map((f) => (
            <button
              key={f.run}
              onClick={() => toggleFund(f.run)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                selectedFunds.includes(f.run)
                  ? 'border-[#2563eb] text-[#2563eb] bg-[#eff6ff]'
                  : 'border-[#e2e8f0] text-[#64748b] hover:border-[#94a3b8]'
              }`}
            >
              {selectedFunds.includes(f.run) && (
                <span className="inline-block w-2.5 h-2.5 rounded-full mr-1.5 align-middle" style={{ backgroundColor: CHART_COLORS[selectedFunds.indexOf(f.run)] }} />
              )}
              {f.name}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      {chartData.length > 0 && (
        <div className="bg-white rounded-xl border border-[#e2e8f0] p-4">
          <h3 className="text-sm font-semibold text-[#0f172a] mb-4">Normalized Returns (Base 100)</h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} tickFormatter={d => d?.slice(5) || ''} />
              <YAxis tick={{ fontSize: 11 }} domain={['auto', 'auto']} />
              <Tooltip
                contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }}
                formatter={(v: any, name: any) => [Number(v).toFixed(2), funds.find(f => f.run === name)?.name || name]}
              />
              <Legend formatter={(v) => funds.find(f => f.run === v)?.name || v} />
              {selectedFunds.map((run, i) => (
                <Line key={run} type="monotone" dataKey={run} stroke={CHART_COLORS[i]} strokeWidth={2} dot={false} />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Metrics table */}
      {metrics.length > 0 && (
        <div className="bg-white rounded-xl border border-[#e2e8f0] overflow-hidden">
          <div className="px-4 py-3 border-b border-[#e2e8f0]">
            <h3 className="text-sm font-semibold text-[#0f172a]">Comparison Metrics</h3>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#f8fafc] border-b border-[#e2e8f0]">
                <th className="text-left px-4 py-2 text-xs font-semibold uppercase text-[#64748b]">Fund</th>
                <th className="text-right px-4 py-2 text-xs font-semibold uppercase text-[#64748b]">Period Return</th>
                <th className="text-right px-4 py-2 text-xs font-semibold uppercase text-[#64748b]">Ann. Volatility</th>
                <th className="text-right px-4 py-2 text-xs font-semibold uppercase text-[#64748b]">Last NAV</th>
              </tr>
            </thead>
            <tbody>
              {metrics.map((m: any, i: number) => (
                <tr key={m.run} className="border-b border-[#f1f5f9]">
                  <td className="px-4 py-2.5 font-medium text-[#0f172a]">
                    <span className="inline-block w-2.5 h-2.5 rounded-full mr-2 align-middle" style={{ backgroundColor: CHART_COLORS[i] }} />
                    {m.name}
                  </td>
                  <td className={`px-4 py-2.5 text-right font-mono tabular-nums font-semibold ${m.ret >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                    {formatPct(m.ret)}
                  </td>
                  <td className="px-4 py-2.5 text-right font-mono tabular-nums text-[#64748b]">{m.vol.toFixed(1)}%</td>
                  <td className="px-4 py-2.5 text-right font-mono tabular-nums">${Math.round(m.lastNav).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
