import { useState, useMemo } from 'react'
import { overviewData, heatmapData, funds, CATEGORY_COLORS, formatCLP, formatPct, formatAUM } from './mockData'

export function PanelGeneral() {
  const [categoryFilter, setCategoryFilter] = useState<string>('all')

  const filtered = useMemo(() =>
    categoryFilter === 'all' ? overviewData : overviewData.filter(f => f.category === categoryFilter),
    [categoryFilter]
  )

  const categories = [...new Set(funds.map(f => f.category))]

  const totalAUM = overviewData.reduce((s, f) => s + f.aum, 0)
  const totalFunds = funds.length
  const totalSeries = totalFunds * 2 // mock
  const lastUpdate = overviewData[0]?.lastDate || '2026-04-07'

  // AUM by category
  const aumByCategory = categories.map(cat => ({
    category: cat,
    aum: overviewData.filter(f => f.category === cat).reduce((s, f) => s + f.aum, 0),
    count: overviewData.filter(f => f.category === cat).length,
  }))

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-[#0f172a]">General Overview</h2>

      {/* Metric cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Active Funds" value={String(totalFunds)} />
        <MetricCard label="Total Series" value={String(totalSeries)} />
        <MetricCard label="Total AUM" value={formatAUM(totalAUM)} />
        <MetricCard label="Last Update" value={lastUpdate} />
      </div>

      {/* AUM by category */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {aumByCategory.map(cat => (
          <div
            key={cat.category}
            className="bg-white rounded-xl border border-[#e2e8f0] p-4 hover:shadow-md transition-shadow"
            style={{ borderLeft: `3px solid ${CATEGORY_COLORS[cat.category] || '#94a3b8'}` }}
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-[#64748b]">{cat.category}</p>
            <p className="text-lg font-bold text-[#0f172a] mt-1">{formatAUM(cat.aum)}</p>
            <p className="text-xs text-[#94a3b8] mt-0.5">{cat.count} funds</p>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-[#64748b]">Filter:</span>
        <button onClick={() => setCategoryFilter('all')} className={`px-3 py-1.5 text-xs font-medium rounded-lg ${categoryFilter === 'all' ? 'bg-[#2563eb] text-white' : 'bg-[#f1f5f9] text-[#64748b]'}`}>
          All
        </button>
        {categories.map(cat => (
          <button key={cat} onClick={() => setCategoryFilter(cat)} className={`px-3 py-1.5 text-xs font-medium rounded-lg ${categoryFilter === cat ? 'bg-[#2563eb] text-white' : 'bg-[#f1f5f9] text-[#64748b]'}`}>
            {cat}
          </button>
        ))}
      </div>

      {/* Fund table */}
      <div className="bg-white rounded-xl border border-[#e2e8f0] overflow-hidden">
        <div className="px-4 py-3 border-b border-[#e2e8f0]">
          <h3 className="text-sm font-semibold text-[#0f172a]">Fund Summary — {filtered.length} funds</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#f8fafc] border-b border-[#e2e8f0]">
                <th className="text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#64748b]">Fund</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#64748b]">Category</th>
                <th className="text-right px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#64748b]">NAV</th>
                <th className="text-right px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#64748b]">AUM</th>
                <th className="text-right px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#64748b]">1D</th>
                <th className="text-right px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#64748b]">1W</th>
                <th className="text-right px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#64748b]">1M</th>
                <th className="text-right px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#64748b]">YTD</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((f, i) => (
                <tr key={f.run} className={`border-b border-[#f1f5f9] hover:bg-[#f8fafc] ${i % 2 === 0 ? '' : 'bg-[#fafbfc]'}`}>
                  <td className="px-4 py-2.5 font-medium text-[#0f172a]">{f.name}</td>
                  <td className="px-4 py-2.5">
                    <span className="px-2 py-0.5 text-xs rounded-full font-medium" style={{ backgroundColor: (CATEGORY_COLORS[f.category] || '#94a3b8') + '15', color: CATEGORY_COLORS[f.category] || '#94a3b8' }}>
                      {f.subcategory}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-right font-mono tabular-nums">{formatCLP(f.lastNav)}</td>
                  <td className="px-4 py-2.5 text-right font-mono tabular-nums text-[#64748b]">{formatAUM(f.aum)}</td>
                  <td className={`px-4 py-2.5 text-right font-mono tabular-nums ${f.return1D >= 0 ? 'text-green-600' : 'text-red-500'}`}>{formatPct(f.return1D)}</td>
                  <td className={`px-4 py-2.5 text-right font-mono tabular-nums ${f.return1S >= 0 ? 'text-green-600' : 'text-red-500'}`}>{formatPct(f.return1S)}</td>
                  <td className={`px-4 py-2.5 text-right font-mono tabular-nums ${f.return1M >= 0 ? 'text-green-600' : 'text-red-500'}`}>{formatPct(f.return1M)}</td>
                  <td className={`px-4 py-2.5 text-right font-mono tabular-nums font-semibold ${f.returnYTD >= 0 ? 'text-green-600' : 'text-red-500'}`}>{formatPct(f.returnYTD)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Returns Heatmap */}
      <div className="bg-white rounded-xl border border-[#e2e8f0] overflow-hidden">
        <div className="px-4 py-3 border-b border-[#e2e8f0]">
          <h3 className="text-sm font-semibold text-[#0f172a]">Returns Heatmap by Subcategory</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#f8fafc] border-b border-[#e2e8f0]">
                <th className="text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#64748b]">Subcategory</th>
                <th className="text-center px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#64748b]">1 Month</th>
                <th className="text-center px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#64748b]">3 Months</th>
                <th className="text-center px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#64748b]">YTD</th>
                <th className="text-center px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#64748b]">1 Year</th>
              </tr>
            </thead>
            <tbody>
              {heatmapData.map((row) => (
                <tr key={row.subcategory} className="border-b border-[#f1f5f9]">
                  <td className="px-4 py-2.5 font-medium text-[#0f172a]">{row.subcategory}</td>
                  {(['1M', '3M', 'YTD', '1A'] as const).map(period => {
                    const val = row[period]
                    const intensity = Math.min(Math.abs(val) / 15, 1)
                    const bg = val >= 0
                      ? `rgba(34, 197, 94, ${intensity * 0.3})`
                      : `rgba(239, 68, 68, ${intensity * 0.3})`
                    return (
                      <td key={period} className="px-4 py-2.5 text-center font-mono tabular-nums text-sm" style={{ backgroundColor: bg }}>
                        <span className={val >= 0 ? 'text-green-700' : 'text-red-600'}>
                          {formatPct(val)}
                        </span>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white rounded-xl border border-[#e2e8f0] p-4 hover:shadow-md transition-shadow">
      <p className="text-xs font-semibold uppercase tracking-wider text-[#64748b]">{label}</p>
      <p className="text-2xl font-bold text-[#0f172a] mt-1">{value}</p>
    </div>
  )
}
