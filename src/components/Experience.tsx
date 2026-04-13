import { Briefcase, MapPin } from 'lucide-react'
import { experience } from '../data/resume'

export function Experience() {
  return (
    <section id="experience" className="py-24 px-6 bg-[var(--bg-secondary)]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--accent-light)] mb-2">
          Experience
        </h2>
        <h3 className="text-3xl font-bold text-[var(--text-primary)] mb-12">
          Professional Background
        </h3>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[19px] top-2 bottom-2 w-px bg-[var(--border-color)] hidden md:block" />

          <div className="space-y-12">
            {experience.map((exp, i) => (
              <div key={i} className="relative md:pl-14">
                {/* Timeline dot */}
                <div className="absolute left-2.5 top-1.5 w-4 h-4 rounded-full border-2 border-[var(--accent-light)] bg-[var(--bg-secondary)] hidden md:block" />

                <div className="p-6 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)]">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-[var(--text-primary)]">{exp.title}</h4>
                      <div className="flex items-center gap-2 text-sm text-[var(--accent-light)] font-medium mt-1">
                        <Briefcase size={14} />
                        {exp.company}
                      </div>
                      {exp.companyDetail && (
                        <p className="text-xs text-[var(--text-muted)] mt-0.5 ml-5">{exp.companyDetail}</p>
                      )}
                    </div>
                    <div className="text-right text-sm text-[var(--text-muted)]">
                      <div>{exp.period}</div>
                      <div className="flex items-center gap-1 justify-end mt-0.5">
                        <MapPin size={12} />
                        {exp.location}
                      </div>
                    </div>
                  </div>

                  <ul className="space-y-2">
                    {exp.bullets.map((bullet, j) => (
                      <li key={j} className="flex gap-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--accent-light)]/50 shrink-0" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
