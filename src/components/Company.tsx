import { BackToTop } from './BackToTop'
import { useT } from '../i18n'

export function Company() {
  const t = useT()
  return (
    <section id="company" className="py-24 px-6 bg-[var(--bg-secondary)]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--accent-light)] mb-2">
          {t.company.kicker}
        </h2>

        <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-primary)] p-8 md:p-10 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center gap-8">
            {/* Logo — white container so it reads in light & dark themes */}
            <div className="shrink-0 rounded-xl bg-white border border-[var(--border-color)] p-5 flex items-center justify-center">
              <img
                src="/images/ai-centralized-solutions-logo.png"
                alt="AI Centralized Solutions"
                className="h-14 md:h-16 w-auto"
              />
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-2xl font-bold text-[var(--text-primary)]">AI Centralized Solutions</h3>
                <span className="px-2.5 py-0.5 text-[11px] font-semibold rounded-full bg-[var(--accent-light)]/10 text-[var(--accent-light)]">
                  {t.company.founder}
                </span>
              </div>
              <p className="text-sm text-[var(--accent-light)] font-medium mt-1.5">
                {t.company.tagline}
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed mt-3 max-w-3xl">
                {t.company.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-5">
                {t.company.sectors.map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1 text-xs font-medium rounded-lg bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border border-[var(--border-color)]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <BackToTop />
    </section>
  )
}
