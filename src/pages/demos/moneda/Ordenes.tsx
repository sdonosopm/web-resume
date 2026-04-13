import { useState } from 'react'
import { funds, exchangePrices, navData, formatCLP, formatPct } from './mockData'
import { Copy, Check, Mail } from 'lucide-react'

export function Ordenes() {
  const [operation, setOperation] = useState<'buy' | 'sell'>('buy')
  const [selectedFund, setSelectedFund] = useState('8083')
  const [amount, setAmount] = useState(50000000)
  const [discountPct, setDiscountPct] = useState(-1.5)
  const [copied, setCopied] = useState(false)

  const fund = funds.find(f => f.run === selectedFund)!
  const lastNav = navData[selectedFund]?.[navData[selectedFund].length - 1]?.nav || 0
  const bolsa = exchangePrices.find(p => p.fundName === fund.name)
  const bolsaPrice = bolsa?.avgPrice || lastNav * 0.98

  const limitPrice = Math.round(lastNav * (1 + discountPct / 100))
  const shares = Math.floor(amount / limitPrice)
  const effectiveAmount = shares * limitPrice
  const currentSpread = ((bolsaPrice / lastNav) - 1) * 100

  const orderDate = '2026-04-08'
  const nemo = bolsa?.nemo || 'MONCHIL-A'

  const emailBody = `Dear Trading Desk,

Please execute the following ${operation === 'buy' ? 'purchase' : 'sale'} order:

Fund: ${fund.name}
NEMO: ${nemo}
Operation: ${operation === 'buy' ? 'BUY' : 'SELL'}
Date: ${orderDate}
Limit Price: ${formatCLP(limitPrice)}
Shares: ${shares.toLocaleString()}
Effective Amount: ${formatCLP(effectiveAmount)}
Discount/Premium: ${formatPct(discountPct)}

Reference NAV (CMF): ${formatCLP(lastNav)}
Bolsa Price: ${formatCLP(bolsaPrice)}
Current Spread: ${formatPct(currentSpread)}

Best regards,
Sebastián Donoso`

  const handleCopy = () => {
    navigator.clipboard?.writeText(emailBody)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-[#0f172a]">Order Generator</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Order form */}
        <div className="space-y-4">
          {/* Operation */}
          <div className="bg-white rounded-xl border border-[#e2e8f0] p-4">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#64748b] block mb-2">Operation</label>
            <div className="flex gap-2">
              <button onClick={() => setOperation('buy')}
                className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-colors ${operation === 'buy' ? 'bg-green-500 text-white' : 'bg-[#f1f5f9] text-[#64748b]'}`}>
                Buy
              </button>
              <button onClick={() => setOperation('sell')}
                className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-colors ${operation === 'sell' ? 'bg-red-500 text-white' : 'bg-[#f1f5f9] text-[#64748b]'}`}>
                Sell
              </button>
            </div>
          </div>

          {/* Fund selector */}
          <div className="bg-white rounded-xl border border-[#e2e8f0] p-4">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#64748b] block mb-2">Fund</label>
            <select value={selectedFund} onChange={e => setSelectedFund(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-[#e2e8f0] bg-white focus:ring-2 focus:ring-[#2563eb]/20 focus:border-[#2563eb] outline-none">
              {funds.map(f => <option key={f.run} value={f.run}>{f.name}</option>)}
            </select>
          </div>

          {/* Reference prices */}
          <div className="bg-white rounded-xl border border-[#e2e8f0] p-4">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#64748b] block mb-3">Reference Prices</label>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <p className="text-[11px] text-[#94a3b8]">NAV (CMF)</p>
                <p className="text-sm font-bold text-[#0f172a]">{formatCLP(lastNav)}</p>
              </div>
              <div>
                <p className="text-[11px] text-[#94a3b8]">Bolsa Price</p>
                <p className="text-sm font-bold text-[#f59e0b]">{formatCLP(bolsaPrice)}</p>
              </div>
              <div>
                <p className="text-[11px] text-[#94a3b8]">Spread</p>
                <p className={`text-sm font-bold ${currentSpread >= 0 ? 'text-red-500' : 'text-green-600'}`}>{formatPct(currentSpread)}</p>
              </div>
            </div>
          </div>

          {/* Order parameters */}
          <div className="bg-white rounded-xl border border-[#e2e8f0] p-4 space-y-3">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#64748b] block">Order Parameters</label>
            <div>
              <label className="text-xs text-[#64748b] block mb-1">Amount to invest (CLP)</label>
              <input type="number" value={amount} onChange={e => setAmount(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm rounded-lg border border-[#e2e8f0] bg-white focus:ring-2 focus:ring-[#2563eb]/20 outline-none font-mono" />
            </div>
            <div>
              <label className="text-xs text-[#64748b] block mb-1">Discount/Premium (%)</label>
              <input type="number" step="0.1" value={discountPct} onChange={e => setDiscountPct(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm rounded-lg border border-[#e2e8f0] bg-white focus:ring-2 focus:ring-[#2563eb]/20 outline-none font-mono" />
            </div>
          </div>

          {/* Calculated order */}
          <div className="bg-[#eff6ff] rounded-xl border border-[#bfdbfe] p-4">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#2563eb] block mb-3">Order Calculation</label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-[11px] text-[#64748b]">Limit Price</p>
                <p className="text-base font-bold text-[#0f172a]">{formatCLP(limitPrice)}</p>
              </div>
              <div>
                <p className="text-[11px] text-[#64748b]">Shares</p>
                <p className="text-base font-bold text-[#0f172a]">{shares.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-[11px] text-[#64748b]">Effective Amount</p>
                <p className="text-base font-bold text-[#2563eb]">{formatCLP(effectiveAmount)}</p>
              </div>
              <div>
                <p className="text-[11px] text-[#64748b]">NEMO</p>
                <p className="text-base font-bold font-mono text-[#0f172a]">{nemo}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Email draft */}
        <div className="bg-white rounded-xl border border-[#e2e8f0] p-4 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-[#64748b]" />
              <h3 className="text-sm font-semibold text-[#0f172a]">Email Draft</h3>
            </div>
            <button onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-[#2563eb] text-white hover:bg-[#1d4ed8] transition-colors">
              {copied ? <Check size={12} /> : <Copy size={12} />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <div className="flex-1 bg-[#f8fafc] rounded-lg border border-[#e2e8f0] p-4 font-mono text-xs text-[#334155] whitespace-pre-wrap leading-relaxed">
            {emailBody}
          </div>
        </div>
      </div>
    </div>
  )
}
