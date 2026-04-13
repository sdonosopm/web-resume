// Mock data for Moneda NAV Fetcher demo
// Based on real fund structure from CMF Chile (72 funds tracked)

export interface Fund {
  run: string
  name: string
  category: string
  subcategory: string
  entity: string
}

export interface NavRecord {
  date: string
  nav: number
  variation: number
  netAssets: number
  holders: number
}

export interface HeatmapEntry {
  subcategory: string
  '1M': number
  '3M': number
  'YTD': number
  '1A': number
}

export interface ExchangePrice {
  nemo: string
  fundName: string
  avgPrice: number
  maxPrice: number
  minPrice: number
  volume: number
  amount: number
  date: string
}

// Generate realistic NAV time series
function generateNavSeries(startNav: number, days: number, volatility: number, trend: number): NavRecord[] {
  const records: NavRecord[] = []
  let nav = startNav
  const startDate = new Date('2024-01-02')

  for (let i = 0; i < days; i++) {
    const date = new Date(startDate)
    date.setDate(date.getDate() + i)
    if (date.getDay() === 0 || date.getDay() === 6) continue

    const dailyReturn = (trend / 252) + (Math.random() - 0.48) * volatility
    nav = nav * (1 + dailyReturn)
    const variation = dailyReturn * 100

    records.push({
      date: date.toISOString().split('T')[0],
      nav: Math.round(nav * 100) / 100,
      variation: Math.round(variation * 1000) / 1000,
      netAssets: Math.round((50000 + Math.random() * 200000) * 1e6),
      holders: Math.floor(500 + Math.random() * 2000),
    })
  }
  return records
}

export const funds: Fund[] = [
  { run: '8080', name: 'Moneda Renta CLP', category: 'Deuda', subcategory: 'Renta Fija CLP', entity: 'Moneda' },
  { run: '8081', name: 'Moneda Renta UF', category: 'Deuda', subcategory: 'Renta Fija UF', entity: 'Moneda' },
  { run: '8082', name: 'Moneda Deuda Latam', category: 'Deuda', subcategory: 'Deuda Latam', entity: 'Moneda' },
  { run: '8083', name: 'Moneda Chile Fund', category: 'Accionario', subcategory: 'Renta Variable Chile', entity: 'Moneda' },
  { run: '8084', name: 'Moneda Latam Fund', category: 'Accionario', subcategory: 'Renta Variable Latam', entity: 'Moneda' },
  { run: '8085', name: 'Moneda Pioneer Fund', category: 'Accionario', subcategory: 'Small & Mid Cap', entity: 'Moneda' },
  { run: '8086', name: 'Moneda Retorno Absoluto', category: 'Alternativo', subcategory: 'Retorno Absoluto', entity: 'Moneda' },
  { run: '8087', name: 'Moneda Deuda HY Latam', category: 'Deuda', subcategory: 'High Yield Latam', entity: 'Moneda' },
  { run: '8088', name: 'Patria Infraestructura', category: 'Alternativo', subcategory: 'Infraestructura', entity: 'Patria' },
  { run: '8089', name: 'Moneda Renta Estratégica', category: 'Deuda', subcategory: 'Multi-Estrategia', entity: 'Moneda' },
  { run: '8090', name: 'Moneda Renta Variable Global', category: 'Accionario', subcategory: 'RV Global', entity: 'Moneda' },
  { run: '8091', name: 'Moneda Mixto', category: 'Balanceado', subcategory: 'Mixto', entity: 'Moneda' },
]

// Pre-generated NAV series for key funds
export const navData: Record<string, NavRecord[]> = {
  '8080': generateNavSeries(15200, 580, 0.002, 0.06),
  '8081': generateNavSeries(22500, 580, 0.003, 0.045),
  '8082': generateNavSeries(8900, 580, 0.005, 0.08),
  '8083': generateNavSeries(45000, 580, 0.012, 0.15),
  '8084': generateNavSeries(32000, 580, 0.014, 0.12),
  '8085': generateNavSeries(18500, 580, 0.018, 0.18),
  '8086': generateNavSeries(12000, 580, 0.004, 0.07),
  '8087': generateNavSeries(6800, 580, 0.008, 0.10),
  '8088': generateNavSeries(25000, 580, 0.003, 0.09),
  '8089': generateNavSeries(11500, 580, 0.003, 0.055),
  '8090': generateNavSeries(28000, 580, 0.011, 0.14),
  '8091': generateNavSeries(19500, 580, 0.006, 0.08),
}

export const overviewData = funds.map(f => {
  const series = navData[f.run]
  const last = series[series.length - 1]
  const prev = series[series.length - 2]
  const m1 = series[series.length - 22] || series[0]
  const m3 = series[series.length - 66] || series[0]
  const ytd = series[0]

  return {
    ...f,
    lastNav: last.nav,
    lastDate: last.date,
    aum: last.netAssets,
    holders: last.holders,
    return1D: ((last.nav / prev.nav - 1) * 100),
    return1S: ((last.nav / (series[series.length - 6]?.nav || last.nav) - 1) * 100),
    return1M: ((last.nav / m1.nav - 1) * 100),
    return3M: ((last.nav / m3.nav - 1) * 100),
    returnYTD: ((last.nav / ytd.nav - 1) * 100),
  }
})

export const heatmapData: HeatmapEntry[] = [
  { subcategory: 'Renta Fija CLP', '1M': 0.52, '3M': 1.48, 'YTD': 3.21, '1A': 5.89 },
  { subcategory: 'Renta Fija UF', '1M': 0.38, '3M': 1.12, 'YTD': 2.45, '1A': 4.52 },
  { subcategory: 'Deuda Latam', '1M': 0.85, '3M': 2.34, 'YTD': 5.67, '1A': 9.12 },
  { subcategory: 'High Yield Latam', '1M': 1.12, '3M': 3.01, 'YTD': 7.23, '1A': 11.45 },
  { subcategory: 'Multi-Estrategia', '1M': 0.45, '3M': 1.35, 'YTD': 2.89, '1A': 5.12 },
  { subcategory: 'RV Chile', '1M': -1.23, '3M': 3.45, 'YTD': 8.92, '1A': 15.67 },
  { subcategory: 'RV Latam', '1M': -0.87, '3M': 2.89, 'YTD': 7.45, '1A': 12.34 },
  { subcategory: 'Small & Mid Cap', '1M': -2.15, '3M': 4.56, 'YTD': 12.34, '1A': 22.56 },
  { subcategory: 'RV Global', '1M': 1.45, '3M': 5.23, 'YTD': 9.87, '1A': 16.45 },
  { subcategory: 'Retorno Absoluto', '1M': 0.67, '3M': 1.89, 'YTD': 4.56, '1A': 7.23 },
  { subcategory: 'Infraestructura', '1M': 0.34, '3M': 1.02, 'YTD': 5.67, '1A': 9.89 },
  { subcategory: 'Mixto', '1M': 0.23, '3M': 1.78, 'YTD': 4.34, '1A': 8.12 },
]

export const exchangePrices: ExchangePrice[] = [
  { nemo: 'MONRENT-A', fundName: 'Moneda Renta CLP', avgPrice: 15180, maxPrice: 15220, minPrice: 15140, volume: 12500, amount: 189750000, date: '2026-04-07' },
  { nemo: 'MONRUF-B', fundName: 'Moneda Renta UF', avgPrice: 22480, maxPrice: 22520, minPrice: 22430, volume: 8200, amount: 184336000, date: '2026-04-07' },
  { nemo: 'MONCHIL-A', fundName: 'Moneda Chile Fund', avgPrice: 44800, maxPrice: 45100, minPrice: 44500, volume: 15600, amount: 698880000, date: '2026-04-07' },
  { nemo: 'MONLAT-A', fundName: 'Moneda Latam Fund', avgPrice: 31900, maxPrice: 32200, minPrice: 31600, volume: 9800, amount: 312620000, date: '2026-04-07' },
  { nemo: 'MONPIO-A', fundName: 'Moneda Pioneer Fund', avgPrice: 18200, maxPrice: 18450, minPrice: 17950, volume: 6300, amount: 114660000, date: '2026-04-07' },
  { nemo: 'MONHYL-A', fundName: 'Moneda Deuda HY Latam', avgPrice: 6750, maxPrice: 6800, minPrice: 6700, volume: 4500, amount: 30375000, date: '2026-04-07' },
]

// Category colors matching the real app
export const CATEGORY_COLORS: Record<string, string> = {
  'Deuda': '#3b82f6',
  'Accionario': '#22c55e',
  'Alternativo': '#a855f7',
  'Balanceado': '#f59e0b',
}

export const CHART_COLORS = [
  'hsl(220, 70%, 50%)',
  'hsl(160, 84%, 39%)',
  'hsl(38, 92%, 50%)',
  'hsl(0, 72%, 51%)',
  'hsl(263, 70%, 50%)',
  'hsl(192, 91%, 36%)',
  'hsl(173, 80%, 40%)',
  'hsl(21, 90%, 48%)',
]

export function formatCLP(value: number): string {
  return '$' + Math.round(value).toLocaleString('es-CL')
}

export function formatPct(value: number, decimals = 2, showSign = true): string {
  const sign = showSign && value > 0 ? '+' : ''
  return sign + value.toFixed(decimals) + '%'
}

export function formatAUM(value: number): string {
  if (value >= 1e12) return '$' + (value / 1e12).toFixed(1) + 'T'
  if (value >= 1e9) return '$' + (value / 1e9).toFixed(1) + 'B'
  if (value >= 1e6) return '$' + (value / 1e6).toFixed(0) + 'M'
  return '$' + Math.round(value).toLocaleString()
}
