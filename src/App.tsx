import { Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { MonedaNavDemo } from './pages/demos/MonedaNavDemo'
import { WealthPlatDemo } from './pages/demos/WealthPlatDemo'
import { FixedIncomeDemo } from './pages/demos/FixedIncomeDemo'
import { useDarkMode } from './hooks/useDarkMode'

function App() {
  const [isDark, setIsDark] = useDarkMode()

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <Routes>
        <Route path="/" element={<HomePage isDark={isDark} toggleDark={() => setIsDark(!isDark)} />} />
        <Route path="/demos/moneda-nav" element={<MonedaNavDemo />} />
        <Route path="/demos/wealthplat" element={<WealthPlatDemo />} />
        <Route path="/demos/fixed-income" element={<FixedIncomeDemo />} />
      </Routes>
    </div>
  )
}

export default App
