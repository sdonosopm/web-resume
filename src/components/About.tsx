import { personalInfo } from '../data/resume'
import { TrendingUp, Code2, Users, LineChart } from 'lucide-react'

const highlights = [
  { icon: TrendingUp, label: 'Investment Analysis', desc: 'Portfolio management & Top-Down research' },
  { icon: LineChart, label: 'Market Research', desc: 'Equity, Fixed Income & Macro analysis' },
  { icon: Code2, label: 'Tech & AI Development', desc: 'Full-stack apps, data pipelines & LLM integration' },
  { icon: Users, label: 'Client Relationship', desc: 'UHNW advisory, portfolio reviews & strategic communication' },
]

export function About() {
  return (
    <section id="about" className="py-24 px-6 bg-[var(--bg-primary)]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--accent-light)] mb-2">
          About
        </h2>
        <h3 className="text-3xl font-bold text-[var(--text-primary)] mb-6">
          Profile Summary
        </h3>

        <p className="text-[var(--text-secondary)] leading-relaxed mb-12 text-base">
          {personalInfo.summary}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item) => (
            <div
              key={item.label}
              className="p-6 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:border-[var(--accent-light)]/30 transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-[var(--accent-light)]/10 flex items-center justify-center mb-4 group-hover:bg-[var(--accent-light)]/20 transition-colors">
                <item.icon size={20} className="text-[var(--accent-light)]" />
              </div>
              <h4 className="font-semibold text-[var(--text-primary)] mb-1">{item.label}</h4>
              <p className="text-sm text-[var(--text-secondary)]">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
