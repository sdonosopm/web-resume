import { useState, useMemo } from 'react'
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { exchangePrices, navData, formatCLP, formatPct } from './mockData'

export function PreciosBolsa() {
  const [selectedNemo, setSelectedNemo] = useState('MONCHIL-A')

  const selected = exchangePrices.find(p => p.nemo === selectedNemo)!

  // Build NAV vs Bolsa spread data (simulated)
  const spreadData = useMemo(() => {
    const series = navData['8083'] || []
    return series.slice(-120).map((r) => {
      const bolsaVariation = (Math.random() - 0.45) * 3
      const bolsaPrice = r.nav * (1 + (bolsaVariation / 100))
      const premium = ((bolsaPrice / r.nav) - 1) * 100

      return {
        date: r.date,
        nav: r.nav,
        bolsa: Math.round(bolsaPrice),
        premium: Math.round(premium * 100) / 100,
      }
    })
  }, [])

  // Premium stats
  const premiums = spreadData.map(d => d.premium)
  const avgPremium = premiums.reduce((s, v) => s + v, 0) / premiums.length
  const daysDiscount = premiums.filter(p => p < 0).length
  const daysPremium = premiums.filter(p => p >= 0).length
  const maxDiscount = Math.min(...premiums)
  const maxPremium = Math.max(...premiums)

  // Trading signal
  const currentPremium = spreadData[spreadData.length - 1]?.premium || 0
  const signal = currentPremium < -2 ? 'STRONG BUY' : currentPremium < -0.5 ? 'BUY' : currentPremium > 2 ? 'STRONG SELL' : currentPremium > 0.5 ? 'SELL' : 'NEUTRAL'
  const signalColor = signal.includes('BUY') ? 'text-green-600 bg-green-50' : signal.includes('SELL') ? 'text-red-600 bg-red-50' : 'text-amber-600 bg-amber-50'

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-[#0f172a]">Exchange Prices — NAV vs Bolsa Analysis</h2>

      {/* Latest prices table */}
      <div className="bg-white rounded-xl border border-[#e2e8f0] overflow-hidden">
        <div className="px-4 py-3 border-b border-[#e2e8f0]">
          <h3 className="text-sm font-semibold text-[#0f172a]">Latest Exchange Prices</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#f8fafc] border-b border-[#e2e8f0]">
                <th className="text-left px-4 py-2 text-xs font-semibold uppercase text-[#64748b]">NEMO</th>
                <th className="text-left px-4 py-2 text-xs font-semibold uppercase text-[#64748b]">Fund</th>
                <th className="text-right px-4 py-2 text-xs font-semibold uppercase text-[#64748b]">Avg Price</th>
                <th className="text-right px-4 py-2 text-xs font-semibold uppercase text-[#64748b]">Max</th>
                <th className="text-right px-4 py-2 text-xs font-semibold uppercase text-[#64748b]">Min</th>
                <th className="text-right px-4 py-2 text-xs font-semibold uppercase text-[#64748b]">Volume</th>
                <th className="text-right px-4 py-2 text-xs font-semibold uppercase text-[#64748b]">Amount</th>
                <th className="text-right px-4 py-2 text-xs font-semibold uppercase text-[#64748b]">Date</th>
              </tr>
            </thead>
            <tbody>
              {exchangePrices.map(p => (
                <tr key={p.nemo} className={`border-b border-[#f1f5f9] hover:bg-[#f8fafc] cursor-pointer ${selectedNemo === p.nemo ? 'bg-[#eff6ff]' : ''}`} onClick={() => setSelectedNemo(p.nemo)}>
                  <td className="px-4 py-2 font-mono font-medium text-[#2563eb]">{p.nemo}</td>
                  <td className="px-4 py-2 text-[#0f172a]">{p.fundName}</td>
                  <td className="px-4 py-2 text-right font-mono tabular-nums">{formatCLP(p.avgPrice)}</td>
                  <td className="px-4 py-2 text-right font-mono tabular-nums text-green-600">{formatCLP(p.maxPrice)}</td>
                  <td className="px-4 py-2 text-right font-mono tabular-nums text-red-500">{formatCLP(p.minPrice)}</td>
                  <td className="px-4 py-2 text-right font-mono tabular-nums text-[#64748b]">{p.volume.toLocaleString()}</td>
                  <td className="px-4 py-2 text-right font-mono tabular-nums text-[#64748b]">{formatCLP(p.amount)}</td>
                  <td className="px-4 py-2 text-right text-[#94a3b8]">{p.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* NAV vs Bolsa Chart */}
      <div className="bg-white rounded-xl border border-[#e2e8f0] p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-[#0f172a]">NAV vs Exchange Price — {selected.fundName}</h3>
          <span className={`px-3 py-1 text-xs font-bold rounded-full ${signalColor}`}>{signal}</span>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <ComposedChart data={spreadData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="date" tick={{ fontSize: 10 }} tickFormatter={d => d.slice(5)} />
            <YAxis yAxisId="price" tick={{ fontSize: 11 }} domain={['auto', 'auto']} />
            <YAxis yAxisId="premium" orientation="right" tick={{ fontSize: 11 }} tickFormatter={v => v + '%'} />
            <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }} />
            <Legend />
            <Line yAxisId="price" type="monotone" dataKey="nav" stroke="#2563eb" strokeWidth={2} dot={false} name="NAV (CMF)" />
            <Line yAxisId="price" type="monotone" dataKey="bolsa" stroke="#f59e0b" strokeWidth={2} dot={false} name="Bolsa Price" />
            <Bar yAxisId="premium" dataKey="premium" fill="#94a3b8" opacity={0.3} name="Premium/Discount %" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Premium statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
        <StatCard label="Avg Premium" value={formatPct(avgPremium)} />
        <StatCard label="Current" value={formatPct(currentPremium)} highlight />
        <StatCard label="Max Discount" value={formatPct(maxDiscount)} />
        <StatCard label="Max Premium" value={formatPct(maxPremium)} />
        <StatCard label="Days in Discount" value={`${daysDiscount} days`} />
        <StatCard label="Days in Premium" value={`${daysPremium} days`} />
      </div>
    </div>
  )
}

function StatCard({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`rounded-lg border p-3 ${highlight ? 'border-[#2563eb] bg-[#eff6ff]' : 'border-[#e2e8f0] bg-white'}`}>
      <p className="text-[11px] font-semibold uppercase tracking-wider text-[#94a3b8]">{label}</p>
      <p className={`text-sm font-bold mt-0.5 ${highlight ? 'text-[#2563eb]' : 'text-[#0f172a]'}`}>{value}</p>
    </div>
  )
}
